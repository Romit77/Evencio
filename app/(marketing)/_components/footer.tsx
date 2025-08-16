import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className="fixed bottom-0 w-full p-4 border-t bg-slate-100"
      data-testid="footer_wrapper"
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link href="/sign-up">
            <Button
              size="sm"
              variant="ghost"
              data-testid="footer_policy_button"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </Link>
          <Link href={"https://github.com/Romit77/Evencio"} target="_blank">
            <Button
              size="sm"
              variant="ghost"
              data-testid="footer_policy_button"
            >
              Github
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
