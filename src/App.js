import "./style.css"
import React, { useState, useEffect, useRef } from "react";
import FlashcardsList from "./comoponents/FlashcardsList";
import CheckBox from "./comoponents/CheckBox";
import convert from "./comoponents/useConvert";
import MultiSelect from "./comoponents/MultiSelect";

function App() {

  const [words, setWords] = useState(["bailar"])
  const [tenses, setTenses] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [checked, setChecked] = useState(false);

  const arr = ["ser"]
  const arr2 = ["Pretérito Indefinido"]

  const wordsArea = useRef()
  const tensesArea = useRef()
  const generator = useRef()

  useEffect(() => {
    setWords(arr)
    setTenses(arr2)
  }, [])

  useEffect(() => {
    addWordsToFlashcards(words, tenses)
  }, [tenses, words])

  function submitWordsArea(e) {
    e.preventDefault()
    let newWords = wordsArea.current.value.split(", ")
    setWords(newWords)
  }
  function submitTensesArea(e) {
    e.preventDefault()
    let newTenses = tensesArea.current.value.split(", ")
    setTenses(newTenses)
  }

  function addWordsToFlashcards(wrds, tnss) {
    setFlashcards([])
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
            conjugation: convert(w, t, setWords)
          }])
        })
      }
    })
  }

  const randomiseFlashcards = () => setFlashcards((prev) => prev.sort(() => Math.random() - .5))

  const handleChange = (checked) => {
    !checked && randomiseFlashcards()
    setChecked(!checked)
  };
  // TO DO:
  // add a dropdown with tenses
  // add a buton to chose which person should be on the card (otherwise random)
  function generateTense(e) {
    e.preventDefault();
    // flashcards.forEach(flashcard => console.log(convert(flashcard.word, flashcard.tense)))

    // function shuffle(array) {
    // for (let i = array.length - 1; i > 0; i--) {
    //   let j = Math.floor(Math.random() * (i + 1));
    //   [array[i], array[j]] = [array[j], array[i]];
    // }
    // console.log([...array])
    // }
  }
  return (
    <div >
      <div className="top">
        <section className="features">
          <section className="words">
            <form onSubmit={submitWordsArea}>
              <label htmlFor="words">Words</label>
              <textarea rows="3" ref={wordsArea} name="words" ></textarea>
              <button className="btn" type="submit">Submit</button>
            </form>
          </section>
          <MultiSelect setTenses={setTenses} />
          {/* <section className="tenses">
        <form onSubmit={(e) => submitTensesArea(e)}>
          <label htmlFor="tenses">Tenses</label>
          <textarea ref={tensesArea} name="tenses"></textarea>
          <button type="submit">Submit</button>
        </form>
      </section> */}
          <p>Chosen words: </p>
          <div className="box"> {words.join(", ")}</div>
          <p>Chosen tenses: </p>
          <div className="box">{tenses.toString()} </div>
          <CheckBox
            label="Random order"
            value={checked}
            onChange={() => handleChange(checked)}
          />
          {/* <form onSubmit={(e) => generateTense(e)}>
          <label htmlFor="gernerator">gernerator</label>
          <input ref={generator} name="generator"></input>
          <button type="submit">Submit</button>
        </form> */}
        </section>
      </div>
      <FlashcardsList flashcards={flashcards} />
    </div>
  );
}

export default App;
