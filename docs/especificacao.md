# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades dos profissionais de defesa ambiental, órgãos de fiscalização, pesquisadores e da sociedade civil que devem ser atendidas pelo projeto EcoVisão – Sistema de Monitoramento Ambiental em Tempo Real.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado EcoVisão – Sistema de Monitoramento Ambiental em Tempo Real. Ele será composto pelos seguintes componentes (módulos): módulo de mapa interativo e georreferenciamento de ocorrências, módulo de registro e denúncia de ocorrências ambientais, módulo de alertas sobre incêndios e outras ocorrências de risco, módulo de fórum de discussão entre usuários e módulo de análise de imagens de satélite para detecção automática de alterações na cobertura florestal.

### 3.2.2 Missão do produto
Gerenciar informações sobre ocorrências ambientais relacionadas ao desmatamento, às queimadas e à exploração de recursos naturais, permitindo o registro, a localização geográfica, a visualização e o compartilhamento dessas informações entre cidadãos, pesquisadores, órgãos de fiscalização e organizações ambientais.

### 3.2.3 Limites do produto
O EcoVisão não realiza ações de fiscalização, autuação ou aplicação de sanções administrativas, atuando apenas como ferramenta de apoio ao registro, à identificação e ao acompanhamento de ocorrências ambientais. O sistema não substitui os sistemas oficiais de monitoramento por satélite mantidos por órgãos governamentais, como o PRODES e o DETER (INPE), podendo, eventualmente, referenciar ou complementar dados provenientes dessas fontes. O EcoVisão também não contempla funcionalidades de pagamento, cadastro de multas, agendamentos ou gestão de processos administrativos.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no registro e na localização geográfica de ocorrências ambientais | Essencial |
|2 | Agilidade na divulgação de alertas sobre incêndios e outras ocorrências de risco | Essencial |
|3 | Centralização de informações ambientais provenientes de diferentes fontes | Essencial |
|4	| Maior participação da sociedade no monitoramento e na denúncia de problemas ambientais | Recomendável |
|5	| Apoio à tomada de decisão de órgãos de fiscalização e formuladores de políticas públicas | Recomendável |
|6	| Facilidade de comunicação e troca de informações entre usuários por meio do fórum de discussão | Desejável |

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF-001 | O sistema deve permitir que o usuário crie seu login | Criação de credencias de acesso ao sistema |
| RF-002 |	O sistema deve permitir que o usuário gerencie seu login | Alteração de dados e informações vinculadas a propina conta |
| RF-003	| O sistema deve permitir a emissão de um relatório no fim do mês |	Relatório mensal contendo os dados e informações ambientais fornecidos pelo sistema |
| RF-004 |	O sistema deve permitir o usuário fazer uma denuncia	| Cadastro de denuncias sobre problemas ambientais na serra do curral |
| RF-005	| O sistema deve ter um mapa interativo onde seja possível colocar marcadores específicos para denunciar um ou mais problemas em uma localização designada | Mapa interativo para visualização e marcação de locais com denuncias de problemas ambientais |
| RF-006	| O sistema deve ter um histórico de ocorrências ambientais | Consulta das ocorrências ambientais registradas anteriormente no sistema |
| RF-007	|O sistema deve ter uma seção com conteúdos informativos e educativos sobre o desmatamento |	Conteúdos informativos e educativos relacionados ao impacto da degradação ambiental |
| RF-008	|O sistema deve possuir um banco de dados que permita cadastrar, consultar, atualizar e excluir informações | Gerenciamento dos dados necessários para o funcionamento do sistema	|
| RF-009	|O sistema deve possuir um fórum interativo para os usuários. | Disponibilização de um espaço destinado a comunicação entre usuários |
| RF-010	|O sistema deve permitir que o usuário crie e gerencie publicações no fórum | Inclusão alteração e exclusão de post no fórum	|

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF-001 | O sistema tem que ser responsivo |
| RNF-002 | O sistema deve processar requisições do usuário em no máximo 3s |
| RNF-003 | O sistema tem que ser suportado no windows, linux e android  |
| RNF-004 |	a interface do sistema deve ser feita com a versão V4 do tailwind |
| RNF-005 |	O sistema deve ter textos legíveis com contraste adequado |
| RNF-006 |	O sistema deve restringir o acesso por meio de senhas individuais para o usuário |
| RNF-007 |	O sistema deve ter feedback visual em todas as interações com botão |
| RNF-008 |	O sistema deve validar os dados inseridos pelo usuário |
| RNF-009 |	O sistema deve possuir navegação simples e intuitiva |
| RNF-010 | O sistema deve manter suas funcionalidades em diferentes tamanhos de telas |
| RNF-011 | O sistema deve manter registro dos dados nas denuncias|
| RNF-012 | O sistema deve manter a organização e o posicionamento dos elementos como padrão em cada tela |





### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Pessoa não cadastrada |	Usuário não autenticado que pode acessar a página inicial e consultar os conteúdos públicos do sistema |
| Usuário Cadastrado |	Usuário autenticado que possui acesso total ao sistema podendo visualizar dados de de monitoramento, utilizar o mapa interativo, criar alertas, participar do fórum e gerenciar o próprio perfil  |
|Moderador |	Usuário responsável pela verificação dos alertas no mapa e pelo acompanhamento das interações do fórum  |
|Admin |	Usuário responsável pelo gerenciamento e manutenção do sistema como um todo |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso

O diagrama de casos de uso do sistema EcoVisão, apresentado na Figura 1, representa as principais funcionalidades disponibilizadas pela plataforma e as interações realizadas pelos diferentes perfis de usuários.

O visitante poderá realizar seu cadastro, acessar sua conta e consultar os conteúdos educativos disponibilizados publicamente. O usuário cadastrado, por sua vez, poderá gerenciar suas informações pessoais, consultar dados ambientais, visualizar o mapa interativo, registrar e gerenciar alertas ambientais e participar do fórum de discussão da comunidade.

O sistema também contempla os perfis de moderador e administrador, responsáveis, respectivamente, pela moderação dos conteúdos e pelo gerenciamento da plataforma, de acordo com as permissões estabelecidas para cada perfil.

