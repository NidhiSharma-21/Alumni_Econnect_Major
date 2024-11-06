import React from 'react'
import { useState } from 'react',
const [counter,setCounter]=useState('');
function addNumbers(){
    counter=counter+1;
    setCounter(counter);
}
function removeNumbers(){
    counter = counter-1;
    setCounter(counter);
}
const Counter = () => {
  return (
    <>
 <div>Counter</div>
 <button onClick={addNumbers}> Add</button>
    </>
   
  )
}

export default Counter