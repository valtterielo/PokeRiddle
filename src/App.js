import React from 'react'
import './App.css'

function App() {

  //creating useState hooks for data manipulation
  const [name, setName] = React.useState("")
  const [dexEntry, setDexEntry] = React.useState("")
  const [img, setImg] = React.useState("./PixelArt.png")
  const [score, setScore] = React.useState(0)
  const [btnText, setBtnText] = React.useState("Start!")
  const [usedNumbers, setUsedNumbers] = React.useState([])

  const getPokemon = () => {

    //gen 1 pokedex has a total of 151 entries, this chooses one pokemon randomly
    let dexNro = Math.floor(Math.random() * 151 + 1)

    //making sure that every pokemon is shown only once
    while (usedNumbers.includes(dexNro)){
      dexNro = Math.floor(Math.random() * 151 + 1)
    }
    setUsedNumbers(usedNumbers.concat(dexNro))
    console.log(usedNumbers)

    //fetching the randomly chosen pokemon's name and picture
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + dexNro)
      .then(response => response.json())
      .then(responseData => {
        setName(responseData.name)
        console.log(name)
        setDexEntry(responseData.flavor_text_entries[53].flavor_text)
        console.log(dexEntry)
        setImg("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + dexNro + ".png")
        console.log(img)
      })
  }

  //checking if the user given answer matches pokemon's correct name
  const checkAnswer = (event) => {
    if (event.target.value === name) {
      document.getElementById("pokename").value = ""
      getPokemon()
      setScore(score + 1)
    }
  }

  return (
    <div className="App">
      <h1>PokéRiddle</h1>
      <p><img src={img} className="picture"></img></p>
      <input onChange={checkAnswer} type="text" id="pokename" name="pokename"></input>
      <button onClick={() => {getPokemon(); setBtnText("I don't know")}}>{btnText}</button>
      <p>Score: {score}/151</p>
    </div>
  );
}

export default App;
