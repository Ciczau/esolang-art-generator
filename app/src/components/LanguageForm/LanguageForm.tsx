import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import * as S from "./LanguageForm.styled";
import { interpreteLanguageRequest } from "../../api/interpreterRequests";
import { createSearchParams, redirect, useNavigate } from "react-router-dom";

const LanguageForm = () => {
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<"brainfuck" | "piet" | "befunge">(
    "brainfuck"
  );

  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInterprete = async () => {
    setError("");
    const response = await interpreteLanguageRequest(language, code);
    console.log(response);
    if (response.status === 200) {
      const coordinates = response.data.coordinates;

      navigate({
        pathname: "/visualizer",
        search: `?coordinates=${coordinates}`,
      });
    } else {
      setError(response.data);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);

  return (
    <S.Wrapper>
      <div>{error}</div>
      <S.Menu>
        <S.Button onClick={() => setLanguage("brainfuck")}>Brainfuck</S.Button>
        <S.Button>Piet</S.Button>
        <S.Button>Befunge</S.Button>
      </S.Menu>
      <S.Textarea
        ref={textareaRef}
        value={code}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setCode(e.target.value)
        }
      />
      <S.Button onClick={handleInterprete}>Interpret</S.Button>
    </S.Wrapper>
  );
};

export default LanguageForm;
