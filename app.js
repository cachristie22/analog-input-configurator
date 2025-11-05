// Content data - This will be loaded from content.json
let sections = [];
let currentSectionIndex = 0;

// Initialize the application
async function init() {
    try {
        const response = await fetch('content.json');
        sections = await response.json();
        renderNavigation();
        renderContent();
        setupSearch();
        setupNavigation();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Render sidebar navigation
function renderNavigation() {
    const sidebar = document.getElementById('sidebar');
    let navHTML = '';

    sections.forEach((section, index) => {
        const activeClass = index === 0 ? 'active' : '';
        navHTML += `
            <div class="nav-section ${activeClass}" data-index="${index}" onclick="navigateToSection(${index})">
                ${section.title}
            </div>
        `;
        
        if (section.subsections && section.subsections.length > 0) {
            section.subsections.forEach(subsection => {
                navHTML += `
                    <div class="nav-subsection" onclick="navigateToSection(${index})">
                        ${subsection.title}
                    </div>
                `;
            });
        }
    });

    sidebar.innerHTML = navHTML;
}

// Render main content
function renderContent() {
    const mainContent = document.getElementById('mainContent');
    let contentHTML = '';

    sections.forEach((section, index) => {
        const activeClass = index === 0 ? 'active' : '';
        let sectionContent = '';

        // Add main section content
        if (section.content && section.content.length > 0) {
            section.content.forEach(paragraph => {
                sectionContent += `<p>${escapeHtml(paragraph)}</p>`;
            });
        }

        // Add subsections
        if (section.subsections && section.subsections.length > 0) {
            section.subsections.forEach(subsection => {
                sectionContent += `<h2>${escapeHtml(subsection.title)}</h2>`;
                if (subsection.content && subsection.content.length > 0) {
                    subsection.content.forEach(paragraph => {
                        sectionContent += `<p>${escapeHtml(paragraph)}</p>`;
                    });
                }
            });
        }

        contentHTML += `
            <div class="content-section ${activeClass}" data-index="${index}">
                <h1>${escapeHtml(section.title)}</h1>
                ${sectionContent}
                <div class="nav-buttons">
                    <button class="nav-button" onclick="previousSection()" ${index === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="nav-button" onclick="nextSection()" ${index === sections.length - 1 ? 'disabled' : ''}>
                        Next →
                    </button>
                </div>
            </div>
        `;
    });

    mainContent.innerHTML = contentHTML;
}

// Navigate to specific section
function navigateToSection(index) {
    if (index < 0 || index >= sections.length) return;

    currentSectionIndex = index;

    // Update active states in sidebar
    document.querySelectorAll('.nav-section').forEach((el, i) => {
        if (i === index) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // Update active content section
    document.querySelectorAll('.content-section').forEach((el, i) => {
        if (i === index) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation functions
function nextSection() {
    if (currentSectionIndex < sections.length - 1) {
        navigateToSection(currentSectionIndex + 1);
    }
}

function previousSection() {
    if (currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
    }
}

// Setup keyboard navigation
function setupNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSectionIndex < sections.length - 1) {
            nextSection();
        } else if (e.key === 'ArrowLeft' && currentSectionIndex > 0) {
            previousSection();
        }
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const results = [];

    sections.forEach((section, sectionIndex) => {
        // Search in section title
        if (section.title.toLowerCase().includes(query)) {
            results.push({
                sectionIndex,
                title: section.title,
                excerpt: section.content[0] || '',
                matchType: 'title'
            });
        }

        // Search in section content
        section.content.forEach(paragraph => {
            if (paragraph.toLowerCase().includes(query)) {
                const excerptStart = Math.max(0, paragraph.toLowerCase().indexOf(query) - 50);
                const excerptEnd = Math.min(paragraph.length, excerptStart + 150);
                const excerpt = (excerptStart > 0 ? '...' : '') + 
                               paragraph.substring(excerptStart, excerptEnd) + 
                               (excerptEnd < paragraph.length ? '...' : '');
                
                results.push({
                    sectionIndex,
                    title: section.title,
                    excerpt,
                    matchType: 'content'
                });
            }
        });

        // Search in subsections
        section.subsections.forEach(subsection => {
            if (subsection.title.toLowerCase().includes(query)) {
                results.push({
                    sectionIndex,
                    title: `${section.title} - ${subsection.title}`,
                    excerpt: subsection.content[0] || '',
                    matchType: 'subsection'
                });
            }

            subsection.content.forEach(paragraph => {
                if (paragraph.toLowerCase().includes(query)) {
                    const excerptStart = Math.max(0, paragraph.toLowerCase().indexOf(query) - 50);
                    const excerptEnd = Math.min(paragraph.length, excerptStart + 150);
                    const excerpt = (excerptStart > 0 ? '...' : '') + 
                                   paragraph.substring(excerptStart, excerptEnd) + 
                                   (excerptEnd < paragraph.length ? '...' : '');
                    
                    results.push({
                        sectionIndex,
                        title: `${section.title} - ${subsection.title}`,
                        excerpt,
                        matchType: 'content'
                    });
                }
            });
        });
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        searchResults.classList.add('active');
        return;
    }

    // Limit to top 10 results
    const topResults = results.slice(0, 10);
    
    const resultsHTML = topResults.map(result => {
        const highlightedExcerpt = highlightQuery(result.excerpt, query);
        return `
            <div class="search-result-item" onclick="navigateToSection(${result.sectionIndex})">
                <div class="search-result-title">${escapeHtml(result.title)}</div>
                <div class="search-result-excerpt">${highlightedExcerpt}</div>
            </div>
        `;
    }).join('');

    searchResults.innerHTML = resultsHTML;
    searchResults.classList.add('active');
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<span class="highlight">$1</span>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
