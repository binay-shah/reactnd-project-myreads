import React from 'react'
import Book from './Book'

const BookShelf = props => {

	return(

		          <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
	                    {props.books.length > 0 && props.books.map((book) => <Book key={book.id} book={book} onShelfChange={props.onShelfChange}/>)}  	                      
                    </ol>
                  </div>
                </div>
          </div>      

		)
}

export default BookShelf;