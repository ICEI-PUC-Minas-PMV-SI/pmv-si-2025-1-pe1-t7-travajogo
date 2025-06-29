# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste.


**Caso de Teste** | **CT01 - Acessar página inicial sem estar logado**
 :--------------: | ------------
**Procedimento**  | 1) Acessar index.html
**Requisitos associados** | RF-001
**Resultado esperado** | Página genérica apresentando o bloqueador e oferecendo opção de cadastro/login
**Dados de entrada** | Nenhum
**Resultado obtido** | Página retornada com sucesso

**Caso de Teste** | **CT02 - Login com erro**
 :--------------: | ------------
**Procedimento**  | 1) Acessar login.html <br> 2) Informar um usuário e senha quaisquer que não estejam cadastrados <br> 3) Clicar no botão de Login
**Requisitos associados** | RF-005
**Resultado esperado** | Página de login com uma mensagem de erro em vermelho "Usuário não encontrado."
**Dados de entrada** | Quaisquer usuário e senha
**Resultado obtido** | Página com mensagem de erro

**Caso de Teste** | **CT03 - Login com sucesso**
 :--------------: | ------------
**Procedimento**  | 1) Acessar login.html <br> 2) Informar um usuário e senha que esteja cadastrado <br> 3) Clicar no botão de Login
**Requisitos associados** | RF-005
**Resultado esperado** | Redirecionamento para página inicial
**Dados de entrada** | Usuário e senha válidos
**Resultado obtido** | Página inicial informando o nome do usuário

**Caso de Teste** | **CT04 - Acessar página inicial logado**
 :--------------: | ------------
**Procedimento**  | 1) Acessar index.html
**Requisitos associados** | RF-001
**Resultado esperado** | Página que dá boas-vindas ao usuário, apresenta o bloqueador, permite direcionar para ver o progresso (tempo e dinheiro poupados) e acessar o chat, fórum ou links úteis
**Dados de entrada** | Nenhum
**Resultado obtido** | Página inicial para usuário logado

**Caso de Teste** | **CT05 - Acessar página de Chat**
 :--------------: | ------------
**Procedimento**  | 1) Acessar chat.html <br> 2) Selecionar um usuário <br> 3) Enviar uma mensagem ao usuário 
**Requisitos associados** | RF-003
**Resultado esperado** | Página que permite o contato com outros usuários através de mensagens de texto (se trata de uma simulação devido nossas limitações)
**Dados de entrada** | Mensagens de texto
**Resultado obtido** | A mensagem "Teste" enviada pelo outro usuário

**Caso de Teste** | **CT06 - Definir data de início de jornada**
 :--------------: | ------------
**Procedimento**  | 1) Acessar painel-de-gastos.html com usuário logado <br> 2) Clicar no botão "Definir início da jornada" <br> 3) Completar com as informações necessárias <br> 4) Clicar no botão definir
**Requisitos associados** | RF-006
**Resultado esperado** | Página atualiza com as informações inseridas pelo usuário sobre seu progresso sem apostas
**Dados de entrada** | Valor monetário sobre gasto médio diário com apostas e data de início de sobriedade
**Resultado obtido** | Painel atualizou com os dados inseridos pelo usuário

**Caso de Teste** | **CT07 - Redefinir data de início de jornada**
 :--------------: | ------------
**Procedimento**  | 1) Acessar painel-de-gastos.html com usuário logado <br> 2) Clicar no botão "Redefinir jornada" <br> 3) Clicar no botão OK na mensagem que aparece
**Requisitos associados** | RF-006
**Resultado esperado** | Página atualiza com progresso sem apostas do usuário zerado
**Dados de entrada** | Nenhum
**Resultado obtido** | Apenas o painel de progresso sem apostas resetou por completo

**Caso de Teste** | **CT08 - Adicionar ganho/gasto**
 :--------------: | ------------
**Procedimento**  | 1) Acessar painel-de-gastos.html com usuário logado <br> 2) Clicar no botão "Adicionar gasto" ou no botão "Adicionar ganho" <br> 3) Completar com as informações necessárias <br> 4) Clicar no botão "Adicionar"
**Requisitos associados** | RF-006
**Resultado esperado** | Página atualiza com as informações inseridas pelo usuário em seu Histórico
**Dados de entrada** | Valor monetário, data, descrição e checkbox se é aposta ou não
**Resultado obtido** | Histórico atualizou com os dados inseridos pelo usuário

**Caso de Teste** | **CT09 - Importar/Exportar histórico**
 :--------------: | ------------
