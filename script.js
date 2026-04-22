// Ultra-smooth Portfolio Script - Fixed lag with requestAnimationFrame, optimized scroll
document.addEventListener('DOMContentLoaded', () => {
    let ticking = false;
    
    // Navbar
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Optimized navbar scroll
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 15, 23, 0.98)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(15, 15, 23, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Ultra-smooth scroll with precise offset
    document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = 80;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Optimized Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate, .project-card, .resume-item, .skill-item, .stat').forEach(el => {
        observer.observe(el);
    });
    
    // Skills bars - optimized
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                if (progress && progress.style.width === '0%') {
                    progress.style.width = progress.dataset.width + '%';
                }
            }
        });
    }, { threshold: 0.7 });
    
    document.querySelectorAll('.skill-item').forEach(item => skillObserver.observe(item));
    
    // Contact form
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate send
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Sent!';
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Smooth parallax
    let rafId;
    function parallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        rafId = requestAnimationFrame(parallax);
    }
    
    window.addEventListener('scroll', () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(parallax);
    });
    
    // Typing effect optimized
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text[i];
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 300);
    }
    
    // Preload critical elements
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        img.src = img.dataset.src;
    });
});

