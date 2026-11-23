// Get the form elements
var offeringForm = document.getElementById("add-offering-form");
var nameInput = document.getElementById("offering-name");
var priceInput = document.getElementById("offering-price");
var imageInput = document.getElementById("offering-image");
var descriptionInput = document.getElementById("offering-description");

// Validate and save the offering
function addOffering() {
    var nameValue = nameInput.value.trim();
    var priceValue = priceInput.value.trim();
    var imageValue = imageInput.value;
    var descriptionValue = descriptionInput.value.trim();

    // Collect every problem so one alert can explain exactly what is wrong
    var errors = "";

    // 1. Offering name: not empty, cannot start with a number
    if (nameValue === "") {
        errors += "- Offering name is empty.\n";
    } else if (nameValue.search(/^\d/) !== -1) {
        errors += "- Offering name cannot start with a number.\n";
    }

    // 2. Price: not empty, must be a number that is 0 or more
    if (priceValue === "") {
        errors += "- Price is empty.\n";
    } else if (priceValue.search(/^\d+(\.\d+)?$/) === -1) {
        errors += "- Price must be a number (0 or more).\n";
    }

    // 3. Image: selected and must be an image file
    if (imageValue === "") {
        errors += "- Offering image is missing.\n";
    } else if (imageValue.search(/\.(jpg|jpeg|png|gif|webp|svg)$/i) === -1) {
        errors += "- Offering image must be an image file (JPG, PNG, GIF, WEBP or SVG).\n";
    }

    // 4. Description: not empty
    if (descriptionValue === "") {
        errors += "- Description is empty.\n";
    }

    // 5. Stop if anything is wrong
    if (errors !== "") {
        alert("Please fix the following:\n" + errors);
        return false;
    }

    // 6. Get previously saved offerings
    var storedData = localStorage.getItem("clubOfferings");
    var offerings = [];

    if (storedData !== null && storedData !== "") {
        offerings = JSON.parse(storedData);
    }

    // 7. Create a new offering object (keep only the image file name)
    var newOffering = {
        name: nameValue,
        price: Number(priceValue),
        image: imageValue.replace(/^.*[\\\/]/, ""),
        description: descriptionValue
    };

    // 8. Add the new offering to the array and save it
    offerings.push(newOffering);
    localStorage.setItem("clubOfferings", JSON.stringify(offerings));

    // 9. Display success message
    alert(nameValue + " has been added successfully!");

    // 10. Clear the form
    offeringForm.reset();

    return false;
}

// Handle form submission
offeringForm.onsubmit = addOffering;
