"use client";

import { useMemo, useState } from "react";
import { carteiraCompleta, CarteiraFlag, fmtBRL } from "@/lib/data";

const FLAGS: { key: CarteiraFlag | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "critical", label: "Critical" },
  { key: "danger", label: "Danger" },
  { key: "care", label: "Care" },
  { key: "safe", label: "Safe" },
  { key: "churn", label: "Churn" },
];

const PESSOAS = Array.from(
  new Set(
    carteiraCompleta.flatMap((c) => [c.account, c.gt, c.designer, c.socialMedia]).filter((p) => p && p !== "—")
  )
).sort();

export default function CarteiraCompletaFiltro() {
  const [flag, setFlag] = useState<CarteiraFlag | "all">("all");
  const [pessoas, setPessoas] = useState<string[]>([]);

  function togglePessoa(p: string) {
    setPessoas((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  }

  const filtered = useMemo(() => {
    return carteiraCompleta.filter((c) => {
      if (flag !== "all" && c.flag !== flag) return false;
      if (pessoas.length > 0) {
        const haystack = `${c.account} ${c.gt} ${c.designer} ${c.socialMedia}`.toLowerCase();
        const match = pessoas.some((p) => haystack.includes(p.toLowerCase()));
        if (!match) return false;
      }
      return true;
    });
  }, [flag, pessoas]);

  return (
    <div>
      <div className="filter-bar">
        <span className="filter-label">Pessoa</span>
        <button className={`filter-btn ${pessoas.length === 0 ? "active" : ""}`} onClick={() => setPessoas([])} type="button">
          Todos
        </button>
        {PESSOAS.map((p) => (
          <button key={p} className={`filter-btn ${pessoas.includes(p) ? "active" : ""}`} onClick={() => togglePessoa(p)} type="button">
            {p}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <span className="filter-label">Flag</span>
        {FLAGS.map((f) => (
          <button key={f.key} className={`filter-btn ${flag === f.key ? "active" : ""}`} onClick={() => setFlag(f.key)} type="button">
            {f.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
        {filtered.length} de {carteiraCompleta.length} clientes
        {pessoas.length > 0 && <> · filtrando por {pessoas.join(", ")}</>} ·{" "}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--acc-dim)", border: "1px solid var(--acc)", display: "inline-block" }} />
          novo em agosto/2026
        </span>
      </p>

      <div className="table-wrap">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Nome do cliente</th>
              <th>Fee</th>
              <th>Account</th>
              <th>Gestor tráfego</th>
              <th>Designer</th>
              <th>Social Media</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.nome} className={c.isNovo ? "novo" : ""}>
                <td>
                  <span className={`mini-tag ${c.flag}`}>{c.flag}</span>
                </td>
                <td>{c.nome}</td>
                <td className="fee">{fmtBRL(c.fee)}</td>
                <td>{c.account}</td>
                <td>{c.gt}</td>
                <td>{c.designer}</td>
                <td>{c.socialMedia}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)" }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
