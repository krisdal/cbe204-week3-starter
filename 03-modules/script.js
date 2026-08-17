// data.js - Student data
const students = [
    {
        id: 101,
        name: "Alice Johnson",
        program: "Cybersecurity Engineering",
        year: 2,
        age: 20,
        gpa: 3.85,
        interests: [
            "Web Security",
            "AI",
            "Cloud"
        ],
        contact: {
            email: "alice@g.swu.ac.th",
            phone: "555-0101",
            address: "123 Main St"
        },
        courses: [
            "CBE101",
            "CBE102",
            "CBE103"
        ],
        academic_record: {
            semester: "Spring 2024",
            grades: {
                "CBE101": "A",
                "CBE102": "A-",
                "CBE103": "B+"
            },
            credits_completed: 45
        }
    },
    {
        id: 102,
        name: "Bob Smith",
        program: "Cybersecurity Engineering",
        year: 2,
        age: 21,
        gpa: 3.72,
        interests: [
            "Network Security",
            "Database",
            "Cloud"
        ],
        contact: {
            email: "bob@g.swu.ac.th",
            phone: "555-0102",
            address: "456 Oak Ave"
        },
        courses: [
            "CBE101",
            "CBE102",
            "CBE104"
        ],
        academic_record: {
            semester: "Spring 2024",
            grades: {
                "CBE101": "A-",
                "CBE102": "B+",
                "CBE104": "A"
            },
            credits_completed: 45
        }
    },
    {
        id: 103,
        name: "Charlie Davis",
        program: "Cybersecurity Engineering",
        year: 3,
        age: 22,
        gpa: 3.91,
        interests: [
            "Host Security",
            "IoT",
            "Mobile Security"
        ],
        contact: {
            email: "charlie@g.swu.ac.th",
            phone: "555-0103",
            address: "789 Pine Rd"
        },
        courses: [
            "CBE201",
            "CBE202",
            "CBE203"
        ],
        academic_record: {
            semester: "Spring 2024",
            grades: {
                "CBE201": "A",
                "CBE202": "A",
                "CBE203": "A-"
            },
            credits_completed: 90
        }
    },
    {
        id: 104,
        name: "Diana Martinez",
        program: "Cybersecurity Engineering",
        year: 1,
        age: 19,
        gpa: 3.65,
        interests: [
            "Cryptography",
            "Ethical Hacking",
            "Forensics"
        ],
        contact: {
            email: "diana@g.swu.ac.th",
            phone: "555-0104",
            address: "321 Elm Street"
        },
        courses: [
            "CBE101",
            "CBE105",
            "MATH101"
        ],
        academic_record: {
            semester: "Spring 2024",
            grades: {
                "CBE101": "B+",
                "CBE105": "A-",
                "MATH101": "B"
            },
            credits_completed: 12
        }
    }
];

// UI rendering functions
function createStudentCard(student) {
    return `
        <div class="student-card">
            <div class="card-header">
                <h3>${student.name}</h3>
                <span class="id-badge">ID: ${student.id}</span>
            </div>
            <div class="card-body">
                <div class="info-group">
                    <label>Program:</label>
                    <p>${student.program}</p>
                </div>
                <div class="info-group">
                    <label>Year:</label>
                    <p>${student.year}</p>
                </div>
                <div class="info-group">
                    <label>Age:</label>
                    <p>${student.age}</p>
                </div>
                <div class="info-group">
                    <label>GPA:</label>
                    <p>${student.gpa}</p>
                </div>
                <div class="info-group">
                    <label>Interests:</label>
                    <p>${student.interests.join(", ")}</p>
                </div>
                <div class="info-group">
                    <label>Courses:</label>
                    <p>${student.courses.join(", ")}</p>
                </div>
                <div class="info-group">
                    <label>Contact Email:</label>
                    <p><a href="mailto:${student.contact.email}">${student.contact.email}</a></p>
                </div>
                <div class="info-group">
                    <label>Phone:</label>
                    <p>${student.contact.phone}</p>
                </div>
                <div class="info-group">
                    <label>Address:</label>
                    <p>${student.contact.address}</p>
                </div>
                <div class="info-group">
                    <label>Semester:</label>
                    <p>${student.academic_record.semester}</p>
                </div>
                <div class="info-group">
                    <label>Credits Completed:</label>
                    <p>${student.academic_record.credits_completed}</p>
                </div>
                <div class="info-group">
                    <label>Grades:</label>
                    <div class="grades-list">
                        ${Object.entries(student.academic_record.grades).map(([course, grade]) =>
        `<span class="grade-item">${course}: <strong>${grade}</strong></span>`
    ).join("")}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayStudents(studentsList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    const html = studentsList.map(student => createStudentCard(student)).join("");
    container.innerHTML = html;
}

function displayStudentStats(studentsList, statsId) {
    const statsContainer = document.getElementById(statsId);
    if (!statsContainer) {
        console.error(`Stats container with id "${statsId}" not found`);
        return;
    }

    const totalStudents = studentsList.length;
    const avgGPA = (studentsList.reduce((sum, s) => sum + s.gpa, 0) / totalStudents).toFixed(2);
    const avgAge = (studentsList.reduce((sum, s) => sum + s.age, 0) / totalStudents).toFixed(1);

    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>Total Students</h4>
                <p class="stat-value">${totalStudents}</p>
            </div>
            <div class="stat-card">
                <h4>Average GPA</h4>
                <p class="stat-value">${avgGPA}</p>
            </div>
            <div class="stat-card">
                <h4>Average Age</h4>
                <p class="stat-value">${avgAge}</p>
            </div>
        </div>
    `;

    statsContainer.innerHTML = statsHTML;
}

function populateStudentDropdown(studentsList, selectId) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.error(`Select element with id "${selectId}" not found`);
        return;
    }

    studentsList.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (ID: ${student.id})`;
        selectElement.appendChild(option);
    });
}

function displayStudentById(studentsList, studentId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    if (!studentId) {
        // If no ID provided, display all students
        displayStudents(studentsList, containerId);
        return;
    }

    const student = studentsList.find(s => s.id == studentId);
    if (!student) {
        container.innerHTML = '<p>Student not found.</p>';
        return;
    }

    const html = createStudentCard(student);
    container.innerHTML = html;
}

// Main application logic
document.addEventListener('DOMContentLoaded', function () {
    // Display student statistics
    displayStudentStats(students, 'stats-container');

    // Display all students
    displayStudents(students, 'students-container');

    // Populate dropdown with students
    populateStudentDropdown(students, 'student-select');

    // Add event listener to dropdown
    const studentSelect = document.getElementById('student-select');
    studentSelect.addEventListener('change', function () {
        const selectedId = this.value;
        displayStudentById(students, selectedId, 'students-container');
    });
});
