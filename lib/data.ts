// Dados do cockpit Growth X. Fonte: conversas com o Guilherme + docs
// plano-de-guerra / novos-clientes / carteira-risco (ago/2026).
// Snapshot vivo — atualizado conforme o Guilherme reporta mudanças.
export const SNAPSHOT_DATE = "05/08/2026";

export type Flag = "critical" | "danger" | "care" | "safe";
export type Stage = "Triagem" | "Diagnóstico" | "Alinhamento" | "Execução" | "Validação";

export interface RiskClient {
  id: string;
  name: string;
  flag: Flag;
  feeMonthly: number | null;
  feeLabel?: string;
  owner: string;
  stage: Stage;
  context: string;
  plan: string[];
  noTratativa?: boolean;
}

export const riskClients: RiskClient[] = [
  {
    id: "exohair",
    name: "Exohair",
    flag: "critical",
    feeMonthly: 16102.88,
    owner: "Mattos",
    stage: "Alinhamento",
    context:
      "Cliente muito chateado, risco alto de churn. Marketplace parcialmente travado: Mercado Livre já destravado; Amazon travado (dono da conta/marca desconhecido, suporte aberto com Harlem); TikTok esperando lista de influenciadores da Gabi (Social Media); Shopee travado por CNAME/registro da empresa com caracteres alfanuméricos inválidos pro cadastro. Além disso, o e-commerce não está batendo meta.",
    plan: [
      "Manter suporte aberto pra resolver a titularidade da conta Amazon",
      "Fechar lista de influenciadores do TikTok com a Gabi",
      "Resolver cadastro/CNAME da Shopee",
      "Recuperar performance do e-commerce pra bater meta",
    ],
  },
  {
    id: "dex-invest",
    name: "DEX Invest",
    flag: "critical",
    feeMonthly: 13027.17,
    owner: "Rafael",
    stage: "Execução",
    context:
      "Dificuldade recorrente de cartão/pagamento no Meta Ads: a conexão da API desconectou, o cartão foi adicionado e voltou a desconectar. Força-tarefa entre Pedro Miguel, Guilherme e Rafael pra destravar junto com o cliente — que é distante e responde devagar, o que atrapalha a velocidade necessária.",
    plan: ["Manter suporte do Meta Ads aberto", "Atualizar o cliente a cada movimentação"],
  },
  {
    id: "ale-style",
    name: "Ale Style",
    flag: "critical",
    feeMonthly: 5000,
    owner: "Harlem",
    stage: "Execução",
    context:
      "Cliente cresceu muito rápido e não trouxe estrutura interna pra acompanhar — resultado: penalidade em Shopee, Mercado Livre e TikTok simultaneamente. Faturamento caiu de forma absurda. Cliente desesperado, com risco real da empresa quebrar se o processo não for retomado.",
    plan: [
      "Reunião com Guilherme e Harlem em 05/08 pra apresentar plano de processos",
      "Ajudar a empresa como um todo, não só a conta de marketplace",
    ],
  },
  {
    id: "sems",
    name: "SEMS Biofarmacêutica",
    flag: "critical",
    feeMonthly: 5000,
    owner: "Harlem",
    stage: "Alinhamento",
    context:
      "Cliente com baixo nível de consciência — Muller vem tentando elevar semana a semana, processo complexo. Em 04/08 o cliente pediu cancelamento do contrato no grupo, agradecendo o time. Tentativa de ligação sem sucesso; ligação de reversão confirmada pelo cliente para 05/08 às 10h.",
    plan: [
      "Ligação de reversão em 05/08, 10h, pra entender melhor a situação",
      "Tentar reverter o cancelamento a partir do diagnóstico dessa ligação",
    ],
  },
  {
    id: "bellaloft",
    name: "Bellaloft",
    flag: "critical",
    feeMonthly: null,
    feeLabel: "Cortesia (mês de graça)",
    owner: "Mattos",
    stage: "Execução",
    context:
      "Cliente pediu cancelamento do contrato, encerramento previsto para 31/07. Ligação de negociação garantiu +30 dias, com plano de recovery envolvendo várias frentes da V4 atuando de forma integrada. Cliente está engajada e confiante no plano — o desafio agora é converter esse engajamento em resultado concreto dentro do prazo.",
    plan: [
      "Executar o recovery de 30 dias com acompanhamento próximo de todas as frentes",
      "Priorizar ações com maior potencial de impacto no curto prazo",
      "Manter a cliente atualizada e buscar resultado tangível pra reverter o churn",
    ],
  },
  {
    id: "beetle-press",
    name: "Beetle Press",
    flag: "danger",
    feeMonthly: 7587.0,
    owner: "Gabriela Hamazaki",
    stage: "Execução",
    context:
      "Na 3ª entrega da E.E. (30/07) o cliente ficou impaciente e, ao tratar da proposta de assessoria, mudou de percepção e ficou irritado — achou o serviço contratado abaixo do esperado e disse que pareceu apenas uma porta de entrada pra vender outros serviços. Em 31/07 a closer Gabi Hamazaki foi acionada pra tentar visita presencial; sem retorno do cliente até agora.",
    plan: ["Follow-up diário com o cliente", "Fechar visita presencial via Gabi Hamazaki pra entender a real insatisfação"],
  },
  {
    id: "hippus",
    name: "Hippus",
    flag: "danger",
    feeMonthly: 7500,
    owner: "Pedro",
    stage: "Validação",
    context:
      "Projeto pausado por inadimplência — cliente com dificuldade de fluxo de caixa. Operação ficou congelada até a regularização financeira. Pagamentos já normalizados; projeto será reativado e a execução das entregas retomada.",
    plan: [
      "Replanejar a operação e retomar as atividades do projeto",
      "Alinhar com o cliente prioridades e próximos passos da execução",
      "Acompanhar de perto as primeiras entregas pós-reativação",
    ],
  },
  {
    id: "vivacril",
    name: "Vivacril",
    flag: "danger",
    feeMonthly: 7350,
    owner: "Guilherme",
    stage: "Diagnóstico",
    context:
      "Cliente quer churnar o contrato de marketplace por falta de resultado. Plano construído com Harlem projeta ~R$ 7.000 de receita em 3 meses, o que não sustenta a decisão de cancelar — mas o cliente insiste em encerrar só o marketplace. Um material de overdelivery entregue recentemente foi muito bem recebido, reforçando o relacionamento.",
    plan: [
      "Apresentar a projeção de resultado (3 meses) pra sustentar a permanência",
      "Usar o relacionamento reforçado pelo overdelivery como ponto de apoio na negociação",
    ],
  },
  {
    id: "matronfer",
    name: "Matronfer",
    flag: "care",
    feeMonthly: 6996.83,
    owner: "Harlem",
    stage: "Alinhamento",
    context:
      "Implementação paga e em execução travou no momento de definir o CNPJ: a empresa é lucro presumido e foi orientada a migrar pro Simples Nacional / abrir novo CNPJ. Cliente sem retorno há cerca de 40 dias — e já começou a pagar a recorrência do projeto, o que torna a destrava urgente.",
    plan: [
      "Retomar contato ativo com o cliente pra resolver a pendência de CNPJ",
      "Destravar a implementação o mais rápido possível, já que a recorrência está correndo",
    ],
  },
  {
    id: "resimaq",
    name: "Resimaq",
    flag: "care",
    feeMonthly: 6955.48,
    owner: "Pedro",
    stage: "Execução",
    context:
      "Cliente insatisfeito com a IA V4 — na percepção dele, não atendeu à expectativa nem funcionou como deveria. A insatisfação gerou desgaste no relacionamento e motivou a abertura da tratativa.",
    plan: [
      "Identificar os pontos específicos de insatisfação com a IA V4",
      "Validar se é limitação da ferramenta, configuração ou desalinhamento de expectativa",
      "Apresentar plano de ajuste e acompanhar a evolução pra recuperar a confiança",
    ],
  },
  {
    id: "aguia-de-ouro",
    name: "Águia de Ouro",
    flag: "care",
    feeMonthly: 6300,
    owner: "Pedro",
    stage: "Execução",
    context:
      "Risco de churn elevado por três frentes: CRM SocialHub com falhas desde a implementação; site indisponível com problema de domínio, que também tirou o e-mail vinculado do ar, travando a regularização; e percepção de assessoria distante, sem acompanhamento próximo.",
    plan: [
      "Ligação de diagnóstico em 25/07 já realizada",
      "Plano interno via metodologia PDCA, por time responsável em cada frente",
      "Follow-up com a cliente a cada 2 dias, priorizando o técnico e o relacionamento",
    ],
  },
  {
    id: "multimax",
    name: "Multimax",
    flag: "care",
    feeMonthly: 4932.93,
    owner: "William",
    stage: "Execução",
    context:
      "Implementação do marketplace finalizada, mas o cliente não quer investir em ads. Isso trava a escala da conta e impede o cliente de ter resultado.",
    plan: ["Elevar o nível de consciência do cliente em reuniões", "Conseguir verba mínima de R$ 500 pra ads"],
  },
  {
    id: "forte-da-brisa",
    name: "Forte da Brisa",
    flag: "care",
    feeMonthly: 2179.82,
    owner: "Pedro",
    stage: "Execução",
    context:
      "Implementação do e-commerce em fase final travou por resistência interna: um stakeholder-chave da empresa tem forte resistência a novos sistemas e tende a influenciar o resto do time contra a adoção, colocando em risco a continuidade do projeto.",
    plan: [
      "Concluir a análise técnica com a Nuvemshop pra mapear alternativas",
      "Alinhamento entre Tiago, Basiotti, Pedro Mariano e a cliente",
      "Estruturar solução que reduza a resistência e permita seguir com o projeto",
    ],
  },
];

