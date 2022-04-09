const botaoAdd = document.getElementById('btnAdd')
const botaoRemove = document.getElementById('btnRemove')
const botaoLimpa = document.getElementById('btnLimpa')
const nomeProduto = document.getElementById('nomeProd');
const ul = document.getElementById('lista');
const msgVazio = document.getElementById('pVazio')

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

function toggleProduto(id) {
    listaUm.forEach(function (item){
        if (item.id == id){
            item.status = true;
            item.preco = prompt(`Qual foi o preço pago no ${item.name}?`);
            }
    })
    salvaStorage();
}

function removeComprado() {
    listaUm.forEach(function (item){
        if (item.status == true){
            retiraItem(item.id);
        }
    })
}

function atualizaTela() {
    if (listaUm.length == 0){
        msgVazio.innerHTML = 'Você ainda não adicionou nenhum produto!'} else{
            msgVazio.innerHTML = '';
        }
    ul.innerHTML = '';
    listaUm.forEach(function (item) {
        const checkbox = criaCheckbox(item.status);
        checkbox.onclick = function (){
            toggleProduto(item.id);
        }
        const btn = document.createElement('button');
        btn.innerHTML = 'x';
        btn.onclick = function () {
            retiraItem(item.id);
        }
        const li = document.createElement('li');
        li.id = item.id;
        li.innerHTML = item.name;
        li.appendChild(checkbox);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function criaCheckbox(status, listener) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = status;
    checkbox.onclick = listener;
    return checkbox;
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
            preco: 0,
            status: false
    });
    nomeProduto.value = '';
    atualizaTela();
    salvaStorage();
    } else {
        alert('Verifique o nome do produto!');
    }
}

botaoRemove.addEventListener('click', removeComprado);
botaoAdd.addEventListener('click', adicionaItem);

nomeProduto.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
    adicionaItem();
    }
});