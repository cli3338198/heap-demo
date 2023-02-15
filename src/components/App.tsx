// import Interpreter from "js-interpreter";
// import Interpreter from "../utils/interpreter";
import { getInterpreter } from "../utils/test";
import { MouseEvent, useEffect, useState } from "react";

function App() {
  const [myInterpreter, setMyInterpreter] = useState<any>(null);

  const code = `
    function loop() {
      var num = 0;

      while (num < 1) {
        num += 1;
        console.log(num);
      }

    }

    loop();
  `;

  useEffect(() => {
    setMyInterpreter(getInterpreter(code));
  }, [code]);

  function handleClick(evt: MouseEvent<HTMLButtonElement>) {
    const stack = myInterpreter.stateStack;

    const last = stack.at(-1);
    const { node, done_, value } = last;

    console.log(last);

    if (value?.data) console.log(value.data);

    if (done_) {
      return alert("DONE");
    }

    createSelection(node.start, node.end);

    try {
      myInterpreter.step();
    } catch {
      //
    }
  }

  function createSelection(start: number, end: number) {
    const field = document.getElementById("code") as HTMLTextAreaElement;
    field.selectionStart = start;
    field.selectionEnd = end;
    field.focus();
  }

  return (
    <>
      <textarea
        readOnly
        id="code"
        value={code}
        style={{ width: "400px", height: "400px" }}
      ></textarea>
      <button onClick={handleClick}>Step</button>
    </>
  );
}

export default App;
