import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Services from "@/components/Services";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-aurora" aria-hidden />

      <Navbar />
      <main className="relative">
        <Hero />
        <TrustBanner />
        <Services />
      </main>
    </div>
  );
};

export default Index;
