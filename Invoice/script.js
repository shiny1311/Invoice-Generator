let serviceCounter = 0;

function addService() {
  serviceCounter++;
  const serviceContainer = document.getElementById("serviceContainer");

  const newServiceRow = document.createElement("div");
  newServiceRow.classList.add("service-row");
  newServiceRow.setAttribute("id", `service-${serviceCounter}`);

  newServiceRow.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label for="description-${serviceCounter}">Description:</label>
        <input type="text" class="description" id="description-${serviceCounter}" required />
      </div>
      <div class="form-group">
        <label for="rateType-${serviceCounter}">Rate Type:</label>
        <select class="rateType" id="rateType-${serviceCounter}" required>
          <option value="hourly">Hourly Rate</option>
          <option value="daily">Daily Rate</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="quantity-${serviceCounter}">Number of Hours/Days:</label>
        <input type="number" class="quantity" id="quantity-${serviceCounter}" required />
      </div>
      <div class="form-group">
        <label for="rate-${serviceCounter}">Rate (INR):</label>
        <input type="number" class="rate" id="rate-${serviceCounter}" required />
      </div>
    </div>
  `;

  serviceContainer.appendChild(newServiceRow);
}

function deleteService() {
    const serviceContainer = document.getElementById("serviceContainer");
  
    // Check if there are services to delete
    if (serviceCounter > 0) {
      const lastServiceRow = document.getElementById(`service-${serviceCounter}`);
      if (lastServiceRow) {
        serviceContainer.removeChild(lastServiceRow);
        serviceCounter--; // Decrement the counter to maintain unique IDs
      }
    } else {
      alert("No services to delete");
    }
  }

function generateInvoice() {
  // Basic Info
  document.getElementById("displayInvoiceNo").textContent = document.getElementById("invoiceNo").value;
  document.getElementById("displayDate").textContent = document.getElementById("date").value;

  // Client Details
  document.getElementById("displayClientName").textContent = document.getElementById("clientName").value;
  document.getElementById("displayClientAddress").textContent = document.getElementById("clientAddress").value;
  document.getElementById("displayClientContact").textContent = document.getElementById("clientContact").value;
  document.getElementById("displayPoNo").textContent = document.getElementById("poNo").value;

  // Company Details
  document.getElementById("displayCompanyName").textContent = document.getElementById("companyName").value;
  document.getElementById("displayCompanyAddress").textContent = document.getElementById("companyAddress").value;
  document.getElementById("displayTrainerName").textContent = document.getElementById("trainerName").value;
  document.getElementById("displayTrainerPhone").textContent = document.getElementById("trainerPhone").value;

  // Services
  const serviceRows = document.querySelectorAll("#serviceContainer .service-row");
  let totalAmount = 0;
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // Clear previous rows

  serviceRows.forEach((row, index) => {
    const description = row.querySelector(".description").value;
    const quantity = row.querySelector(".quantity").value;
    const rate = row.querySelector(".rate").value;
    const amount = quantity * rate;
    totalAmount += amount;

    const rowElement = document.createElement("tr");
    rowElement.innerHTML = `
      <td>${description}</td>
      <td>${quantity}</td>
      <td>${rate}</td>
      <td>${amount}</td>
    `;
    tbody.appendChild(rowElement);
  });

  document.getElementById("displayTotal").textContent = totalAmount;
  document.getElementById("displayAmountInWords").textContent = numberToWords(totalAmount);

  // Bank Details
  document.getElementById("displayBankName").textContent = document.getElementById("bankName").value;
  document.getElementById("displayAccountNo").textContent = document.getElementById("accountNo").value;
  document.getElementById("displayIfscCode").textContent = document.getElementById("ifscCode").value;
  document.getElementById("displayaccountHolder").textContent = document.getElementById("accountHolder").value;
  document.getElementById("displaypanNo").textContent = document.getElementById("panNo").value;
  document.getElementById("displaybankAddress").textContent = document.getElementById("bankAddress").value;

  document.getElementById("displayTrainerName2").textContent = document.getElementById("trainerName").value;
}

function numberToWords(number) {
  // Basic conversion of numbers to words
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  return words[number] || number; // Extend to more complex cases if needed
}

document.getElementById("invoiceForm").addEventListener("submit", function(event) {
  event.preventDefault();
  generateInvoice();
});

function downloadInvoice() {
  const invoice = document.getElementById("invoice");
  const opt = {
    margin: 1,
    filename: 'Invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(invoice).save();
}

function editInvoice() {
  document.getElementById("invoiceForm").style.display = "block";
  document.getElementById("invoice").style.display = "none";
}

// Toggle display on load
document.getElementById("invoice").style.display = "none";
