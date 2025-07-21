const add = document.getElementById("add");
const ul = document.getElementById("ul");
const lixeira = document.getElementById("lixeira")

let contagem = 0;

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const li = document.createElement("li");
    li.setAttribute('data-item', key); // Adiciona o atributo data-item
    li.innerHTML = `${key} <input type="checkbox" name="marcado" class="marcado">`;
    ul.appendChild(li);
}

add.addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const item = document.getElementById("list").value;

    if (item) { // Verifica se o input não está vazio
        let li = document.createElement("li");
        li.setAttribute('data-item', item); // Salva o nome do item

        li.innerHTML = `${item} <input type="checkbox" name="marcado" class="marcado">`;

        for (let i = 0; i < ul.children.length; i++) {
            if (item == ul.children[i].getAttribute('data-item')) {
                alert("Item já adicionado! Por favor digite outro item.");

                document.getElementById("list").value = "";
                return;
            }
        }


        localStorage.setItem(item, item); // Adiciona o item ao localStorage (chave, valor)

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
        contagem++
    }

    else {
        e.target.parentElement.style.textDecoration = '';

        contagem--
    }
});

lixeira.addEventListener('click', function () {
    let pergunta = null;

    if (contagem == 1) {
        pergunta = prompt("Há 1 item na lixeira! Deseja realmente apagar o item selecionados ?");
    } else if (contagem > 1) {
        pergunta = prompt(`Há ${contagem} itens na lixeira! Deseja realmente apagar os itens selecionados ?`);
    } else {
        pergunta = alert("Nenhum item selecionado!");
    }

    if (pergunta && pergunta.toLowerCase() == "sim") {
        const marcados = document.querySelectorAll('.marcado:checked');
        marcados.forEach(checkbox => {
            const li = checkbox.closest('li');

            const item = li.getAttribute('data-item');

            localStorage.removeItem(item);
            li.remove();
        });

        alert("Item(s) removido com sucesso!");
    }
});
