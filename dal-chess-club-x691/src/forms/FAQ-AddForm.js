import React, { useState } from 'react';
import './AddForms.css';

function FAQAddForm() {
 const [FAQQuestion, setFAQQuestion] = useState('');
 const [FAQImage, setFAQImage] = useState('');
 const [FAQAnswer, setFAQAnswer] = useState('');

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = {
      faqID: 1,
      question: FAQQuestion,
      answer: FAQAnswer
    };


    const response = await fetch('/api/faq/add', { // change the path if the ports are not same (yet to decide)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    const result = await response.json();
    if (result) {
      console.log(result);
    } else {
      console.error('Failed to add member');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">FAQ Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "FAQ" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>

      <label>FAQ Question</label>
       <input
         className="text-form"
         type="text"
         value={FAQQuestion}
         onChange={(e) => setFAQQuestion(e.target.value)}
         required
       />

      <label>FAQ Image</label>
       <input
         className="text-form"
         type="text"
         value={FAQImage}
         onChange={(e) => setFAQImage(e.target.value)}
         required
       />

      <label>FAQ Answer</label>
       <input
         className="text-form-c"
         type="text"
         value={FAQAnswer}
         onChange={(e) => setFAQAnswer(e.target.value)}
         required
       />

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default FAQAddForm;