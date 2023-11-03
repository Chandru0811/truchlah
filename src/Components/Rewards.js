import React, { useState } from "react";

function Hide() {
  const [showFirstSection, setShowFirstSection] = useState(true);
  const [showSecondSection, setShowSecondSection] = useState(false);

  const hideFirstSection = () => {
    setShowFirstSection(false);
    setShowSecondSection(true);
  };

  const hideSecondSection = () => {
    setShowFirstSection(true);
    setShowSecondSection(false);
  };

  return (
    <div className="container" style={{backgroundColor: 'red'}}>
      <div>
        <button onClick={hideSecondSection}>First</button>
        <button onClick={hideFirstSection}>Second</button>
      </div>
      {showFirstSection && (
        <div id="first section" style={{minHeight: '70vh'}}>
          <h1>hii</h1>
          <h1>hii</h1>
          <h1>hii</h1>
          <h1>hii</h1>
        </div>
      )}
      {showSecondSection && (
        <div id="second section" style={{minHeight: '70vh'}}>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
          <h1>chandru</h1>
        </div>
      )}
    </div>
  );
}

export default Hide;