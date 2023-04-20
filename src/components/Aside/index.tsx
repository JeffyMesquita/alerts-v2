import { BellRinging, Activity } from "@phosphor-icons/react";

export function Aside() {
  return (
    <aside className="w-52 bg-zinc-800 p-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-600 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-600 rounded-full" />
      </div>
      <nav className="space-y-5 mt-10">
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-zinc-700 transition duration-500"
        >
          <BellRinging size={24} weight="bold" />
          <span>Alertas</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-zinc-700 transform transition duration-500"
        >
          <Activity size={24} weight="bold" />
          <span>Atividades</span>
        </a>
      </nav>
    </aside>
  );
}
