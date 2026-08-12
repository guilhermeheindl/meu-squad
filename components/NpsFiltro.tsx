"use client";

import { useMemo, useState } from "react";
import { npsRows, Flag, classificacaoTagClass } from "@/lib/data";

const FLAGS: { key: Flag | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "critical", label: "Critical" },
  { key: "danger", label: "Danger" },
  { key: "care", label: "Care" },
  { key: "safe", label: "Safe" },
];

export default function NpsFiltro() {
  const [busca, setBusca] = useState("");
  const [flag, setFlag] = useState<Flag | "all">("all");

  const filtered = useMemo(() => {
    return npsRows.filter((r) => {
      if (flag !== "all" && r.flag !== flag) return false;
      if (busca.trim() && !r.cliente.toLowerCase().includes(busca.trim().toLowerCase())) return false;
      return true;
    });
  }, [busca, flag]);

  return (
    <div>
      <div className="filter-bar">
        <span className="filter-label">Cliente</span>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 100,
            padding: "7px 14px",
            fontSize: 12.5,
            minWidth: 160,
          }}
        />
        <span className="filter-sep" />
        <span className="filter-label">Flag</span>
        {FLAGS.map((f) => (
          <button key={f.key} className={`filter-btn ${flag === f.key ? "active" : ""}`} onClick={() => setFlag(f.key)} type="button">
            {f.label}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Flag</th>
              <th>Score satisfação</th>
              <th>Nota NPS</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.cliente}>
                <td>{r.cliente}</td>
                <td>
                  <span className={`mini-tag ${r.flag}`}>{r.flag}</span>
                </td>
                <td>{r.score != null ? r.score.toFixed(2) : "—"}</td>
                <td>{r.nota}</td>
                <td>
                  <span className={classificacaoTagClass(r.classificacao)}>{r.classificacao}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)" }}>
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
