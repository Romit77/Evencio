// import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pt-20 bg-white">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MarketingLayout;
