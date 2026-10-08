
(function(){
  const researchHeader = document.querySelector(".project-header-shell");
  const siteNav = document.querySelector(".site-nav");
  if(!researchHeader || !siteNav) return;

  function syncMainMenuHeight(){
    if(
      window.innerWidth <= 900 &&
      siteNav.classList.contains("menu-open") &&
      typeof siteNav._harriRetargetOpenMenu === "function"
    ){
      requestAnimationFrame(function(){
        siteNav._harriRetargetOpenMenu();
      });
    }
  }

  const observer = new MutationObserver(function(mutations){
    if(mutations.some(function(m){
      return m.type === "attributes" && m.attributeName === "class";
    })){
      syncMainMenuHeight();
    }
  });

  observer.observe(researchHeader, {
    attributes:true,
    attributeFilter:["class"]
  });

  window.addEventListener("resize", syncMainMenuHeight, {passive:true});
})();
