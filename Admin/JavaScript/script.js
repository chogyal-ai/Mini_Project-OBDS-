// Dummy data
let donors = [
  { name: "Chogyal Wangdi", blood: "B+", date: "2025-05-15" },
  { name: "Sonam Jamtsho", blood: "B+", date: "2025-05-25" },
  { name: "Dorji Samdrup", blood: "B+", date: "2025-05-16" },
  { name: "Norbu Wangmo", blood: "B+", date: "2025-05-18" }
];

// Navigation function
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Load dashboard and donor list
function loadDashboard() {
  document.getElementById("donorCount").innerText = donors.length;
  
  let recentList = document.getElementById("recentDonations");
  recentList.innerHTML = "";
  donors.slice(-4).forEach(d => {
    let li = document.createElement("li");
    li.textContent = `${d.name} - ${d.blood} (${d.date})`;
    recentList.appendChild(li);
  });
}

function loadDonorTable() {
  let table = document.getElementById("donorTable");
  table.innerHTML = "";
  donors.forEach((d, index) => {
    let row = `<tr>
      <td>${d.name}</td>
      <td>${d.blood}</td>
      <td>${d.date}</td>
      <td><button onclick="deleteDonor(${index})">Delete</button></td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Add donor
document.getElementById("donorForm").addEventListener("submit", e => {
  e.preventDefault();
  let name = document.getElementById("donorName").value;
  let blood = document.getElementById("bloodGroup").value;
  let date = document.getElementById("donationDate").value;

  donors.push({ name, blood, date });
  loadDashboard();
  loadDonorTable();
  alert("Donor Added Successfully!");
  e.target.reset();
});

// Delete donor
function deleteDonor(index) {
  donors.splice(index, 1);
  loadDashboard();
  loadDonorTable();
}

// Generate report
function generateReport(type) {
  let report = document.getElementById("reportResult");
  if (type === "monthly") {
    report.innerHTML = `<p>Monthly Report: ${donors.length} donors this month</p>`;
  } else {
    report.innerHTML = `<p>Yearly Report: ${donors.length} donors this year</p>`;
  }
}

// Initial load
loadDashboard();
loadDonorTable();
