import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(randomDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const val = dice[0].value;
    if (dice.every(die => die.locked && die.value === val)) setTenzies(true);
  }, [dice]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function randomDice() {
    const dice = [];
    for (let i = 1; i <= 10; i++)
      dice.push({ value: randomDieValue(), locked: false, id: i });
    return dice;
  }

  function roll() {
    if (tenzies) {
      setDice(randomDice);
      setTenzies(false);
    } else {
      setDice(prevDice =>
        prevDice.map(die =>
          die.locked ? die : { ...die, value: randomDieValue() }
        )
      );
    }
  }

  function lock(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, locked: !die.locked } : die
      )
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map(die => (
          <Die key={die.id} {...die} lock={() => lock(die.id)} />
        ))}
      </div>
      <button className="roll-dice" onClick={roll}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