**Figura 1: Diagrama de Casos de Uso do Sistema EcoVisão.**

![Diagrama de Casos de Uso do Sistema EcoVisão](./Diagrama%20de%20Casos%20de%20Uso%20BRANCO.png)
 
### 3.4.2 Descrições de Casos de Uso

### Cadastrar Usuário (CSU01)

**Sumário:** O visitante realiza o cadastro no sistema EcoVisão, fornecendo suas informações pessoais e definindo uma senha para acessar as funcionalidades disponibilizadas aos usuários cadastrados.

**Ator Primário:** Visitante.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O visitante deve acessar a página de cadastro do sistema e ainda não possuir uma conta vinculada ao e-mail informado.

**Fluxo Principal:**

1. O visitante acessa a página inicial do EcoVisão.
2. O visitante seleciona a opção de criar uma conta.
3. O sistema apresenta o formulário de cadastro, solicitando nome, e-mail, senha e confirmação de senha.
4. O visitante preenche os campos solicitados e confirma o cadastro.
5. O sistema verifica se os dados informados são válidos e se o e-mail já está cadastrado.
6. Caso os dados sejam válidos e o e-mail não esteja cadastrado, o sistema registra as informações do novo usuário.
7. O sistema apresenta uma mensagem confirmando a realização do cadastro.

**Fluxo Alternativo (5): E-mail já cadastrado**

a) O sistema identifica que o e-mail informado já está vinculado a uma conta existente.

b) O sistema apresenta uma mensagem informando que o e-mail já está cadastrado.

c) O visitante poderá informar outro e-mail ou acessar a página de login.

**Fluxo Alternativo (5): Dados inválidos ou incompletos**

a) O sistema identifica que um ou mais campos obrigatórios não foram preenchidos corretamente.

b) O sistema apresenta uma mensagem indicando os campos que precisam ser corrigidos.

c) O visitante corrige as informações e solicita novamente a realização do cadastro.

d) O sistema retorna ao passo 5 do fluxo principal.

**Pós-condições:** Uma nova conta de usuário é registrada no sistema, permitindo que o usuário realize a autenticação e tenha acesso às funcionalidades disponibilizadas para usuários cadastrados.
### Realizar Login (CSU02)

**Sumário:** O usuário cadastrado realiza a autenticação no sistema EcoVisão, informando suas credenciais de acesso para utilizar as funcionalidades disponibilizadas de acordo com seu perfil.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema e não estar autenticado.

**Fluxo Principal:**

1. O usuário acessa a página inicial do EcoVisão.
2. O usuário seleciona a opção de realizar login.
3. O sistema apresenta o formulário de autenticação, solicitando e-mail e senha.
4. O usuário informa suas credenciais de acesso e seleciona a opção de entrar.
5. O sistema verifica se os campos foram preenchidos corretamente e valida as credenciais informadas.
6. Caso as credenciais sejam válidas, o sistema autentica o usuário e permite o acesso às funcionalidades correspondentes ao seu perfil.
7. O sistema direciona o usuário para a página principal da plataforma.

**Fluxo Alternativo (5): Credenciais inválidas**

a) O sistema identifica que o e-mail ou a senha informados não correspondem a uma conta cadastrada.

b) O sistema apresenta uma mensagem informando que as credenciais de acesso são inválidas.

c) O usuário poderá corrigir o e-mail ou a senha e solicitar novamente a autenticação.

d) O sistema retorna ao passo 5 do fluxo principal.

**Fluxo Alternativo (5): Campos obrigatórios não preenchidos**

a) O sistema identifica que o e-mail ou a senha não foram informados.

b) O sistema apresenta uma mensagem solicitando o preenchimento dos campos obrigatórios.

c) O usuário preenche os campos indicados e solicita novamente a autenticação.

d) O sistema retorna ao passo 5 do fluxo principal.

**Fluxo Alternativo (4): Recuperação de senha**

a) O usuário informa que não se lembra de sua senha e seleciona a opção de recuperação de senha.

b) O sistema direciona o usuário para a página de recuperação de senha.

c) O usuário poderá realizar o procedimento de recuperação de senha, conforme descrito no caso de uso CSU03 — Recuperar Senha.

d) Após a recuperação da senha, o usuário poderá retornar à página de login e realizar uma nova tentativa de autenticação.

**Pós-condições:** O usuário é autenticado no sistema e recebe acesso às funcionalidades disponibilizadas de acordo com seu perfil. Em caso de falha na autenticação, o acesso às funcionalidades restritas não é concedido.
### Recuperar Senha (CSU03)

**Sumário:** O usuário cadastrado solicita a recuperação de sua senha de acesso ao sistema EcoVisão, permitindo que ele redefina suas credenciais e volte a utilizar as funcionalidades da plataforma.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema e ter acesso ao e-mail vinculado à sua conta.

**Fluxo Principal:**

1. O usuário acessa a página de login do EcoVisão.
2. O usuário seleciona a opção de recuperação de senha.
3. O sistema apresenta o formulário de recuperação de senha, solicitando o e-mail vinculado à conta.
4. O usuário informa seu e-mail e solicita a recuperação de senha.
5. O sistema verifica se o e-mail informado está associado a uma conta cadastrada.
6. Caso o e-mail esteja cadastrado, o sistema envia uma mensagem contendo um link para redefinição de senha.
7. O usuário acessa seu e-mail e seleciona o link de recuperação recebido.
8. O sistema apresenta o formulário para definição de uma nova senha.
9. O usuário informa a nova senha, confirma a informação e solicita sua alteração.
10. O sistema verifica se a nova senha atende aos critérios de validação estabelecidos.
11. Caso os dados sejam válidos, o sistema atualiza a senha vinculada à conta do usuário.
12. O sistema apresenta uma mensagem confirmando a alteração da senha e permite que o usuário retorne à página de login.

**Fluxo Alternativo (5): E-mail não cadastrado**

a) O sistema identifica que o e-mail informado não está vinculado a uma conta cadastrada.

b) O sistema apresenta uma mensagem informando que não foi possível localizar uma conta associada ao e-mail informado.

