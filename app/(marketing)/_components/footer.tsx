import Link from "next/link";
import { Github } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100"
      data-testid="footer_wrapper"
    >
      <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <h2 className="text-[20vw] md:text-[16vw] lg:text-[14vw] leading-none font-black tracking-[0.15em] md:tracking-[0.2em] bg-gradient-to-br from-violet-400/50 via-violet-300/40 to-violet-500/50 bg-clip-text text-transparent translate-y-[5%]">
          EVENCIO
        </h2>
      </div>
      <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-violet-100/40 blur-2xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <Link
            href="https://github.com/Romit77/Evencio"
            target="_blank"
            aria-label="GitHub Repository"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200/50 bg-white/60 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-violet-300/60 hover:text-violet-600 hover:shadow-lg hover:scale-105"
          >
            <Github className="h-5 w-5" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-100/0 via-violet-100/20 to-violet-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <p className="text-sm text-slate-500/80 font-medium">
            © {year} Evencio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
