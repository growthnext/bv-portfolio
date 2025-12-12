/* ============================================
   VANILLA JAVASCRIPT FOR CA BHAVIKA VEERA PORTFOLIO
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // TYPEWRITER ANIMATION
    // ============================================
    function typeWriterEffect(phrases, elementId, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting characters
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 500);
                    return;
                }
            } else {
                // Typing characters
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, pauseDuration);
                    return;
                }
            }
            
            setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
        }
        
        // Start the animation
        type();
    }
    
    // Initialize typewriter with professional titles
    const typewriterPhrases = [
        "Financial Consultant",
        "Treasury & Banking Expert",
        "Corporate Finance Expert",
        "Strategic Business Advisor",
        "Audit & Taxation Specialist"
    ];
    
    typeWriterEffect(typewriterPhrases, "typewriter");
    
    
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    
    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    
    // ============================================
    // PARALLAX EFFECT ON HERO SECTION
    // ============================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ============================================
    // FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const errorElements = document.querySelectorAll('.form-error');
            errorElements.forEach(error => error.textContent = '');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Please enter a valid name';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            
            // Validate subject
            if (subject.length < 3) {
                document.getElementById('subjectError').textContent = 'Please enter a subject';
                isValid = false;
            }
            
            // Validate message
            if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If form is valid, submit (or handle submission)
            if (isValid) {
                const formData = new FormData(contactForm);

    fetch('https://formcarry.com/s/-MszskfA7zK', {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Thank you for your message! CA Bhavika Veera will get back to you soon.');
            contactForm.reset();
        } else {
            alert('There was an issue submitting the form. Please try again later.');
            console.error(data);
        }
    })
    .catch(error => {
        alert('Network error. Please try again later.');
        console.error(error);
    });
                
                // Example AJAX submission (uncomment and modify as needed):
                /*
                fetch('your-backend-endpoint.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        subject: subject,
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(error => {
                    alert('Error sending message. Please try again.');
                    console.error('Error:', error);
                });
                */
            }
        });
        
        // Real-time validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                const errorId = `${this.id}Error`;
                const errorElement = document.getElementById(errorId);
                
                if (errorElement && this.value.trim() === '') {
                    errorElement.textContent = 'This field is required';
                } else if (errorElement) {
                    errorElement.textContent = '';
                }
            });
            
            input.addEventListener('input', function() {
                const errorId = `${this.id}Error`;
                const errorElement = document.getElementById(errorId);
                if (errorElement && this.value.trim() !== '') {
                    errorElement.textContent = '';
                }
            });
        });
    }
    
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    
    // ============================================
    // CONSOLE MESSAGE (Optional)
    // ============================================
    console.log('%c👋 Welcome to CA Bhavika Veera\'s Portfolio!', 
        'color: #F4C430; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for financial excellence? Let\'s connect!', 
        'color: #0A1A44; font-size: 14px;');
    
});

