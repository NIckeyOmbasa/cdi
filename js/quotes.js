// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to fetch and display quote
async function fetchAndDisplayQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data || !data[0] || !data[0].q || !data[0].a) {
            throw new Error('Invalid quote data received');
        }

        const quoteText = document.querySelector('.quote-text');
        const quoteAuthor = document.querySelector('.quote-author');
        const currentDate = document.querySelector('.current-date');
        
        if (!quoteText || !quoteAuthor || !currentDate) {
            throw new Error('Quote elements not found in DOM');
        }
        
        // Update quote content
        quoteText.textContent = data[0].q;
        quoteAuthor.textContent = `- ${data[0].a}`;
        currentDate.textContent = formatDate(new Date());
        
        // Store the quote and date in localStorage
        localStorage.setItem('lastQuote', JSON.stringify({
            quote: data[0].q,
            author: data[0].a,
            date: new Date().toDateString()
        }));
    } catch (error) {
        console.error('Error fetching quote:', error);
        const quoteText = document.querySelector('.quote-text');
        const quoteAuthor = document.querySelector('.quote-author');
        const currentDate = document.querySelector('.current-date');
        
        if (quoteText) {
            quoteText.textContent = 'The best way to predict the future is to create it.';
        }
        if (quoteAuthor) {
            quoteAuthor.textContent = '- Abraham Lincoln';
        }
        if (currentDate) {
            currentDate.textContent = formatDate(new Date());
        }
    }
}

// Function to check if we need to fetch a new quote
function checkAndUpdateQuote() {
    try {
        const lastQuote = localStorage.getItem('lastQuote');
        const today = new Date().toDateString();
        
        if (!lastQuote || JSON.parse(lastQuote).date !== today) {
            fetchAndDisplayQuote();
        } else {
            // Display the stored quote
            const storedQuote = JSON.parse(lastQuote);
            const quoteText = document.querySelector('.quote-text');
            const quoteAuthor = document.querySelector('.quote-author');
            const currentDate = document.querySelector('.current-date');
            
            if (quoteText && quoteAuthor && currentDate) {
                quoteText.textContent = storedQuote.quote;
                quoteAuthor.textContent = `- ${storedQuote.author}`;
                currentDate.textContent = formatDate(new Date());
            }
        }
    } catch (error) {
        console.error('Error checking/updating quote:', error);
        fetchAndDisplayQuote(); // Try to fetch a new quote if there's an error
    }
}

// Initialize quotes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date
    const currentDate = document.querySelector('.current-date');
    if (currentDate) {
        currentDate.textContent = formatDate(new Date());
    }
    // Then check and update quote
    checkAndUpdateQuote();
}); 