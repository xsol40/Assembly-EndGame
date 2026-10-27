import React from "react"
import languages from "./language.js"
import { clsx } from 'clsx';
import {getFarewellText} from './utils.js'


function WordDisplay({ currentWord, guessedLetters }){
    
    return (
        currentWord.split('').map((char, index) => (
            <span key={index}>
                {guessedLetters.includes(char.toLowerCase()) ? char.toUpperCase() : ''}
            </span>
        ))
    );
}


export default function App(){
    // state
    const [currentWord, setCurrentWord] = React.useState('react')
    const [guessedLetters, setGuessedLetters] = React.useState([])
    
    // drived value 
    const wrongGuessCount = guessedLetters.filter(
        letter => !currentWord.toLowerCase().includes(letter) 
    ).length
    
    const isGameWon = 
        currentWord.toLowerCase().split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter)
    // Static Value    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const isFarewell = !isGameOver && isLastGuessIncorrect
    function renderStatus() {
        if (isFarewell) {
            return <p>{getFarewellText(languages[wrongGuessCount - 1])}</p>
        }
        if (isGameWon) {
            return (
                <>
                    <h2>You Win!</h2>
                    <p>Well done!</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        return null
    }

    function addGuessedLetter(letter){
        setGuessedLetters(prev => (
            prev.includes(letter) ? prev : [...prev, letter]
        ))
    }


    // console.log(addGuessedLetter(le))
    const keyboardElements = alphabet.split('').map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.toLowerCase().includes(letter)
        const isWrong = isGuessed && !currentWord.toLowerCase().includes(letter)

        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        // console.log(className);
        return (
            <button 
                className={className}
                key={letter}
                onClick={() => addGuessedLetter(letter)}>
                {letter.toUpperCase()}
            </button>
        )
    })

    // console.log(keyboardElements);

    const languageChip = languages.map((lang, index) => {
        const isLanguagelost = index < wrongGuessCount

        const className = clsx("chip" , isLanguagelost && "lost")
        return (
            <span
                className={className}
                key={lang}>
                {lang}
            </span>
        )
    })

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            {(isGameOver || isFarewell) && (                       
                <section className={clsx("status", {
                    won: isGameWon,
                    lost: isGameLost,
                    farewell: isFarewell                       
                })}>
                    {renderStatus()}
                </section>
            )}
            <section className="chips">{languageChip}</section>
            <div className="word">
                <WordDisplay 
                    currentWord={currentWord}
                    guessedLetters={guessedLetters}
                />
            </div>
            <section className="keyboard">{keyboardElements}</section>
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}