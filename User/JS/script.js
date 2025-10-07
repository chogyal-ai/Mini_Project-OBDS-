// Save donor to localStorage
document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let donor = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    bloodGroup: document.getElementById("bloodGroup").value
  };

  let donors = JSON.parse(localStorage.getItem("donors")) || [];
  donors.push(donor);
  localStorage.setItem("donors", JSON.stringify(donors));

  document.getElementById("registerMsg").innerText = "Donor Registered Successfully!";
  this.reset();
});

// Search donors by blood group
function searchDonors() {
  let group = document.getElementById("searchGroup").value;
  let donors = JSON.parse(localStorage.getItem("donors")) || [];
  let results = donors.filter(d => d.bloodGroup === group);

  let list = document.getElementById("donorList");
  list.innerHTML = "";

  if (results.length === 0) {
    list.innerHTML = "<p>No donors found.</p>";
  } else {
    results.forEach(donor => {
      let card = document.createElement("div");
      card.className = "donor-card";
      card.innerHTML = `<strong>${donor.name}</strong><br>
                        Email: ${donor.email}<br>
                        Phone: ${donor.phone}<br>
                        Blood Group: ${donor.bloodGroup}`;
      list.appendChild(card);
    });
  }
}
