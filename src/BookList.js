import React from 'react';
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom' 


class BookList extends React.Component{     

	render(){
      const { books, onShelfChange } = this.props
		return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
	            <div className="list-books-content">
		            <BookShelf title='Currently Reading' books={books.filter((book) => book.shelf==='currentlyReading')} onShelfChange={onShelfChange}/>
		            <BookShelf title='Want to Read' books={ books.filter((book) => book.shelf==='wantToRead')} onShelfChange={onShelfChange}/>
		            <BookShelf title='Read' books={books.filter((book) => book.shelf==='read')} onShelfChange={onShelfChange}/>    
		        </div>             
                
            <div className="open-search">
               <Link 
                  to='/search'><button>Add a book</button>
               </Link>              
            </div>
          </div>
        )	
	}
}

export default BookList;
