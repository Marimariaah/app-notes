const temp = JSON.parse(localStorage.getItem('chaveNota'));
const notas = [];

const btnPesquisar = document.querySelector('#pesquisar-button');
const inputPesquisar = document.querySelector('#pesquisar-input');
const addButton = document.querySelector('#add-button');
const addContainer = document.querySelector('.add-container');
const cancelar = document.querySelector('#add-cancel');
const salvar = document.getElementById('add-save');

btnPesquisar.addEventListener('click', function(e) {
    exibirInput();
});

addButton.addEventListener('click', (e) => {
    exibirContainer();
});

cancelar.addEventListener('click', (e) => {
    exibirContainer();
});

salvar.addEventListener('click', (e) => {
    salvarNota();
});

function exibirInput() {
    const mostrar = inputPesquisar.classList.contains('d-block');
    if (mostrar) {
        inputPesquisar.classList.remove('d-block');
        btnPesquisar.classList.replace('btn-pesquisa-aberta', 'btn-pesquisa-fechada');
    } else {
        inputPesquisar.classList.add('d-block');
        btnPesquisar.classList.replace('btn-pesquisa-fechada', 'btn-pesquisa-aberta');
    }
}

function exibirContainer() {
    const estaOculto = addContainer.classList.contains('d-none');
    if (estaOculto) {
        addContainer.classList.remove('d-none');
    } else {
        addContainer.classList.add('d-none');
    }
}

function salvarNota() {
    const nota = document.querySelector('#add-input').value;
    const cor = document.querySelector('#cor').value;
    salvarLocal(nota, cor);
}

function salvarLocal(nota, cor) {
    notas.push({
        nota,
        cor,
        data: new Date()
    });

    localStorage.setItem('chaveNota', JSON.stringify(notas));

    location.reload();
}

function expandirNota(evento) {
    evento.target.parentNode.classList.add('open');
    addButton.classList.add('d-none');
}

function removerNota(evento) {
    console.log('remover', evento);
}

function trocarCor(classe) {
    const notaAberta = document.querySelector('.open');
    notaAberta.className = `open d-block ${classe}`;
}

function criarElementoHtml(tagHtml, classes, texto, elementoHtmlFilhos) {
    const elementoHtml = document.createElement(tagHtml);

    if (classes) {
        elementoHtml.className = classes;
    }

    if (texto) {
        elementoHtml.innerText = texto;
    }
    if (elementoHtmlFilhos) {
        elementoHtml.append(...elementoHtmlFilhos);
    }

    return elementoHtml;
}

function criarNav() {
    const btnRoxo = criarElementoHtml('button', 'btn-roxo');
    const btnLaranja = criarElementoHtml('button', 'btn-laranja');
    const btnAmarelo = criarElementoHtml('button', 'btn-amarelo');
    const btnMarrom = criarElementoHtml('button', 'btn-marrom');
    const btnVermelho = criarElementoHtml('button', 'btn-vermelho');
    const btnVerde = criarElementoHtml('button', 'btn-verde');
    const div = criarElementoHtml('div', false, false, [
        btnRoxo,
        btnLaranja,
        btnAmarelo,
        btnMarrom,
        btnVermelho,
        btnVerde
    ]);

    const btnExcluir = criarElementoHtml('button', 'btn-remover');
    const btnFechar = criarElementoHtml('button', 'btn-fechar');
    const nav = criarElementoHtml('nav', 'navation', false, [div, btnExcluir, btnFechar]);

    return nav;
}

function criarElementNota(nota, cor) {
    const divNota = criarElementoHtml('div', 'nota', nota);
    const divConteinerNota = criarElementoHtml('div', `d-block ${cor}`, false, [criarNav(), divNota]);

    document.querySelector('main').appendChild(divConteinerNota);
}

function ativarEventos() {
    const btnRoxo = document.querySelectorAll('.btn-roxo');
    const btnLaranja = document.querySelectorAll('.btn-laranja');
    const btnAmarelo = document.querySelectorAll('.btn-amarelo');
    const btnMarrom = document.querySelectorAll('.btn-marrom');
    const btnVermelho = document.querySelectorAll('.btn-vermelho');
    const btnVerde = document.querySelectorAll('.btn-verde');
    const btnRemover = document.querySelectorAll('.btn-remover');
    const btnFechar = document.querySelectorAll('.btn-fechar');
    const divsNota = document.querySelectorAll('.nota');

    for (let index = 0; index < btnRoxo.length; index++) {
        btnRoxo[index].addEventListener('click', (evento) => {
            trocarCor('roxo');
        });
    }

    for (let index = 0; index < btnLaranja.length; index++) {
        btnLaranja[index].addEventListener('click', (evento) => {
            trocarCor('laranja');
        });
    }

    for (let index = 0; index < btnAmarelo.length; index++) {
        btnAmarelo[index].addEventListener('click', (evento) => {
            trocarCor('amarelo');
        });
    }

    for (let index = 0; index < btnMarrom.length; index++) {
        btnMarrom[index].addEventListener('click', (evento) => {
            trocarCor('marrom');
        });
    }

    for (let index = 0; index < btnVermelho.length; index++) {
        btnVermelho[index].addEventListener('click', (evento) => {
            trocarCor('vermelho');
        });
    }

    for (let index = 0; index < btnVerde.length; index++) {
        btnVerde[index].addEventListener('click', (evento) => {
            trocarCor('verde');
        });
    }

    for (let index = 0; index < btnFechar.length; index++) {
        btnFechar[index].addEventListener('click', (evento) => {
            const open = document.querySelector('.open');
            open.classList.remove('open');
            addButton.classList.remove('d-none');
        });
    }

    for (let index = 0; index < btnRemover.length; index++) {
        btnRemover[index].addEventListener('click', (evento) => {
            removerNota(evento);
        });
    }

    for (let index = 0; index < divsNota.length; index++) {
        divsNota[index].addEventListener('click', (evento) => {
            expandirNota(evento);
        });
    }
}

function restaurarNotas() {
    if (temp) {
        for (let index = 0; index < temp.length; index++) {
            notas.push(temp[index]);
            const { nota, cor } = temp[index];
            criarElementNota(nota, cor);
        }
    }
}

restaurarNotas();
ativarEventos();