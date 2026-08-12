import { riskClients, excludedChurn, boRules, boRanking, sentimentos, achadosSentimento, fmtBRL, SNAPSHOT_DATE } from "@/lib/data";
import NpsFiltro from "@/components/NpsFiltro";
import CarteiraRiscoBoard from "@/components/CarteiraRiscoBoard";

export default function CarteiraRiscoPage() {
  const totalRisco = riskClients.reduce((s, c) => s + (c.feeMonthly || 0), 0);
  const counts = {
    critical: riskClients.filter((c) => c.flag === "critical").length,
    danger: riskClients.filter((c) => c.flag === "danger").length,
    care: riskClients.filter((c) => c.flag === "care").length,
  };
  const maxRank = Math.max(...boRanking.map((r) => r.value));

  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · V4 Company</div>
        <h1>Carteira em risco</h1>
        <p>Clientes não-safe ativos, receita recorrente exposta e dono do B.O. de cada conta — fotografia de {SNAPSHOT_DATE}.</p>
      </div>

      <div className="stat-row">
        <div className="stat acc">
          <span className="num">{fmtBRL(totalRisco)}</span>
          <span className="label">Receita/mês em risco</span>
        </div>
        <div className="stat">
          <span className="num">{riskClients.length}</span>
          <span className="label">Clientes não-safe ativos</span>
        </div>
        <div className="stat">
          <span className="num">{counts.critical}</span>
          <span className="label">Critical</span>
        </div>
        <div className="stat">
          <span className="num">{counts.danger}</span>
          <span className="label">Danger</span>
        </div>
        <div className="stat">
          <span className="num">{counts.care}</span>
          <span className="label">Care</span>
        </div>
      </div>

      <div className="ctx">
        <strong>Excluídos deste cálculo:</strong>{" "}
        {excludedChurn.map((e) => (
          <span key={e.name}>
            {e.name} ({e.note.split("—")[0].trim()}){" "}
          </span>
        ))}
        — o v4-hub ainda marca alguns como ativos, mas já são churn.
      </div>

      {riskClients.some((c) => c.noTratativa) && (
        <div className="ctx" style={{ borderLeftColor: "var(--neg)" }}>
          <strong>Furo na regra flag × tratativa:</strong>{" "}
          {riskClients
            .filter((c) => c.noTratativa)
            .map((c) => c.name)
            .join(", ")}{" "}
          — virou não-safe mas ainda não tem tratativa aberta no Kommo. Precisa ser corrigido.
        </div>
      )}

      {/* Dono do B.O. */}
      <div className="bo-block">
        <div className="bo-head">
          <div className="stamp">🎉 DONO DO B.O. 🎊</div>
          <p>
            B.O. = <b>Boa Oportunidade</b>. Cada conta em risco tem um dono — a pessoa que assume a virada de jogo de ponta a ponta.
          </p>
        </div>
        <div className="bo-rules">
          <div className="rules-label">as regras do dono do b.o.</div>
          {boRules.map((r) => (
            <div className="rule" key={r.text}>
              <span style={{ fontSize: 19 }}>{r.icon}</span>
              <span dangerouslySetInnerHTML={{ __html: r.text }} />
            </div>
          ))}
        </div>
      </div>

      {/* Kanban + filtro + cards + popup de tratativa */}
      <div className="gx-section-head">
        <h2>Tratativas por cliente</h2>
        <p className="sub">Arraste o card entre etapas, ou clique pra ver o resumo da tratativa. Filtre por flag e por dono do B.O.</p>
      </div>
      <CarteiraRiscoBoard />

      {/* Tamanho do BO */}
      <div className="bo-block" style={{ marginTop: 8 }}>
        <div className="bo-head">
          <div className="stamp">📏 Ranking de quem tá carregando Boas Oportunidades esse mês! 😏</div>
        </div>
        <div className="rank-list">
          {boRanking.map((r, i) => (
            <div className="rank-row" key={r.owner}>
              <div className="rank-pos">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</div>
              <div className="rank-info">
                <div className="rank-name-line">
                  <span className="rank-name" style={{ color: "#fff" }}>
                    {r.owner}
                  </span>
                  <span className="rank-value">{fmtBRL(r.value)}</span>
                </div>
                <div className="rank-bar-track">
                  <div className="rank-bar-fill" style={{ width: `${(r.value / maxRank) * 100}%` }} />
                </div>
                <div className="rank-meta" style={{ color: "rgba(255,255,255,.5)" }}>
                  {r.contas.length} {r.contas.length === 1 ? "conta" : "contas"} — {r.contas.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NPS cross reference */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Cruzando com a satisfação real (NPS/Pipefy)</h2>
          <p className="sub">A flag conta uma parte da história — a nota real do cliente é a outra. Busque por nome ou filtre por flag.</p>
        </div>
        <NpsFiltro />
        <div className="ctx">
          <strong>Águia de Ouro tem o pior score de satisfação de toda a base (3,17) e é Detrator (nota 4)</strong> — mas a flag é só Care. Pela percepção real do cliente, esse caso pesa tanto quanto o Bellaloft. Do outro lado, <strong>Resimaq está marcado como Care mas o cliente é Promotor nota 10</strong> — a flag aqui é sobre desequilíbrio fee x hora, não sobre relacionamento.
        </div>
      </section>

      {/* Sentimento WhatsApp + IA */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Cruzando NPS com sentimento real (WhatsApp + IA)</h2>
          <p className="sub">O cruzamento dos não-safe ordenado por urgência real, não pela flag.</p>
        </div>
        <div className="table-wrap">
          <table className="gx-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Flag</th>
                <th>Sentimento WhatsApp</th>
                <th>Sinal real</th>
              </tr>
            </thead>
            <tbody>
              {sentimentos.map((s) => (
                <tr key={s.cliente}>
                  <td>{s.cliente}</td>
                  <td>
                    <span className={`mini-tag ${s.flag}`}>{s.flag}</span>
                  </td>
                  <td>
                    {s.bucket === "positivo" ? "Positivo" : s.bucket === "negativo" ? "Negativo" : "Neutro"} ({s.score})
                  </td>
                  <td>{s.sinal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ctx">
          Três achados que mudam prioridade:
          <ul style={{ marginTop: 10, marginLeft: 18 }}>
            {achadosSentimento.map((a) => (
              <li key={a} style={{ marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: a }} />
            ))}
          </ul>
        </div>
      </section>

      <footer className="gx-footer">
        <p>Fonte: v4-hub (Copilot da V4) — fee recorrente somado dos projetos ativos por cliente. Flags reestruturadas manualmente por Guilherme Heindl.</p>
        <p>Snapshot de {SNAPSHOT_DATE} — receita, flag e dono do B.O. mudam com frequência.</p>
      </footer>
    </main>
  );
}
