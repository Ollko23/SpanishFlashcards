import React, { useRef, useState, useEffect } from 'react'

export default function Flashcard({ flashcard, nr }) {
    const [flip, setFlip] = useState(false)
    const heightRef = useRef()
    console.log(flashcard)
    function setMaxHigh() {
        let newHeight = heightRef.current.clientHeight || 200
        let newWidth = heightRef.current.clientWidth || 150
        let r = document.querySelectorAll(".covered")
        r.forEach(i => i.style.setProperty('--newHeight', `${newHeight}px`))
        r.forEach(i => i.style.setProperty('--newWidth', `${newWidth}px`))
    }
    useEffect(setMaxHigh, [])

    return (
        flashcard.conjugation && <div>
            <div className='covered'
                onClick={(e) => {
                    e.target.style.setProperty("display", "none")
                }}>
                {nr}
            </div>
            <div
                className={`flashcard ${flip ? 'flip' : ""}`}
                onClick={(e) => {
                    setFlip(!flip)
                }}
                ref={heightRef}>
                <div className='front'>
                    <p className="word">
                        Verbo: <br></br><span className='textBig'> {flashcard.word || "error"}</span>
                    </p>
                    <p className="tense">
                        Tiempo: <br></br><span className='textBig'>{flashcard.tense || "error"}</span>
                    </p>
                </div >
                <div className='back'>
                    <div>
                        <p>{`Yo ${flashcard.conjugation[0] || "error"}`}</p>
                        <p>{`Tu ${flashcard.conjugation[1] || "error"}`}</p>
                        <p>{`El/Ella ${flashcard.conjugation[2] || "error"}`}</p>
                    </div>
                    <div>
                        <p>{`Nosotros ${flashcard.conjugation[3] || "error"}`}</p>
                        <p>{`Vosotros ${flashcard.conjugation[4] || "error"}`}</p>
                        <p>{`Ellas/Ellos ${flashcard.conjugation[5] || "error"}`}</p>
                    </div>
                </div>
            </div >
        </div >
    )
}
