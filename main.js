const add = document.getElementById("add");
    const ul = document.getElementById("ul");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const li = document.createElement("li");
        li.textContent = key;

        ul.appendChild(li);
    }

    add.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o envio do formulário

        const item = document.getElementById("list").value;

        if (item) { // Verifica se o input não está vazio
            const li = document.createElement("li");
            li.textContent = item; // Define o texto do <li>

            for (let i = 0; i < ul.children.length; i++) {
                if (item == ul.children[i].textContent) {
                    alert("Item já adicionado! Por favor digite outro item.");

                    document.getElementById("list").value = "";
                    return; // Sai da função para não adicionar o item novamente
                }
            };

            
            localStorage.setItem(item, item); // Adiciona o item ao localStorage (chave, valor)
            
            ul.appendChild(li); // Adiciona o <li> à lista
            alert("Item adicionado com sucesso!"); // Alerta de sucesso

            document.getElementById("list").value = "";
        }
    });