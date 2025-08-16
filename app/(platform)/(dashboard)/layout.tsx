import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 min-h-screen">{children}</main>
    </div>
  );
};

export default DashboardLayout;
