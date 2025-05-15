import api from './api.js';

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Remove duplicate mobile menu code since it's handled in mobile-menu.js
    
    // Smooth scrolling for anchor links
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
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navbar');
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
            }
        });
    });
    
    // Login Modal
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-login');
    const closeModal = document.querySelector('.close-modal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Open modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modal with x button
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                // Reset forms when closing
                if (loginForm) loginForm.style.display = 'block';
                if (registerForm) registerForm.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            // Reset forms when closing
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
        }
    });
    
    if (showRegister && showLogin) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
        
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await api.auth.login(email, password);
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    showNotification('Login successful!', 'success');
                    setTimeout(() => {
                        window.location.href = '/learners/dashboard.html';
                    }, 1000);
                }
            } catch (error) {
                showNotification(error.message || 'Login failed', 'error');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirm').value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            try {
                const response = await api.auth.register({ name, email, password });
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    showNotification('Registration successful!', 'success');
                    setTimeout(() => {
                        window.location.href = '/learners/dashboard.html';
                    }, 1000);
                }
            } catch (error) {
                showNotification(error.message || 'Registration failed', 'error');
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add contact form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add newsletter subscription logic here
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Navbar scroll behavior
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginButtons = document.querySelectorAll('.btn-login');

// Show login modal
function showLoginModal() {
    (document.getElementById('loginModal')).style.display = 'flex';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

// Show register form
function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Show login form
function showLoginForm() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

// Update UI based on authentication state
function updateAuthUI(user) {
    const loginButtons = document.querySelectorAll('.btn-login');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (user) {
        // User is logged in
        loginButtons.forEach(button => {
            button.textContent = user.name;
            button.classList.add('logged-in');
        });
        
        // Show cart icon if not already visible
        if (cartIcon) cartIcon.style.display = 'flex';
    } else {
        // User is logged out
        loginButtons.forEach(button => {
            button.textContent = 'Join Us';
            button.classList.remove('logged-in');
        });
        
        // Hide cart icon
        if (cartIcon) cartIcon.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check authentication status on page load
async function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const user = await api.auth.getCurrentUser();
            updateAuthUI(user);
        } catch (error) {
            console.error('Auth check error:', error);
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            updateAuthUI(null);
        }
    } else {
        updateAuthUI(null);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication status
    checkAuth();
    
    // Login modal events
    loginButtons.forEach(button => {
        button.addEventListener('click', showLoginModal);
    });
    
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            (document.getElementById('loginModal')).style.display = 'none';
        });
    });
    
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await api.auth.login(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                showNotification('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = '/learners/dashboard.html';
                }, 1000);
            }
        } catch (error) {
            showNotification(error.message || 'Login failed', 'error');
        }
    });
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            const response = await api.auth.register(name, email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                showNotification('Registration successful!', 'success');
                setTimeout(() => {
                    window.location.href = '/learners/dashboard.html';
                }, 1000);
            }
        } catch (error) {
            showNotification(error.message || 'Registration failed', 'error');
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('loginModal')) {
            (document.getElementById('loginModal')).style.display = 'none';
        }
    });
});

// Google Sign-In Configuration
const googleConfig = {
    client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
    scope: 'email profile'
};

// Initialize Google Sign-In
function initGoogleSignIn() {
    gapi.load('auth2', () => {
        gapi.auth2.init(googleConfig).then(
            (auth2) => {
                // Attach click handlers
                document.getElementById('googleSignIn').addEventListener('click', handleGoogleSignIn);
                document.getElementById('googleSignUp').addEventListener('click', handleGoogleSignUp);
            },
            (error) => {
                console.error('Error initializing Google Sign-In:', error);
            }
        );
    });
}

// Handle Google Sign In
async function handleGoogleSignIn() {
    try {
        const auth2 = await initGoogleAuth();
        const googleUser = await auth2.signIn();
        const idToken = googleUser.getAuthResponse().id_token;
        
        const response = await api.auth.googleSignIn(idToken);
        if (response.token) {
            localStorage.setItem('token', response.token);
            showNotification('Google sign in successful!', 'success');
            setTimeout(() => {
                window.location.href = '/learners/dashboard.html';
            }, 1000);
        }
    } catch (error) {
        showNotification(error.message || 'Google sign in failed', 'error');
    }
}