export const excludedChurn = [
  {
    name: "Larmix",
    note: "Já é churn — entra na conta de churn de agosto de 2026. Resolvido, não precisa de tratativa.",
  },
  {
    name: "GGPEL Livraria e Papelaria",
    note: "Já é churn — decisão consciente de não tentar recuperar (fee baixo demais pro trabalho que dá).",
  },
];

export const boRules = [
  { icon: "🔥", text: "Tem <b>raiva do problema</b> e resolve o mais rápido possível." },
  { icon: "🏁", text: "Vai <b>até o final</b> — não desiste no meio do caminho." },
  { icon: "🧠", text: "Entende que o problema todo mundo já sabe — o que importa é <b>qual é a solução</b>." },
  {
    icon: "📣",
    text: "Mantém a <b>comunicação a cada 2 dias</b> no grupo do cliente, marcando o stakeholder e dando resumo rápido + atualização.",
  },
];

export interface RankRow {
  owner: string;
  value: number;
  contas: string[];
  pct: number;
}

export const boRanking: RankRow[] = [
  { owner: "Pedro", value: 22935.3, contas: ["Hippus", "Resimaq", "Águia de Ouro", "Forte da Brisa"], pct: 100 },
  { owner: "Harlem", value: 16996.83, contas: ["Ale Style", "Sems", "Matronfer"], pct: 74 },
  { owner: "Mattos", value: 16102.88, contas: ["Exohair", "Bellaloft (cortesia)"], pct: 70 },
  { owner: "Rafael", value: 13027.17, contas: ["DEX Invest"], pct: 57 },
  { owner: "Gabriela Hamazaki", value: 7587.0, contas: ["Beetle Press"], pct: 33 },
  { owner: "Guilherme", value: 7350.0, contas: ["Vivacril"], pct: 32 },
  { owner: "William", value: 4932.93, contas: ["Multimax"], pct: 22 },
];

