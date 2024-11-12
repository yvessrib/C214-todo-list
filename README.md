# C214 - Seminário Vitest

Esse multirepo tem como objetivo demonstrar à utilização do framework de testes Vitest em duas aplicações diferentes, uma Frontend e a outra Backend. A aplicação Backend é uma API de checkin em uma academia e a de Frontend é uma Todo List.

## Github actions
Este projeto usa GitHub Actions para CI. Sempre que um novo push ou pull request é feito na branch main.

### Estado dos CI's
[![Run Unit Tests Backend](https://github.com/yvessrib/C214-todo-list/actions/workflows/test_backend.yml/badge.svg)](https://github.com/yvessrib/C214-todo-list/actions/workflows/test_backend.yml)
[![Run Unit Tests Frontend](https://github.com/yvessrib/C214-todo-list/actions/workflows/test_frontend.yml/badge.svg)](https://github.com/yvessrib/C214-todo-list/actions/workflows/test_frontend.yml)

## Executando o projeto

1. Escolher qual respositório utilizar
```
  cd backend
```
```
  cd frontend
```

2. Intalar as dependências
```
  npm i
```

3. Executar o projeto
```
  npm run start:dev # backend
```
```
  npm run dev # frontend
```

4. Executar testes
```
  npm run test # ambos repositórios
```

