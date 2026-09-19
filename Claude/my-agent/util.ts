function calculateAverage(numbers: number[]): number {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total / numbers.length;
}

interface User {
  name: string;
}

function getUserName(user: User): string {
  return user.name.toUpperCase();
}