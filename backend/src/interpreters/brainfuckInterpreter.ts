export default function interpretBrainfuck(code: string) {
  const memory: number[] = new Array(30000).fill(0);
  let pointer = 0;
  const output: number[] = [];

  const codeArray = code.split("");
  let codePointer = 0;

  while (codePointer < codeArray.length) {
    const command = codeArray[codePointer];

    switch (command) {
      case ">":
        pointer = (pointer + 1) % memory.length;
        break;
      case "<":
        pointer = (pointer - 1 + memory.length) % memory.length;
        break;
      case "+":
        memory[pointer] = (memory[pointer] + 1) % 256;
        break;
      case "-":
        memory[pointer] = (memory[pointer] - 1 + 256) % 256;
        break;
      case ".":
        output.push(memory[pointer]);
        break;
      case ",":
        // Ignoring input for simplicity
        break;
      case "[":
        if (memory[pointer] === 0) {
          let openBrackets = 1;
          while (openBrackets > 0) {
            codePointer++;
            if (codeArray[codePointer] === "[") openBrackets++;
            if (codeArray[codePointer] === "]") openBrackets--;
          }
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          let closeBrackets = 1;
          while (closeBrackets > 0) {
            codePointer--;
            if (codeArray[codePointer] === "[") closeBrackets--;
            if (codeArray[codePointer] === "]") closeBrackets++;
          }
        }
        break;
    }

    codePointer++;
  }

  return output;
}
