if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
      console.log("Document is ready after waiting!");
      initializeCode();
  })
}

function initializeCode() {
  fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
      .then(response => response.json())
      .then(data => populateTable(data))
      .catch(error => console.error(error));
}

function populateTable(data) {
  const tableBody = document.querySelector("#municipality-table tbody");

  // Extract the municipality labels from the data
  const municipalities = data.dataset.dimension.Alue.category.label;

  // Extract the population values from the data
  const populationValues = data.dataset.value;

  // Loop through the data and create table rows
  for (let i = 0; i < municipalities.length; i++) {
      const municipality = municipalities[i];
      const population = populationValues[i];

      const row = document.createElement("tr");
      const municipalityCell = document.createElement("td");
      const populationCell = document.createElement("td");

      municipalityCell.textContent = municipality;
      populationCell.textContent = population;

      row.appendChild(municipalityCell);
      row.appendChild(populationCell);

      tableBody.appendChild(row);
  }
}
