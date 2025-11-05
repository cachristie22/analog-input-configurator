// Content data - This will be loaded from content.json
let sections = [];
let currentSectionIndex = 0;

// Initialize the application
async function init() {
    try {
        const response = await fetch('content_updated.json');
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

        // Add main section lists
        if (section.lists && section.lists.length > 0) {
            section.lists.forEach(list => {
                sectionContent += '<div class="content-list"><ul>';
                list.forEach(item => {
                    sectionContent += `<li>${escapeHtml(item)}</li>`;
                });
                sectionContent += '</ul></div>';
            });
        }

        // Add main section tables
        if (section.tables && section.tables.length > 0) {
            section.tables.forEach(table => {
                sectionContent += renderTable(table);
            });
        }

        // Add main section images
        if (section.images && section.images.length > 0) {
            section.images.forEach(image => {
                sectionContent += `<div class="image-container"><img src="${image.url}" class="content-image" alt="${escapeHtml(image.alt)}" /></div>`;
            });
        }

        // Add subsections
        if (section.subsections && section.subsections.length > 0) {
            section.subsections.forEach(subsection => {
                sectionContent += `<h2>${escapeHtml(subsection.title)}</h2>`;
                
                // Subsection content
                if (subsection.content && subsection.content.length > 0) {
                    subsection.content.forEach(paragraph => {
                        sectionContent += `<p>${escapeHtml(paragraph)}</p>`;
                    });
                }

                // Subsection lists
                if (subsection.lists && subsection.lists.length > 0) {
                    subsection.lists.forEach(list => {
                        sectionContent += '<div class="content-list"><ul>';
                        list.forEach(item => {
                            sectionContent += `<li>${escapeHtml(item)}</li>`;
                        });
                        sectionContent += '</ul></div>';
                    });
                }

                // Subsection tables
                if (subsection.tables && subsection.tables.length > 0) {
                    subsection.tables.forEach(table => {
                        sectionContent += renderTable(table);
                    });
                }

                // Subsection images
                if (subsection.images && subsection.images.length > 0) {
                    subsection.images.forEach(image => {
                        sectionContent += `<div class="image-container"><img src="${image.url}" class="content-image" alt="${escapeHtml(image.alt)}" /></div>`;
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

// Render a table
function renderTable(tableData) {
    if (!tableData || tableData.length === 0) return '';
    
    let tableHTML = '<table class="content-table">';
    
    // First row as header
    if (tableData.length > 0) {
        tableHTML += '<thead><tr>';
        tableData[0].forEach(cell => {
            tableHTML += `<th>${escapeHtml(cell)}</th>`;
        });
        tableHTML += '</tr></thead>';
    }
    
    // Rest as body
    if (tableData.length > 1) {
        tableHTML += '<tbody>';
        for (let i = 1; i < tableData.length; i++) {
            tableHTML += '<tr>';
            tableData[i].forEach(cell => {
                tableHTML += `<td>${escapeHtml(cell)}</td>`;
            });
            tableHTML += '</tr>';
        }
        tableHTML += '</tbody>';
    }
    
    tableHTML += '</table>';
    return tableHTML;
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

        // Search in section lists
        if (section.lists) {
            section.lists.forEach(list => {
                list.forEach(item => {
                    if (item.toLowerCase().includes(query)) {
                        const excerpt = item.length > 150 ? item.substring(0, 150) + '...' : item;
                        results.push({
                            sectionIndex,
                            title: section.title,
                            excerpt,
                            matchType: 'list'
                        });
                    }
                });
            });
        }

        // Search in section tables
        if (section.tables) {
            section.tables.forEach(table => {
                table.forEach(row => {
                    row.forEach(cell => {
                        if (cell.toLowerCase().includes(query)) {
                            const excerpt = cell.length > 150 ? cell.substring(0, 150) + '...' : cell;
                            results.push({
                                sectionIndex,
                                title: section.title,
                                excerpt,
                                matchType: 'table'
                            });
                        }
                    });
                });
            });
        }

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

            // Search in subsection lists
            if (subsection.lists) {
                subsection.lists.forEach(list => {
                    list.forEach(item => {
                        if (item.toLowerCase().includes(query)) {
                            const excerpt = item.length > 150 ? item.substring(0, 150) + '...' : item;
                            results.push({
                                sectionIndex,
                                title: `${section.title} - ${subsection.title}`,
                                excerpt,
                                matchType: 'list'
                            });
                        }
                    });
                });
            }

            // Search in subsection tables
            if (subsection.tables) {
                subsection.tables.forEach(table => {
                    table.forEach(row => {
                        row.forEach(cell => {
                            if (cell.toLowerCase().includes(query)) {
                                const excerpt = cell.length > 150 ? cell.substring(0, 150) + '...' : cell;
                                results.push({
                                    sectionIndex,
                                    title: `${section.title} - ${subsection.title}`,
                                    excerpt,
                                    matchType: 'table'
                                });
                            }
                        });
                    });
                });
            }
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
