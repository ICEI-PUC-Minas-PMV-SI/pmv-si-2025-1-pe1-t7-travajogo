# ESPECIFICAÇÃO DO PROJETO - TRAVA JOGO: PLATAFORMA DE CONTROLE DE HÁBITOS EM APOSTAS ONLINE

1. INTRODUÇÃO

Com o aumento do uso de plataformas de apostas online, muitas pessoas enfrentam dificuldades para acompanhar e controlar seus hábitos de jogo, o que pode levar a gastos excessivos e tempo prolongado nessas atividades. O *TravaJogo: Plataforma de Controle de Hábitos em Apostas Online* é uma aplicação web que busca resolver esse problema, oferecendo ferramentas práticas para que usuários, como jovens jogadores, familiares e profissionais da saúde, possam monitorar gastos, limitar o acesso a sites de apostas e acessar recursos externos, promovendo uma gestão mais consciente do tempo e do dinheiro investidos em apostas.

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

|EU COMO...`PERSONA`            | QUERO/PRECISO ... `FUNCIONALIDADE`                                         |PARA ... `MOTIVO/VALOR`                                                                     |
|-------------------------------|----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
|Lucas Silva - Jogador          | Ver quanto já gastei e o tempo que tô sem aposta                           | Ter mais controle sobre meus hábitos e não gastar mais do que posso.                       |
|Lucas Silva - Jogador          |Um chat simples pra trocar ideias com outros jogadores                      | Aprender com as experiências de quem também tá tentando controlar os hábitos de apostas.   |
|Lucas Silva - Jogador          | Acessar ferramentas que me ajudem a bloquear sites de apostas              | Restringir o acesso às plataformas de apostas.                                             |
|Carlos Mendes - Familiar       |Encontrar grupos de apoio para saber como ajudar meu filho                  |Aprender estratégias para lidar com a situação.                                             |
|Carlos Mendes - Familiar       |Ler artigos educativos sobre os impactos das apostas                        |Entender melhor o vício e seus efeitos                                                      |
|Mariana Rocha - Psicóloga      |Acessar materiais educativos para auxiliar meus pacientes                   |Oferecer suporte mais qualificado aos pacientes.                                            |
|Mariana Rocha - Psicóloga      |Ter uma lista de contatos de instituições que oferecem suporte gratuito     |Indicar recursos de apoio para meus pacientes.                                              |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais (Atualizado)

| ID      | Descrição do Requisito                                                                 | Prioridade |
|---------|-----------------------------------------------------------------------------------------|------------|
| RF-001  | A aplicação deve permitir que o usuário veja os gastos acumulados e o valor economizado desde a última aposta. | ALTA       |
| RF-002  | A aplicação deve contar o tempo que o usuário está sem apostar, mostrando os dias sem jogar. | ALTA       |
| RF-003  | A aplicação deve incluir um bloqueador próprio pra impedir o acesso a sites de apostas, com opção de ativar/desativar. | ALTA       |
| RF-004  | A aplicação deve disponibilizar links pra sites de apoio externo, como o Jogadores Anônimos, pra quem busca suporte. | MÉDIA      |
| RF-005  | A aplicação deve ter um chat simples onde os usuários possam trocar ideias e experiências sobre apostas online. | MÉDIA      |
| RF-006  | A aplicação deve oferecer uma interface gráfica responsiva para as telas de usuário logado e deslogado, incluindo cabeçalho, seções principais e rodapé com botões de navegação e links úteis. | ALTA       |
| RF-007  | A aplicação deve permitir que o usuário cadastre gastos por meio de um modal no painel de gastos. | ALTA       |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

| ID      | Descrição do Requisito                                                                 | Prioridade |
|---------|---------------------------------------------------------------------------------------|------------|
| RNF-001 | A aplicação deve garantir a segurança dos dados do usuário (ex.: gastos, tempo sem apostar) com uma opção de cadastro usando login e senha, pra evitar acesso não autorizado. | MÉDIA      |
| RNF-002 | A aplicação deve usar criptografia básica (ex.: HTTPS) pra garantir que os dados inseridos sejam transmitidos com segurança. | ALTA       |
| RNF-003 | O chat deve ter moderação simples (ex.: filtro de palavras) pra evitar mensagens inadequadas entre os usuários. | MÉDIA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID      | Restrição                                                                             |
|---------|---------------------------------------------------------------------------------------|
| 01      | O projeto deve ser entregue até o final do semestre letivo.                           |
| 02      | O projeto deve ser desenvolvido por uma equipe de 6 alunos.                           |
| 03      | A aplicação deve ser desenvolvida usando apenas ferramentas gratuitas ou de baixo custo (ex.: frameworks open-source). |
| 04      | A aplicação não deve ter um módulo de backend, funcionando apenas com tecnologias front-end (ex.: JavaScript, HTML, CSS). |
| 05      | A aplicação deve ser independente, sem depender de suporte externo constante pra funcionar. |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

## Referências 

ATLASSIAN. Histórias de usuários com exemplos e template. 
> - [Link](https://www.atlassian.com/br/agile/project-management/user-stories) - Acesso em 07 de Março de 2025

CODIFICAR. O que são requisitos funcionais e requisitos não funcionais?
> - [Link](https://codificar.com.br/requisitos-funcionais-nao-funcionais/) - Acesso em 07 de Março de 2025

FLAMMO. Persona e público-alvo: qual a diferença? 
> - [Link](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/) - Acesso em 07 de Março de 2025 

LUÍZ TOOLS. User Stories: requisitos que humanos entendem 
> - [Link](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/.) - Acesso em 07 de Março de 2025

RESULTADOS DIGITAIS. O que é persona?
> - [Link](https://resultadosdigitais.com.br/blog/persona-o-que-e/) - Acesso em 07 de Março de 2025
