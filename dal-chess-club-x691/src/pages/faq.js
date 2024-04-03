import React, { useState, useEffect } from 'react';
import '../styles/faq.css';

const FaqItem = ({ question, answer }) => (
  <div className='question'>
    <h2>{question}</h2>
    <p>{answer}</p>
  </div>
);

function FAQPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/faq/getAllFaqs")
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error fetching FAQs:", err));
  }, []);

  return (
    <div>
      <div className="faq">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-content">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

export default FAQPage;