c) O usuário poderá corrigir o e-mail e solicitar novamente a recuperação de senha.

d) O sistema retorna ao passo 5 do fluxo principal.

**Fluxo Alternativo (4): E-mail inválido ou não informado**

a) O sistema identifica que o campo de e-mail não foi preenchido ou apresenta um formato inválido.

b) O sistema apresenta uma mensagem solicitando a correção do campo.

c) O usuário informa um endereço de e-mail válido e solicita novamente a recuperação de senha.

d) O sistema retorna ao passo 5 do fluxo principal.

**Fluxo Alternativo (10): Nova senha inválida**

a) O sistema identifica que a nova senha não atende aos critérios de validação estabelecidos ou que os campos de senha e confirmação apresentam valores diferentes.

b) O sistema apresenta uma mensagem informando que os dados precisam ser corrigidos.

c) O usuário informa uma nova senha e confirma a informação.

d) O sistema retorna ao passo 10 do fluxo principal.

**Fluxo Alternativo (7): Link de recuperação inválido ou expirado**

a) O sistema identifica que o link de recuperação utilizado é inválido ou está expirado.

b) O sistema apresenta uma mensagem informando que não foi possível realizar a recuperação da senha por meio do link utilizado.

c) O usuário poderá solicitar um novo link de recuperação de senha.

d) O sistema retorna ao passo 3 do fluxo principal.

**Pós-condições:** A senha do usuário é atualizada no sistema, permitindo que ele realize uma nova autenticação utilizando suas credenciais atualizadas. Caso a recuperação não seja concluída, a senha anteriormente cadastrada permanece inalterada.
### Consultar Conteúdos Educativos (CSU04)

**Sumário:** O visitante acessa os conteúdos educativos disponibilizados pelo sistema EcoVisão, com o objetivo de obter informações sobre preservação ambiental, desmatamento, queimadas e outros temas relacionados ao meio ambiente.

**Ator Primário:** Visitante.

**Ator Secundário:** Usuário cadastrado.

**Pré-condições:** O visitante deve ter acesso à plataforma EcoVisão e os conteúdos educativos devem estar disponíveis para consulta no sistema. Não é necessário realizar autenticação para acessar os conteúdos públicos.

**Fluxo Principal:**

1. O visitante acessa a página inicial do EcoVisão.
2. O visitante seleciona a opção de acessar os conteúdos educativos disponibilizados pela plataforma.
3. O sistema apresenta a página de conteúdos educativos, exibindo os materiais disponíveis para consulta.
4. O visitante visualiza os conteúdos apresentados e seleciona o material de seu interesse.
5. O sistema recupera as informações correspondentes ao conteúdo selecionado.
6. O sistema apresenta o conteúdo educativo, permitindo que o visitante consulte as informações disponibilizadas.
7. O visitante realiza a leitura do material e poderá retornar à página de conteúdos educativos para consultar outros materiais.

**Fluxo Alternativo (3): Nenhum conteúdo educativo disponível**

a) O sistema identifica que não existem conteúdos educativos disponíveis para consulta.

b) O sistema apresenta uma mensagem informando que não há conteúdos disponíveis no momento.

c) O visitante poderá retornar à página inicial da plataforma ou acessar outras funcionalidades públicas do sistema.

**Fluxo Alternativo (5): Conteúdo indisponível**

a) O sistema identifica que o conteúdo educativo selecionado não está disponível para consulta.

b) O sistema apresenta uma mensagem informando que não foi possível acessar o conteúdo solicitado.

c) O visitante poderá retornar à página de conteúdos educativos e selecionar outro material disponível.

d) O sistema retorna ao passo 3 do fluxo principal.

**Fluxo Alternativo (6): Falha no carregamento do conteúdo**

a) O sistema identifica uma falha durante o carregamento das informações do conteúdo educativo selecionado.

b) O sistema apresenta uma mensagem informando que ocorreu um problema ao carregar o conteúdo.

c) O visitante poderá solicitar uma nova tentativa de carregamento ou retornar à página de conteúdos educativos.

d) Caso o visitante solicite uma nova tentativa, o sistema retorna ao passo 5 do fluxo principal.

**Pós-condições:** O visitante tem acesso às informações do conteúdo educativo selecionado, podendo consultar os materiais disponibilizados pela plataforma. A consulta não altera os dados cadastrados no sistema e não exige que o visitante possua uma conta ou esteja autenticado.
### Gerenciar Perfil (CSU05)

**Sumário:** O usuário cadastrado realiza o gerenciamento de seu perfil no sistema EcoVisão, podendo consultar e atualizar suas informações pessoais, mantendo seus dados cadastrais atualizados na plataforma.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema EcoVisão e estar devidamente autenticado para acessar as funcionalidades de gerenciamento de perfil.

**Fluxo Principal:**

1. O usuário realiza a autenticação no sistema EcoVisão.
2. O usuário acessa a área de gerenciamento de seu perfil.
3. O sistema apresenta as informações pessoais cadastradas e disponibiliza as opções de consulta e atualização dos dados.
4. O usuário seleciona a operação desejada: consultar ou atualizar suas informações pessoais.
5. O sistema executa a operação selecionada, conforme os fluxos alternativos descritos.
6. Após a conclusão da operação, o sistema apresenta as informações atualizadas ou consultadas.
7. O usuário poderá realizar outra operação de gerenciamento de perfil ou retornar à página principal da plataforma.

**Fluxo Alternativo (4): Consultar informações pessoais**

a) O usuário seleciona a opção de consultar suas informações pessoais.

b) O sistema recupera os dados cadastrais vinculados à conta do usuário autenticado.

c) O sistema apresenta as informações pessoais disponíveis para consulta.

d) O usuário visualiza suas informações e poderá retornar à área de gerenciamento de perfil.

e) O sistema retorna ao passo 6 do fluxo principal.

**Fluxo Alternativo (4): Atualizar informações pessoais**

a) O usuário seleciona a opção de atualizar suas informações pessoais.

b) O sistema apresenta o formulário de edição, contendo os dados cadastrais disponíveis para alteração.

c) O usuário modifica as informações desejadas e solicita a atualização dos dados.

