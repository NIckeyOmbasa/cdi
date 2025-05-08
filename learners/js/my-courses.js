import api from '../../js/api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    // Initialize my courses page
    initMyCourses();
});

async function initMyCourses() {
    try {
        // Get user profile
        const userData = await api.auth.getCurrentUser();
        updateUserProfile(userData);

        // Get enrolled courses
        const courses = await api.courses.getAll();
        displayEnrolledCourses(courses);

        // Add event listeners
        document.getElementById('courseFilter').addEventListener('change', handleFilterChange);
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('sidebarLogoutBtn').addEventListener('click', handleLogout);
    } catch (error) {
        console.error('Error initializing my courses:', error);
        showNotification('Error loading courses', 'error');
    }
}

function updateUserProfile(userData) {
    // Update user information in the UI
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    
    // Update avatars if available
    if (userData.avatar) {
        document.getElementById('userAvatar').src = userData.avatar;
        document.getElementById('sidebarAvatar').src = userData.avatar;
    }
}

function displayEnrolledCourses(courses, filter = 'all') {
    const coursesContainer = document.getElementById('enrolledCourses');
    let filteredCourses = courses;

    // Apply filter
    switch (filter) {
        case 'in-progress':
            filteredCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
            break;
        case 'completed':
            filteredCourses = courses.filter(course => course.progress === 100);
            break;
        case 'not-started':
            filteredCourses = courses.filter(course => course.progress === 0);
            break;
    }

    if (filteredCourses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="no-courses">
                <p>No courses found matching your criteria.</p>
                <a href="../courses.html" class="btn-primary">Browse Courses</a>
            </div>
        `;
        return;
    }

    coursesContainer.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="progress-bar">
                    <div class="progress" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration} hours</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                    <span><i class="fas fa-chart-line"></i> ${course.progress}% Complete</span>
                </div>
                <div class="course-actions">
                    ${course.progress === 100 ? 
                        `<button class="btn-primary" onclick="downloadCertificate('${course._id}')">
                            <i class="fas fa-certificate"></i> Download Certificate
                        </button>` :
                        `<a href="learning.html?course=${course._id}" class="btn-secondary">
                            ${course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                        </a>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function handleFilterChange(e) {
    const filter = e.target.value;
    displayEnrolledCourses(window.courses, filter);
}

async function downloadCertificate(courseId) {
    try {
        const response = await api.courses.getCertificate(courseId);
        // Handle certificate download
        showNotification('Certificate downloaded successfully', 'success');
    } catch (error) {
        console.error('Error downloading certificate:', error);
        showNotification('Error downloading certificate', 'error');
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 