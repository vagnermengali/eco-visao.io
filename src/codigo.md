# 7. Código fonte

O código da aplicação EcoVisão está nesta pasta (`src/`). É uma aplicação web em HTML, JavaScript e Tailwind CSS, com uma API simulada pelo JSON Server (`db.json`).

## Estrutura

| Arquivo / pasta | Conteúdo |
|---|---|
| `index.html` | Página inicial (pública) |
| `login.html`, `register.html`, `recover-password.html` | Autenticação (CSU01, CSU02, CSU03) |
| `learn.html` | Conteúdos educativos, acesso público (CSU04) |
| `profile.html` | Gerenciar perfil (CSU05) |
| `dashboard.html` | Dados ambientais e mapa interativo (CSU06, CSU07) |
| `my-alerts.html` | Gerenciar alertas ambientais (CSU08) |
| `forum.html` | Fórum com publicações e comentários (CSU09) |
| `moderation.html` | Moderação de conteúdos, para moderador e administrador (CSU10) |
| `admin.html` | Administração de usuários e conteúdos, para administrador (CSU11) |
| `reports.html` | Relatório mensal (RF-003) |
| `assets/js/` | Scripts de cada página e `common.js` (API, sessão, permissões, sidebar) |
| `assets/css/app.css` | Design system (cores, botões, cards, modais, etc.) |
| `db.json` | Banco de dados de exemplo: `users`, `alerts`, `posts`, `comments`, `contents` |

## Como executar

1. Instale o JSON Server e inicie a API dentro da pasta `src`:

   ```bash
   cd src
   npx json-server@0.17.4 --watch db.json --port 3000
   ```

2. Abra `index.html` no navegador (de preferência por um servidor estático, por exemplo `npx http-server src`).

## Contas de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@ecovisao.com | admin12345 |
| Moderador | moderador@ecovisao.com | moderador123 |
| Usuário | silvio@gmail.com | 123456789 |

## Regras de permissão

- Visitantes acessam apenas a página inicial, o login, o cadastro e os conteúdos educativos.
- Editar e excluir alertas, publicações e comentários é permitido somente ao dono do conteúdo ou ao administrador.
- Moderadores e administradores podem remover conteúdos inadequados na área de moderação.

> Projeto acadêmico: as senhas ficam em texto puro no `db.json` e as permissões são verificadas apenas no navegador. Não use em produção.
