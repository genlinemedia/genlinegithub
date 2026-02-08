
document.addEventListener('DOMContentLoaded', () => {

  // MODAL
  const contactModal = document.getElementById('contactModal');
  const primaryCta = document.getElementById('primaryCta');

  // Function to open the modal
  window.openContactModal = function(service) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const serviceInput = document.getElementById('contactService');
    
    // Update modal content based on service
    if (service === 'Get Decision Sheet') {
      modalTitle.textContent = 'Get Your Packaging Strategy Roadmap';
      modalDescription.textContent = 'Request your free packaging roadmap to optimize your video packaging strategy.';
    } else if (service === 'Run Packaging Pilot') {
      modalTitle.textContent = 'Run the Packaging Pilot';
      modalDescription.textContent = 'Start your packaging pilot and see measurable results in 3-4 weeks.';
    } else {
      modalTitle.textContent = 'Request a Heatmap Audit';
      modalDescription.textContent = 'See exactly where viewers look. Get a free AI eye-tracking analysis.';
    }
    
    serviceInput.value = service;
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  // Function to close the modal
  window.closeContactModal = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Store current scroll position
    const scrollY = window.scrollY;
    
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    
    // Restore scroll position
    window.scrollTo(0, scrollY);
    
    return false;
  }

  // Close modal if clicking outside of it
  window.onclick = function(event) {
    if (event.target == contactModal) {
      event.preventDefault();
      event.stopPropagation();
      closeContactModal(event);
      return false;
    }
    if (event.target == inquiryModal) {
      event.preventDefault();
      event.stopPropagation();
      closeInquiryModal(event);
      return false;
    }
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const contactSuccessMessage = document.getElementById('contactSuccessMessage');

  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    if (contactForm.checkValidity()) {
      try {
        const response = await fetch('https://formspree.io/f/xjkvvqkd', {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          contactSuccessMessage.style.display = 'block';
        } else {
          alert('Oops! There was a problem submitting your request.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your request.');
      }
    } else {
      contactForm.reportValidity();
    }
  });


  // Inquiry Modal
  const inquiryModal = document.getElementById('inquiryModal');
  const inquiryForm = document.getElementById('inquiryForm');
  const inquirySuccessMessage = document.getElementById('inquirySuccessMessage');
  const inquiryPlan = document.getElementById('inquiryPlan');

  window.openInquiryModal = function(planName) {
    inquiryPlan.value = planName;
    inquiryModal.classList.add('active');
    inquiryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  window.closeInquiryModal = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Store current scroll position
    const scrollY = window.scrollY;
    
    inquiryModal.classList.remove('active');
    inquiryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    
    // Restore scroll position
    window.scrollTo(0, scrollY);
    
    return false;
  }

  inquiryForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    if (inquiryForm.checkValidity()) {
      try {
        const response = await fetch('https://formspree.io/f/xjkvvqkd', {
          method: 'POST',
          body: new FormData(inquiryForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          inquiryForm.style.display = 'none';
          inquirySuccessMessage.style.display = 'block';
        } else {
          alert('Oops! There was a problem submitting your inquiry.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your inquiry.');
      }
    } else {
      inquiryForm.reportValidity();
    }
  });

  // HAMBURGER MENU
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('is-active');
      navMenu.classList.toggle('active');
      navMenu.setAttribute('aria-hidden', isExpanded);
      document.body.classList.toggle('nav-open', !isExpanded);
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
      }
    });
  }



  // GAZE INTELLIGENCE
  const gazeButtons = document.querySelectorAll('.gaze-btn');
  const heatmaps = document.querySelectorAll('.gaze-heatmap');
  const fixationScore = document.getElementById('fixation-score');
  const firstFixation = document.getElementById('first-fixation');

  gazeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.gazeTarget;

      gazeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      heatmaps.forEach(heatmap => {
        if (heatmap.dataset.gaze === target) {
          heatmap.classList.add('active');
          fixationScore.textContent = `Fixation Score: ${heatmap.dataset.fixation}/100`;
          firstFixation.textContent = `First Fixation: ${heatmap.dataset.first}ms`;
        } else {
          heatmap.classList.remove('active');
        }
      });
    });
  });


  // NEW ROI CALCULATOR
  const roiViews = document.getElementById('roiViews');
  const roiLeadValue = document.getElementById('roiLeadValue');
  
  const roiConservative = document.getElementById('roiConservative');
  const roiExpected = document.getElementById('roiExpected');
  const roiAggressive = document.getElementById('roiAggressive');

  function formatCurrency(num) {
    return '$' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calculateROI() {
    if (!roiViews || !roiLeadValue) return;

    const views = parseInt(roiViews.value) || 5000;
    const currentCtr = 4.5; // Fixed baseline CTR
    const leadValue = parseFloat(roiLeadValue.value) || 750;

    // CTR lift scenarios
    const conservativeLift = 0.75; // +0.5-1.0% average = 0.75%
    const expectedLift = 1.5;      // +1.0-2.0% average = 1.5%
    const aggressiveLift = 2.5;    // +2.0-3.0% average = 2.5%

    // Calculate incremental clicks for each scenario
    const baseClicks = views * (currentCtr / 100);
    
    const conservativeClicks = views * ((currentCtr + conservativeLift) / 100) - baseClicks;
    const expectedClicks = views * ((currentCtr + expectedLift) / 100) - baseClicks;
    const aggressiveClicks = views * ((currentCtr + aggressiveLift) / 100) - baseClicks;

    // Click-to-lead conversion (2% average)
    const leadConversionRate = 0.02;

    // Calculate monthly pipeline value (assuming 4 videos/month)
    const videosPerMonth = 4;
    
    const conservativePipeline = conservativeClicks * leadConversionRate * leadValue * videosPerMonth;
    const expectedPipeline = expectedClicks * leadConversionRate * leadValue * videosPerMonth;
    const aggressivePipeline = aggressiveClicks * leadConversionRate * leadValue * videosPerMonth;

    // Update UI
    if (roiConservative) roiConservative.textContent = formatCurrency(conservativePipeline) + '/mo';
    if (roiExpected) roiExpected.textContent = formatCurrency(expectedPipeline) + '/mo';
    if (roiAggressive) roiAggressive.textContent = formatCurrency(aggressivePipeline) + '/mo';
  }

  if (roiViews) {
    roiViews.addEventListener('input', calculateROI);
    roiLeadValue.addEventListener('input', calculateROI);
    
    // Initial calculation
    calculateROI();
  }


  // GSAP ANIMATIONS - Simplified, no opacity changes
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Simple scroll animations without opacity (content always visible)
    const animateOnScroll = (selector, options = {}) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;

      gsap.from(selector, {
        scrollTrigger: {
          trigger: options.trigger || selector,
          start: options.start || "top 85%",
          toggleActions: "play none none none"
        },
        y: options.y || 20,
        scale: options.scale || 1,
        duration: options.duration || 0.5,
        stagger: options.stagger || 0,
        ease: options.ease || "power2.out"
      });
    };

    // Apply animations only if elements exist
    if (document.querySelector(".method-stat")) {
      animateOnScroll(".method-stat", { y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".why-card")) {
      animateOnScroll(".why-card", { trigger: "#why", y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".guarantee-item")) {
      animateOnScroll(".guarantee-item", { trigger: ".guarantee-grid", y: 20, stagger: 0.1 });
    }

    if (document.querySelector(".portfolio-tile")) {
      animateOnScroll(".portfolio-tile", { trigger: "#portfolio", y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".proof-card")) {
      animateOnScroll(".proof-card", { trigger: ".proof-grid", y: 20, stagger: 0.1 });
    }

    if (document.querySelector(".step")) {
      animateOnScroll(".step", { trigger: ".methodology-breakdown", y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".process-step")) {
      animateOnScroll(".process-step", { trigger: ".process-section", y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".comparison-card")) {
      animateOnScroll(".comparison-card", { trigger: ".comparison-section", y: 15, stagger: 0.1 });
    }

    if (document.querySelector(".trust-item")) {
      animateOnScroll(".trust-item", { trigger: ".trust-section", y: 15, stagger: 0.08 });
    }

    if (document.querySelector(".footer-stat")) {
      animateOnScroll(".footer-stat", { trigger: ".footer-stats", start: "top 90%", scale: 0.95, stagger: 0.06 });
    }
  }

  // Set current year in footer
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Gaze Intelligence Interactive Switcher
  function initGazeIntelligence() {
    const gazeButtons = document.querySelectorAll('.gaze-btn');
    const gazeHeatmaps = document.querySelectorAll('.gaze-heatmap');
    const fixationScore = document.getElementById('fixation-score');
    const firstFixation = document.getElementById('first-fixation');

    console.log('Gaze Intelligence initialized', {
      buttons: gazeButtons.length,
      heatmaps: gazeHeatmaps.length,
      fixationScore: !!fixationScore,
      firstFixation: !!firstFixation
    });

    if (gazeButtons.length === 0) {
      console.warn('No gaze buttons found');
      return;
    }

    gazeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        console.log('Button clicked:', button.getAttribute('data-gaze-target'));
        const target = button.getAttribute('data-gaze-target');
        
        // Remove active class from all buttons
        gazeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Remove active class from all heatmaps
        gazeHeatmaps.forEach(img => img.classList.remove('active'));
        
        // Find and activate the matching heatmap
        const targetHeatmap = document.querySelector(`.gaze-heatmap[data-gaze="${target}"]`);
        console.log('Target heatmap:', targetHeatmap);
        
        if (targetHeatmap) {
          targetHeatmap.classList.add('active');
          
          // Update data display
          const fixationValue = targetHeatmap.getAttribute('data-fixation');
          const firstFixValue = targetHeatmap.getAttribute('data-first');
          
          console.log('Updating data:', { fixationValue, firstFixValue });
          
          if (fixationScore) fixationScore.textContent = `Fixation Score: ${fixationValue}/100`;
          if (firstFixation) firstFixation.textContent = `First Fixation: ${firstFixValue}ms`;
        }
      });
    });
  }

  // Initialize Gaze Intelligence
  initGazeIntelligence();

  // 3D TILT EFFECT FOR PORTFOLIO CARDS
  const portfolioTiles = document.querySelectorAll('.portfolio-tile');
  
  portfolioTiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X position within the card
      const y = e.clientY - rect.top;  // Mouse Y position within the card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max 8 degrees)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      tile.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    tile.addEventListener('mouseleave', () => {
      tile.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // SCROLL REVEAL ANIMATION
  const sections = document.querySelectorAll('.section');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    sections.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop < triggerBottom) {
        setTimeout(() => {
          section.classList.add('reveal');
        }, index * 100); // Staggered timing
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', revealOnScroll);

  // EXTREMELY SLOW PARALLAX FOR BACKGROUND GRADIENT
  const glowBg = document.querySelector('.glow-bg');
  if (glowBg) {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      // Extremely slow movement: 0.03 multiplier for subtle effect
      const yPos = scrolled * 0.03;
      glowBg.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
    
    // Initial position
    updateParallax();
  }

  // CUSTOM CURSOR EFFECTS (Desktop only)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const body = document.body;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    // Enable custom cursor
    body.classList.add('custom-cursor-enabled');
    
    // Track mouse position and update cursor directly
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Position cursors directly on mouse (no follow delay)
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      // Show cursors
      cursor.classList.add('active');
      cursorDot.classList.add('active');
    });
    
    // Cursor magnetism and hover effects
    const magneticElements = document.querySelectorAll('.btn-main, .btn-outline, .portfolio-tile');
    
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
      
      // Subtle magnetism for CTAs
      if (el.classList.contains('btn-main') || el.classList.contains('btn-outline')) {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Subtle pull (max 8px)
          const pullStrength = 0.15;
          el.style.transform = `translate(${x * pullStrength}px, ${y * pullStrength}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0, 0)';
        });
      }
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorDot.classList.remove('active');
    });
  }

  // CLARITY TEST FEATURE
  // Progressive enhancement - works even if this fails
  const clarityTestButtons = document.querySelectorAll('.clarity-test-btn');
  
  clarityTestButtons.forEach(btn => {
    // Prevent event bubbling to avoid conflicts
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Find the parent thumb-card and its image
      const thumbCard = btn.closest('.thumb-card');
      const img = thumbCard.querySelector('img');
      
      // Prevent multiple simultaneous activations
      if (img.classList.contains('clarity-flash') || img.classList.contains('clarity-blur')) {
        return;
      }
      
      // Disable button during animation
      btn.disabled = true;
      btn.style.opacity = '0.5';
      
      // Step 1: Flash (200ms)
      img.classList.add('clarity-flash');
      
      setTimeout(() => {
        img.classList.remove('clarity-flash');
        
        // Step 2: Blur & Desaturate (250ms)
        img.classList.add('clarity-blur');
        
        setTimeout(() => {
          // Step 3: Restore
          img.classList.remove('clarity-blur');
          
          // Re-enable button
          btn.disabled = false;
          btn.style.opacity = '';
        }, 250);
      }, 200);
    });
    
    // Mobile touch optimization - single tap only
    btn.addEventListener('touchstart', (e) => {
      // Prevent double-tap zoom on iOS
      e.preventDefault();
    }, { passive: false });
  });


  // Scroll Progress Bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    scrollProgress.style.transform = `scaleX(${scrolled})`;
  });

  // Smooth Fade-In Animation System
  const initScrollAnimations = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Select all sections except hero/header
    const sections = Array.from(document.querySelectorAll('section')).filter(section => {
      return section.id !== 'hero'; // Exclude hero if it has an id
    });
    
    // Select individual card elements
    const cards = document.querySelectorAll('.why-card, .portfolio-tile, .proof-card, .price-card, .guarantee-item');
    
    // Combine all elements to animate
    const elementsToAnimate = [...sections, ...cards];
    
    if (elementsToAnimate.length === 0) return;
    
    // If user prefers reduced motion, show everything immediately
    if (prefersReducedMotion) {
      elementsToAnimate.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    
    // Create Intersection Observer first
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger 50px before entering viewport
      threshold: 0.1 // Trigger when 10% visible
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate element into view
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Now set initial state and observe
    elementsToAnimate.forEach((el, index) => {
      // Check if element is already in viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Element already visible, don't animate
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else {
        // Element not visible yet, set initial hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add stagger delay for cards
        if (el.classList.contains('why-card') || 
            el.classList.contains('portfolio-tile') || 
            el.classList.contains('proof-card') ||
            el.classList.contains('guarantee-item')) {
          const cardIndex = Array.from(el.parentElement?.children || []).indexOf(el);
          el.style.transitionDelay = `${cardIndex * 0.1}s`;
        }
        
        // Observe this element
        observer.observe(el);
      }
    });
  };
  
  // Initialize animations after a small delay to ensure DOM is ready
  setTimeout(initScrollAnimations, 100);

});