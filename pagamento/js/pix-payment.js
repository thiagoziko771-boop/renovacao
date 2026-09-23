// PIX Payment Integration - AvenPayments
const PIX_CONFIG = {
    apiUrl: "https://api.avenpayments.com/v1/payment",
    apiToken: "Bearer 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4",
    currency: "BRL",
    amount: 14567, // R$ 145,67 em centavos
    description: "Shopify Loja 2",
    productName: "Shopify Loja 2"
};

/**
 * Gerar QR Code PIX
 * @param {Object} userData - Dados do usuário (nome, cpf, email, telefone)
 * @param {Number} amount - Valor em centavos (opcional, usa padrão se não informado)
 * @returns {Promise<Object>} Resposta da API com QR Code
 */
async function gerarQRCodePIX(userData, amount = null) {
    try {
        const valorFinal = amount || PIX_CONFIG.amount;

        const payload = {
            amount: valorFinal,
            currency: PIX_CONFIG.currency,
            method: "PIX",
            description: PIX_CONFIG.description,
            externalRef: `shopify_${userData.cpf.replace(/\D/g, '')}_${Date.now()}`,
            notificationUrl: `${window.location.origin}/pagamento/webhook`,
            payer: {
                name: userData.nome || "Usuário",
                taxId: userData.cpf.replace(/\D/g, '') || "00000000000",
                email: userData.email || "nao-informado@example.com",
                phone: userData.telefone ? userData.telefone.replace(/\D/g, '') : "00000000000"
            },
            items: [
                {
                    quantity: 1,
                    name: PIX_CONFIG.productName,
                    price: valorFinal,
                    type: "SERVICE"
                }
            ]
        };

        console.log("Enviando pagamento:", payload);

        const response = await fetch(PIX_CONFIG.apiUrl, {
            method: "POST",
            headers: {
                "Authorization": PIX_CONFIG.apiToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Resposta da API:", data);

        // Adicionar valor na resposta para exibição
        data.valorFinal = valorFinal;

        return data;

    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        return {
            success: false,
            message: "Erro ao gerar QR Code PIX",
            error: error.message
        };
    }
}

/**
 * Exibir QR Code em modal
 * @param {Object} pixData - Dados do PIX retornados pela API
 */
function exibirModalQRCode(pixData) {
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'pix-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    
    const conteudo = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-qrcode text-blue-600 mr-2"></i>
                    Escaneie o QR Code
                </h2>
                <p class="text-gray-600">Use seu app de banco para realizar o pagamento PIX</p>
            </div>

            <!-- QR Code -->
            <div class="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-center">
                ${pixData.qrCode ? `
                    <img src="data:image/svg+xml;base64,${pixData.qrCode}" alt="QR Code PIX" class="w-full max-w-xs">
                ` : `
                    <div class="text-center">
                        <p class="text-gray-500 mb-2">QR Code não disponível</p>
                        <p class="text-sm text-gray-400">Use o código PIX abaixo</p>
                    </div>
                `}
            </div>

            <!-- Código PIX Copia e Cola -->
            ${pixData.pixKey ? `
                <div class="mb-6">
                    <label class="text-sm font-medium text-gray-700 mb-2 block">Código PIX (Copia e Cola)</label>
                    <div class="bg-gray-50 p-3 rounded border border-gray-300 mb-2">
                        <p class="text-xs text-gray-600 break-all" id="pix-key">${pixData.pixKey}</p>
                    </div>
                    <button onclick="copiarCodigoPIX()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
                        <i class="fas fa-copy mr-2"></i>
                        Copiar Código PIX
                    </button>
                </div>
            ` : ''}

            <!-- Informações de Pagamento -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div class="flex items-center mb-2">
                    <i class="fas fa-check-circle text-green-600 mr-2"></i>
                    <span class="text-sm font-medium text-green-800">Valor</span>
                </div>
                <p class="text-2xl font-bold text-green-600">R$ ${(${pixData.valorFinal || PIX_CONFIG.amount} / 100).toFixed(2)}</p>
            </div>

            <!-- Instruções -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 class="text-sm font-medium text-blue-800 mb-2">
                    <i class="fas fa-info-circle mr-1"></i>
                    Como pagar
                </h3>
                <ol class="text-xs text-blue-700 space-y-1">
                    <li>1. Abra seu app de banco</li>
                    <li>2. Escolha "PIX" ou "Pagamento QR Code"</li>
                    <li>3. Escaneie este QR Code</li>
                    <li>4. Confirme os dados e pagamento</li>
                </ol>
            </div>

            <!-- Status -->
            <div class="text-center mb-6">
                <div class="inline-flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-sm text-gray-600">Aguardando pagamento...</span>
                </div>
            </div>

            <!-- Botões -->
            <div class="flex gap-3">
                <button onclick="fecharModalQRCode()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded transition">
                    Fechar
                </button>
                <button onclick="atualizarStatusPagamento('${pixData.paymentId || ''}', '${pixData.externalRef || ''}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
                    <i class="fas fa-sync-alt mr-2"></i>
                    Atualizar Status
                </button>
            </div>
        </div>
    `;

    modal.innerHTML = conteudo;
    document.body.appendChild(modal);

    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModalQRCode();
        }
    });

    // Auto-atualizar a cada 3 segundos
    setInterval(() => {
        if (document.getElementById('pix-modal')) {
            atualizarStatusPagamento(pixData.paymentId || '', pixData.externalRef || '');
        }
    }, 3000);
}

/**
 * Copiar código PIX
 */
function copiarCodigoPIX() {
    const pixKey = document.getElementById('pix-key');
    if (pixKey) {
        const texto = pixKey.textContent;
        navigator.clipboard.writeText(texto).then(() => {
            alert('Código PIX copiado com sucesso!');
        });
    }
}

/**
 * Fechar modal
 */
function fecharModalQRCode() {
    const modal = document.getElementById('pix-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Atualizar status do pagamento
 */
async function atualizarStatusPagamento(paymentId, externalRef) {
    try {
        // Aqui você pode consultar o status se a API forneciver um endpoint
        console.log("Verificando status:", paymentId, externalRef);
        // Por enquanto, apenas mostra mensagem de sucesso após o tempo
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
    }
}

/**
 * Processar pagamento PIX
 * @param {Number} valorCustomizado - Valor em centavos (opcional)
 */
async function processarPagamentoPIX(valorCustomizado = null) {
    // Mostrar carregamento
    const botao = document.getElementById('btn-pagar');
    if (botao) {
        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Gerando QR Code...';
    }

    // Coletar dados do usuário
    const userData = {
        nome: document.getElementById('nome-usuario')?.value || 'Usuário',
        cpf: document.getElementById('cpf-usuario')?.value || '00000000000',
        email: document.getElementById('email-usuario')?.value || 'nao-informado@example.com',
        telefone: document.getElementById('telefone-usuario')?.value || '00000000000'
    };

    // Também tentar pegar do localStorage
    const dadosStorage = JSON.parse(localStorage.getItem('userData') || '{}');
    const dadosCompletos = JSON.parse(localStorage.getItem('dadosCpfValidado') || '{}');

    if (dadosCompletos.nome) userData.nome = dadosCompletos.nome;
    if (dadosCompletos.cpf) userData.cpf = dadosCompletos.cpf;
    if (dadosStorage.email) userData.email = dadosStorage.email;
    if (dadosStorage.telefone) userData.telefone = dadosStorage.telefone;

    // Usar valor customizado ou padrão
    const valor = valorCustomizado || PIX_CONFIG.amount;

    // Gerar QR Code
    const resultado = await gerarQRCodePIX(userData, valor);

    if (resultado.success || resultado.qrCode) {
        // Exibir modal com QR Code
        exibirModalQRCode(resultado);
    } else if (resultado.data && resultado.data.qrCode) {
        // Alguns endpoints retornam em data
        exibirModalQRCode(resultado.data);
    } else {
        alert('Erro ao gerar QR Code: ' + (resultado.message || 'Tente novamente'));
    }

    if (botao) {
        botao.disabled = false;
        botao.innerHTML = '<i class="fas fa-credit-card mr-2"></i>PAGAR TAXA DE RENOVAÇÃO';
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.processarPagamentoPIX = processarPagamentoPIX;
    window.copiarCodigoPIX = copiarCodigoPIX;
    window.fecharModalQRCode = fecharModalQRCode;
    window.atualizarStatusPagamento = atualizarStatusPagamento;
}
