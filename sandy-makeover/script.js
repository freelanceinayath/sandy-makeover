/* ============================================
   SANDY MAKEOVER — JavaScript
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     NAV — SCROLL BEHAVIOR
  ============================================ */
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });


  /* ============================================
     MOBILE MENU
  ============================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


  /* ============================================
     INTERSECTION OBSERVER — SCROLL ANIMATIONS
  ============================================ */
  const animateElements = document.querySelectorAll(
    '[data-aos], .transform-step, .journey-step, .service-card, .masonry-item, .insta-item, .why-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach((el, i) => {
    el.dataset.delay = (i % 6) * 0.08;
    observer.observe(el);
  });


  /* ============================================
     STAGGERED ANIMATION FOR GRIDS
  ============================================ */
  const staggerGroups = [
    '.services-grid .service-card',
    '.why-grid .why-card',
    '.masonry-grid .masonry-item',
    '.insta-grid .insta-item',
    '.transform-step',
    '.journey-step'
  ];

  staggerGroups.forEach(selector => {
    const items = document.querySelectorAll(selector);
    const groupObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll(selector.split(' ').pop());
          siblings.forEach((sibling, idx) => {
            setTimeout(() => sibling.classList.add('visible'), idx * 100);
          });
          groupObserver.disconnect();
        }
      });
    }, { threshold: 0.08 });

    if (items.length > 0) groupObserver.observe(items[0]);
  });


  /* ============================================
     LIGHTBOX
  ============================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const portfolioImages = document.querySelectorAll('.masonry-item img');
  let currentLightboxIndex = 0;

  const openLightbox = (index) => {
    currentLightboxIndex = index;
    lightboxImg.src = portfolioImages[index].src;
    lightboxImg.alt = portfolioImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  portfolioImages.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + portfolioImages.length) % portfolioImages.length;
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = portfolioImages[currentLightboxIndex].src;
      lightboxImg.style.opacity = 1;
    }, 150);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % portfolioImages.length;
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = portfolioImages[currentLightboxIndex].src;
      lightboxImg.style.opacity = 1;
    }, 150);
  });

  lightboxImg.style.transition = 'opacity 0.2s ease';

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });


  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ============================================
     PARALLAX — EDITORIAL IMAGE
  ============================================ */
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  
  const handleParallax = () => {
    parallaxImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * 0.08;
      img.style.transform = `scale(1.06) translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax, { passive: true });


  /* ============================================
     COUNTER ANIMATION — STATS
  ============================================ */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const target = el.textContent;
    const numMatch = target.match(/\d+/);
    if (!numMatch) return;
    
    const num = parseInt(numMatch[0]);
    const suffix = target.replace(numMatch[0], '');
    const duration = 2000;
    const step = num / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.editorial-stats');
  if (statsSection) statsObserver.observe(statsSection);


  /* ============================================
     REVIEWS AUTO-SCROLL PAUSE ON TOUCH
  ============================================ */
  const reviewsTrack = document.getElementById('reviewsTrack');
  if (reviewsTrack) {
    reviewsTrack.addEventListener('touchstart', () => {
      reviewsTrack.style.animationPlayState = 'paused';
    });
    reviewsTrack.addEventListener('touchend', () => {
      setTimeout(() => {
        reviewsTrack.style.animationPlayState = 'running';
      }, 3000);
    });
  }


  /* ============================================
     STICKY BOOK BUTTON — SHOW AFTER HERO
  ============================================ */
  const stickyBook = document.getElementById('stickyBook');
  const hero = document.querySelector('.hero');

  if (stickyBook && hero) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          stickyBook.style.opacity = '1';
          stickyBook.style.pointerEvents = 'auto';
        } else {
          stickyBook.style.opacity = '0';
          stickyBook.style.pointerEvents = 'none';
        }
      });
    }, { threshold: 0 });
    
    stickyBook.style.transition = 'opacity 0.4s ease';
    stickyBook.style.opacity = '0';
    stickyBook.style.pointerEvents = 'none';
    stickyObserver.observe(hero);
  }


  /* ============================================
     WHATSAPP FLOAT — SUBTLE ENTRANCE
  ============================================ */
  const waFloat = document.getElementById('whatsappFloat');
  if (waFloat) {
    setTimeout(() => {
      waFloat.style.transform = 'scale(1)';
      waFloat.style.opacity = '1';
    }, 2000);
    waFloat.style.transform = 'scale(0)';
    waFloat.style.opacity = '0';
    waFloat.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }


  /* ============================================
     CURSOR TRAIL (DESKTOP) — SUBTLE ELEGANCE
  ============================================ */
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgba(200,164,93,0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease, opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(cursor);

    const cursorRing = document.createElement('div');
    cursorRing.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      border: 1px solid rgba(200,164,93,0.35);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: all 0.35s ease;
      opacity: 0;
    `;
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';

      setTimeout(() => {
        cursorRing.style.left = mouseX + 'px';
        cursorRing.style.top = mouseY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button, .service-card, .masonry-item, .insta-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.4)';
        cursorRing.style.borderColor = 'rgba(200,164,93,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(200,164,93,0.35)';
      });
    });
  }


  /* ============================================
     HERO SCROLL FADE
  ============================================ */
  const heroContent = document.querySelector('.hero-content');
  const heroScrollFade = () => {
    if (!heroContent) return;
    const scrolled = window.scrollY;
    const opacity = 1 - scrolled / 500;
    heroContent.style.opacity = Math.max(0, opacity);
    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
  };
  window.addEventListener('scroll', heroScrollFade, { passive: true });


  /* ============================================
     PAGE LOAD TRANSITION
  ============================================ */
  const pageReveal = document.createElement('div');
  pageReveal.style.cssText = `
    position: fixed;
    inset: 0;
    background: #0D0B09;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.8s ease;
  `;

  const logoReveal = document.createElement('div');
  logoReveal.style.cssText = `
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 0.15em;
    color: #C8A45D;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  `;
  logoReveal.textContent = 'SANDY MAKEOVER';

  pageReveal.appendChild(logoReveal);
  document.body.appendChild(pageReveal);

  setTimeout(() => {
    logoReveal.style.opacity = '1';
    logoReveal.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => {
    pageReveal.style.opacity = '0';
    setTimeout(() => pageReveal.remove(), 800);
  }, 1400);

});
