let currentStep = 0; // Track the current step

// Function to show the current step
function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index === step);
    });

    updateProgressBar(step);

    // Adjust button visibility
    document.getElementById('prevBtn').style.display = step === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').innerText = step === steps.length - 1 ? 'Submit' : 'Next';
}

// Function to update the progress bar
function updateProgressBar(step) {
    const steps = document.querySelectorAll('.form-step').length;
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercentage = ((step + 1) / steps) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Function to move to the next step
function nextStep() {
    const steps = document.querySelectorAll('.form-step');

    // Validate current step before moving on
    if (!validateStep()) return;

    currentStep++;
    if (currentStep >= steps.length) {
        submitForm(); // Submit form instead of showing a new step
    } else {
        showStep(currentStep);
    }
}

// Function to move to the previous step
function prevStep() {
    currentStep--;
    showStep(currentStep);
}

// Function to validate the current step's input fields
function validateStep() {
    const currentInputs = document.querySelectorAll('.form-step.active input, .form-step.active textarea');
    let isValid = true;

    currentInputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.reportValidity(); // Show built-in browser validation message
        }
    });

    return isValid;
}

// Function to submit the form and generate the report
async function submitForm() {
    const formData = new FormData(document.getElementById('postmortemForm'));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/generate-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to generate report');
        }

        const result = await response.json();
        displayReport(result.report);
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error generating report:', error);
    }
}

// Function to display the generated report
function displayReport(reportContent) {
    const reportDisplay = document.getElementById('reportDisplay');
    const reportContainer = document.getElementById('reportContent');
    
    reportContainer.innerHTML = reportContent; // Display the report content
    reportDisplay.style.display = 'block'; // Show the report section

    // Optionally, hide the form after generating the report
    document.getElementById('postmortemForm').style.display = 'none';
}

// Function to download the report as a PDF
function downloadReportAsPDF() {
    const { jsPDF } = window.jspdf; // Access jsPDF from the imported library
    const reportContent = document.getElementById('reportContent').innerHTML;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Generated Postmortem Report", 10, 10); // Title at position (10, 10)
    doc.fromHTML(reportContent, 10, 20); // Add the report content at position (10, 20)

    // Save the PDF
    doc.save("postmortem_report.pdf");
}
