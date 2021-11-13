import React,{useState, useEffect } from 'react';
import './App.css';
import { 
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  UncontrolledPopover,
  PopoverHeader,PopoverBody,
  Popover,popoverOpen

 } from 'reactstrap';

import Movie from './components/Movie'
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

function App() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const [movieList, setMovieList] = useState([]);

    useEffect(() => {
      async function loadData(){
       const response = await fetch('/new-movies');
       const jsonResponse = await response.json();
       setMovieList(jsonResponse.movies)
       console.log('movieList bonjour',movieList)
     }
     loadData()
    }, []);
    

  var moviesData = [
    {name:"Star Wars : L'ascension de Skywalker", desc:"La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img:"/starwars.jpg", note:6.7, vote:5},
    {name:"Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img:"/maleficent.jpg", note:8.2, vote:3},
    {name:"Jumanji: The Next Level", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img:"/jumanji.jpg", note:4, vote:5},
    {name:"Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth ...", img:"/once_upon.jpg", note:6, vote:7},
    {name:"La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img:"/frozen.jpg", note:4.6, vote:3},
    {name:"Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img:"/terminator.jpg", note:6.1, vote:1},
  ]
  const [movieCount, setmovieCount] = useState(0);
  const [movieSelected, setmovieSelected] = useState([]);


//ADD MOVIE
  var handleClickAddMovie = (name,url) =>{
    setmovieCount(movieCount+1)
    setmovieSelected( [...movieSelected, {namemovie:name,url:url}] )
  }

//DELETE MOVIE LIKE
  var handleClickDeleteMovie = (name) =>{
    console.log('name',name)
    setmovieSelected(movieSelected.filter((e)=>(e.namemovie !== name)))
    setmovieCount(movieCount-1)
  }
//MOVIE LIST
  var moviesList = movieList.map((movie,i) => {
    var desc=""
    if(movie.overview.length > 80){
      desc =movie.overview.slice(0, 79)+'...'
    }

    var imageUrl = '/generique.jpg'
    if(movie.backdrop_path !== null){
      imageUrl = movie.backdrop_path
    }
    return(<Movie key={i} movieName={movie.original_title} movieDesc={desc} movieImg={`https://image.tmdb.org/t/p/w500${imageUrl}`} globalRating={movie.vote_average} globalCountRating={movie.vote_count} handleClickParent={handleClickAddMovie}  handleClickDeleteParent={handleClickDeleteMovie}/>)
  })


  var wishFavoris = movieSelected.map((objetMovie,i)=>{return (
 <PopoverBody onClick={() => handleClickDeleteMovie(objetMovie.namemovie)} >< img width= "40"src={objetMovie.url}></img> <span></span>{objetMovie.namemovie}</PopoverBody>
)})


  return (
    <div style={{backgroundColor:"#232528"}}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
          <div>
            <Button id="Popover1" type="button">
            {movieCount} film(s)
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
              <PopoverHeader>Ma WishList</PopoverHeader>
              {wishFavoris}
            </Popover>
          </div>

 {/*  <NavLink><Button  id="PopoverFocus" type="button"  handleClickParent={handleClickAddMovie}>{movieCount} films</Button>
  {' '}
  <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
  <PopoverHeader>WISHLIST </PopoverHeader>
  <div>
      {wishFavoris}
  </div>
  
  </UncontrolledPopover>
  
</NavLink> */}
          </NavItem>
        </Nav>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </div>
  );
}

export default App;