d) O sistema verifica se os dados informados atendem aos critérios de validação estabelecidos.

e) Caso os dados sejam válidos, o sistema registra as alterações realizadas no perfil do usuário.

f) O sistema apresenta uma mensagem confirmando a atualização das informações pessoais.

g) O sistema retorna ao passo 6 do fluxo principal.

**Fluxo Alternativo (4): Dados inválidos ou incompletos durante a atualização**

a) Durante a atualização das informações pessoais, o sistema identifica que um ou mais campos obrigatórios não foram preenchidos corretamente ou apresentam dados inválidos.

b) O sistema apresenta uma mensagem indicando os campos que precisam ser corrigidos.

c) O usuário corrige as informações indicadas e solicita novamente a atualização dos dados.

d) O sistema retorna à etapa de validação dos dados descrita no item d do fluxo alternativo de atualização das informações pessoais.

**Fluxo Alternativo (5): Falha ao salvar as alterações**

a) O sistema identifica uma falha durante o processo de atualização das informações pessoais.

b) O sistema apresenta uma mensagem informando que não foi possível salvar as alterações realizadas.

c) O usuário poderá solicitar uma nova tentativa de atualização ou cancelar a operação.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna à etapa de validação dos dados descrita no item d do fluxo alternativo de atualização das informações pessoais.

e) Caso o usuário cancele a operação, o sistema mantém os dados anteriormente cadastrados e retorna à área de gerenciamento de perfil.

**Pós-condições:** O usuário poderá consultar suas informações pessoais e, caso realize uma atualização válida, os novos dados serão registrados no sistema EcoVisão. Caso a operação seja cancelada ou não seja concluída com sucesso, as informações anteriormente cadastradas permanecerão inalteradas.
### Consultar Dados Ambientais (CSU06)

**Sumário:** O usuário cadastrado consulta os dados ambientais disponibilizados pelo sistema EcoVisão, obtendo informações sobre desmatamento, queimadas e outras ocorrências ambientais, com o objetivo de acompanhar as condições das áreas monitoradas e identificar possíveis situações de degradação ambiental.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema EcoVisão e estar devidamente autenticado. Os dados ambientais devem estar disponíveis para consulta na plataforma.

**Fluxo Principal:**

1. O usuário realiza a autenticação no sistema EcoVisão.
2. O usuário acessa a página principal da plataforma.
3. O usuário seleciona a opção de consultar dados ambientais.
4. O sistema apresenta a página de consulta, exibindo as informações ambientais disponíveis.
5. O usuário seleciona os dados ambientais de seu interesse, podendo consultar informações sobre desmatamento, queimadas e outras ocorrências registradas.
6. O sistema recupera as informações correspondentes à consulta realizada.
7. O sistema apresenta os dados ambientais selecionados, permitindo que o usuário visualize as informações disponíveis sobre as ocorrências e as áreas monitoradas.
8. O usuário analisa as informações apresentadas e poderá realizar uma nova consulta ou retornar à página principal da plataforma.

**Fluxo Alternativo (4): Nenhum dado ambiental disponível**

a) O sistema identifica que não existem dados ambientais disponíveis para consulta.

b) O sistema apresenta uma mensagem informando que não há dados ambientais disponíveis no momento.

c) O usuário poderá retornar à página principal da plataforma ou acessar outras funcionalidades do sistema.

**Fluxo Alternativo (6): Dados ambientais indisponíveis**

a) O sistema identifica que os dados ambientais solicitados não estão disponíveis para consulta.

b) O sistema apresenta uma mensagem informando que não foi possível acessar as informações solicitadas.

c) O usuário poderá selecionar outros dados ambientais disponíveis ou retornar à página de consulta.

d) O sistema retorna ao passo 4 do fluxo principal.

**Fluxo Alternativo (6): Falha no carregamento dos dados ambientais**

a) O sistema identifica uma falha durante o carregamento das informações ambientais solicitadas.

b) O sistema apresenta uma mensagem informando que ocorreu um problema ao carregar os dados ambientais.

c) O usuário poderá solicitar uma nova tentativa de carregamento ou retornar à página de consulta.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna ao passo 6 do fluxo principal.

**Pós-condições:** O usuário tem acesso às informações ambientais disponibilizadas pelo sistema EcoVisão, podendo consultar dados sobre desmatamento, queimadas e outras ocorrências ambientais. A consulta não altera os dados cadastrados na plataforma.
### Visualizar Mapa Interativo (CSU07)

**Sumário:** O usuário cadastrado acessa o mapa interativo disponibilizado pelo sistema EcoVisão para visualizar a localização geográfica das ocorrências ambientais registradas na plataforma, permitindo identificar áreas afetadas por desmatamento, queimadas e outras formas de degradação ambiental.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema EcoVisão e estar devidamente autenticado. O sistema deve possuir acesso ao serviço de mapas utilizado pela plataforma.

**Fluxo Principal:**

1. O usuário realiza a autenticação no sistema EcoVisão.
2. O usuário acessa a página principal da plataforma.
3. O usuário seleciona a opção de visualizar o mapa interativo.
4. O sistema apresenta o mapa interativo, exibindo a localização geográfica das ocorrências ambientais registradas na plataforma.
5. O usuário navega pelo mapa, podendo ampliar, reduzir e deslocar a visualização para consultar diferentes regiões geográficas.
6. O usuário seleciona uma ocorrência ambiental identificada no mapa.
7. O sistema recupera as informações correspondentes à ocorrência selecionada.
8. O sistema apresenta os detalhes da ocorrência ambiental, incluindo as informações disponíveis sobre seu tipo, localização, data e descrição.
9. O usuário consulta as informações apresentadas e poderá selecionar outras ocorrências, continuar navegando pelo mapa ou retornar à página principal da plataforma.

**Fluxo Alternativo (4): Nenhuma ocorrência ambiental registrada**

a) O sistema identifica que não existem ocorrências ambientais registradas para a região apresentada no mapa.

b) O sistema apresenta o mapa interativo sem marcadores de ocorrências ambientais na região consultada.

c) O sistema informa ao usuário que não existem ocorrências registradas para a região selecionada.

