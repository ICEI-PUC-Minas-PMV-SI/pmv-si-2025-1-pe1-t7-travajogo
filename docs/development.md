# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos) 


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | João | index.html |
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês | Ana Paula | cadastro-noticia.html |
|RF-003| A aplicação deve incluir um bloqueador proprio pra impedir o acesso a sites de apostas, com opção de ativar/desativar ou remover cores do site | Daniel Augusto | [Bloqueador plugin](https://chromewebstore.google.com/detail/anti-betsbloqueador-e-fil/ciocdnjhcjbmaijiaijmolldalepmbac?hl=pt-br) |
|RF-005|A aplicação deve ter um chat simples onde os usuários possam trocar ideias e experiências sobre apostas online. |Ygor Durães| chat.html |
|RF-004|A aplicação deve disponibilizar links para sites de apoio externo, como o Jogadores Anônimos, para quem busca suporte. | Wander Carolino | linksuteis.html |
|RF-006| A aplicação deve oferecer uma interface gráfica responsiva para as telas de usuário logado e deslogado, incluindo cabeçalho, seções principais e rodapé com botões de navegação e links úteis. | Fernando Jorge | login.html |
| RF-007  | A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal. | Vítor Moura e Igor Tessaro Kava | [cadastroGasto-modal.html](../src/cadastroGasto-modal.html) [cadastroGasto-modal.css](../src/css/cadastroGasto-modal.css) [painel-de-gastos.html](../src/painel-de-gastos.html) [painel-gastos.css](../src/css/painel-gastos.css) [painel-de-gastos.js](../src/js/painel-de-gastos.js) |


## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

