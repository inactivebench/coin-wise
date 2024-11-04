import { useState } from "react";
import { howItWorks } from "../../data";
import Step from "./Step";

const StepList = () => {
  const [steps, setSteps] = useState(howItWorks);

  return (
    <section className='step-section'>
      <div className='container step-container grid'>
        <article className='step-header ff-montserrat grid'>
          <h1 className='fs-300'>How Coin-Wise works</h1>
          <h2 className='fs-600 '>Three steps to smarter spending</h2>
        </article>
        <article className='step-grid'>
          {steps.map((step) => {
            return <Step step={step} key={step.id} />;
          })}
        </article>
      </div>
    </section>
  );
};
export default StepList;
