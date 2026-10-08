
(function(){
  function stripLeadingBullet(root){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node = walker.currentNode;
      if(!node.nodeValue || !node.nodeValue.trim()) continue;

      if(/^\s*•\s+/.test(node.nodeValue)){
        node.nodeValue = node.nodeValue.replace(/^\s*•\s+/, "");
      }
      return;
    }
  }

  function convert(container){
    const children = Array.from(container.children);
    let currentList = null;

    children.forEach(function(child){
      const isManualBullet =
        child.tagName === "P" &&
        /^\s*•\s+/.test(child.textContent || "");

      if(!isManualBullet){
        currentList = null;
        return;
      }

      if(!currentList){
        currentList = document.createElement("ul");
        currentList.className = "manual-bullet-list-v131";
        container.insertBefore(currentList, child);
      }

      const item = document.createElement("li");

      while(child.firstChild){
        item.appendChild(child.firstChild);
      }

      stripLeadingBullet(item);
      currentList.appendChild(item);
      child.remove();
    });
  }

  function run(){
    document.querySelectorAll(".research-copy").forEach(convert);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", run, {once:true});
  }else{
    run();
  }
})();
