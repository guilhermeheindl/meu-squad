"use client";

import { useMemo, useState } from "react";
import { variavelMarketplace } from "@/lib/data";

const OPTIONS: { key: "all" | "mapped" | "pending" | "none"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "mapped", label: "Mapeado" },
  { key: "pending", label: "Pendente" },
  { key: "none", label: "Sem variável" },
];

const STATUS_LABEL: Record<string, string> = { mapped: "Mapeado", pending: "Pendente", none: "Sem variável" };

export default function VariavelFiltro() {
  const [status, setStatus] = useState<"all" | "mapped" | "pending" | "none">("all");

  const filtered = useMemo(
    () => (status === "all" ? variavelMarketplace : variavelMarketplace.filter((v) => v.status === status)),
    [status]
  );

  return (
    <div>
      <div className="filter-bar">
        <span className="filter-label">Status</span>
        {OPTIONS.map((o) => (
          <button key={o.key} className={`filter-btn ${status === o.key ? "active" : ""}`} onClick={() => setStatus(o.key)} type="button">
            {o.label}
          </button>
        ))}
      </div>
      <div className="rules-grid">
        {filtered.map((v) => (
          <div className="rule-card" key={v.cliente}>
            <div className="rc-head">
              <h4>{v.cliente}</h4>
              <span className={`status-tag ${v.status}`}>{STATUS_LABEL[v.status]}</span>
            </div>
            <div className="rc-plat">{v.plataforma}</div>
            <div className="rc-tiers">
              {v.tiers.map((t) => (
                <div className="rc-tier" key={t.label}>
                  <span>{t.label}</span>
                  <b>{t.value}</b>
                </div>
              ))}
            </div>
            <div className="rc-note">{v.nota}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
