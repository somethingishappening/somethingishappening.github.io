
/* RESET PAGE POSITION ON EVERY RETURN
   Browsing away and returning starts the page from its original content
   position. Navigation accordion choices are intentionally not changed. */
(function(){
  if("scrollRestoration" in history){
    history.scrollRestoration = "manual";
  }

  function resetPageVisitPosition(){
    window.scrollTo(0,0);
    document.documentElement.scrollTop = 0;
    if(document.body) document.body.scrollTop = 0;

    document.querySelectorAll(".paper, .cv-column, .media-column").forEach(function(el){
      el.scrollTop = 0;
      el.scrollLeft = 0;
    });

    document.querySelectorAll(".lightbox, .figure-lightbox").forEach(function(box){
      box.classList.remove("open");
      box.setAttribute("aria-hidden","true");
    });

    if(document.body){
      document.body.classList.remove("lightbox-open");
    }

    document.querySelectorAll("video").forEach(function(video){
      try{
        video.pause();
        video.currentTime = 0;
      }catch(e){}
    });

    const surprise = document.querySelector(".cv-surprise");
    if(surprise){
      surprise.classList.remove("revealed");
      surprise.setAttribute("aria-hidden","true");
    }

    if(document.activeElement && typeof document.activeElement.blur === "function"){
      document.activeElement.blur();
    }

    if(typeof window.HarriResearchReset === "function"){
      window.HarriResearchReset();
    }else{
      const paper = document.querySelector(".paper");
      if(paper){
        paper.dispatchEvent(new Event("scroll"));
      }
      window.dispatchEvent(new Event("scroll"));
    }
  }

  /* pageshow also runs when the browser restores a page from its back/forward
     cache, which is the case that normally preserves an old scroll position. */
  window.addEventListener("pageshow", function(){
    requestAnimationFrame(function(){
      requestAnimationFrame(resetPageVisitPosition);
    });
  });
})();

  // ------------------------------------------------------------
  // FRESH-VISIT RESET
  // Used when this Research page is revisited after another page.
  // This resets both visible positions and the internal figure/TOC state.
  // ------------------------------------------------------------
  window.HarriResearchReset = function(){
    /* Cancel any pending asynchronous figure swap from the previous visit. */
    figureSwitchToken += 1;
    figureScrollTicking = false;
    scrollTicking = false;

    hoveredFigureKey = null;
    automaticFigureKey = figureRefs[0]?.dataset.figure || null;
    clickedDesktopLink = null;
    clickedMobileLink = null;

    if(paperScroller){
      paperScroller.scrollTop = 0;
      paperScroller.scrollLeft = 0;
    }

    window.scrollTo(0,0);
    document.documentElement.scrollTop = 0;
    if(document.body) document.body.scrollTop = 0;

    /* Restore the first referenced figure immediately, rather than relying
       on a scroll event / animation frame that may have been suspended while
       the iframe or bfcache page was hidden. */
    if(automaticFigureKey && figures[automaticFigureKey]){
      applyFigureImmediately(
        automaticFigureKey,
        figures[automaticFigureKey]
      );
      stage.classList.remove("figure-changing");
    }

    /* Restore the reading navigation to the first section. */
    updateTextNavigation();
    positionNavigationArrows();

    /* Close the mobile project TOC if it had been left open. */
    if(projectHeaderShell){
      projectHeaderShell.classList.remove("toc-open");
    }
    if(projectTocToggle){
      projectTocToggle.setAttribute("aria-expanded","false");
      projectTocToggle.setAttribute("aria-label","Open text navigation");
    }

    /* Close any figure lightbox. */
    if(figureLightbox){
      figureLightbox.classList.remove("open");
      figureLightbox.setAttribute("aria-hidden","true");
    }
    document.body.classList.remove("lightbox-open");

    /* Recalculate the figure dimensions from the restored first figure. */
    requestAnimationFrame(function(){
      if(typeof window.fitDesktopResearchFigureNow === "function"){
        window.fitDesktopResearchFigureNow();
      }
      updateTextNavigation();
      positionNavigationArrows();
    });
  };

