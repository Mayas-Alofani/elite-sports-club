/* =========================================================
   IT312 Phase 3 - Manager Dashboard & Team Management
   ========================================================= */

// Initial array of instructor objects (Section 3.8)
var instructors = [
  {
    id: 1,
    name: "Rachel Morgan",
    photo: "images/instructor-1-rachel-morgan.jpg",
    birthDate: "1989-04-15",
    email: "rachel.morgan@elitesportsclub.sa",
    expertise: "Pilates and Flexibility Training",
    skills: "Core Strength, Posture, Flexibility and Balance",
    education: "Certified Pilates Instructor"
  },
  {
    id: 2,
    name: "Ethan Collins",
    photo: "images/instructor-2-ethan-collins.jpg",
    birthDate: "1990-08-22",
    email: "ethan.collins@elitesportsclub.sa",
    expertise: "Tennis and Match Strategy",
    skills: "Serving, Footwork, Ball Control and Teamwork",
    education: "Certified Tennis Coach"
  },
  {
    id: 3,
    name: "Marcus Reed",
    photo: "images/instructor-3-marcus-reed.jpg",
    birthDate: "1985-11-10",
    email: "marcus.reed@elitesportsclub.sa",
    expertise: "Football, Basketball and Team Tactics",
    skills: "Ball Control, Passing, Shooting and Teamwork",
    education: "Certified Football Coach"
  },
  {
    id: 4,
    name: "Olivia Bennett",
    photo: "images/instructor-4-olivia-bennett.jpg",
    birthDate: "1992-06-05",
    email: "olivia.bennett@elitesportsclub.sa",
    expertise: "Swimming, Running and Water Safety",
    skills: "Swimming Techniques, Endurance, Breathing and Water Safety",
    education: "Certified Swimming Instructor"
  }
];

/* ---------------------------------------------------------
   Section 3.6: Club Manager Dashboard (localStorage Read)
   --------------------------------------------------------- */
function addCell(row, text) {
  var cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
  return cell;
}

function loadManagerOfferings() {
  var tableBody = document.getElementById("manager-offerings-body");

  if (!tableBody) {
    return;
  }

  // Check localStorage for offerings saved from add-offering.html
  var storedData = localStorage.getItem("clubOfferings");
  var offeringsList = [];

  if (storedData !== null && storedData !== "") {
    offeringsList = JSON.parse(storedData);
  }

  tableBody.innerHTML = "";

  if (offeringsList.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = addCell(emptyRow, 'No newly added offerings found. Click "Add a New Offering" to publish one.');
    emptyCell.colSpan = 5;
    tableBody.appendChild(emptyRow);
    return;
  }

  for (var i = 0; i < offeringsList.length; i++) {
    var item = offeringsList[i];
    var row = document.createElement("tr");

    // Name cell: name in bold, description under it
    var nameCell = document.createElement("td");
    var strong = document.createElement("strong");
    strong.textContent = item.name;
    nameCell.appendChild(strong);
    if (item.description) {
      var desc = document.createElement("small");
      desc.textContent = item.description;
      nameCell.appendChild(document.createElement("br"));
      nameCell.appendChild(desc);
    }
    row.appendChild(nameCell);

    addCell(row, item.instructor ? item.instructor : "Club Staff");
    addCell(row, item.price + " SR");
    addCell(row, item.level ? item.level : "All levels");

    var actionCell = document.createElement("td");
    var link = document.createElement("a");
    link.className = "table-action-link";
    link.href = "offering-details.html";
    link.innerHTML = "View Details &rarr;";
    actionCell.appendChild(link);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  }
}

/* ---------------------------------------------------------
   Section 3.8: Manage Activity Leaders & Instructors
   --------------------------------------------------------- */
function renderInstructorsList() {
  var listContainer = document.getElementById("team-member-list");
  if (!listContainer) {
    return;
  }

  var htmlItems = "";

  if (instructors.length === 0) {
    htmlItems = '<li class="instructor-row-item"><span class="instructor-row-name">No activity leaders or instructors available.</span></li>';
  } else {
    for (var i = 0; i < instructors.length; i++) {
      var person = instructors[i];
      htmlItems += '<li class="instructor-row-item">';
      htmlItems += '<div class="instructor-thumb-box">';
      htmlItems += '<img src="' + person.photo + '" alt="' + person.name + '">';
      htmlItems += "</div>";
      htmlItems += '<span class="instructor-row-name">' + person.name + "</span>";
      htmlItems += '<label class="instructor-row-check" for="inst-' + i + '">';
      htmlItems += '<span class="visually-hidden">Select ' + person.name + " for removal</span>";
      htmlItems += '<input type="checkbox" id="inst-' + i + '" name="instructors_to_delete[]" value="' + i + '">';
      htmlItems += "</label>";
      htmlItems += "</li>";
    }
  }

  listContainer.innerHTML = htmlItems;
}

