(function () {
  const RECOMMENDED_MIN_DELAY = 1000;
  const RECOMMENDED_MAX_DELAY = 5000;
  let stopExecution = false;

  function promptPositiveInteger(message) {
    const value = parseInt(prompt(message), 10);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a positive number.");
      throw new Error("Invalid input");
    }
    return value;
  }

  function validateDelayRange(minDelay, maxDelay) {
    if (isNaN(minDelay) || isNaN(maxDelay) || minDelay <= 0 || maxDelay <= 0 || minDelay > maxDelay) {
      alert("Please enter valid positive numbers for the delay range (minDelay < maxDelay).");
      throw new Error("Invalid delay range input");
    }
    if (minDelay < RECOMMENDED_MIN_DELAY || maxDelay > RECOMMENDED_MAX_DELAY) {
      alert(`Warning: Delays outside the ${RECOMMENDED_MIN_DELAY}ms to ${RECOMMENDED_MAX_DELAY}ms range may cause unusual behavior.`);
    }
  }

  function createCounterElement() {
    const counterDiv = document.createElement("div");
    Object.assign(counterDiv.style, {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      padding: "10px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      fontFamily: "Arial, sans-serif",
      zIndex: "1000",
    });
    document.body.appendChild(counterDiv);
    return counterDiv;
  }

  function createControlButtons() {
    const controlDiv = document.createElement("div");
    Object.assign(controlDiv.style, {
      position: "fixed",
      bottom: "50px",
      right: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: "1000",
    });

    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop Script";
    Object.assign(stopButton.style, {
      padding: "10px 20px",
      backgroundColor: "#ff4d4d",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      cursor: "pointer",
    });
    stopButton.addEventListener("click", () => {
      stopExecution = true;
      alert("Script execution stopped.");
    });

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Script";
    Object.assign(restartButton.style, {
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      cursor: "pointer",
    });
    restartButton.addEventListener("click", () => {
      stopExecution = false;
      alert("Script execution restarted.");
      sendLike();
    });

    controlDiv.appendChild(stopButton);
    controlDiv.appendChild(restartButton);
    document.body.appendChild(controlDiv);
  }

  function updateCounter(counterElement, currentCount, totalLikes) {
    counterElement.textContent = `Likes Sent: ${currentCount}/${totalLikes}`;
  }

  function getRandomDelay(minDelay, maxDelay) {
    return minDelay + Math.floor(Math.random() * (maxDelay - minDelay));
  }

  let numberOfLikes = promptPositiveInteger("How many likes would you like to send?");
  alert(`For optimal performance, we recommend setting a delay between ${RECOMMENDED_MIN_DELAY}ms and ${RECOMMENDED_MAX_DELAY}ms.`);
  const minDelay = promptPositiveInteger("Enter the minimum delay between likes (in milliseconds):");
  const maxDelay = promptPositiveInteger("Enter the maximum delay between likes (in milliseconds):");

  validateDelayRange(minDelay, maxDelay);

  const likeButtonSelector = ".encounters-action.tooltip-activator.encounters-action--like";
  let currentCount = 0;
  let hasRetried = false;

  const counterElement = createCounterElement();
  createControlButtons();
  updateCounter(counterElement, currentCount, numberOfLikes);

  function askToContinue() {
    const continueScript = confirm("You have completed the specified likes. Do you want to continue?");
    if (continueScript) {
      numberOfLikes = promptPositiveInteger("Enter the number of additional likes you want to send:");
      currentCount = 0;
      sendLike();
    } else {
      alert("Script has been stopped.");
      stopExecution = true;
    }
  }

  function sendLike() {
    if (stopExecution) {
      console.log("Script execution has been stopped.");
      return;
    }

    if (currentCount >= numberOfLikes) {
      askToContinue();
      return;
    }

    const likeButton = document.querySelector(likeButtonSelector);

    if (likeButton && likeButton.offsetParent !== null) {
      likeButton.click();
      currentCount++;
      hasRetried = false;
      updateCounter(counterElement, currentCount, numberOfLikes);
      const randomDelay = getRandomDelay(minDelay, maxDelay);
      setTimeout(sendLike, randomDelay);
    } else if (!hasRetried) {
      hasRetried = true;
      setTimeout(sendLike, 3000);
    } else {
      location.reload();
    }
  }

  sendLike();
})();
