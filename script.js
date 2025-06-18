// Wait for GSAP and plugins to be fully loaded
function waitForGSAP() {
    return new Promise((resolve) => {
      if (window.gsap && window.ScrollTrigger) {
        resolve();
      } else {
        const checkGSAP = setInterval(() => {
          if (window.gsap && window.ScrollTrigger) {
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
        onComplete: () => overlay.remove()
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
  
    } catch (error) {
      console.error('Error during page initialization:', error);
    }
  }
  
  // Start initialization when the script loads
  initializePage();
  
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
        start: "top center",
        end: "bottom center",
        scrub: 1.2,
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
        trigger: ".all-tabs-section",
        start: "top 0%",
        end: "bottom 0%",
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
    Fixed Cinematic Section
  ============================================== */
  
  
  
  document.fonts.ready.then(() => {
    setTimeout(() => {
      const section = document.querySelector(".cinema-section");
      const cinematic = section.querySelector(".cinematic");
      const text = cinematic.querySelector(".running-text");
  
      text.style.willChange = "transform";
  
      gsap.to(text, {
        y: () => -(text.scrollHeight - cinematic.clientHeight),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: () => window.innerWidth < 768 ? "bottom 50%" : "bottom bottom",
          end: () => "+=" + (text.scrollHeight - cinematic.clientHeight),
          scrub: 0.7,
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }, 100);
  });
  
  
  
  
  
  
  
  
  /* ==============================================
    FAQ Grid
  ============================================== */
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
          const content = item.querySelector('.faq-content');
          // Set initial styles for all faq-content
          Object.assign(content.style, {
              padding: "0 1.5rem",
              maxHeight: "0",
              overflow: "hidden",
              transition: "all 0.5s ease"
          });
  
          const header = item.querySelector('.faq-header');
          header.addEventListener('click', () => {
              const isActive = item.classList.contains('active');
  
              // Close all items first
              faqItems.forEach(otherItem => {
                  otherItem.classList.remove('active');
                  const otherContent = otherItem.querySelector('.faq-content');
                  Object.assign(otherContent.style, {
                      padding: "0 1.5rem",
                      maxHeight: "0",
                      overflow: "hidden",
                      transition: "all 0.5s ease"
                  });
              });
  
              // If the clicked item wasn't active, open it
              if (!isActive) {
                  item.classList.add('active');
                  Object.assign(content.style, {
                      padding: "1.5rem",
                      maxHeight: content.scrollHeight + "px",
                      overflow: "visible",
                      transition: "all 0.25s ease"
                  });
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
      
      accordionTabs.forEach(tab => {
          const header = tab.querySelector('h4');
          
          header.addEventListener('click', () => {
              // If clicking the active tab, do nothing
              if (tab.classList.contains('active')) {
                  return;
              }
              
              // Close all other tabs
              accordionTabs.forEach(otherTab => {
                  otherTab.classList.remove('active');
              });
              
              // Open the clicked tab
              tab.classList.add('active');
              
              // Update images
              const tabNumber = tab.getAttribute('data-tab');
              accordionImages.forEach(img => {
                  if (img.getAttribute('data-tab') === tabNumber) {
                      img.classList.add('active');
                  } else {
                      img.classList.remove('active');
                  }
              });
          });
      });
    
    
    if (window.innerWidth < 768) {
      const imageContainer = document.querySelector('.tab-accordion .image-content');
      const images = Array.from(imageContainer.querySelectorAll('.tab-image'));
      const tabs = document.querySelectorAll('.tab-accordion .tab');
  
      tabs.forEach(tab => {
        const tabNumber = tab.getAttribute('data-tab');
        const matchingImage = images.find(img => img.getAttribute('data-tab') === tabNumber);
  
        if (matchingImage && !tab.contains(matchingImage)) {
  
          const h4 = tab.querySelector('h4');
          tab.insertBefore(matchingImage, h4);
        }
      });
  
      imageContainer.remove();
    }
    
  });
  
  
  
  
  
  
  
  
  
  /* ==============================================
    Testimonials Slider
  ============================================== */
  
  
  document.addEventListener('DOMContentLoaded', function() {
      const testimonials = document.querySelectorAll('.testimonial');
      const backgroundImages = document.querySelectorAll('.testimonial-image');
      const prevBtn = document.querySelector('.arrow-back');
      const nextBtn = document.querySelector('.arrow-next');
      const progressBar = document.querySelector('.progress-bar');
      
      let currentIndex = 0;
      const totalSlides = testimonials.length;
      const slideInterval = 5000; // 5 seconds
      let progressWidth = 0;
      let progressTimer;
      let slideTimer;
      let startTime;
      
      // Initialize first slide
      updateActiveSlide();
      startProgress();
      
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
          
          // Reset and restart progress
          resetProgress();
          startProgress();
      }
      
      function startProgress() {
          // Clear any existing timers
          resetProgress();
          
          // Set start time
          startTime = Date.now();
          
          // Update progress bar using requestAnimationFrame for smoother animation
          function updateProgress() {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              progressWidth = (elapsed / slideInterval) * 100;
              
              if (progressWidth <= 100) {
                  progressBar.style.width = progressWidth + '%';
                  progressTimer = requestAnimationFrame(updateProgress);
              } else {
                  progressBar.style.width = '100%';
                  nextSlide();
              }
          }
          
          // Start the progress animation
          progressTimer = requestAnimationFrame(updateProgress);
          
          // Set timer for next slide
          slideTimer = setTimeout(nextSlide, slideInterval);
      }
      
      function resetProgress() {
          if (progressTimer) {
              cancelAnimationFrame(progressTimer);
          }
          clearTimeout(slideTimer);
          progressWidth = 0;
          progressBar.style.width = '0%';
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
      nextBtn.addEventListener('click', () => {
          nextSlide();
      });
      
      prevBtn.addEventListener('click', () => {
          prevSlide();
      });
      
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
          resetProgress(); // Pause progress when touching
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
          } else {
              // If no swipe, restart progress
              startProgress();
          }
      }
  });
  
  
  /* ==============================================
    Split Text Animation
   ============================================== */
  
  const ctx = gsap.context(() => {
    const newContent = document.querySelector("body");
    if (!newContent) return;
  
    document.fonts.ready.then(() => {
      setTimeout(() => {
        const elements = [...newContent.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, .btn, .nav"
        )].filter(el => !el.matches(".running-text h6"));
  
        let masterDelay = 1;
  
        elements.forEach((el) => {
          if (el.closest(".image-container")) return;
  
          el.style.display = "block";
          el.offsetHeight;
  
          const split = new SplitText(el, { 
            type: "lines", 
            linesClass: "line",
            forceClass: "split-text"
          });
  
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
  
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: window.innerWidth < 768 ? "top 80%" : "top 100%",
              end: "bottom 100%",
              toggleActions: "play none none none",
              once: true
            },
            paused: true,
            onComplete: () => {
              split.revert();
            }
          });
  
          tl.to(split.lines, {
            yPercent: 0,
            clipPath: "inset(-20% -10% -20% 0%)",
            opacity: 1,
            stagger: 0.12,
            duration: 1.6,
            delay: el.closest(".hero") ? masterDelay : 0,
            ease: "power3.out"
          });
  
          if (el.closest(".hero")) masterDelay += 0.25;
        });
      }, 100);
    });
  }, document.body);
  
  
  
  
  
  /* ==============================================
    Responsive Behavior on Screen Resize
  ============================================== */
    
  
    
      let lastWidth = window.innerWidth;
      window.addEventListener("resize", () => {
          const currentWidth = window.innerWidth;
          if ((lastWidth > 768 && currentWidth <= 768) || (lastWidth <= 768 && currentWidth > 768)) {
              window.location.reload();
          }
          lastWidth = currentWidth;
      });
      
  
      
  /* ==============================================
    Navbar Show/Hide Logic
  ============================================== */
  
  
  /*
  
  const nav = document.querySelector(".logo");
  let lastScrollTop = 0;
  
  window.addEventListener("scroll", function () {
      const st = window.pageYOffset || document.documentElement.scrollTop;
  
      // Prevent navbar changes if the mobile menu is open
      if (document.querySelector(".mobile-menu.open")) {
          return;
      }
  
      if (st > 20) {
          nav.classList.add("fixed");
      } else {
          nav.classList.remove("fixed");
          nav.classList.remove("scroll");
      }
  
      if (Math.abs(st - lastScrollTop) > 20) {
          if (st > 100 && st > lastScrollTop) {
              nav.classList.add("scroll");
          } else if (st > 100 && st < lastScrollTop) {
              nav.classList.remove("scroll");
          }
          lastScrollTop = st;
      }
  });
  */
  
    
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
      window.addEventListener("resize", () => this.calculate());
      this.el.addEventListener("mousedown", (e) => this.handleStart(e));
      this.el.addEventListener("touchstart", (e) => this.handleStart(e));
      window.addEventListener("mousemove", (e) => this.handleMove(e));
      window.addEventListener("mouseup", (e) => this.handleEnd(e));
      this.wrap.addEventListener("touchstart", (e) => this.handleStart(e));
      window.addEventListener("touchmove", (e) => this.handleMove(e), { passive: false });
      window.addEventListener("touchend", (e) => this.handleEnd(e));
      this.wrap.addEventListener("dragstart", (e) => this.preventDragOnLinks(e));
      window.addEventListener("wheel", (e) => this.handleWheel(e), { passive: true });
      window.addEventListener("scroll", () => this.handleScroll(), { passive: true });
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
      this.x += (this.progress - this.x) * 0.1;
      this.wrap.style.transform = `translateX(${-this.x}px)`;
      requestAnimationFrame(this.raf.bind(this));
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
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    // Global Settings
    const isMobile = window.innerWidth < 768;
    const SCROLL_SETTINGS = {
      smoothness: isMobile ? 0.04 : 0.05,
      touchMultiplier: isMobile ? 3.5 : 2.2,
      dragMultiplier: isMobile ? 0.5 : 2,
      easingSpeed: isMobile ? 100 : 120
    };
  
    const lerp = (start, end, t) => start * (1 - t) + end * t;
    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  
    class CustomSmoothScroll {
      constructor() {
        this.targetScroll = 0;
        this.currentScroll = 0;
        this.smoothness = SCROLL_SETTINGS.smoothness;
        this.touchMultiplier = SCROLL_SETTINGS.touchMultiplier;
        this.dragMultiplier = SCROLL_SETTINGS.dragMultiplier;
        this.easingSpeed = SCROLL_SETTINGS.easingSpeed;
        this.scrollEnabled = true;
        this.lastFrameTime = performance.now();
        this.init();
      }
  
      init() {
        this.applyStyles();
        this.updateBodyHeight();
        this.bindEvents();
  
        document.querySelectorAll("video").forEach(video => {
          video.addEventListener("loadedmetadata", () => this.updateBodyHeight());
        });
  
        setTimeout(() => {
          this.scrollEnabled = true;
          this.forceScrollUpdate();
          this.smoothScrollLoop();
        }, 10);
      }
  
      applyStyles() {
        document.documentElement.style.scrollBehavior = "auto";
        setTimeout(() => {
          document.body.style.overflow = "hidden";
        }, 50);
      }
  
      bindEvents() {
        window.addEventListener("wheel", (e) => this.onScroll(e.deltaY), { passive: false });
        window.addEventListener("resize", () => this.updateBodyHeight());
  
        let startY = 0;
  
        window.addEventListener("touchstart", (e) => {
          startY = e.touches[0].clientY;
        }, { passive: false });
  
        window.addEventListener("touchmove", (e) => {
          const deltaY = (startY - e.touches[0].clientY) * this.touchMultiplier;
          this.onScroll(deltaY);
          startY = e.touches[0].clientY;
        }, { passive: false });
      }
  
      updateBodyHeight() {
        const scrollableContent = document.querySelector(".wrapper");
        if (scrollableContent) {
          document.body.style.height = `${scrollableContent.clientHeight}px`;
        }
      }
  
    onScroll(delta) {
      if (!this.scrollEnabled) return;
  
      const maxScroll = document.body.scrollHeight - window.innerHeight;
  
      // Prevent scroll if already at limits
      const isAtTop = this.targetScroll <= 0 && delta < 0;
      const isAtBottom = this.targetScroll >= maxScroll && delta > 0;
  
      if (isAtTop || isAtBottom) return;
  
      this.targetScroll = clamp(this.targetScroll + delta, 0, maxScroll);
    }
  
  
      forceScrollUpdate() {
        this.targetScroll = window.scrollY;
        this.currentScroll = this.targetScroll;
        window.scrollTo(0, this.targetScroll);
      }
  
      smoothScrollLoop() {
        const now = performance.now();
        const deltaTime = (now - this.lastFrameTime) / 1000;
        this.lastFrameTime = now;
  
        if (this.scrollEnabled) {
          const smoothingFactor = 1 - Math.pow(1 - this.smoothness, deltaTime * this.easingSpeed);
          this.currentScroll = lerp(this.currentScroll, this.targetScroll, smoothingFactor);
          window.scrollTo(0, this.currentScroll);
        }
  
        requestAnimationFrame(() => this.smoothScrollLoop());
      }
  
      restart(position = 0) {
        this.targetScroll = position;
        this.currentScroll = position;
        window.scrollTo(0, position);
      }
  
      destroy() {
        this.scrollEnabled = false;
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.documentElement.style.scrollBehavior = "";
        window.removeEventListener("wheel", this.onScroll);
        window.removeEventListener("resize", this.updateBodyHeight);
      }
    }
    
    window.addEventListener("touchmove", function(e) {
    if (window.scrollY === 0 && e.touches[0].clientY > 0) {
      e.preventDefault();
    }
  }, { passive: false });
  
    new CustomSmoothScroll();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Tab container grid styles
    document.querySelectorAll('.tab-container').forEach(container => {
      Object.assign(container.style, {
        display: 'grid',
        gridGap: window.innerWidth < 768 ? '10vw' : '2.5vw',
        width: window.innerWidth < 768 ? '100%' : '60%'
      });
    });

    // Tab content initial styles (visible by default, but script will hide as needed)
    document.querySelectorAll('.tab-content').forEach(content => {
      Object.assign(content.style, {
        transition: 'height 0.5s cubic-bezier(0,.12,0,.99)',
        transformOrigin: 'top',
      });
    });

    // Tab activation logic
    const tabs = document.querySelectorAll('.tab-accordion .tab');
    tabs.forEach(tab => {
      const header = tab.querySelector('h4');
      const content = tab.querySelector('.tab-content');
      const textPs = tab.querySelectorAll('.text-content p');
      header.addEventListener('click', () => {
        if (tab.classList.contains('active')) return;
        // Deactivate all tabs
        tabs.forEach(otherTab => {
          otherTab.classList.remove('active');
          const otherContent = otherTab.querySelector('.tab-content');
          if (otherContent) {
            Object.assign(otherContent.style, {
              display: 'none',
              height: '',
              paddingTop: '',
              transform: '',
            });
          }
          // Reset text-content p styles
          otherTab.querySelectorAll('.text-content p').forEach(p => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          });
        });
        // Activate clicked tab
        tab.classList.add('active');
        if (content) {
          Object.assign(content.style, {
            display: '', // revert to default
            height: 'auto',
            paddingTop: '2vw',
            transform: '',
          });
        }
        // Animate .text-content p
        textPs.forEach((p, i) => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          p.style.transition = 'none';
          setTimeout(() => {
            p.style.transition = 'all 0.5s cubic-bezier(0,.12,0,.99)';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 50 + i * 80);
        });
      });
    });
  });
