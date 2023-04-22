function parseArrayIntoRowArray(arr, itemsInRow) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsInRow) {
    rows.push(arr.slice(i, i + itemsInRow));
  }

  return rows;
}

function createCollisionsFromArray(array) {
  const arrayOfCollisions = [];
  array.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292) {
        arrayOfCollisions.push(new CollisionBlock({
          position: {
            x: x * 64,
            y: y * 64
          }
        }));
      }
    });
  });

  return arrayOfCollisions;
}