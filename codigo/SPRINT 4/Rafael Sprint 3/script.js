// Obtém referências aos elementos HTML
const dataDisplay = document.getElementById("data-display");
const healthForm = document.getElementById("health-form");

// Array para armazenar os dados de saúde
let healthData = [];

// Função para exibir os dados
function displayData() {
  dataDisplay.innerHTML = "";
  if (healthData.length === 0) {
    dataDisplay.innerHTML = "Nenhum dado disponível.";
    return;
  }

  for (let i = 0; i < healthData.length; i++) {
    const data = healthData[i];
    const item = document.createElement("div");
    item.innerHTML = `<br>
        <p><strong>Data:</strong> ${data.date}</p>
        <p><strong>Pressão Sanguínea:</strong> ${data.bloodPressure}</p>
        <p><strong>Peso:</strong> ${data.weight}</p>
        <p><strong>Nível de Glicose:</strong> ${data.glucoseLevel}</p><br>
        <button class="delete-button" data-index="${i}">Excluir</button>
      `;
    dataDisplay.appendChild(item);
  }

  // Adicionar manipulador de eventos para o botão de exclusão
  const deleteButtons = document.getElementsByClassName("delete-button");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", handleDelete);
  }
}

// Função para salvar os dados em localStorage
function saveDataToLocalStorage() {
  localStorage.setItem("healthData", JSON.stringify(healthData));
}

// Função para carregar os dados de localStorage
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem("healthData");
  if (savedData) {
    healthData = JSON.parse(savedData);
    displayData();
  }
}

// Função para lidar com o envio do formulário
function handleSubmit(event) {
  event.preventDefault();

  // Obtém os valores dos campos do formulário
  const date = document.getElementById("date").value;
  const bloodPressure = document.getElementById("blood-pressure").value;
  const weight = document.getElementById("weight").value;
  const glucoseLevel = document.getElementById("glucose-level").value;

  // Cria um objeto com os dados de saúde
  const data = {
    date,
    bloodPressure,
    weight,
    glucoseLevel,
  };

  // Adiciona o objeto ao array de dados
  healthData.push(data);

  // Limpa os campos do formulário
  healthForm.reset();

  // Exibe os dados atualizados
  displayData();

  // Salva os dados em localStorage
  saveDataToLocalStorage();
}

// Define o manipulador de eventos para o envio do formulário
healthForm.addEventListener("submit", handleSubmit);

// Carrega os dados salvos de localStorage ao carregar a página
loadDataFromLocalStorage();

function handleDelete(event) {
  const index = event.target.getAttribute("data-index");
  healthData.splice(index, 1);
  displayData();
  saveDataToLocalStorage();
}
