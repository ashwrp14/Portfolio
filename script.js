document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle — CSS handles sun/moon visibility via body.light-mode class
    const themeBtn = document.getElementById('theme-btn');

    // Restore saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        window.dispatchEvent(new Event('scroll'));
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger to X
            const lines = hamburger.querySelectorAll('.line');
            if (navLinks.classList.contains('active')) {
                lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const lines = hamburger.querySelectorAll('.line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (window.scrollY > 50) {
            navbar.style.background = isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = isLightMode ? '0 5px 20px rgba(0,0,0,0.1)' : '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = isLightMode ? 'rgba(240, 244, 248, 0.8)' : 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.glass-card, .section-title');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        revealOnScroll.observe(el);
    });
});
