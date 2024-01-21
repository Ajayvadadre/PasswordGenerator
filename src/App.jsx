import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const[numbersallowed,setNumbersallowed]=useState(false)
  const[characterallowed,setCharacterallowed]=useState(false)
  
  


let setPasswordfunction= useCallback(()=>{
    let pass= ''
    let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let number= '0123456789'
    let characters= '!@#$%^&*'

    if(numbersallowed){str+=number}
    if(characterallowed){str+=characters}

    for(let i=1; i<length; i++){
    let random = Math.floor(Math.random()*str.length+1)
    pass+= str.charAt(random)
    }
    setPassword(pass)

  },[characterallowed,numbersallowed,length])

  useEffect(()=>{
    setPasswordfunction()
  },[numbersallowed,characterallowed,length])


  let selectfunction= ()=>{
    window.navigator.clipboard.writeText(Password);
    let btn= document.getElementById('btn')
    btn.style.backgroundColor = "green"
    btn.innerText = 'Copied'

    setTimeout(() => {
      btn.style.backgroundColor = "#1a1a1a";
    btn.innerText = 'Copy'

    }, 3000);

  }

  return (
    <>
      <div className="main">
        <div className="top-container">
          <input type="text" 
          className=" h-10 rounded-sm w-80"
           readOnly 
           value={Password}
           />

          <button 
          id="btn"
          onClick={selectfunction}
          className="ms-4">Copy</button>
        </div>
        <div className="bottom-containerr">
          <input type="range" 
          name="range" 
          id="range"
          value={length}
          className=" mt-5"
          style={{cursor:"pointer"}}
          onChange={(e)=> setLength(e.target.value)}
          min={6}
          max={100}  />
  
        <label htmlFor="length" className="text-white">{length}</label>

          <div className="number">
            <input type="checkbox" name="" id="numbers" style={{cursor:"pointer"}} onClick={()=>{setNumbersallowed((prev)=>!prev)}}/>
            <label htmlFor="numbers" className="ms-2"  style={{cursor:"pointer"}}>Numbers</label>
          </div>
          <div className="character">
            <input type="checkbox" name="" id="character" style={{cursor:"pointer"}} onClick={()=>{setCharacterallowed((prev)=>!prev)}} />
            <label htmlFor="character" className="ms-2"  style={{cursor:"pointer"}}>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
