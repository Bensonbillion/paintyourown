/**
 * Paint Your Own - Theme JavaScript
 * Handles: Announcement bar rotation, mobile nav, cart drawer,
 * product gallery, variant selection, accordions, quantity selectors
 */

(function() {
  'use strict';

  // ==========================================
  // Announcement Bar - Auto-rotate messages
  // ==========================================
  function initAnnouncementBar() {
    var bar = document.querySelector('[data-announcement-bar]');
    if (!bar) return;

    var messages = bar.querySelectorAll('.announcement-bar__message');
    if (messages.length <= 1) return;

    var currentIndex = 0;
    setInterval(function() {
      messages[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % messages.length;
      messages[currentIndex].classList.add('is-active');
    }, 4000);
  }

  // ==========================================
  // Sticky Header - Add shadow on scroll
  // ==========================================
  function initStickyHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var scrolled = false;
    window.addEventListener('scroll', function() {
      var isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        header.classList.toggle('is-scrolled', scrolled);
      }
    }, { passive: true });
  }

  // ==========================================
  // Mobile Navigation
  // ==========================================
  function initMobileNav() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var nav = document.querySelector('[data-mobile-nav]');
    var close = document.querySelector('[data-mobile-nav-close]');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      nav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    if (close) {
      close.addEventListener('click', function() {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
  }

  // ==========================================
  // Cart Drawer
  // ==========================================
  function initCartDrawer() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-overlay]');
    var toggleButtons = document.querySelectorAll('[data-cart-toggle]');
    var closeButton = document.querySelector('[data-cart-close]');

    if (!drawer) return;

    function openCart() {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    toggleButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    });

    if (closeButton) {
      closeButton.addEventListener('click', closeCart);
    }

    if (overlay) {
      overlay.addEventListener('click', closeCart);
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeCart();
      }
    });
  }

  // ==========================================
  // Hero Slideshow
  // ==========================================
  function initHeroSlider() {
    var slider = document.querySelector('[data-hero-slider]');
    if (!slider) return;

    var slides = slider.querySelectorAll('.hero__slide');
    var dots = document.querySelectorAll('[data-hero-dots] .hero__dot');

    if (slides.length <= 1) return;

    var currentSlide = 0;
    var autoplayInterval;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('is-active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('is-active');

      currentSlide = index;

      slides[currentSlide].classList.add('is-active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('is-active');
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    // Auto-play
    autoplayInterval = setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        clearInterval(autoplayInterval);
        goToSlide(index);
        autoplayInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // ==========================================
  // Product Gallery - Thumbnail Switching
  // ==========================================
  function initProductGallery() {
    var thumbs = document.querySelectorAll('.product-gallery__thumb');
    var mainImg = document.getElementById('product-main-img');

    if (!mainImg || thumbs.length === 0) return;

    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Update active state
        thumbs.forEach(function(t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');

        // Update main image
        var newSrc = thumb.getAttribute('data-image-src');
        if (newSrc) {
          mainImg.src = newSrc;
        }
      });
    });
  }

  // ==========================================
  // Variant Selector
  // ==========================================
  function initVariantSelector() {
    var form = document.querySelector('[data-product-form]');
    if (!form) return;

    var options = form.querySelectorAll('[data-variant-option]');
    var variantInput = form.querySelector('[data-variant-id]');
    var priceDisplay = document.querySelector('[data-product-price]');

    options.forEach(function(option) {
      option.addEventListener('click', function() {
        // Update selected state
        var group = option.closest('.variant-selector__options');
        group.querySelectorAll('.variant-selector__option').forEach(function(opt) {
          opt.classList.remove('is-selected');
        });
        option.classList.add('is-selected');

        // Check radio
        var radio = option.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Update variant ID and price (simple single-option logic)
        updateVariant(form);
      });
    });

    function updateVariant(form) {
      // For themes with variant JSON data, this would use the variant data
      // to update the hidden variant ID input and price display
      // This is a simplified version that works for basic cases
    }
  }

  // ==========================================
  // Accordion
  // ==========================================
  function initAccordions() {
    var toggles = document.querySelectorAll('[data-accordion-toggle]');

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var item = toggle.closest('.accordion__item');
        var isOpen = item.classList.contains('is-open');
        var expanded = toggle.getAttribute('aria-expanded') === 'true';

        item.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', !expanded);
      });
    });
  }

  // ==========================================
  // Quantity Selector
  // ==========================================
  function initQuantitySelectors() {
    // Product page quantity
    var minusBtn = document.querySelector('[data-quantity-minus]');
    var plusBtn = document.querySelector('[data-quantity-plus]');
    var input = document.querySelector('[data-quantity-input]');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', function() {
        var val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
      });

      plusBtn.addEventListener('click', function() {
        var val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    }

    // Cart line item quantities
    document.querySelectorAll('[data-line-minus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var line = btn.getAttribute('data-line-minus');
        var qtyInput = document.querySelector('[data-line-quantity="' + line + '"]');
        if (qtyInput) {
          var val = parseInt(qtyInput.value) || 1;
          if (val > 1) {
            qtyInput.value = val - 1;
            updateCartLine(line, val - 1);
          }
        }
      });
    });

    document.querySelectorAll('[data-line-plus]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var line = btn.getAttribute('data-line-plus');
        var qtyInput = document.querySelector('[data-line-quantity="' + line + '"]');
        if (qtyInput) {
          var val = parseInt(qtyInput.value) || 1;
          qtyInput.value = val + 1;
          updateCartLine(line, val + 1);
        }
      });
    });

    // Remove items
    document.querySelectorAll('[data-remove-item]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var line = btn.getAttribute('data-remove-item');
        updateCartLine(line, 0);
      });
    });
  }

  // ==========================================
  // Cart AJAX Operations
  // ==========================================
  function updateCartLine(line, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: parseInt(line), quantity: quantity })
    })
    .then(function(response) { return response.json(); })
    .then(function() {
      window.location.reload();
    })
    .catch(function(error) {
      console.error('Cart update error:', error);
    });
  }

  // Add to cart via AJAX
  function initAddToCart() {
    var forms = document.querySelectorAll('[data-product-form]');

    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        var submitBtn = form.querySelector('[data-add-to-cart]');
        if (submitBtn) {
          submitBtn.textContent = 'Adding...';
          submitBtn.disabled = true;
        }

        var formData = new FormData(form);

        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
          if (submitBtn) {
            submitBtn.textContent = 'Added!';
            setTimeout(function() {
              submitBtn.textContent = 'Add to Cart';
              submitBtn.disabled = false;
            }, 2000);
          }
          // Update cart count
          updateCartCount();
          // Open cart drawer
          var drawer = document.querySelector('[data-cart-drawer]');
          var overlay = document.querySelector('[data-cart-overlay]');
          if (drawer) {
            drawer.classList.add('is-open');
            if (overlay) overlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
            // Reload to get updated cart HTML
            setTimeout(function() { window.location.reload(); }, 300);
          }
        })
        .catch(function(error) {
          console.error('Add to cart error:', error);
          if (submitBtn) {
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.disabled = false;
          }
        });
      });
    });

    // Quick add forms on product cards
    document.querySelectorAll('.product-card form').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(form);
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Adding...';
          btn.disabled = true;
        }

        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(function(response) { return response.json(); })
        .then(function() {
          if (btn) {
            btn.textContent = 'Added!';
            setTimeout(function() {
              btn.textContent = 'Add to Cart';
              btn.disabled = false;
            }, 1500);
          }
          updateCartCount();
        })
        .catch(function(error) {
          console.error('Quick add error:', error);
          if (btn) {
            btn.textContent = 'Add to Cart';
            btn.disabled = false;
          }
        });
      });
    });

    // Sticky add to cart (mobile)
    var stickyBtn = document.querySelector('[data-sticky-add-to-cart]');
    if (stickyBtn) {
      stickyBtn.addEventListener('click', function() {
        var mainForm = document.getElementById('product-form');
        if (mainForm) {
          mainForm.dispatchEvent(new Event('submit'));
        }
      });
    }
  }

  function updateCartCount() {
    fetch('/cart.js')
    .then(function(response) { return response.json(); })
    .then(function(cart) {
      var countElements = document.querySelectorAll('[data-cart-count]');
      countElements.forEach(function(el) {
        el.textContent = cart.item_count;
      });
    });
  }

  // ==========================================
  // Collection Sort
  // ==========================================
  function initCollectionSort() {
    var sortSelect = document.querySelector('[data-sort-select]');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      window.location.href = url.toString();
    });
  }

  // ==========================================
  // Mobile Filter Toggle
  // ==========================================
  function initFilterToggle() {
    var toggleBtn = document.querySelector('[data-filter-toggle]');
    var filters = document.querySelector('[data-collection-filters]');

    if (!toggleBtn || !filters) return;

    // Show filter toggle on mobile
    if (window.innerWidth <= 768) {
      toggleBtn.style.display = 'inline-flex';
    }

    toggleBtn.addEventListener('click', function() {
      filters.classList.toggle('is-open');
      toggleBtn.textContent = filters.classList.contains('is-open') ? 'Hide Filters' : 'Filters';
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'inline-flex';
      } else {
        toggleBtn.style.display = 'none';
        filters.classList.remove('is-open');
      }
    });
  }

  // ==========================================
  // Initialize Everything
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    initAnnouncementBar();
    initStickyHeader();
    initMobileNav();
    initCartDrawer();
    initHeroSlider();
    initProductGallery();
    initVariantSelector();
    initAccordions();
    initQuantitySelectors();
    initAddToCart();
    initCollectionSort();
    initFilterToggle();
  });

})();
