const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Aprovado">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Reprovado">';
const atividades = [];
const notas = [];
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'

let linhas = ''; // armazena linhas da tabela

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Previene o comportamento padrão do evento submit, que seria recarregar a página.

    adicionarLinha();
    atualizarTabela();
    atualizarMediaFinal();
});

function adicionarLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>'; // representa o inicio de uma linha da tabela
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function calcularMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}

function atualizarMediaFinal() {
    const mediaFinal = calcularMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // toFixed para representar as casas decimais.
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}
