const obj = {
  a: "hello",
  b: {
    c: "world",
    d: "!",
  },
  e: {
    f: {
      g: "done",
    },
  },
};

function success(obj, myArr = []) {
  for (const property in obj) {
    if (typeof obj[property] === "string") {
      myArr.push(obj[property]);
    } else {
      success(obj[property], myArr);
    }
  }
  return myArr;
}

const value = success(obj);
console.log(value);
