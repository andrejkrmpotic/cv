// Global variables
let currentPanel = 1;
const totalPanels = 6;
let touchStartX = 0;
let touchStartY = 0;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTouchEvents();
    initializeKeyboardNavigation();
});

// Panel navigation functions
function openPanel(panelNumber) {
    currentPanel = panelNumber;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('panelCounter');
    
    modal.style.display = 'block';
    modalImg.src = `images/panel${panelNumber}.png`;
    modalImg.alt = `Comic Panel ${panelNumber}`;
    counter.textContent = `${panelNumber} / ${totalPanels}`;
    
    // Update panel details
    updatePanelDetails(panelNumber);
    
    // No bottom sheet logic needed
    document.body.style.overflow = 'hidden';

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextPanel() {
    if (currentPanel < totalPanels) {
        currentPanel++;
        updateModalContent();
    }
}

function previousPanel() {
    if (currentPanel > 1) {
        currentPanel--;
        updateModalContent();
    }
}

function updateModalContent() {
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('panelCounter');
    
    modalImg.src = `images/panel${currentPanel}.png`;
    modalImg.alt = `Comic Panel ${currentPanel}`;
    counter.textContent = `${currentPanel} / ${totalPanels}`;
}

// Contact functionality
function copyEmail() {
    const email = 'andrej.krmpotic@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        // Modern clipboard API
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(() => {
            fallbackCopyEmail(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyEmail(email);
    }
}

function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Email copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy email. Please copy manually: ' + email);
    }
    
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Touch event handling for mobile
function initializeTouchEvents() {
    const modal = document.getElementById('modal');
    
    modal.addEventListener('touchstart', handleTouchStart, { passive: true });
    modal.addEventListener('touchmove', handleTouchMove, { passive: true });
    modal.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    // Prevent default scrolling behavior in modal
    if (document.getElementById('modal').style.display === 'block') {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only process horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            previousPanel();
        } else {
            nextPanel();
        }
    }
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('modal');
        
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    previousPanel();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextPanel();
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeModal();
                    break;
            }
        }
    });
}

// Close modal when clicking outside the image
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Preload images for better performance
function preloadImages() {
    for (let i = 1; i <= totalPanels; i++) {
        const img = new Image();
        img.src = `images/panel${i}.png`;
    }
}

// Call preload when page loads
window.addEventListener('load', preloadImages);

// Handle resize events
window.addEventListener('resize', function() {
    // Adjust modal content on resize
    const modal = document.getElementById('modal');
    if (modal.style.display === 'block') {
        const modalImg = document.getElementById('modalImage');
        modalImg.style.maxHeight = '80vh';
    }
});

// Panel data with detailed information
const panelData = {
    1: {
        title: "Back-Office Beginnings (2012-2014)",
        company: "Siemens Healthineers",
        period: "2012-2014",
        description: "Starting career at Siemens Healthineers handling SAP systems, quotations, and customs clearance processes.",
        achievements: [
            "Mastered SAP ERP system for daily operations",
            "Handled international customs procedures and documentation",
            "Prepared monthly reports analyzing customer complaints and tracking the status of open orders.",
            "Developed foundational skills in ERP systems and international trade"
        ],
        skills: ["SAP", "Excel", "Quotations", "Customs Procedures"]
    },
    2: {
        title: "Customer Experience Champion (2014-2018)",
        company: "Tele2 Croatia",
        period: "2014-2018",
        description: "Testing mobile devices and managing service partners for optimal customer experience across major brands.",
        achievements: [
            "Managed three major service partners",
            "Created after-sales tool connecting POS systems with service partners",
            "Improved NPS scores through systematic process optimization",
            "Handled complex edge cases during service processes and device testing"
        ],
        skills: ["Vendor Management", "Customer Service", "Software Testing", "Process Optimization"]
    },
    3: {
        title: "Warehouse Builder (2018-2022)",
        company: "Telemach Hrvatska",
        period: "2018-2022",
        description: "Building internal warehouse operations from ground up and achieving significant error reduction in order processing.",
        achievements: [
            "Successfully transfered products from 3PL warehouse to internal operations",
            "Built comprehensive internal warehouse operations from ground up",
            "Achieved 45% reduction in order mistakes through order process improvements",
            "Created Power BI dashboards and master Excel databases using Power Query"
        ],
        skills: ["Power BI", "E-commerce", "Project Management", "Data Analytics", "Global Logistics", "International Trade"]
    },
    4: {
        title: "Team Builder Supreme (2023)",
        company: "Museum of Illusions",
        period: "2023",
        description: "Growing team from 2 to 8 professionals across multiple locations while establishing strong partnerships.",
        achievements: [
            "Grew team from 2 to 8 professionals (400% growth)",
            "Established team operations across two strategic locations",
            "Built strong supplier partnerships and vendor relationships",
        ],
        skills: ["Team Leadership", "Strategic Planning", "Supplier Management"]
    },
    5: {
        title: "Museum Network Commander (2023-2025)",
        company: "Museum of Illusions",
        period: "2023-2025",
        description: "Managing 24 global museum locations with massive inventory growth and risk reduction across three continents.",
        achievements: [
            "Established new U.S. warehouse operations and managed 800% inventory growth within one year",
            "Managed 150+ tons of exhibits with precise logistics across 24 global locations on three continents",
            "Implemented 40% supplier risk reduction strategies across operations",
            "Coordinated complex supply chains across multiple time zones"
        ],
        skills: ["Global Logistics", "Risk Management", "Inventory Optimization", "Strategic Planning"]
    },
    6: {
        title: "Multi-Industry AI Strategist (Future/Consulting)",
        company: "Coming soon...",
        period: "Future/Consulting",
        description: "Leveraging AI and experience to optimize processes across multiple industries and business sectors.",
        achievements: [
            "Developing comprehensive AI integration strategies for various industries",
            "Cross-industry process optimization using AI",
            "Specialized app/website prototyping and deployment",
            "AI adoption consulting for leveling up your company"
        ],
        skills: ["AI Integration", "Supply Chain Optimization", "Cross-Industry Consulting", "Strategic Innovation"]
    }
};

