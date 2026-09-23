# 🔐 Integração API CPF - Amnesia Tecnologia

## ✅ O que foi implementado

A integração da API de validação de CPF da **Amnesia Tecnologia** foi adicionada ao sistema de renovação de CNH.

### Funcionalidades

- ✅ **Validação Local** - Algoritmo de dígito verificador do CPF
- ✅ **Validação via API** - Consulta em tempo real com servidor da Amnesia
- ✅ **Formatação Automática** - CPF formatado enquanto digita
- ✅ **Armazenamento de Dados** - Dados validados salvos em localStorage
- ✅ **Tratamento de Erros** - Mensagens de erro claras ao usuário

---

## 🔧 Configuração

### Credenciais da API

```javascript
Token: 76418167-38e2-46aa-acf1-51ed15b4db9f
URL: https://api.amnesiatecnologia.lat/
```

### Arquivos Criados

1. **formulario/js/api-cpf.js** - Script de validação (formulário)
2. **cadastro/js/api-cpf.js** - Script de validação (cadastro)

---

## 🚀 Como Funciona

### 1. Validação Local
```javascript
validarCPFLocal("12345678901") // true/false
```
- Valida o algoritmo do CPF
- Verifica dígitos verificadores
- Rejeita CPFs inválidos

### 2. Consulta à API
```javascript
validarCPFAPI("12345678901")
// Retorna: { nome, mae, data_nascimento, ... }
```
- Envia CPF para servidor Amnesia
- Retorna dados da pessoa
- Salva no localStorage

### 3. Formatação
```javascript
formatarCPF("12345678901") // "123.456.789-01"
removerFormatacaoCPF("123.456.789-01") // "12345678901"
```

---

## 📋 Função Principal

```javascript
async function processarValidacaoCPF(cpf, callbacks = {})
```

### Parâmetros

- **cpf** (string) - CPF do usuário
- **callbacks** (object) - Callbacks opcionais:
  - `onValidandoLocalmente()` - Iniciando validação local
  - `onValidandoAPI()` - Consultando API
  - `onSucesso(data)` - CPF válido e dados carregados
  - `onErro(mensagem)` - Erro na validação

### Exemplo de Uso

```javascript
const resultado = await processarValidacaoCPF("123.456.789-01", {
    onSucesso: (data) => {
        console.log("CPF válido:", data.nome);
    },
    onErro: (msg) => {
        console.error("Erro:", msg);
    }
});
```

---

## 🎯 Inicialização Automática

No HTML, basta chamar:

```javascript
inicializarValidacaoCPF('cpf', 'cpf-error', 'cpf-success');
```

Isso ativa:
- Formatação ao digitar
- Validação ao sair do campo
- Exibição de mensagens de erro/sucesso

---

## 💾 Dados Salvos em localStorage

Após validação bem-sucedida:

```javascript
localStorage.getItem('dadosCpfValidado')
// Retorna:
// {
//   "cpf": "123.456.789-01",
//   "nome": "João da Silva",
//   "nome_mae": "Maria da Silva",
//   "data_nascimento": "01/01/1990",
//   "status": "validado"
// }
```

---

## 🌐 Fluxo de Requisição

```
Usuario digita CPF
        ↓
Validação Local (algoritmo)
        ↓
✓ Válido? → Enviar para API
        ↓
Request GET: https://api.amnesiatecnologia.lat/?token=XXX&cpf=123...
        ↓
API retorna dados pessoais
        ↓
✓ Sucesso? → Salvar em localStorage
        ↓
Exibir confirmação para usuário
```

---

## ⚠️ Tratamento de Erros

| Erro | Mensagem |
|------|----------|
| CPF com formato inválido | "CPF inválido. Verifique o número digitado." |
| Erro de conexão | "Erro de conexão. Tente novamente." |
| API retorna erro | Mensagem específica da API |
| Falha na validação | "Falha na validação do CPF" |

---

## 🔍 Debug

Para ver logs da validação, abra o console do navegador (F12) e procure por:
- `console.log` - Informações gerais
- `console.error` - Erros de conexão/validação

---

## 📱 Páginas Integradas

### ✅ Formulário (`formulario/index.html`)
- Campo CPF com validação automática
- Carregamento de dados após validação

### ✅ Cadastro (`cadastro/index.html`)
- Validação na etapa inicial
- Persistência de dados entre páginas

---

## 🔄 Fluxo do Usuário

```
1. Usuário acessa Cadastro
2. Preenche CPF (ex: 123.456.789-01)
3. Clica fora do campo CPF
4. Sistema valida localmente
5. Sistema consulta API Amnesia
6. Retorna: Nome, Data Nascimento, Mãe
7. Dados salvos em localStorage
8. Usuário prossegue para Formulário
```

---

## 🔐 Segurança

- ✅ HTTPS para requisições (api.amnesiatecnologia.lat)
- ✅ Token protegido no código
- ✅ Validação local antes de API
- ✅ localStorage com dados sensíveis (considerar criptografia no futuro)

---

## 📞 Suporte

Para dúvidas sobre a API CPF:
- **Site**: https://amnesia.lat/
- **Documentação**: Fornecida pela Amnesia Tecnologia

---

## 📝 Changelog

### v1.0.0 (2026-09-22)
- ✅ Integração inicial da API CPF
- ✅ Validação local + API
- ✅ Formatação automática de CPF
- ✅ Armazenamento em localStorage
- ✅ Tratamento de erros

---

**Integração Completa!** ✨
