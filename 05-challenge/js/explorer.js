// explorer.js - Security Finding Explorer

let allFindings = [];
let filteredFindings = [];

// Parse JSONL format (one JSON object per line)
function parseJsonl(text) {
    return text
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
            try {
                return JSON.parse(line);
            } catch (error) {
                console.error('Error parsing line:', line, error);
                return null;
            }
        })
        .filter(obj => obj !== null);
}

// Load findings from JSONL file
async function loadFindings() {
    const loadingDiv = document.getElementById('loading');
    const errorContainer = document.getElementById('error-container');

    try {
        const response = await fetch('data/findings_shot.jsonl');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        allFindings = parseJsonl(text);
        filteredFindings = [...allFindings];
        loadingDiv.style.display = 'none';

        populateFilterOptions();
        updateStats();
        displayFindings(filteredFindings);
    } catch (error) {
        console.error('Error loading findings:', error);
        loadingDiv.style.display = 'none';
        errorContainer.innerHTML = `
            <div class="error">
                <strong>Error:</strong> Failed to load security findings. ${error.message}
            </div>
        `;
    }
}

// Populate the finding type dropdown
function populateFilterOptions() {
    const typeFilter = document.getElementById('type-filter');
    const types = [...new Set(allFindings.map(f => f.finding_type))].sort();

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = formatFindingType(type);
        typeFilter.appendChild(option);
    });
}

// Format finding type for display
function formatFindingType(type) {
    return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Update statistics
function updateStats() {
    const statsContainer = document.getElementById('stats-container');
    const highCount = filteredFindings.filter(f => f.severity === 'high').length;
    const mediumCount = filteredFindings.filter(f => f.severity === 'medium').length;
    const lowCount = filteredFindings.filter(f => f.severity === 'low').length;

    statsContainer.innerHTML = `
        <div class="stat-box">
            <div class="label">Total Findings</div>
            <div class="value">${filteredFindings.length}</div>
        </div>
        <div class="stat-box">
            <div class="label">High Severity</div>
            <div class="value" style="color: #d32f2f;">${highCount}</div>
        </div>
        <div class="stat-box">
            <div class="label">Medium Severity</div>
            <div class="value" style="color: #f57c00;">${mediumCount}</div>
        </div>
        <div class="stat-box">
            <div class="label">Low Severity</div>
            <div class="value" style="color: #fbc02d;">${lowCount}</div>
        </div>
    `;
}

// Display findings
function displayFindings(findings) {
    const container = document.getElementById('finding-container');
    const noResults = document.getElementById('no-finding');

    if (findings.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    noResults.style.display = 'none';

    container.innerHTML = findings.map(finding => `
        <div class="finding-card ${finding.severity}">
            <div class="finding-header">
                <div class="finding-title">${escapeHtml(finding.title)}</div>
                <span class="severity-badge ${finding.severity}">${finding.severity.toUpperCase()}</span>
                <span class="confidence-badge">${finding.confidence.toUpperCase()}</span>
            </div>

            <div class="finding-type">${formatFindingType(finding.finding_type)}</div>

            <div class="finding-description">
                ${escapeHtml(finding.dexcription)}
            </div>

            <div class="finding-details">
                <div class="detail-item">
                    <div class="detail-label">Source Tools</div>
                    <div class="detail-value">${finding.source_tools.join(', ')}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Verification</div>
                    <div class="detail-value">${finding.verification_status}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">${finding.status.toUpperCase()}</div>
                </div>
                ${finding.asset_id ? `
                <div class="detail-item">
                    <div class="detail-label">Asset ID</div>
                    <div class="detail-value">${finding.asset_id}</div>
                </div>
                ` : ''}
            </div>

            ${finding.remediation ? `
            <div class="remediation">
                <div class="remediation-label">Remediation:</div>
                ${escapeHtml(finding.remedition)}
            </div>
            ` : ''}
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Apply filters
function applyFilters() {
    const severity = document.getElementById('severity-filter').value;
    const type = document.getElementById('type-filter').value;
    const confidence = document.getElementById('confidence-filter').value;
    const status = document.getElementById('status-filter').value;

    filteredFindings = allFindings.filter(finding => {
        const severityMatch = !severity || finding.severity === severity;
        const typeMatch = !type || finding.finding_type === type;
        const confidenceMatch = !confidence || finding.confidence === confidence;
        const statusMatch = !status || finding.status === status;

        return severityMatch && typeMatch && confidenceMatch && statusMatch;
    });

    updateStats();
    displayFindings(filteredFindings);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadFindings(); //Opps... Forgot to uncomment this 

    // Add filter event listeners
    document.getElementById('severity-filter').addEventListener('change', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);
    document.getElementById('confidence-filter').addEventListener('change', applyFilters);
    document.getElementById('status-filter').addEventListener('change', applyFilters);
});
