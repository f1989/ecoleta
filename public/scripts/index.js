const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//quando clicar no botao de Pesquisar pontos de coleta
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})


//quando clicar no X para fechar a tela
close.addEventListener("click", () => {
    modal.classList.add("hide")
})