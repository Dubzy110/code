const myArray = [...Array(10)].map((val, i) => ({
  id: i,
  hp: Math.random() * 1000,
}));

const result = myArray.filter((hp) => {
  return hp.hp > 500;
});

console.log(result);
