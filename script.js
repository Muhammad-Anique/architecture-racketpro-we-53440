'use strict';

/**
 * RacketPro Web - Interactive Components
 * Handles mobile navigation, smooth scrolling, form validation, and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initNavbarScroll();
    initTestimonialsAnimation();
});

/**
 * Mobile Navigation Toggle logic
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Simple animation for the hamburger icon
        bars.forEach((bar, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
}

/**
 * Enhanced Smooth Scrolling for all internal links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Validation and Submission Logic
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Basic Front-end Validation
        if (!validateEmail(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (data.message.length < 10) {
            alert('Please provide a bit more detail in your message (min 10 characters).');
            return;
        }

        // Visual feedback for submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            /** 
             * Integration Point:
             * In a full Next.js/Supabase build, this would call an API route 
             * or use the Supabase client directly.
             */
            console.log('Submitting lead to Supabase:', data);
            
            // Simulating API latency
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Success state
            alert('Thank you for your interest! A RacketPro specialist will contact you shortly.');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try calling us directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Email validation helper using regex
 */
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^[^\