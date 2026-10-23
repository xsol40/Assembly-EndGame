import React from "react"
import languages from "./language.js"


export default function App(){
    const languageChip = languages.map((lang) => (
        <span className="chip" key={lang}>{lang}</span>
    ))

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className="status">
                <h1>You Win!</h1>
                <p>Well done!</p>
            </section>
            <section className="chips">{languageChip}</section>
        </main>
    )
}