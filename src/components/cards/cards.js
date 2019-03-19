import React from "react";
import "./cards.css";

const Cards = props => (
  <div onClick={() => props.setClicked(props.id)} className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default Cards;
