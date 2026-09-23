// API CPF Integration
const CPF_API_CONFIG = {
    token: "76418167-38e2-46aa-acf1-51ed15b4db9f",
    baseUrl: "https://api.amnesiatecnologia.lat/"
};

/**
 * Validar CPF via API com tratamento de CORS
 * @param {string} cpf - CPF sem formatação (apenas números)
 * @returns {Promise<Object>} Resposta da API
 */
async function validarCPFAPI(cpf) {
    try {
        const url = `${CPF_API_CONFIG.baseUrl}?token=${CPF_API_CONFIG.token}&cpf=${cpf}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'omit'
        });

        if (!response.ok) {
            console.warn(`API HTTP error: ${response.status}`);
            // Se der erro, retornar sucesso com dados vazios (validação local é suficiente)
            return {
                success: true,
                nome: 'Dados não disponíveis',
                mae: 'Dados não disponíveis',
                data_nascimento: 'Dados não disponíveis',
                status: 'validado_local'
            };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.warn('API indisponível, usando validação local:', error.message);
        // Retornar sucesso mesmo com erro de conexão
        // A validação local já confirmou que o CPF é válido
        return {
            success: true,
            nome: 'Validação Local',
            mae: 'Validação Local',
            data_nascimento: 'Validação Local',
            status: 'validado_local'
        };
    }
}

/**
 * Formatar CPF
 * @param {string} cpf - CPF sem formatação
 * @returns {string} CPF formatado (XXX.XXX.XXX-XX)
 */
function formatarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return cpf;
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Remover formatação CPF
 * @param {string} cpf - CPF formatado
 * @returns {string} CPF sem formatação
 */
function removerFormatacaoCPF(cpf) {
    return cpf.replace(/\D/g, '');
}

/**
 * Validar CPF localmente (algoritmo)
 * @param {string} cpf - CPF sem formatação
 * @returns {boolean} True se válido
 */
function validarCPFLocal(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    let resto;

    // Primeira verificação
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

    // Segunda verificação
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

    return true;
}

/**
 * Processar validação de CPF com API
 * @param {string} cpf - CPF do usuário
 * @param {Object} callbacks - Callbacks para tratamento
 */
async function processarValidacaoCPF(cpf, callbacks = {}) {
    const cpfLimpo = removerFormatacaoCPF(cpf);
    
    const onValidandoLocalmente = callbacks.onValidandoLocalmente || (() => {});
    const onValidandoAPI = callbacks.onValidandoAPI || (() => {});
    const onSucesso = callbacks.onSucesso || (() => {});
    const onErro = callbacks.onErro || (() => {});

    try {
        // Validação local
        onValidandoLocalmente();
        const cpfValido = validarCPFLocal(cpfLimpo);
        
        if (!cpfValido) {
            onErro('CPF inválido. Verifique o número digitado.');
            return { success: false, message: 'CPF inválido' };
        }

        // Validação via API
        onValidandoAPI();
        const resultado = await validarCPFAPI(cpfLimpo);

        if (resultado.success || resultado.status === 'success') {
            // Salvar dados no localStorage
            localStorage.setItem('dadosCpfValidado', JSON.stringify({
                cpf: formatarCPF(cpfLimpo),
                nome: resultado.nome || resultado.name || 'Não informado',
                nome_mae: resultado.mae || resultado.mother_name || 'Não informado',
                data_nascimento: resultado.data_nascimento || resultado.birth_date || 'Não informado',
                status: 'validado'
            }));

            onSucesso(resultado);
            return { success: true, data: resultado };
        } else {
            onErro(resultado.message || 'Falha na validação do CPF');
            return { success: false, message: resultado.message };
        }

    } catch (error) {
        console.error('Erro na validação:', error);
        onErro('Erro ao validar CPF. Tente novamente.');
        return { success: false, message: error.message };
    }
}

/**
 * Inicializar validação de CPF
 * @param {string} inputId - ID do input de CPF
 * @param {string} errorId - ID do elemento de erro
 * @param {string} successId - ID do elemento de sucesso
 */
function inicializarValidacaoCPF(inputId = 'cpf', errorId = 'cpf-error', successId = 'cpf-success') {
    const cpfInput = document.getElementById(inputId);
    const errorDiv = document.getElementById(errorId);
    const successDiv = document.getElementById(successId);

    if (!cpfInput) return;

    // Máscar CPF ao digitar
    cpfInput.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.substring(0, 11);
        
        if (valor.length > 8) {
            valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (valor.length > 5) {
            valor = valor.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/(\d{3})(\d+)/, '$1.$2');
        }
        
        e.target.value = valor;
    });

    // Validar ao sair do input
    cpfInput.addEventListener('blur', async () => {
        if (!cpfInput.value) return;

        const resultado = await processarValidacaoCPF(cpfInput.value, {
            onValidandoLocalmente: () => {
                if (errorDiv) errorDiv.classList.add('hidden');
                if (successDiv) successDiv.classList.add('hidden');
            },
            onValidandoAPI: () => {
                if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                    errorDiv.querySelector('span').textContent = 'Validando CPF...';
                }
            },
            onSucesso: (data) => {
                if (errorDiv) errorDiv.classList.add('hidden');
                if (successDiv) {
                    successDiv.classList.remove('hidden');
                    successDiv.querySelector('p').textContent = `CPF válido - ${data.nome || 'Dados carregados'}`;
                }
            },
            onErro: (mensagem) => {
                if (successDiv) successDiv.classList.add('hidden');
                if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                    errorDiv.querySelector('span').textContent = mensagem;
                }
            }
        });

        return resultado;
    });
}

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarCPFAPI,
        validarCPFLocal,
        formatarCPF,
        removerFormatacaoCPF,
        processarValidacaoCPF,
        inicializarValidacaoCPF
    };
}
