import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CodeInput from "../components/CodeInput";
import Explanation from "../components/Explanation";

const DebugPage = () => {
  const [explanation, setExplanation] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="px-6 py-3">
      <h4 className="text-3xl font-bold mb-4 text-gray-900">
        AI Code Debugger
      </h4>
      <CodeInput setExplanation={setExplanation} />
      <Explanation explanation={explanation} />
    </div>
  );
};

export default DebugPage;