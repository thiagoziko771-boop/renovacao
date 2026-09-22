# 🇧🇷 Renovação de CNH - Sistema Online

Sistema oficial de renovação de Carteira Nacional de Habilitação do Governo Federal.

## 📋 Sobre o Projeto

Plataforma 100% online para renovação de CNH com validação de dados, geração de comprovantes e pagamento via PIX.

## 🚀 Fluxo de Renovação

1. **Cadastro** - Validação de dados pessoais e CEP
2. **Formulário** - Preenchimento de informações da CNH
3. **Comprovante** - Geração de comprovante de solicitação
4. **Pagamento** - Pagamento da taxa via PIX

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3 + Tailwind CSS** - Estilização
- **JavaScript** - Interatividade
- **Font Awesome** - Ícones
- **LocalStorage** - Persistência de dados

## 📁 Estrutura do Projeto

```
cnh renovacao/
├── index.html              # Página principal
├── cadastro/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── formulario/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── comprovante/
│   ├── index.html
│   ├── css/
│   └── js/
├── pagamento/
│   ├── index.html
│   ├── css/
│   └── js/
├── css/
├── fonts/
├── images/
└── js/
```

## 🔗 Links da Navegação

- **Index Principal**: `/`
- **Cadastro**: `/cadastro/index.html`
- **Formulário**: `/formulario/index.html`
- **Comprovante**: `/comprovante/index.html`
- **Pagamento**: `/pagamento/index.html`

## 💾 Dados Armazenados

Os dados são salvos em `localStorage`:
- `cep` - CEP do usuário
- `userData` - Dados pessoais
- `emailUsuario` - Email
- `telefoneUsuario` - Telefone
- `dadosCpfValidado` - CPF validado
- `cnhSelecionada` - CNH selecionada

## 🚀 Como Fazer Deploy na Vercel

### 1. **Preparar o Git**

```bash
git init
git add .
git commit -m "Initial commit - CNH Renovation System"
```

### 2. **Fazer Push para GitHub**

```bash
git remote add origin https://github.com/thiagoziko771-boop/renovacao.git
git branch -M main
git push -u origin main
```

### 3. **Deploy na Vercel**

**Opção A - Via CLI:**
```bash
npm i -g vercel
vercel
```

**Opção B - Via Dashboard:**
1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione o repositório `renovacao`
5. Clique em "Deploy"

### 4. **Configurar Domínio (Opcional)**

1. Na Vercel, vá para "Settings" → "Domains"
2. Adicione seu domínio customizado

## 🧪 Teste Local

### Com Python:
```bash
cd "cnh renovacao"
python -m http.server 8000
```
Depois abra: `http://localhost:8000`

### Com Node.js:
```bash
npm install -g http-server
http-server
```

## 📝 Checklist de Testes

- [ ] Index principal carrega corretamente
- [ ] Botão "INICIAR RENOVAÇÃO" leva ao cadastro
- [ ] Cadastro → Formulário funciona
- [ ] Formulário → Comprovante funciona
- [ ] Comprovante → Pagamento funciona
- [ ] Botões "Voltar" funcionam
- [ ] LocalStorage salva dados
- [ ] Responsivo em mobile

## 🔒 Segurança

- Dados protegidos pela LGPD
- Formulários com validação
- Uso de HTTPS na produção
- LocalStorage para dados sensíveis

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através dos canais oficiais do DETRAN.

## 📄 Licença

Serviço oficial do Governo Federal do Brasil.

---

**Versão**: 1.0.0
**Última atualização**: 22/09/2026
