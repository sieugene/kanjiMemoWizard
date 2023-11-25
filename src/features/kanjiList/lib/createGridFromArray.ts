export function createGridFromArray<T>(arr: T[], columnCount: number): T[][] {
  const rowCount: number = Math.ceil(arr.length / columnCount);
  const grid: T[][] = [];

  for (let i = 0; i < rowCount; i++) {
    grid[i] = arr.slice(i * columnCount, (i + 1) * columnCount);
  }

  return grid;
}
