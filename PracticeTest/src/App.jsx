import { useState } from "react";
import Completed from "./Completed";
import Pending from  './Pending';

function App() {
  const [showCompletedComponent, setShowCompletedComponent] = useState(false);

  const showCompleted = () => {
    setShowCompletedComponent(true);
  };

  const showPending = () => {
    setShowCompletedComponent(false);
  };

  return (
    <>
      <div className="w-8/12 h-full bg-blue-950 rounded-2xl flex flex-col items-center justify-start text-center my-40 mx-auto p-4">
        <div className="rounded-lg text-3xl font-bold flex flex-row justify-center items-center bg-red-300 gap-48 my-4">
          <button className={`px-10 py-2 ${!showCompletedComponent ? 'text-blue-500' : 'text-black'}`} onClick={showPending}>Pending</button>
          <button className={`px-10 py-2 ${showCompletedComponent ? 'text-blue-500' : 'text-black'} hover:text-blue-500`} onClick={showCompleted}>Completed</button>
        </div>
        {showCompletedComponent ? <Completed /> : <Pending />}
      </div>
    </>
  )
}

export default App;
