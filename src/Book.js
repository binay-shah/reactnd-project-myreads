import React from 'react'


class Book  extends React.Component {

	
onBookShelfChange = (event,book) => {
  const shelf = event.target.value  
  this.props.onShelfChange(this.props.book, shelf)
  


}
 
render(){
  const { book} = this.props
	return (

		    <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.onBookShelfChange} defaultValue={this.props.book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors[0]}</div>
            </div>
         </li>
	)
}
}

export default Book;