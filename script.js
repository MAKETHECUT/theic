// --- Ensure GSAP and ScrollTrigger are loaded and registered ---
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.error('GSAP or ScrollTrigger not loaded!');
}




// Wait for GSAP and plugins to be fully loaded
function waitForGSAP() {
    return new Promise((resolve) => {
      if (window.gsap && window.ScrollTrigger && window.SplitText) {
        resolve();
      } else {
        const checkGSAP = setInterval(() => {
          if (window.gsap && window.ScrollTrigger && window.SplitText) {
            clearInterval(checkGSAP);
            resolve();
          }
        }, 100);
      }
    });
  }
  
  

  // Initialize the page
  async function initializePage() {
    try {
      // Wait for GSAP and plugins
      await waitForGSAP();
      
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger, SplitText);
  
      // Create and setup overlay
      const overlay = document.createElement("div");
      overlay.id = "overlay";
      Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100dvh",
        backgroundColor: "var(--darkblue)",
        zIndex: "9999",
        opacity: "1",
        visibility: "visible",
        pointerEvents: "none"
      });
      document.body.prepend(overlay);
  
      // Wait for DOM content to be loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
  
      // Wait for fonts to load
      await document.fonts.ready;
      
        // Wait for DOM content to be loaded (skip videos and heavy resources)
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }
      
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
  
      // Initialize animations
      gsap.set("body", { opacity: 0, visibility: "hidden" });
  
      gsap.to("body", {
        opacity: 1,
        visibility: "visible",
        duration: 2,
        ease: "power4.inOut"
      });
  
      gsap.to("#overlay", {
        opacity: 0,
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          overlay.remove();
          // Refresh ScrollTrigger again after overlay is removed
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }
      });
  
      // Initialize all other functionality after overlay is removed
      if (window.innerWidth < 768) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            initializeAnimations();
          }, 300); // adjust if needed
        });
      } else {
        initializeAnimations();
      }
      
      initializeSliders();
      initializeSmoothScroll();
      initializeGridOverlay();
      initializeResponsiveBehavior();
      
      // Initialize SplitText animations after everything else
      await initializeSplitTextAnimations();
      
      // Initialize testimonials slider
      initializeTestimonialsSlider();
      
      // Final ScrollTrigger refresh after everything is initialized
      setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Final check to ensure everything is working
        setTimeout(() => {
          console.log('Final ScrollTrigger refresh');
          ScrollTrigger.refresh();
        }, 1000);
      }, 500);

      
  
    } catch (error) {
      console.error('Error during page initialization:', error);
    }
  }
  
  // Function declarations for initialization
  function initializeAnimations() {
    // This function will be called after page load
    // All GSAP animations are already defined globally
  }
  
  function initializeSliders() {
    // Initialize slider functionality
    // This is handled by the DragScroll class
  }
  
  function initializeSmoothScroll() {
    // Initialize smooth scrolling
    initSmoothScroll();
  }
  
  function initializeGridOverlay() {
    // Grid overlay functionality is already defined globally
  }
  
  function initializeResponsiveBehavior() {
    // Responsive behavior is already defined globally
  }
  
  // Master initialization function that ensures proper loading order
  async function masterInitialization() {
    try {
      console.log('Starting master initialization...');
      
      // Wait for GSAP and basic requirements
      await waitForGSAP();
      
      // Wait for DOM content to be loaded (skip videos and heavy resources)
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      
      // Wait for fonts to load (with timeout)
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
      } catch (error) {
        console.warn('Font loading timeout');
      }
      
      // Start the main initialization
      await initializePage();
      
      console.log('Master initialization complete');
      
    } catch (error) {
      console.error('Error in master initialization:', error);
    }
  }
  
  // Start initialization when the script loads
  masterInitialization();
  
  // Also initialize testimonials slider immediately when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeTestimonialsSlider();
    });
  } else {
    initializeTestimonialsSlider();
  }
  



    /* ==============================================
    Fixed Cinematic Section
  ============================================== */
  const section = document.querySelector(".cinema-section");
  const cinematic = section.querySelector(".cinematic");
  const text = cinematic.querySelector(".running-text");

  text.style.willChange = "transform";

  // Create ScrollTrigger for pinning
  const pinTrigger = ScrollTrigger.create({
    trigger: section,
    start: () => window.innerWidth < 768 ? "bottom bottom" : "bottom bottom", 
    end: "+=100%", // Add end point
    pin: true,
    pinSpacing: true, // Enable pin spacing to prevent overlap
    pinType: "transform",
    anticipatePin: 1,
    onEnter: () => {
      ScrollTrigger.refresh();
    },
    onLeaveBack: () => {
      ScrollTrigger.refresh();
    }
  });

  // Animation that runs while pinned
  gsap.to(text, {
    y: () => {
      const containerHeight = cinematic.offsetHeight;
      const textHeight = text.scrollHeight;
      const scrollDistance = (textHeight - containerHeight);
      return -scrollDistance;
    },
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: section,
      start: () => window.innerWidth < 768 ? "bottom bottom" : "bottom bottom",
      end: "+=100%",
      scrub: 0.6,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        ScrollTrigger.refresh();
      }
    }
  });


  /* ==============================================
    Gsap Animations
  ============================================== */
  
  
  if (window.innerWidth >= 768) {
    gsap.from(".hero-image img", {
      scale: 2,
      duration: 2,
      ease: "power4.inOut"
    });
  
    gsap.fromTo(".hero-image img",
      { scale: 1, yPercent: 0 },
      {
        scale: 1,
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }
  
  
  
  document.querySelectorAll(".big-cover img, .big-image img, .testimonial-image img").forEach((img) => {
    gsap.fromTo(img,
      { scale: 1.5 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".big-cover img, .big-image img, .testimonial-image img"),
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
  
  
  gsap.fromTo("video",
    { scale: 0.8},
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "video",
        start: "top 100%",
        end: "bottom 100%",
        scrub: 2
      }
    }
  );
  
  
  document.querySelectorAll(".hero").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 1, yPercent: 0 },
        {
          opacity: 0.3,
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 100%",
            end: "bottom 0%",
            scrub: true
          }
        }
      );
  });
  
  
  gsap.fromTo(".arches",
    {
      clipPath: 'circle(0% at 50% 50%)',
    },
    {
      clipPath: 'circle(75% at 50% 50%)',
      ease: "power1.out",
    duration:5,
      scrollTrigger: {
        trigger: ".healing-section",
        start: "top 0%",
        end: "bottom 120%",
        scrub: 1
      }
    }
  );
  
  
  
  /* ==============================================
    Text Clipping Color fill
  ============================================== */
  
  const masks = document.querySelectorAll(".marker-mask");
  
  masks.forEach(mask => {
    gsap.to(mask, {
      width: "0%",
      ease: "none",
      scrollTrigger: {
        trigger: mask.parentElement,
        start: "top bottom",
        end: "bottom center",
        scrub: 0.5,
        markers: false
      }
    });
  });
  
  
  
  /* ==============================================
    Healing tabs
  ============================================== */

  
  if (window.innerWidth > 768) {
    
    const image = document.querySelector(".image-content");

    // Initial fixed position and hidden state
    image.style.position = "fixed";
    image.style.opacity = 0;
    image.style.transform = "scale(0.5)";
    image.style.pointerEvents = "none";

    const animationSettings = {
      duration: 0.7,
      ease: "power4.out"
    };

    ScrollTrigger.create({
      trigger: ".tab-accordion",
      start: "top 50%",
      end: "bottom 50%",
      //markers:true,
      onEnter: () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          ...animationSettings
        });
      },
      onLeave: () => {
        gsap.to(image, {
          opacity: 0,
          scale: 0.3,
          rotate: 8,
          ...animationSettings
        });
      },
      onEnterBack: () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          ...animationSettings
        });
      },
      onLeaveBack: () => {
        gsap.to(image, {
          opacity: 0,
          scale: 0.3,
          rotate: 8,
          ...animationSettings
        });
      }
    });

    // Parallax and rotation based on mouse movement
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const movementStrength = 200;
    const rotationStrength = 8;
    const ease = 0.04;

    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      targetX = x * movementStrength;
      targetY = y * movementStrength;
      targetRotY = x * rotationStrength;
      targetRotX = -y * rotationStrength;
    });

    function animateMovement() {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentRotX += (targetRotX - currentRotX) * ease;
      currentRotY += (targetRotY - currentRotY) * ease;

      gsap.set(image, {
        x: currentX,
        y: currentY,
        rotateX: currentRotX,
        rotateY: currentRotY,
        transformPerspective: 200,
        transformOrigin: "center"
      });

      requestAnimationFrame(animateMovement);
    }

    animateMovement();
}
  
  // Initialize healing tabs immediately
  function initializeHealingTabsWithDelay() {
    // Force layout recalculation
    document.body.offsetHeight;
    
    // Initialize healing tabs
    initializeHealingTabs();
  }
  
  // Initial call with proper timing
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      initializeHealingTabsWithDelay();
    }, 500);
  });
  
  
  /* ==============================================
    Image Parallax effect
  ============================================== */
  
  
  document.querySelectorAll(".parallax").forEach((section) => {
      const image = section.querySelector("img");
  
      gsap.fromTo(image,
          {
              yPercent: -10,
              scale: 1.2
          },
          {
              yPercent: 10,
              scale: 1.2,
              ease: "none",
              scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
              }
          }
      );
  });
  
  


  
  /* ==============================================
    FAQ Grid
  ============================================== */
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const faqItems = document.querySelectorAll('.faq-item');
      
      // Set initial state for all FAQ items
      faqItems.forEach((item, index) => {
          const content = item.querySelector('.faq-content');
          const header = item.querySelector('.faq-header');
          
          // Hide all FAQ items except the first one
          if (index === 0) {
              item.classList.add('active');
          } else {
              content.style.maxHeight = '0';
              content.style.padding = '0 1.5rem';
              content.style.overflow = 'hidden';
          }
          
          header.addEventListener('click', () => {
              const isActive = item.classList.contains('active');
              
              // Close all items first
              faqItems.forEach(otherItem => {
                  const otherContent = otherItem.querySelector('.faq-content');
                  otherItem.classList.remove('active');
                  otherContent.style.maxHeight = '0';
                  otherContent.style.padding = '0 1.5rem';
              });
              
              // If the clicked item wasn't active, open it
              if (!isActive) {
                  item.classList.add('active');
                  content.style.maxHeight = 'fit-content';
                  content.style.padding = '1.5rem';
              }
          });
      });
  });
  
  
  
  
  /* ==============================================
    Tabs Slider
  ============================================== */
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const accordionTabs = document.querySelectorAll('.tab-accordion .tab');
      const accordionImages = document.querySelectorAll('.tab-accordion .tab-image');
      
      // Ensure first tab is always active and first image is shown
      const firstTab = accordionTabs[0];
      const firstTabNumber = firstTab ? firstTab.getAttribute('data-tab') : null;
      
      // Set initial state for all tabs
      accordionTabs.forEach((tab, index) => {
          const content = tab.querySelector('.tab-content');
          const header = tab.querySelector('h4');
          
          // Hide all tabs except the first one
          if (index === 0) {
              tab.classList.add('active');
              content.style.height = 'auto';
              content.style.paddingTop = '2vw';
              content.style.transform = 'scaleY(1)';
          } else {
              content.style.height = '0';
              content.style.overflow = 'hidden';
              content.style.transform = 'scaleY(0)';
          }
          
          // Set initial state for images - ensure first image is always active
          const tabNumber = tab.getAttribute('data-tab');
          accordionImages.forEach(img => {
              if (img.getAttribute('data-tab') === tabNumber) {
                  if (index === 0 || tabNumber === firstTabNumber) {
                      img.classList.add('active');
                      img.style.opacity = '1';
                      img.style.transform = 'scale(1)';
                  } else {
                      img.classList.remove('active');
                      img.style.opacity = '0';
                      img.style.transform = 'scale(0.95)';
                  }
              }
          });
          
          header.addEventListener('click', () => {
              // If clicking the active tab, do nothing
              if (tab.classList.contains('active')) {
                  return;
              }
              
              // Close all other tabs
              accordionTabs.forEach(otherTab => {
                  const otherContent = otherTab.querySelector('.tab-content');
                  otherTab.classList.remove('active');
                  otherContent.style.height = '0';
                  otherContent.style.transform = 'scaleY(0)';
              });
              
              // Open the clicked tab
              tab.classList.add('active');
              content.style.height = 'auto';
              content.style.paddingTop = '2vw';
              content.style.transform = 'scaleY(1)';
              
              // Animate tab images with GSAP (desktop only)
              if (window.innerWidth >= 768) {
                  const tabNumber = tab.getAttribute('data-tab');
                  let currentActiveImg = null;
                  let nextActiveImg = null;
                  accordionImages.forEach(img => {
                      if (img.classList.contains('active')) {
                          currentActiveImg = img;
                      }
                      if (img.getAttribute('data-tab') === tabNumber) {
                          nextActiveImg = img;
                      }
                  });
                  if (currentActiveImg && currentActiveImg !== nextActiveImg) {
                      gsap.to(currentActiveImg, { opacity: 0, scale: 0.95, duration: 0.5, onComplete: () => {
                          currentActiveImg.classList.remove('active');
                          gsap.set(currentActiveImg, { clearProps: 'opacity,scale' });
                      }});
                  }
                  if (nextActiveImg && !nextActiveImg.classList.contains('active')) {
                      nextActiveImg.classList.add('active');
                      gsap.fromTo(nextActiveImg, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 });
                  }
              } else {
                  // Mobile: Simple show/hide without animations
                  const tabNumber = tab.getAttribute('data-tab');
                  accordionImages.forEach(img => {
                      if (img.getAttribute('data-tab') === tabNumber) {
                          img.classList.add('active');
                          img.style.opacity = '1';
                          img.style.transform = 'scale(1)';
                      } else {
                          img.classList.remove('active');
                          img.style.opacity = '0';
                          img.style.transform = 'scale(0.95)';
                      }
                  });
              }
          });
      });
    
    
    if (window.innerWidth < 768) {
      const imageContainer = document.querySelector('.tab-accordion .image-content');
      const images = Array.from(imageContainer.querySelectorAll('.tab-image'));
      const tabs = document.querySelectorAll('.tab-accordion .tab');
  
      // Ensure first tab is properly set up on mobile
      const firstTab = tabs[0];
      if (firstTab) {
          const firstTabContent = firstTab.querySelector('.tab-content');
          firstTabContent.style.height = 'auto';
          firstTabContent.style.paddingTop = '2vw';
          firstTabContent.style.transform = 'scaleY(1)';
          firstTab.classList.add('active');
      }
  
      tabs.forEach(tab => {
        const tabNumber = tab.getAttribute('data-tab');
        const matchingImage = images.find(img => img.getAttribute('data-tab') === tabNumber);
  
        if (matchingImage && !tab.contains(matchingImage)) {
          const h4 = tab.querySelector('h4');
          tab.insertBefore(matchingImage, h4);
          
          // Ensure first image is visible on mobile
          if (tab === firstTab) {
              matchingImage.classList.add('active');
              matchingImage.style.opacity = '1';
              matchingImage.style.transform = 'scale(1)';
          } else {
              matchingImage.classList.remove('active');
              matchingImage.style.opacity = '0';
              matchingImage.style.transform = 'scale(0.95)';
          }
        }
      });
  
      imageContainer.remove();
    }
    
  });
  
  
  
  
  
  
  
 
  
  
  /* ==============================================
    Testimonials Slider
  ============================================== */
  
  
  // Initialize testimonials slider immediately
  function initializeTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const backgroundImages = document.querySelectorAll('.testimonial-image');
    const prevBtn = document.querySelector('.arrow-back');
    const nextBtn = document.querySelector('.arrow-next');
    const progressBar = document.querySelector('.progress-bar');
    
    if (testimonials.length === 0) {
      console.warn("No testimonials found");
      return;
    }
    
    let currentIndex = 0;
    const totalSlides = testimonials.length;
    
    function updateActiveSlide() {
      // Update testimonials
      testimonials.forEach((testimonial, index) => {
        if (index === currentIndex) {
          testimonial.classList.add('active');
          testimonial.style.opacity = '1';
          testimonial.style.transform = 'translate(-0%, -0%) scale(1)';
        } else {
          testimonial.classList.remove('active');
          testimonial.style.opacity = '0';
          testimonial.style.transform = 'translate(-0%, -0%) scale(0.95)';
        }
      });
      
      // Update background images
      backgroundImages.forEach((image, index) => {
        if (index === currentIndex) {
          image.classList.add('active');
        } else {
          image.classList.remove('active');
        }
      });
      
      // Reset progress bar
      if (progressBar) progressBar.style.width = '0%';

      // Simple text animation for active testimonial (works on both mobile and desktop)
      const activeTestimonial = testimonials[currentIndex];
      const textElements = activeTestimonial.querySelectorAll('h4, h5, h6, p, .testimonial-text');
      textElements.forEach(el => {
        // Simple fade-in animation instead of SplitText
        gsap.fromTo(el, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
            stagger: 0.1
          }
        );
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateActiveSlide();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateActiveSlide();
    }
    
    // Add event listeners to buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
      });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        prevSlide(); // RTL layout
      } else if (e.key === 'ArrowLeft') {
        nextSlide(); // RTL layout
      }
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    
    // Initialize first slide
    updateActiveSlide();
  }

  
  /* ==============================================
    Split Text Animation
   ============================================== */
  
  // Initialize SplitText animations after DOM content is loaded
  async function initializeSplitTextAnimations() {
    try {
      const newContent = document.querySelector("body");
      if (!newContent) return;
    
      // Wait for DOM content to be loaded (skip videos and heavy resources)
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      
      // Wait for fonts to load (with timeout)
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
      } catch (error) {
        console.warn('Font loading timeout');
      }
      
      // Short wait for elements
      await new Promise(resolve => setTimeout(resolve, 300));
    
      const elements = [...newContent.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, .btn, .nav"
      )].filter(el => 
        !el.matches(".running-text h6") &&
        !el.closest('.no-global-split') &&
        el.offsetHeight > 0 && // Only animate visible elements
        el.offsetWidth > 0 &&
        el.textContent.trim().length > 0 && // Only animate elements with text
        window.getComputedStyle(el).display !== 'none' && // Only animate visible elements
        window.getComputedStyle(el).visibility !== 'hidden'
      );

      if (elements.length === 0) {
        console.warn("No elements found for SplitText animation");
        return;
      }

      let masterDelay = 0.5;

      elements.forEach((el) => {
        if (el.closest(".image-container")) return;

        // Ensure element is properly rendered
        el.style.display = "block";
        el.offsetHeight; // Force reflow

        try {
          // Additional check to ensure element is truly ready
          if (!el.textContent.trim() || el.offsetHeight === 0) {
            console.warn("Element not ready for SplitText:", el);
            return;
          }
          
          const split = new SplitText(el, { 
            type: "lines", 
            linesClass: "line",
            forceClass: "split-text"
          });

          if (!split.lines || split.lines.length === 0) {
            console.warn("SplitText failed for element:", el);
            return;
          }

          split.lines.forEach((line) => {
            line.style.display = "inline-block";
            line.style.width = "100%";
            line.style.lineHeight = "unset";
            line.style.visibility = "hidden";
          });

          gsap.set(split.lines, {
            visibility: "visible",
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: 1
          });

          gsap.to(split.lines, {
            yPercent: 0,
            clipPath: "inset(-20% -10% -20% 0%)",
            opacity: 1,
            stagger: 0.12,
            duration: 1.6,
            delay: el.closest(".hero") ? masterDelay : 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: window.innerWidth < 768 ? "top 80%" : "top 100%",
              end: "bottom 100%",
              toggleActions: "play none none none",
              once: true
            }
          });

          if (el.closest(".hero")) masterDelay += 0.25;
        } catch (error) {
          console.error("Error creating SplitText for element:", el, error);
        }
      });
      
      // Refresh ScrollTrigger after SplitText animations are created
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
    } catch (error) {
      console.error('Error initializing SplitText animations:', error);
      
      // Retry once after a delay if it failed
      setTimeout(async () => {
        try {
          console.log('Retrying SplitText initialization...');
          await initializeSplitTextAnimations();
        } catch (retryError) {
          console.error('SplitText retry also failed:', retryError);
        }
      }, 1000);
    }
  }
  
  
  
  
  
  /* ==============================================
    Responsive Behavior on Screen Resize
  ============================================== */
    
    // Throttled resize handler to prevent excessive calls
    let resizeTimeout;
    let lastWidth = window.innerWidth;
    
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const currentWidth = window.innerWidth;
            if ((lastWidth > 768 && currentWidth <= 768) || (lastWidth <= 768 && currentWidth > 768)) {
                window.location.reload();
            }
            lastWidth = currentWidth;
        }, 250); // Throttle to 250ms
    });
      
  
    
  /* ==============================================
     Slider Gallery (Multiple Instances)
  ============================================== */
  
  class DragScroll {
    constructor(el, wrap, item) {
      this.el = el;
      this.wrap = this.el.querySelector(wrap);
      this.items = this.el.querySelectorAll(item);
      this.dragThreshold = 5;
      this.isDragging = false;
      this.isMouseDown = false;
      this.startX = 0;
      this.startY = 0;
      this.isHorizontalDrag = false;
      this.startTime = 0;
      this.progress = 0;
      this.x = 0;
      this.maxScroll = 0;
      this.gridGap = 0;
      this.lastScrollY = window.scrollY || 0;
      this.init();
    }
  
    init() {
      this.bindEvents();
      requestAnimationFrame(() => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            setTimeout(() => this.calculate(), 0);
          });
        } else {
          setTimeout(() => this.calculate(), 0);
        }
      });
      this.raf();
    }
  
    bindEvents() {
      // Store references to event handlers for cleanup
      this.handleResize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.calculate(), 100);
      };
      this.handleStartBound = (e) => this.handleStart(e);
      this.handleMoveBound = (e) => this.handleMove(e);
      this.handleEndBound = (e) => this.handleEnd(e);
      this.handleWheelBound = (e) => this.handleWheel(e);
      this.handleScrollBound = () => this.handleScroll();
      this.preventDragOnLinksBound = (e) => this.preventDragOnLinks(e);
      
      // Throttled resize handler
      this.resizeTimeout = null;
      window.addEventListener("resize", this.handleResize);
      this.el.addEventListener("mousedown", this.handleStartBound);
      this.el.addEventListener("touchstart", this.handleStartBound);
      window.addEventListener("mousemove", this.handleMoveBound);
      window.addEventListener("mouseup", this.handleEndBound);
      this.wrap.addEventListener("touchstart", this.handleStartBound);
      window.addEventListener("touchmove", this.handleMoveBound, { passive: false });
      window.addEventListener("touchend", this.handleEndBound);
      this.wrap.addEventListener("dragstart", this.preventDragOnLinksBound);
      window.addEventListener("wheel", this.handleWheelBound, { passive: true });
      window.addEventListener("scroll", this.handleScrollBound, { passive: true });
    }
  
    calculate() {
      const computedStyle = window.getComputedStyle(this.wrap);
      const gridGap = parseFloat(computedStyle.getPropertyValue("grid-gap") || "0");
  
      this.gridGap = gridGap;
      this.wrapWidth = Array.from(this.items).reduce((acc, item) => acc + item.offsetWidth, 0) +
        this.gridGap * (this.items.length - 1);
  
      this.containerWidth = this.el.clientWidth;
  
      const lastItem = this.items[this.items.length - 1];
      const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;
  
      this.maxScroll = lastItemRight - this.el.clientWidth;
      this.progress = Math.min(this.progress, this.maxScroll);
    }
  
    handleStart(e) {
      this.isMouseDown = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.startY = e.clientY || e.touches[0].clientY;
      this.lastX = this.startX;
      this.lastY = this.startY;
      this.isDragging = false;
      this.isHorizontalDrag = false;
    }
  
    handleMove(e) {
      if (!this.isMouseDown) return;
  
      const currentX = e.clientX || e.touches[0].clientX;
      const currentY = e.clientY || e.touches[0].clientY;
      const deltaX = currentX - this.lastX;
      const deltaY = currentY - this.lastY;
  
      this.lastX = currentX;
      this.lastY = currentY;
  
      const isTouch = e.type.includes("touch");
  
      if (!this.isHorizontalDrag) {
        if (isTouch && Math.abs(deltaY) > Math.abs(deltaX)) {
          this.progress += deltaY * 2.5;
          this.move();
          return;
        }
  
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          this.isHorizontalDrag = true;
        } else {
          return;
        }
      }
  
      e.preventDefault();
      this.isDragging = true;
      this.progress += -deltaX * 2.5;
      this.move();
    }
  
    handleEnd() {
      this.isMouseDown = false;
      this.isDragging = false;
    }
  
    handleWheel(e) {
      const rect = this.el.getBoundingClientRect();
      const triggerOffset = window.innerHeight * 0.5;
  
      const isInExpandedViewport =
        rect.bottom > -triggerOffset && rect.top < window.innerHeight + triggerOffset;
  
      if (!isInExpandedViewport) return;
  
      const isTrackpad = Math.abs(e.deltaY) < 50;
      const multiplier = isTrackpad ? 6 : 2;
  
      const delta = e.deltaY * multiplier;
      const newProgress = Math.max(0, Math.min(this.progress + delta, this.maxScroll));
  
      gsap.to(this, {
        progress: newProgress,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => this.move()
      });
    }
  
    handleScroll() {
      const rect = this.el.getBoundingClientRect();
      const triggerOffset = window.innerHeight * 0.5;
  
      const isInExpandedViewport =
        rect.bottom > -triggerOffset && rect.top < window.innerHeight + triggerOffset;
  
      if (!isInExpandedViewport) return;
  
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollDelta = scrollY - this.lastScrollY;
      this.lastScrollY = scrollY;
  
      if (Math.abs(scrollDelta) < 2) return;
  
      const delta = scrollDelta * 2.5;
      const newProgress = Math.max(0, Math.min(this.progress + delta, this.maxScroll));
  
      gsap.to(this, {
        progress: newProgress,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => this.move()
      });
    }
  
    move() {
      this.progress = Math.max(0, Math.min(this.progress, this.maxScroll));
      this.wrap.style.transform = `translateX(${-this.progress}px)`;
    }
  
    resetToStart() {
      this.progress = 0;
      this.move();
    }
  
    preventDragOnLinks(e) {
      if (e.target.tagName === "A") {
        e.preventDefault();
      }
    }
  
    raf() {
      // Only update if there's a significant difference to reduce CPU usage
      const diff = Math.abs(this.progress - this.x);
      if (diff > 0.1) {
        this.x += (this.progress - this.x) * 0.1;
        this.wrap.style.transform = `translateX(${-this.x}px)`;
      }
      requestAnimationFrame(this.raf.bind(this));
    }
    
    // Cleanup method to remove event listeners
    destroy() {
      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("mousemove", this.handleMoveBound);
      window.removeEventListener("mouseup", this.handleEndBound);
      window.removeEventListener("touchmove", this.handleMoveBound);
      window.removeEventListener("touchend", this.handleEndBound);
      window.removeEventListener("wheel", this.handleWheelBound);
      window.removeEventListener("scroll", this.handleScrollBound);
      this.el.removeEventListener("mousedown", this.handleStartBound);
      this.el.removeEventListener("touchstart", this.handleStartBound);
      this.wrap.removeEventListener("dragstart", this.preventDragOnLinksBound);
    }
  }
  
  const sliders = [];
  document.querySelectorAll(".slider").forEach((sliderElement) => {
    sliders.push(new DragScroll(sliderElement, ".slider-wrapper", ".slider-item"));
  });
  
  
  
  
  
  
  /* ==============================================
     Show/Hide Grid on Keypress
  ============================================== */
    
  
      document.addEventListener("keydown", function (event) {
          if (event.key.toLowerCase() === "g") {
              const gridOverlay = document.querySelector(".grid-overlay");
              if (gridOverlay) {
                  gridOverlay.remove();
              } else {
                  const overlay = document.createElement("div");
                  overlay.className = "grid-overlay";
                  for (let i = 0; i < 12; i++) {
                      const column = document.createElement("div");
                      overlay.appendChild(column);
                  }
                  document.body.appendChild(overlay);
              }
          }
      });
  
  
  
  
  /* ==============================================
    Custom Smooth Scrolling
  ============================================== */
  
  
  function initSmoothScroll() {
  const script = document.createElement("script");
  script.src = "https://cdn.prod.website-files.com/659fe92f193868b7c3f4da3b/65d84ab5a204cd113a363a4f_lenis-smooth.txt";
  script.onload = () => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };
  document.head.appendChild(script);
}

