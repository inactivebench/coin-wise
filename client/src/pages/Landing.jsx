import Navbar from "../components/ui/Navbar";
import Hero from "../components/landing/Hero";
import Cta from "../components/landing/Cta";
import FlashcardList from "../components/landing/FlashcardList";
import TestimonialList from "../components/landing/TestimonialList";
import StepList from "../components/landing/StepList";
import Footer from "../components/ui/Footer";
import "../css/landing.css";

const Landing = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <FlashcardList />
      <TestimonialList />
      <StepList />
      <Cta />
      <Footer />
    </main>
  );
};
export default Landing;
