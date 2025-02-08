const submitIcon = document.getElementById("submitIcon");
const input = document.getElementById("input");
const nameText = document.getElementById("name");
const clientSince = document.getElementById("clientSince");
const profilePicture = document.getElementById("profilePicture");
const content = document.getElementById("content");
const strongId = document.getElementById("strong-id");
const cutNumbers = document.getElementById("cut-numbers");


submitIcon.addEventListener("click", () => {
  search(input.value);
});

input.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    search(input.value);
  }
});

async function search(id) {
  if (id === "") {
    alert("Você precisa inserir um valor");
    return;
  }

  const regex = /^\d{3}-\d{3}-\d{3}-\d{3}$/;

  if (!regex.test(id)) {
    alert("ID inválido! O formato correto é XXX-XXX-XXX-XXX.");
    return;
  }

  const result = await fetch('http://localhost:3333/clients')
    .then(response => response.json())  // Converte a resposta para JSON
    .catch(error => {
      console.error('Erro:', error);
    });

  const filter = result?.filter((element) => element.id === id);

  if (filter.length !== 0) {
    console.log("encontrou: " + JSON.stringify(filter));
    //Alterando HTML
    nameText.textContent = filter[0].name;
    clientSince.textContent = `Cliente desde ${filter[0].clientSince}`;
    profilePicture.src = "./src/assets/Cap_nascimento.jpg";

    content.innerHTML = ""; //zerando content da lista
    filter[0].appointmentHistory.forEach(element => {
      // Criando a div principal (tupla)
      const tupla = document.createElement("div");
      tupla.id = "tupla";

      // Criando a div para data e hora
      const dateTimeDiv = document.createElement("div");

      const dateSpan = document.createElement("span");
      dateSpan.id = "date";
      dateSpan.textContent = element.date;

      const timeSpan = document.createElement("span");
      timeSpan.id = "time";
      timeSpan.textContent = element.time;

      dateTimeDiv.appendChild(dateSpan);
      dateTimeDiv.appendChild(timeSpan);

      // Criando a div para checked-image
      const checkedImageDiv = document.createElement("div");
      checkedImageDiv.id = "checked-image";

      // Adicionando tudo à tupla
      tupla.appendChild(dateTimeDiv);
      tupla.appendChild(checkedImageDiv);

      // Adicionando a tupla ao content
      content.appendChild(tupla);
    });

    strongId.textContent = `ID: ${id}`;
    cutNumbers.textContent = filter[0].appointmentHistory.length;

  } else {
    console.log("Não achou nada.")
  }

  // const filter = result?.filter((element) => element.id === 207-245-699-104 );

  // console.log(filter);

  // filter ? alert("Nada foi encontrado") : alert(filter);
}


