import React from "react";
import jobImg from "./assets/icons/job.png";
import ageImg from "./assets/icons/age.png";
import expensesImg from "./assets/icons/expenses.png";
import punchImg from "./assets/icons/punch.png";

import avatar1 from "./assets/avatars/avatar-1.png";
import avatar2 from "./assets/avatars/avatar-2.png";
import avatar3 from "./assets/avatars/avatar-3.png";

import comfort from "./assets/icons/comfort.png";
import burning from "./assets/icons/burning.png";
import inscription from "./assets/icons/inscription.png";

const facts = [
  {
    id: 1,
    title: "Give Every Dollar a Job",
    icon: jobImg,
    backgroundColor: "bg-salmon",
    bgColor: "hsl(var(--clr-darksalmon)",
    color: "text-blue",
    description:
      "Decide where your money will go before you spend it. This helps you make smart choices. Treat all your money equally, whether you spend it now or save it for later.",
  },
  {
    id: 2,
    title: "Embrace Your True Expenses",
    icon: expensesImg,
    backgroundColor: "bg-green",
    bgColor: "hsl(var(--clr-seaGreen)",
    color: "text-blue",
    description:
      "Plan for unexpected costs. Include extra costs like car insurance or holiday shopping. This will help you stay calm and focused on your money goals.",
  },
  {
    id: 3,
    title: "Roll With the Punches",
    icon: punchImg,
    backgroundColor: "bg-accent",
    bgColor: "hsl(var(--clr-bulrywood)",
    color: "text-blue",
    description:
      "Life throws curveballs! Stay flexible, adjust your budget, and avoid financial panic. By anticipating and adapting, you'll maintain your financial plan and weather any storm.",
  },
  {
    id: 4,
    title: "Age Your   Money",
    icon: ageImg,
    backgroundColor: "bg-grey",
    bgColor: "hsl(var(--clr-slateBlue)",
    color: "text-white",
    description:
      "Stop spending paycheck-to-paycheck. Save some and watch it grow. By aging your money, you gain peace of mind and take control of your finances.",
  },
];

export const testimonials = [
  {
    id: "khaxbcla",
    name: "Michael Lee",
    backgroundColor: "bg-salmon",
    img: avatar1,
    testimonial:
      "Before Coin-Wise, I was constantly stressed about money. Now, thanks to their intuitive tracking and budgeting tools, I can see exactly where my money goes and make informed spending decisions. I finally feel confident about my financial future.",
  },
  {
    id: "mpklnola",
    name: "Olivia Fatuh",
    backgroundColor: "bg-accent",
    img: avatar2,
    testimonial:
      "As a freelancer, my income can be unpredictable. Coin-Wise has been a game-changer! It helps me plan for slow months and avoid overspending during busy periods. I highly recommend it to anyone who wants to take control of their finances.",
  },
  {
    id: "qdqplkla",
    name: "Noah Brown",
    backgroundColor: "bg-salmon",
    img: avatar3,
    testimonial:
      "I used to be a budgeting skeptic, but Coin-Wise has definitely changed my mind. Their user-friendly app makes budgeting easy and enjoyable. I've not only saved money, but I've also learned valuable financial habits that will benefit me for years to come.",
  },
];

export const howItWorks = [
  {
    id: "mjhsw",
    name: "Sign up for free",
    img: inscription,
    description:
      "Ready to take control of your finances? Start your journey by signing up to coin-wise",
  },
  {
    id: "manhd",
    name: "Rack your spending",
    img: burning,
    description:
      "Add your expenses, savings targets and discover hidden spending habits and unlock financial freedom",
  },
  {
    id: "poirh",
    name: "Achieve Peace of Mind",
    img: comfort,
    description:
      "Say goodbye to financial stress and hello to a brighter future. Watch your financial goals become a reality",
  },
];

export default facts;
