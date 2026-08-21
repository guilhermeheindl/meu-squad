// ===== War Week — fechamento de monetização de agosto/2026 =====
// Os totais desta página são todos derivados da lista de propostas abaixo.
// Pra atualizar o pipe, mexa só em `propostas` — gaps, cobertura e combinações
// se recalculam sozinhos.

export type PipeEtapa = "Proposta enviada" | "Em negociação" | "Contrato na rua";

export const PIPE_ETAPAS: PipeEtapa[] = ["Proposta enviada", "Em negociação", "Contrato na rua"];

// Probabilidade de fechamento por etapa. Referência de mercado — trocar pela
// conversão histórica do squad quando a gente tiver o número.
export const PROB_ETAPA: Record<PipeEtapa, number> = {
  "Proposta enviada": 0.3,
  "Em negociação": 0.5,
  "Contrato na rua": 0.85,
};

export interface Proposta {
  nome: string;
  etapa: PipeEtapa;
  valor: number;
  /** Parte one time do valor total (já incluída em `valor`). */
  oneTime: number;
  /** Faixa de faturamento contratada, quando o CRM tem. */
  tier?: string;
}

export const propostas: Proposta[] = [
  { nome: "AXE Performance", etapa: "Proposta enviada", valor: 13103, oneTime: 4903 },
  { nome: "Dalia PRO", etapa: "Proposta enviada", valor: 5900, oneTime: 0 },
  { nome: "Soul Electric", etapa: "Proposta enviada", valor: 5000, oneTime: 1558.43 },
  { nome: "BELLALOFT", etapa: "Em negociação", valor: 6356, oneTime: 0, tier: "Tiny · até 1.2 Mi" },
  { nome: "Porto Formas", etapa: "Em negociação", valor: 4500, oneTime: 0, tier: "Tiny · até 1.2 Mi" },
  { nome: "Soul Electric", etapa: "Em negociação", valor: 2100, oneTime: 2100, tier: "Tiny · até 1.2 Mi" },
  { nome: "Muller Diesel", etapa: "Em negociação", valor: 6, oneTime: 0, tier: "Tiny · até 1.2 Mi" },
  { nome: "Beetle Press", etapa: "Contrato na rua", valor: 6548, oneTime: 3948.7, tier: "Medium · 2.4 a 50 Mi (ano)" },
  { nome: "Terroá Hotel", etapa: "Contrato na rua", valor: 585, oneTime: 585 },
];

export const metas = {
  assinado: 1346.64,
  monetizacao: 28626.08,
  topo: 37249.43,
};

export const diasUteis = [
  { dia: "21", sem: "sex", hoje: true },
  { dia: "24", sem: "seg", hoje: false },
  { dia: "25", sem: "ter", hoje: false },
  { dia: "26", sem: "qua", hoje: false },
  { dia: "27", sem: "qui", hoje: false },
  { dia: "28", sem: "sex", hoje: false },
  { dia: "31", sem: "seg", hoje: false },
];

/** Contratos fechados fora do pipe — ainda sem valor lançado. */
export const contratosAMais: { nome: string; valor: number | null }[] = [
  { nome: "Sems Biofarma", valor: null },
];

// ===== derivados =====
const soma = (ns: number[]) => ns.reduce((a, b) => a + b, 0);

export const pipeTotal = soma(propostas.map((p) => p.valor));
export const oneTimeTotal = soma(propostas.map((p) => p.oneTime));
export const recorrenteTotal = pipeTotal - oneTimeTotal;
export const pipePonderado = soma(propostas.map((p) => p.valor * PROB_ETAPA[p.etapa]));

export const gapMonetizacao = metas.monetizacao - metas.assinado;
export const gapTopo = metas.topo - metas.assinado;
export const churnACobrir = metas.topo - metas.monetizacao;

export const porEtapa = PIPE_ETAPAS.map((etapa) => {
  const leads = propostas.filter((p) => p.etapa === etapa).sort((a, b) => b.valor - a.valor);
  const total = soma(leads.map((l) => l.valor));
  return { etapa, leads, total, share: total / pipeTotal };
});

export const propostasPorValor = [...propostas].sort((a, b) => b.valor - a.valor);

/** Menor conjunto de propostas (das maiores pras menores) que cobre um gap. */
export function comboQueFecha(gap: number) {
  const escolhidas: Proposta[] = [];
  let acc = 0;
  for (const p of propostasPorValor) {
    if (acc >= gap) break;
    escolhidas.push(p);
    acc += p.valor;
  }
  return { escolhidas, total: acc, folga: acc - gap, fecha: acc >= gap };
}

export const comboMonetizacao = comboQueFecha(gapMonetizacao);
export const comboTopo = comboQueFecha(gapTopo);

export const cobertura = [
  { leitura: "Pipe bruto", valor: pipeTotal },
  { leitura: "Pipe ponderado", valor: pipePonderado, nota: true },
  { leitura: "Só recorrente", valor: recorrenteTotal },
].map((c) => ({
  ...c,
  vsBase: c.valor / gapMonetizacao,
  vsTopo: c.valor / gapTopo,
}));

// ===== formatação =====
const brl = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const brl0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

export const fmt = (v: number) => `R$ ${brl.format(v)}`;
export const fmt0 = (v: number) => `R$ ${brl0.format(v)}`;
export const pct = (v: number, casas = 1) =>
  `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`;
