
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const moonIconMobile = document.getElementById('moon-icon-mobile');
    const sunIconMobile = document.getElementById('sun-icon-mobile');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      body.classList.toggle('dark-theme', savedTheme === 'dark');
      updateIcons(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      body.classList.toggle('dark-theme', prefersDark);
      updateIcons(prefersDark);
      localStorage.setItem('portfolio-theme', prefersDark ? 'dark' : 'light');
    }
    
    function updateIcons(isDark) {
      moonIcon.classList.toggle('hidden', isDark);
      sunIcon.classList.toggle('hidden', !isDark);
      moonIconMobile.classList.toggle('hidden', isDark);
      sunIconMobile.classList.toggle('hidden', !isDark);
    }
    
    function toggleTheme() {
      const isDark = body.classList.toggle('dark-theme');
      updateIcons(isDark);
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden', !isOpen);
      closeIcon.classList.toggle('hidden', isOpen);
    });
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Hackathon photos modal
    const modal = document.getElementById('photo-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPhotos = document.getElementById('modal-photos');
    const modalClose = document.querySelector('.modal-close');
    const hackathonBtns = document.querySelectorAll('.hackathon-photos-btn');
    
    const hackathonData = {
      shlokadecode: {
        title: 'Shloka Decode NSUT',
        photos: [
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
        ]
      },
      buildwars: {
        title: 'BuildWars MAIT',
        photos: [
          'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80'
        ]
      },
      healthtech: {
        title: 'HealthTech Hackathon',
        photos: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80'
        ]
      }
    };
    
    hackathonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const hackathon = btn.getAttribute('data-hackathon');
        const data = hackathonData[hackathon];
        
        if (data) {
          modalTitle.textContent = data.title;
          modalPhotos.innerHTML = '';
          
          data.photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'modal-photo';
            
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `${data.title} event photo`;
            
            photoDiv.appendChild(img);
            modalPhotos.appendChild(photoDiv);
          });
          
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    
    // Initialize GSAP animations
    initAnimations();
  });
  
  // GSAP Animations
  function initAnimations() {
    // Reveal animations for elements with gsap-reveal class
    gsap.utils.toArray(".gsap-reveal").forEach((element) => {
      const delay = element.getAttribute('data-delay') || 0;
      
      gsap.fromTo(
        element,
        { 
          y: 50, 
          opacity: 0,
          visibility: "hidden"
        },
        {
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          delay: delay / 1000,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          }
        }
      );
    });
  
    // Text reveal animations
    gsap.utils.toArray(".gsap-text-reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { 
          opacity: 0,
          visibility: "hidden" 
        },
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          }
        }
      );
    });
  
    // Floating animations
    gsap.utils.toArray(".gsap-float").forEach((element, i) => {
      const delay = i * 0.2;
      const randomY = gsap.utils.random(-15, -30);
      const randomDuration = gsap.utils.random(3, 5);
      
      gsap.to(element, {
        y: randomY,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });
  }

    // Initialize GSAP animations for the competitive programming section
    document.addEventListener('DOMContentLoaded', function() {
      gsap.registerPlugin(ScrollTrigger);
      
      // Reveal animations for competitive programming cards
      gsap.utils.toArray('.comp-platforms-grid .gsap-reveal').forEach(function(elem) {
        ScrollTrigger.create({
          trigger: elem,
          start: "top 85%",
          onEnter: function() {
            gsap.fromTo(elem, 
              {y: 50, opacity: 0}, 
              {
                duration: 1.2, 
                y: 0,
                opacity: 1,
                ease: "power3.out",
                delay: elem.dataset.delay ? elem.dataset.delay / 1000 : 0
              }
            );
          },
          once: true
        });
      });
    });
  
  