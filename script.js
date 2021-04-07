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

const exibirInput = () => {
    const mostrar = inputPesquisar.classList.contains('d-block');
    if (mostrar) {
        inputPesquisar.classList.remove('d-block');
        btnPesquisar.classList.replace('btn-pesquisa-aberta', 'btn-pesquisa-fechada');
    } else {
        inputPesquisar.classList.add('d-block');
        btnPesquisar.classList.replace('btn-pesquisa-fechada', 'btn-pesquisa-aberta');
    }
};

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
};

const criarNavation = (classe) => {
    const nav = document.createElement('nav');
    nav.classList.add(classe);
    return nav;
};

const criarDiv = (classe) => {
    const div = document.createElement('div');
    if (classe) {
        div.classList.add(classe);
    }
    return div;
};

const criarBtn = (classe) => {
    const btn = document.createElement('button');
    btn.classList.add(classe);
    return btn;
};

const criarNav = () => {
    const btnRoxo = criarBtn('btn-roxo');
    const btnLaranja = criarBtn('btn-laranja');
    const btnAmarelo = criarBtn('btn-amarelo');
    const btnMarrom = criarBtn('btn-marrom');
    const btnVermelho = criarBtn('btn-vermelho');
    const btnVerde = criarBtn('btn-verde');
    const div = criarDiv();
    div.appendChild(btnRoxo);
    div.appendChild(btnLaranja);
    div.appendChild(btnAmarelo);
    div.appendChild(btnMarrom);
    div.appendChild(btnVermelho);
    div.appendChild(btnVerde);

    const btnExcluir = criarBtn('btn-remover');
    const btnFechar = criarBtn('btn-fechar');
    const nav = criarNavation('navation');
    nav.appendChild(div);
    nav.appendChild(btnExcluir);
    nav.appendChild(btnFechar);
    return nav;
};

const criarElementNota = (nota) => {
    const conteudo = criarDiv('nota');
    const texto = document.createTextNode(nota);
    conteudo.appendChild(texto);
    const conteiner = criarDiv('d-block');
    const main = document.querySelector('main');
    conteiner.appendChild(criarNav());
    conteiner.appendChild(conteudo);
    main.appendChild(conteiner);
};

const salvarLocal = (nota) => {
    notas.push(nota);
    localStorage.setItem('notas', JSON.stringify(notas));
    location.reload();
};

const restaurarNotas = () => {
    const itens = localStorage.getItem('notas');
    const arrayItens = JSON.parse(itens);
    for (let index = 0; index < arrayItens.length; index++) {
        notas.push(arrayItens[index]);
        criarElementNota(arrayItens[index]);
    }
};

const expandirNota = () => {
    console.log('expandir');
};

const removerNota = () => {
    console.log('remover');
};

const ativarEventos = () => {
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
};

const trocarCor = (classe) => {
    const notaAberta = document.querySelector('.open');
    notaAberta.className = `open d-block ${classe}`;
};

restaurarNotas();
ativarEventos();