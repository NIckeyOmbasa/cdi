// All courses data
const allCourses = [
    // Page 1 Courses (already in HTML)
    {
        id: "course1",
        title: "Web Development Fundamentals",
        instructor: "Sarah Johnson",
        duration: "8 Weeks",
        level: "Beginner",
        description: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
        rating: 4.5,
        reviews: 120,
        price: "Kshs 25,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" // Web development
    },
    {
        id: "course2",
        title: "Project Management Professional",
        instructor: "Michael Chen",
        duration: "12 Weeks",
        level: "Intermediate",
        description: "Master project management methodologies and prepare for PMP certification.",
        rating: 4.0,
        reviews: 85,
        price: "Kshs 35,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" // Project management
    },
    {
        id: "course3",
        title: "Advanced Data Science with Python",
        instructor: "David Rodriguez",
        duration: "10 Weeks",
        level: "Advanced",
        description: "Dive deep into machine learning algorithms and data analysis techniques.",
        rating: 5.0,
        reviews: 64,
        price: "Kshs 45,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" // Data science
    },
    {
        id: "course4",
        title: "Leadership in the Digital Age",
        instructor: "Emily Wilson",
        duration: "6 Weeks",
        level: "Intermediate",
        description: "Develop leadership skills for managing remote teams and digital transformation.",
        rating: 4.7,
        reviews: 92,
        price: "Kshs 30,000",
        category: "leadership",
        image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80" // Leadership
    },
    {
        id: "course5",
        title: "AWS Solutions Architect",
        instructor: "Sarah Johnson",
        duration: "8 Weeks",
        level: "Advanced",
        description: "Prepare for the AWS Certified Solutions Architect - Associate exam.",
        rating: 5.0,
        reviews: 78,
        price: "Kshs 50,000",
        category: "certification",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" // Cloud/AWS
    },
    {
        id: "course6",
        title: "Digital Marketing Fundamentals",
        instructor: "Michael Chen",
        duration: "6 Weeks",
        level: "Beginner",
        description: "Learn SEO, social media marketing, email campaigns, and analytics.",
        rating: 4.0,
        reviews: 110,
        price: "Kshs 22,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" // Digital marketing
    },
    // Page 2 Courses
    {
        id: "course7",
        title: "Mobile App Development",
        instructor: "David Rodriguez",
        duration: "10 Weeks",
        level: "Intermediate",
        description: "Build native mobile applications for iOS and Android platforms.",
        rating: 4.8,
        reviews: 95,
        price: "Kshs 40,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" // Mobile app
    },
    {
        id: "course8",
        title: "Business Analytics",
        instructor: "Emily Wilson",
        duration: "8 Weeks",
        level: "Intermediate",
        description: "Learn to analyze business data and make data-driven decisions.",
        rating: 4.6,
        reviews: 88,
        price: "Kshs 32,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" // Analytics
    },
    {
        id: "course9",
        title: "UI/UX Design Masterclass",
        instructor: "Sarah Johnson",
        duration: "6 Weeks",
        level: "Beginner",
        description: "Master the principles of user interface and user experience design.",
        rating: 4.9,
        reviews: 76,
        price: "Kshs 28,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" // UI/UX
    },
    {
        id: "course10",
        title: "DevOps Engineering",
        instructor: "Michael Chen",
        duration: "12 Weeks",
        level: "Advanced",
        description: "Learn CI/CD, containerization, and cloud infrastructure management.",
        rating: 4.7,
        reviews: 82,
        price: "Kshs 48,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" // DevOps
    },
    {
        id: "course11",
        title: "Financial Management",
        instructor: "David Rodriguez",
        duration: "8 Weeks",
        level: "Intermediate",
        description: "Master financial analysis, budgeting, and investment strategies.",
        rating: 4.5,
        reviews: 94,
        price: "Kshs 36,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" // Finance
    },
    {
        id: "course12",
        title: "Cybersecurity Fundamentals",
        instructor: "Emily Wilson",
        duration: "10 Weeks",
        level: "Beginner",
        description: "Learn essential cybersecurity concepts and best practices.",
        rating: 4.8,
        reviews: 68,
        price: "Kshs 38,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80" // Cybersecurity
    },
    // Page 3 Courses
    {
        id: "course13",
        title: "Machine Learning Basics",
        instructor: "Sarah Johnson",
        duration: "12 Weeks",
        level: "Intermediate",
        description: "Introduction to machine learning algorithms and applications.",
        rating: 4.6,
        reviews: 72,
        price: "Kshs 42,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" // Machine learning
    },
    {
        id: "course14",
        title: "Business Strategy",
        instructor: "Michael Chen",
        duration: "8 Weeks",
        level: "Advanced",
        description: "Develop strategic thinking and business planning skills.",
        rating: 4.9,
        reviews: 86,
        price: "Kshs 34,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80" // Strategy
    },
    {
        id: "course15",
        title: "Cloud Computing",
        instructor: "David Rodriguez",
        duration: "10 Weeks",
        level: "Intermediate",
        description: "Master cloud platforms and services for modern applications.",
        rating: 4.7,
        reviews: 79,
        price: "Kshs 46,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" // Cloud
    },
    {
        id: "course16",
        title: "Agile Project Management",
        instructor: "Emily Wilson",
        duration: "6 Weeks",
        level: "Beginner",
        description: "Learn agile methodologies and project management tools.",
        rating: 4.5,
        reviews: 91,
        price: "Kshs 26,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" // Agile
    },
    {
        id: "course17",
        title: "Blockchain Development",
        instructor: "Sarah Johnson",
        duration: "12 Weeks",
        level: "Advanced",
        description: "Build decentralized applications using blockchain technology.",
        rating: 4.8,
        reviews: 65,
        price: "Kshs 52,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" // Blockchain
    },
    {
        id: "course18",
        title: "Data Visualization",
        instructor: "Michael Chen",
        duration: "8 Weeks",
        level: "Intermediate",
        description: "Create compelling data visualizations and dashboards.",
        rating: 4.6,
        reviews: 84,
        price: "Kshs 32,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" // Data viz
    },
    // Page 4 Courses
    {
        id: "course19",
        title: "Software Testing",
        instructor: "David Rodriguez",
        duration: "8 Weeks",
        level: "Beginner",
        description: "Master software testing methodologies and tools.",
        rating: 4.4,
        reviews: 77,
        price: "Kshs 28,000",
        category: "technical",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" // Software testing
    },
    {
        id: "course20",
        title: "Business Communication",
        instructor: "Emily Wilson",
        duration: "6 Weeks",
        level: "Beginner",
        description: "Enhance your professional communication skills.",
        rating: 4.7,
        reviews: 89,
        price: "Kshs 24,000",
        category: "business",
        image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80" // Communication
    }
];

