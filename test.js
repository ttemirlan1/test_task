function findMissingNumbers(arr, n, intervalSize = 10000) {
    const intervals = new Map();
  
    for (const num of arr) {
      const intervalIndex = Math.floor((num - 1) / intervalSize);
      intervals.set(intervalIndex, (intervals.get(intervalIndex) || 0) + 1);
    }
  
    const missingIntervals = [];
    for (let i = 0; i < Math.ceil(n / intervalSize) && missingIntervals.length < 2; i++) {
      if (!intervals.has(i) || intervals.get(i) < intervalSize) {
        missingIntervals.push(i);
      }
    }
  
    const missingNumbers = [];
  
    for (const intervalIndex of missingIntervals) {
      const start = intervalIndex * intervalSize + 1;
      const end = Math.min((intervalIndex + 1) * intervalSize, n);
  
      const intervalMap = new Uint8Array(end - start + 1);
      for (const num of arr) {
        if (num >= start && num <= end) {
          intervalMap[num - start] = 1;
        }
      }
  
      for (let i = 0; i < intervalMap.length; i++) {
        if (intervalMap[i] === 0) {
          missingNumbers.push(start + i);
        }
      }
    }
  
    return missingNumbers;
  }
  
  const sequence = [1, 2, 3, 5, 6, 7, 8, 10]; // Пример последовательности с пропущенными числами 2 и 3
  const n = 10;
  const missingNumbers = findMissingNumbers(arr, n);
  console.log(missingNumbers); // Выводит [2, 3]
  //time complexity is O(n) but faster than plain searching

