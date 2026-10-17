import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
const requestedEntry = (process.env.ENTRY_PATH || '').trim();
const viewports = [
  [1024,768,'1024×768'],[1280,720,'1280×720'],[1366,768,'1366×768'],
  [1440,900,'1440×900'],[1512,982,'1512×982'],[1680,900,'1680×900'],
  [1680,1050,'1680×1050'],[1728,1117,'MacBook Pro 16″ — 1728×1117'],
  [1920,1080,'1920×1080'],[1920,1200,'1920×1200'],[2560,1440,'2560×1440'],
  [3440,1440,'3440×1440'],[3840,2160,'3840×2160'],[4096,2304,'4096×2304'],
  [5120,2880,'5120×2880'],
];

function researchUrlFromEntry(entryPath){
  const normalized=entryPath.replaceAll('\\','/').replace(/^\/+/, '');
  if(!normalized.startsWith('_research/')) throw new Error(`Expected a Research entry path under _research/, received: ${entryPath}`);
  const slug=path.basename(normalized).replace(/\.(md|markdown|html)$/i,'');
  return `/research/${encodeURIComponent(slug)}/`;
}
function discoverResearchEntries(){
  if(!fs.existsSync('_research')) throw new Error('The repository does not contain an _research directory.');
  return fs.readdirSync('_research').filter(n=>/\.(md|markdown|html)$/i.test(n)).map(n=>`_research/${n}`).sort();
}
const entries=requestedEntry?[requestedEntry]:discoverResearchEntries();
if(!entries.length) throw new Error('No Research projects were found to check.');
const browser=await chromium.launch({headless:true});
let failures=[]; let checked=0;
try{
  for(const entry of entries){
    const researchPath=researchUrlFromEntry(entry);
    for(const [width,height,viewportName] of viewports){
      const context=await browser.newContext({viewport:{width,height}});
      const page=await context.newPage();
      await page.goto(`${baseUrl}/about/`,{waitUntil:'networkidle'});
      await page.evaluate(async()=>{await document.fonts.ready;});
      await page.waitForTimeout(100);
      const response=await page.goto(`${baseUrl}${researchPath}`,{waitUntil:'networkidle'});
      if(!response||!response.ok()){
        failures.push({entry,viewportName,error:`Research page returned ${response?.status() ?? 'no HTTP response'} for ${researchPath}`});
        await context.close(); continue;
      }
      await page.evaluate(async()=>{await document.fonts.ready;});
      await page.waitForTimeout(150);
      const result=await page.evaluate(()=>{
        const toc=document.querySelector('.toc');
        if(!toc) return {error:'Research navigation (.toc) was not found.'};
        const links=[...toc.querySelectorAll('a[data-section]')];
        if(!links.length) return {error:'No Research navigation links with data-section were found.'};
        function intrinsicTextWidth(el){
          const cs=getComputedStyle(el); const probe=document.createElement('span');
          probe.textContent=(el.textContent||'').trim();
          Object.assign(probe.style,{position:'fixed',left:'-100000px',top:'0',visibility:'hidden',pointerEvents:'none',whiteSpace:'nowrap',fontFamily:cs.fontFamily,fontSize:cs.fontSize,fontWeight:cs.fontWeight,fontStyle:cs.fontStyle,fontStretch:cs.fontStretch,fontKerning:cs.fontKerning,fontFeatureSettings:cs.fontFeatureSettings,fontVariationSettings:cs.fontVariationSettings,letterSpacing:cs.letterSpacing,textTransform:cs.textTransform});
          document.body.appendChild(probe); const w=probe.getBoundingClientRect().width; probe.remove(); return w;
        }
        return {labels:links.map(el=>{
          const cs=getComputedStyle(el), rect=el.getBoundingClientRect();
          const availableWidth=Math.max(0,rect.width-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0));
          const range=document.createRange(); range.selectNodeContents(el);
          const lineRects=[...range.getClientRects()].filter(r=>r.width>0.1&&r.height>0.1);
          const textWidth=intrinsicTextWidth(el); const wrapped=lineRects.length>1; const tooWide=textWidth>availableWidth+0.5;
          return {text:(el.textContent||'').trim(),section:el.getAttribute('data-section')||'',textWidth,availableWidth,lineCount:lineRects.length,wrapped,tooWide,overflow:wrapped||tooWide};
        })};
      });
      if(result.error) failures.push({entry,viewportName,error:result.error});
      else { checked+=result.labels.length; for(const label of result.labels) if(label.overflow) failures.push({entry,viewportName,width,height,...label}); }
      await context.close();
    }
  }
} finally { await browser.close(); }
const uniq=[]; const seen=new Set();
for(const f of failures){ const k=`${f.entry}|${f.viewportName}|${f.section||''}|${f.text||''}|${f.error||''}`; if(!seen.has(k)){seen.add(k);uniq.push(f);} }
const technicalErrors=uniq.filter(f=>f.error), wrapWarnings=uniq.filter(f=>!f.error);
const lines=['# Research navigation label check','',`Checked **${entries.length}** Research project(s) at **${viewports.length}** laptop/desktop/TV resolutions.`,''];
if(technicalErrors.length){
  lines.push('❌ **The checker encountered a technical rendering problem.**','');
  for(const f of technicalErrors){ lines.push(`- ${f.entry} — ${f.viewportName}: ${f.error}`); console.log(`::error title=Research navigation checker error::${f.entry} — ${f.viewportName}: ${f.error}`); }
} else if(!wrapWarnings.length){
  lines.push('✅ **All navigation labels fit inside their columns at every tested resolution.**','',`Measured ${checked} rendered label instances using the actual Research page, loaded fonts, and viewport-specific site/CV scaling.`);
} else {
  lines.push('⚠️ **One or more navigation labels wrap or exceed their column at a tested resolution.**','', '| Project | Resolution | Label | Needs | Available | Lines |','|---|---:|---|---:|---:|---:|');
  for(const f of wrapWarnings){ const need=`${f.textWidth.toFixed(1)}px`, have=`${f.availableWidth.toFixed(1)}px`; lines.push(`| ${f.entry} | ${f.viewportName} | ${String(f.text).replaceAll('|','\|')} | ${need} | ${have} | ${f.lineCount||1} |`); console.log(`::warning title=Research nav label may wrap::${f.entry} — "${f.text}" needs ${need}, but its column is ${have} at ${f.viewportName}. Use the CMS Navigation label field to shorten it.`); }
  lines.push('','Shorten a flagged item using **Navigation label (optional)** in the Research article section. The article heading itself can remain unchanged.');
}
if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`); else console.log(lines.join('\n'));
if(technicalErrors.length) process.exit(1);
