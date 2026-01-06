// ===== VALIX INC. WEBSITE - YC-STYLE INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initSmoothScrolling();
  initHoverEffects();
  initMetricCounters();
  initFadeInAnimations();
  initVideoPlayButton();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  // Navbar scroll effect
  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }, 10));

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn-primary');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(
    '.product-feature, .result-card, .testimonial-card, .pilot-feature-item, .integration-item'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== FADE IN ANIMATIONS =====
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe product features
  document.querySelectorAll('.product-feature').forEach(el => {
    observer.observe(el);
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
  // Result card hover effects
  const resultCards = document.querySelectorAll('.result-card');
  
  resultCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Product image hover effects
  const productImages = document.querySelectorAll('.product-image');
  
  productImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// ===== METRIC COUNTERS =====
function initMetricCounters() {
  const metricNumbers = document.querySelectorAll('.stat-number, .result-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateMetric(entry.target);
        metricObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  metricNumbers.forEach(metric => {
    metricObserver.observe(metric);
  });
}

function animateMetric(element) {
  const finalValue = element.textContent;
  const isPercentage = finalValue.includes('%');
  const isTime = finalValue.includes('<');
  const hasPlus = finalValue.includes('+');
  const hasMillion = finalValue.includes('M');
  
  if (isTime || finalValue.includes('/')) {
    // For time values like "<30s" or "24/7", just show the final value
    element.style.opacity = '1';
    return;
  }
  
  let startValue = 0;
  const endValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
  const duration = 2000;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = startValue + (endValue - startValue) * easeOutQuart;
    
    if (isPercentage) {
      element.textContent = currentValue.toFixed(1) + '%';
    } else if (hasMillion) {
      element.textContent = Math.floor(currentValue) + 'M' + (hasPlus ? '+' : '');
    } else {
      element.textContent = Math.floor(currentValue);
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// ===== VIDEO PLAY BUTTON FUNCTIONALITY =====
function initVideoPlayButton() {
  const video = document.querySelector('.hero-video');
  const playButton = document.querySelector('.video-play-button');
  
  if (!video || !playButton) {
    console.log('Video or play button not found');
    return;
  }
  
  let autoHideTimeout;
  const AUTO_HIDE_DELAY = 3000; // 3 seconds
  
  // Ensure button is visible initially
  playButton.style.display = 'flex';
  playButton.style.opacity = '0.6';
  playButton.classList.remove('hidden', 'playing');
  
  function hidePlayButton() {
    playButton.classList.add('hidden');
  }
  
  function showPlayButton() {
    playButton.classList.remove('hidden', 'playing');
    playButton.style.opacity = '0.6';
    // Auto-hide after delay if video is playing
    clearTimeout(autoHideTimeout);
    if (!video.paused) {
      autoHideTimeout = setTimeout(hidePlayButton, AUTO_HIDE_DELAY);
    }
  }
  
  // Hide play button when video is playing
  video.addEventListener('play', function() {
    playButton.classList.add('playing');
    // Auto-hide after delay
    clearTimeout(autoHideTimeout);
    autoHideTimeout = setTimeout(hidePlayButton, AUTO_HIDE_DELAY);
  });
  
  // Show play button when video is paused
  video.addEventListener('pause', function() {
    playButton.classList.remove('playing', 'hidden');
    playButton.style.opacity = '0.6';
    clearTimeout(autoHideTimeout);
  });
  
  // Show button on hover when playing
  const videoWrapper = document.querySelector('.hero-video-wrapper');
  if (videoWrapper) {
    videoWrapper.addEventListener('mouseenter', function() {
      if (!video.paused) {
        playButton.classList.remove('hidden');
        playButton.style.opacity = '0.6';
        clearTimeout(autoHideTimeout);
      }
    });
    
    videoWrapper.addEventListener('mouseleave', function() {
      if (!video.paused) {
        clearTimeout(autoHideTimeout);
        autoHideTimeout = setTimeout(hidePlayButton, AUTO_HIDE_DELAY);
      }
    });
  }
  
  // Toggle play/pause on button click
  playButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      playButton.classList.add('playing');
    } else {
      video.pause();
      playButton.classList.remove('playing', 'hidden');
      playButton.style.opacity = '0.6';
    }
    clearTimeout(autoHideTimeout);
  });
  
  // Also allow clicking on video to pause
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      playButton.classList.add('playing');
    } else {
      video.pause();
      playButton.classList.remove('playing', 'hidden');
      playButton.style.opacity = '0.6';
    }
    clearTimeout(autoHideTimeout);
  });
  
  // Initially show button, then auto-hide if video is autoplaying
  if (!video.paused) {
    playButton.classList.add('playing');
    autoHideTimeout = setTimeout(hidePlayButton, AUTO_HIDE_DELAY);
  } else {
    playButton.classList.remove('hidden', 'playing');
    playButton.style.opacity = '0.6';
  }
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== FORM ENHANCEMENTS =====
function initFormEnhancements() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state to submit button
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
          submitBtn.textContent = 'Sent!';
          submitBtn.style.background = '#10B981';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 2000);
        }, 1500);
      }
    });
  });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
  // Lazy load images if needed
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Preload critical resources
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'
  ];
  
  criticalResources.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
  // Add main content landmark
  const mainContent = document.querySelector('.hero-section');
  if (mainContent) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('role', 'main');
  }
  
  // Enhanced keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
}

// ===== ERROR HANDLING =====
function initErrorHandling() {
  window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to error tracking service here
  });
  
  window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to error tracking service here
  });
}

// ===== ANALYTICS & TRACKING =====
function initAnalytics() {
  // Track CTA clicks
  const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      const buttonType = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
      
      // Track CTA click (replace with your analytics service)
      console.log('CTA clicked:', {
        text: buttonText,
        type: buttonType,
        href: this.href
      });
    });
  });
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', throttle(() => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track scroll milestones
      if (maxScroll >= 25 && maxScroll < 50) {
        console.log('25% scroll depth reached');
      } else if (maxScroll >= 50 && maxScroll < 75) {
        console.log('50% scroll depth reached');
      } else if (maxScroll >= 75) {
        console.log('75% scroll depth reached');
      }
    }
  }, 1000));
}

// ===== INITIALIZATION =====
// Initialize additional features when DOM is fully loaded
window.addEventListener('load', function() {
  initFormEnhancements();
  initPerformanceOptimizations();
  initAccessibility();
  initErrorHandling();
  initAnalytics();
  
  // Remove loading states
  document.body.classList.add('loaded');
});

// ===== EXPORT FOR MODULE SYSTEMS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initNavigation,
    initScrollAnimations,
    initSmoothScrolling,
    initHoverEffects,
    initMetricCounters
  };
}