// ===== Cruzamento com NPS / satisfação real (Pipefy) =====
export interface NpsRow {
  cliente: string;
  flag: Flag;
  score: number | null;
  nota: string;
  classificacao: string;
}

export const npsRows: NpsRow[] = [
  { cliente: "Águia de Ouro", flag: "care", score: 3.17, nota: "4", classificacao: "Detrator" },
  { cliente: "Bellaloft", flag: "critical", score: 3.33, nota: "2", classificacao: "Detrator" },
  { cliente: "GGPEL", flag: "care", score: 3.5, nota: "9", classificacao: "Promotor" },
  { cliente: "Sems Biofarmacêutica", flag: "care", score: 3.67, nota: "8", classificacao: "Neutro" },
  { cliente: "Calçados Sérgio", flag: "safe", score: 4.0, nota: "5 e 10 (mista)", classificacao: "Detrator + Promotor" },
  { cliente: "Hiraga Semijoias", flag: "safe", score: 4.0, nota: "8", classificacao: "Neutro" },
  { cliente: "Forte da Brisa", flag: "care", score: 4.33, nota: "—", classificacao: "—" },
  { cliente: "Resimaq", flag: "care", score: 4.5, nota: "10", classificacao: "Promotor" },
  { cliente: "Vivacril", flag: "safe", score: 4.5, nota: "10", classificacao: "Promotor" },
  { cliente: "Alcance Jeans", flag: "safe", score: 4.5, nota: "9", classificacao: "Promotor" },
  { cliente: "Ale Style", flag: "safe", score: 4.75, nota: "10", classificacao: "Promotor" },
  { cliente: "Baba Materiais", flag: "safe", score: 4.83, nota: "9", classificacao: "Promotor" },
  { cliente: "Mactoot", flag: "safe", score: 5.0, nota: "9", classificacao: "Promotor" },
  { cliente: "Markys Store", flag: "safe", score: 5.0, nota: "10", classificacao: "Promotor" },
  { cliente: "DomHome", flag: "safe", score: null, nota: "10", classificacao: "Promotor" },
];

// Cor da classificação segue a mesma paleta das flags, mas com lógica própria
// (não é o flag do cliente — é o veredito do NPS real: Detrator/Neutro/Promotor/misto).
export function classificacaoTagClass(classificacao: string): string {
  if (classificacao === "Detrator") return "tag neg";
  if (classificacao === "Promotor") return "tag pos";
  if (classificacao === "Neutro") return "tag care";
  if (classificacao.includes("+")) return "tag mixed";
  return "tag muted";
}

export interface Sentimento {
  cliente: string;
  flag: Flag;
  bucket: "positivo" | "neutro" | "negativo";
  score: number;
  sinal: string;
}

export const sentimentos: Sentimento[] = [
  { cliente: "GGPEL", flag: "care", bucket: "neutro", score: 46, sinal: "Aviso prévio já formalizado (17/07)" },
  { cliente: "Bellaloft", flag: "critical", bucket: "neutro", score: 53, sinal: "Pediu reunião de fechamento (28/07)" },
  { cliente: "DEX Invest", flag: "critical", bucket: "negativo", score: 38, sinal: "40+ dias sem entrega, crítica direta ao financeiro" },
  { cliente: "Hippus", flag: "danger", bucket: "neutro", score: 50, sinal: "Projeto pausado pelo financeiro desde 20/07" },
  { cliente: "Águia de Ouro", flag: "care", bucket: "neutro", score: 57, sinal: "Churn silencioso — não engaja, só reage" },
  { cliente: "Resimaq", flag: "care", bucket: "positivo", score: 61, sinal: "Cliente investigou a própria conta Ads por desconfiança" },
  { cliente: "Exohair", flag: "critical", bucket: "positivo", score: 66, sinal: "Pergunta estratégica ignorada, healthscore 96→86" },
  { cliente: "Forte da Brisa", flag: "care", bucket: "positivo", score: 73, sinal: "Promessa de gateway sem retorno há 3+ semanas" },
  { cliente: "Beetle Press", flag: "danger", bucket: "positivo", score: 77, sinal: "Call revelou \"coisas vagas\" e \"muito ruim\"" },
  { cliente: "Sems Biofarmacêutica", flag: "critical", bucket: "positivo", score: 82, sinal: "Cobrou meta e números, sem resposta concreta" },
];

export const achadosSentimento = [
  "<strong>GGPEL já formalizou aviso prévio em 17/07</strong> — na prática é churn (já excluído do cálculo de receita em risco, ver nota acima).",
  "<strong>DEX Invest tem o pior sentimento medido de toda a base (negativo, 38/100)</strong> — 40+ dias sem entrega e crítica direta ao financeiro.",
  "<strong>Padrão perigoso: a maioria dos não-safe tem tom cordial ou bom no grupo do WhatsApp</strong> (Resimaq, Exohair, Forte da Brisa, Beetle Press, Sems Bio) escondendo um problema real — promessa furada, pergunta ignorada, ou desconfiança silenciosa. Tom de grupo e NPS sozinhos não capturam esse risco; só aparece cruzando com o resumo da IA.",
];

