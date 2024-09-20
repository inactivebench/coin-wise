import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cta from "../components/Cta";

const Home = () => {
  return (
    <main>
      <Navbar />
      <div className='container'>
        <Hero />
        <Cta />
      </div>
    </main>
  );
};
export default Home;
