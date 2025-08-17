import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export const Navbar = () => {
  return (
    <div
      className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center"
      data-testid="navbar_wrapper"
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center space-x-3">
          <Link
            href="https://github.com/Romit77/Evencio"
            target="_blank"
            aria-label="GitHub Repository"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/60 bg-white/80 text-slate-600 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-sm"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Button
            size="sm"
            variant="outline"
            asChild
            data-testid="navbar_login_button"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700"
            asChild
            data-testid="navbar_get_taskify_button"
          >
            <Link href="/sign-up">Get Evencio for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
