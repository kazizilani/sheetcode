import { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction, RefObject } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    inputRef.current?.focus();
  },[])
  return (
    <div className="mt-5 bg-dark h-screen flex flex-col items-center">
      <InputBox
        inputRef={inputRef}
        tasks={tasks}
        setTasks={setTasks} />

      <section className="mt-5">
        {
          tasks.length > 0 ? (
            <ul>
              {tasks.map((task, index) => (
                <li 
                className="list-disc"
                key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <h2 className="text-2xl">No Tasks</h2>
          )
        }
      </section>
    </div>
  )
}

function InputBox(
  { inputRef, tasks, setTasks }:
    {
      inputRef: React.Ref<HTMLInputElement>;
      tasks: string[];
      setTasks: Dispatch<SetStateAction<string[]>>
    }) {

  const [input, setInput] = useState<string>('');
  return (
    <>
      <div className="relative w-8/10">
        <input type="text"
          className="border-2 border-yellow-300 
          rounded-xl w-10/10 h-10 relative
          px-5
          "
          ref={inputRef}
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              if (input) {
                setTasks([...tasks, input]);
                setInput('');
              }
              else {
                console.log('no input');
              }
            }
          }}
        />
        <button type="submit"
          className="absolute top-0 right-0 bg-yellow-300
        h-10
        rounded-xl
        hover:cursor-pointer
        hover:bg-yellow-400
        px-3 text-black
        "
          onClick={() => {
            if (input) {
              setTasks([...tasks, input]);
              setInput('');
            }
            else {
              console.log('no input');
            }
          }}
        >Add Todo</button>
      </div>

    </>
  )
}
