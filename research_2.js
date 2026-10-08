
(function(){
  const header = document.querySelector(".left");
  if(!header) return;

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

  function showHeader(){
    header.classList.remove("mobile-scroll-hidden");
  }

  function updateHeader(){
    const y = currentY();

    if(window.innerWidth > mobileBreakpoint){
      showHeader();
      lastY = y;
      direction = 0;
      travelled = 0;
      ticking = false;
      return;
    }

    /* Never hide it at the top or while the hamburger menu is open. */
    if(y <= topRevealPoint || header.classList.contains("menu-open")){
      showHeader();
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
      header.classList.add("mobile-scroll-hidden");
      travelled = 0;
    }else if(direction < 0 && travelled >= showTravel){
      showHeader();
      travelled = 0;
    }

    ticking = false;
  }

  window.addEventListener("scroll", function(){
    if(!ticking){
      ticking = true;
      requestAnimationFrame(updateHeader);
    }
  }, {passive:true});

  window.addEventListener("resize", function(){
    if(window.innerWidth > mobileBreakpoint){
      showHeader();
    }
    lastY = currentY();
    direction = 0;
    travelled = 0;
  });

  const menuButton = document.querySelector(".mobile-menu-button");
  if(menuButton){
    menuButton.addEventListener("click", showHeader, true);
  }

  showHeader();
})();
