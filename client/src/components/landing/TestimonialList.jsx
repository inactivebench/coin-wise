import { useState } from "react";
import { testimonials } from "../../data";
import Testimonial from "./Testimonial";

const TestimonialList = () => {
  const [comments, setComments] = useState(testimonials);
  return (
    <section className='testimonial-section'>
      <div className='container testimonial-container grid'>
        <article className=' testimonial-header grid ff-montserrat'>
          <h1 className='fs-600'>Don't just take our word for it…</h1>
          <p className='fs-300'>
            Hear what others have to say about Coin-Wise. Are you ready to
            become our next success story?
          </p>
        </article>
        <article className='testimonial-grid '>
          {comments.map((comment) => {
            return <Testimonial comment={comment} key={comment.id} />;
          })}
        </article>
      </div>
    </section>
  );
};
export default TestimonialList;
