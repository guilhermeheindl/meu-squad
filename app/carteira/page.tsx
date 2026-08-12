import CarteiraCompletaFiltro from "@/components/CarteiraCompletaFiltro";

export default function CarteiraPage() {
  return (
    <main className="gx-page">
      <div className="gx-page-head">
        <div className="gx-eyebrow">Growth X · V4 Company</div>
        <h1>Carteira</h1>
        <p>Todos os projetos e executores do squad. Filtre por pessoa (account, GT ou designer) ou por flag.</p>
      </div>

      <CarteiraCompletaFiltro />
    </main>
  );
}
