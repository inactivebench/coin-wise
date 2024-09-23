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
    color: "text-blue",
    description:
      "By determining where your money will go before you actually spend it, you gain control over your financial choices. Treating every dollar equally, regardless of whether you plan to use it now or in the future.",
  },
  {
    id: 2,
    title: "Embrace Your True Expenses",
    icon: expensesImg,
    backgroundColor: "bg-green",
    color: "text-blue",
    description:
      "Beyond regular bills, consider 'true expenses' like car insurance or holiday shopping. By including these in your budget, you'll be better prepared for unexpected costs, avoid stress, and stay focused on your financial goals.",
  },
  {
    id: 3,
    title: "Roll With the Punches",
    icon: punchImg,
    backgroundColor: "bg-accent",
    color: "text-blue",
    description:
      "Life throws curveballs! Stay flexible, adjust your budget, and avoid financial panic. By anticipating and adapting, you'll maintain your financial plan and weather any storm.",
  },
  {
    id: 4,
    title: "Age Your Money",
    icon: ageImg,
    backgroundColor: "bg-grey",
    color: "text-white",
    description:
      "Stop spending paycheck-to-paycheck. Let your money 'age' by saving it. Watch your savings grow and reduce financial stress. By aging your money, you gain peace of mind and take control of your finances.",
  },
];

const testimonials = [{}];

export default facts;
