"use client";
import React, { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is Webflow and why is it the best website builder?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas utphasellus elit.",
  },
  {
    question: "What is your favorite template from BRIX Templates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas utphasellus elit.",
  },
  {
    question: "What is your favorite template from BRIX Templates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas utphasellus elit.",
  },
  {
    question: "What is your favorite template from BRIX Templates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas utphasellus elit.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 border-b border-gray" id="faqs">
      <div className="max-w-7xl mx-auto md:px-8 text-center">
        <h2 className="text-sm font-medium text-normal uppercase">
          Frequently Asked Questions
        </h2>
        <h2 className="md:text-4xl text-2xl font-bold mt-2">Curious? Find Out More Here</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl transition-colors duration-300 ${
                activeIndex === index
                  ? "bg-orange-500 text-white"
                  : "bg-lightBlue text-gray-800"
              }`}
            >
              <div className="flex justify-between items-start md:items-center text-left">
                <div className="md:pe-6 lg:pe-14 pe-2">
                  <h3 className="text-lg font-regular">{faq.question}</h3>
                  {activeIndex === index && (
                    <p className="mt-4 text-base font-light">{faq.answer}</p>
                  )}
                </div>
                <div>
                  <button
                    className="text-3xl font-light rounded-full text-darkBlue bg-white w-8 h-8 pb-1 flex items-center justify-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    {activeIndex === index ? "×" : "+"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
