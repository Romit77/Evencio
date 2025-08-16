import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/" data-testid="logo">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex group">
        {/* Cool gradient icon instead of regular image */}
        <div className="relative w-8 h-8 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Zap className="w-5 h-5 text-white" />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
        </div>
        <div className="flex flex-col">
          <p
            className={cn(
              "text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors duration-300",
              headingFont.className
            )}
          >
            Evencio
          </p>
          <div className="w-full h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </Link>
  );
};
