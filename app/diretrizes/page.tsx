import { responsabilidades, naoAceitar, precisaDeMim, objetivos, quotes } from "@/lib/data";

export default function DiretrizesPage() {
  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · V4 Company</div>
        <h1>Diretrizes do Squad</h1>
        <p>Como a gente trabalha — responsabilidades fixas, o que não é negociável e o objetivo em comum.</p>
      </div>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Responsabilidades que estavam soltas</h2>
          <p className="sub">A partir de agora, cada rotina tem um dono e uma cadência definida.</p>
        </div>
        <div className="table-wrap">
          <table className="gx-table">
            <thead>
              <tr>
                <th>Rotina</th>
                <th>Dono</th>
                <th>Cadência</th>
              </tr>
            </thead>
            <tbody>
              {responsabilidades.map((r) => (
                <tr key={r.rotina}>
                  <td>{r.rotina}</td>
                  <td>{r.dono}</td>
                  <td>{r.cadencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>O que não podemos mais aceitar</h2>
          <p className="sub">Cinco coisas. Sem exceção.</p>
        </div>
        <ol className="num-list">
          {naoAceitar.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>O que precisa vir comigo</h2>
          <p className="sub">Não é fraqueza pedir ajuda — é fraqueza segurar sozinho até estourar.</p>
        </div>
        <ul className="arrow-list">
          {precisaDeMim.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Objetivo claro do squad</h2>
          <p className="sub">Se todo mundo entender isso, o resto é execução.</p>
        </div>
        <ul style={{ listStyle: "none", display: "grid", gap: 12 }}>
          {objetivos.map((o, i) => (
            <li
              key={o}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "16px 20px",
                fontSize: 14.5,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <b style={{ color: "var(--acc)", fontFamily: "var(--font-syne)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </b>
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Cenário de guerra</h2>
          <p className="sub">Dificuldade é a regra do jogo — não é impeditivo.</p>
        </div>
        <div className="stat-row" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          {quotes.map((q) => (
            <div key={q.quem} className="card" style={{ background: "#0c1117", color: "#fff", borderColor: "#0c1117" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: 40, color: "var(--acc)", lineHeight: 1 }}>&quot;</div>
              <p style={{ color: "#fff", fontStyle: "italic", fontSize: 17, marginBottom: 10 }}>{q.texto}</p>
              <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>{q.quem}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
