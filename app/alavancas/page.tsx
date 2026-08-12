import { alavancas } from "@/lib/data";
import VariavelFiltro from "@/components/VariavelFiltro";

export default function AlavancasPage() {
  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · V4 Company</div>
        <h1>As 3 alavancas</h1>
        <p>Crescimento não vem de um lugar só — e cada uma tem dono.</p>
      </div>

      <section className="gx-section">
        {alavancas.map((a) => (
          <div className="card" key={a.n} style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "var(--acc)" }}>
              {a.periodo}
            </div>
            <h3 style={{ fontSize: 22, margin: "4px 0 6px" }}>{a.titulo}</h3>
            <p style={{ maxWidth: 680 }}>{a.obj}</p>
            <div className="card-tags" style={{ marginTop: 10 }}>
              {a.donos.map((d) => (
                <span className={`chip ${d.toLowerCase().includes("time") || d.includes("distribuição") ? "mute" : ""}`} key={d}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="gx-section">
        <div className="gx-section-head">
          <h2>Variável de marketplace — o que já foi mapeado</h2>
          <p className="sub">Resultado da Alavanca 02: revisão contrato a contrato pra trazer clareza sobre o que dá pra destravar.</p>
        </div>
        <VariavelFiltro />
        <div className="ctx">
          7 de 8 contratos já resolvidos — todos com variável baseada em % sobre faturamento do marketplace, a maioria com piso mínimo e faixas progressivas. <strong>Multimax e Crist Store não têm variável prevista</strong> (saem do escopo). <strong>Só falta Sems Bio</strong> — contrato ainda não conferido.
        </div>
      </section>
    </main>
  );
}
