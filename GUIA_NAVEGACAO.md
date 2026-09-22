# 🔗 Guia de Navegação - Renovação de CNH

## Fluxo de Navegação Implementado

A seguir está o fluxo de navegação completo entre os índices das pastas:

```
┌─────────────────────────────────────────────────────────────────┐
│                    INDEX PRINCIPAL                              │
│              (cnh renovacao/index.html)                          │
│                                                                 │
│  • Página de boas-vindas e informações                         │
│  • Botão: "INICIAR RENOVAÇÃO" → cadastro/                      │
│  • Mapa visual das 4 etapas do processo                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    [INICIAR RENOVAÇÃO]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                  ETAPA 1: CADASTRO                              │
│          (cnh renovacao/cadastro/index.html)                    │
│                                                                 │
│  • Termos e Condições                                          │
│  • Campo de CEP para validação                                 │
│  • Botão: "Próxima Etapa (Formulário)" → formulario/           │
│  • Fluxo visual: ✓ Cadastro → 2 Formulário → 3 Comprovante... │
└─────────────────────────────────────────────────────────────────┘
                            ↓
              [Próxima Etapa (Formulário)]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                 ETAPA 2: FORMULÁRIO                             │
│        (cnh renovacao/formulario/index.html)                    │
│                                                                 │
│  • Identificação do Condutor                                   │
│  • Validação de Dados (CPF, Nome, Filiação, etc)              │
│  • Validação de Elegibilidade                                  │
│  • Botão: "Próxima Etapa (Comprovante)" → comprovante/         │
│  • Fluxo visual: ✓ Cadastro → ✓ Formulário → 3 Comprovante... │
└─────────────────────────────────────────────────────────────────┘
                            ↓
            [Próxima Etapa (Comprovante)]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│               ETAPA 3: COMPROVANTE                              │
│        (cnh renovacao/comprovante/index.html)                   │
│                                                                 │
│  • Comprovante de Solicitação                                  │
│  • Dados Verificados pelo DETRAN                               │
│  • Recebimento de E-mail e Telefone                            │
│  • Botão 1: "Salvar E-mail"                                    │
│  • Botão 2: "Próxima Etapa (Pagamento)" → pagamento/           │
│  • Fluxo visual: ✓ Cadastro → ✓ Formulário → ✓ Comprovante... │
└─────────────────────────────────────────────────────────────────┘
                            ↓
            [Próxima Etapa (Pagamento)]
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│              ETAPA 4: PAGAMENTO (FINAL)                         │
│          (cnh renovacao/pagamento/index.html)                   │
│                                                                 │
│  • Taxa de Renovação: R$ 145,67                               │
│  • Dados do Condutor                                           │
│  • Botão 1: "Voltar" → comprovante/                            │
│  • Botão 2: "PAGAR TAXA DE RENOVAÇÃO"                          │
│  • Fluxo visual: ✓ Cadastro → ✓ Formulário → ✓ Comprovante... │
│                   → ✓ Pagamento [CONCLUÍDO]                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    [PAGAMENTO REALIZADO]
```

## Detalhes da Implementação

### 1️⃣ **Index Principal** (cnh renovacao/index.html)
- **Novo Elemento**: Mapa de Navegação visual com 4 etapas
- **Links Adicionados**:
  - Botão principal "INICIAR RENOVAÇÃO" → `cadastro/`
  - Cada card de etapa contém link direto para acessar

### 2️⃣ **Cadastro** (cnh renovacao/cadastro/index.html)
- **Novo Elemento**: Fluxo de navegação visual
- **Botão Atualizado**: "Próxima Etapa (Formulário)"
- **Script Atualizado**: Navega para `../formulario/index.html`

### 3️⃣ **Formulário** (cnh renovacao/formulario/index.html)
- **Botão Atualizado**: Texto agora diz "Próxima Etapa (Comprovante)"
- **Script Atualizado**: Navega para `../comprovante/index.html`
- **Botão Voltar**: Retorna para `../cadastro/index.html`

### 4️⃣ **Comprovante** (cnh renovacao/comprovante/index.html)
- **Novo Botão**: "Próxima Etapa (Pagamento)"
- **Dois Botões**: 
  - Salvar E-mail (simples)
  - Próxima Etapa (navegação)
- **Script Adicionado**: Função para navegar para `../pagamento/index.html`

### 5️⃣ **Pagamento** (cnh renovacao/pagamento/index.html)
- **Novo Elemento**: Fluxo de navegação visual completo (todas 4 etapas)
- **Botão Voltar**: Retorna para `../comprovante/index.html`
- **Botão Principal**: "PAGAR TAXA DE RENOVAÇÃO"
- **Layout Melhorado**: Dois botões lado a lado

## Como Usar

1. Abra o **index.html** principal (cnh renovacao/index.html)
2. Clique em "INICIAR RENOVAÇÃO" ou em qualquer card de etapa
3. Siga o fluxo sequencialmente através de cada página
4. Use os botões de navegação para avançar ou voltar
5. No final, complete o pagamento

## Armazenamento de Dados

Os dados são armazenados em `localStorage` para manter a continuidade:
- CEP
- Dados do CPF validado
- E-mail e Telefone do usuário
- Dados do CNH selecionada

## Rotas Relativas Utilizadas

```
cadastro/       →  ../formulario/index.html
formulario/     →  ../comprovante/index.html
comprovante/    →  ../pagamento/index.html
pagamento/      →  ../comprovante/index.html (Voltar)
```

---

✅ **Navegação Completa Implementada!**
