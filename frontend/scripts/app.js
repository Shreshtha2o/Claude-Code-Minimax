// Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// DOM Elements
const designForm = document.getElementById('designForm');
const generateBtn = document.getElementById('generateBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const outputSection = document.getElementById('outputSection');
const analysisSection = document.getElementById('analysisSection');
const newDesignBtn = document.getElementById('newDesignBtn');
const proceedDesignBtn = document.getElementById('proceedDesignBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');
const tabBtns = document.querySelectorAll('.tab-btn');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let currentDesignData = null;
let currentAnalysisData = null;

// Event Listeners
designForm.addEventListener('submit', handleGenerateDesign);
analyzeBtn.addEventListener('click', handleAnalyzeBusiness);
newDesignBtn.addEventListener('click', resetToForm);
proceedDesignBtn.addEventListener('click', showFormWithAnalysisData);
tabBtns.forEach(btn => btn.addEventListener('click', handleTabClick));
copyCodeBtn.addEventListener('click', copyCodeToClipboard);
downloadBtn.addEventListener('click', downloadHTML);
fullscreenBtn.addEventListener('click', openFullscreen);

/**
 * Handle form submission for design generation
 */
async function handleGenerateDesign(e) {
    e.preventDefault();

    const businessType = document.getElementById('businessType').value.trim();
    const businessDescription = document.getElementById('businessDescription').value.trim();
    const targetAudience = document.getElementById('targetAudience').value.trim();
    const platform = document.getElementById('platform').value;
    const postType = document.getElementById('postType').value;
    const style = document.querySelector('input[name="style"]:checked').value;

    const brandColors = [
        document.getElementById('color1').value,
        document.getElementById('color2').value,
        document.getElementById('color3').value
    ];

    if (!businessType || !platform) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const payload = {
        businessType,
        businessDescription,
        targetAudience,
        platform,
        postType,
        brandColors,
        style
    };

    try {
        showLoading('Generating your design with AI...');
        const response = await fetch(`${API_BASE_URL}/design/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate design');
        }

        const data = await response.json();
        currentDesignData = data;

        displayDesign(data);
        showToast('Design generated successfully!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Handle business analysis
 */
async function handleAnalyzeBusiness(e) {
    e.preventDefault();

    const businessType = document.getElementById('businessType').value.trim();
    const businessDescription = document.getElementById('businessDescription').value.trim();

    if (!businessType) {
        showToast('Please enter a business type', 'error');
        return;
    }

    const payload = {
        businessType,
        businessDescription
    };

    try {
        showLoading('Analyzing your business...');
        const response = await fetch(`${API_BASE_URL}/design/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to analyze business');
        }

        const data = await response.json();
        currentAnalysisData = data;

        displayAnalysisResults(data);
        showToast('Business analysis complete!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Display analysis results
 */
function displayAnalysisResults(data) {
    designForm.style.display = 'none';
    analysisSection.style.display = 'block';

    const resultsHtml = `
        <div class="analysis-item">
            <h4>📍 Industry & Market</h4>
            <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
            <p><strong>Best Platforms:</strong> ${(data.bestPlatforms || []).join(', ') || 'N/A'}</p>
        </div>

        <div class="analysis-item">
            <h4>🎨 Design Recommendations</h4>
            <p><strong>Suggested Style:</strong> ${data.suggestedStyle || 'Modern'}</p>
            <div class="color-palette">
                ${(data.suggestedColors || []).map(color => `
                    <div class="color-box">
                        <div class="color-swatch" style="background-color: ${color};"></div>
                        <div class="color-code">${color}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="analysis-item">
            <h4>👥 Audience Insights</h4>
            <p>${data.audienceInsights || 'Your audience is diverse and engaged.'}</p>
        </div>

        <div class="analysis-item">
            <h4>💡 Content Themes</h4>
            <ul>
                ${(data.contentThemes || []).map(theme => `<li>${theme}</li>`).join('')}
            </ul>
        </div>

        <div class="analysis-item">
            <h4>✨ Design Tips</h4>
            <ul>
                ${(data.designTips || []).map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>

        <div class="analysis-item">
            <h4>📈 Engagement Strategies</h4>
            <ul>
                ${(data.engagementStrategies || []).map(strategy => `<li>${strategy}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('analysisResults').innerHTML = resultsHtml;
    outputSection.style.display = 'none';

    // Scroll to results
    analysisSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Show form with analysis data pre-filled
 */
function showFormWithAnalysisData() {
    if (currentAnalysisData) {
        // Pre-fill recommended values if needed
        if (currentAnalysisData.suggestedColors) {
            document.getElementById('color1').value = currentAnalysisData.suggestedColors[0] || '#3498db';
            document.getElementById('color2').value = currentAnalysisData.suggestedColors[1] || '#2ecc71';
            document.getElementById('color3').value = currentAnalysisData.suggestedColors[2] || '#e74c3c';
        }
    }

    analysisSection.style.display = 'none';
    designForm.style.display = 'block';
    designForm.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Display generated design
 */
function displayDesign(data) {
    const { design, analysis, metadata } = data;

    // Show output section
    outputSection.style.display = 'block';
    designForm.style.display = 'none';
    analysisSection.style.display = 'none';

    // Display preview
    displayPreview(design.html);

    // Display code
    displayCode(design.html);

    // Display analysis
    displayAnalysisTab(analysis, design);

    // Display details
    displayDetailsTab(design, metadata);

    // Scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth' });

    // Reset tabs
    resetTabs();
}

/**
 * Display design preview
 */
function displayPreview(html) {
    const previewContainer = document.getElementById('designPreview');

    // Create iframe for isolated rendering
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';

    previewContainer.innerHTML = '';
    previewContainer.appendChild(iframe);

    // Write content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
}

/**
 * Display HTML/CSS code
 */
function displayCode(html) {
    const codeOutput = document.getElementById('codeOutput');
    codeOutput.textContent = html;
}

/**
 * Display analysis information
 */
function displayAnalysisTab(analysis, design) {
    const analysisContent = document.getElementById('analysisContent');

    const html = `
        <div class="analysis-item">
            <h4>📊 Business Insights</h4>
            <p>${analysis.businessInsights || 'Analysis complete'}</p>
        </div>

        <div class="analysis-item">
            <h4>🎯 Design Strategy</h4>
            <p>${analysis.designStrategy || 'Design optimized for your business'}</p>
        </div>

        <div class="analysis-item">
            <h4>💬 Key Messages</h4>
            <ul>
                ${(analysis.keyMessages || []).map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        </div>

        <div class="analysis-item">
            <h4>🎨 Style</h4>
            <p><strong>Suggested Style:</strong> ${analysis.suggestedStyle || 'Modern'}</p>
        </div>
    `;

    analysisContent.innerHTML = html;
}

/**
 * Display design details
 */
function displayDetailsTab(design, metadata) {
    const detailsContent = document.getElementById('detailsContent');

    const colorPaletteHtml = (design.colorPalette || []).map(color => `
        <div class="color-box">
            <div class="color-swatch" style="background-color: ${color};"></div>
            <div class="color-code">${color}</div>
        </div>
    `).join('');

    const typographyHtml = design.typography ? `
        <div class="analysis-item">
            <h4>📝 Typography</h4>
            ${design.typography.primaryFont ? `<p><strong>Primary Font:</strong> ${design.typography.primaryFont}</p>` : ''}
            ${design.typography.secondaryFont ? `<p><strong>Secondary Font:</strong> ${design.typography.secondaryFont}</p>` : ''}
            ${design.typography.headingSize ? `<p><strong>Heading Size:</strong> ${design.typography.headingSize}</p>` : ''}
            ${design.typography.bodySize ? `<p><strong>Body Size:</strong> ${design.typography.bodySize}</p>` : ''}
            ${design.typography.fontPairings ? `<p><strong>Font Pairing Logic:</strong> ${design.typography.fontPairings}</p>` : ''}
        </div>
    ` : '';

    const layoutHtml = design.typography && design.typography.layout ? `
        <div class="analysis-item">
            <h4>📐 Layout</h4>
            ${design.typography.layout.gridType ? `<p><strong>Grid Type:</strong> ${design.typography.layout.gridType}</p>` : ''}
            ${design.typography.layout.spacing ? `<p><strong>Spacing:</strong> ${design.typography.layout.spacing}</p>` : ''}
            ${design.typography.layout.compositionTip ? `<p><strong>Composition Tip:</strong> ${design.typography.layout.compositionTip}</p>` : ''}
        </div>
    ` : '';

    const html = `
        <div class="analysis-item">
            <h4>📋 Design Metadata</h4>
            <p><strong>Business Type:</strong> ${metadata.businessType}</p>
            <p><strong>Platform:</strong> ${metadata.platform.charAt(0).toUpperCase() + metadata.platform.slice(1)}</p>
            <p><strong>Post Type:</strong> ${metadata.postType}</p>
            <p><strong>Generated:</strong> ${new Date(metadata.generatedAt).toLocaleString()}</p>
        </div>

        <div class="analysis-item">
            <h4>🎨 Color Palette</h4>
            <div class="color-palette">
                ${colorPaletteHtml}
            </div>
        </div>

        ${typographyHtml}
        ${layoutHtml}

        <div class="analysis-item">
            <h4>💡 Design Recommendations</h4>
            <p>${design.recommendations || 'Design optimized for engagement'}</p>
        </div>
    `;

    detailsContent.innerHTML = html;
}

/**
 * Handle tab switching
 */
function handleTabClick(e) {
    const tabName = e.target.dataset.tab;

    // Remove active class from all tabs
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to clicked tab
    e.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

/**
 * Reset tabs to preview
 */
function resetTabs() {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    tabBtns[0].classList.add('active');
    document.getElementById('preview').classList.add('active');
}

/**
 * Copy code to clipboard
 */
function copyCodeToClipboard() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
    }).catch(err => {
        showToast('Failed to copy code', 'error');
    });
}

/**
 * Download HTML file
 */
function downloadHTML() {
    const code = document.getElementById('codeOutput').textContent;
    const businessType = document.getElementById('businessType').value || 'design';
    const platform = document.getElementById('platform').value || 'post';

    const filename = `${businessType.replace(/\s+/g, '-')}-${platform}-${Date.now()}.html`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToast('Design downloaded successfully!', 'success');
}

/**
 * Open design in fullscreen
 */
function openFullscreen() {
    const iframeContainer = document.querySelector('.design-preview');
    const iframe = iframeContainer.querySelector('iframe');

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

/**
 * Reset to form
 */
function resetToForm() {
    designForm.reset();
    outputSection.style.display = 'none';
    analysisSection.style.display = 'none';
    designForm.style.display = 'block';
    currentDesignData = null;
    currentAnalysisData = null;
    designForm.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Show loading overlay
 */
function showLoading(message = 'Loading...') {
    document.getElementById('loadingText').textContent = message;
    loadingOverlay.classList.add('active');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    loadingOverlay.classList.remove('active');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Check API connection on page load
 */
window.addEventListener('DOMContentLoaded', () => {
    // Check if backend is running
    fetch(`${API_BASE_URL.replace('/api', '')}/api/health`)
        .then(response => response.json())
        .then(data => {
            console.log('✓ Backend connected:', data);
        })
        .catch(error => {
            console.warn('⚠️ Backend not responding. Make sure to run: npm start');
            showToast('⚠️ Backend not connected. Make sure the server is running on port 3001', 'error');
        });
});