// ===== KPIs — Seção 01/02 do Plano de Guerra =====
export const kpis = {
  receita: { label: "Receita", meta: 200000, real: 162486.45, gapLabel: "81,2% da meta" },
  monetizacao: { label: "Monetização", meta: 30745.03, real: 450.0, gapLabel: "1,5% da meta" },
  churn: { label: "Churn", meta: "6,0%", real: "4,17%", gapLabel: "Dentro da meta" },
  nrr: { label: "NRR %", meta: "100%", real: "91,6%", gapLabel: "-8,4 p.p." },
  volume: { label: "Volume Ideal Clientes", meta: "24", real: "32", gapLabel: "+8 acima do ideal (133%)" },
};

export const squadSize = {
  unidadesV4: 180,
  receitaJulho: 154000,
  posicao: "Top 55,8%",
  contexto:
    "80 unidades da V4 Company faturam mais que o Growth X — mas nós faturamos mais que as outras 100. Isso coloca o squad entre os 55,8% melhores de toda a rede.",
};

export const pipeQuente: number | null = 7403;

// Figuras manuais do cockpit — Guilherme reporta, eu atualizo. Não são derivadas
// automaticamente porque a categorização de produto (E.E./E.C.) nos dados de origem
// não é consistente o suficiente pra contar com segurança.
export const eeAtiva = 4;
export const ecAtiva = 2;
export const novosNRR = 3;
export const revenueChurnValor = 6073.35;
export const npsResposta = { real: 30, meta: 60 };
export const notaNPS = { valor: 85.7, minimo: 50 };
export const contatoCliente = 9;

export const metaDezembro = {
  baseAgosto: 162400,
  metaDezembro: 280000,
  ritmoMinimo: 29400,
  contexto:
    "A base de agosto já inclui o Moviw (novo MRR do squad). Os demais projetos novos fechados este mês são E.E./Estruturação one-time — contam como receita, mas não como MRR nem NRR.",
};

export const cronograma = [
  { data: "Até dia 7", date: "2026-08-07", titulo: "Relatórios One Page revisados", desc: "Todos os relatórios One Page no Ekyte revisados pelos gestores de projeto — sem exceção de cliente.", status: "active" as const },
  { data: "Até dia 10", date: "2026-08-10", titulo: "Account Planning completo", desc: "Account planning completo e atualizado na Kommo, cliente por cliente.", status: "active" as const },
  { data: "Até dia 15", date: "2026-08-15", titulo: "60% de resposta de NPS", desc: "60% de resposta de NPS na base de clientes do squad.", status: "next" as const },
  { data: "Até dia 25", date: "2026-08-25", titulo: "80% da meta de monetização", desc: "Meta de monetização do mês batida em 80%.", status: "future" as const },
];

// ===== As 3 alavancas — Seção 04 =====
export const alavancas = [
  {
    n: "01",
    periodo: "Aquisição de E.E.",
    titulo: "Novos projetos estratégicos",
    obj: "Receita one-time zerada em julho — não é \"baixa\", é zero. Sair do zero é a prioridade imediata. E.E. é one-time, mas abre porta pra monetização recorrente depois, se a gente souber capturar a dor identificada no diagnóstico.",
    donos: ["Caio Mattos", "Pedro Mariano"],
  },
  {
    n: "02",
    periodo: "Monetização",
    titulo: "Destravar variável de marketplace",
    obj: "Muitos projetos de marketplace têm variável represada em contrato — sem clareza hoje. Revisão contrato a contrato, trazendo transparência sobre o que está parado e o plano de destrave junto com o time.",
    donos: ["Guilherme (revisão de contratos)", "Harlem", "Muller", "William"],
  },
  {
    n: "03",
    periodo: "Retenção",
    titulo: "Contenção de churn",
    obj: "Responsabilidade de todos no dia a dia — mas a condução das tratativas de clientes com flag alterada é do Guilherme. Regra não negociável: nenhum cliente com flag verde pode virar churn.",
    donos: ["Guilherme — tratativas de flag", "Time inteiro — dia a dia"],
  },
];

// ===== Variável de marketplace mapeada — Seção 06 =====
export const variavelMarketplace = [
  {
    cliente: "Vinho Mil Vientos",
    status: "mapped" as const,
    plataforma: "Mercado Livre",
    tiers: [
      { label: "Piso — só paga acima de", value: "R$ 50 mil/mês" },
      { label: "R$ 50–60 mil", value: "3%" },
      { label: "R$ 60–70 mil", value: "3,5%" },
      { label: "R$ 70–80 mil", value: "4%" },
      { label: "R$ 80–100 mil", value: "4,5%" },
      { label: "Acima de R$ 100 mil", value: "5%" },
    ],
    nota: "Apurado pelos relatórios da própria plataforma Mercado Livre.",
  },
  {
    cliente: "Calçados Sérgio",
    status: "mapped" as const,
    plataforma: "Mercado Livre",
    tiers: [
      { label: "Até R$ 20 mil", value: "3%" },
      { label: "Até R$ 40 mil", value: "3,5%" },
      { label: "Até R$ 60 mil", value: "4%" },
      { label: "Até R$ 80 mil", value: "4,5%" },
      { label: "Até R$ 100 mil", value: "5%" },
    ],
    nota: "Sem piso mínimo — variável já corre desde o primeiro real de faturamento.",
  },
  {
    cliente: "Muller Diesel",
    status: "mapped" as const,
    plataforma: "Marketplace",
    tiers: [{ label: "Taxa fixa sobre vendas", value: "2%" }],
    nota: "Sem faixa progressiva — percentual único durante toda a vigência.",
  },
  {
    cliente: "Vivacril",
    status: "mapped" as const,
    plataforma: "Marketplace",
    tiers: [{ label: "Taxa fixa sobre resultado", value: "2%" }],
    nota: "Sem faixa progressiva.",
  },
  {
    cliente: "Ale Style",
    status: "mapped" as const,
    plataforma: "Shopee — 2 contas",
    tiers: [
      { label: "Conta principal, acima de R$ 300 mil", value: "1%" },
      { label: "Conta secundária, acima de R$ 200 mil", value: "1%" },
    ],
    nota: "Duas contas Shopee com pisos e percentuais independentes.",
  },
  {
    cliente: "Multimax",
    status: "none" as const,
    plataforma: "Marketplace",
    tiers: [{ label: "Contrato não prevê variável", value: "—" }],
    nota: "Nada a destravar aqui — fora do escopo da Alavanca 02.",
  },
  {
    cliente: "Crist Store",
    status: "none" as const,
    plataforma: "Marketplace",
    tiers: [{ label: "Contrato não prevê variável", value: "—" }],
    nota: "Confirmado — nada a destravar aqui, sai do escopo da Alavanca 02.",
  },
  {
    cliente: "Sems Bio",
    status: "pending" as const,
    plataforma: "Marketplace",
    tiers: [{ label: "Contrato ainda não conferido", value: "?" }],
    nota: "Falta abrir o contrato pra confirmar a regra.",
  },
];

