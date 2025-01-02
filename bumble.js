(function () {
  const RECOMMENDED_MIN_DELAY = 1000;
  const RECOMMENDED_MAX_DELAY = 5000;

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

  function updateCounter(counterElement, currentCount, totalLikes) {
    counterElement.textContent = `Likes Sent: ${currentCount}/${totalLikes}`;
  }

  function getRandomDelay(minDelay, maxDelay) {
    return minDelay + Math.floor(Math.random() * (maxDelay - minDelay));
  }

  const numberOfLikes = promptPositiveInteger("How many likes would you like to send?");
  alert(`For optimal performance, it is recommended to set a delay between ${RECOMMENDED_MIN_DELAY}ms and ${RECOMMENDED_MAX_DELAY}ms.`);
  const minDelay = promptPositiveInteger("Enter the minimum delay between likes (in milliseconds):");
  const maxDelay = promptPositiveInteger("Enter the maximum delay between likes (in milliseconds):");

  validateDelayRange(minDelay, maxDelay);

  const likeButtonSelector = ".encounters-action.tooltip-activator.encounters-action--like";
  let currentCount = 0;
  let hasRetried = false;

  const counterElement = createCounterElement();
  updateCounter(counterElement, currentCount, numberOfLikes);

  function sendLike() {
    if (currentCount >= numberOfLikes) {
      console.log(`A total of ${currentCount} likes have been sent.`);
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
