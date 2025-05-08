import api from '../../js/api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    // Initialize learning page
    initLearning();
});

async function initLearning() {
    try {
        // Get user profile
        const userData = await api.auth.getCurrentUser();
        updateUserProfile(userData);

        // Get active courses
        const courses = await api.courses.getAll();
        const activeCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
        
        updateOverallProgress(activeCourses);
        displayActiveCourses(activeCourses);
        displayUpcomingLessons(activeCourses);

        // Add event listeners
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('sidebarLogoutBtn').addEventListener('click', handleLogout);
    } catch (error) {
        console.error('Error initializing learning page:', error);
        showNotification('Error loading learning data', 'error');
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

function updateOverallProgress(courses) {
    if (courses.length === 0) {
        document.getElementById('overallProgress').textContent = '0%';
        return;
    }

    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    const averageProgress = Math.round(totalProgress / courses.length);
    document.getElementById('overallProgress').textContent = `${averageProgress}%`;

    // Update progress circle
    const progressCircle = document.querySelector('.progress-circle path:last-child');
    if (progressCircle) {
        progressCircle.style.strokeDasharray = `${averageProgress}, 100`;
    }
}

function displayActiveCourses(courses) {
    const activeCoursesContainer = document.getElementById('activeCourses');

    if (courses.length === 0) {
        activeCoursesContainer.innerHTML = `
            <div class="no-courses">
                <p>You are not currently enrolled in any active courses.</p>
                <a href="my-courses.html" class="btn-primary">View My Courses</a>
            </div>
        `;
        return;
    }

    activeCoursesContainer.innerHTML = courses.map(course => `
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
                    <a href="learning.html?course=${course._id}" class="btn-primary">Continue Learning</a>
                </div>
            </div>
        </div>
    `).join('');
}

function displayUpcomingLessons(courses) {
    const upcomingLessonsContainer = document.getElementById('upcomingLessons');
    const allLessons = [];

    // Collect all upcoming lessons from active courses
    courses.forEach(course => {
        if (course.lessons) {
            course.lessons.forEach(lesson => {
                if (!lesson.completed) {
                    allLessons.push({
                        ...lesson,
                        courseTitle: course.title,
                        courseId: course._id
                    });
                }
            });
        }
    });

    // Sort lessons by scheduled date
    allLessons.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    if (allLessons.length === 0) {
        upcomingLessonsContainer.innerHTML = `
            <div class="no-lessons">
                <p>No upcoming lessons scheduled.</p>
            </div>
        `;
        return;
    }

    upcomingLessonsContainer.innerHTML = allLessons.slice(0, 5).map(lesson => `
        <div class="lesson-card">
            <div class="lesson-info">
                <h4>${lesson.title}</h4>
                <p class="course-name">${lesson.courseTitle}</p>
                <p class="lesson-time">
                    <i class="fas fa-calendar"></i>
                    ${new Date(lesson.scheduledDate).toLocaleDateString()}
                </p>
            </div>
            <div class="lesson-actions">
                <a href="learning.html?course=${lesson.courseId}&lesson=${lesson._id}" class="btn-secondary">
                    Start Lesson
                </a>
            </div>
        </div>
    `).join('');
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