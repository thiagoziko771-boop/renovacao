# 🚀 Guia Completo - Deploy na Vercel

## ✅ Pré-requisitos

1. **Git** instalado: https://git-scm.com/download/win
2. **Conta GitHub**: https://github.com
3. **Conta Vercel**: https://vercel.com (pode fazer login com GitHub)

---

## 📋 Passo a Passo

### **PASSO 1: Preparar o Git Local**

Abra o PowerShell na pasta do projeto:

```powershell
cd "c:\Users\Pc\Desktop\PASTA TODOS\cnh renovacao"
```

Inicialize o Git:

```powershell
git init
git config user.name "Seu Nome"
git config user.email "seu.email@gmail.com"
```

Adicione todos os arquivos:

```powershell
git add .
```

Crie o primeiro commit:

```powershell
git commit -m "Initial commit - CNH Renovation System"
```

---

### **PASSO 2: Conectar ao GitHub**

Adicione o repositório remoto:

```powershell
git remote add origin https://github.com/thiagoziko771-boop/renovacao.git
```

Faça o push:

```powershell
git branch -M main
git push -u origin main
```

Se pedir credenciais do GitHub, use seu **token pessoal** (não a senha):
1. Vá em: https://github.com/settings/tokens
2. Crie um novo token com permissão `repo`
3. Cole o token quando pedir

---

### **PASSO 3: Deploy na Vercel**

**Opção A - Via Dashboard (Mais Fácil):**

1. Acesse: https://vercel.com/login
2. Clique em "Login with GitHub"
3. Autorize a Vercel
4. Clique em "+ New Project"
5. Procure por `renovacao`
6. Clique em "Import"
7. Configure:
   - **Project Name**: `renovacao-cnh`
   - **Framework**: `Other` (deixe em branco)
   - **Root Directory**: `./`
8. Clique em "Deploy"

**Aguarde 30-60 segundos...**

Pronto! Sua URL estará em `https://renovacao-cnh.vercel.app` (ou similar)

---

### **PASSO 4: Verificar se Funcionou**

1. Acesse a URL que a Vercel forneceu
2. Teste:
   - [ ] Página principal carrega
   - [ ] Clique em "INICIAR RENOVAÇÃO"
   - [ ] Navegue pelas etapas
   - [ ] Todos os links funcionam

---

## 🔗 URLs Importantes

| Etapa | URL |
|-------|-----|
| Principal | `/` |
| Cadastro | `/cadastro/index.html` |
| Formulário | `/formulario/index.html` |
| Comprovante | `/comprovante/index.html` |
| Pagamento | `/pagamento/index.html` |

---

## 📱 Teste em Mobile

Na dashboard da Vercel:
1. Copie a URL
2. Escaneie com seu celular
3. Verifique responsividade

---

## ❌ Se der erro:

### Erro: "Repository not found"
- Verifique se o repositório existe no GitHub
- Tente fazer push manualmente primeiro

### Erro: "Not Found"
- Verifique se `vercel.json` existe
- Limpe o cache da Vercel (Settings → Clear Cache)

### Arquivo não carrega
- Verifique se os caminhos relativos estão corretos
- Use `/` para caminhos absolutos

---

## 🔄 Próximas Atualizações

Quando fizer mudanças:

```powershell
git add .
git commit -m "Descrição da mudança"
git push
```

A Vercel faz deploy automático! 🚀

---

## 📞 Suporte

Para dúvidas sobre Vercel: https://vercel.com/docs
Para dúvidas sobre Git: https://git-scm.com/doc

---

**Boa sorte com o deploy!** 🎉
