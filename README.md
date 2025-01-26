# Brain Agriculture Web - Frontend

Este projeto é a interface web do Brain Agriculture, desenvolvida utilizando **React**, **Vite** e **Node.js 20**. Ele está preparado para ser executado tanto em ambiente local quanto em produção.

---

## Requisitos

- Node.js 20 instalado.
- NPM ou Yarn (dependendo da sua preferência).

---

## Configuração Inicial

1. **Configurar o Ambiente (.env):**
   - É **obrigatório** criar o arquivo `.env` antes de rodar o projeto.
   - Duplique o arquivo `.env.sample` e renomeie para `.env`.
   - Configure as variáveis necessárias, como a URL da API backend e outras credenciais ou chaves de configuração.

2. **Instalar Dependências:**
   - Utilize o gerenciador de pacotes de sua escolha:
     ```bash
     npm install
     # ou
     yarn install
     ```

3. **Executar o Projeto Localmente:**
   - Inicie o servidor de desenvolvimento com:
     ```bash
     npm run dev
     # ou
     yarn dev
     ```
   - O projeto estará disponível em [http://localhost:5173](http://localhost:5173).

---

## Comandos Disponíveis

### Instalar Dependências
```bash
npm install
# ou
yarn install
```

### Rodar em Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

### Build para Produção
```bash
npm run build
# ou
yarn build
```

### Rodar em Servidor de Produção Local
- Apos o build:
  ```bash
  npm run preview
  # ou
  yarn preview
  ```

### Limpar Dependências
- Para remover a pasta `node_modules` e fazer uma reinstalação limpa:
  ```bash
  npm run clean
  ```

---

## Estrutura do Projeto

- `App.tsx`: Componente principal que inicializa o aplicativo.
- `api/`: Configurações para comunicação com a API backend.
  - `index.ts`: Configuração de endpoints.
- `components/`: Componentes reutilizáveis.
  - `GenericTable/`: Componente para exibição de tabelas.
  - `Modal/`: Componente de modal padrão.
  - `ModalConfirm/`: Modal para confirmação de ações.
  - `Sidebar/`: Componente de barra lateral.
  - `TopBar/`: Componente de barra superior.
- `index.css`: Estilo global inicial.
- `main.tsx`: Arquivo principal de entrada.
- `pages/`: Páginas principais do aplicativo.
  - `auth/`: Páginas protegidas por autenticação.
    - `Crops/`, `Dashboard/`, `Farm/`, `Harvests/`, `PlantedCrops/`, `RuralProducer/`: Páginas específicas.
  - `public/`: Páginas de acesso público.
    - `Login/`: Tela de login.
- `redux/`: Gerenciamento de estado global.
  - `slices/`: Reducers e actions.
    - `authSlice.ts`, `themeSlice.ts`.
  - `store.ts`: Configuração da store.
- `router/`: Configuração de rotas.
  - `index.tsx`, `routes.tsx`.
- `services/`: Serviços para comunicação com a API.
  - `auth.ts`, `crops.ts`, `farms.ts`, `harvests.ts`, `planted_crops.ts`, `producers.ts`.
- `styles/`: Arquivos de estilo global.
  - `Global.css`: Estilos globais.
- `types/`: Tipagens e definições de interfaces.
  - `index.ts`: Tipos genéricos.
  - `services/auth.ts`: Tipagens relacionadas ao serviço de autenticação.
- `vite-env.d.ts`: Tipagens do ambiente do Vite.

---

## Configuração Adicional

1. **Lint e Formatação:**
   - Utilize os comandos abaixo para garantir que o código está formatado corretamente:
     ```bash
     npm run lint
     npm run format
     # ou
     yarn lint
     yarn format
     ```

2. **Variáveis de Ambiente:**
   - Certifique-se de que o arquivo `.env` está corretamente configurado, especialmente a URL da API backend.

---

## Boas Práticas

- Sempre crie o arquivo `.env` e mantenha suas credenciais seguras.
- Atualize as dependências regularmente para garantir compatibilidade e segurança.

---

## Suporte
Caso encontre problemas ou tenha dúvidas, sinta-se à vontade para abrir uma *issue* no repositório.

