import { useState } from "react";
import CodeInput from "../components/CodeInput";
import Explanation from "../components/Explanation";

const Home = () => {
  const [explanation, setExplanation] = useState("");

  return (
    <div>
      <h2>AI Code Debugger</h2>
      <CodeInput setExplanation={setExplanation} />
      <Explanation explanation={explanation} />
    </div>
  );
};

export default Home;
