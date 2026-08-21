import {
  metas,
  diasUteis,
  porEtapa,
  pipeTotal,
  oneTimeTotal,
  recorrenteTotal,
  pipePonderado,
  gapMonetizacao,
  gapTopo,
  churnACobrir,
  cobertura,
  comboMonetizacao,
  comboTopo,
  propostasPorValor,
  contratosAMais,
  fmt,
  fmt0,
  pct,
} from "@/lib/warweek";

export default function WarWeekPage() {
  const nDias = diasUteis.length;
  const ritmoTopo = gapTopo / nDias;
  const ritmoBase = gapMonetizacao / nDias;
  const otShare = oneTimeTotal / pipeTotal;

  // Escalas do termômetro (0 → meta topo)
  const pctAssinado = (metas.assinado / metas.topo) * 100;
  const pctMetaMon = (metas.monetizacao / metas.topo) * 100;

  return (
    <main className="gx-page">
      {/* ===== BLOCO DE GUERRA ===== */}
      <div className="ww-war">
        <div className="ww-war-in">
          <div className="ww-stamp-row">
            <span className="ww-stamp">WAR WEEK</span>
          </div>
          <div className="ww-war-sub">
            Growth X · Agosto 2026 · fechamento de monetização · <b>{nDias} dias úteis restantes</b>
          </div>

          <div className="ww-hit">
            <div className="ww-hit-main">
              <div className="lbl">
                <span className="ww-siren">
                  <i /> falta pra meta topo
                </span>
              </div>
              <div className="ww-giant">
                <em>{fmt(gapTopo)}</em>
              </div>
              <div className="cmp">
                <span>
                  Meta topo <b>{fmt(metas.topo)}</b>
                </span>
                <span>
                  Assinado <b>{fmt(metas.assinado)}</b>
                </span>
                <span>
                  Falta pra meta de monetização <b>{fmt(gapMonetizacao)}</b>
                </span>
              </div>
            </div>

            <div className="ww-hit-side">
              <div className="ww-pace">
                <div className="lbl">ritmo necessário por dia útil</div>
                <div className="v">{fmt0(ritmoTopo)}</div>
                <div className="sub">
                  {fmt0(ritmoBase)}/dia pra bater a meta de monetização
                </div>
              </div>
              <div className="ww-days">
                <div className="lbl">os {nDias} dias que restam</div>
                <div className="ww-day-row">
                  {diasUteis.map((d) => (
                    <div className={`ww-day ${d.hoje ? "hoje" : ""}`} key={d.dia}>
                      <div className="d">{d.dia}</div>
                      <div className="s">{d.hoje ? "hoje" : d.sem}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* termômetro */}
          <div className="ww-thermo">
            <div className="ww-thermo-top">
              <div className="t">Termômetro da meta</div>
              <div className="r">
                <b>{fmt(metas.assinado)}</b> assinado · {pct(metas.assinado / metas.monetizacao)} da meta de
                monetização · {pct(metas.assinado / metas.topo)} da meta topo
              </div>
            </div>
            <div className="ww-bar">
              <div className="ww-bar-fill" style={{ width: `${pctAssinado}%` }}>
                <span className="tip">{pct(metas.assinado / metas.topo)}</span>
              </div>
              <div className="ww-mark" style={{ left: `${pctMetaMon}%` }}>
                <span>Meta monetização</span>
              </div>
              <div className="ww-mark topo" style={{ left: "100%" }}>
                <span>Meta topo</span>
              </div>
            </div>
            <div className="ww-bar-foot">
              <span>R$ 0</span>
              <span>{fmt(metas.topo)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== GAP ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>O gap</h2>
          <p className="sub">Quanto falta e o ritmo diário necessário nos {nDias} dias úteis restantes.</p>
        </div>
        <div className="ww-cards">
          <div className="ww-card bd">
            <div className="k">Gap meta monetização</div>
            <div className="v acc">{fmt(gapMonetizacao)}</div>
            <div className="sub">{fmt0(ritmoBase)} por dia útil</div>
          </div>
          <div className="ww-card bd">
            <div className="k">Gap meta topo</div>
            <div className="v acc">{fmt(gapTopo)}</div>
            <div className="sub">{fmt0(ritmoTopo)} por dia útil</div>
          </div>
          <div className="ww-card bd-a">
            <div className="k">Churn a cobrir</div>
            <div className="v a">{fmt(churnACobrir)}</div>
            <div className="sub">Diferença entre a meta topo e a meta de monetização</div>
          </div>
          <div className="ww-card dark">
            <div className="k">Pipe total</div>
            <div className="v">{fmt0(pipeTotal)}</div>
            <div className="sub">{propostasPorValor.length} propostas em 3 etapas</div>
          </div>
        </div>
      </section>

      {/* ===== PIPE ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Pipe — {fmt0(pipeTotal)} em {propostasPorValor.length} propostas</h2>
          <p className="sub">
            Cada proposta na sua etapa, ordenada por valor. A barra de cada card mostra a divisão one time
            (vermelho) e recorrente (preto).
          </p>
        </div>
        <div className="ww-board">
          {porEtapa.map((col, ci) => (
            <div className={`ww-col c${ci}`} key={col.etapa}>
              <div className="ww-col-head">
                <div className="cn">{col.etapa}</div>
                <div className="cv">{fmt0(col.total)}</div>
                <div className="cs">
                  {col.leads.length} {col.leads.length === 1 ? "proposta" : "propostas"} · {pct(col.share)} do pipe
                </div>
              </div>
              <div className="ww-col-body">
                {col.leads.map((l) => {
                  const rec = l.valor - l.oneTime;
                  const otp = (l.oneTime / l.valor) * 100;
                  return (
                    <div className={`ww-lead ${l.oneTime ? "ot" : ""}`} key={`${l.nome}-${l.valor}`}>
                      <div className="ln">{l.nome}</div>
                      {l.tier && <div className="lt">{l.tier}</div>}
                      <div className="lv">
                        <b>{fmt(l.valor)}</b>
                        <span className="sh">{pct(l.valor / pipeTotal)} do pipe</span>
                      </div>
                      <div className="lsplit">
                        {l.oneTime > 0 && <i className="ot" style={{ width: `${otp}%` }} />}
                        {rec > 0 && <i className="rec" style={{ width: `${100 - otp}%` }} />}
                      </div>
                      <div className="lrow">
                        {l.oneTime > 0 ? (
                          <span>
                            One time <b>{fmt(l.oneTime)}</b>
                          </span>
                        ) : (
                          <span className="off">Sem one time</span>
                        )}
                        {rec > 0 ? (
                          <span>
                            Recorrente <b>{fmt(rec)}</b>
                          </span>
                        ) : (
                          <span className="off">Sem recorrente</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ONE TIME X RECORRENTE ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>One time × recorrente</h2>
          <p className="sub">Composição do pipe total.</p>
        </div>
        <div className="ww-split">
          <div className="ww-split-bar">
            <div className="seg ot" style={{ width: `${otShare * 100}%` }}>
              {pct(otShare)}
            </div>
            <div className="seg rec" style={{ width: `${(1 - otShare) * 100}%` }}>
              {pct(1 - otShare)}
            </div>
          </div>
          <div className="ww-legend">
            <div className="it">
              <span className="dot ot" />
              One time — <b>{fmt(oneTimeTotal)}</b>
            </div>
            <div className="it">
              <span className="dot rec" />
              Recorrente — <b>{fmt(recorrenteTotal)}</b>
            </div>
          </div>
        </div>

        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table className="gx-table">
            <thead>
              <tr>
                <th>Proposta</th>
                <th>Etapa</th>
                <th className="ww-num">Valor total</th>
                <th className="ww-num">One time</th>
                <th className="ww-num">Recorrente</th>
              </tr>
            </thead>
            <tbody>
              {propostasPorValor.map((p) => (
                <tr key={`${p.nome}-${p.valor}`}>
                  <td>{p.nome}</td>
                  <td>
                    <span className="pill stage">{p.etapa}</span>
                  </td>
                  <td className="ww-num fee">{fmt(p.valor)}</td>
                  <td className="ww-num">{p.oneTime ? fmt(p.oneTime) : "—"}</td>
                  <td className="ww-num">{p.valor - p.oneTime ? fmt(p.valor - p.oneTime) : "—"}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td>{propostasPorValor.length} propostas</td>
                <td className="ww-num fee">{fmt(pipeTotal)}</td>
                <td className="ww-num fee">{fmt(oneTimeTotal)}</td>
                <td className="ww-num fee">{fmt(recorrenteTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== COBERTURA ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Cobertura do pipe</h2>
          <p className="sub">Quanto o pipe atual cobre de cada meta, em três leituras.</p>
        </div>
        <div className="table-wrap">
          <table className="gx-table">
            <thead>
              <tr>
                <th>Leitura do pipe</th>
                <th className="ww-num">Valor</th>
                <th className="ww-num">vs. gap monetização</th>
                <th className="ww-num">vs. gap topo</th>
              </tr>
            </thead>
            <tbody>
              {cobertura.map((c) => (
                <tr key={c.leitura}>
                  <td>
                    {c.leitura}
                    {c.nota ? <span style={{ color: "var(--text-dim)" }}> ¹</span> : null}
                  </td>
                  <td className="ww-num fee">{fmt(c.valor)}</td>
                  <td className={`ww-num ${c.vsBase >= 1 ? "ww-ok" : "ww-bad"}`}>
                    {c.vsBase >= 1 ? `${c.vsBase.toFixed(2).replace(".", ",")}x` : pct(c.vsBase, 0)}
                  </td>
                  <td className={`ww-num ${c.vsTopo >= 1 ? "ww-ok" : "ww-bad"}`}>
                    {c.vsTopo >= 1 ? `${c.vsTopo.toFixed(2).replace(".", ",")}x` : pct(c.vsTopo, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ww-note">
          ¹ Ponderado por probabilidade de etapa: 30% proposta enviada, 50% em negociação, 85% contrato na rua. São
          referências de mercado — substituir pela conversão histórica do squad quando disponível. Pipe ponderado
          hoje: {fmt(pipePonderado)}.
        </p>

        <div className="ww-cards" style={{ marginTop: 14 }}>
          <div className="ww-card bd">
            <div className="k">Conversão necessária — meta monetização</div>
            <div className="v acc">{pct(gapMonetizacao / pipeTotal)}</div>
            <div className="sub">do pipe bruto em {nDias} dias úteis</div>
          </div>
          <div className="ww-card bd">
            <div className="k">Conversão necessária — meta topo</div>
            <div className="v acc">{pct(gapTopo / pipeTotal)}</div>
            <div className="sub">do pipe bruto em {nDias} dias úteis</div>
          </div>
          <div className="ww-card bd-a">
            <div className="k">Cenário só recorrente — meta topo</div>
            <div className="v a">−{fmt(gapTopo - recorrenteTotal)}</div>
            <div className="sub">
              Se a monetização considerar apenas recorrente, o pipe não fecha a meta topo nem com 100% de conversão
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMBOS ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>O que precisa fechar</h2>
          <p className="sub">
            Atacando das maiores pras menores, quantas propostas do pipe atual são necessárias pra cada meta.
          </p>
        </div>

        {[
          { c: comboMonetizacao, titulo: "Meta monetização", meta: metas.monetizacao, cls: "" },
          { c: comboTopo, titulo: "Meta topo (com churn)", meta: metas.topo, cls: "a" },
        ].map(({ c, titulo, meta, cls }) => (
          <div className={`ww-combo ${cls}`} key={titulo}>
            <h4>
              {titulo} — {fmt(meta)}
            </h4>
            <div className="cs">
              as {c.escolhidas.length} maiores propostas do pipe · folga de {fmt(c.folga)} sobre o gap
            </div>
            <div className="ww-chips">
              {c.escolhidas.map((p, i) => (
                <span key={`${p.nome}-${p.valor}`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  {i > 0 && <span className="ww-plus">+</span>}
                  <span className="ww-chip">
                    {p.nome} <b>{fmt0(p.valor)}</b>
                  </span>
                </span>
              ))}
              <span className="ww-eq">= {fmt0(c.total)}</span>
            </div>
          </div>
        ))}

        <p className="ww-note">
          Os valores somados são de pipe bruto e desconsideram desconto na negociação. A maior proposta
          ({propostasPorValor[0].nome}) representa {pct(propostasPorValor[0].valor / pipeTotal)} do pipe total —
          nenhuma combinação atinge as metas sem ela.
        </p>
      </section>

      {/* ===== CONTRATOS A MAIS ===== */}
      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Contratos a mais</h2>
          <p className="sub">Fora do pipe de {fmt0(pipeTotal)} — não entram em nenhum cálculo desta página.</p>
        </div>
        <div className="ww-extra">
          {contratosAMais.map((c) => (
            <div className="ww-extra-item" key={c.nome}>
              <span className="en">{c.nome}</span>
              <span className="ev">{c.valor === null ? "valor a definir" : fmt(c.valor)}</span>
            </div>
          ))}
          <p className="ww-note">
            Ao informar o valor e a divisão one time / recorrente, esses contratos passam a somar no pipe total e
            reduzem os gaps de {fmt(gapMonetizacao)} e {fmt(gapTopo)}.
          </p>
        </div>
      </section>
    </main>
  );
}
