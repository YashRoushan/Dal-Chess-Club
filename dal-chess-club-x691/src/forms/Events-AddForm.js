import React, { useState } from 'react';
import './AddForms.css';

function EventsAddForm() {
 const [image, setImage] = useState('');
 const [text, setText] = useState('');
 const [otherContent, setOtherContent] = useState('');


 const handleSubmit = async (event) => {
   event.preventDefault();
   try {
     const formData = {
       event_imageID: 1,
       description: text,
       title: otherContent
    };


     const response = await fetch('/api/events/add', { // change the path if the ports are not same (yet to decide)
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
        <h2 id="main-header">Events Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Events" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>


     <label>Image</label>
       <input
         className="text-form"
         type="text"
         value={image}
         onChange={(e) => setImage(e.target.value)}
         required
       />

      <label>Text</label>
       <input
         className="text-form"
         type="text"
         value={text}
         onChange={(e) => setText(e.target.value)}
         required
       />

      <label>Other Content</label>
       <input
         className="text-form-c"
         type="text"
         value={otherContent}
         onChange={(e) => setOtherContent(e.target.value)}
         required
       />

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default EventsAddForm;