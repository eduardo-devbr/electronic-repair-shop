<div align="center">

# 🔧 TechFix

**Sistema de Gestão para Assistência Técnica**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-000?style=flat-square&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![License](https://img.shields.io/badge/Licença-MIT-green?style=flat-square)](LICENSE)

> Projeto acadêmico desenvolvido para a disciplina **SPODWE2 – Desenvolvimento Web 2**.  
> Uma SPA completa para gerenciar clientes, técnicos, serviços e ordens de serviço de uma assistência técnica.

</div>

---

## ✨ Funcionalidades

| Módulo | O que faz |
|---|---|
| 📊 **Dashboard** | Visão geral com métricas de O.S., clientes recentes e ordens por status |
| 👥 **Clientes** | Cadastro completo com CRUD (criar, editar, excluir e buscar) |
| 🧑‍🔧 **Técnicos** | Gestão de técnicos com especialidade e status de disponibilidade |
| 🛠️ **Serviços** | Catálogo de serviços com categoria, descrição, duração e preço |
| 📋 **Ordens de Serviço** | CRUD completo de O.S. com detalhe, status e filtros |
| 📱 **Responsivo** | Layout adaptável para mobile com sidebar recolhível |

---

## 🖥️ Tecnologias

- **[React 18](https://reactjs.org/)** — biblioteca de UI com hooks modernos
- **[React Router v6](https://reactrouter.com/)** — roteamento client-side (SPA)
- **[Context API](https://react.dev/reference/react/useContext)** — estado global compartilhado entre páginas
- **[CSS Modules](https://github.com/css-modules/css-modules)** — estilos escopados por componente, sem conflitos
- **[Tabler Icons](https://tabler.io/icons)** — ícones via CDN

---

## 📁 Estrutura do projeto

```
techfix/
├── public/
│   └── index.html
└── src/
    ├── index.js              # Entry point
    ├── index.css             # CSS global e variáveis de tema
    ├── App.jsx               # Configuração das rotas
    ├── AppContext.jsx        # Context API — estado global
    ├── data.json             # Base de dados local (clientes, técnicos, serviços, O.S.)
    ├── components/
    │   ├── Layout.jsx        # Sidebar + Topbar (componente de layout)
    │   ├── Layout.module.css
    │   ├── UI.jsx            # Biblioteca interna: Modal, Button, Badge, Input...
    │   └── UI.module.css
    └── pages/
        ├── Dashboard.jsx     # Métricas e resumo
        ├── Clientes.jsx      # CRUD de clientes
        ├── Tecnicos.jsx      # CRUD de técnicos (cards)
        ├── Servicos.jsx      # CRUD de serviços (tabela)
        ├── Ordens.jsx        # CRUD de ordens de serviço + detalhe
        └── Sobre.jsx         # Sobre o projeto
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 16 ou superior
- npm (já vem com o Node)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/techfix.git

# 2. Entre na pasta do projeto
cd techfix

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

O projeto abrirá automaticamente em **http://localhost:3000** 🎉

---

## 🧠 Conceitos aplicados

Este projeto foi desenvolvido para praticar e demonstrar os seguintes conceitos de React:

- ✅ **SPA** (Single Page Application) — navegação sem recarregar a página
- ✅ **Componentização** — `Layout`, `UI` e páginas como componentes reutilizáveis
- ✅ **JSX** — sintaxe declarativa para construção da interface
- ✅ **Props** — passagem de dados entre componentes pai e filho
- ✅ **State** (`useState`) — controle de formulários, modais e filtros
- ✅ **React Router v6** — rotas com `<Routes>`, `<Route>`, `<NavLink>` e `useNavigate`
- ✅ **Context API** (`useContext`) — compartilhamento de estado global sem prop drilling
- ✅ **CSS Modules** — estilização escopada e organizada
- ✅ **CRUD completo** — criar, ler, atualizar e excluir em todas as entidades
- ✅ **Design responsivo** — sidebar com hamburger menu para telas pequenas

---

## 📚 Sobre o projeto

O **TechFix** é um sistema fictício de gestão para uma assistência técnica, desenvolvido como projeto final da disciplina **Desenvolvimento Web 2**. Os dados são carregados de um `data.json` local e gerenciados em memória via Context API, sem necessidade de back-end.

---

<div align="center">
  Desenvolvido com ❤️ para fins acadêmicos
</div>
