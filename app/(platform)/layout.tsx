import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Chatbot } from "@/components/chatbot/chatbot"; // Ensure the casing matches your file name

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
        <Chatbot /> {/* Moved inside the providers */}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;