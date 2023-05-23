import React,{
  useEffect
} from 'react';
import eruda from "eruda";
function App() {
  useEffect(()=>{
    eruda.init()
  },[])
  return (
    <div className="App">
        <h1>hhhhh</h1>
    </div>
  );
}

export default App;
