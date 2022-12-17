import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardsList({ flashcards }) {

    return (
        <div className='flashcards-list' >
            {flashcards !== undefined && flashcards.map((flashcard, i) => {
                return <Flashcard flashcard={flashcard} nr={i + 1} key={flashcard.id} />
            })}
        </div>
    )
}
