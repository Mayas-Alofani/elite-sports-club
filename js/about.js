// Get the form elements
var joinForm = document.getElementById("join-team-form");

var nameInput = document.getElementById("name");
var photoInput = document.getElementById("photo");
var birthDateInput = document.getElementById("birth-date");
var emailInput = document.getElementById("email");
var expertiseInput = document.getElementById("expertise");
var skillsInput = document.getElementById("skills");
var educationInput = document.getElementById("education");

// Validate the form
function validateJoinForm() {

    var nameValue = nameInput.value.trim();
    var photoValue = photoInput.value;
    var birthDateValue = birthDateInput.value;
    var emailValue = emailInput.value.trim();
    var expertiseValue = expertiseInput.value.trim();
    var skillsValue = skillsInput.value.trim();
    var educationValue = educationInput.value.trim();

    // 1. Check for empty fields
    if (nameValue === "" || photoValue === "" ||
        birthDateValue === "" || emailValue === "" ||
        expertiseValue === "" || skillsValue === "" ||
        educationValue === "") {

        alert("Please fill in all fields.");
        return false;
    }

    // 2. Name cannot start with a number
    if (nameValue.search(/^\d/) !== -1) {

        alert("Name cannot start with a number.");
        return false;
    }

    // 3. Photo must be an image
    if (photoValue.search(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i) === -1) {

        alert("Please select an image file only.");
        return false;
    }

    // 4. Birth year must be 2008 or earlier
    var birthYear = parseInt(birthDateValue);

    if (birthYear > 2008) {

        alert("Year of birth must be 2008 or earlier.");
        return false;
    }

    // 5. Display confirmation message
    alert("Thank you, " + nameValue +"! Your application has been submitted successfully.");

    return false;
}

// Handle form submission
joinForm.onsubmit = validateJoinForm;