// ===== Responsabilidades — Seção 07 =====
export const responsabilidades = [
  { rotina: "Flag dos clientes", dono: "Coordenador", cadencia: "Semanal" },
  { rotina: "Kommo CRM — Monetização", dono: "Gestor de Projetos", cadencia: "Contínua" },
  { rotina: "Kommo CRM — CS e tratativas", dono: "Coordenador", cadencia: "Contínua" },
  { rotina: "Growthpack", dono: "Gestor de Tráfego", cadencia: "Segunda e sexta" },
  { rotina: "Qualytic", dono: "Gestor de Tráfego + Gestor de Projetos", cadencia: "Segunda, quarta e sexta" },
];

export const naoAceitar = [
  "Clientes sem dados no Qualytic ou no Growthpack",
  "Braço curto",
  "Confiar que o próximo vai executar a tarefa sem follow-up",
  "Apontamento de horas defasado ou com falhas",
  "Não usar o Copilot como principal ferramenta de trabalho",
];

export const precisaDeMim = [
  "Dificuldade de comunicação com colega de time",
  "Desafios operacionais",
  "Problemas que podem estar impactando a entrega",
  "Flag levantada pelo cliente",
  "Qualquer coisa que não estão conseguindo lidar sozinhos",
];

export const objetivos = [
  "Crescer os clientes da carteira sem depender de aquisição",
  "Cortar clientes pequenos ou \"bombas\" — só quando as metas estiverem batidas e o NRR em 100%",
  "Bater as metas de forma basal — NPS, monetização e meta dos clientes",
  "PPTL na prática",
  "Cooperar para que todos tenham trabalho leve, divertido, mas estratégico e focado",
  "Entender o objetivo em comum",
];

export const quotes = [
  { texto: "Fizemos de tudo e não geramos resultado.", quem: "Bellaloft" },
  { texto: "Modelo de negócio está fadado ao fracasso.", quem: "Águia de Ouro" },
];

// ===== Pareto — fee recorrente x horas (30 dias) — Seção 03 =====
export interface CarteiraItem {
  nome: string;
  fee: number;
  horas: number;
}

export const carteira30d: CarteiraItem[] = [
  { nome: "Exohair", fee: 16102.84, horas: 1142.4 },
  { nome: "Muller Diesel", fee: 13134.8, horas: 190.5 },
  { nome: "Moviw", fee: 9518.26, horas: 75.7 },
  { nome: "Alcance Jeans", fee: 9054.0, horas: 238.2 },
  { nome: "Bellaloft", fee: 8870.03, horas: 354.5 },
  { nome: "Baba Materiais", fee: 8000, horas: 539.7 },
  { nome: "Beetle Press", fee: 7587, horas: 42.3 },
  { nome: "Hippus", fee: 7500, horas: 288 },
  { nome: "Vivacril", fee: 7350, horas: 864.4 },
  { nome: "Matronfer", fee: 6996.83, horas: 0 },
  { nome: "Resimaq", fee: 6955.48, horas: 713 },
  { nome: "Terroá Hotel", fee: 6932.08, horas: 94.5 },
  { nome: "DEX Invest", fee: 6513.59, horas: 166 },
  { nome: "Águia de Ouro", fee: 6300, horas: 527.3 },
  { nome: "Larmix", fee: 6073.35, horas: 92.5 },
  { nome: "Markys Store", fee: 6000, horas: 454.8 },
  { nome: "Ale Style", fee: 5000, horas: 310.4 },
  { nome: "Sems Biofarmacêutica", fee: 5000, horas: 263 },
  { nome: "Vizary", fee: 5000, horas: 8.1 },
  { nome: "Multimax", fee: 4932.93, horas: 207.9 },
  { nome: "Mactoot", fee: 4163, horas: 740.3 },
  { nome: "Hiraga Semijoias", fee: 4000, horas: 475.6 },
  { nome: "DomHome", fee: 3436.24, horas: 54 },
  { nome: "Dalia PRO", fee: 3188.34, horas: 171.5 },
  { nome: "GGPEL", fee: 3000, horas: 235.4 },
  { nome: "Calçados Sérgio", fee: 2956.78, horas: 964.1 },
  { nome: "Forte da Brisa", fee: 2179.82, horas: 155.7 },
];

