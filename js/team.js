document.addEventListener('DOMContentLoaded', function() {
    // Initialize page content visibility
    const pageContent = document.querySelector('.team-comprehensive');
    if (pageContent) {
        pageContent.style.display = 'block';
        pageContent.style.opacity = '1';
    }

    // Initialize profile buttons
    const viewProfileButtons = document.querySelectorAll('.btn-view-profile');
    
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamMember = this.closest('.team-member-expanded');
            const memberDetails = teamMember.querySelector('.member-details');
            
            // Close all other expanded cards first
            document.querySelectorAll('.team-member-expanded').forEach(member => {
                if (member !== teamMember) {
                    member.classList.remove('active');
                    const details = member.querySelector('.member-details');
                    details.style.maxHeight = '0';
                    details.style.opacity = '0';
                    member.querySelector('.btn-view-profile').textContent = 'View Profile';
                }
            });
            
            // Toggle the clicked card
            teamMember.classList.toggle('active');
            
            // Toggle visibility of member details
            if (teamMember.classList.contains('active')) {
                memberDetails.style.maxHeight = memberDetails.scrollHeight + "px";
                memberDetails.style.opacity = '1';
                this.textContent = 'Close Profile';
            } else {
                memberDetails.style.maxHeight = '0';
                memberDetails.style.opacity = '0';
                this.textContent = 'View Profile';
            }
        });
    });

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            disable: 'mobile'
        });
    }

    // Ensure all team member details are initially hidden
    document.querySelectorAll('.member-details').forEach(details => {
        details.style.maxHeight = '0';
        details.style.opacity = '0';
    });
});