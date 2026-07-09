// DOM Elements
const navbar = document.querySelector('.navbar');
const progressItems = document.querySelectorAll('.progress-item');
const sections = document.querySelectorAll('section');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal Animations on Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Page Progress Indicator Logic
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the index of the current section relative to all sections
            const index = Array.from(sections).indexOf(entry.target);
            
            // Remove active class from all progress items
            progressItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to corresponding progress item (if it exists)
            if (progressItems[index]) {
                progressItems[index].classList.add('active');
            }
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Click to Scroll Logic for Timeline
progressItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    });
    // Add pointer cursor style directly or via CSS
    item.style.cursor = 'pointer';
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hamburger Animation (Optional: turn into X)
        hamburger.classList.toggle('toggle');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// ==========================================
// DARK / LIGHT THEME TOGGLE
// ==========================================
const initThemeToggle = () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeToggleBtn, currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggleBtn, newTheme);
    });
};

const updateThemeIcon = (btn, theme) => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
};

// ==========================================
// FAQ ACCORDION INTERACTIVITY
// ==========================================
const initFaqAccordion = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Toggle active class on current item
            item.classList.toggle('active');
            
            // Optional: Close other FAQs (Accordion effect)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
};

// Initialize new functionalities
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initFaqAccordion();
});