import { useState } from "react";
import facts from "../data";
import Flashcard from "./Flashcard";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState(facts);

  console.log(flashcards);

  return (
    <section className='card-section'>
      <div className='container grid card-container  '>
        <article className='card-section-title grid'>
          <h1 className=' ff-montserrat fs-600'>
            Four rules for less money stress{" "}
          </h1>
          <p>
            Acquire self-assurance and clarity by sticking to four basic yet
            transformative guidelines. The magic is in the approach.
          </p>
        </article>
        <article className=' card-grid '>
          {flashcards.map((flashcard) => {
            return <Flashcard flashcard={flashcard} key={flashcard.id} />;
          })}
        </article>
      </div>
    </section>
  );
};
export default FlashcardList;
