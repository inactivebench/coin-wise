import { useState } from "react";
import facts from "@/data";
import Flashcard from "./Flashcard";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState(facts);

  return (
    <section className='card-section'>
      <div className='container grid card-container  '>
        <article className='card-section-title grid ff-montserrat'>
          <h1 className='  fs-600'>Four rules for less money stress </h1>
          <p className='fs-300'>
            Acquire self-assurance and clarity by sticking to four basic yet
            transformative guidelines. The magic is in the approach.
          </p>
        </article>
        <article className=' card-grid card-grid-container '>
          {flashcards.map((flashcard) => {
            return <Flashcard flashcard={flashcard} key={flashcard.id} />;
          })}
        </article>
      </div>
    </section>
  );
};
export default FlashcardList;