**Procedimento**  | 1) Acessar painel-de-gastos.html com usuário logado<br> 2) Clicar no botão "Importar histórico (xlsx)" ou "Exportar histórico" <br> 3) Selecionar arquivo a ser importado - deve seguir padrão definido anteriormente - ou se for exportar, o histórico é baixado para a pasta padrão de downloads definida no navegador
**Requisitos associados** | RF-006
**Resultado esperado** | Página atualiza com as informações do histórico se for importado - caso for exportado, arquivo é exportado para a máquina do usuário
**Dados de entrada** | Nenhum
**Resultado obtido** | Histórico atualizou com os dados importados quando o arquivo seguiu o padrão - Arquivo xlsx foi exportado com sucesso quando selecionada essa opção

**Caso de Teste** | **CT10 - Redefinir todos os dados**
 :--------------: | ------------
**Procedimento**  | 1) Acessar painel-de-gastos.html com usuário logado <br> 2) Clicar no botão "Redefinir todos os dados" <br> 3) Clicar no botão OK na mensagem que aparece
**Requisitos associados** | RF-006
**Resultado esperado** | Página atualiza com todos os dados zerados
**Dados de entrada** | Nenhum
**Resultado obtido** | Todos os dados da página foram resetados

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Acessar página inicial sem estar logado*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve oferecer uma interface gráfica responsiva para as telas de usuário logado e deslogado, incluindo cabeçalho, seções principais e rodapé com botões de navegação e links úteis.|
|Captura de tela: |<img width="1280" alt="Captura de Tela 2025-06-22 às 19 55 54" src="https://github.com/user-attachments/assets/1beb2135-66ce-476b-85a6-fb09393ecd48" />| 

|*Caso de Teste*                                 |*CT02 - Login com erro*                                         |
|---|---|
|Requisito Associado | RF-005 - A aplicação deve disponibilizar uma interface visual adaptável para as páginas de acesso e autenticação.|
|Captura de tela: |<img width="1280" alt="Captura de Tela 2025-06-22 às 20 04 20" src="https://github.com/user-attachments/assets/52a6ce2e-9897-478b-9f6b-25b1a61445b4" />| 

|*Caso de Teste*                                 |*CT03 - Login com sucesso*                                         |
|---|---|
|Requisito Associado | RF-005 - A aplicação deve disponibilizar uma interface visual adaptável para as páginas de acesso e autenticação.|
|Captura de tela: |<img width="1280" alt="Captura de Tela 2025-06-22 às 20 07 47" src="https://github.com/user-attachments/assets/765b90e8-39fa-47e6-92af-67b7cc0377ec" />| 

|*Caso de Teste*                                 |*CT04 - Acessar página inicial logado*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve oferecer uma interface gráfica responsiva para as telas de usuário logado e deslogado, incluindo cabeçalho, seções principais e rodapé com botões de navegação e links úteis.|
|Captura de tela: |<img width="1280" alt="Captura de Tela 2025-06-22 às 20 07 47" src="https://github.com/user-attachments/assets/863c4bf6-751d-408a-8b6b-d0f1f66ac47f" />| 

|*Caso de Teste*                                 |*CT05 - Acessar página de chat e simular uma conversa*                                         |
|---|---|
|Requisito Associado | RF-003 - A aplicação deve ter um chat simples onde os usuários possam trocar ideias e experiências sobre apostas online.| 

|*Caso de Teste*                                 |*CT06 - Definir data de início de jornada*                                         |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal.|
|Capturas de tela: |![image](https://github.com/user-attachments/assets/636f3e68-89ef-4f53-998a-1cc1a9f67336) ![image](https://github.com/user-attachments/assets/b4890406-78a4-4580-9be1-26c21607892f)|  

|*Caso de Teste*                                 |*CT07 - Redefinir data de início de jornada logado*                                         |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal.|
|Captura de tela: |![image](https://github.com/user-attachments/assets/fcba6e5e-f5d7-497c-bb9d-9656cdb9997f)|  

|*Caso de Teste*                                 |*CT08 - Adicionar ganho/gasto*                                         |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal.|
|Capturas de tela: |![image](https://github.com/user-attachments/assets/739843e1-53e1-4bf9-92b0-fdacb523166a) ![image](https://github.com/user-attachments/assets/ef217808-ef03-4b38-9901-f1241bb1e38a)| 

|*Caso de Teste*                                 |*CT09 - Importar/Exportar histórico*                                         |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal.|
|Capturas de tela: |![image](https://github.com/user-attachments/assets/c0a8c329-cd59-4803-bf35-510bafdd71fa) ![image](https://github.com/user-attachments/assets/444c7520-9cec-442d-8c69-9f36af8cefa9)| 

|*Caso de Teste*                                 |*CT10 - Redefinir todos os dados*                                         |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve fornecer um painel de controle de gastos, permitindo que o usuário cadastre sua data de início de sobriedade, podendo acompanhar seu tempo sem apostar e dinheiro já economizado. Também deve permitir o cadastro de gastos e ganhos através de um modal.|
|Captura de tela: |![image](https://github.com/user-attachments/assets/e054e796-7c61-40f5-84b0-af65b00dcf6e)| 

## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



