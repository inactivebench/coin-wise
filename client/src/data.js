import React from "react";

import jobImg from "./assets/icons/job.png";
import ageImg from "./assets/icons/age.png";
import expensesImg from "./assets/icons/expenses.png";
import punchImg from "./assets/icons/punch.png";

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

const testimonials = [{}];

export default facts;
