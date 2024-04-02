import React from 'react';
import { Link } from 'react-router-dom';

import './AddForms.css';

function TrainersAddForm() {

  return (
    <div className="add-form-container">
      <div className='backButton'>
      <Link to='../adminLanding' onClick={() => {window.scroll({top: 0, left: 0, behavior: "smooth",});}}><button>Back</button></Link>
      </div>
      <div className="header-info">
        <h2 id="main-header">Trainers Page Add Form</h2>
        <p>This is the page where you, the admin, can manipulate content in the "Trainers" page.</p>
      </div>

      <div className="form-A">
        <form className="form-element">
          <label>Images</label>
          <input className="file-form" type="file" accept="image/*" required />
        </form>
      </div>

      {/* Second Form */}
      <div className="form-B">
        <form className="form-element">
          <label>Text</label>
          <input className="text-form" type="text" required />
        </form>
      </div>

      {/* Third Form */}
      <div className="form-C">
        <form className="form-element">
          <label>Other Content</label>
          <input className="text-form-c" type="text" required />
        </form>
      </div>

      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>

    </div>
  )
}

export default TrainersAddForm;