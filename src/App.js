import React from 'react'
import { Route }from 'react-router-dom' 
import './App.css'
import SeachBooks from './SearchBooks';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    books: [],   
    searchResults: []       
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  handleSearch = (query) => {  	

  	if(query.length > 0){
  		
  		BooksAPI.search(query)
      	.then((booksSearched) => {    		
      		
          const ids = Object.values(this.state.books).map(book => book.id)

      		const updatedBooks = booksSearched.map((book) => {
      			if (ids.includes(book.id)) {
              const index = ids.findIndex((id)=> book.id === id)              
              book.shelf = this.state.books[index].shelf
            }
            else{
              book.shelf = 'none'
            }
            return book
      		})

          	this.setState(() => ({
            searchResults: updatedBooks 
        }))
        
      	}).catch(error =>{
        this.setState(() => ({
          searchResults: []
        }))
        
      })
  	}else{
  		const searchResults = []
  		this.setState(() => ({
          		searchResults: searchResults
        	}))
  	}
  }

  clearSearchResults = () =>{
  	this.setState(() => ({
          searchResults: []
        }))
  }

  handleShelfChange = (book, shelf) => {
      const books = this.state.books
      console.log(book, shelf)
      var result = books.find(obj => {
         return obj.id === book.id
      })
      if(result){        
        result.shelf = shelf
        this.setState(() => ({
          books: books
        }))
      }else{   
        book.shelf = shelf                   
        this.setState((prevState) => ({
          books: prevState.books.concat([book])
        }))
      }      
      
      BooksAPI.update(book, shelf)
   }

  
  

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <BookList books={this.state.books} onShelfChange={this.handleShelfChange}/>
          )
         } 
        /> 
         <Route path='/search' render={() => (
            <SeachBooks onShelfChange={this.handleShelfChange} onSearch={this.handleSearch} searchResults = {this.state.searchResults} clearSearchResults={this.clearSearchResults}/>
          )
         } 
        /> 
        
       </div> 
    )
  }
}

export default BooksApp




