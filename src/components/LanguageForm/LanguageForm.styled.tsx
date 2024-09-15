import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Menu = styled.div`
  width: 600px;
  max-width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const Textarea = styled.textarea`
  width: 600px;
  max-width: 100%;
  margin-bottom: 15px;
  font-size: 17px;
  resize: none;
`;
