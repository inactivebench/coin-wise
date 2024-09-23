import { useState } from "react";
import facts from "../data";

const Fact = () => {
  return (
    <section>
      <div className='container'>
        <div className='section-title'>
          <h1>Four rules for less money stress </h1>
          <p></p>
        </div>
        {facts.map((fact) => {
          const { id, title, icon, backgroundColor, color, description } = fact;
          return (
            <div className='card  ' key={id}>
              <h2 className={`${backgroundColor} ${color} `}>{id}</h2>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Fact;