// Update the openPanel function
// function openPanel(panelNumber) {
//     currentPanel = panelNumber;
//     const modal = document.getElementById('modal');
//     const modalImg = document.getElementById('modalImage');
//     const counter = document.getElementById('panelCounter');
    
//     modal.style.display = 'block';
//     modalImg.src = `images/panel${panelNumber}.png`;
//     modalImg.alt = `Comic Panel ${panelNumber}`;
//     counter.textContent = `${panelNumber} / ${totalPanels}`;
    
//     Update panel details

//     updatePanelDetails(panelNumber);
    
//     Reset mobile details position

//     const detailsSection = document.querySelector('.modal-details-section');
//     detailsSection.classList.remove('show');
    
//     document.body.style.overflow = 'hidden';
// }

// Update the openPanel function NEW
function openPanel(panelNumber) {
    currentPanel = panelNumber;
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('panelCounter');
    
    modal.style.display = 'block';
    modalImg.src = `images/panel${panelNumber}.png`;  // PNG format works!
    modalImg.alt = `Comic Panel ${panelNumber}`;
    counter.textContent = `${panelNumber} / ${totalPanels}`;
    
    // This is crucial - update the details panel
    updatePanelDetails(panelNumber);
    
    // Handle mobile details visibility
    const detailsSection = document.querySelector('.modal-details-section');
    const toggleBtn = document.getElementById('toggleDetails');
    
    // On mobile, show toggle button
    if (window.innerWidth <= 768) {
        if (toggleBtn) {
            toggleBtn.style.display = 'block';
            toggleBtn.textContent = '📋 View Details';
        }
        detailsSection.classList.remove('show');
    }
    
    document.body.style.overflow = 'hidden';
}

// Update panel details function
function updatePanelDetails(panelNumber) {
    const data = panelData[panelNumber];
    
    document.getElementById('panelTitle').textContent = data.title;
    document.getElementById('companyName').textContent = data.company;
    document.getElementById('timePeriod').textContent = data.period;
    document.getElementById('panelDescription').textContent = data.description;
    
    // Update achievements
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    data.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
    
    // Update skills
    const skillsTags = document.getElementById('skillsTags');
    skillsTags.innerHTML = '';
    data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag-modal';
        span.textContent = skill;
        skillsTags.appendChild(span);
    });
}

// Update the updateModalContent function
function updateModalContent() {
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('panelCounter');
    
    modalImg.src = `images/panel${currentPanel}.png`;
    modalImg.alt = `Comic Panel ${currentPanel}`;
    counter.textContent = `${currentPanel} / ${totalPanels}`;
    
    // Update panel details
    updatePanelDetails(currentPanel);
}

// Toggle panel details for mobile
function togglePanelDetails() {
    const detailsSection = document.querySelector('.modal-details-section');
    const toggleBtn = document.getElementById('toggleDetails');
    
    detailsSection.classList.toggle('show');
    
    if (detailsSection.classList.contains('show')) {
        toggleBtn.textContent = '📋 Hide Details';
    } else {
        toggleBtn.textContent = '📋 View Details';
    }
}
