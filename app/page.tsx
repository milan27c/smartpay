import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GuidanceDownload from "@/components/GuidanceDownload";
import WhySmartPay from "@/components/WhySmartPay";
import HowItWorks from "@/components/HowItWorks";
import BenefitsGrid from "@/components/BenefitsGrid";
import CampaignGallery from "@/components/CampaignGallery";
import BrandAssets from "@/components/BrandAssets";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GuidanceDownload />
        <WhySmartPay />
        <HowItWorks />
        <BenefitsGrid />
        <CampaignGallery />
        <BrandAssets />
      </main>
      <Footer />
    </>
  );
}
