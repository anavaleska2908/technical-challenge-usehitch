<h1 align="center">
  Technical Challenge from Usehitch
</h1>
<h3 align="center">
  A proposta da aplicação, é criar um CRUD de to-dos, onde apenas o usuário logado poderá ter acesso ao sistema em si.
</h3>
<br/>

## **Tecnologias e bibliotecas usadas no projeto:**
- NextJS
- React Hook Form
- Zod
- React Router Dom
- Prisma
- MongoDB
- Docker
- Toastify
- Material Ui
- Typescript
- Next-auth
- TRPC
- Cloudinary


<br/>

## **Para iniciar o projeto:**
- Para rodar o projeto é necessário alguns passos:
  - npm install (para instalar as dependências do projeto);
  - criar um projeto no Google Cloud Console ("https://cloud.google.com/") para realizar o login via Google;
  - Adicionar no .env as variáveis de ambiente que receberá ao criar o ambiente no Google Cloud (exemplo da nomenclatura das variáveis, pode ser encontrado no arquivo .env.example);
  - Adicionar também ao .env à variável "NEXTAUTH_SECRET" (pode ser uma string qualquer ou usar o comando "openssl rand -base64 32"), para ser o encriptador do next-auth;
  - Para rodar o database em mongodb, é necessário ter o docker e o docker-compose instalado no computador.
    - "docker-compose up -d": comando necessário para subir o banco de dados;
    - "docker-compose logs -f": comando para verificar se o banco está rodando, a resposta que deve ser procurada é "REPLICA_SET ONLINE";
    - "npx prisma db push": para commitar no banco de dados as tabelas do prisma.
  - "npm run dev": para rodar o projeto, que poderá ser acessado em "http://localhost:3000";
  - Para derrubar o banco de dados, por quaisquer razões, o comando a ser usado é: "docker-compose down".

<br/>

## **Funcionalidades encontradas na aplicação Frontend:**

### Página Inicial:
- Na página inicial, caso o usuário não tenha sessão, será redirecionado para fazê-lo via google.
- Caso o usuário já tenha feito login anteriormente, será automaticamente redirecionado para a página de dashboard.

<br/>

### Página de Dashboard:
- Nela encontramos, no Header uma mensagem de boas-vindas com o nome do usuário logado. Bem como, um botão para fazer logout.
- Além disso, há uma listagem de to-dos cadastrados pelo usuário (onde poderá, caso queira editar ou deletar o to-do) ou uma mensagem indicando a criação dos to-dos do usuário. Assim, ao clicar para criar um novo to-do o usuário será redirecionado para a criação.
- Ao clicar no ícone de lápis, o usuário será redirecionado para a tela de edição, onde poderá alterar os dados do to-do escolhido.
- Ao clicar no ícone de lixeira, o usuário excluirá o to-do escolhido.

<br/>

### Página de Criação:
- Nessa página, será necessário:
  - Um título para o to-do;
  - Uma imagem para fazer upload;

- Ao clicar no botão "CREATE", o usuário será redirecionado para a página Dashboard.
- Também na tela, é possível encontrar o Header com os elementos anteriormente descritos. E, um botão de "VOLTAR", que redirecionará o usuário para a tela Dashboard, sem salvar quaisquer informações que ele tenha adicionado.

<br/>

### Página de Edição:
- Através da lista de to-dos, na Dashboard, é possível acessar a página de edição de to-dos, ao clicar no ícone de lápis.
- Nessa página, será possível alterar os seguintes dados:
  - O título do to-do;
  - A imagem fazendo um novo upload;
  - E demarcar a task como completada.

- Ao clicar no botão "UPDATE", o usuário será redirecionado para a página Dashboard.
- Um pequeno erro que ainda não foi corrigido:
  - Ao ser redirecionado para a tela Dashboard, após uma edição de to-do, será necessário dar um reload na tela, para que a lista com as alterações apareça em tela.
- Ainda na tela de edição, é possível encontrar o Header com os elementos anteriormente descritos. E, um botão de "VOLTAR", que redirecionará o usuário para a tela Dashboard, sem salvar quaisquer informações que ele tenha adicionado.
