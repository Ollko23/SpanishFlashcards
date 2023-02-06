// TO DO:
// - choose bckg img 
// - choose cover img
// - mobile version
// 

import "./style.css"
import React, { useState, useEffect, useRef } from "react";
import FlashcardsList from "./comoponents/FlashcardsList";
import CheckBox from "./comoponents/CheckBox";
import convert from "./comoponents/useConvert";
import MultiSelect from "./comoponents/MultiSelect";
import SetsButton from "./comoponents/SetsButton";

function App() {

  const [words, setWords] = useState([])
  const [tenses, setTenses] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [checked, setChecked] = useState(false);

  const wordsArea = useRef()

  useEffect(() => {
    addWordsToFlashcards(words, tenses)
  }, [tenses, words])

  function submitWordsArea(e) {
    e.preventDefault()
    setWords([])
    let newWords = wordsArea.current.value.replace(/,/g, " ").split(" ").filter(str => str !== "")
    setWords(newWords)
  }

  function addWordsToFlashcards(wrds, tnss) {
    setFlashcards([])
    setChecked(false)
    wrds.forEach((item, index) => {
      for (let i = 0; i < tnss.length; i++) {
        let id = index
        let w = item
        let t = tnss[i]
        setFlashcards((prev) => {
          return ([...prev,
          {
            id: `w${id}t${i}`,
            word: w,
            tense: t,
            conjugation: convert(w, t)
          }])
        })
      }
    })
  }

  const randomiseFlashcards = () => setFlashcards(prev => prev.sort(() => Math.random() - .5))

  const handleChange = (checked) => {
    !checked && randomiseFlashcards()
    setChecked(!checked)
  };
  // TO DO:
  // add a buton to chose which person should be on the card (otherwise random)

  return (
    <div >
      <div className="top">
        <section className="features">
          <section className="words">
            <form onSubmit={submitWordsArea}>
              <label htmlFor="words">Verbos</label>
              <textarea rows="3" ref={wordsArea} name="words" ></textarea>
              <button className="btn" type="submit">Enviar</button>
            </form>
          </section>
          <MultiSelect setTenses={setTenses} />
          <p>Verbos elegidos: </p>
          <div className="box"> {typeof words === "string" && words.join(", ")}</div>
          <p>Tiempos elegidos: </p>
          <div className="box">{tenses.toString()} </div>
          <CheckBox
            label="Orden aleatorio"
            value={checked}
            onChange={() => handleChange(checked)}
          />
          <div className="setBtns">

            <SetsButton
              setWords={setWords}
              tenses={tenses}
            />
            {/* <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="presenteIndicativo"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="preteritoPerfecto"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="preteritoImperfecto"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="futuroImperfecto"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="subjuntivoPresente"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="subjuntivoPretéritoImperfecto"
              num={4}
            />
            <SetsButton
              setTenses={setTenses}
              setWords={setWords}
              tense="imperativo"
              num={4}
            /> */}
          </div>

          <button id="restart" className="btn" onClick={() => window.location.reload(false)}>Restart</button>
        </section>
      </div>
      <FlashcardsList flashcards={flashcards} />
    </div>
  );
}

export default App;
