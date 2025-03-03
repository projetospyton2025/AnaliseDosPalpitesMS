﻿// VariÃ¡veis globais
const palpitesContainer = document.getElementById('palpites-container');
let palpiteCount = 1;

// FunÃ§Ã£o para inicializar os handlers da pÃ¡gina
function init() {
    // Adiciona event listeners para o primeiro conjunto de inputs
    adicionarEventListenersParaInputs(palpitesContainer.querySelector('.palpite-row'));
}

// Função para adicionar uma nova linha de palpites
function adicionarNovaPalpiteRow() {
    palpiteCount++;
    
    const novaPalpiteRow = document.createElement('div');
    novaPalpiteRow.className = 'palpite-row';
    novaPalpiteRow.innerHTML = `
        <div class="numeros-container">
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 1" required>
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 2" required>
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 3" required>
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 4" required>
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 5" required>
            <input type="number" min="1" max="60" class="numero-input" placeholder="Nº 6" required>
        </div>
        <div class="analise-container">
            <!-- Aqui serão exibidos os resultados da análise -->
        </div>
    `;
    
    palpitesContainer.appendChild(novaPalpiteRow);
    adicionarEventListenersParaInputs(novaPalpiteRow);
}

// FunÃ§Ã£o para adicionar event listeners aos inputs de uma linha de palpites
function adicionarEventListenersParaInputs(palpiteRow) {
    const inputs = palpiteRow.querySelectorAll('.numero-input');
    const analiseContainer = palpiteRow.querySelector('.analise-container');
    
    inputs.forEach((input, index) => {
        // ValidaÃ§Ã£o em tempo real
        input.addEventListener('input', function() {
            validarInput(input, inputs, index);
        });
        
        // Quando o Ãºltimo input for preenchido, adiciona uma nova linha
        if (index === inputs.length - 1) {
            input.addEventListener('change', function() {
                if (estaPreenchidoCorretamente(inputs)) {
                    // Faz a anÃ¡lise do palpite
                    analisarPalpite(inputs, analiseContainer);
                    
                    // Adiciona uma nova linha de palpites
                    adicionarNovaPalpiteRow();
                }
            });
        }
    });
}

// FunÃ§Ã£o para validar um input individual
function validarInput(input, allInputs, currentIndex) {
    // Limpa classes de validaÃ§Ã£o
    input.classList.remove('valid', 'invalid');
    
    const valor = parseInt(input.value);
    
    // Verifica se estÃ¡ vazio
    if (!input.value.trim()) {
        return;
    }
    
    // Verifica se estÃ¡ no intervalo vÃ¡lido
    if (isNaN(valor) || valor < 1 || valor > 60) {
        input.classList.add('invalid');
        return;
    }
    
    // Verifica se hÃ¡ nÃºmeros repetidos
    for (let i = 0; i < allInputs.length; i++) {
        if (i !== currentIndex && parseInt(allInputs[i].value) === valor) {
            input.classList.add('invalid');
            return;
        }
    }
    
    // Se passou por todas as validaÃ§Ãµes, marca como vÃ¡lido
    input.classList.add('valid');
}

// FunÃ§Ã£o para verificar se todos os inputs estÃ£o preenchidos corretamente
function estaPreenchidoCorretamente(inputs) {
    for (let input of inputs) {
        if (!input.value || input.classList.contains('invalid')) {
            return false;
        }
    }
    return true;
}

// FunÃ§Ã£o para analisar o palpite completo
function analisarPalpite(inputs, analiseContainer) {
    // Coleta os nÃºmeros
    const numeros = Array.from(inputs).map(input => parseInt(input.value));
    
    // Analisa quantos dÃ­gitos diferentes foram usados
    const digitosUsados = new Set();
    numeros.forEach(numero => {
        const digitos = numero.toString().padStart(2, '0').split('');
        digitos.forEach(digito => digitosUsados.add(digito));
    });
    
    // Cria o HTML da anÃ¡lise
    const analiseHTML = `
        <h3>Análise do Palpite</h3>
        <p><strong>Dígitos utilizados (${digitosUsados.size}):</strong></p>
        <div class="numeros-usados">
            ${Array.from(digitosUsados).sort().map(digito => 
                `<span class="numero-usado">${digito}</span>`
            ).join('')}
        </div>
    `;
    
    // Atualiza o container de anÃ¡lise
    analiseContainer.innerHTML = analiseHTML;
}

// Inicializa a pÃ¡gina quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);
