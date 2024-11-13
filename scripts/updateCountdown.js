function updateCountdown() {
      const now = new Date();
      const targetDay = 13; // 9
      let nextTarget = new Date(now.getFullYear(), now.getMonth(), targetDay);
  
      // if today is past the target day move to the next month
      if (now.getDate() > targetDay) {
          nextTarget.setMonth(nextTarget.getMonth() + 1);
      }
  
      const diff = nextTarget - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
      const timeElement = document.getElementById('time');
      const messageElement = document.getElementById('message');
  
      // calculate the number of months since a specific start date
      const startDate = new Date(2024, 3, targetDay);
  
      let monthsDifference = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      if (now.getDate() < targetDay) {
          monthsDifference--;
      }
  
      // display message
      if (now.getDate() === targetDay) {
          timeElement.innerText = "It's our Anniversary!";
          messageElement.innerText = `Happy Anniversary Bebi! We've been together for ${monthsDifference + 1} months! I love you!`;
      } else {
          timeElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          messageElement.innerText = "";
      }
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();
  