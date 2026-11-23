// Get the form elements
var evaluationForm = document.getElementById("evaluation-form");

var offeringInput = document.getElementById("eval-offering");
var ratingInputs = document.getElementsByName("rating");
var feedbackInput = document.getElementById("eval-feedback");

// Return the selected rating, or 0 if no star is selected
function getRating() {

    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            return Number(ratingInputs[i].value);
        }
    }

    return 0;
}

// Validate the evaluation and redirect to the dashboard
function submitEvaluation() {

    var offeringValue = offeringInput.value;
    var ratingValue = getRating();
    var feedbackValue = feedbackInput.value.trim();

    // 1. An offering must be selected
    if (offeringValue === "") {
        alert("Please select an offering to evaluate.");
        offeringInput.focus();
        return false;
    }

    // 2. A rating must be selected
    if (ratingValue === 0) {
        alert("Please select a rating.");
        return false;
    }

    // 3. Feedback cannot be empty
    if (feedbackValue === "") {
        alert("Please write your feedback.");
        feedbackInput.focus();
        return false;
    }

    // 4. Show a thank-you or an apology message based on the rating
    var offeringName = offeringInput.options[offeringInput.selectedIndex].text;

    if (ratingValue >= 3) {
        alert("Thank you for rating " + offeringName + " " + ratingValue +
            " out of 5! We are glad you enjoyed it.");
    } else {
        alert("We are sorry that " + offeringName + " did not meet your expectations. " +
            "Thank you for your feedback, we will work to improve.");
    }

    // 5. Redirect to the member dashboard
    window.location.href = "member-dashboard.html";

    return false;
}

// Handle form submission
evaluationForm.onsubmit = submitEvaluation;