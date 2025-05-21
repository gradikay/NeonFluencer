// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Custom Cursor =====
    const cursor = document.getElementById('cursor');
    const links = document.querySelectorAll('a, button');
    
    // Show cursor on mouse move
    document.addEventListener('mousemove', function(e) {
        cursor.style.opacity = '1';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Enlarge cursor on hover over links and buttons
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderWidth = '3px';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderWidth = '2px';
        });
    });
    
    // ===== Sticky Header =====
    const header = document.querySelector('.header');
    let scrollPosition = window.scrollY;
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate menu toggle spans
        this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Testimonials Slider =====
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Next testimonial
    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Previous testimonial
    prevButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    
    testimonialsContainer.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // ===== Newsletter Form =====
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.getElementById('form-message');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Simple form validation
        if (nameInput.value.trim() === '') {
            showFormMessage('Please enter your name', 'error');
            return;
        }
        
        if (!emailPattern.test(emailInput.value)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // If validation passes, show success message
        showFormMessage('Thanks for subscribing! Check your email for confirmation.', 'success');
        
        // Reset form
        newsletterForm.reset();
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Clear message after 5 seconds
        setTimeout(function() {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    // ===== Video Card Hover Animation =====
    document.querySelectorAll('.video-card').forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        card.addEventListener('mouseenter', function() {
            if (playButton) {
                playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                playButton.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (playButton) {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                playButton.style.opacity = '0.9';
            }
        });
    });
    
    // ===== Scroll Reveal Animation =====
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.section-header, .about-content, .stat-item, .social-card, .video-card, .testimonial-slider, .subscribe-content');
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementPosition < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initialize reveal on page load
    revealOnScroll();
    
    // Update reveal on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Gallery image touch interaction for mobile
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Handle touch events for mobile
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1.03)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
});
