// main.js - Student Directory Application

let allStudents = [];

// Fetch students data from JSON file
function loadStudents() {
    const loadingDiv = document.getElementById('loading');
    const errorContainer = document.getElementById('error-container');

    fetch('data/students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allStudents = data;
            loadingDiv.style.display = 'none';
            displayStudents(allStudents);
            updateResultsCount(allStudents.length, allStudents.length);
        })
        .catch(error => {
            console.error('Error loading students:', error);
            loadingDiv.style.display = 'none';
            errorContainer.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> Failed to load student data. Please try again later.
                </div>
            `;
        });
}

// Display students in the container
function displayStudents(students) {
    const container = document.getElementById('students-container');
    const noResults = document.getElementById('no-results');

    if (students.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    noResults.style.display = 'none';

    // Modify this code to such that For each student card, make sure to display
    // program, year, age, email, interests

    container.innerHTML = students.map(student => `
        <div class="student-item">
            <div class="student-header">
                <h3 class="student-name">${student.name}</h3>
                <span class="student-id">ID: ${student.id}</span>
            </div>
            <div class="student-body">
                <div class="info-row">
                    <span class="info-label">Program:</span>
                    <span class="info-value">${student.program}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Interests:</span>
                    <span class="info-value">${student.interests.join(', ')}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update results count display
function updateResultsCount(displayed, total) {
    const resultsCount = document.getElementById('results-count');
    if (displayed === total) {
        resultsCount.textContent = `Showing all ${total} students`;
    } else {
        resultsCount.textContent = `Found ${displayed} out of ${total} students`;
    }
}

// Search and filter students using filter()
function searchStudents() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedYear = document.getElementById('year-filter').value;

    // Use filter() to find matching students
    const filteredStudents = allStudents.filter(student => {
        // Search in name
        const nameMatch = student.name.toLowerCase().includes(searchTerm);

        // Search in email
        const emailMatch = student.contact.email.toLowerCase().includes(searchTerm);

        // Search in program
        const programMatch = student.program.toLowerCase().includes(searchTerm);

        // Search in interests
        const interestsMatch = student.interests.some(interest =>
            interest.toLowerCase().includes(searchTerm)
        );

        const yearMatch = !selectedYear || student.year === Number(selectedYear);

        // Return true if the search and year filters match
        return (!searchTerm || nameMatch || emailMatch || programMatch || interestsMatch) && yearMatch;
    });

    displayStudents(filteredStudents);
    updateResultsCount(filteredStudents.length, allStudents.length);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Load students when page loads
    loadStudents();

    // Search button click handler
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', searchStudents);

    // Year filter button click handler
    const yearFilterBtn = document.getElementById('year-filter-btn');
    yearFilterBtn.addEventListener('click', searchStudents);

    // Allow Enter key to trigger search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchStudents();
        }
    });

    // Real-time search as user types (optional - uncomment to enable)
    // searchInput.addEventListener('input', searchStudents);
});
