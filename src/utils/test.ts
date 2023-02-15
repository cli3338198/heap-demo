import Interpreter from "./interpreter";

export function getInterpreter(code: string): any {
  return new Interpreter(code);
}
