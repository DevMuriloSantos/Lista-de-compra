const add = document.getElementById("add");
const ul = document.getElementById("ul");
const lixeira = document.getElementById("lixeira")

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const li = document.createElement("li");

    li.textContent = key;
    li.innerHTML += '<input type="checkbox" name="check" class="marcado">';
    ul.appendChild(li);
}

add.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const item = document.getElementById("list").value;

    if (item) { // Verifica se o input não está vazio
        let li = document.createElement("li");
        li.textContent = item; // Define o texto do <li>

        for (let i = 0; i < ul.children.length; i++) {
            if (item == ul.children[i].textContent) {
                alert("Item já adicionado! Por favor digite outro item.");

                document.getElementById("list").value = "";
                return; // Sai da função para não adicionar o item novamente
            }
        };


        localStorage.setItem(item, item); // Adiciona o item ao localStorage (chave, valor)

        li.innerHTML += '<input type="checkbox" name="marcado" class="marcado">';
        li.classList.add('li')
        ul.appendChild(li); // Adiciona o <li> à lista
        alert("Item adicionado com sucesso!"); // Alerta de sucesso

        document.getElementById("list").value = "";
    }
});

let marcado = document.querySelectorAll('.marcado');
let li = document.querySelector("li");

ul.addEventListener('change', function (e) {
    // Se o checkbox foi marcado, aplica o line-through no <li> correspondente
    if (e.target.checked) {
        e.target.parentElement.style.textDecoration = 'line-through';

        lixeira.style.color = "#a72525"
    }

    else {
        e.target.parentElement.style.textDecoration = '';
        lixeira.style.color = "white"
    }
});

lixeira.addEventListener('click', function () {
    const pergunta = prompt("Deseja realmente apagar os itens selecionados ?")

    if (pergunta == "sim") {
        // Seleciona todos os checkboxes marcados
        const marcados = document.querySelectorAll('.marcado:checked');
        marcados.forEach(checkbox => {
            const li = checkbox.parentElement;
            const item = li.childNodes[0].textContent.trim();
            localStorage.removeItem(item); // Remove do localStorage
            li.remove(); // Remove o <li> da lista
        });

        alert("Item(s) removido com sucesso!")
    }
});

