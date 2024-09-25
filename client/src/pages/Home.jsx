import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cta from "../components/Cta";
import FlashcardList from "../components/FlashcardList";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <FlashcardList />
      <Cta />
    </main>
  );
};
export default Home;