d) O usuário poderá navegar pelo mapa para consultar outras regiões geográficas ou retornar à página principal da plataforma.

**Fluxo Alternativo (4): Falha no carregamento do mapa**

a) O sistema identifica uma falha durante o carregamento do serviço de mapas utilizado pela plataforma.

b) O sistema apresenta uma mensagem informando que não foi possível carregar o mapa interativo.

c) O usuário poderá solicitar uma nova tentativa de carregamento ou retornar à página principal da plataforma.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna ao passo 4 do fluxo principal.

**Fluxo Alternativo (7): Informações da ocorrência indisponíveis**

a) O sistema identifica que as informações da ocorrência ambiental selecionada não estão disponíveis para consulta.

b) O sistema apresenta uma mensagem informando que não foi possível acessar os detalhes da ocorrência selecionada.

c) O usuário poderá selecionar outra ocorrência ambiental ou continuar navegando pelo mapa.

d) O sistema retorna ao passo 5 do fluxo principal.

**Fluxo Alternativo (7): Falha no carregamento das informações da ocorrência**

a) O sistema identifica uma falha durante o carregamento das informações da ocorrência ambiental selecionada.

b) O sistema apresenta uma mensagem informando que ocorreu um problema ao carregar os detalhes da ocorrência.

c) O usuário poderá solicitar uma nova tentativa de carregamento ou retornar à visualização do mapa.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna ao passo 7 do fluxo principal.

**Pós-condições:** O usuário tem acesso ao mapa interativo do sistema EcoVisão, podendo visualizar a localização geográfica das ocorrências ambientais registradas e consultar as informações disponíveis sobre cada ocorrência. A visualização do mapa e a consulta das ocorrências não alteram os dados cadastrados na plataforma.
### Gerenciar Alertas Ambientais (CSU08)

**Sumário:** O usuário cadastrado realiza o gerenciamento de alertas ambientais no sistema EcoVisão, podendo registrar novas ocorrências, consultar alertas existentes, atualizar informações de alertas cadastrados por ele e excluir seus próprios registros. Os alertas permitem compartilhar informações sobre desmatamento, queimadas e outras situações de degradação ambiental, contribuindo para o monitoramento das áreas afetadas.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema EcoVisão e estar devidamente autenticado para acessar as funcionalidades de gerenciamento de alertas ambientais.

**Fluxo Principal:**

1. O usuário realiza a autenticação no sistema EcoVisão.
2. O usuário acessa a página principal da plataforma.
3. O usuário seleciona a opção de gerenciar alertas ambientais.
4. O sistema apresenta a área de gerenciamento de alertas, exibindo os registros disponíveis e as opções de cadastrar, consultar, atualizar e excluir alertas, conforme as permissões do usuário.
5. O usuário seleciona a operação desejada.
6. O sistema executa a operação selecionada, conforme os fluxos alternativos descritos.
7. Após a conclusão da operação, o sistema apresenta as informações atualizadas dos alertas ambientais.
8. O usuário poderá realizar outra operação de gerenciamento ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Cadastrar alerta ambiental**

a) O usuário seleciona a opção de cadastrar um novo alerta ambiental.

b) O sistema apresenta o formulário de cadastro, solicitando informações como tipo de ocorrência, localização geográfica, data e descrição.

c) O usuário preenche os campos solicitados e confirma o cadastro do alerta.

d) O sistema verifica se os dados informados foram preenchidos corretamente.

e) Caso os dados sejam válidos, o sistema registra o novo alerta ambiental, vinculando-o à conta do usuário responsável pelo cadastro.

f) O sistema apresenta uma mensagem confirmando o cadastro do alerta ambiental.

g) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Consultar alertas ambientais**

a) O usuário seleciona a opção de consultar os alertas ambientais disponíveis na plataforma.

b) O sistema apresenta a relação de alertas ambientais cadastrados.

c) O usuário seleciona o alerta ambiental que deseja consultar.

d) O sistema recupera as informações correspondentes ao alerta selecionado.

e) O sistema apresenta os detalhes do alerta ambiental, incluindo as informações disponíveis sobre o tipo de ocorrência, localização geográfica, data e descrição.

f) O usuário poderá consultar outros alertas ambientais ou retornar à área de gerenciamento.

g) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Atualizar alerta ambiental**

a) O usuário seleciona a opção de atualizar um alerta ambiental cadastrado por ele.

b) O sistema apresenta os alertas ambientais vinculados à conta do usuário.

c) O usuário seleciona o alerta que deseja atualizar.

d) O sistema apresenta as informações cadastradas e disponibiliza os campos que podem ser alterados.

e) O usuário modifica as informações desejadas e solicita a atualização do alerta.

f) O sistema verifica se o usuário possui permissão para realizar a alteração e se os dados informados são válidos.

g) Caso as verificações sejam concluídas com sucesso, o sistema atualiza as informações do alerta ambiental.

h) O sistema apresenta uma mensagem confirmando a atualização do alerta.

i) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Excluir alerta ambiental**

a) O usuário seleciona a opção de excluir um alerta ambiental cadastrado por ele.

b) O sistema apresenta os alertas ambientais vinculados à conta do usuário.

c) O usuário seleciona o alerta que deseja excluir.

d) O sistema apresenta uma mensagem solicitando a confirmação da exclusão do alerta ambiental selecionado.

e) O usuário confirma a exclusão.

f) O sistema verifica se o usuário possui permissão para excluir o alerta selecionado.

g) Caso a verificação seja concluída com sucesso, o sistema exclui o alerta ambiental.

h) O sistema apresenta uma mensagem confirmando a exclusão do alerta.

i) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Dados inválidos ou incompletos**

a) Durante o cadastro ou a atualização de um alerta ambiental, o sistema identifica que um ou mais campos obrigatórios não foram preenchidos corretamente ou apresentam dados inválidos.

b) O sistema apresenta uma mensagem indicando os campos que precisam ser corrigidos.

c) O usuário corrige as informações indicadas e solicita novamente o cadastro ou a atualização do alerta.

d) O sistema retorna à etapa de validação dos dados da operação selecionada.

