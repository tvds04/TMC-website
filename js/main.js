/* ============================================
   TMC Website - Main JavaScript
   Handles: Navigation, Carousels, Filters,
   Form Validation, Calendar, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // 1. MOBILE NAVIGATION
  // ============================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isOpen);
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close mobile nav on link click
    var navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // 2. HEADER SCROLL EFFECT
  // ============================================
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // 3. TESTIMONIAL CAROUSEL
  // ============================================
  function initCarousel(trackId, dotsId) {
    var track = document.getElementById(trackId);
    var dotsContainer = document.getElementById(dotsId);
    if (!track || !dotsContainer) return null;

    var slides = track.querySelectorAll('.testimonial-carousel__slide');
    if (slides.length === 0) return null;

    var currentIndex = 0;
    var autoplayInterval = null;

    // Create dots
    slides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'testimonial-carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function() {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      var dots = dotsContainer.querySelectorAll('.testimonial-carousel__dot');
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();

    // Pause on hover
    var carousel = track.closest('.testimonial-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
      });
      carousel.addEventListener('mouseleave', function() {
        startAutoplay();
      });
    }

    return { goToSlide: goToSlide, nextSlide: nextSlide };
  }

  // Initialize all testimonial carousels on the page
  initCarousel('testimonialTrack', 'testimonialDots');
  initCarousel('joinTestimonialTrack', 'joinTestimonialDots');

  // ============================================
  // 4. IMAGE GALLERY CAROUSEL
  // ============================================
  function initGallery(galleryId) {
    var gallery = document.getElementById(galleryId);
    if (!gallery) return;

    var track = gallery.querySelector('.gallery__track');
    var slides = gallery.querySelectorAll('.gallery__slide');
    var prevBtn = gallery.querySelector('.gallery__nav--prev');
    var nextBtn = gallery.querySelector('.gallery__nav--next');
    var dotsContainer = gallery.querySelector('.gallery__dots');
    if (!track || slides.length === 0) return;

    var currentIndex = 0;

    // Create dots
    if (dotsContainer) {
      slides.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'gallery__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
        dot.addEventListener('click', function() {
          goTo(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      currentIndex = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.gallery__dot');
        dots.forEach(function(dot, i) {
          dot.classList.toggle('active', i === index);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goTo(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goTo((currentIndex + 1) % slides.length);
      });
    }
  }

  initGallery('pastEventGallery');

  // ============================================
  // 5. EVENT FILTERING
  // ============================================
  var filterButtons = document.querySelectorAll('#eventFilters .filter-btn');
  var eventCards = document.querySelectorAll('#eventsList .event-card');
  var noEventsMsg = document.getElementById('noEvents');

  if (filterButtons.length > 0 && eventCards.length > 0) {
    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter events
        var visibleCount = 0;
        eventCards.forEach(function(card) {
          var type = card.getAttribute('data-type');
          if (filter === 'all' || type === filter) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Show/hide no results
        if (noEventsMsg) {
          noEventsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  // ============================================
  // 6. CONTACT FORM VALIDATION
  // ============================================
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var isValid = true;

      // Validate Name
      var nameInput = document.getElementById('name');
      var nameError = document.getElementById('nameError');
      if (nameInput && nameError) {
        if (!nameInput.value.trim()) {
          nameInput.classList.add('error');
          nameError.classList.add('visible');
          isValid = false;
        } else {
          nameInput.classList.remove('error');
          nameError.classList.remove('visible');
        }
      }

      // Validate Email
      var emailInput = document.getElementById('email');
      var emailError = document.getElementById('emailError');
      if (emailInput && emailError) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
          emailInput.classList.add('error');
          emailError.classList.add('visible');
          isValid = false;
        } else {
          emailInput.classList.remove('error');
          emailError.classList.remove('visible');
        }
      }

      // Validate Year
      var yearSelect = document.getElementById('year');
      var yearError = document.getElementById('yearError');
      if (yearSelect && yearError) {
        if (!yearSelect.value) {
          yearSelect.classList.add('error');
          yearError.classList.add('visible');
          isValid = false;
        } else {
          yearSelect.classList.remove('error');
          yearError.classList.remove('visible');
        }
      }

      // Validate Major
      var majorInput = document.getElementById('major');
      var majorError = document.getElementById('majorError');
      if (majorInput && majorError) {
        if (!majorInput.value.trim()) {
          majorInput.classList.add('error');
          majorError.classList.add('visible');
          isValid = false;
        } else {
          majorInput.classList.remove('error');
          majorError.classList.remove('visible');
        }
      }

      if (isValid) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('visible');
        }
        // Note: In production, you would send form data to a server here
      }
    });

    // Clear error styling on input
    var formInputs = contactForm.querySelectorAll('.form__input, .form__select, .form__textarea');
    formInputs.forEach(function(input) {
      input.addEventListener('input', function() {
        input.classList.remove('error');
        var errorEl = input.parentElement.querySelector('.form__error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  // ============================================
  // 7. ADD TO CALENDAR (.ics Generation)
  // ============================================
  var calButtons = document.querySelectorAll('.add-to-cal');
  calButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var title = btn.getAttribute('data-event-title') || 'TMC Event';
      var date = btn.getAttribute('data-event-date') || '';
      var time = btn.getAttribute('data-event-time') || '';
      var location = btn.getAttribute('data-event-location') || 'Kelley School of Business, Indiana University';

      // If no date is set, show a message
      if (!date) {
        // Create a temporary tooltip
        var tooltip = document.createElement('span');
        tooltip.textContent = 'Date TBD - check back soon!';
        tooltip.style.cssText = 'position: absolute; background: #212529; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; white-space: nowrap; z-index: 100; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
        btn.style.position = 'relative';
        btn.appendChild(tooltip);
        setTimeout(function() {
          tooltip.remove();
        }, 2500);
        return;
      }

      // Generate .ics file
      var startDate = date.replace(/-/g, '');
      var endDate = startDate; // Same day by default

      var icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//TMC//Events//EN',
        'BEGIN:VEVENT',
        'DTSTART:' + startDate + (time ? 'T' + time.replace(/:/g, '') + '00' : ''),
        'DTEND:' + endDate + (time ? 'T' + time.replace(/:/g, '') + '00' : ''),
        'SUMMARY:' + title,
        'LOCATION:' + location,
        'DESCRIPTION:Technology Management Club Event at IU Kelley School of Business',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = title.replace(/[^a-zA-Z0-9]/g, '_') + '.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  });

  // ============================================
  // 8. FAQ ACCORDION
  // ============================================
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(function(otherItem) {
          otherItem.classList.remove('open');
          var otherQ = otherItem.querySelector('.faq-item__question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ============================================
  // 9. SCROLL ANIMATIONS (Intersection Observer)
  // ============================================
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: make everything visible immediately
    animatedElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ============================================
  // 10. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = 100;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
