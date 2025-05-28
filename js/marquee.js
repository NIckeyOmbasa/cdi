// Marquee data
const marqueeNews = [
    "       🎓 New Certification Program Launched - Enroll Now!    ",
    "       📅 Upcoming Workshop: Digital Marketing Essentials - Register Today   ",
    "       🏆 Congratulations to Our Latest Graduates!    ",
    "       🌟 Special Offer: 20% Off on All Business Courses    ",
    "       📢 New Partnership with Industry Leaders Announced    "
];

// Function to create and update marquee content
function initializeMarquee() {
    const marqueeContainer = document.querySelector('.news-marquee');
    if (!marqueeContainer) return;

    // Create label if it doesn't exist
    let label = marqueeContainer.querySelector('.marquee-label');
    if (!label) {
        label = document.createElement('div');
        label.className = 'marquee-label';
        label.textContent = 'Latest News';
        marqueeContainer.appendChild(label);
    }

    // Create or update content
    let marqueeContent = marqueeContainer.querySelector('.marquee-content');
    if (!marqueeContent) {
        marqueeContent = document.createElement('div');
        marqueeContent.className = 'marquee-content';
        marqueeContainer.appendChild(marqueeContent);
    }
    
    // Create the news text
    const newsText = marqueeNews.join('     |    ');
    marqueeContent.textContent = newsText;
    
    // Clone the content for seamless scrolling
    const clone = marqueeContent.cloneNode(true);
    marqueeContainer.appendChild(clone);

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .news-marquee {
            white-space: nowrap;
            overflow: hidden;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 30s linear infinite;
            padding-right: 50px;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize marquee when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMarquee);

// Marquee functionality
document.addEventListener('DOMContentLoaded', function() {
    const marqueeContent = [
    "       🎓 New Certification Program Launched - Enroll Now!",
    "       📅 Upcoming Workshop: Digital Marketing Essentials - Register Today",
    "       🏆 Congratulations to Our Latest Graduates!",
    "       🌟 Special Offer: 20% Off on All Business Courses",
    "       📢 New Partnership with Industry Leaders Announced"
    ];

    const marqueeItems = document.querySelector('.marquee-items');
    
    // Clear existing static content
    marqueeItems.innerHTML = '';
    
    // Add items dynamically
    marqueeContent.forEach(content => {
        const span = document.createElement('span');
        span.textContent = content;
        marqueeItems.appendChild(span);
    });
});