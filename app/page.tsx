import {
  kpis,
  metaDezembro,
  pipeQuente,
  eeAtiva,
  ecAtiva,
  novosNRR,
  revenueChurnValor,
  npsResposta,
  notaNPS,
  contatoCliente,
  cronograma,
  riskClients,
  fmtBRL,
  fmtDataCurta,
  SNAPSHOT_DATE,
} from "@/lib/data";

export default function VisaoGeralPage() {
  const naoSafeCount = riskClients.length;
  const tratativasAbertas = riskClients.filter((c) => !c.noTratativa).length;
  const criticalClients = riskClients.filter((c) => c.flag === "critical");

  const statGroups: { title: string; items: { value: string | number; label: string; accent?: string }[] }[] = [
    {
      title: "Receita & Monetização",
      items: [
        { value: fmtBRL(kpis.receita.real), label: "Receita atual" },
        { value: fmtBRL(kpis.receita.meta), label: "Meta de receita" },
        { value: fmtBRL(kpis.monetizacao.real), label: "Monetizado atual" },
        { value: fmtBRL(kpis.monetizacao.meta), label: "Meta de monetização" },
        { value: fmtBRL(metaDezembro.metaDezembro), label: "Meta até dezembro" },
      ],
    },
    {
      title: "Pipeline & Aquisição",
      items: [
        { value: pipeQuente != null ? fmtBRL(pipeQuente) : "—", label: "Pipe quente" },
        { value: eeAtiva, label: "E.E. ativa" },
        { value: ecAtiva, label: "E.C ativa" },
        { value: novosNRR, label: "Novos NRR" },
      ],
    },
    {
      title: "Risco & Retenção",
      items: [
        { value: naoSafeCount, label: "Clientes não-safe", accent: "crit" },
        { value: tratativasAbertas, label: "Tratativas abertas" },
        { value: kpis.churn.real, label: `Churn (meta ${kpis.churn.meta})` },
        { value: fmtBRL(revenueChurnValor), label: "Revenue Churn", accent: "crit" },
      ],
    },
    {
      title: "Satisfação do Cliente",
      items: [
        { value: `${npsResposta.real}%`, label: `NPS resposta (meta ${npsResposta.meta}%)`, accent: "crit" },
        { value: `+${notaNPS.valor}`, label: `Nota NPS (mínimo ${notaNPS.minimo}%)` },
        { value: contatoCliente, label: "Contato com cliente" },
      ],
    },
  ];

  return (
    <main className="gx-page">
      <div className="hero-dark">
        <div className="inner">
          <div className="gx-eyebrow" style={{ color: "#ff8a7a" }}>
            Growth X · Coordenação
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,42px)", marginBottom: 10 }}>Cockpit do squad</h1>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 15, maxWidth: 640, marginBottom: 24 }}>
            Snapshot de {SNAPSHOT_DATE}.
          </p>
          <div className="stat-groups">
            {statGroups.map((g) => (
              <div className="stat-group" key={g.title}>
                <div className="stat-group-title">{g.title}</div>
                <div className="stat-row" style={{ marginBottom: 0 }}>
                  {g.items.map((it) => (
                    <div className="stat-dark" key={it.label}>
                      <span className={`num ${it.accent || ""}`}>{it.value}</span>
                      <span className="label">{it.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {pipeQuente == null && (
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 14 }}>
              * Pipe quente ainda sem valor — falta o Guilherme passar o número do Kommo.
            </p>
          )}
        </div>
      </div>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Próxima entrega</h2>
          <p className="sub">As datas fixas do mês — não é sobre &quot;esse mês&quot;, é sobre essa semana e a próxima.</p>
        </div>
        <div className="agenda-row">
          {cronograma.map((item) => (
            <div className="agenda-card" key={item.titulo}>
              <div className="ag-eyebrow">{item.status === "active" ? "Prazo em andamento" : item.status === "next" ? "Próximo prazo" : "Mais pra frente"}</div>
              <div className="ag-date-big">{fmtDataCurta(item.date)}</div>
              <div className="ag-title">{item.titulo}</div>
              <div className="ag-date">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Clientes Critical</h2>
          <p className="sub">Flag, última atualização e dono do B.O. de cada um.</p>
        </div>
        {criticalClients.map((c) => (
          <div className="card" key={c.id}>
            <div className="card-head">
              <h3>{c.name}</h3>
              <div className="card-tags">
                <span className="pill critical">Critical</span>
                <span className="pill owner">🎯 {c.owner}</span>
              </div>
            </div>
            <p>{c.context}</p>
          </div>
        ))}
        {criticalClients.length === 0 && <div className="ctx">Nenhum cliente Critical agora.</div>}
      </section>
    </main>
  );
}
