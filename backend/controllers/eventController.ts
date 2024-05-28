export const getNumbers = (num: number) => {
  let numbers: number[] = [];
  for (let i = 1; i <= 100; i++) {
    numbers.push(i);
  }

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  let shuffledNumbers = shuffle(numbers);

  return shuffledNumbers.slice(0, num);
};
