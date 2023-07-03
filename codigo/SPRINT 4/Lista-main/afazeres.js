'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (produto, status, preco, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${produto}</div>
    <div>R$${preco}</div>
    <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparprodutos = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparprodutos();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.produto, item.status, item.preco, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        const novoPreco = prompt('Digite o preço:');
        if (novoPreco !== null) {
            banco.push({ 'produto': texto, 'status': '', 'preco': novoPreco });
            setBanco(banco);
            atualizarTela();
            evento.target.value = '';
        }
    }
}




const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }


}
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();