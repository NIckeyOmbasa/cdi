// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    if (document.getElementById('enrollmentChart')) {
        const enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
        const enrollmentChart = new Chart(enrollmentCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Enrollment',
                    data: [120, 150, 180, 210, 240, 220, 250, 280, 300, 320, 350, 400],
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    if (document.getElementById('popularityChart')) {
        const popularityCtx = document.getElementById('popularityChart').getContext('2d');
        const popularityChart = new Chart(popularityCtx, {
            type: 'bar',
            data: {
                labels: ['Web Dev', 'Data Science', 'PM', 'Marketing', 'Leadership', 'AWS'],
                datasets: [{
                    label: 'Enrollments',
                    data: [320, 280, 240, 180, 150, 120],
                    backgroundColor: [
                        'rgba(78, 115, 223, 0.8)',
                        'rgba(28, 200, 138, 0.8)',
                        'rgba(246, 194, 62, 0.8)',
                        'rgba(231, 74, 59, 0.8)',
                        'rgba(54, 185, 204, 0.8)',
                        'rgba(111, 66, 193, 0.8)'
                    ],
                    borderColor: [
                        'rgba(78, 115, 223, 1)',
                        'rgba(28, 200, 138, 1)',
                        'rgba(246, 194, 62, 1)',
                        'rgba(231, 74, 59, 1)',
                        'rgba(54, 185, 204, 1)',
                        'rgba(111, 66, 193, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Data tables functionality would be implemented here
    // This would typically use a library like DataTables for advanced features
    
    // Form validations and submissions
    const adminForms = document.querySelectorAll('.admin-form');
    adminForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Form submission will be implemented with backend integration');
        });
    });
    
    // Toggle functionality for admin sections
    const toggleButtons = document.querySelectorAll('[data-toggle]');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-toggle');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.classList.toggle('show');
            }
        });
    });
});