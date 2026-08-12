import { carteira30d, carteira30dComCumulativo, fmtBRL } from "@/lib/data";

export default function BooksPage() {
  const withCum = carteira30dComCumulativo();
  const cutoffIndex = withCum.findIndex((d) => d.cum >= 80);
  const maxFee = withCum[0].fee;

  const EXTREMOS_DESTAQUE = ["Matronfer", "Vizary", "Calçados Sérgio", "Mactoot", "Vivacril"];
  const extremos = withCum
    .map((d) => ({ ...d, rate: d.horas > 0 ? d.fee / d.horas : null }))
    .filter((d) => EXTREMOS_DESTAQUE.includes(d.nome));

  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · V4 Company</div>
        <h1>Books</h1>
        <p>Concentração da carteira e uso de horas.</p>
      </div>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Quantos e quais clientes respondem por 80% do faturamento?</h2>
          <p className="sub">27 clientes com fee recorrente. Barras em vermelho fazem parte dos 80%; em cinza, o resto da cauda.</p>
        </div>
        <div className="table-wrap" style={{ border: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {withCum.map((d, i) => (
              <div key={d.nome} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 150, fontSize: 12, color: "var(--text-muted)", flexShrink: 0, textAlign: "right" }}>
                  {d.nome}
                </div>
                <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 6, height: 20, position: "relative" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 6,
                      width: `${(d.fee / maxFee) * 100}%`,
                      background: i <= cutoffIndex ? "var(--acc)" : "#c8c5bb",
                    }}
                  />
                </div>
                <div style={{ width: 90, fontSize: 11.5, color: "var(--text-muted)", flexShrink: 0 }}>
                  {fmtBRL(d.fee)}
                </div>
                <div style={{ width: 50, fontSize: 11, color: "var(--acc)", fontWeight: 700, flexShrink: 0, textAlign: "right" }}>
                  {d.cum.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ctx" style={{ marginTop: 16 }}>
          <strong>{cutoffIndex + 1} dos {carteira30d.length} clientes já respondem por 80% do faturamento recorrente.</strong> Curva quase reta: não tem &quot;baleia&quot; segurando o squad sozinha — resolver 80% da receita exige atenção em {cutoffIndex + 1} contas, não em 3 ou 4.
        </div>
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Fee do cliente x horas trabalhadas (30 dias)</h2>
          <p className="sub">Os extremos — desequilíbrio pra cima ou pra baixo, nos dois sentidos preocupante.</p>
        </div>
        <div className="table-wrap">
          <table className="gx-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fee/mês</th>
                <th>Horas (30d)</th>
                <th>R$/hora</th>
                <th>Padrão</th>
              </tr>
            </thead>
            <tbody>
              {extremos
                .sort((a, b) => (a.rate ?? 9999) - (b.rate ?? 9999))
                .map((d) => (
                  <tr key={d.nome}>
                    <td>{d.nome}</td>
                    <td className="fee">{fmtBRL(d.fee)}</td>
                    <td>{d.horas.toFixed(1)}h</td>
                    <td>{d.rate === null ? "—" : `R$ ${d.rate.toFixed(2)}`}</td>
                    <td>
                      {d.rate === null || d.rate > 100 ? (
                        <span className="tag neg">Paga muito, recebe pouca hora</span>
                      ) : (
                        <span className="tag care">Recebe muito mais hora do que o fee sustenta</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="ctx">
          Os extremos: <strong>Matronfer (0h) e Vizary (R$ 617/hora, só 8h no mês)</strong> pagam fee alto e quase não recebem hora. No outro lado, <strong>Calçados Sérgio (R$ 3/hora, 964h), Mactoot (R$ 6/hora, 740h) e Vivacril (R$ 9/hora, 864h)</strong> entregam muito mais hora do que o fee sustenta. Nenhum dos dois extremos é sustentável.
        </div>
      </section>
    </main>
  );
}
