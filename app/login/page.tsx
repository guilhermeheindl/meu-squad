"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Senha incorreta");
        setLoading(false);
        return;
      }
      router.push(params.get("next") || "/");
      router.refresh();
    } catch {
      setError("Erro de conexão. Tenta de novo.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="password"
        placeholder="Senha do squad"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
      />
      <button type="submit" disabled={loading || !password}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
      {error && <div className="login-error">{error}</div>}
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="lb-badge">Growth X · V4 Company</div>
        <h1>Cockpit do squad</h1>
        <p>Área restrita ao time Growth X. Peça a senha ao Guilherme.</p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
        <noscript>
          <div className="no-js-notice">
            Este login precisa de JavaScript ativado no navegador pra funcionar. Ative e recarregue a página.
          </div>
        </noscript>
      </div>
    </div>
  );
}
