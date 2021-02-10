function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) //buscou os estados e transforma em JSON
    .then( states => {
        for(const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpa o campo Cidade e o bloqueia ate que seleciona o Estado
    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json()) //buscou as cidades e transforma em JSON
    .then( cities => {
        for(const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// ITENS DE COLETA

// pegas todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

// variavel recebe os itens selecionados no formulario
const collectedItems = document.querySelector("input[name=items]")  

let selectedItems = []                          // let = variavel que pode mudar de valor depois (o const nao) - array que recebera os itens selecionados

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected") //elemento itemLi, na lista de classe dele, existe a classe "selected"? se sim, remova, se nao, cria (isso que o toggle faz - cria/remove)

    const itemId = itemLi.dataset.id  

    console.log('ITEM ID: ',itemId)

    // verificar se existem itens selecionados - se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId     // isso retorna true ou false
        return itemFound
    })

    //se ja estiver selecionado
    if(alreadySelected >=0){
        //tirar da selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {        // se nao  estiver selecionado
        //adicionar a selecao
        selectedItems.push(itemId)  //adiciona elemento dentro do array
    }

    console.log('selecteditems: ',selectedItems)


    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