// ===== Novos clientes de agosto/2026 =====
export interface NovoCliente {
  nome: string;
  owner: string;
  fee: string;
  produto: string;
  gt?: string;
  inicio?: string;
  status?: { label: string; kind: "iniciado" | "aguardando" | "futuro" };
  extra?: { label: string; value: string }[];
}

export const novosClientesGroups: { owner: string; total: string; clientes: NovoCliente[] }[] = [
  {
    owner: "Caio Mattos",
    total: "R$ 75.831,83 confirmados",
    clientes: [
      {
        nome: "Soul Electric",
        owner: "Caio Mattos",
        fee: "R$ 30.348,00 (10x R$ 3.048,00 no cartão)",
        produto: "E.E. (Estruturação Estratégica)",
        gt: "Leonardo de Lima / Geovana",
        status: { label: "Iniciado", kind: "iniciado" },
      },
      {
        nome: "AXE Performance",
        owner: "Caio Mattos",
        fee: "R$ 30.348,00 (10x R$ 3.048,00 no cartão)",
        produto: "E.E. (Estruturação Estratégica)",
        gt: "Leonardo de Lima / Michel",
        inicio: "31/07 / 31/07",
      },
      {
        nome: "Conela",
        owner: "Caio Mattos",
        fee: "R$ 15.135,83 (6x R$ 2.522,64 no cartão)",
        produto: "Estruturação Comercial",
        gt: "Leonardo de Lima / Michel",
        inicio: "30/07 / 29/07",
      },
    ],
  },
  {
    owner: "Pedro Mariano",
    total: "R$ 9.518,26/mês + R$ 34.283,32",
    clientes: [
      {
        nome: "Moviw",
        owner: "Pedro (+ Viviane, transição)",
        fee: "R$ 9.518,26/mês",
        produto: "Recorrente — Social, Designer, Tráfego",
        gt: "Daniel Santana / Geovana",
        inicio: "31/07 / 13/07",
        status: { label: "Iniciado", kind: "iniciado" },
      },
      {
        nome: "Ankor",
        owner: "Pedro Mariano",
        fee: "R$ 22.002,31 (10x R$ 2.200,23 no cartão)",
        produto: "Estruturação Comercial",
        gt: "Daniel Santana / Michel",
        inicio: "27/07 / 24/07",
        extra: [
          { label: "Adendo", value: "Escopo inclui construção de site" },
          { label: "Observação", value: "Cliente em transição do squad Growth Lab" },
        ],
      },
      {
        nome: "Pousada Vale Encantado",
        owner: "Pedro Mariano",
        fee: "R$ 12.281,01 (Pix, à vista)",
        produto: "E.E. (Estruturação Estratégica)",
        gt: "Daniel Santana / Geovana",
        extra: [{ label: "Assinatura", value: "15/07" }],
        status: { label: "Início 13/08 — mais pra frente", kind: "futuro" },
      },
    ],
  },
];

export const novosClientesTotais = {
  novosProjetos: 6,
  mrrNovo: "R$ 9.518,26",
  eeConfirmado: "R$ 110.115,15",
};

export const novosClientesCtx = [
  "Por que essa distribuição: Pedro já carrega o book mais pesado no momento (10 clientes, 5 em risco, R$ 30,5 mil expostos) — por isso ficou só com Moviw (já em andamento), Pousada Vale Encantado e Ankor. Caio, com menos risco proporcional na carteira agora, ficou com os 3 projetos de escopo fechado (E.E./Estruturação) — Soul Electric, AXE Performance e Conela.",
  "Se o Beetle Press (hoje com Pedro) realmente sair — está finalizando e ainda não se sabe se vai monetizar — a vaga que abrir pode ser usada pra rebalancear, movendo um projeto do Caio pro Pedro no lugar.",
];

export const processosEntrada = [
  {
    titulo: "Cliente novo",
    passos: [
      "Coordenador faz contato com o cliente",
      "Cria grupo de WhatsApp",
      "Cria grupo no Gchat",
      "Coordenador faz o Growthclass",
      "Coordenador envia tudo no Gchat do cliente",
      "Account organiza as tasks pra todos os players + doc de dúvidas do kick-off",
      "Fazemos o kick-off",
      "Execução",
    ],
  },
  {
    titulo: "Cliente em transição",
    passos: [
      "Account puxa agenda com o account antigo e compreende o processo",
      "Se necessário, aciona o coordenador para tratativa",
      "Account distribui tasks pro time estudar e puxa call interna com o novo time",
      "Execução — porém o account antigo precisa participar por mais 1 mês em reuniões etc.",
    ],
  },
];

// ===== Kanban de onboarding — Novos Clientes =====
export type OnboardingType = "novo" | "transicao";

export const ONBOARDING_STAGES = [
  "Growthclass",
  "Kickoff",
  "Semana 2",
  "Semana 3",
  "Semana 4",
  "Semana 5",
  "Finalizado",
] as const;
export type OnboardingStage = (typeof ONBOARDING_STAGES)[number];

export interface ChecklistItem {
  label: string;
  done: boolean;
}

export interface KanbanClient {
  id: string;
  nome: string;
  owner: string;
  gt?: string;
  fee: string;
  produto: string;
  tipo: OnboardingType;
  stage: OnboardingStage;
  inicio?: string;
  extra?: { label: string; value: string }[];
  checklist: ChecklistItem[];
}

export function checklistFor(tipo: OnboardingType): ChecklistItem[] {
  const passos = tipo === "novo" ? processosEntrada[0].passos : processosEntrada[1].passos;
  return passos.map((label) => ({ label, done: false }));
}

