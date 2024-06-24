import React, { useState } from 'react';
import './AddForms.css';

function NewsAddForm() {
 const [newsTitle, setNewsTitle] = useState('');
 const [newsImage, setNewsImage] = useState('');
 const [newsContent, setNewsContent] = useState('');

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = {
      newsImage: 1,
      title: newsTitle,
      content: newsContent
    };


    const response = await fetch('/api/news/add', { // change the path if the ports are not same (yet to decide)
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
        <h2 id="main-header">News Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "News" page.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-combined"></form>

      <div className="form-A">
        <form className="form-element">
          <label>News Title</label>
          <input 
          className="text-form" 
          type="text" 
          value={newsTitle} 
          onChange={(e) => setNewsTitle(e.target.value)} 
          required 
        />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>News Images</label>
          <input 
          className="file-form" 
          type="file"
          accept='image/*' 
          value={newsImage} 
          onChange={(e) => setNewsImage(e.target.value)} 
          required 
        />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>News Content</label>
          <input 
          className="text-form" 
          type="text" 
          value={newsContent} 
          onChange={(e) => setNewsContent(e.target.value)} 
          required 
        />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default NewsAddForm;
