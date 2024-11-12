let records = [];
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

  // Push to array
  records.push(record); //For add data end of array

  //using unshift
  // records.unshift(record); //For add data begin of the array

  displayRecords();
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
