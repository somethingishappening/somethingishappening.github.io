
(function(){
  const researchHeader = document.querySelector(".project-header-shell");
  if(!researchHeader) return;

  const mobileBreakpoint = 900;
  const topRevealPoint = 18;
  const hideTravel = 9;
  const showTravel = 4;

  let lastY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
  let direction = 0;
  let travelled = 0;
  let ticking = false;

  function currentY(){
    const raw = window.scrollY || document.documentElement.scrollTop || 0;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.max(0, Math.min(raw, maxY));
  }

  function showResearchHeader(){
    researchHeader.classList.remove("mobile-scroll-hidden");
  }

  function updateResearchHeader(){
    const y = currentY();

    if(window.innerWidth > mobileBreakpoint){
      showResearchHeader();
      lastY = y;
      direction = 0;
      travelled = 0;
      ticking = false;
      return;
    }

    /* Keep the research menu visible at the top and whenever its TOC is open. */
    if(y <= topRevealPoint || researchHeader.classList.contains("toc-open")){
      showResearchHeader();
      lastY = y;
      direction = 0;
      travelled = 0;
      ticking = false;
      return;
    }

    const delta = y - lastY;
    lastY = y;

    if(Math.abs(delta) < 0.5){
      ticking = false;
      return;
    }

    const newDirection = delta > 0 ? 1 : -1;

    if(newDirection !== direction){
      direction = newDirection;
      travelled = 0;
    }

    travelled += Math.abs(delta);

    if(direction > 0 && travelled >= hideTravel){
      researchHeader.classList.add("mobile-scroll-hidden");
      travelled = 0;
    }else if(direction < 0 && travelled >= showTravel){
      showResearchHeader();
      travelled = 0;
    }

    ticking = false;
  }

  window.addEventListener("scroll", function(){
    if(!ticking){
      ticking = true;
      requestAnimationFrame(updateResearchHeader);
    }
  }, {passive:true});

  window.addEventListener("resize", function(){
    if(window.innerWidth > mobileBreakpoint){
      showResearchHeader();
    }
    lastY = currentY();
    direction = 0;
    travelled = 0;
  });

  const tocToggle = document.querySelector(".mobile-project-toc-toggle");
  if(tocToggle){
    tocToggle.addEventListener("click", showResearchHeader, true);
  }

  showResearchHeader();
})();
