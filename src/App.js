import React, { Component } from "react";
import Title from "./components/Title";
import Wrapper from "./components/wrapper";
import Cards from "./components/cards";
import PB from "./PB.json";

import "./App.css";

let correct = 0;
let best = 0;
let rules =
  "Avoid a sticky situation and click a different image each time without clicking the same one!";

class App extends Component {
  // Setting this.state.PB to the PB json array
  state = {
    PB,
    correct,
    best,
    rules
  };

  setClicked = id => {
    // copy of the state PB array
    const PB = this.state.PB;

    // Filter for the clicked match
    const clickedPB = PB.filter(match => match.id === id);

    if (clickedPB[0].clicked) {
      correct = 0;
      rules =
        "Dang! You already clicked on that one! Now you have to start over!";

      for (let i = 0; i < PB.length; i++) {
        PB[i].clicked = false;
      }

      this.setState({ rules });
      this.setState({ correct });
      this.setState({ PB });
    } else if (correct < 11) {
      // Set its value to true
      clickedPB[0].clicked = true;

      // increment the appropriate counter
      correct++;

      if (correct > best) {
        best = correct;
        this.setState({ best });
      }

      // randomize cards
      PB.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.PB equal to the new PB array
      this.setState({ PB });
      this.setState({ correct });
      this.setState({ rules });
    } else {
      // Set its value to true
      clickedPB[0].clicked = true;

      // restart guesses
      correct = 0;

      rules = "Great Job! Try Again!";
      best = 12;
      this.setState({ best });

      for (let i = 0; i < PB.length; i++) {
        PB[i].clicked = false;
      }

      // Shuffle the array randomly
      PB.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.PB equal to the new PB array
      this.setState({ PB });
      this.setState({ correct });
      this.setState({ rules });
    }
  };

  render() {
    return (
      <Wrapper>
        <u>
          <Title> PEANUT BUTTER!</Title>
        </u>

        <h3 className="scoreSummary">{this.state.rules}</h3>

        <h3 className="scoreSummary">
          Correct Guesses: {this.state.correct}
          <br />
          High Score: {this.state.best}
        </h3>

        {this.state.PB.map(match => (
          <Cards
            setClicked={this.setClicked}
            id={match.id}
            key={match.id}
            image={match.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
