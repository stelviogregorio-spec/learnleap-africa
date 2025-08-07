import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Testimonials from "@/components/home/Testimonials";
import BecomeInstructor from "@/components/home/BecomeInstructor";
import FAQ from "@/components/home/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCourses />
        <Testimonials />
        <BecomeInstructor />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
