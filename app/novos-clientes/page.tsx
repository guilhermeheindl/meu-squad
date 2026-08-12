import { novosClientesTotais } from "@/lib/data";
import NovosClientesKanban from "@/components/NovosClientesKanban";

export default function NovosClientesPage() {
  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · Agosto 2026</div>
        <h1>Novos Clientes</h1>
        <p>
          {novosClientesTotais.novosProjetos} projetos fechados em agosto. Acompanhe o onboarding de cada um pelo kanban abaixo.
        </p>
      </div>

      <div className="gx-section-head">
        <h2>Onboarding</h2>
        <p className="sub">Growthclass → Kick-off → Semana 2 a 5 → Finalizado. Arraste o card, clique pra ver o contexto e marcar o checklist.</p>
      </div>
      <NovosClientesKanban />
    </main>
  );
}
