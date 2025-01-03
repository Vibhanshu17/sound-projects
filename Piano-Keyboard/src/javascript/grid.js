export class Grid {
  R; C;
  animationRunning = false;
  speedMultiplier = 1.0;
  playSpeed = 200;

  constructor(r, c) {
    this.R = r;
    this.C = c;
  }

  createDiv() {
    const div = document.createElement('div');
    div.style.backgroundColor = 'white';
    div.style.height = '1.5vw';
    div.style.width = '1.5vw';
    div.style.minWidth = '20px';
    div.style.minHeight = '20px';
    div.style.border = '1px solid black';
    div.setAttribute('data-alive', "false");
    div.addEventListener('click', () => this.invertCellColor(div));
    return div;
  }

  createHorizontalDivs(cols) {
    const container = document.createElement('div');
    container.style.display = 'flex'; 
    // container.style.flexWrap = 'wrap';
    for (let i = 1; i <= cols; ++i) { 
      container.appendChild(this.createDiv());
    }
    return container;
  }

  createGrid(R, C) {
    const grid = document.createElement('div');
    grid.style.width = "fit-content"
    for (let r = 1; r <= this.R; ++r) { 
      grid.appendChild(this.createHorizontalDivs(this.C)); 
    }
    return grid;
  }

  invertCellColor(div) { 
    if (div.getAttribute('data-alive') === "true") {
      div.style.backgroundColor = 'white';
      div.style.border = "1px solid black";
      div.setAttribute('data-alive', "false");
    } else {
      div.style.backgroundColor = 'black';
      div.style.border = "1px solid white";
      div.setAttribute('data-alive', "true");
    }
  }

  getNeighbors(grid, row, col) {
    const neighbors = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1],[1, 1],[1, -1],[-1, 1],[-1, -1]];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < this.R && newCol >= 0 && newCol < this.C) {
        neighbors.push(grid[newRow][newCol]);
      }
    }
    return neighbors;
  }

  applyGameOfLifeRules(grid) {
    const gridCopy = [];
    for (let r = 0; r < this.R; r++) {
      gridCopy[r] = [];
      for (let c = 0; c < this.C; c++) {
        const cell = grid[r][c];
        const neighbors = this.getNeighbors(grid, r, c);
        const aliveNeighbors = neighbors.filter(neighbor => neighbor === 'true').length;

        if (cell === 'true') { gridCopy[r][c] = (aliveNeighbors < 2 || aliveNeighbors > 3) ? 'false' : gridCopy[r][c] = 'true'; }
        else { gridCopy[r][c] = (aliveNeighbors === 3) }
      }
    }
    return gridCopy;
  }

  runAnimation = () => {
    if (!this.animationRunning) return;
    const gridState = [];
    const divs = document.querySelectorAll('div[data-alive]');
    let index = 0;

    for (let r = 0; r < this.R; r++) {
      gridState[r] = [];
      for (let c = 0; c < this.C; c++) {
        gridState[r][c] = divs[index].getAttribute('data-alive');
        index++;
      }
    }

    const gridCopy = this.applyGameOfLifeRules(gridState);

    let newIndex = 0;
    divs.forEach(div => {
      const newState = gridCopy[Math.floor(newIndex / this.C)][newIndex % this.C];
      if (newState === 'true') {
        div.style.backgroundColor = 'black';
        div.style.border = "1px solid white";
      } else {
        div.style.backgroundColor = 'white';
        div.style.border = "1px solid black";
      }
      div.setAttribute('data-alive', newState);
      newIndex++;
    });

    if (this.animationRunning) {
      setTimeout(this.runAnimation, this.playSpeed/this.speedMultiplier);
    }
  };

  clearGrid = () => {
    const cells = document.querySelectorAll('div[data-alive]')
    cells.forEach(div => {
      div.setAttribute('data-alive', false);
      div.style.backgroundColor = 'white';
      div.style.border = '1px solid black';
    })
  }

  startAnimation = (startButton, stopButton) => {
    startButton.disabled = true;
    stopButton.disabled = false;
    this.animationRunning = true;
    this.runAnimation();
  };
  stopAnimation = (startButton, stopButton) => {
    startButton.disabled = false;
    stopButton.disabled = true;
    this.animationRunning = false;
  };
}