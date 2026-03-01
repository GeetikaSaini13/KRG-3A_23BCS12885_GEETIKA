import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Counter from "../components/Counter";

function WaterTracker() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    if (savedCount) {
      setCount(Number(savedCount));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("waterCount", count);
  }, [count]);

  
  const fetchTip = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setTip(data.slip.advice);
    } catch (err) {
      setError("Failed to fetch tip");
    } finally {
      setLoading(false);
    }
  };

  
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = () => {
    setCount(0);
  };

  
  return (
  <div>
    <Navbar />

    <div className="page-center">
      <div className="card">
        <h2>Water Tracker</h2>

        <Counter count={count} goal={goal} />

        <div style={{ textAlign: "center" }}>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          <button onClick={reset}>Reset</button>
        </div>

        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />

        {count >= goal && <p>Goal Reached 🎉</p>}

        

        <button onClick={fetchTip}>Get Health Tip</button>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {tip && <p>Today's Health Tip: {tip}</p>}
      </div>
    </div>
  </div>
);

}

export default WaterTracker;