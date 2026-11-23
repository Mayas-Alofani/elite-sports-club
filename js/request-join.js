// Get the form elements
var requestForm = document.getElementById("request-join-form");

var offeringInput = document.getElementById("join-offering");
var levelInput = document.getElementById("join-level");
var nameInput = document.getElementById("join-name");
var dateInput = document.getElementById("join-date");

// Elements used to display the added requests
var addedSection = document.getElementById("added-requests");
var addedBody = document.getElementById("added-requests-body");

// Requests added while the user stays on this page
var requests = [];

// Validate the form and save the request
function submitRequest() {

    var offeringValue = offeringInput.value;
    var levelValue = levelInput.value;
    var nameValue = nameInput.value.trim();
    var dateValue = dateInput.value;

    // Collect every problem so one alert can explain exactly what is wrong
    var errors = "";

    // 1. An offering must be selected
    if (offeringValue === "") {
        errors += "- Please select an offering.\n";
    }

    // 2. A level must be selected
    if (levelValue === "") {
        errors += "- Please select your level.\n";
    }

    // 3. Full name: not empty, no numbers or ? ! @, and at least two words
    if (nameValue === "") {
        errors += "- Please enter your full name.\n";
    } else if (nameValue.search(/[0-9?!@]/) !== -1) {
        errors += "- Full name cannot contain numbers or the characters ? ! @\n";
    } else if (nameValue.search(/^\S+\s+\S+/) === -1) {
        errors += "- Please enter your full name (first and last name).\n";
    }

    // 4. Preferred date: chosen and in the future
    if (dateValue === "") {
        errors += "- Please choose a preferred date.\n";
    } else {
        var dateParts = dateValue.split("-");
        var chosenDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosenDate <= today) {
            errors += "- Preferred date must be in the future.\n";
        }
    }

    // 5. Stop if anything is wrong
    if (errors !== "") {
        alert("Please fix the following:\n" + errors);
        return false;
    }

    // 6. Create a new request object and add it to the array
    var newRequest = {
        offering: offeringInput.options[offeringInput.selectedIndex].text,
        level: levelInput.options[levelInput.selectedIndex].text,
        name: nameValue,
        date: dateValue
    };

    requests.push(newRequest);

    // 7. Ask the user to stay or return to the dashboard
    var stay = confirm("Your request to join " + newRequest.offering +
        " has been submitted.\n\nPress OK to stay on this page and add another request, " +
        "or Cancel to return to the Member Dashboard.");

    if (stay === false) {
        window.location.href = "member-dashboard.html";
        return false;
    }

    // 8. Staying: show all added requests and clear the form
    displayRequests();
    requestForm.reset();

    return false;
}

// Create one table cell with the given text
function createCell(text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

// Display all the requests added so far
function displayRequests() {

    addedBody.innerHTML = "";

    for (var i = 0; i < requests.length; i++) {

        var row = document.createElement("tr");

        row.appendChild(createCell(requests[i].offering));
        row.appendChild(createCell(requests[i].level));
        row.appendChild(createCell(requests[i].name));
        row.appendChild(createCell(requests[i].date));

        var statusCell = document.createElement("td");
        var statusBadge = document.createElement("span");
        statusBadge.className = "status status-pending";
        statusBadge.textContent = "Pending";
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        addedBody.appendChild(row);
    }

    addedSection.hidden = false;
}

// Handle form submission
requestForm.onsubmit = submitRequest;