// Handle Google Sign Up
async function handleGoogleSignUp() {
    try {
        const auth2 = await initGoogleAuth();
        const googleUser = await auth2.signIn();
        const idToken = googleUser.getAuthResponse().id_token;
        
        const response = await api.auth.googleSignUp(idToken);
        if (response.token) {
            localStorage.setItem('token', response.token);
            showNotification('Google sign up successful!', 'success');
            setTimeout(() => {
                window.location.href = '/learners/dashboard.html';
            }, 1000);
        }
    } catch (error) {
        showNotification(error.message || 'Google sign up failed', 'error');
    }
}

// Load Google Sign-In API
function loadGoogleSignInAPI() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = initGoogleSignIn;
    document.head.appendChild(script);
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGoogleSignInAPI();
    // ... existing DOMContentLoaded code ...
});

// Modal Functionality
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginBtn = document.querySelector('.btn-login');

// Show/Hide Modals
loginBtn.addEventListener('click', () => {
    (document.getElementById('loginModal')).style.display = 'block';
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        (document.getElementById('loginModal')).style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Form Submissions
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add contact form submission logic
});

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic
});

// Global error handler
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('An unexpected error occurred', 'error');
});

// Network status monitoring
window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('No internet connection', 'error');
});

// CSRF Protection
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

// Add CSRF token to all API requests
api.interceptors.request.use(config => {
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});

// Rate limiting for form submissions
const rateLimiter = {
    attempts: {},
    maxAttempts: 5,
    resetTime: 300000, // 5 minutes
    
    checkLimit(action) {
        const now = Date.now();
        if (!this.attempts[action]) {
            this.attempts[action] = { count: 0, timestamp: now };
        }
        
        if (now - this.attempts[action].timestamp > this.resetTime) {
            this.attempts[action] = { count: 0, timestamp: now };
        }
        
        if (this.attempts[action].count >= this.maxAttempts) {
            throw new Error('Too many attempts. Please try again later.');
        }
        
        this.attempts[action].count++;
    }
};

// Hero Carousel Functionality
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = (index + slides.length) % slides.length;

        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');

        // Reset transition flag after animation completes
        slides[currentSlide].addEventListener('transitionend', () => {
            isTransitioning = false;
        }, { once: true });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    function goToSlide(index) {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    }

    // Initialize the carousel
    if (slides.length > 0) {
        // Ensure first slide is visible
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
        
        startSlideShow();

        // Event listeners for controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideShow();
                startSlideShow();
            });
        }

        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopSlideShow);
            heroSection.addEventListener('mouseleave', startSlideShow);
        }

        // Touch events for mobile
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideShow();
        }, { passive: true });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideShow();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopSlideShow();
                startSlideShow();
            }
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideShow();
            } else {
                startSlideShow();
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initLoginModal();
    initContactForm();
    initNewsletterForm();
    initStickyHeader();
    initNavbarScroll();
    initHeroCarousel();
    initNewsMarquee();
    initThemeToggle();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// News Marquee Functionality
function initNewsMarquee() {
    const marqueeItems = document.querySelector('.marquee-items');
    if (marqueeItems) {
        // Clone marquee items for continuous scrolling
        const items = marqueeItems.innerHTML;
        marqueeItems.innerHTML = items + items;

        // Add hover pause functionality
        marqueeItems.addEventListener('mouseenter', () => {
            marqueeItems.style.animationPlayState = 'paused';
        });

        marqueeItems.addEventListener('mouseleave', () => {
            marqueeItems.style.animationPlayState = 'running';
        });
    }

    // Hide marquee after 20 seconds
    const newsMarquee = document.querySelector('.news-marquee');
    if (newsMarquee) {
        setTimeout(() => {
            newsMarquee.classList.add('hidden');
        }, 20000);
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun-haze', 'fa-moon-stars');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeIcon.classList.replace('fa-sun-haze', 'fa-moon-stars');
        } else {
            themeIcon.classList.replace('fa-moon-stars', 'fa-sun-haze');
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    let isMenuOpen = false;

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle aria-expanded attribute
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                isMenuOpen = false;
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}