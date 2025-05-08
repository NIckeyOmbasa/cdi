// LMS Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Course filtering
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (categoryFilter && levelFilter && courseCards.length > 0) {
        function filterCourses() {
            const selectedCategory = categoryFilter.value;
            const selectedLevel = levelFilter.value;
            
            courseCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardLevel = card.getAttribute('data-level');
                
                const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
                const levelMatch = selectedLevel === 'all' || cardLevel === selectedLevel;
                
                if (categoryMatch && levelMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        categoryFilter.addEventListener('change', filterCourses);
        levelFilter.addEventListener('change', filterCourses);
    }
    
    // Course enrollment modal
    const enrollModal = document.getElementById('enrollModal');
    const enrollButtons = document.querySelectorAll('.btn-course');
    const closeEnrollModal = enrollModal ? enrollModal.querySelector('.close-modal') : null;
    
    if (enrollButtons.length > 0 && enrollModal) {
        enrollButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get course details from the card
                const courseCard = this.closest('.course-card');
                const courseTitle = courseCard.querySelector('h3').textContent;
                const courseInstructor = courseCard.querySelector('.instructor').textContent;
                const courseDuration = courseCard.querySelector('.course-meta span:first-child').textContent;
                const courseLevel = courseCard.querySelector('.course-meta span:last-child').textContent;
                const coursePrice = courseCard.querySelector('.price').textContent;
                
                // Populate modal with course details
                enrollModal.querySelector('#courseTitle').textContent = courseTitle;
                enrollModal.querySelector('#courseInstructor').textContent = courseInstructor;
                enrollModal.querySelector('#courseDuration').textContent = courseDuration;
                enrollModal.querySelector('#courseLevel').textContent = courseLevel;
                enrollModal.querySelector('#coursePrice').textContent = coursePrice;
                enrollModal.querySelector('#totalAmount').textContent = coursePrice;
                
                enrollModal.style.display = 'flex';
            });
        });
    }
    
    if (closeEnrollModal) {
        closeEnrollModal.addEventListener('click', function() {
            enrollModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === enrollModal) {
            enrollModal.style.display = 'none';
        }
    });
    
    // Enrollment form submission
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add payment processing logic here
            alert('Payment processing will be implemented with backend integration');
            enrollModal.style.display = 'none';
            
            // Redirect to dashboard or course page
            // window.location.href = 'dashboard.html';
        });
    }
    
    // Course search functionality
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            courseCards.forEach(card => {
                const courseTitle = card.querySelector('h3').textContent.toLowerCase();
                const courseDescription = card.querySelector('.course-description').textContent.toLowerCase();
                
                if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});