**Fluxo Alternativo (5): Usuário sem permissão para alterar ou excluir alerta**

a) O sistema identifica que o usuário está tentando atualizar ou excluir um alerta ambiental para o qual não possui permissão.

b) O sistema impede a realização da operação e apresenta uma mensagem informando que o usuário não possui autorização para modificar o alerta selecionado.

c) O usuário poderá selecionar outro alerta ambiental ou retornar à área de gerenciamento.

d) O sistema retorna ao passo 4 do fluxo principal.

**Fluxo Alternativo (5): Exclusão cancelada**

a) Durante o procedimento de exclusão de um alerta ambiental, o usuário seleciona a opção de cancelar a operação.

b) O sistema interrompe o procedimento de exclusão e mantém o alerta ambiental cadastrado.

c) O sistema retorna à área de gerenciamento de alertas ambientais.

d) O usuário poderá realizar outra operação ou retornar à página principal da plataforma.

**Fluxo Alternativo (6): Falha ao salvar as informações do alerta**

a) O sistema identifica uma falha durante o cadastro, a atualização ou a exclusão de um alerta ambiental.

b) O sistema apresenta uma mensagem informando que não foi possível concluir a operação solicitada.

c) O usuário poderá solicitar uma nova tentativa ou cancelar a operação.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna à etapa de execução da operação selecionada.

e) Caso o usuário cancele a operação, o sistema retorna à área de gerenciamento de alertas ambientais, mantendo os registros anteriormente cadastrados.

**Pós-condições:** O usuário poderá consultar os alertas ambientais disponíveis no sistema EcoVisão e gerenciar os registros vinculados à sua conta. Caso uma operação de cadastro, atualização ou exclusão seja concluída com sucesso, as alterações correspondentes serão registradas no sistema. Caso a operação seja cancelada ou não seja concluída com sucesso, os dados anteriormente cadastrados permanecerão inalterados.

### Participar do Fórum (CSU09)

**Sumário:** O usuário cadastrado participa do fórum de discussão do sistema EcoVisão, podendo consultar publicações, criar novas discussões e interagir com outros usuários por meio de comentários sobre questões ambientais.

**Ator Primário:** Usuário cadastrado.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O usuário deve possuir uma conta previamente cadastrada no sistema EcoVisão e estar devidamente autenticado para participar das discussões do fórum.

**Fluxo Principal:**

1. O usuário realiza a autenticação no sistema EcoVisão.
2. O usuário acessa a página principal da plataforma.
3. O usuário seleciona a opção de acessar o fórum de discussão.
4. O sistema apresenta a página do fórum, exibindo as publicações e discussões disponíveis.
5. O usuário seleciona a operação desejada: consultar publicações, criar uma nova discussão ou comentar em uma publicação existente.
6. O sistema executa a operação selecionada, conforme os fluxos alternativos descritos.
7. Após a conclusão da operação, o sistema apresenta as informações atualizadas do fórum.
8. O usuário poderá realizar outra operação ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Consultar publicações**

a) O usuário seleciona uma publicação disponível no fórum.

b) O sistema recupera as informações da publicação selecionada.

c) O sistema apresenta o conteúdo da publicação e os comentários associados.

d) O usuário poderá consultar outras publicações ou retornar à página principal do fórum.

**Fluxo Alternativo (5): Criar nova discussão**

a) O usuário seleciona a opção de criar uma nova discussão no fórum.

b) O sistema apresenta um formulário solicitando as informações necessárias para a publicação.

c) O usuário preenche os campos solicitados e confirma a criação da discussão.

d) O sistema verifica se os campos obrigatórios foram preenchidos corretamente.

e) Caso os dados sejam válidos, o sistema registra a nova publicação no fórum.

f) O sistema apresenta uma mensagem confirmando a criação da discussão.

g) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Comentar em uma publicação**

a) O usuário seleciona uma publicação disponível no fórum.

b) O sistema apresenta o conteúdo da publicação e os comentários existentes.

c) O usuário seleciona a opção de adicionar um comentário.

d) O sistema apresenta o campo destinado à inserção do comentário.

e) O usuário escreve o comentário e confirma o envio.

f) O sistema verifica se o comentário atende aos critérios de validação estabelecidos.

g) Caso o comentário seja válido, o sistema registra o comentário vinculado à publicação selecionada.

h) O sistema apresenta o comentário na discussão e confirma sua publicação.

i) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (4): Nenhuma publicação disponível**

a) O sistema identifica que não existem publicações disponíveis para consulta no fórum.

b) O sistema apresenta uma mensagem informando que não há discussões disponíveis no momento.

c) O usuário poderá criar uma nova discussão ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Dados inválidos ou incompletos na publicação**

a) O sistema identifica que um ou mais campos obrigatórios da nova publicação não foram preenchidos corretamente.

b) O sistema apresenta uma mensagem indicando os campos que precisam ser corrigidos.

c) O usuário corrige as informações e solicita novamente a criação da discussão.

d) O sistema retorna à etapa de validação descrita no item d do fluxo alternativo de criação de nova discussão.

**Fluxo Alternativo (5): Comentário inválido ou não informado**

a) O sistema identifica que o comentário não foi preenchido corretamente ou não atende aos critérios de validação estabelecidos.

b) O sistema apresenta uma mensagem solicitando a correção do comentário.

c) O usuário corrige o comentário e solicita novamente sua publicação.

d) O sistema retorna à etapa de validação descrita no item f do fluxo alternativo de comentário.

**Fluxo Alternativo (6): Falha ao salvar publicação ou comentário**

a) O sistema identifica uma falha durante o registro de uma nova publicação ou de um comentário.

b) O sistema apresenta uma mensagem informando que não foi possível concluir a operação solicitada.

c) O usuário poderá solicitar uma nova tentativa ou cancelar a operação.

d) Caso o usuário solicite uma nova tentativa, o sistema retorna à etapa de registro da operação selecionada.

e) Caso o usuário cancele a operação, o sistema retorna à página do fórum sem registrar a publicação ou o comentário.

