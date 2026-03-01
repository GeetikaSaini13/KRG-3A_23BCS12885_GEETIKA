import React from "react";

const Counter = React.memo(({ count, goal }) => {
  console.log("Counter Rendered");

  return (
    <div>
      <h3>{count} / {goal} glasses completed</h3>
    </div>
  );
});

export default Counter;