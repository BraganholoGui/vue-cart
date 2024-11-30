Cenário
Você tem um novo trabalho para criar um painel de controle para ficar de olho e gerenciar as informações de uma loja online. A API Fake Store fornece informações detalhadas sobre produtos, categorias, carrinhos (pedidos) e usuários. Sua tarefa é usar esses dados e mostrá-los em um painel útil e fácil de usar. 🛒

Especificações do Projeto
Consumo de API:
Use o endpoint da API da Loja Falsa: https://fakestoreapi.com/.

Aqui estão os principais endpoints e ações que o painel precisa cobrir:

-/products:

Veja todos os produtos. ok

Visualize detalhes de um produto específico. ok

Filtre e classifique os produtos (por preço e classificação). ok

Adicione, atualize e remova produtos. ok

-/products/categories:

Liste e filtre produtos por categoria.

-/carts:

Listar todos os carrinhos de compras (simulação de pedidos). ok 

Visualize os detalhes de um pedido. ok 

Filtre os carrinhos por data e/ou usuário. ok

Adicione, atualize e remova itens do carrinho. ok +-

-/users:

Liste todos os usuários. OK 

Visualize os detalhes de um usuário específico. OK

Adicione, atualize e remova usuários. OK +-

Faça login (para acessar o painel com as credenciais fornecidas). ok

Recursos do painel:
Visão geral dos indicadores:

Exiba um resumo no painel inicial com:

Total de produtos. OK 

Número de categorias. OK 

Quantidade do pedido (com base nos carrinhos).

Número total de usuários. ok 

Gestão de Produtos: ok

Implemente uma tabela para exibir todos os produtos com as colunas: Nome, Categoria, Preço, Classificação. ok

Adicione filtros por categoria e ordenação por preço ou classificação. ok

Implemente um modal para ver os detalhes de um produto e permitir a edição ou exclusão. ok +-

Adicione novos produtos à loja.

Gerenciamento de carrinho (pedidos): ok

Crie uma tabela de pedidos, incluindo informações como ID do pedido, data, valor total e status. ok

Visualize os detalhes do pedido, com a lista de produtos e suas quantidades. ok

Permitir edição e atualização de pedidos.

Gerenciamento de usuários:

Exibir uma tabela com usuários registrados, incluindo nome, e-mail e cidade. ok

Implemente uma função de pesquisa para encontrar usuários específicos. ok

Adicione novos usuários e edite ou remova usuários existentes.

-Autenticação: OK

Implemente uma tela de login para acesso ao painel, usando o endpoint da API /auth/login. Exibir mensagem de erro se o login for inválido. ok
Requisitos técnicos:
Desenvolver o projeto usando Vue.js (versão 3).

Use axios ou fetch para consumir os dados da API. ok 

Use o Vue Router para gerenciar a navegação entre as seções do painel (produtos, pedidos, usuários, login). ok

Gerencie o estado dos dados usando o Vuex ou a API Composition para compartilhar dados entre componentes. ok

O layout do painel deve ser responsivo, adaptado para visualizações em desktop e dispositivos móveis.

Exibir feedback de carga para solicitações e lidar com erros, mostrando mensagens apropriadas ao usuário. ok

Critérios de avaliação:
Organização e clareza do código. ok

Qualidade e eficiência na integração de APIs e apresentação de dados. ok

Usabilidade e experiência do usuário ao navegar pelo dashboard.

Apresentação visual e capacidade de resposta do layout.

Tratamento de erros e feedback adequado ao usuário. ok

Entrega
Formato: envie um repositório público no GitHub com o código do projeto.

Documentação: Inclua um README.md com instruções para a execução do projeto e uma descrição das principais funcionalidades e componentes implementados. 📦

Meu trabalho