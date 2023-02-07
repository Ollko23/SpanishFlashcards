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
                        <p><span className='mobile'>1 </span><span className='no-mobile'>Yo </span>{flashcard.conjugation[0] || "error"}</p>
                        <p><span className='mobile'>2 </span><span className='no-mobile'>Tu </span>{flashcard.conjugation[1] || "error"}</p>
                        <p><span className='mobile'>3 </span><span className='no-mobile'>El/Ella </span>{flashcard.conjugation[2] || "error"}</p>
                        {/* <p>{`2 ${flashcard.conjugation[1] || "error"}`}</p>
                        <p>{`3 ${flashcard.conjugation[2] || "error"}`}</p> */}
                    </div>
                    <div>
                        <p><span className='mobile'>4 </span><span className='no-mobile'>Nosotros </span>{flashcard.conjugation[3] || "error"}</p>
                        <p><span className='mobile'>5 </span><span className='no-mobile'>Vosotros </span>{flashcard.conjugation[4] || "error"}</p>
                        <p><span className='mobile'>6 </span><span className='no-mobile'>Ellos </span>{flashcard.conjugation[5] || "error"}</p>
                        {/* <p>{`2 ${flashcard.conjugation[4] || "error"}`}</p>
                        <p>{`3 ${flashcard.conjugation[5] || "error"}`}</p> */}
                    </div>
                </div>
            </div >
        </div >
    )
}
