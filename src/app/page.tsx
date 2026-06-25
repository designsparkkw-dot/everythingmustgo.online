import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChoose from "@/components/home/WhyChoose";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedListings />
      <HowItWorks />
      <WhyChoose />
      <StatsCounter />
      <Testimonials />
      <CTASection />
    </>
  );
}
