const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        category: "life"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "success"
    },
    {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        category: "wisdom"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        category: "motivation"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        category: "wisdom"
    },
    {
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
        category: "life"
    },
    {
        text: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost",
        category: "life"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt",
        category: "success"
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "motivation"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "success"
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
        category: "wisdom"
    },
    {
        text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        author: "Mother Teresa",
        category: "life"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "motivation"
    }
];

// DOM elements
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const tweetBtn = document.getElementById('tweetBtn');
const loader = document.getElementById('loader');
const quoteContainer = document.querySelector('.quote-container');
const categorySelect = document.getElementById('categorySelect');

// State variables
let currentQuote = null;
let filteredQuotes = [...quotes];
let isFirstLoad = true;

// Show loading animation
function showLoading() {
    loader.style.opacity = '1';
    loader.style.pointerEvents = 'auto';
    quoteContainer.style.opacity = '0.3';
}

// Hide loading animation
function hideLoading() {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    quoteContainer.style.opacity = '1';
}

// Get random quote from filtered list
function getRandomQuote() {
    if (filteredQuotes.length === 0) {
        quoteText.textContent = "No quotes found in this category. Try another one!";
        authorText.textContent = "";
        return;
    }

    showLoading();
    
    setTimeout(() => {
        let randomIndex;
        let newQuote;
        
        // Ensure we don't get the same quote twice in a row
        do {
            randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            newQuote = filteredQuotes[randomIndex];
        } while (currentQuote === newQuote && filteredQuotes.length > 1);
        
        currentQuote = newQuote;
        
        quoteText.textContent = currentQuote.text;
        authorText.textContent = `- ${currentQuote.author}`;
        
        // Add fade-in animation (reset and reapply)
        quoteContainer.style.animation = 'none';
        setTimeout(() => {
            quoteContainer.style.animation = 'fadeIn 0.5s ease-in';
        }, 50);
        
        hideLoading();
        
        // Mark first load as complete
        if (isFirstLoad) {
            isFirstLoad = false;
        }
    }, 500);
}

// Filter quotes by selected category
function filterQuotes() {
    const category = categorySelect.value;
    if (category === 'all') {
        filteredQuotes = [...quotes];
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === category);
    }
    
    getRandomQuote();
}

// Share quote on Twitter
function tweetQuote() {
    if (currentQuote) {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + currentQuote.text + '" - ' + currentQuote.author)}`;
        window.open(twitterUrl, '_blank');
    }
}

// Handle keyboard shortcuts
function handleKeyPress(event) {
    // Space bar for new quote
    if (event.code === 'Space' && !event.target.tagName.toLowerCase().match(/input|textarea|select/)) {
        event.preventDefault();
        getRandomQuote();
    }
    // Enter key to tweet (when not in form elements)
    if (event.code === 'Enter' && !event.target.tagName.toLowerCase().match(/input|textarea|select/)) {
        event.preventDefault();
        tweetQuote();
    }
}

// Initialize the application
function init() {
    // Add event listeners
    newQuoteBtn.addEventListener('click', getRandomQuote);
    tweetBtn.addEventListener('click', tweetQuote);
    categorySelect.addEventListener('change', filterQuotes);
    document.addEventListener('keydown', handleKeyPress);
    
    // Set initial quote
    getRandomQuote();
    
    // Add animation class to container
    quoteContainer.classList.add('fade-in');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

