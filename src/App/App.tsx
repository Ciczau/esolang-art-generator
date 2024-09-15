import Visualizer from "../components/Visualizer/Visualizer";
import { IShapeData } from "../types/IShapeData";
import React, { useRef, useState } from "react";
import * as S from "./App.styled";
import { brainfuckToShapes } from "../utils/brainfuckInterpreter";

const App = () => {
  const [shapes, setShapes] = useState<IShapeData[]>([]);
  const [code, setCode] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInterprete = () => {
    setShapes(brainfuckToShapes(code));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInterprete();
    }
  };
  return (
    <S.Wrapper>
      <S.Hint>
        {"[ - sphere"}
        <br />
        {" ] - box "}
        <br />
        {". - cone"}
        <br />
        {"< and > -  move on X axis"}
        <br />
        {"- and + - move on Y axis"}
        <br />
        Example: {"]>]>]>]>]-]<]<]<]<]-]>>>>]++>,,,.<<<<<<["}
      </S.Hint>
      <S.Textarea
        ref={textareaRef}
        value={code}
        placeholder="Your brainfuck code"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <S.Button onClick={handleInterprete}>Interpret</S.Button>
      <Visualizer shapes={shapes} />
    </S.Wrapper>
  );
};

export default App;
