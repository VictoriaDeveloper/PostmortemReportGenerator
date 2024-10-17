// Function to validate the form fields
function validateForm() {
    // Get all form fields
    const projectName = document.getElementById('projectName');
    const overview = document.getElementById('overview');
    const goals = document.getElementById('goals');
    const successes = document.getElementById('successes');
    const challenges = document.getElementById('challenges');
    const takeaways = document.getElementById('takeaways');
    const recommendations = document.getElementById('recommendations');
    const finalThoughts = document.getElementById('finalThoughts');

    let isValid = true;

    // Clear previous error messages
    clearErrors();

    // Validate each field's length (e.g., at least 10 characters for text areas)
    if (projectName.value.trim().length < 3) {
        showError(projectName, 'Project name must be at least 3 characters long.');
        isValid = false;
    }
    if (overview.value.trim().length < 20) {
        showError(overview, 'Overview must be at least 20 characters long.');
        isValid = false;
    }
    if (goals.value.trim().length < 20) {
        showError(goals, 'Goals must be at least 20 characters long.');
        isValid = false;
    }
    if (successes.value.trim().length < 20) {
        showError(successes, 'Please describe the successes in at least 20 characters.');
        isValid = false;
    }
    if (challenges.value.trim().length < 20) {
        showError(challenges, 'Please describe the challenges in at least 20 characters.');
        isValid = false;
    }
    if (takeaways.value.trim().length < 20) {
        showError(takeaways, 'Takeaways must be at least 20 characters long.');
        isValid = false;
    }
    if (recommendations.value.trim().length < 20) {
        showError(recommendations, 'Recommendations must be at least 20 characters long.');
        isValid = false;
    }
    if (finalThoughts.value.trim().length < 10) {
        showError(finalThoughts, 'Final thoughts must be at least 10 characters long.');
        isValid = false;
    }

    return isValid;
}

// Function to display error message
function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    input.parentElement.appendChild(errorElement);
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

// Event listener for form submission
document.getElementById('postmortemForm').addEventListener('submit', function(event) {
    // Prevent form submission if validation fails
    if (!validateForm()) {
        event.preventDefault(); // Stop form from submitting
        alert('Please fix the errors before submitting the form.');
    }
});
