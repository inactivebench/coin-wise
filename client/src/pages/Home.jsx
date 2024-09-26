import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cta from "../components/Cta";
import FlashcardList from "../components/FlashcardList";
import TestimonialList from "../components/TestimonialList";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <FlashcardList />
      <TestimonialList />
      <Cta />
    </main>
  );
};
export default Home;
