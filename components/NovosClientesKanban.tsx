"use client";

import { useEffect, useState } from "react";
import {
  ONBOARDING_STAGES,
  OnboardingStage,
  OnboardingType,
  KanbanClient,
  novosClientesKanbanSeed,
  checklistFor,
} from "@/lib/data";

const STORAGE_KEY = "gx-novos-clientes-kanban-v2";

function loadClients(): KanbanClient[] {
  if (typeof window === "undefined") return novosClientesKanbanSeed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return novosClientesKanbanSeed;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return novosClientesKanbanSeed;
  } catch {
    return novosClientesKanbanSeed;
  }
}

function slugify(nome: string) {
  return (
    nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `cliente-${Date.now()}`
  );
}

export default function NovosClientesKanban() {
  const [clients, setClients] = useState<KanbanClient[]>(novosClientesKanbanSeed);
  const [hydrated, setHydrated] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<OnboardingStage | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addTipo, setAddTipo] = useState<OnboardingType | null>(null);
  const [form, setForm] = useState({ nome: "", owner: "", gt: "", fee: "", produto: "" });

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

  const openClient = clients.find((c) => c.id === openId) || null;

  function moveClient(id: string, stage: OnboardingStage) {
    setClients((cs) => cs.map((c) => (c.id === id ? { ...c, stage } : c)));
  }

  function toggleChecklist(clientId: string, index: number) {
    setClients((cs) =>
      cs.map((c) =>
        c.id === clientId
          ? { ...c, checklist: c.checklist.map((item, i) => (i === index ? { ...item, done: !item.done } : item)) }
          : c
      )
    );
  }

  function resetAddFlow() {
    setAddOpen(false);
    setAddTipo(null);
    setForm({ nome: "", owner: "", gt: "", fee: "", produto: "" });
  }

  function submitNewClient() {
    if (!addTipo || !form.nome.trim()) return;
    const novo: KanbanClient = {
      id: slugify(form.nome),
      nome: form.nome.trim(),
      owner: form.owner.trim() || "—",
      gt: form.gt.trim() || undefined,
      fee: form.fee.trim() || "—",
      produto: form.produto.trim() || "—",
      tipo: addTipo,
      stage: "Growthclass",
      checklist: checklistFor(addTipo),
    };
    setClients((cs) => [...cs, novo]);
    resetAddFlow();
  }

  return (
    <div>
      <div className="nk-toolbar">
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {clients.length} clientes em onboarding. Arraste o card entre as colunas ou clique pra abrir o checklist.
        </p>
        <button className="nk-add-btn" type="button" onClick={() => setAddOpen(true)}>
          + Novo cliente
        </button>
      </div>

      <div className="nk-board">
        {ONBOARDING_STAGES.map((stage) => {
          const inStage = clients.filter((c) => c.stage === stage);
          return (
            <div
              key={stage}
              className={`nk-col ${dragOverStage === stage ? "drag-over" : ""}`}
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
              <div className="nk-col-head">
                <div className="name">{stage}</div>
                <div className="count">
                  {inStage.length} {inStage.length === 1 ? "cliente" : "clientes"}
                </div>
              </div>
              <div className="nk-col-body">
                {inStage.map((c) => {
                  const done = c.checklist.filter((i) => i.done).length;
                  const pct = c.checklist.length ? (done / c.checklist.length) * 100 : 0;
                  return (
                    <div
                      key={c.id}
                      className="nk-card"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", c.id);
                        setDragId(c.id);
                      }}
                      onDragEnd={() => setDragId(null)}
                      onClick={() => setOpenId(c.id)}
                    >
                      <div className="name">{c.nome}</div>
                      <div className="meta">{c.owner}</div>
                      <div className="meta" style={{ marginTop: -4 }}>{c.produto}</div>
                      <span className={`tipo-tag ${c.tipo}`}>{c.tipo === "novo" ? "Novo" : "Transição"}</span>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de detalhe do card */}
      {openClient && (
        <div className="nk-overlay" onClick={() => setOpenId(null)}>
          <div className="nk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nk-modal-head">
              <div>
                <h3>{openClient.nome}</h3>
                <div className="nk-modal-sub">
                  <span className={`tipo-tag ${openClient.tipo}`}>
                    {openClient.tipo === "novo" ? "Onboarding novo" : "Transição"}
                  </span>
                </div>
              </div>
              <button className="nk-modal-close" type="button" onClick={() => setOpenId(null)}>
                ×
              </button>
            </div>

            <div className="nk-context-grid">
              <div className="nk-context-item">
                <div className="k">Gestor</div>
                <div className="v">{openClient.owner}</div>
              </div>
              <div className="nk-context-item">
                <div className="k">GT / Designer</div>
                <div className="v">{openClient.gt || "—"}</div>
              </div>
              <div className="nk-context-item">
                <div className="k">Fee</div>
                <div className="v">{openClient.fee}</div>
              </div>
              <div className="nk-context-item">
                <div className="k">Produto contratado</div>
                <div className="v">{openClient.produto}</div>
              </div>
              {openClient.inicio && (
                <div className="nk-context-item">
                  <div className="k">Início / Assinatura</div>
                  <div className="v">{openClient.inicio}</div>
                </div>
              )}
              {openClient.extra?.map((e) => (
                <div className="nk-context-item" key={e.label}>
                  <div className="k">{e.label}</div>
                  <div className="v">{e.value}</div>
                </div>
              ))}
            </div>

            <div className="nk-checklist-title">Checklist de onboarding</div>
            {openClient.checklist.map((item, i) => (
              <label className={`nk-checklist-item ${item.done ? "done" : ""}`} key={item.label}>
                <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(openClient.id, i)} />
                <span>{item.label}</span>
              </label>
            ))}

            <div className="nk-stage-select">
              <label>Etapa atual</label>
              <select
                value={openClient.stage}
                onChange={(e) => moveClient(openClient.id, e.target.value as OnboardingStage)}
              >
                {ONBOARDING_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Modal de novo cliente */}
      {addOpen && (
        <div className="nk-overlay" onClick={resetAddFlow}>
          <div className="nk-modal" onClick={(e) => e.stopPropagation()}>
            {!addTipo ? (
              <>
                <div className="nk-modal-head">
                  <h3>Novo cliente</h3>
                  <button className="nk-modal-close" type="button" onClick={resetAddFlow}>
                    ×
                  </button>
                </div>
                <p className="nk-modal-sub">O checklist de onboarding muda dependendo do tipo de entrada.</p>
                <div className="nk-type-choice">
                  <button className="nk-type-btn" type="button" onClick={() => setAddTipo("novo")}>
                    <div className="t-title">Onboarding novo</div>
                    <div className="t-desc">Cliente nunca teve conta na V4 — segue o processo completo (Growthclass, kick-off, execução).</div>
                  </button>
                  <button className="nk-type-btn" type="button" onClick={() => setAddTipo("transicao")}>
                    <div className="t-title">Transição</div>
                    <div className="t-desc">Cliente já é da V4 e está mudando de squad/account — processo mais curto, com o account antigo apoiando 1 mês.</div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="nk-modal-head">
                  <h3>Novo cliente — {addTipo === "novo" ? "Onboarding novo" : "Transição"}</h3>
                  <button className="nk-modal-close" type="button" onClick={resetAddFlow}>
                    ×
                  </button>
                </div>
                <p className="nk-modal-sub">Entra na coluna Growthclass com o checklist de {addTipo === "novo" ? "8" : "4"} passos.</p>
                <div className="nk-field">
                  <label>Nome do cliente</label>
                  <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} autoFocus />
                </div>
                <div className="nk-field">
                  <label>Gestor responsável</label>
                  <input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} />
                </div>
                <div className="nk-field">
                  <label>GT / Designer</label>
                  <input value={form.gt} onChange={(e) => setForm({ ...form, gt: e.target.value })} />
                </div>
                <div className="nk-field">
                  <label>Fee</label>
                  <input value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
                </div>
                <div className="nk-field">
                  <label>Produto contratado</label>
                  <input value={form.produto} onChange={(e) => setForm({ ...form, produto: e.target.value })} />
                </div>
                <div className="nk-modal-footer">
                  <button className="nk-btn-secondary" type="button" onClick={() => setAddTipo(null)}>
                    Voltar
                  </button>
                  <button className="nk-btn-primary" type="button" disabled={!form.nome.trim()} onClick={submitNewClient}>
                    Criar card
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
