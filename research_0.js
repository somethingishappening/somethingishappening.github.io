
// ------------------------------------------------------------
  // DESKTOP ROTATING WELCOME
  // ------------------------------------------------------------
  const welcomeZone = document.querySelector(".welcome-zone");
  const welcomeWord = document.querySelector(".welcome");
  const welcomeMessages = null;

  let currentWelcomeIndex = -1;

  function randomWelcomeIndex(){
    if(welcomeMessages.length <= 1) return 0;

    let next;
    do{
      next = Math.floor(Math.random() * welcomeMessages.length);
    }while(next === currentWelcomeIndex);

    return next;
  }

  function placeWelcomeRandomly(){
    if(!welcomeZone || !welcomeWord || window.innerWidth <= 900) return;

    const zoneWidth = welcomeZone.clientWidth;
    const zoneHeight = welcomeZone.clientHeight;
    const wordWidth = welcomeWord.offsetWidth;
    const wordHeight = welcomeWord.offsetHeight;

    // Small safety inset keeps the type from touching the edges.
    const insetX = 2;
    const insetY = 4;

    const maxX = Math.max(insetX, zoneWidth - wordWidth - insetX);
    const maxY = Math.max(insetY, zoneHeight - wordHeight - insetY);

    const x = insetX + Math.random() * Math.max(0, maxX - insetX);
    const y = insetY + Math.random() * Math.max(0, maxY - insetY);

    welcomeWord.style.left = `${Math.round(x)}px`;
    welcomeWord.style.top = `${Math.round(y)}px`;
  }

  function changeWelcome({animate = true} = {}){
    if(!welcomeZone || !welcomeWord || window.innerWidth <= 900) return;

    const applyChange = () => {
      currentWelcomeIndex = randomWelcomeIndex();
      welcomeWord.textContent = welcomeMessages[currentWelcomeIndex];
      welcomeWord.classList.toggle(
        "is-arabic-welcome",
        welcomeMessages[currentWelcomeIndex] === "يا هلا!"
      );

      // Wait for the new word width to be laid out before positioning it.
      requestAnimationFrame(() => {
        placeWelcomeRandomly();
        welcomeWord.classList.remove("changing");
      });
    };

    if(animate){
      welcomeWord.classList.add("changing");
      window.setTimeout(applyChange, 180);
    }else{
      applyChange();
    }
  }

  // Random greeting + position on every desktop page load.
  changeWelcome({animate:false});

  // Then change both the language and its placement every 30 seconds.
  window.setInterval(() => {
    changeWelcome({animate:true});
  }, 30000);

  // Browser resizing does not alter the greeting or its position.
  // It only changes on page load and at the one-minute interval.


  // ------------------------------------------------------------
  // 2) FIGURE DATA
  // Replace `src` with your real image paths, e.g.
  // src: "images/tahriir-figure-01.jpg"
  // Leave src empty to keep the crossed placeholder.
  // ------------------------------------------------------------
  const rawFigures = null;
  const figures = {};

  function cmsAssetPath(path){
    if(!path) return "";
    if(/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
    const base = null;
    const clean = path.startsWith("/") ? path : "/" + path;
    return base + clean;
  }

  (rawFigures || []).forEach((fig, index) => {
    const parsedNumber = Number.parseInt(fig.number, 10);
    const number = Number.isFinite(parsedNumber) && parsedNumber > 0 ? parsedNumber : index + 1;
    figures[`fig${number}`] = {
      label: `Fig. ${number}`,
      src: cmsAssetPath(fig.image || ""),
      alt: fig.alt || `Figure ${number}`,
      caption: fig.caption || ""
    };
  });

  /*
    Write references naturally as (Fig. 1), (Fig. 2), etc.
    Matching CMS figures become interactive automatically.
    Legacy [fig:1] syntax remains supported invisibly.
  */
  const figureReferencePattern = /(?:\(Fig\.\s*(\d+)\)|\[fig:(\d+)\])/gi;

  function linkFigureReferences(container){
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue) return NodeFilter.FILTER_REJECT;
        figureReferencePattern.lastIndex = 0;
        if(!figureReferencePattern.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if(!parent || parent.closest(".figure-ref, script, style, code, pre")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while(walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
      const text = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      figureReferencePattern.lastIndex = 0;

      while((match = figureReferencePattern.exec(text))){
        if(match.index > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        const number = match[1] || match[2];
        const key = `fig${number}`;
        if(figures[key]){
          const ref = document.createElement("span");
          ref.className = "figure-ref";
          ref.tabIndex = 0;
          ref.dataset.figure = key;
          ref.textContent = `(Fig. ${number})`;
          fragment.appendChild(ref);
        }else{
          fragment.appendChild(document.createTextNode(`(Fig. ${number})`));
        }
        lastIndex = match.index + match[0].length;
      }
      if(lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      node.parentNode.replaceChild(fragment, node);
    });
  }

  document.querySelectorAll(".research-copy").forEach(linkFigureReferences);

  /* Build mobile inline figures automatically from those same records. */
  document.querySelectorAll(".research-copy p").forEach(paragraph => {
    const refs = [...paragraph.querySelectorAll(".figure-ref")];
    if(!refs.length) return;

    let insertionPoint = paragraph;
    const seen = new Set();

    refs.forEach(ref => {
      const key = ref.dataset.figure;
      if(seen.has(key) || !figures[key]) return;
      seen.add(key);

      const fig = figures[key];
      const number = key.replace(/\D/g, "");
      const inline = document.createElement("figure");
      inline.className = "mobile-inline-figure";
      inline.innerHTML = `
        <div class="figure-box">
          <img data-mobile-image="${key}" alt="${fig.alt || ""}">
        </div>
        <figcaption>
          <strong>Fig. ${number}</strong><span class="caption-separator">, </span>${fig.caption || ""}
        </figcaption>
      `;
      insertionPoint.insertAdjacentElement("afterend", inline);
      insertionPoint = inline;
    });
  });

  const stage = document.getElementById("figureStage");
  const image = document.getElementById("figureImage");
  const label = document.getElementById("figureLabel");
  const caption = document.getElementById("figureText");

  let figureSwitchToken = 0;

  function applyFigureImmediately(key, fig){
    label.textContent = fig.label;
    caption.textContent = fig.caption;

    if(fig.src){
      image.src = fig.src;
      image.alt = fig.alt || fig.label;
      image.style.display = "block";
    }else{
      image.removeAttribute("src");
      image.alt = "";
      image.style.display = "none";
    }

    stage.dataset.currentFigure = key;
    stage.classList.add("visible");
    stage.classList.remove("figure-changing");

    if(typeof window.fitDesktopResearchFigureNow === "function"){
      window.fitDesktopResearchFigureNow();
    }
  }

  function showFigure(key){
    const fig = figures[key];
    if(!fig) return;

    const previousKey = stage.dataset.currentFigure || "";
    if(previousKey === key){
      stage.classList.add("visible");
      return;
    }

    /* Mobile uses the inline figures and does not need the desktop preview transition. */
    if(window.innerWidth <= 900 || !fig.src){
      applyFigureImmediately(key, fig);
      return;
    }

    const token = ++figureSwitchToken;
    const preload = new Image();

    preload.onload = () => {
      if(token !== figureSwitchToken) return;

      const hasPreviousFigure = Boolean(previousKey);

      /* Fade the existing figure out first. Keeping its current dimensions
         during this phase prevents the preview from snapping. */
      if(hasPreviousFigure){
        stage.classList.add("figure-changing");
      }

      const swap = () => {
        if(token !== figureSwitchToken) return;

        label.textContent = fig.label;
        caption.textContent = fig.caption;
        image.src = fig.src;
        image.alt = fig.alt || fig.label;
        image.style.display = "block";
        stage.dataset.currentFigure = key;
        stage.classList.add("visible");

        /* Resize the new image while it is invisible, then fade it in.
           This avoids showing the aspect-ratio change as a jump. */
        requestAnimationFrame(() => {
          if(typeof window.fitDesktopResearchFigureNow === "function"){
            window.fitDesktopResearchFigureNow();
          }

          requestAnimationFrame(() => {
            if(token === figureSwitchToken){
              stage.classList.remove("figure-changing");
            }
          });
        });
      };

      if(hasPreviousFigure){
        window.setTimeout(swap, 150);
      }else{
        stage.classList.add("figure-changing");
        swap();
      }
    };

    preload.onerror = () => {
      if(token !== figureSwitchToken) return;
      applyFigureImmediately(key, fig);
      stage.classList.remove("figure-changing");
    };

    preload.src = fig.src;
  }

  function hideFigure(){
    stage.classList.remove("visible");
  }

  const paperScroller = document.querySelector(".paper");
  const figureRefs = [...document.querySelectorAll(".figure-ref")];
  let automaticFigureKey = figureRefs[0]?.dataset.figure || null;
  let hoveredFigureKey = null;

  function updateAutomaticFigure(){
    // Mobile uses inline figures, so the right-hand preview logic is desktop-only.
    if(window.innerWidth <= 900) return;
    if(!figureRefs.length) return;

    const paperRect = paperScroller.getBoundingClientRect();
    const readingLine = paperRect.top + paperScroller.clientHeight * 0.42;

    /*
      Desktop Research figure rule:
      If more than one figure reference is currently visible in the reading
      area, the FIRST one mentioned in the text has priority.

      As soon as that earlier reference leaves the visible reading area, the
      next visible reference can take over. If no figure reference is visible,
      fall back to the established scroll-driven reading-line behavior.
    */
    const visibleRefs = figureRefs.filter(ref => {
      const rect = ref.getBoundingClientRect();
      return rect.bottom >= paperRect.top && rect.top <= paperRect.bottom;
    });

    let currentKey = visibleRefs.length
      ? visibleRefs[0].dataset.figure
      : figureRefs[0].dataset.figure;

    if(!visibleRefs.length){
      for(const ref of figureRefs){
        const top = ref.getBoundingClientRect().top;
        if(top <= readingLine){
          currentKey = ref.dataset.figure;
        }else{
          break;
        }
      }
    }

    automaticFigureKey = currentKey;

    // Do not interrupt a deliberate hover/focus preview.
    if(!hoveredFigureKey){
      showFigure(automaticFigureKey);
    }
  }

  figureRefs.forEach((ref) => {
    ref.addEventListener("mouseenter", () => {
      if(window.innerWidth <= 900) return;
      hoveredFigureKey = ref.dataset.figure;
      showFigure(hoveredFigureKey);
    });

    ref.addEventListener("focus", () => {
      if(window.innerWidth <= 900) return;
      hoveredFigureKey = ref.dataset.figure;
      showFigure(hoveredFigureKey);
    });

    ref.addEventListener("mouseleave", () => {
      if(window.innerWidth <= 900) return;
      // Keep showing the figure the reader deliberately hovered.
      // It will return to the scroll-driven figure only once they scroll again.
    });

    ref.addEventListener("blur", () => {
      if(window.innerWidth <= 900) return;
      // Same behaviour for keyboard focus: keep the selected figure visible
      // until the reader resumes scrolling.
    });
  });

  let figureScrollTicking = false;

  function handleFigureReadingScroll(){
    if(window.innerWidth <= 900) return;

    // Scrolling the article ends any manual hover/focus override and hands
    // control back to the figure appropriate to the current reading position.
    hoveredFigureKey = null;

    if(!figureScrollTicking){
      window.requestAnimationFrame(() => {
        updateAutomaticFigure();
        figureScrollTicking = false;
      });
      figureScrollTicking = true;
    }
  }

  paperScroller.addEventListener("scroll", handleFigureReadingScroll, {passive:true});

  window.addEventListener("resize", () => {
    if(window.innerWidth > 900){
      updateAutomaticFigure();
    }
  });

  // Always show the first referenced figure when the desktop page opens.
  if(window.innerWidth > 900 && automaticFigureKey){
    showFigure(automaticFigureKey);
    requestAnimationFrame(updateAutomaticFigure);
  }

  // ------------------------------------------------------------
  // 3) TEXT NAVIGATION: keep the arrow on the section currently being read
  // ------------------------------------------------------------
  const sections = [...document.querySelectorAll(".paper section[id]")];
  const tocLinks = [...document.querySelectorAll(".toc a[data-section]")];
  const mobileTocLinks = [...document.querySelectorAll(".mobile-toc a[data-mobile-section]")];
  const desktopTocArrow = document.querySelector(".toc-arrow");
  const mobileTocArrow = document.querySelector(".mobile-toc-arrow");
  const mobileToc = document.querySelector(".mobile-toc");

  let clickedDesktopLink = null;
  let clickedMobileLink = null;
  let desktopArrowTarget = null;
  let mobileArrowTarget = null;

  function currentSectionId(){
    if(!sections.length) return "";

    const paperRect = paperScroller.getBoundingClientRect();
    const readingLine = window.innerWidth <= 900
      ? 145
      : paperRect.top + 72;

    let current = sections[0].id;

    for(const section of sections){
      const heading = section.querySelector("h1, h2, h3");
      const marker = heading || section;
      const top = marker.getBoundingClientRect().top;

      if(top <= readingLine){
        current = section.id;
      }else{
        break;
      }
    }

    return current;
  }

  function firstDesktopLinkFor(id){
    return tocLinks.find(link => link.dataset.section === id) || null;
  }

  function firstMobileLinkFor(id){
    return mobileTocLinks.find(link => link.dataset.mobileSection === id) || null;
  }

  function sectionHeadingLevel(section){
    if(!section) return 0;
    if(section.id === "abstract") return 0;
    if(section.querySelector("h1.chapter-heading")) return 1;
    if(section.querySelector("h2")) return 2;
    if(section.querySelector("h3")) return 3;
    return 0;
  }

  /*
    Hidden article sections do not get their own arrow stop. While the reader
    is inside one of them, keep the arrow on the nearest visible navigation
    item that precedes it. This makes "Do not show" sections transparent to
    the arrow instead of creating jumps or empty arrow states. Abstract is the
    stable fallback before the first visible article item.
  */
  function hierarchicalNavigationLink(id, links, dataKey){
    const direct = links.find(link => link.dataset[dataKey] === id) || null;
    if(direct) return direct;

    const currentIndex = sections.findIndex(section => section.id === id);
    if(currentIndex < 0) return null;

    for(let i = currentIndex - 1; i >= 0; i--){
      const candidateId = sections[i].id;
      const link = links.find(
        item => item.dataset[dataKey] === candidateId
      ) || null;
      if(link) return link;
    }

    return links.find(
      link => link.dataset[dataKey] === "abstract"
    ) || null;
  }

  function desktopLinkForSection(id){
    if(id === "abstract") return firstDesktopLinkFor("abstract");
    return hierarchicalNavigationLink(id, tocLinks, "section");
  }

  function mobileLinkForSection(id){
    if(id === "abstract") return firstMobileLinkFor("abstract");
    return hierarchicalNavigationLink(id, mobileTocLinks, "mobileSection");
  }

  function setArrowTransform(arrow, x, y, animate){
    if(!arrow) return;

    const value =
      `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

    if(!animate || arrow.dataset.arrowReady !== "true"){
      /*
        Initial placement and resize geometry should not visibly travel from
        an obsolete position. Put the arrow in place immediately, then restore
        the normal glide for subsequent section changes.
      */
      arrow.style.transition = "none";
      arrow.style.transform = value;
      arrow.dataset.arrowReady = "true";

      requestAnimationFrame(() => {
        arrow.style.removeProperty("transition");
      });
      return;
    }

    arrow.style.transform = value;
  }

  function moveDesktopArrow(link, force = false){
    if(!desktopTocArrow || !link || window.innerWidth <= 900) return;

    if(!force && desktopArrowTarget === link) return;

    const changedTarget = desktopArrowTarget !== link;
    desktopArrowTarget = link;

    const rect = link.getBoundingClientRect();
    const x = rect.left - 20;
    const y = rect.top + 1;

    desktopTocArrow.style.position = "fixed";
    desktopTocArrow.style.left = "0px";
    desktopTocArrow.style.top = "0px";

    setArrowTransform(
      desktopTocArrow,
      x,
      y,
      changedTarget && !force
    );
  }

  function moveMobileArrow(link, force = false){
    if(!mobileTocArrow || !mobileToc || !link) return;

    if(!force && mobileArrowTarget === link) return;

    const changedTarget = mobileArrowTarget !== link;
    mobileArrowTarget = link;

    const navRect = mobileToc.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    const x =
      (linkRect.left - navRect.left) + mobileToc.scrollLeft - 16;
    const y =
      (linkRect.top - navRect.top) + mobileToc.scrollTop + 1;

    mobileTocArrow.style.position = "absolute";
    mobileTocArrow.style.left = "0px";
    mobileTocArrow.style.top = "0px";

    setArrowTransform(
      mobileTocArrow,
      x,
      y,
      changedTarget && !force
    );
  }

  function setActiveNavigationForSection(id){
    let desktopActive = desktopLinkForSection(id);
    let mobileActive = mobileLinkForSection(id);

    if(clickedDesktopLink && clickedDesktopLink.dataset.section === id){
      desktopActive = clickedDesktopLink;
    }else{
      clickedDesktopLink = null;
    }

    if(clickedMobileLink && clickedMobileLink.dataset.mobileSection === id){
      mobileActive = clickedMobileLink;
    }else{
      clickedMobileLink = null;
    }

    tocLinks.forEach(link => {
      link.classList.toggle("active", link === desktopActive);
    });

    mobileTocLinks.forEach(link => {
      link.classList.toggle("active", link === mobileActive);
    });

    moveDesktopArrow(desktopActive);
    moveMobileArrow(mobileActive);
  }

  function updateTextNavigation(){
    setActiveNavigationForSection(currentSectionId());
  }

  function positionNavigationArrows(){
    const id = currentSectionId();
    const desktopActive = tocLinks.find(link => link.classList.contains("active"))
      || desktopLinkForSection(id)
      || null;
    const mobileActive = mobileTocLinks.find(link => link.classList.contains("active"))
      || mobileLinkForSection(id)
      || null;

    moveDesktopArrow(desktopActive, true);
    moveMobileArrow(mobileActive, true);
  }

  tocLinks.forEach(link => {
    link.addEventListener("click", () => {
      clickedDesktopLink = link;
      tocLinks.forEach(item => item.classList.toggle("active", item === link));
      moveDesktopArrow(link);
    });
  });

  mobileTocLinks.forEach(link => {
    link.addEventListener("click", () => {
      clickedMobileLink = link;
      mobileTocLinks.forEach(item => item.classList.toggle("active", item === link));
      moveMobileArrow(link);
    });
  });

  let scrollTicking = false;

  function handleTextNavigationScroll(){
    if(scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(() => {
      updateTextNavigation();
      scrollTicking = false;
    });
  }

  paperScroller.addEventListener("scroll", handleTextNavigationScroll, {passive:true});

  window.addEventListener("scroll", () => {
    if(window.innerWidth <= 900){
      handleTextNavigationScroll();
    }
  }, {passive:true});

  if(mobileToc){
    mobileToc.addEventListener("scroll", () => {
      if(window.innerWidth <= 900){
        positionNavigationArrows();
      }
    }, {passive:true});
  }

  window.addEventListener("resize", () => {
    updateTextNavigation();
    if(
      window.innerWidth <= 900 &&
      mobileToc &&
      projectHeaderShell &&
      projectHeaderShell.classList.contains("toc-open")
    ){
      const targetHeight = mobileProjectTocTargetHeight();
      mobileToc.style.height = `${targetHeight}px`;
      mobileToc.classList.toggle("toc-scrollable", mobileProjectTocFullHeight() > targetHeight + 1);
    }
    desktopArrowTarget = null;
    mobileArrowTarget = null;
    requestAnimationFrame(positionNavigationArrows);
  });

  updateTextNavigation();
  requestAnimationFrame(positionNavigationArrows);

  // ------------------------------------------------------------
  // 5) MOBILE PROJECT TEXT NAVIGATION
  // ------------------------------------------------------------
  const projectHeaderShell = document.querySelector(".project-header-shell");
  const projectTocToggle = document.querySelector(".mobile-project-toc-toggle");


  function mobileProjectTocFullHeight(){
    if(!mobileToc) return 0;
    const currentPadding = parseFloat(getComputedStyle(mobileToc).paddingBottom) || 0;
    return Math.max(0, mobileToc.scrollHeight - currentPadding + 16);
  }

  function mobileProjectTocTargetHeight(){
    const fullHeight = mobileProjectTocFullHeight();
    const cap = Math.min(window.innerHeight * 0.62, 520);
    return Math.min(fullHeight, cap);
  }

  function openMobileProjectToc(){
    if(!mobileToc || !projectHeaderShell) return;
    mobileToc.classList.remove("toc-scrollable");
    mobileToc.style.height = "0px";
    projectHeaderShell.classList.add("toc-open");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetHeight = mobileProjectTocTargetHeight();
        mobileToc.style.height = `${targetHeight}px`;
      });
    });
  }

  function closeMobileProjectToc(){
    if(!mobileToc || !projectHeaderShell) return;
    const currentHeight = mobileToc.getBoundingClientRect().height;
    mobileToc.classList.remove("toc-scrollable");
    mobileToc.style.height = `${currentHeight}px`;
    void mobileToc.offsetHeight;
    projectHeaderShell.classList.remove("toc-open");

    requestAnimationFrame(() => {
      mobileToc.style.height = "0px";
    });
  }

  if(mobileToc){
    mobileToc.addEventListener("transitionend", (event) => {
      if(event.target !== mobileToc || event.propertyName !== "height") return;

      if(projectHeaderShell && projectHeaderShell.classList.contains("toc-open")){
        const fullHeight = mobileProjectTocFullHeight();
        const cap = Math.min(window.innerHeight * 0.62, 520);
        if(fullHeight > cap + 1){
          mobileToc.style.height = `${cap}px`;
          mobileToc.classList.add("toc-scrollable");
        }else{
          mobileToc.style.height = "auto";
        }
      }
    });
  }


  if(projectHeaderShell && projectTocToggle){
    projectTocToggle.addEventListener("click", () => {
      const open = !projectHeaderShell.classList.contains("toc-open");

      if(open){
        openMobileProjectToc();
      }else{
        closeMobileProjectToc();
      }

      projectTocToggle.setAttribute("aria-expanded", String(open));
      projectTocToggle.setAttribute(
        "aria-label",
        open ? "Close text navigation" : "Open text navigation"
      );

      if(open){
        requestAnimationFrame(() => {
          requestAnimationFrame(positionNavigationArrows);
        });
      }
    });

    // Selecting a section closes the mobile text navigation and then places
    // the selected heading inside the actual visible reading area. We measure
    // the closed project-title bar instead of relying on a fixed pixel offset,
    // so long/wrapped project names cannot cover the heading.
    mobileTocLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        if(window.innerWidth > 900) return;

        event.preventDefault();

        const sectionId = link.dataset.mobileSection;
        const targetSection = sectionId
          ? document.getElementById(sectionId)
          : null;

        closeMobileProjectToc();
        projectTocToggle.setAttribute("aria-expanded", "false");
        projectTocToggle.setAttribute("aria-label", "Open text navigation");

        let positioned = false;

        const positionTargetBelowClosedHeader = () => {
          if(positioned || !targetSection) return;
          positioned = true;

          requestAnimationFrame(() => {
            const targetHeading =
              targetSection.querySelector("h1, h2") || targetSection;
            const titleRow =
              projectHeaderShell.querySelector(".project-title-row");

            const occupiedBottom = titleRow
              ? titleRow.getBoundingClientRect().bottom
              : 0;

            const readingGap = 12;
            const targetTop =
              window.scrollY +
              targetHeading.getBoundingClientRect().top -
              occupiedBottom -
              readingGap;

            window.scrollTo({
              top: Math.max(0,targetTop),
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
            });

            // Keep a useful section hash without letting the browser perform
            // its own anchor jump underneath the sticky navigation.
            try{
              history.replaceState(null,"",`#${sectionId}`);
            }catch(e){}

            requestAnimationFrame(() => {
              updateTextNavigation();
              positionNavigationArrows();
            });
          });
        };

        // The menu closes with a max-height transition. Position only after
        // that collapse finishes so the target cannot shift back underneath
        // the sticky project-name bar. The timeout is a fallback for browsers
        // that do not emit transitionend or when reduced motion is enabled.
        const onCloseTransitionEnd = (transitionEvent) => {
          if(
            transitionEvent.target === mobileToc &&
            transitionEvent.propertyName === "height"
          ){
            mobileToc.removeEventListener(
              "transitionend",
              onCloseTransitionEnd
            );
            positionTargetBelowClosedHeader();
          }
        };

        if(mobileToc){
          mobileToc.addEventListener(
            "transitionend",
            onCloseTransitionEnd
          );
        }

        setTimeout(() => {
          if(mobileToc){
            mobileToc.removeEventListener(
              "transitionend",
              onCloseTransitionEnd
            );
          }
          positionTargetBelowClosedHeader();
        },580);
      });
    });
  }

  // ------------------------------------------------------------
  // 6) MOBILE INLINE FIGURE IMAGES
  // Uses the same `figures` object as the desktop hover previews.
  // ------------------------------------------------------------
  document.querySelectorAll("[data-mobile-image]").forEach(img => {
    const key = img.dataset.mobileImage;
    const fig = figures[key];

    if(fig && fig.src){
      img.loading = "lazy";
      img.decoding = "async";
      if("fetchPriority" in img) img.fetchPriority = "low";
      img.src = fig.src;
      img.alt = fig.alt || fig.label;
      img.style.display = "block";
    }else{
      img.style.display = "none";
    }
  });


  // ------------------------------------------------------------
  // 7) FULLSCREEN FIGURE LIGHTBOX
  // ------------------------------------------------------------
  const figureLightbox = document.getElementById("figureLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxPlaceholder = document.getElementById("lightboxPlaceholder");
  const lightboxLabel = document.getElementById("lightboxLabel");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.querySelector(".figure-lightbox-close");
  const lightboxFigureKeys = Object.keys(figures);

  function openFigureLightbox(key){
    const fig = figures[key];
    if(!fig) return;

    lightboxLabel.textContent = fig.label || "";
    lightboxCaption.textContent = fig.caption ? `, ${fig.caption}` : "";

    if(fig.src){
      lightboxImage.src = fig.src;
      lightboxImage.alt = fig.alt || fig.label || "";
      lightboxImage.style.display = "block";
      lightboxPlaceholder.hidden = true;
    }else{
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightboxImage.style.display = "none";
      lightboxPlaceholder.hidden = false;
    }

    figureLightbox.classList.add("open");
    figureLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  }

  function closeFigureLightbox(){
    figureLightbox.classList.remove("open");
    figureLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  // Desktop preview figure.
  const desktopFigureBox = document.getElementById("figureBox");
  if(desktopFigureBox){
    desktopFigureBox.addEventListener("click", () => {
      const key = hoveredFigureKey || automaticFigureKey;
      if(key) openFigureLightbox(key);
    });
  }

  // Mobile inline figures. Delegated handling means any figure added later
  // with a data-mobile-image key automatically inherits the lightbox.
  document.addEventListener("click", (event) => {
    const box = event.target.closest(".mobile-inline-figure .figure-box");
    if(!box) return;

    const img = box.querySelector("[data-mobile-image]");
    const key = img?.dataset.mobileImage;
    if(key) openFigureLightbox(key);
  });

  if(lightboxClose){
    lightboxClose.addEventListener("click", closeFigureLightbox);
  }

  if(figureLightbox){
    figureLightbox.addEventListener("click", (event) => {
      if(event.target === figureLightbox){
        closeFigureLightbox();
      }
    });
  }


  // Swipe left/right through figures on touch devices.
  let figureSwipeStartX = null;
  let figureSwipeStartY = null;

  function currentFigureLightboxIndex(){
    const currentLabel = lightboxLabel.textContent;
    let index = lightboxFigureKeys.findIndex(
      key => figures[key] && figures[key].label === currentLabel
    );
    return index < 0 ? 0 : index;
  }

  function showAdjacentFigure(direction){
    if(!lightboxFigureKeys.length) return;

    const currentIndex = currentFigureLightboxIndex();
    const nextIndex =
      (currentIndex + direction + lightboxFigureKeys.length) %
      lightboxFigureKeys.length;

    openFigureLightbox(lightboxFigureKeys[nextIndex]);
  }

  figureLightbox.addEventListener("touchstart", (event) => {
    if(!figureLightbox.classList.contains("open")) return;
    if(event.touches.length !== 1) return;

    figureSwipeStartX = event.touches[0].clientX;
    figureSwipeStartY = event.touches[0].clientY;
  }, {passive:true});

  figureLightbox.addEventListener("touchend", (event) => {
    if(!figureLightbox.classList.contains("open")) return;
    if(figureSwipeStartX === null || figureSwipeStartY === null) return;
    if(!event.changedTouches.length) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const dx = endX - figureSwipeStartX;
    const dy = endY - figureSwipeStartY;

    figureSwipeStartX = null;
    figureSwipeStartY = null;

    const horizontal = Math.abs(dx);
    const vertical = Math.abs(dy);

    if(horizontal < 45 || horizontal <= vertical * 1.15) return;

    // Swipe left = next. Swipe right = previous.
    showAdjacentFigure(dx < 0 ? 1 : -1);
  }, {passive:true});

  document.addEventListener("keydown", (event) => {
    if(!figureLightbox.classList.contains("open")) return;

    if(event.key === "Escape"){
      closeFigureLightbox();
      return;
    }

    const currentLabel = lightboxLabel.textContent;
    let currentIndex = lightboxFigureKeys.findIndex(
      key => figures[key] && figures[key].label === currentLabel
    );
    if(currentIndex < 0) currentIndex = 0;

    if(event.key === "ArrowRight"){
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % lightboxFigureKeys.length;
      openFigureLightbox(lightboxFigureKeys[nextIndex]);
      return;
    }

    if(event.key === "ArrowLeft"){
      event.preventDefault();
      const previousIndex =
        (currentIndex - 1 + lightboxFigureKeys.length) % lightboxFigureKeys.length;
      openFigureLightbox(lightboxFigureKeys[previousIndex]);
    }
  });






(function () {
  const paper = document.querySelector(".paper");

  function goToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;

    if (window.innerWidth > 900 && paper) {
      const paperRect = paper.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const destination = paper.scrollTop + (targetRect.top - paperRect.top);

      paper.scrollTo({
        top: destination,
        behavior: "smooth"
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  /* Desktop TOC uses the paper scroller. Mobile Research navigation has its
     own handler above because it must first close both menus and calculate the
     sticky-header offset. Keeping mobile out of this generic handler prevents
     one tap from starting two competing smooth-scroll animations. */
  document.querySelectorAll('.toc a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;

      event.preventDefault();
      const id = href.slice(1);

      goToSection(id);
    });
  });
})();


(function(){
  const mainNav = document.querySelector(".left");
  if(!mainNav) return;

  /* Only the fixed Harri.la/hamburger row defines the sticky offset.
     The expanded main menu is already in normal flow and must not be
     counted a second time. */
  function syncMobileNavStack(){
    if(window.innerWidth <= 900){
      const brand = mainNav.querySelector(".brand");
      const navStyle = getComputedStyle(mainNav);
      const paddingTop = parseFloat(navStyle.paddingTop) || 0;
      const rowHeight = brand
        ? brand.getBoundingClientRect().height
        : 34;

      document.documentElement.style.setProperty(
        "--mobile-main-nav-height",
        Math.ceil(rowHeight + paddingTop) + "px"
      );
    }else{
      document.documentElement.style.removeProperty("--mobile-main-nav-height");
    }
  }

  syncMobileNavStack();

  if("ResizeObserver" in window){
    const brand = mainNav.querySelector(".brand");
    if(brand){
      const ro = new ResizeObserver(syncMobileNavStack);
      ro.observe(brand);
    }
  }

  window.addEventListener("resize", syncMobileNavStack, {passive:true});
  window.addEventListener("orientationchange", syncMobileNavStack, {passive:true});
})();



/* DESIGN RESEARCH FIGURE FIT RULE
   Full width is always attempted first. The image is reduced only when
   its natural aspect ratio plus the caption would exceed the available
   vertical space above the website's bottom margin. No crop, no stretch. */
(function(){
  const stage = document.getElementById("figureStage");
  const box = document.getElementById("figureBox");
  const img = document.getElementById("figureImage");
  const caption = stage ? stage.querySelector(".figure-caption") : null;

  if(!stage || !box || !img || !caption) return;

  let resizeRaf = 0;
  const bottomPageMargin = 26;

  function clearDesktopFit(){
    stage.style.removeProperty("--research-figure-fit-width");
  }

  function fitDesktopResearchFigure(){
    if(window.innerWidth <= 900){
      clearDesktopFit();
      return;
    }

    if(!img.src || img.style.display === "none" || !img.naturalWidth || !img.naturalHeight){
      clearDesktopFit();
      return;
    }

    const stageRect = stage.getBoundingClientRect();
    const fullFigureWidth = stage.clientWidth;
    if(fullFigureWidth <= 0) return;

    const captionStyles = getComputedStyle(caption);
    const captionMarginTop = parseFloat(captionStyles.marginTop) || 0;
    const captionHeight = caption.getBoundingClientRect().height + captionMarginTop;

    const availableTotalHeight = Math.max(
      0,
      window.innerHeight - stageRect.top - bottomPageMargin
    );

    const availableImageHeight = Math.max(
      0,
      availableTotalHeight - captionHeight
    );

    const naturalRatio = img.naturalWidth / img.naturalHeight;
    const fullWidthImageHeight = fullFigureWidth / naturalRatio;

    let fittedWidth = fullFigureWidth;

    if(fullWidthImageHeight > availableImageHeight){
      fittedWidth = Math.min(
        fullFigureWidth,
        availableImageHeight * naturalRatio
      );
    }

    /* A whole-pixel floor gives a small safety buffer against subpixel
       overflow while preserving the source aspect ratio. */
    fittedWidth = Math.max(1, Math.floor(fittedWidth));

    stage.style.setProperty(
      "--research-figure-fit-width",
      fittedWidth + "px"
    );
  }

  window.fitDesktopResearchFigureNow = fitDesktopResearchFigure;

  function scheduleFit(){
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(fitDesktopResearchFigure);
  }

  img.addEventListener("load", scheduleFit);
  window.addEventListener("resize", scheduleFit, {passive:true});

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(scheduleFit).catch(() => {});
  }

  scheduleFit();
})();
