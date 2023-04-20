import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          width={32}
          height={32}
          className="h-8 w-8 mr-2"
          src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg"
          alt="Logo"
        />
        <span className="text-white text-sm">Made with Tailwind CSS</span>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-zinc-300 text-sm">Notificações de Alertas</h2>
        <span className="text-white text-sm">© 2023</span>
      </div>
    </footer>
  );
}
