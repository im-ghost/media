import React,{
  useEffect
} from 'react';
import eruda from "eruda";
import { Counter } from './features/counter/Counter';
function App() {
  useEffect(()=>{
    eruda.init()
  },[])
  return (
    <div className="App">
        <Counter />
    </div>
  );
}

export default App;
