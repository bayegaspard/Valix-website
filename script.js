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
  if (navbar) {
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
  }

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = navMenu.classList.contains('active');
      
      if (isActive) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
        navMenu.style.visibility = 'hidden';
        navMenu.style.opacity = '0';
        document.body.style.overflow = '';
      } else {
        mobileToggle.classList.add('active');
        navMenu.classList.add('active');
        navMenu.style.display = 'flex';
        navMenu.style.visibility = 'visible';
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn-primary');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Close menu immediately
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.removeProperty('display');
        navMenu.style.removeProperty('visibility');
        navMenu.style.removeProperty('opacity');
        navMenu.style.removeProperty('transform');
        navMenu.style.removeProperty('pointer-events');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
        navMenu.style.visibility = 'hidden';
        navMenu.style.opacity = '0';
        document.body.style.overflow = '';
      }
    });
  } else {
    console.warn('Mobile menu toggle or nav menu not found');
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
      // Don't prevent default for mailto links or if already handled
      if (this.getAttribute('href').startsWith('mailto:')) {
        return;
      }
      
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
  const videoWrapper = document.querySelector('.hero-video-wrapper');
  const videoSection = document.querySelector('.hero-video-section');
  
  if (!video || !playButton || !videoWrapper || !videoSection) {
    console.log('Video, play button, or wrapper not found');
    return;
  }
  
  let autoHideTimeout;
  const AUTO_HIDE_DELAY = 3000; // 3 seconds
  
  // Check if video is already playing (autoplay)
  function hidePlayButtonIfPlaying() {
    if (!video.paused) {
      // Video is already playing (autoplay)
      playButton.style.setProperty('display', 'none', 'important');
      playButton.style.setProperty('visibility', 'hidden', 'important');
      playButton.style.setProperty('opacity', '0', 'important');
      playButton.style.setProperty('pointer-events', 'none', 'important');
      playButton.style.setProperty('transform', 'translate(-50%, -50%) scale(0)', 'important');
      playButton.classList.add('playing', 'hidden');
      // Show enlarge button option
      setTimeout(() => {
        createEnlargeButton();
      }, 300);
    } else {
      // Video is paused, show play button
      playButton.style.setProperty('display', 'flex', 'important');
      playButton.style.setProperty('visibility', 'visible', 'important');
      playButton.style.setProperty('opacity', '0.6', 'important');
      playButton.style.setProperty('pointer-events', 'auto', 'important');
      playButton.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      playButton.classList.remove('hidden', 'playing');
    }
  }
  
  // Check initial state
  hidePlayButtonIfPlaying();
  
  // Also check after a short delay in case autoplay hasn't started yet
  setTimeout(() => {
    hidePlayButtonIfPlaying();
  }, 500);
  
  // Hide play button when video is playing (backup in case click handler doesn't fire)
  video.addEventListener('play', function() {
    playButton.style.setProperty('display', 'none', 'important');
    playButton.style.setProperty('visibility', 'hidden', 'important');
    playButton.style.setProperty('opacity', '0', 'important');
    playButton.style.setProperty('pointer-events', 'none', 'important');
    playButton.style.setProperty('transform', 'translate(-50%, -50%) scale(0)', 'important');
    playButton.classList.add('playing', 'hidden');
    // Show enlarge button option
    setTimeout(() => {
      createEnlargeButton();
    }, 300);
    clearTimeout(autoHideTimeout);
  });
  
  // Show play button when video is paused
  video.addEventListener('pause', function() {
    if (videoWrapper && !videoWrapper.classList.contains('enlarged')) {
      playButton.style.display = 'flex';
      playButton.style.visibility = 'visible';
      playButton.style.opacity = '0.6';
      playButton.style.pointerEvents = 'auto';
      playButton.classList.remove('playing', 'hidden');
      // Remove enlarge button when paused (unless enlarged)
      const enlargeBtn = document.querySelector('.video-enlarge-button');
      if (enlargeBtn) {
        enlargeBtn.remove();
      }
    }
    clearTimeout(autoHideTimeout);
  });
  
  // Show enlarge button on hover when playing (if not enlarged)
  if (videoWrapper) {
    videoWrapper.addEventListener('mouseenter', function() {
      if (!video.paused && !videoWrapper.classList.contains('enlarged')) {
        const enlargeBtn = document.querySelector('.video-enlarge-button');
        if (enlargeBtn) {
          enlargeBtn.style.opacity = '1';
        }
      }
    });
    
    videoWrapper.addEventListener('mouseleave', function() {
      if (!video.paused && !videoWrapper.classList.contains('enlarged')) {
        const enlargeBtn = document.querySelector('.video-enlarge-button');
        if (enlargeBtn) {
          enlargeBtn.style.opacity = '0.8';
        }
      }
    });
  }
  
  function createEnlargeButton() {
    let enlargeBtn = document.querySelector('.video-enlarge-button');
    if (!enlargeBtn && videoWrapper) {
      console.log('Creating enlarge button');
      enlargeBtn = document.createElement('button');
      enlargeBtn.className = 'video-enlarge-button';
      enlargeBtn.innerHTML = '⛶';
      enlargeBtn.setAttribute('aria-label', 'Enlarge video');
      // Position relative to video wrapper, in lower right corner
      enlargeBtn.style.cssText = 'position: absolute !important; bottom: 10px !important; right: 10px !important; z-index: 100 !important; width: 40px !important; height: 40px !important; background: rgba(0, 0, 0, 0.7) !important; color: white !important; border: none !important; border-radius: 50% !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 18px !important; transition: all 0.3s ease !important; opacity: 0.8 !important; margin: 0 !important; top: auto !important;';
      videoWrapper.appendChild(enlargeBtn);
      console.log('Enlarge button created and appended');
      
      enlargeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Enlarge video
        videoWrapper.classList.add('enlarged');
        videoSection.classList.add('enlarged');
        enlargeBtn.style.display = 'none';
        
        // Create minimize button
        let minimizeBtn = document.querySelector('.video-minimize-button');
        if (!minimizeBtn) {
          minimizeBtn = document.createElement('button');
          minimizeBtn.className = 'video-minimize-button';
          minimizeBtn.innerHTML = '✕';
          minimizeBtn.setAttribute('aria-label', 'Minimize video');
          minimizeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 100; width: 40px; height: 40px; background: rgba(0, 0, 0, 0.7); color: white; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; transition: all 0.3s ease;';
          videoWrapper.appendChild(minimizeBtn);
          
          minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            video.pause();
            videoWrapper.classList.remove('enlarged');
            videoSection.classList.remove('enlarged');
            playButton.style.display = 'flex';
            playButton.classList.remove('hidden', 'playing');
            playButton.style.opacity = '0.6';
            enlargeBtn.style.display = 'flex';
            minimizeBtn.remove();
          });
          
          minimizeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.9)';
            this.style.transform = 'scale(1.1)';
          });
          
          minimizeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0.7)';
            this.style.transform = 'scale(1)';
          });
        }
      });
      
      enlargeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 0, 0, 0.9)';
        this.style.transform = 'scale(1.1)';
      });
      
      enlargeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 0, 0, 0.7)';
        this.style.transform = 'scale(1)';
      });
    }
  }
  
  playButton.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Play button clicked, video paused:', video.paused);
    
    if (video.paused) {
      // Hide button IMMEDIATELY before playing
      playButton.style.setProperty('display', 'none', 'important');
      playButton.style.setProperty('visibility', 'hidden', 'important');
      playButton.style.setProperty('opacity', '0', 'important');
      playButton.style.setProperty('pointer-events', 'none', 'important');
      playButton.style.setProperty('transform', 'translate(-50%, -50%) scale(0)', 'important');
      playButton.classList.add('hidden', 'playing');
      
      // Play video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Video playing');
          // Show enlarge button option
          setTimeout(() => {
            createEnlargeButton();
          }, 300);
        }).catch(err => {
          console.error('Error playing video:', err);
          // Show button again if play failed
          playButton.style.removeProperty('display');
          playButton.style.removeProperty('visibility');
          playButton.style.setProperty('opacity', '0.6', 'important');
          playButton.style.setProperty('pointer-events', 'auto', 'important');
          playButton.classList.remove('playing', 'hidden');
        });
      }
    } else {
      video.pause();
      playButton.style.removeProperty('display');
      playButton.style.removeProperty('visibility');
      playButton.style.removeProperty('transform');
      playButton.style.setProperty('opacity', '0.6', 'important');
      playButton.style.setProperty('pointer-events', 'auto', 'important');
      playButton.classList.remove('playing', 'hidden');
      
      // Remove enlarge button if video is paused
      const enlargeBtn = document.querySelector('.video-enlarge-button');
      if (enlargeBtn) {
        enlargeBtn.remove();
      }
    }
    clearTimeout(autoHideTimeout);
  });
  
  // Also allow clicking on video to pause (but don't enlarge on click, only on play button)
  video.addEventListener('click', function(e) {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      if (!videoWrapper.classList.contains('enlarged')) {
        playButton.style.setProperty('display', 'none', 'important');
        playButton.style.setProperty('visibility', 'hidden', 'important');
        playButton.style.setProperty('opacity', '0', 'important');
        playButton.style.setProperty('pointer-events', 'none', 'important');
        playButton.classList.add('playing', 'hidden');
        // Show enlarge button
        setTimeout(() => {
          createEnlargeButton();
        }, 300);
      }
    } else {
      video.pause();
      if (!videoWrapper.classList.contains('enlarged')) {
        playButton.style.setProperty('display', 'flex', 'important');
        playButton.style.setProperty('visibility', 'visible', 'important');
        playButton.style.setProperty('opacity', '0.6', 'important');
        playButton.style.setProperty('pointer-events', 'auto', 'important');
        playButton.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
        playButton.classList.remove('playing', 'hidden');
        // Remove enlarge button
        const enlargeBtn = document.querySelector('.video-enlarge-button');
        if (enlargeBtn) {
          enlargeBtn.remove();
        }
      }
    }
    clearTimeout(autoHideTimeout);
  });

  // Close enlarged video when clicking outside
  document.addEventListener('click', function(e) {
    if (videoWrapper && videoWrapper.classList.contains('enlarged')) {
      if (!videoWrapper.contains(e.target) && !e.target.classList.contains('video-minimize-button')) {
        const minimizeBtn = document.querySelector('.video-minimize-button');
        if (minimizeBtn) {
          video.pause();
          videoWrapper.classList.remove('enlarged');
          videoSection.classList.remove('enlarged');
          playButton.style.display = 'flex';
          playButton.classList.remove('hidden', 'playing');
          playButton.style.opacity = '0.6';
          minimizeBtn.remove();
        }
      }
    }
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
