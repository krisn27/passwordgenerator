
import  {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const[length,setLength]=useState(8);
  const[numberallowed,setNumberallowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("");

  const passwordRef =useRef(null)
  const PasswordGenerator =useCallback(() => {
       let pass=" ";
       let str=" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
       if(numberallowed)
        str +="0123456789"
       if(charAllowed)
        str +="!@#$%^&*-_+=[]{}~`"

       for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random() *str.length+1)
        pass+=str.charAt(char)
       }
       setPassword(pass)
      


  },[length,numberallowed,charAllowed,setPassword])

  const copyPasswordToClibboard=useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(() => {
    PasswordGenerator();
  }, [length, numberallowed, charAllowed, PasswordGenerator]);
  


  
   return (
    <div className="w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
       <h1 className='flex shadow rounded-lg overflow-hidden mb-4'>PasswordGenerator</h1>
          <div className="className=flex-shadow rounded-lg overflow-hidden mb-4">
            <input type="text"value={password}className='outline-none w-full py-1 px-3 '
            placeholder="PASSWORD"readOnly ref={passwordRef}/>
            <button  onClick={copyPasswordToClibboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>
          <div className="flex text-5n gap-x-2">
            <div className="flex-items-center gap-x-1">
              <input type="range"min={6}max={100}value={length}className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)} }/>
              <label htmlFor="">lenght:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberallowed}id='numberinput'onChange={()=>{
              setNumberallowed((prev)=>!prev);

            }} />
            <label htmlFor="numberinput">Number</label>

            </div>
            <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed}id='charInput'onChange={()=>{
              setCharAllowed((prev)=>!prev);

            }} />
            <label htmlFor="charInput">characters</label>

            </div>
            

          </div>
         
     
 
    </div>
  );
}

export default App;