**Pós-condições:** O usuário poderá consultar as publicações e discussões disponíveis no fórum do sistema EcoVisão. Caso uma nova publicação ou comentário seja registrado com sucesso, as informações correspondentes serão armazenadas no sistema e disponibilizadas no fórum. Caso a operação seja cancelada ou não seja concluída com sucesso, nenhuma nova publicação ou comentário será registrado.

### Moderar Conteúdos (CSU10)

**Sumário:** O moderador realiza a moderação dos conteúdos publicados no sistema EcoVisão, podendo consultar publicações e comentários, analisar conteúdos que não estejam de acordo com as regras da plataforma e realizar a remoção de conteúdos inadequados, contribuindo para a organização e a segurança das discussões da comunidade.

**Ator Primário:** Moderador.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O moderador deve possuir uma conta previamente cadastrada no sistema EcoVisão, estar devidamente autenticado e possuir as permissões necessárias para acessar as funcionalidades de moderação de conteúdos.

**Fluxo Principal:**

1. O moderador realiza a autenticação no sistema EcoVisão.
2. O moderador acessa a página principal da plataforma.
3. O moderador seleciona a opção de acessar a área de moderação de conteúdos.
4. O sistema apresenta a área de moderação, exibindo as publicações e os comentários disponíveis para análise.
5. O moderador seleciona a operação desejada: consultar conteúdos, analisar uma publicação ou comentário e realizar a remoção de conteúdos inadequados.
6. O sistema executa a operação selecionada, conforme os fluxos alternativos descritos.
7. Após a conclusão da operação, o sistema apresenta as informações atualizadas na área de moderação.
8. O moderador poderá realizar outra operação ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Consultar conteúdos**

a) O moderador seleciona a opção de consultar os conteúdos disponíveis na plataforma.

b) O sistema recupera as informações das publicações e dos comentários registrados.

c) O sistema apresenta os conteúdos disponíveis para consulta.

d) O moderador seleciona uma publicação ou comentário para visualizar suas informações.

e) O sistema apresenta o conteúdo selecionado e as informações disponíveis para análise.

f) O moderador poderá selecionar outro conteúdo ou retornar à área de moderação.

**Fluxo Alternativo (5): Analisar publicação ou comentário**

a) O moderador seleciona uma publicação ou comentário disponível na área de moderação.

b) O sistema recupera as informações correspondentes ao conteúdo selecionado.

c) O sistema apresenta o conteúdo e as informações necessárias para sua análise.

d) O moderador verifica se o conteúdo está de acordo com as regras de utilização da plataforma EcoVisão.

e) Caso o conteúdo esteja de acordo com as regras da plataforma, o moderador poderá mantê-lo disponível e retornar à área de moderação.

f) Caso o conteúdo seja considerado inadequado, o moderador poderá selecionar a opção de removê-lo, conforme o fluxo alternativo de remoção de conteúdo.

**Fluxo Alternativo (5): Remover conteúdo inadequado**

a) O moderador seleciona a publicação ou o comentário que deseja remover.

b) O sistema apresenta as informações do conteúdo selecionado e disponibiliza a opção de remoção.

c) O moderador seleciona a opção de remover o conteúdo.

d) O sistema apresenta uma mensagem solicitando a confirmação da operação.

e) O moderador confirma a remoção do conteúdo selecionado.

f) O sistema verifica se o moderador possui as permissões necessárias para realizar a operação.

g) Caso a operação seja autorizada, o sistema realiza a remoção do conteúdo selecionado.

h) O sistema apresenta uma mensagem confirmando a conclusão da operação.

i) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (4): Nenhum conteúdo disponível para moderação**

a) O sistema identifica que não existem publicações ou comentários disponíveis para consulta na área de moderação.

b) O sistema apresenta uma mensagem informando que não há conteúdos disponíveis para moderação no momento.

c) O moderador poderá retornar à página principal da plataforma ou acessar outras funcionalidades disponíveis para seu perfil.

**Fluxo Alternativo (5): Conteúdo indisponível**

a) O sistema identifica que a publicação ou o comentário selecionado não está mais disponível para consulta.

b) O sistema apresenta uma mensagem informando que não foi possível acessar o conteúdo solicitado.

c) O moderador poderá selecionar outro conteúdo disponível ou retornar à área de moderação.

d) O sistema retorna ao passo 4 do fluxo principal.

**Fluxo Alternativo (5): Remoção cancelada**

a) Durante o procedimento de remoção de uma publicação ou comentário, o moderador seleciona a opção de cancelar a operação.

b) O sistema interrompe o procedimento de remoção e mantém o conteúdo anteriormente registrado.

c) O sistema retorna à área de moderação de conteúdos.

d) O moderador poderá realizar outra operação ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Permissão insuficiente para realizar a operação**

a) O sistema identifica que o usuário não possui as permissões necessárias para realizar a operação de moderação solicitada.

b) O sistema apresenta uma mensagem informando que o usuário não possui autorização para executar a operação.

c) O sistema não realiza alterações no conteúdo selecionado.

d) O usuário poderá retornar à página principal da plataforma ou acessar outras funcionalidades disponíveis para seu perfil.

**Fluxo Alternativo (6): Falha ao remover conteúdo**

a) O sistema identifica uma falha durante o procedimento de remoção de uma publicação ou comentário.

b) O sistema apresenta uma mensagem informando que não foi possível concluir a operação solicitada.

c) O moderador poderá solicitar uma nova tentativa de remoção ou cancelar a operação.

d) Caso o moderador solicite uma nova tentativa, o sistema retorna à etapa de execução da remoção descrita no item g do fluxo alternativo de remoção de conteúdo.

e) Caso o moderador cancele a operação, o sistema retorna à área de moderação, mantendo o conteúdo anteriormente registrado.

**Pós-condições:** O moderador poderá consultar e analisar as publicações e os comentários disponíveis no sistema EcoVisão. Caso a remoção de um conteúdo seja concluída com sucesso, o conteúdo selecionado deixará de estar disponível para consulta pelos usuários da plataforma. Caso a operação seja cancelada ou não seja concluída com sucesso, o conteúdo anteriormente registrado permanecerá inalterado.
### Administrar Plataforma (CSU11)

