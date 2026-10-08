
(function(){
  const layout = document.querySelector(".layout");
  const siteNav = document.querySelector(".site-nav");
  const researchHeader = document.querySelector(".project-header-shell");

  if(!layout || !siteNav || !researchHeader) return;

  const breakpoint = 900;
  let raf = 0;

  function updateStackHeight(){
    cancelAnimationFrame(raf);

    raf = requestAnimationFrame(function(){
      if(window.innerWidth > breakpoint){
        layout.style.removeProperty("--harri-current-main-nav-height");
        return;
      }

      /*
        Use the actual rendered height, not the closed 38px assumption.
        ResizeObserver fires throughout the hamburger height animation,
        so the Research bar follows the menu smoothly as it expands/collapses.
      */
      const height = Math.ceil(siteNav.getBoundingClientRect().height);
      layout.style.setProperty(
        "--harri-current-main-nav-height",
        height + "px"
      );
    });
  }

  updateStackHeight();

  if("ResizeObserver" in window){
    const observer = new ResizeObserver(updateStackHeight);
    observer.observe(siteNav);
  }

  const mutationObserver = new MutationObserver(updateStackHeight);
  mutationObserver.observe(siteNav, {
    attributes:true,
    attributeFilter:["class","style"]
  });

  window.addEventListener("resize", updateStackHeight, {passive:true});

  const mainButton = siteNav.querySelector(".mobile-menu-button");
  const researchButton = researchHeader.querySelector(".mobile-project-toc-toggle");

  if(mainButton){
    mainButton.addEventListener("click", updateStackHeight, true);
  }

  if(researchButton){
    researchButton.addEventListener("click", updateStackHeight, true);
  }
})();
