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

  componentDidMount(){
     BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      }) 
  }

  handleSearch = (query) => {  	

  	if(query.length > 0){
  		console.log(query+" hello")
  		BooksAPI.search(query)
      	.then((books) => {        		
      		console.log(books) 
      		const updatedBooks = books.map((book) => {
      			this.state.books.filter((bs) => {
      				book.id === bs.id ? book.shelf = bs.shelf: book.shelf = 'none'
      			})
      			return book
      		})          
          	this.setState(() => ({
            searchResults: updatedBooks 
        }))
        
      	}).catch(error =>{
        this.setState(() => ({
          searchResults: []
        }))
        console.log(error)
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
        console.log('book  found')
        result.shelf = shelf
        this.setState(() => ({
          books: books
        }))
      }else{   
        book.shelf = shelf        
        console.log('book not found')           
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




