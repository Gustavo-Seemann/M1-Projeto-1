const botaoAdd = document.getElementById('btnAdd')
const botaoRemove = document.getElementById('btnRemove')
const botaoLimpa = document.getElementById('btnLimpa')
const nomeProduto = document.getElementById('nomeProd');
const ul = document.getElementById('lista');

let listaUm = [];

const listaJSON = localStorage.getItem('listaUm');

if (listaJSON) {
    listaUm = JSON.parse(listaJSON);
    atualizaTela();
}

function retiraItem(id) {
    const novaLista = [];
    listaUm.forEach(function (item) {
    if (item.id !== id) {
        novaLista.push(item);
    }
    })
    listaUm = novaLista;
    atualizaTela();
    salvaStorage();
}

function atualizaTela() {
    ul.innerHTML = '';
    listaUm.forEach(function (item) {
    const btn = document.createElement('button');
    btn.innerHTML = 'x';
    btn.onclick = function () {
        retiraItem(item.id);
    }
    const li = document.createElement('li');
    li.id = item.id;
    li.innerHTML = item.name;
    li.appendChild(btn);
    ul.appendChild(li);
    });
}

function salvaStorage() {
    const listaJSON = JSON.stringify(listaUm);
    localStorage.setItem('listaUm', listaJSON);
}

function adicionaItem() {
    if (nomeProduto.value) {
        var indice = 1;
        listaUm.forEach(function (item) {
            while (indice <= item.id){
                indice++
            }});
        listaUm.push({
            id: indice,
            name: nomeProduto.value,
            preco: 0
    });
    nomeProduto.value = '';
    atualizaTela();
    salvaStorage();
    } else {
        alert('Verifique o nome do produto!');
    }
}

botaoAdd.addEventListener('click', adicionaItem);

nomeProduto.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
    adicionaItem();
    }
});