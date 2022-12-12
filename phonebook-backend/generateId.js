// I'm very sorry, but I just cannot believe you really suggest to use random numbers which
// are by no means at all unique as ids. Very sorry to see that even though it might be
// easy to use and unlikely for collisions, but ... no i just cannot believe you really suggest
// this. Very sorry!
// So I will initialize the next id with max id from hard coded persons and then just
// increment by one on each call for an id

let nextId = 0;

const init = (persons) => {
  nextId = Math.max(...(persons.map(p => p.id))) + 1;
}

const next = () => {
  // if you insist, it would be:
  // return Math.random()
  // or if you prefer integer ids:
  // return Math.round(Math.random() * 2000000000)

  // no conflicts for sure:
  return nextId++;
}

module.exports = {init, next};
