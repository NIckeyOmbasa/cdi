// Check authentication status on page load
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Get user data
        const userData = await api.getUserProfile();
        updateUserProfile(userData);

        // Get enrolled courses
        const enrolledCourses = await api.getEnrolledCourses();
        updateEnrolledCourses(enrolledCourses);

        // Update stats
        updateDashboardStats(enrolledCourses);

        // Add logout event listener
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Error loading dashboard data', 'error');
    }
});

// Update user profile information
function updateUserProfile(userData) {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
}

// Update enrolled courses display
function updateEnrolledCourses(courses) {
    const coursesGrid = document.getElementById('enrolledCourses');
    coursesGrid.innerHTML = '';

    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-book-open"></i>
                <h3>No Enrolled Courses</h3>
                <p>You haven't enrolled in any courses yet.</p>
                <a href="courses.html" class="btn-primary">Browse Courses</a>
            </div>
        `;
        return;
    }

    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Create course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-level">${course.level}</div>
        </div>
        <div class="course-content">
            <h3>${course.title}</h3>
            <p class="instructor">${course.instructor}</p>
            <div class="course-meta">
                <span><i class="far fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-star"></i> ${course.rating}</span>
            </div>
            <div class="course-actions">
                <a href="course-details.html?id=${course._id}" class="btn-primary">Continue Learning</a>
            </div>
        </div>
    `;
    return card;
}

// Update dashboard statistics
function updateDashboardStats(courses) {
    document.getElementById('enrolledCount').textContent = courses.length;
    document.getElementById('certificateCount').textContent = courses.filter(course => course.completed).length;
    document.getElementById('learningHours').textContent = calculateTotalHours(courses);
}

// Calculate total learning hours
function calculateTotalHours(courses) {
    return courses.reduce((total, course) => {
        const hours = parseInt(course.duration);
        return total + (isNaN(hours) ? 0 : hours);
    }, 0);
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 