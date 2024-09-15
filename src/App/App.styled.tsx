import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  padding-top: 20px;
  gap: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 17px;
  border-radius: 5px;
  color: white;
  background-color: black;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Textarea = styled.textarea`
  width: 600px;
  max-width: 100%;
  padding: 5px;
  margin-bottom: 15px;
  font-size: 17px;
  resize: none;
`;

export const Hint = styled.div`
  padding: 10px;
  width: 600px;
  font-size: 15px;
  border: 1px dotted black;
  background-color: #e0e0e0;
  border-radius: 10px;
`;
