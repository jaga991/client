import './App.css';
import { useState, useEffect } from 'react';
import Pokedex from 'pokedex-promise-v2';
import Game from './components/Game';
import Random from 'random-number-arrays';

const P = new Pokedex();

function App() {

  const [cards, setCards] = useState([]);
  
  const [gameInfo, setGameInfo] = useState({
    user: "Player",
    score: 0,
    maxScore: 0,
    level: 2,
    maxLevel: 1,
  })

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  let generateAndSetCards = async function (level) {
    let numArr = Random({min: 1, max: 300, type: 'array', arraySize: level+4});
    let tempArr = []

    for (let i = 0; i < level + 4; i++) {
      let pokemon = await P.getPokemonByName(numArr[i]);
      tempArr.push({          
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites.front_default,
        selected: false
      });
    }
    setCards(tempArr);
  }
  
  //At the start of the game, 
  //1. generate number of cards based on level
  useEffect(() => {
    generateAndSetCards(gameInfo.level);
  }, []);

  //2. randomize cards state
  function shuffleCardsState() {
    setCards(shuffleArray(cards));
  }

  //At every card selection
  function onCardClick(e) {
    let currentCardState = JSON.parse(JSON.stringify(cards));
    let currentGameInfoState = {
      ...gameInfo
    }
    for (let i = 0; i < currentCardState.length; i++) {
      if ((currentCardState[i].id == e.currentTarget.id) && (currentCardState[i].selected == false)) {
        currentCardState[i].selected = true;

        //if all cards selected is true
        

        shuffleArray(currentCardState);
        
        currentGameInfoState.score = currentGameInfoState.score + 1;
        if (currentGameInfoState.score > currentGameInfoState.maxScore) {
          currentGameInfoState.maxScore = currentGameInfoState.score;
        }
        setGameInfo(currentGameInfoState);
        setCards(currentCardState);

        break;
      }

      if ((currentCardState[i].id == e.currentTarget.id) && (currentCardState[i].selected == true)) {
        currentGameInfoState.score = 0;
        generateAndSetCards(currentGameInfoState.level);
        setGameInfo(currentGameInfoState);
      }
    }
  }



  
  //2.1 show gameover card, display highest score
  //2.2 if click restart, restart the game

  return (
    <main>
      <h1>Hello World</h1>
      <Game 
        cards = {cards}
        gameInfo = {gameInfo}
        onCardClick = {onCardClick}
      />
    </main>

  );
}

export default App;
