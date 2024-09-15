export interface IShapeData {
  type: "box" | "sphere" | "cone";
  position: { x: number; y: number; z: number };
  size: number;
  color: string;
  rotation?: { x: number; y: number; z: number };
}
