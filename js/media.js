document.addEventListener('DOMContentLoaded', function() {
    const selectorBtns = document.querySelectorAll('.selector-btn');
    
    selectorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            selectorBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.querySelector('.news-grid');
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevButton = document.querySelector('.pagination-btn.prev');
    const nextButton = document.querySelector('.pagination-btn.next');
    const cardsPerPage = 6;
    let currentPage = 1;

    // Sample news data - replace this with your actual news data
    const newsData = [
        {
            title: "New Certification Program Launched",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
            date: "March 15, 2024",
            author: "Admin",
            excerpt: "We are excited to announce the launch of our new certification program in Digital Marketing. This comprehensive program covers all aspects of modern digital marketing strategies."
        },
        {
            title: "CDI Accredited by NITA",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
            date: "March 10, 2024",
            author: "Admin",
            excerpt: "We are thrilled to announce a major milestone in our journey of excellence—our official registration with the National Industrial Training Authority (NITA) Kenya! This achievement marks a new era for our training institute, solidifying our commitment to providing top-tier, industry-recognized programs that empower individuals and businesses with cutting-edge skills. As a NITA-accredited institution, we are now positioned to offer certified courses that meet the highest standards of professional development, ensuring our students receive training that is both credible and impactful.<br>This accreditation is not just a recognition; it is a testament to our dedication to quality education and skill development. Our expert trainers, well-structured curricula, and hands-on learning approach will continue to shape the futures of countless professionals across various industries. With this registration, we are able to offer our learners the opportunity to access training that is not only compliant with industry regulations but also eligible for employer training reimbursements under NITA guidelines. This means more accessible, affordable, and high-quality education for all! <br>We extend our deepest gratitude to our staff, students, and stakeholders who have supported us on this journey. Your trust and commitment have been the driving force behind our success, and we are excited for what lies ahead. We invite you to join us in celebrating this achievement and to explore the new possibilities that come with our NITA-approved courses. Together, we will continue to shape a skilled and empowered workforce for Kenya's future. Stay tuned for exciting programs, workshops, and training opportunities that will take your career to the next level!"
        },
        {
            title: "New Partnership Announcement",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
            date: "March 5, 2024",
            author: "Admin",
            excerpt: "We are proud to announce our new partnership with leading industry players to enhance our training programs and provide better opportunities for our students."
        },
        {
            title: "Student Success Story",
            image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80",
            date: "March 1, 2024",
            author: "Admin",
            excerpt: "Read about how our Data Analysis course helped John Doe secure a position at a leading tech company. His journey from student to professional is truly inspiring."
        },
        {
            title: "Upcoming Workshop",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
            date: "February 28, 2024",
            author: "Admin",
            excerpt: "Join our upcoming workshop on Project Management Fundamentals. Learn essential skills from industry experts and enhance your career prospects."
        },
        {
            title: "New Course Launch",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
            date: "February 25, 2024",
            author: "Admin",
            excerpt: "We are launching a new course in Business Analytics. This course will equip students with the skills needed to analyze and interpret business data effectively."
        },
        {
            title: "Alumni Meetup",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
            date: "February 20, 2024",
            author: "Admin",
            excerpt: "Our annual alumni meetup was a great success! Graduates from various programs came together to share their experiences and network with industry professionals."
        },
        {
            title: "Faculty Development Program",
            image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80",
            date: "February 15, 2024",
            author: "Admin",
            excerpt: "Our faculty members recently completed an intensive development program to enhance their teaching methodologies and stay updated with industry trends."
        }
    ];

    // Function to create news cards
    function createNewsCards() {
        newsGrid.innerHTML = ''; // Clear existing cards
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const currentPageCards = newsData.slice(start, end);

        currentPageCards.forEach(news => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span><i class="far fa-calendar"></i> ${news.date}</span>
                        <span><i class="far fa-user"></i> ${news.author}</span>
                    </div>
                    <h3>${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <button class="read-more">Read More</button>
                </div>
            `;
            newsGrid.appendChild(card);
        });

        // Initialize read more buttons for new cards
        initReadMoreButtons();
    }

    // Function to update pagination
    function updatePagination() {
        const totalPages = Math.ceil(newsData.length / cardsPerPage);
        paginationNumbers.innerHTML = '';
        
        // Previous button state
        prevButton.disabled = currentPage === 1;
        
        // Next button state
        nextButton.disabled = currentPage === totalPages;

        // Always show first page
        addPageNumber(1);
        
        if (currentPage > 3) {
            paginationNumbers.innerHTML += '<span class="pagination-ellipsis">...</span>';
        }
        
        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            addPageNumber(i);
        }
        
        if (currentPage < totalPages - 2) {
            paginationNumbers.innerHTML += '<span class="pagination-ellipsis">...</span>';
        }
        
        // Always show last page if there's more than one page
        if (totalPages > 1) {
            addPageNumber(totalPages);
        }
    }

    // Function to add page number button
    function addPageNumber(pageNum) {
        const pageButton = document.createElement('button');
        pageButton.textContent = pageNum;
        pageButton.classList.add('pagination-number');
        if (pageNum === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = pageNum;
            createNewsCards();
            updatePagination();
        });
        paginationNumbers.appendChild(pageButton);
    }

    // Event listeners for pagination buttons
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createNewsCards();
            updatePagination();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(newsData.length / cardsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            createNewsCards();
            updatePagination();
        }
    });

    // Function to initialize read more buttons
    function initReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.read-more');
        const expandedNews = document.querySelector('.expanded-news');

        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newsCard = button.closest('.news-card');
                const newsData = {
                    title: newsCard.querySelector('h3').textContent,
                    image: newsCard.querySelector('.news-image img').src,
                    date: newsCard.querySelector('.news-meta span:first-child').textContent,
                    author: newsCard.querySelector('.news-meta span:last-child').textContent,
                    excerpt: newsCard.querySelector('.news-excerpt').textContent
                };

                // Update expanded news content
                const expandedContent = expandedNews.querySelector('.expanded-news-content');
                expandedContent.innerHTML = `
                    <button class="close-expanded-news" aria-label="Close expanded news">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="expanded-news-header">
                        <img src="${newsData.image}" alt="${newsData.title}">
                        <div class="expanded-news-title">
                            <h2>${newsData.title}</h2>
                            <div class="expanded-news-meta">
                                <span><i class="far fa-calendar"></i> ${newsData.date}</span>
                                <span><i class="far fa-user"></i> ${newsData.author}</span>
                            </div>
                        </div>
                    </div>
                    <div class="expanded-news-body">
                        <p>${newsData.excerpt}</p>
                    </div>
                `;

                // Show expanded news
                expandedNews.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Add event listener to close button
                const closeButton = expandedContent.querySelector('.close-expanded-news');
                closeButton.addEventListener('click', closeExpandedNews);
            });
        });

        // Close expanded news when clicking outside
        expandedNews.addEventListener('click', (e) => {
            if (e.target === expandedNews) {
                closeExpandedNews();
            }
        });

        // Close expanded news when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && expandedNews.classList.contains('active')) {
                closeExpandedNews();
            }
        });
    }

    function closeExpandedNews() {
        const expandedNews = document.querySelector('.expanded-news');
        expandedNews.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Initialize the news section
    createNewsCards();
    updatePagination();
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
