import React from 'react';
import './AddForms.css';

function FAQAddForm() {

  return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">FAQ Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "FAQ" page.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>FAQ Question</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>FAQ Image</label>
          <input className="file-form" type="file" accept="image/*" required />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>FAQ Answer</label>
          <input className="text-form-c" type="text" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default FAQAddForm;