**Sumário:** O administrador realiza o gerenciamento da plataforma EcoVisão, podendo consultar informações do sistema, gerenciar contas de usuários e administrar as configurações disponíveis, conforme as permissões atribuídas ao seu perfil.

**Ator Primário:** Administrador.

**Ator Secundário:** Não se aplica.

**Pré-condições:** O administrador deve possuir uma conta previamente cadastrada no sistema EcoVisão, estar devidamente autenticado e possuir as permissões necessárias para acessar as funcionalidades administrativas da plataforma.

**Fluxo Principal:**

1. O administrador realiza a autenticação no sistema EcoVisão.
2. O administrador acessa a página principal da plataforma.
3. O administrador seleciona a opção de administrar a plataforma.
4. O sistema apresenta a área administrativa, exibindo as funcionalidades disponíveis conforme as permissões do administrador.
5. O administrador seleciona a operação desejada: consultar informações da plataforma, gerenciar contas de usuários ou administrar as configurações disponíveis.
6. O sistema executa a operação selecionada, conforme os fluxos alternativos descritos.
7. Após a conclusão da operação, o sistema apresenta as informações atualizadas na área administrativa.
8. O administrador poderá realizar outra operação ou retornar à página principal da plataforma.

**Fluxo Alternativo (5): Consultar informações da plataforma**

a) O administrador seleciona a opção de consultar informações da plataforma.

b) O sistema recupera as informações disponíveis para consulta.

c) O sistema apresenta as informações solicitadas ao administrador.

d) O administrador poderá retornar à área administrativa e selecionar outra operação.

**Fluxo Alternativo (5): Gerenciar contas de usuários**

a) O administrador seleciona a opção de gerenciar contas de usuários.

b) O sistema apresenta as contas cadastradas e as operações administrativas disponíveis.

c) O administrador seleciona a conta que deseja gerenciar e escolhe uma operação permitida.

d) O sistema apresenta as informações correspondentes e solicita a confirmação quando a operação exigir alteração dos dados.

e) O administrador confirma a operação solicitada.

f) O sistema verifica as permissões do administrador e executa a operação selecionada.

g) O sistema apresenta uma mensagem confirmando a conclusão da operação e retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (5): Administrar configurações da plataforma**

a) O administrador seleciona a opção de administrar as configurações da plataforma.

b) O sistema apresenta as configurações disponíveis para gerenciamento.

c) O administrador seleciona a configuração que deseja alterar.

d) O sistema apresenta as informações da configuração selecionada e permite que o administrador realize as alterações autorizadas.

e) O administrador informa as alterações desejadas e solicita sua confirmação.

f) O sistema verifica as permissões do administrador e valida as informações fornecidas.

g) Caso os dados sejam válidos, o sistema registra as alterações e apresenta uma mensagem confirmando a atualização.

h) O sistema retorna ao passo 7 do fluxo principal.

**Fluxo Alternativo (6): Permissão insuficiente para realizar a operação**

a) O sistema identifica que o administrador não possui as permissões necessárias para realizar a operação solicitada.

b) O sistema apresenta uma mensagem informando que a operação não pode ser executada por falta de autorização.

c) O sistema não realiza alterações nos dados ou nas configurações da plataforma.

d) O administrador poderá retornar à área administrativa e selecionar outra operação disponível.

**Fluxo Alternativo (6): Dados inválidos ou incompletos**

a) O sistema identifica que os dados informados durante uma operação administrativa estão incompletos ou não atendem aos critérios de validação estabelecidos.

b) O sistema apresenta uma mensagem indicando os campos que precisam ser corrigidos.

c) O administrador corrige as informações e solicita novamente a realização da operação.

d) O sistema retorna à etapa de validação da operação selecionada.

**Fluxo Alternativo (6): Falha ao executar a operação administrativa**

a) O sistema identifica uma falha durante a execução da operação administrativa solicitada.

b) O sistema apresenta uma mensagem informando que não foi possível concluir a operação.

c) O administrador poderá solicitar uma nova tentativa ou cancelar a operação.

d) Caso o administrador solicite uma nova tentativa, o sistema retorna à etapa de execução da operação selecionada.

e) Caso o administrador cancele a operação, o sistema retorna à área administrativa, mantendo os dados anteriormente registrados.

**Pós-condições:** O administrador poderá consultar as informações da plataforma e realizar as operações administrativas autorizadas. Caso uma operação de gerenciamento seja concluída com sucesso, as alterações correspondentes serão registradas no sistema EcoVisão. Caso a operação seja cancelada ou não seja concluída com sucesso, os dados anteriormente registrados permanecerão inalterados.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema EcoVisão. O Usuário possui um Perfil e pode cadastrar ocorrências ambientais, gerar relatórios, além de criar publicações e comentários no fórum. Moderador e Administrador são tipos de Usuário que possuem permissões específicas para moderar conteúdos e administrar a plataforma.

#### Figura 2: Diagrama de Classes do Sistema.
 
![Diagrama de classes do EcoVisão](https://github.com/ICEI-PUC-Minas-PMV-SI/PMV-SI-2026-2-PE3-T3-G03-ECOVISAO/blob/main/docs/DIAGRAMA%20DE%20CLASSES.jpg)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Usuário |	Cadastro de informações relativas aos usuários do EcoVisão, que podem acessar o sistema e utilizar suas funcionalidades. |
| 2	| Perfil |	Informações pessoais do usuário que podem ser visualizadas e atualizadas. |
| 3 |	Moderador |	Usuário com permissões especifícas para moderação do fórum. |
| 4 |	Administrador |	Usuários com permissões administrativas para gerenciar configurações e informações da plataforma. |
| 5	|	OcorrenciaAmbiental |	Registro de alertas e ocorrências ambientais. |
| 6	|	Relatorios |	Relatórios gerados no sistema a partir das ocorrências ambientais. |
| 7	|	ConteudoEducativo |	Materiais educativos sobre questões ambientais disponibilizados para os usuários e visitantes. |
| 8	|	PublicacaoForum |	Publicação ou discussão criada por um usuário no fórum do EcoVisão. |
| 9	|	ComentarioForum |	Comentário realizado por um usuário em uma publicação no fórum. |
