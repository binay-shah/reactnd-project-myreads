import React from 'react'


function Book  (props) {  
	return (
		    <li key={props.book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(props.book.imageLinks && props.book.imageLinks.thumbnail) || 'Thumbnail not available'})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(event)=> {props.onShelfChange(props.book, event.target.value)}} defaultValue={props.book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{props.book.title}</div>
              <div className="book-authors">{(props.book.authors && props.book.authors[0]) || "Author unknown"}</div>
            </div>
         </li>
	)
}

export default Book;