import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Services from "@/components/Services";
import Process from "@/components/Process";
import RecentWork from "@/components/RecentWork";
import Reviews from "@/components/Reviews";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-aurora" aria-hidden />

      <Navbar />
      <main className="relative">
        <Hero />
        <TrustBanner />
        <Services />
        <Process />
        <RecentWork />
        <Reviews />
        <Experience />
      </main>
      <Footer />
      <LeadModal />
    </div>
  );
};

export default Index;
