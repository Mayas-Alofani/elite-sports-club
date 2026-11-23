var offeringsList = document.getElementById("offerings-list");
var sortMenu = document.getElementById("sort");
var offerings = [];

function readOfferings() {
  var cards = document.getElementsByClassName("offering-card");

  for (var i = 0; i < cards.length; i++) {
    var name = cards[i].getElementsByTagName("h2")[0].innerHTML;
    var priceText = cards[i].getElementsByClassName("price")[0].innerHTML;

    offerings.push({
      name: name,
      price: parseInt(priceText),
      card: cards[i]
    });
  }
}

function displayOfferings() {
  for (var i = 0; i < offerings.length; i++) {
    var number = offerings[i].card.getElementsByClassName("offering-number")[0];

    if (i < 9) {
      number.innerHTML = "0" + (i + 1);
    } else {
      number.innerHTML = i + 1;
    }

    offeringsList.appendChild(offerings[i].card);
  }
}

function shuffleOfferings() {
  for (var i = offerings.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
  }
}

function compareNames(a, b) {
  var nameA = a.name.toLowerCase();
  var nameB = b.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  } else {
    return 0;
  }
}

function comparePrices(a, b) {
  return a.price - b.price;
}

function sortOfferings() {
  var choice = sortMenu.value;

  if (choice == "random") {
    shuffleOfferings();
  } else if (choice == "name-asc") {
    offerings.sort(compareNames);
  } else if (choice == "name-desc") {
    offerings.sort(compareNames);
    offerings.reverse();
  } else if (choice == "price-asc") {
    offerings.sort(comparePrices);
  } else if (choice == "price-desc") {
    offerings.sort(comparePrices);
    offerings.reverse();
  }

  displayOfferings();
}

readOfferings();
shuffleOfferings();
displayOfferings();

sortMenu.onchange = sortOfferings;
