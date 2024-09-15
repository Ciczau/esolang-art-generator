import { IShapeData } from "../types/IShapeData";

export function brainfuckToShapes(code: string): IShapeData[] {
  let shapes: IShapeData[] = [];
  let position = { x: 0, y: 0, z: 0 };
  let rotation = { x: 0, y: 0, z: 0 };
  let size = 1;
  let color = "0xffffff";
  let defaultStep = 1;

  const shapeMap: { [key: string]: "box" | "sphere" | "cone" } = {
    "[": "sphere",
    "]": "box",
    ".": "cone",
  };

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (shapeMap[char]) {
      const shapeType = shapeMap[char];

      shapes.push({
        type: shapeType,
        position: { ...position },
        size: shapeType === "cone" ? 0.6 * size : size,
        color: color,
        rotation: { ...rotation },
      });
    }

    switch (char) {
      case ">":
        position.x += defaultStep;
        break;
      case "<":
        position.x -= defaultStep;
        break;
      case "+":
        position.y += defaultStep;
        break;
      case "-":
        position.y -= defaultStep;
        break;
      case ",":
        rotation.z += Math.PI / 2;
        break;
    }
  }

  return shapes;
}