// Configuration
const coursesPerPage = 15;
let currentPage = 1;
let filteredCourses = [...allCourses];

// DOM Elements
const coursesGrid = document.querySelector('.courses-grid');
const paginationContainer = document.querySelector('.pagination');
const searchInput = document.querySelector('.search-box input');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const courseDetailsModal = document.querySelector('.course-details-modal');
const modalContent = document.querySelector('.course-details-content');
const closeModal = document.querySelector('.close-modal');

// Create course card
function createCourseCard(course) {
    return `
        <div class="course-card" data-category="${course.category.toLowerCase()}" data-level="${course.level.toLowerCase()}">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <span class="category-badge">${course.category}</span>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="instructor">Instructor: ${course.instructor}</p>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <p class="course-description">${course.description}</p>
            </div>
        </div>
    `;
}

// Display courses
function displayCourses(page) {
    const start = (page - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const coursesToShow = filteredCourses.slice(start, end);

    coursesGrid.innerHTML = coursesToShow.map(course => createCourseCard(course)).join('');
    updatePagination();
}

// Filter courses
function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value.toLowerCase();
    const level = levelFilter.value.toLowerCase();

    filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || course.category.toLowerCase() === category;
        const matchesLevel = level === 'all' || course.level.toLowerCase() === level;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    currentPage = 1;
    displayCourses(currentPage);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    let paginationHTML = '';

    if (totalPages > 1) {
        paginationHTML += `
            <a href="#" class="${currentPage === 1 ? 'disabled' : ''}" 
               onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </a>
        `;

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <a href="#" class="${currentPage === i ? 'active' : ''}" 
                   onclick="changePage(${i})">${i}</a>
            `;
        }

        paginationHTML += `
            <a href="#" class="${currentPage === totalPages ? 'disabled' : ''}" 
               onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
    }

    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredCourses.length / coursesPerPage)) return;
    currentPage = page;
    displayCourses(currentPage);
}

// Event listeners
searchInput.addEventListener('input', filterCourses);
categoryFilter.addEventListener('change', filterCourses);
levelFilter.addEventListener('change', filterCourses);

// Initialize
displayCourses(1); 