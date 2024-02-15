import React from 'react'
import { libraryList } from '../libraryBooksList'
import LibraryItem from '../libraryBooksItem'
import '../styles/library.css'

function library() {
    return(
        <div className="library">
        <h1>Library Books List</h1>
          <div className="libraryList">
            
              {libraryList.map((libraryItem, key) => {
                return(
                  <LibraryItem
                    key={key}
                    name={libraryItem.name}
                    image={libraryItem.image}
                    author={libraryItem.author}
                  />
                )
              })}
          </div>
      </div>
    )
}

export default library