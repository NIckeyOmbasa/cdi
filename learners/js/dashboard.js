import api from '../../js/api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    // Initialize dashboard
    initDashboard();
});

async function initDashboard() {
    try {
        // Get user profile
        const userData = await api.auth.getCurrentUser();
        updateUserProfile(userData);

        // Get enrolled courses
        const courses = await api.courses.getAll();
        updateDashboardStats(courses);
        displayCurrentCourses(courses);
        displayRecentActivity(courses);

        // Add event listeners
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('sidebarLogoutBtn').addEventListener('click', handleLogout);
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Error loading dashboard data', 'error');
    }
}

function updateUserProfile(userData) {
    // Update user information in the UI
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('welcomeName').textContent = userData.name;
    
    // Update avatars if available
    if (userData.avatar) {
        document.getElementById('userAvatar').src = userData.avatar;
        document.getElementById('sidebarAvatar').src = userData.avatar;
    }
}

function updateDashboardStats(courses) {
    const enrolledCount = courses.length;
    const completedCount = courses.filter(course => course.progress === 100).length;
    const totalHours = calculateTotalHours(courses);

    document.getElementById('enrolledCount').textContent = enrolledCount;
    document.getElementById('certificateCount').textContent = completedCount;
    document.getElementById('learningHours').textContent = totalHours;
}

function displayCurrentCourses(courses) {
    const currentCoursesContainer = document.getElementById('currentCourses');
    const activeCourses = courses.filter(course => course.progress > 0 && course.progress < 100);

    if (activeCourses.length === 0) {
        currentCoursesContainer.innerHTML = `
            <div class="no-courses">
                <p>You are not currently enrolled in any courses.</p>
                <a href="../courses.html" class="btn-primary">Browse Courses</a>
            </div>
        `;
        return;
    }

    currentCoursesContainer.innerHTML = activeCourses.map(course => `
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
                </div>
                <a href="learning.html?course=${course._id}" class="btn-secondary">Continue Learning</a>
            </div>
        </div>
    `).join('');
}

function displayRecentActivity(courses) {
    const activityContainer = document.getElementById('recentActivity');
    const recentActivities = courses
        .filter(course => course.lastAccessed)
        .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
        .slice(0, 5);

    if (recentActivities.length === 0) {
        activityContainer.innerHTML = `
            <div class="no-activity">
                <p>No recent activity to display.</p>
            </div>
        `;
        return;
    }

    activityContainer.innerHTML = recentActivities.map(course => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-book"></i>
            </div>
            <div class="activity-content">
                <h4>${course.title}</h4>
                <p>Last accessed: ${new Date(course.lastAccessed).toLocaleDateString()}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${course.progress}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function calculateTotalHours(courses) {
    return courses.reduce((total, course) => total + course.duration, 0);
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