initSmoothScroll();
  
  
  // Add navigation arrows to each .slider (desktop only)
  if (window.innerWidth > 768) {
    document.querySelectorAll('.slider').forEach((sliderElement, sliderIndex) => {
      const sliderWrapper = sliderElement.querySelector('.slider-wrapper');
      const sliderItems = sliderElement.querySelectorAll('.slider-item');
      if (!sliderWrapper || sliderItems.length < 2) return;

      // Create arrow container
      const navWrapper = document.createElement('div');
      navWrapper.className = 'slider-arrows';
      navWrapper.style.display = 'flex';
      navWrapper.style.justifyContent = 'center';
      navWrapper.style.gap = '2vw';
      navWrapper.style.marginTop = '2vw';

      // Create left arrow
      const leftArrow = document.createElement('button');
      leftArrow.innerHTML = '&#8592;';
      leftArrow.setAttribute('aria-label', 'Previous Slide');
      leftArrow.style.fontSize = '2rem';
      leftArrow.style.background = 'none';
      leftArrow.style.border = 'none';
      leftArrow.style.cursor = 'pointer';
      leftArrow.style.color = 'var(--yellow, #FFC700)';
      leftArrow.style.transition = 'color 0.2s';
      leftArrow.onmouseover = () => leftArrow.style.color = 'var(--darkblue, #222B3A)';
      leftArrow.onmouseout = () => leftArrow.style.color = 'var(--yellow, #FFC700)';

      // Create right arrow
      const rightArrow = document.createElement('button');
      rightArrow.innerHTML = '&#8594;';
      rightArrow.setAttribute('aria-label', 'Next Slide');
      rightArrow.style.fontSize = '2rem';
      rightArrow.style.background = 'none';
      rightArrow.style.border = 'none';
      rightArrow.style.cursor = 'pointer';
      rightArrow.style.color = 'var(--yellow, #FFC700)';
      rightArrow.style.transition = 'color 0.2s';
      rightArrow.onmouseover = () => rightArrow.style.color = 'var(--darkblue, #222B3A)';
      rightArrow.onmouseout = () => rightArrow.style.color = 'var(--yellow, #FFC700)';

      navWrapper.appendChild(leftArrow);
      navWrapper.appendChild(rightArrow);
      sliderElement.appendChild(navWrapper);

      // Find the DragScroll instance for this slider
      let dragScrollInstance = null;
      if (window.sliders && window.sliders[sliderIndex]) {
        dragScrollInstance = window.sliders[sliderIndex];
      } else if (typeof sliders !== 'undefined' && sliders[sliderIndex]) {
        dragScrollInstance = sliders[sliderIndex];
      }

      // Helper to get current item index
      function getCurrentIndex() {
        // Find the closest item to the left edge
        let minDiff = Infinity;
        let closestIdx = 0;
        sliderItems.forEach((item, idx) => {
          const diff = Math.abs(item.offsetLeft - (dragScrollInstance ? dragScrollInstance.progress : sliderWrapper.scrollLeft));
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });
        return closestIdx;
      }

      // Scroll to a specific item
      function scrollToIndex(idx) {
        if (!dragScrollInstance) return;
        const item = sliderItems[idx];
        if (!item) return;
        const target = item.offsetLeft;
        dragScrollInstance.progress = target;
        dragScrollInstance.move();
      }

      leftArrow.addEventListener('click', () => {
        const current = getCurrentIndex();
        const prev = (current - 1 + sliderItems.length) % sliderItems.length;
        scrollToIndex(prev);
      });
      rightArrow.addEventListener('click', () => {
        const current = getCurrentIndex();
        const next = (current + 1) % sliderItems.length;
        scrollToIndex(next);
      });
    });
  }
  
  

  
  window.addEventListener('DOMContentLoaded', initVWFontZoomSafeForGSAP);
  
  // Final ScrollTrigger refresh after window load
  window.addEventListener('load', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  });