function handleDeleteInstructors() {
  var checkboxes = document.getElementsByName("instructors_to_delete[]");
  var selectedIndices = [];

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedIndices.push(parseInt(checkboxes[i].value, 10));
    }
  }

  // Alert if none selected
  if (selectedIndices.length === 0) {
    alert("Please select at least one activity leader or instructor to delete.");
    return false;
  }

  // Confirm delete action
  var isConfirmed = confirm("Are you sure you want to delete the selected activity leader(s) / instructor(s)?");
  if (isConfirmed) {
    // Remove from highest index to lowest so array shifting doesn't skip elements
    for (var j = selectedIndices.length - 1; j >= 0; j--) {
      instructors.splice(selectedIndices[j], 1);
    }
    renderInstructorsList();
  }

  return false;
}

// Next free id (length + 1 can repeat after a delete)
function nextInstructorId() {
  var maxId = 0;
  for (var i = 0; i < instructors.length; i++) {
    if (instructors[i].id > maxId) {
      maxId = instructors[i].id;
    }
  }
  return maxId + 1;
}

function handleAddInstructor() {
  var nameInput = document.getElementById("new-name");
  var photoInput = document.getElementById("new-photo");
  var dobInput = document.getElementById("new-dob");
  var emailInput = document.getElementById("new-email");
  var expertiseInput = document.getElementById("new-expertise");
  var skillsInput = document.getElementById("new-skills");
  var educationInput = document.getElementById("new-education");

  var nameVal = nameInput.value.trim();
  var photoVal = photoInput.value;
  var dobVal = dobInput.value;
  var emailVal = emailInput.value.trim();
  var expertiseVal = expertiseInput.value.trim();
  var skillsVal = skillsInput.value.trim();
  var educationVal = educationInput.value.trim();

  // 1. Check for empty fields
  if (nameVal === "" || photoVal === "" || dobVal === "" || emailVal === "" || expertiseVal === "" || skillsVal === "" || educationVal === "") {
    alert("Please fill in all fields before adding a new activity leader or instructor.");
    return false;
  }

  // 2. Check text fields do not start with numbers (using Lecture 12 RegEx search)
  if (nameVal.search(/^\d/) !== -1) {
    alert("Name cannot start with a number.");
    return false;
  }

  if (expertiseVal.search(/^\d/) !== -1) {
    alert("Area of Expertise cannot start with a number.");
    return false;
  }

  if (educationVal.search(/^\d/) !== -1) {
    alert("Education cannot start with a number.");
    return false;
  }

  // 3. Check email format (Lecture 12 RegEx)
  if (emailVal.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === -1) {
    alert("Please enter a valid email address.");
    return false;
  }

  // 4. Check photo file extension is an image
  if (photoVal.search(/\.(jpg|jpeg|png|gif|webp|svg)$/i) === -1) {
    alert("Photo must be an image file (JPG, PNG, GIF, WEBP, or SVG).");
    return false;
  }

  // Add new instructor object to the current list (no profile page needed per instructions)
  var newPerson = {
    id: nextInstructorId(),
    name: nameVal,
    photo: "images/logo.svg",
    birthDate: dobVal,
    email: emailVal,
    expertise: expertiseVal,
    skills: skillsVal,
    education: educationVal
  };

  instructors.push(newPerson);
  renderInstructorsList();

  alert(nameVal + " has been added to the activity leaders and instructors list.");

  // Clear form inputs
  document.getElementById("add-instructor-form").reset();
  return false;
}

/* ---------------------------------------------------------
   Initialize Page Handlers on Load
   --------------------------------------------------------- */
window.onload = function () {
  // If on manager-dashboard.html
  loadManagerOfferings();

  // If on manage-team.html
  renderInstructorsList();

  var deleteForm = document.getElementById("delete-team-form");
  if (deleteForm) {
    deleteForm.onsubmit = handleDeleteInstructors;
  }

  var addForm = document.getElementById("add-instructor-form");
  if (addForm) {
    addForm.onsubmit = handleAddInstructor;
  }
};