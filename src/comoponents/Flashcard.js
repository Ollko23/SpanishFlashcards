import React, { useRef, useState, useEffect } from 'react'

export default function Flashcard({ flashcard, nr }) {
    const [flip, setFlip] = useState(false)
    const heightRef = useRef()

    function setMaxHigh() {
        const newHeight = heightRef.current.clientHeight
        const newWidth = heightRef.current.clientWidth
        let r = document.querySelectorAll(".covered")
        // let rs = getComputedStyle(r)
        r.forEach(i => i.style.setProperty('--newHeight', `${newHeight}px`))
        r.forEach(i => i.style.setProperty('--newWidth', `${newWidth}px`))
    }
    useEffect(setMaxHigh, [])


    return (
        <div>
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
                        Verbo: <span className='textBig'> {flashcard.word || "error"}</span>
                    </p>
                    <p className="tense">
                        Tiempo: <span className='textBig'>{flashcard.tense || "error"}</span>
                    </p>
                </div >
                <div className='back'>
                    {/* {flashcard.conjugation.map((e, i) => {
                        return <div >{`${i + 1}: ${e}`}  </div>
                    })} */}
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
