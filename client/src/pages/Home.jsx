import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cta from "../components/Cta";
import FlashcardList from "../components/FlashcardList";
import TestimonialList from "../components/TestimonialList";
import StepList from "../components/StepList";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <FlashcardList />
      <TestimonialList />
      <StepList />
      <Cta />
    </main>
  );
};
export default Home;
