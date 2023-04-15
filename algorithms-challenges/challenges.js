function challenge1(arr) {
  const arrStrings = arr.filter((item) => typeof item === 'string');
  const arrNumbers = arr.filter((item) => typeof item === 'number');

  return {
    getStrings: arrStrings,
    getNumbers: arrNumbers,
    getMaxNumber: Math.max(...arrNumbers),
  };
}

const c1 = challenge1(['a', 10, 'b', 'hola', 122, 15]);
console.table(c1);

function challenge2() {
  const hashmap = new Map();

  hashmap.set('sum', (n) => n.reduce((acc, curr) => acc + curr, 0));
  hashmap.set('sub', (n) => n.reduce((acc, curr) => acc - curr));
  hashmap.set('mult', (n) => n.reduce((acc, curr) => acc * curr, 1));
  hashmap.set('div', (a, b) => (b === 0 ? null : a / b));

  return hashmap;
}

const c2 = challenge2();
const c2Arr = [1, 2, 3];
console.table([
  ['sum', c2.get('sum')(c2Arr)],
  ['sub', c2.get('sub')(c2Arr)],
  ['mult', c2.get('mult')(c2Arr)],
  ['div', c2.get('div')(10, 5)],
]);

function challenge3() {
  const subIdGen = () => {
    let subId = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 4; i += 1) {
        subId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return subId
  };

  let result = [];
  for (let i = 0; i < 4; i += 1) {
    result.push(subIdGen());
  }

  return result.join('-');
}

const c3 = challenge3();
console.log(c3);
