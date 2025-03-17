# ESPECIFICAÇÃO DO PROJETO - PLATAFORMA DE APOIO A PESSOAS COM VÍCIO EM APOSTAS

1. INTRODUÇÃO

O crescimento das plataformas de apostas online tem levado ao aumento de casos de dependência, afetando aspectos financeiros, psicológicos e sociais dos jogadores. Diante desse cenário, este projeto propõe a criação de um site que ofereça suporte para pessoas que desejam controlar ou superar o vício em apostas, bem como para seus familiares e profissionais da saúde.

## Personas

As personas representam diferentes tipos de usuários do TravaJogo e ajudam a entender o que cada um busca na ferramenta.

Lucas Silva - O Jogador em Busca de Controle

* Idade: 22 anos
* Profissão: Estudante universitário
* História: Lucas começou a apostar em jogos de futebol por diversão, mas agora tá endividado e ansioso com o quanto gasta. Quer organizar melhor seus hábitos e reduzir o acesso às plataformas de apostas, que tão sempre a um clique de distância.
* Necessidades: Ferramentas pra acompanhar gastos e tempo sem jogar, um jeito de bloquear sites de apostas e trocar ideias com quem tá na mesma situação.
1. "Como um jovem que aposta online, quero ver quanto já gastei e economizei pra entender meu progresso."
2. "Como alguém que quer parar de jogar tanto, quero um bloqueador que dificulte abrir esses sites."
3. "Como um jogador querendo mudar, quero conversar com outras pessoas que tão tentando controlar isso também."

Carlos Mendes - O Familiar Preocupado

* Idade: 45 anos
* Profissão: Comerciante
* História: Carlos é pai de um jovem que aposta muito online e quer ajudar o filho a ter mais controle, além de encontrar recursos pra entender a situação.
* Necessidades: Uma forma de acompanhar os hábitos do filho e links pra grupos de apoio que possam orientar os dois.
1. "Como pai preocupado, quero usar uma ferramenta pra ver o tempo e os gastos do meu filho com apostas."
1. "Como familiar, quero links pra grupos de apoio que me ajudem a lidar com essa situação."

Mariana Rocha - A Psicóloga Especializada

* Idade: 30 anos
* Profissão: Psicóloga
* História: Mariana atende pacientes que apostam demais e precisa de recursos simples pra indicar a eles, além de algo que complemente o trabalho dela com informações práticas.
* Necessidades: Uma ferramenta que os pacientes possam usar pra monitorar hábitos e links pra instituições de suporte gratuito.
1. "Como psicóloga, quero indicar uma aplicação que mostre aos meus pacientes o tempo e o dinheiro gastos em apostas."
2. "Como profissional da saúde, quero uma lista de contatos de apoio gratuito pra recomendar a quem precisa."
## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | ALTA |  
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês   | MÉDIA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
