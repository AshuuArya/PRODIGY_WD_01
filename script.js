document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 120) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // CTA button hover animation
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Project card hover animation
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-link').style.transform = 'translateX(10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-link').style.transform = 'translateX(0)';
        });
    });

    // Scroll-triggered animations with Intersection Observer
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Reapply animation by removing visible class when out of view
                entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                bar.style.width = bar.getAttribute('data-width');
            } else {
                bar.style.width = '0'; // Reset width when out of view
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check

    // Form submission (basic alert for demo)
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo, so it won’t actually send.');
        contactForm.reset();
    });
});