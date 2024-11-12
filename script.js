let records = [];
let items = localStorage.getItem("items");
if (!items) {
  items = [];
} else {
  items = JSON.parse(items);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let item = document.getElementById("item").value;
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;

  if (item.trim() == "") {
    document.getElementById("item").focus();
    return;
  }
  if (price.trim() == "") {
    document.getElementById("price").focus();
    return;
  }
  if (quantity.trim() == "") {
    document.getElementById("quantity").focus();
    return;
  }

  document.querySelector("form").reset();
  document.getElementById("item").focus();

  let record = {
    item,
    price,
    quantity,
  };

  //Search if item alreaddy exists
  let found = records.find((r) => {
    return (r.item = item);
  });

  if (found) {
    if (found.price == price) {
      found.quantity = parseFloat(found.quantity) + parseFloat(quantity);
      displayRecords();
      return false;
    }
  }

  // Push to array
  records.push(record); //For add data end of array

  //using unshift
  // records.unshift(record); //For add data begin of the array

  displayRecords();

  let foundItem = items.find((record) => {
    return record.item.toLowerCase() == item.toLowerCase();
  });

  if (!foundItem) {
    items.push({ item, price });
    localStorage.setItem("items", JSON.stringify(items));
  } else if (parseFloat(foundItem.price) != parseFloat(price)) {
    items.forEach((record) => {
      if (record.item.toLowerCase() == item.toLowerCase()) {
        record.price = price;
        localStorage.setItem("items", JSON.stringify(items));
      }
    });
  }
});

function displayRecords() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  let total = 0;

  records.forEach((record, index) => {
    const template = document.querySelector("template").content;
    let tr = template.cloneNode(true);

    tr.querySelector(".count").textContent = index + 1;
    tr.querySelector(".name").textContent = record.item;
    tr.querySelector(".rate").textContent = record.price;
    tr.querySelector(".qty").textContent = record.quantity;
    tr.querySelector(".total").textContent = record.quantity * record.price;

    tr.querySelector(".delete").onclick = () => {
      if (confirm("Are you sure ?")) {
        records.splice(index, 1);
        displayRecords();
      }
    };

    tr.querySelector(".edit").onclick = () => {
      document.getElementById("item").value = record.item;
      document.getElementById("price").value = record.price;
      document.getElementById("quantity").value = record.quantity;

      records.splice(index, 1);
      displayRecords();
    };

    total += record.price * record.quantity;

    tbody.appendChild(tr);
  });

  document.querySelector(".grandTotal").textContent = total;
  document.getElementById("itemTypes").textContent = records.length;
}

//Sort by name
document.getElementById("sortByName").onclick = () => {
  records.sort((a, b) => {
    if (a.item < b.item) {
      return -1;
    } else if (a.item > b.item) {
      return +1;
    } else {
      return 0;
    }
  });

  displayRecords();
};

//sort by rate
document.getElementById("sortByRate").onclick = () => {
  records.sort((a, b) => {
    a.price = parseFloat(a.price);
    b.price = parseFloat(b.price);
    return a.price - b.price;
  });

  displayRecords();
};

//sort by quantity
document.getElementById("sortByQuantity").onclick = () => {
  records.sort((a, b) => {
    a.quantity = parseFloat(a.quantity);
    b.quantity = parseFloat(b.quantity);
    return a.price - b.price;
  });

  displayRecords();
};

//Sort by Total
document.getElementById("sortByTotal").onclick = () => {
  records.sort((a, b) => {
    a.total = parseFloat(a.quantity) * parseFloat(a.price);
    b.total = parseFloat(b.quantity) * parseFloat(b.price);
    return a.total - b.total;
  });

  displayRecords();
};

//Reverse
document.getElementById("reverse").onclick = () => {
  records.reverse();
  displayRecords();
};

//Print
document.getElementById("printBtn").onclick = () => {
  window.print();
};

//Clear
document.getElementById("clearBtn").onclick = () => {
  if (confirm("Are you sure ? ")) {
    records = [];
    displayRecords();
  }
};

// <----------------------------------------------------------------->

const input = document.getElementById("item");
const suggestions = document.getElementById("suggestions");
input.addEventListener("keyup", function (event) {
  let val = input.value;
  if (val.trim() == "") {
    suggestions.innerHTML = "";
    return;
  }

  if (event.key == "ArrowDown" || event.key == "ArrowUp") {
    let selected = document.querySelector("#suggestions li.selected");

    if (selected) {
      if (event.key == "ArrowDown") {
        if (selected.nextElementSibling) {
          selected.nextElementSibling.classList.add("selected");
          selected.classList.remove("selected");
        }
      } else {
        if (selected.previousElementSibling) {
          selected.previousElementSibling.classList.add("selected");
          selected.classList.remove("selected");
        }
      }
    } else {
      if (event.key == "ArrowDown") {
        document.querySelector("#suggestions li").classList.add("selected");
      }
    }
    return;
  }

  let res = items.filter(function (record) {
    return record.item.toLowerCase().includes(val.toLowerCase());
  });

  suggestions.innerHTML = "";
  res.forEach(function (suggestion) {
    let li = document.createElement("li");
    li.textContent = suggestion.item;
    li.onclick = function () {
      input.value = suggestion.item;
      document.getElementById("price").value = suggestion.price;
      document.getElementById("price").focus();
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
});

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    let selected = document.querySelector("#suggestions li.selected");
    if (selected) {
      selected.click();
      event.preventDefault();
    }
  }
});
