import React, { useState } from 'react';
import './SlidingPuzzle.css';

const SlidingPuzzle = () => {
  const [gridSize, setGridSize] = useState(3); // Default grid size 3x3
  const [tiles, setTiles] = useState(generateTiles(3)); // Generate tiles based on grid size
  const [emptyTileIndex, setEmptyTileIndex] = useState(gridSize * gridSize - 1); // Last tile is empty

  // Function to generate the initial tile arrangement based on grid size
  function generateTiles(size) {
    const totalTiles = size * size;
    const tileArray = [...Array(totalTiles - 1).keys()].map(n => n + 1); // Tiles 1 to size*size-1
    tileArray.push(null); // Add empty tile at the end
    return tileArray;
  }

  // Shuffle the tiles (randomize them)
  const shuffleTiles = () => {
    const shuffled = [...tiles];
    shuffled.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setEmptyTileIndex(shuffled.indexOf(null));
  };

  // Check if a tile can move (only tiles adjacent to the empty slot)
  const canMove = (index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyTileIndex / gridSize);
    const emptyCol = emptyTileIndex % gridSize;

    return (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
  };

  // Handle tile click and swap the clicked tile with the empty slot
  const handleTileClick = (index) => {
    if (canMove(index)) {
      const newTiles = [...tiles];
      newTiles[emptyTileIndex] = tiles[index]; // Move clicked tile to empty slot
      newTiles[index] = null; // Set clicked position to empty
      setTiles(newTiles);
      setEmptyTileIndex(index);
    }
  };

  // Handle grid size change from the menu
  const handleGridSizeChange = (size) => {
    setGridSize(size);
    const newTiles = generateTiles(size);
    setTiles(newTiles);
    setEmptyTileIndex(size * size - 1); // Reset empty tile position
  };

  // Check if the puzzle is solved
  const isSolved = () => {
    const solution = [...Array(gridSize * gridSize - 1).keys()].map(n => n + 1);
    solution.push(null); // The solved puzzle has null at the end
    return JSON.stringify(tiles) === JSON.stringify(solution);
  };

  return (
    <div className="puzzle-container">
      <h2>Sliding Puzzle Game</h2>
      
      {/* Menu Button for grid selection */}
      <div className="menu-container">
        <button className="menu-button">Menu</button>
        <div className="dropdown">
          <button onClick={() => handleGridSizeChange(3)}>3x3</button>
          <button onClick={() => handleGridSizeChange(4)}>4x4</button>
          <button onClick={() => handleGridSizeChange(5)}>5x5</button>
        </div>
      </div>

      <button  className=" shufflebutton" onClick={shuffleTiles}>Shuffle</button>
      {isSolved() && <h3>Congratulations! You solved the puzzle!</h3>}

      <div
        className="puzzle-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 100px)`,
          gridTemplateRows: `repeat(${gridSize}, 100px)`,
        }}
      >
        {tiles.map((tile, index) => (
          <button
            key={index}
            className={`tile ${tile === null ? 'empty' : ''}`}
            onClick={() => handleTileClick(index)}
            disabled={tile === null} // Disable empty tile
          >
            {tile}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlidingPuzzle;
