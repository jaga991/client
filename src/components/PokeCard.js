import {useState, useEffect} from 'react';
import Card from "react-bootstrap/Card"

export default function PokeCard({cardInfo, onCardClick}) {
    return(
        <Card className="pokeCard" onClick={onCardClick} id={cardInfo.id}>
            <Card.Img variant="top" src={cardInfo.sprites} />
            <Card.Text>{cardInfo.name}</Card.Text>
        </Card>
    );
}