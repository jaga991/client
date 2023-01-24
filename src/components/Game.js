import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import PokeCard from "./PokeCard";
import Scoreboard from "./Scoreboard";


export default function Game({cards, gameInfo, onCardClick}) {
    

    return(
        <Container fluid>
            <Row>
                <Scoreboard gameInfo={gameInfo}/>
            </Row>
            <div className="pokeCardDiv">
                {cards.map(card => <PokeCard cardInfo={card} onCardClick={onCardClick} />)}
            </div>
        </Container>
    );
}