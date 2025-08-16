import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";

const Chatbot = lazy(() =>
  import("@/components/chatbot/chatbot").then((module) => ({
    default: module.Chatbot,
  }))
);

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
        <Suspense
          fallback={
            <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
          }
        >
          <Chatbot />
        </Suspense>
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
