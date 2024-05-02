const creatureArray = [
  "dog",
  "cat",
  "bird",
  "rat",
  "snake",
  "dragon",
  "fish",
  "worm",
  "mole",
  "bear",
];

const getRandomNumber = (maxRandomNumber) => {
  const result = Math.ceil(Math.round(Math.random() * maxRandomNumber) + 1);
  return result;
};

const myArray = [...Array(10)].map((name, i) => ({
  id: i,
  name: creatureArray.at(getRandomNumber(creatureArray.length - 1) - 1),
  hp: getRandomNumber(10),
  attack: getRandomNumber(3),
  speed: getRandomNumber(10),
}));

const winner = myArray.reduce((prev, curr) => {
  const goesFirst = prev.speed > curr.speed ? prev : curr;
  const goesSecond = prev.speed < curr.speed ? prev : curr;

  const { idPrev, ...restPrev } = prev;
  const { idCurr, ...restCurr } = curr;
  console.log(`${JSON.stringify(restPrev)} VS ${JSON.stringify(restCurr)}`);
  console.log("Start!");

  while (goesFirst.hp > 0 && goesSecond.hp > 0) {
    goesSecond.hp = goesSecond.hp - goesFirst.attack;
    if (goesSecond.hp < 0) {
      break;
    }
    goesFirst.hp = goesFirst.hp - goesSecond.hp;
  }
  const winner = prev.hp > 0 ? prev : curr;
  const { id, ...rest } = winner;
  console.log(`Winner! ${JSON.stringify(winner)}`);

  return winner;
});
