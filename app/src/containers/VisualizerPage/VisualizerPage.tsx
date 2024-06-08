import { useSearchParams } from "react-router-dom";
import Visualizer from "../../components/Visualizer/Visualizer";

const VisualizerPage = () => {
  const [searchParams] = useSearchParams();
  const coordinates = searchParams.get("coordinates");
  let numbersArray: number[] = [];
  if (coordinates) {
    numbersArray = coordinates.split(",").map(Number);
  }
  console.log(numbersArray);
  return <Visualizer coordinates={numbersArray} color="#fff" />;
};

export default VisualizerPage;