export const novosClientesKanbanSeed: KanbanClient[] = [
  {
    id: "soul-electric",
    nome: "Soul Electric",
    owner: "Caio Mattos",
    gt: "Leonardo de Lima / Geovana",
    fee: "R$ 30.348,00 (10x R$ 3.048,00 no cartão)",
    produto: "E.E. (Estruturação Estratégica)",
    tipo: "novo",
    stage: "Kickoff",
    checklist: checklistFor("novo"),
  },
  {
    id: "axe-performance",
    nome: "AXE Performance",
    owner: "Caio Mattos",
    gt: "Leonardo de Lima / Michel",
    fee: "R$ 30.348,00 (10x R$ 3.048,00 no cartão)",
    produto: "E.E. (Estruturação Estratégica)",
    tipo: "novo",
    stage: "Growthclass",
    inicio: "31/07 / 31/07",
    checklist: checklistFor("novo"),
  },
  {
    id: "conela",
    nome: "Conela",
    owner: "Caio Mattos",
    gt: "Leonardo de Lima / Michel",
    fee: "R$ 15.135,83 (6x R$ 2.522,64 no cartão)",
    produto: "Estruturação Comercial",
    tipo: "transicao",
    stage: "Growthclass",
    inicio: "30/07 / 29/07",
    checklist: checklistFor("transicao"),
  },
  {
    id: "moviw",
    nome: "Moviw",
    owner: "Pedro Mariano (+ Viviane, transição)",
    gt: "Daniel Santana / Geovana",
    fee: "R$ 9.518,26/mês",
    produto: "Recorrente — Social, Designer, Tráfego",
    tipo: "transicao",
    stage: "Kickoff",
    inicio: "31/07 / 13/07",
    checklist: checklistFor("transicao"),
  },
  {
    id: "ankor",
    nome: "Ankor",
    owner: "Caio Mattos",
    gt: "Leonardo de Lima / Michel",
    fee: "R$ 22.002,31 (10x R$ 2.200,23 no cartão)",
    produto: "Estruturação Comercial",
    tipo: "transicao",
    stage: "Kickoff",
    inicio: "27/07 / 24/07",
    extra: [
      { label: "Adendo", value: "Escopo inclui construção de site" },
      { label: "Observação", value: "Cliente em transição do squad Growth Lab" },
    ],
    checklist: checklistFor("transicao"),
  },
  {
    id: "pousada-vale-encantado",
    nome: "Pousada Vale Encantado",
    owner: "Pedro Mariano",
    gt: "Daniel Santana / Geovana",
    fee: "R$ 12.281,01 (Pix, à vista)",
    produto: "E.E. (Estruturação Estratégica)",
    tipo: "novo",
    stage: "Growthclass",
    extra: [{ label: "Assinatura", value: "15/07" }],
    inicio: "Início 13/08 — mais pra frente",
    checklist: checklistFor("novo"),
  },
];

// ===== Carteira completa — todos os projetos e executores =====
export type CarteiraFlag = Flag | "churn";

export interface CarteiraRow {
  nome: string;
  flag: CarteiraFlag;
  fee: number;
  account: string;
  gt: string;
  designer: string;
  socialMedia: string;
  isNovo?: boolean;
}

