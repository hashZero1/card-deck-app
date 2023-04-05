import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';
const Base_API = "https://www.deckofcardsapi.com/api/deck/";

class Cards extends Component{
    constructor(props){
        super(props);
        this.state = {deck : null , drawn : []}
        this.cardDeck = this.cardDeck.bind(this);
    }
    async componentDidMount(){
        let response = await axios.get(`${Base_API}new/shuffle/`);
        this.setState({deck : response.data});
    }

    async cardDeck(){
        let deck_id = this.state.deck.deck_id;
        try{
           let cardUrl = `${Base_API}/${deck_id}/draw/`;
            let cardResponse = await axios.get(cardUrl);
            if(!cardResponse.data.success){
                throw new Error("No card Remaining");
            }
            let card = cardResponse.data.cards[0];
            console.log(cardResponse.data);
            // this should give the existing data (drawn []) 
            this.setState(draw =>({
                //and  add new object below with keys e.g-id,image etc
                drawn: [...draw.drawn, {id: card.code , image: card.image ,name :`${card.value} of ${card.suit}`}]
            }))
        }catch(e){
            alert(e);
        }
    }
    render(){
        const cardDeck = this.state.drawn.map(c => (
            <Card key={c.id} image={c.image} name={c.name} />
        ));
        return(
            <div className='Deck-card'>
                <h1 className='Deck-h1'>Card Deck </h1>
                <h2 className='Deck-h2'>A Small project With React</h2>
                <button className='Deck-fill' onClick={this.cardDeck}>CLick ME</button>
                {cardDeck}
            </div>
        )
    }
}

export default Cards;
