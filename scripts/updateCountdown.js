function updateCountdown() {
      const now = new Date();
      
      const annivDay = 9; // 9
      const annivMonth = 3; // 3
      const annivYear = 2024 // 2024
      
      let nextTarget = new Date(now.getFullYear(), now.getMonth(), annivDay);
  
      // if today is past the target day move to the next month
      if (now.getDate() > annivDay) {
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
      const startDate = new Date(annivYear, annivMonth, annivDay);
  
      let monthsDifference = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      if (now.getDate() < annivDay) {
          monthsDifference--;
      }
  
      // display message
      if (now.getDate() === annivDay) {
          timeElement.innerText = "It's our Anniversary!";
          messageElement.innerText = `Happy Anniversary Bebi! We've been together for ${monthsDifference + 1} months! I love you!`;
      } else {
          timeElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          messageElement.innerText = "";
      }
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();
  