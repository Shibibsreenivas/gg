let highestZ = 1;

class Paper {
  holdingPaper = false;
  TouchX = 0;
  TouchY = 0;
  X = 0;
  Y = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('move', (e) => {
      if(!this.rotating) {
        this.X = e.clientX;
        this.Y = e.clientY;
        
        this.velX = this.X - this.prevMouseX;
        this.velY = this.Y - this.prevMouseY;
      }
        
      const dirX = e.clientX - this.TouchX;
      const dirY = e.clientY - this.TouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevX = this.X;
        this.prevY = this.Y;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('down', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.TouchX = this.X;
        this.TouchY = this.Y;
        this.prevX = this.X;
        this.prevY = this.Y;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('up', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});