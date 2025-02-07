const searchInput = document.getElementById("input-wrapper");

searchInput.addEventListener("click", () => {
    // alert("teste0");
    // searchInput.style.border = "2px solid #45b442"; // Substitua #45b442 pela cor desejada
});

searchInput.addEventListener("blur", () => {
    searchInput.style.border = "1px solid #d3cfd2"; // Remove a borda quando o campo perde o foco
});
