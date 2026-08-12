"use client";

import { useEffect, useMemo, useState } from "react";
import { riskClients as seedClients, RiskClient, STAGES, STAGE_COLORS, Stage, Flag, fmtBRL } from "@/lib/data";

const STORAGE_KEY = "gx-carteira-risco-stages-v1";

function loadClients(): RiskClient[] {
  if (typeof window === "undefined") return seedClients;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedClients;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === seedClients.length) return parsed;
    return seedClients;
  } catch {
    return seedClients;
  }
}

const FLAGS: { key: Flag | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "critical", label: "Critical" },
  { key: "danger", label: "Danger" },
  { key: "care", label: "Care" },
];

export default function CarteiraRiscoBoard() {
  const [clients, setClients] = useState<RiskClient[]>(seedClients);
  const [hydrated, setHydrated] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [flag, setFlag] = useState<Flag | "all">("all");
  const [owner, setOwner] = useState<string>("all");

  useEffect(() => {
    // Sincroniza com localStorage só depois do primeiro render (evita mismatch de hidratação SSR/client).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClients(loadClients());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients, hydrated]);

  function moveClient(id: string, stage: Stage) {
    setClients((cs) => cs.map((c) => (c.id === id ? { ...c, stage } : c)));
  }

  const owners = useMemo(() => ["all", ...Array.from(new Set(clients.map((c) => c.owner)))], [clients]);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (flag !== "all" && c.flag !== flag) return false;
      if (owner !== "all" && c.owner !== owner) return false;
      return true;
    });
  }, [clients, flag, owner]);

  const openClient = clients.find((c) => c.id === openId) || null;

  return (
    <div>
      <div className="kanban-wrap">
        <div className="kanban">
          {STAGES.map((stage) => {
            const inStage = clients.filter((c) => c.stage === stage);
            return (
              <div
                key={stage}
                className={`kanban-col ${dragOverStage === stage ? "drag-over" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverStage(stage);
                }}
                onDragLeave={() => setDragOverStage((s) => (s === stage ? null : s))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain") || dragId;
                  if (id) moveClient(id, stage);
                  setDragOverStage(null);
                  setDragId(null);
                }}
              >
                <div className="kanban-col-head">
                  <div className="bar" style={{ background: STAGE_COLORS[stage] }} />
                  <div className="name">{stage}</div>
                  <div className="count">
                    {inStage.length} {inStage.length === 1 ? "lead" : "leads"}
                  </div>
                </div>
                <div className="kanban-col-body">
                  {inStage.map((c) => (
                    <div
                      key={c.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", c.id);
                        setDragId(c.id);
                      }}
                      onDragEnd={() => setDragId(null)}
                      onClick={() => setOpenId(c.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="name">{c.name}</div>
                      <div className="tags">
                        <span className={`pill sm ${c.flag}`}>{c.flag}</span>
                        <span className="pill sm owner">🎯 {c.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Flag</span>
        {FLAGS.map((f) => (
          <button key={f.key} className={`filter-btn ${flag === f.key ? "active" : ""}`} onClick={() => setFlag(f.key)} type="button">
            {f.label}
          </button>
        ))}
        <span className="filter-sep" />
        <span className="filter-label">Dono do B.O.</span>
        {owners.map((o) => (
          <button key={o} className={`filter-btn ${owner === o ? "active" : ""}`} onClick={() => setOwner(o)} type="button">
            {o === "all" ? "Todos" : o}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
        {filtered.length} de {clients.length} clientes não-safe
      </p>

      {filtered.map((c) => (
        <div className="card" key={c.id} style={{ cursor: "pointer" }} onClick={() => setOpenId(c.id)}>
          <div className="card-head">
            <h3>{c.name}</h3>
            <div className="card-tags">
              <span className={`pill ${c.flag}`}>{c.flag}</span>
              <span className="pill owner">🎯 {c.owner}</span>
              <span className="pill stage">{c.stage}</span>
              {c.feeMonthly != null ? (
                <span className="fee-tag">{fmtBRL(c.feeMonthly)}/mês</span>
              ) : (
                <span className="fee-tag fee-cortesia">{c.feeLabel}</span>
              )}
            </div>
          </div>
          <p>{c.context}</p>
        </div>
      ))}

      {filtered.length === 0 && <div className="ctx">Nenhum cliente com esse cruzamento de flag + dono do B.O.</div>}

      {openClient && (
        <div className="nk-overlay" onClick={() => setOpenId(null)}>
          <div className="nk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nk-modal-head">
              <div>
                <h3>{openClient.name}</h3>
                <div className="nk-modal-sub">
                  <span className={`pill ${openClient.flag}`}>{openClient.flag}</span>
                </div>
              </div>
              <button className="nk-modal-close" type="button" onClick={() => setOpenId(null)}>
                ×
              </button>
            </div>

            <div className="nk-context-grid">
              <div className="nk-context-item">
                <div className="k">Dono do B.O.</div>
                <div className="v">🎯 {openClient.owner}</div>
              </div>
              <div className="nk-context-item">
                <div className="k">Etapa</div>
                <div className="v">{openClient.stage}</div>
              </div>
              <div className="nk-context-item">
                <div className="k">Fee</div>
                <div className="v">{openClient.feeMonthly != null ? `${fmtBRL(openClient.feeMonthly)}/mês` : openClient.feeLabel}</div>
              </div>
            </div>

            <div className="nk-checklist-title">Resumo da tratativa</div>
            <p style={{ fontSize: 14, marginBottom: 20 }}>{openClient.context}</p>

            <div className="plan">
              <div className="plan-label">Plano de ação</div>
              <ul>
                {openClient.plan.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="nk-stage-select">
              <label>Mover etapa</label>
              <select value={openClient.stage} onChange={(e) => moveClient(openClient.id, e.target.value as Stage)}>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
