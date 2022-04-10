const botaoAdd = document.getElementById('btnAdd')
const botaoRemove = document.getElementById('btnRemove')
const botaoLimpa = document.getElementById('btnLimpa')
const nomeProduto = document.getElementById('nomeProd');
const ul = document.getElementById('lista');
const msgVazio = document.getElementById('pVazio');
const popup = document.querySelector('.popup-wrapper');
const botaoAddValor = document.getElementById('btnAddValor')
const produtoValor = document.getElementById('valorProduto')
const pPopUp = document.getElementById('pPopup')

let listaUm = [];

const listaJSON = localStorage.getItem('listaUm');

msgVazio.innerHTML = 'Você ainda não adicionou nenhum produto!'

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

function removeTudo(){
    while (listaUm.length) { 
        listaUm.pop(); 
    }
    localStorage.clear();
    location.reload();
}

function toggleProduto(id) {
    abrePopup()
    botaoAddValor.onclick = function () {
        listaUm.forEach(function (item){
            if (item.id == id){
                item.status = true;
                item.preco = produtoValor.value;
                item.name = `<s>${item.name}</s>`
                }
            })
            popup.style.display = 'none';
            produtoValor.value = '';
            salvaStorage()
            location.reload();
        }
}

function verificaStatus() {
    listaUm.forEach(function (item){
        if (item.preco !== NaN){
            item.status = false;
        }
    })
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
        li.innerHTML = `${item.name}`;
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
            preco: '',
            status: false
    });
    nomeProduto.value = '';
    atualizaTela();
    salvaStorage();
    } else {
        alert('Verifique o nome do produto!');
    }
}

function abrePopup() {
    popup.style.display = 'block';
}

function pegaValor() {
    botaoAddValor.onclick = function () {
        const valor = produtoValor.value;
    return valor}
}


botaoLimpa.addEventListener('click', removeTudo);
botaoRemove.addEventListener('click', removeComprado);
botaoAdd.addEventListener('click', adicionaItem);

nomeProduto.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
    adicionaItem();
    }
});

popup.addEventListener('click', event => {
    const ClassNamedoElementoClicado = event.target.classList[0]
    const ClassNames = ['popup-close', 'popup-wrapper']
    const deveFecharPopUp = ClassNames.some(ClassName => 
        ClassName === ClassNamedoElementoClicado)

    if (deveFecharPopUp){
        popup.style.display = 'none';
        verificaStatus();
        location.reload();
    }
})