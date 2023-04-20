export function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-700 px-6 py-4 flex items-center justify-between sticky">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">Alertas de Risco</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded">
          Entrar
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded">
          Cadastrar
        </button>
      </div>
    </header>
  );
}
