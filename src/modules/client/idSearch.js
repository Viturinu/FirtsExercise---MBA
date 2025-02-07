const submitIcon = document.getElementById("submitIcon");
const input = document.getElementById("input");

submitIcon.addEventListener("click", async ()=>{
  if(input.value === "") alert("Você precisa inserir um valor");

  const result = await fetch('http://localhost:3333/clients')
  .then(response => response.json())  // Converte a resposta para JSON
  .catch(error => {
    console.error('Erro:', error);
  });

  const filter = result?.filter((element) => element.id === "207-245-699-104" );

  if(filter) console.log("encontrou: " + JSON.stringify(filter));

  // const filter = result?.filter((element) => element.id === 207-245-699-104 );

  // console.log(filter);

  // filter ? alert("Nada foi encontrado") : alert(filter);
})


