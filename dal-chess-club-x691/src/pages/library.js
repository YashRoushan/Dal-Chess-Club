import React, { useState, useEffect } from 'react';
import LibraryItem from '../libraryBooksItem';
import '../styles/library.css';
import { BASE_URL } from '../config.js'; 

function Library() {
  const [libraryList, setLibraryList] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/library`) 
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Debug fetched data
        setLibraryList(data); // Assuming the endpoint returns an array directly
        data.forEach(item => console.log(`Image URL for ${item.title}: ${item.image}`)); // Debug image URLs
        
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="library">
      <h1>Library Books List</h1>
      <div className="libraryList">
        {libraryList.map((libraryItem, index) => (
          <LibraryItem
            key={index}
            id={libraryItem.booksID} 
            name={libraryItem.title}
            image={libraryItem.image}
            author={libraryItem.author}
            description={libraryItem.description} 
          />
        ))}
      </div>
    </div>
  );
}

export default Library;


