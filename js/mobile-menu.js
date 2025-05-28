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
            isMenuOpen = false;
            document.body.style.overflow = '';
        }

        // Function to open menu
        function openMenu() {
            navbar.classList.add('active');
            mobileMenuBtn.classList.add('active');
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
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
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });

        // Add keyboard navigation
        mobileMenuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!isMenuOpen) {
                    openMenu();
                }
            }
        });

        // Add escape key support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu); 