// Fonte: planilha de account/GT/designer/social media passada pelo Guilherme (dados reais por projeto).
// Flag continua sendo a nossa (v4-hub + reestruturação manual) — não vem da planilha.
export const carteiraCompleta: CarteiraRow[] = [
  { nome: "Muller Diesel (Marketplace)", flag: "safe", fee: 6567.4, account: "William", gt: "William", designer: "—", socialMedia: "—" },
  { nome: "Muller Diesel", flag: "safe", fee: 6567.4, account: "Pedro", gt: "Daniel Santana", designer: "Michel", socialMedia: "—" },
  { nome: "Bellaloft", flag: "critical", fee: 8870.03, account: "Caio Mattos", gt: "Leonardo", designer: "Geovana", socialMedia: "—" },
  { nome: "Exohair", flag: "critical", fee: 9000.0, account: "Caio Mattos", gt: "Leonardo", designer: "Geovana", socialMedia: "—" },
  { nome: "Baba", flag: "safe", fee: 8000.0, account: "Caio Mattos", gt: "Leonardo", designer: "Michel", socialMedia: "Gabriela" },
  { nome: "Beetle Press E.E", flag: "danger", fee: 7587.0, account: "Pedro", gt: "Daniel Santana", designer: "Geovana", socialMedia: "—" },
  { nome: "Hippus", flag: "danger", fee: 7500.0, account: "Pedro", gt: "Daniel Santana", designer: "Michel", socialMedia: "—" },
  { nome: "Exohair (Marketplace)", flag: "critical", fee: 7102.84, account: "Muller", gt: "Muller", designer: "—", socialMedia: "—" },
  { nome: "Matronfer (Marketplace)", flag: "care", fee: 6996.83, account: "Harlem", gt: "Harlem", designer: "—", socialMedia: "—" },
  { nome: "Terroá Hotel E.E", flag: "safe", fee: 6932.08, account: "Pedro", gt: "Daniel Santana", designer: "Michel", socialMedia: "Gabriela" },
  { nome: "Dex", flag: "critical", fee: 6513.0, account: "Caio Mattos", gt: "Leonardo", designer: "Michel", socialMedia: "—" },
  { nome: "Alcance Jeans - Costa Almeida", flag: "safe", fee: 6480.0, account: "Caio Mattos", gt: "Leonardo", designer: "Geovana", socialMedia: "—" },
  { nome: "Águia de Ouro", flag: "care", fee: 6300.0, account: "Pedro", gt: "Daniel Santana", designer: "Michel", socialMedia: "—" },
  { nome: "Markys Store (Marketplace)", flag: "safe", fee: 6000.0, account: "Pedro", gt: "Muller", designer: "—", socialMedia: "—" },
  { nome: "Resimaq", flag: "care", fee: 6955.48, account: "Pedro", gt: "Daniel Santana", designer: "Geovana", socialMedia: "—" },
  { nome: "Porto Formas (Marketplace)", flag: "safe", fee: 5304.0, account: "William", gt: "William", designer: "—", socialMedia: "—" },
  { nome: "Vizary", flag: "safe", fee: 5000.0, account: "Caio Mattos", gt: "Leonardo", designer: "—", socialMedia: "—" },
  { nome: "Ale Style Moda (Marketplace)", flag: "critical", fee: 5000.0, account: "Harlem", gt: "Harlem", designer: "—", socialMedia: "—" },
  { nome: "Sems Biofarmacêutica (Marketplace)", flag: "critical", fee: 5000.0, account: "Muller", gt: "Muller", designer: "—", socialMedia: "—" },
  { nome: "Multimax (Marketplace)", flag: "care", fee: 4932.93, account: "William", gt: "William", designer: "—", socialMedia: "—" },
  { nome: "Vivacril - Dois Irmãos Indústria Química LTDA", flag: "danger", fee: 4800.0, account: "Pedro", gt: "Leonardo", designer: "Michel", socialMedia: "—" },
  { nome: "Forte da Brisa", flag: "care", fee: 2179.82, account: "Pedro", gt: "Daniel Santana", designer: "Michel", socialMedia: "Michel" },
  { nome: "Hiraga Semijoias", flag: "safe", fee: 4000.0, account: "Pedro", gt: "Daniel Santana", designer: "Geovana", socialMedia: "—" },
  { nome: "Mactoot - Gabriela Loja de Confecções LTDA", flag: "safe", fee: 4163.24, account: "Caio Mattos", gt: "Leonardo", designer: "Geovana", socialMedia: "—" },
  { nome: "DomHome (Marketplace)", flag: "safe", fee: 3436.24, account: "Harlem", gt: "Harlem", designer: "—", socialMedia: "—" },
  { nome: "Dalia PRO", flag: "safe", fee: 3188.34, account: "Pedro", gt: "Leonardo", designer: "—", socialMedia: "—" },
  { nome: "GGPEL Livraria e Papelaria (Marketplace)", flag: "churn", fee: 3000.0, account: "Harlem", gt: "Harlem", designer: "—", socialMedia: "—" },
  { nome: "Calçados Sérgio (Marketplace)", flag: "safe", fee: 2956.78, account: "William", gt: "William", designer: "—", socialMedia: "—" },
  { nome: "Alcance Jeans B2B", flag: "safe", fee: 2574.0, account: "Pedro", gt: "Leonardo", designer: "Michel", socialMedia: "—" },
  { nome: "Vivacril (Marketplace)", flag: "danger", fee: 2550.0, account: "Muller", gt: "Muller", designer: "—", socialMedia: "—" },
  { nome: "Vinhos Mil Vientos", flag: "safe", fee: 5023.4, account: "William", gt: "Leonardo", designer: "—", socialMedia: "Gabriela" },
  { nome: "Soul Eletric E.E", flag: "safe", fee: 5023.4, account: "Caio Mattos", gt: "Leonardo", designer: "Geovana", socialMedia: "—", isNovo: true },
  { nome: "Pousada Vale Encantado E.E", flag: "safe", fee: 12281.01, account: "Pedro", gt: "Daniel Santana", designer: "Geovana", socialMedia: "—", isNovo: true },
  { nome: "Ankor E.C", flag: "safe", fee: 2200.23, account: "Caio Mattos", gt: "Leonardo", designer: "Michel", socialMedia: "—", isNovo: true },
  { nome: "AXE Performance", flag: "safe", fee: 3048.0, account: "Caio Mattos", gt: "Leonardo", designer: "Michel", socialMedia: "—", isNovo: true },
  { nome: "Conela", flag: "safe", fee: 2522.64, account: "Caio Mattos", gt: "Leonardo", designer: "Michel", socialMedia: "—", isNovo: true },
  { nome: "Moviw", flag: "safe", fee: 9518.26, account: "Pedro", gt: "Daniel Santana", designer: "Geovana", socialMedia: "—", isNovo: true },
];

export interface CarteiraItemCum extends CarteiraItem {
  cum: number;
}

export function carteira30dComCumulativo(): CarteiraItemCum[] {
  const sorted = [...carteira30d].sort((a, b) => b.fee - a.fee);
  const totalFee = sorted.reduce((s, d) => s + d.fee, 0);
  const result: CarteiraItemCum[] = [];
  for (const d of sorted) {
    const prevAcc = result.length ? (result[result.length - 1].cum / 100) * totalFee : 0;
    const acc = prevAcc + d.fee;
    result.push({ ...d, cum: (acc / totalFee) * 100 });
  }
  return result;
}

export const STAGES: Stage[] = ["Triagem", "Diagnóstico", "Alinhamento", "Execução", "Validação"];
export const STAGE_COLORS: Record<Stage, string> = {
  Triagem: "#7aa7d9",
  Diagnóstico: "var(--amber)",
  Alinhamento: "var(--orange)",
  Execução: "#9a5ad9",
  Validação: "var(--green)",
};

const MESES_ABREV = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function fmtDataCurta(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} de ${MESES_ABREV[m - 1]}`;
}

export function fmtBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
