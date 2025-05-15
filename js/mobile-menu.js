// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    let isMenuOpen = false;

    if (mobileMenuBtn && navbar) {
        // Set initial icon state
        const icon = mobileMenuBtn.querySelector('i');
        if (!icon) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        // Function to close menu
        function closeMenu() {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        // Function to open menu
        function openMenu() {
            navbar.classList.add('active');
            mobileMenuBtn.classList.add('active');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target) && navbar.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when clicking on a link
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navbar.classList.contains('active')) {
                closeMenu();
            }
        });

        // Add keyboard navigation
        mobileMenuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMenu();
            }
        });

        // Add escape key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu); 