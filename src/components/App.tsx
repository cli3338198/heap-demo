import { useState, ChangeEvent, FormEvent } from "react";
const esprima = require("esprima");

function App() {
  const [inputStr, setInputStr] = useState<string>("");

  function handleChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setInputStr(evt.target.value);
  }

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const tokens = esprima.tokenize(inputStr) as {
      type: string;
      value: string;
    }[];

    // WITHOUT esprima
    const func = new Function(`return ${inputStr}`);
    console.log({ func });
    console.log(func(1, 2), "numbers", 1, 2);
    console.log(func("1", "2"), "strings", "1", "2");
    console.log(func({ one: 1 }, { one: 2 }), "objs", { one: 1 }, { one: 2 });
    //

    // console.log(tokens);

    // // get first two indentifiers
    // // get punctuator
    // const indentifiers = tokens
    //   .filter((t) => t.type === "Identifier")
    //   .map((t) => t.value);

    // const expected = new Set(["<", ">", "<=", ">="]);
    // const punctuators = tokens
    //   .filter((t) => t.type === "Punctuator" && expected.has(t.value))
    //   .map((t) => t.value);

    // console.log({ indentifiers, punctuators });

    // /**
    //  * function body is everything after return or =>
    //  *
    //  */

    // const idx = tokens.findIndex(
    //   (t) =>
    //     (t.type === "Keyword" && t.value === "return") ||
    //     (t.type === "Punctuator" && t.value === "=>")
    // );

    // console.log(idx);

    // const body = tokens.slice(idx + 1).reduce((acc, t, i, tokens) => {
    //   return (
    //     acc +
    //     (expected.has(tokens[i - 1]?.value) ? " " : "") +
    //     t.value +
    //     (expected.has(tokens[i + 1]?.value) ? " " : "")
    //   );
    // }, "return ");

    // console.log({ body });

    // const fn = new Function(
    //   indentifiers[0],
    //   indentifiers[1],
    //   `return ${indentifiers[0]} ${punctuators[0]} ${indentifiers[1]}`
    // );

    // console.log(fn);

    // console.log(fn({ one: 1 }, { one: 2 }), "objects");
    // console.log(fn(1, 2), "numbers");
    // console.log(fn("1", "2"), "strings");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} value={inputStr}></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
