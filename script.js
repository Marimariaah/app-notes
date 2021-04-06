const notas = [];

const btnPesquisar = document.querySelector('#pesquisar-button');
const inputPesquisar = document.querySelector('#pesquisar-input');
const addButton = document.querySelector('#add-button');
const addContainer = document.querySelector('.add-container');
const cancelar = document.querySelector('#add-cancel');
const salvar = document.getElementById('add-save');

const nota = document.getElementsByTagName('div');

// nota[0].addEventListener('click', () => {
//     nota[0].classList.add('open');
// });

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
        btnPesquisar.classList.remove('btn-pesquisa-aberta');
        btnPesquisar.classList.add('btn-pesquisa-fechada');
    } else {
        inputPesquisar.classList.add('d-block');
        btnPesquisar.classList.remove('btn-pesquisa-fechada');
        btnPesquisar.classList.add('btn-pesquisa-aberta');
    }
}
const exibirContainer = () => {
    const estaOculto = addContainer.classList.contains('d-none');
    if (estaOculto) {
        addContainer.classList.remove('d-none');
    } else {
        addContainer.classList.add('d-none');
    }
};

const salvarNota = () => {
    const containerNota = document.querySelector('#add-input');
    criarElementNota(containerNota.value);
    salvarLocal(containerNota.value);

    containerNota.value = '';
    exibirContainer();
};

const criarElementNota = (nota) => {
    const conteudo = document.createElement('div');
    conteudo.classList.add('nota');
    const texto = document.createTextNode(nota);
    conteudo.appendChild(texto);
    const conteiner = document.createElement('div');
    conteiner.appendChild(conteudo);
    const main = document.querySelector('main');
    main.appendChild(conteiner);
};

const salvarLocal = (nota) => {
    notas.push(nota);
    localStorage.setItem('notas', JSON.stringify(notas));
};

const restaurarNotas = () => {
    const itens = localStorage.getItem('notas');
    const arrayItens = JSON.parse(itens);
    for (let index = 0; index < arrayItens.length; index++) {
        notas.push(arrayItens[index]);
        criarElementNota(arrayItens[index]);
    }
};

restaurarNotas();