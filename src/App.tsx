import {useState, useEffect, useCallback} from 'react';
import words from "./wordList.json"
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import HangmanTextField from './HangmanTextField';
import "./App.css"


function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}


function App() {

    const[wordToGuess, setWordToGuess] = useState(() => {
        return words[Math.floor(Math.random() * words.length)].toLowerCase()
        // math.random gives 0 and 1, times the number of words, then floor
        // this will give an index.
        // toLowerCase() is what I needed.
    });

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const [textGuess, setTextGuess] = useState<string | undefined>()

    const [finalGuess, setFinalGuess] = useState<string>("")

    const [isFieldActive, setIsFieldActive] = useState(false);

    const incorrectLetters = guessedLetters.filter(letter =>
        !wordToGuess.includes(letter))
        // all the letters such that this statement is true.

    const isLoser = incorrectLetters.length >= 6 || (finalGuess.length != 0 && finalGuess != wordToGuess)
    // if every iteration returns true. like &=
    const isWinner = wordToGuess.split("").every(letter => 
        guessedLetters.includes(letter) || (finalGuess.length != 0 && finalGuess == wordToGuess)
    )

    const addGuessedLetter = useCallback((letter:string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return

        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters, isWinner, isLoser])
    // only depends on guessed letter state
    // trust me bro this causes it to not re-render.

    const handleGuess = useCallback(() => {
        if (!textGuess?.length) {
            return
        }

        if (textGuess === wordToGuess) {
            setGuessedLetters(currentLetters => [...currentLetters, ...wordToGuess])
        }

        setFinalGuess(textGuess)
    }, [textGuess, wordToGuess])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key

            if (isFieldActive) {
                if (key == "Enter") {
                    console.log("enter hit and active")
                    handleGuess()
                }
                return
            }

            if (key != "Enter") return

            e.preventDefault()
            setWordToGuess(getWord())
        }

        document.addEventListener("keypress", handler)
        return() => {
        document.removeEventListener("keypress", handler)
        // wtf is this here?
        }
    }, [isFieldActive, handleGuess])

    useEffect(() => {

        const handler = (e: KeyboardEvent) => {
            if(isFieldActive) return

            const key = e.key

            if (!key.match(/^[a-z]$/)) return

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)


        return() => {
            document.removeEventListener("keypress", handler)
        }



    }, [guessedLetters, addGuessedLetter, isFieldActive])
    // these are the keyboard handlers.
    // using the keys, does it work

    return (
        <div style = {{
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "0 auto",
            alignItems: "center"
        }}
    >
        <div style = {{
            fontSize: "2rem",
            textAlign: "center"
        }}>
            {isWinner && "Winner! - Refresh to try again"}
            {isLoser && "Nice try - Refresh to try again"}
        </div>

        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <HangmanWord reveal={isLoser}guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
        <div style={{
            alignSelf: "stretch"
        }}>
            <Keyboard
                disabled={isWinner || isLoser}
                activeLetters = {guessedLetters.filter(letter =>
                wordToGuess.includes(letter)
                )}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
            />
        </div>
        <HangmanTextField value={textGuess ?? ""}onChange={setTextGuess}
        onFocus={() => {setIsFieldActive(true)
            console.log("active!")}}
        onBlur={() => setIsFieldActive(false)}/>
        <button onClick={handleGuess} className= "btn">Make Guess</button>
        </div>
    )
}

export default App

