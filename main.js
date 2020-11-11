const alg = require('alg');
const Papa = require('papaparse');
const cubeSolver = require('cube-solver');

const rawSheet = require('./raw-sheet');
const options = require('./options');


function main() {
  const allCases = parseSheet(rawSheet);

  // const selectedOptions = options.presets.shuffleAll;
  // const selectedOptions = options.presetPartials.oneFullSetRandomized('B');
  // const selectedOptions = options.presetPartials.oneFullSetForward('B');
  const selectedOptions = options.presetPartials.oneFullSetForwardChunked('B');

  options.validateOptions(selectedOptions);

  let cases = getSet(allCases, selectedOptions);
  cases = filterByDirection(cases, selectedOptions);

  const sequences = getSequences(cases, selectedOptions);

  for (let sequence of sequences) {
    const fullSolution = clean(
      sequence.map(caze => caze.expandedNotation)
        .join(' ')
    );
    const scramble = cubeSolver.solve(clean(fullSolution));
    sequence.scramble = scramble;

    console.log('// ' + scramble);
    console.log('// ' + sequence.map(caze => caze.pair).join(' '));
    console.log();
  }

  for (let sequence of sequences) {
    console.log(sequence.scramble);
    for (let caze of sequence) {
      console.log(caze.commutatorNotation + ' // ' + caze.pair);
    }
    console.log();
  }

}

function getSequences(cases, selectedOptions) {
  if (selectedOptions.order === options.ORDER_ALPHABETICAL) {
    const letterPairs = Object.keys(cases).map(pair => pair);
    letterPairs.sort();
    const casesArray = letterPairs.map(pair => cases[pair]);
    return toChunks(casesArray, selectedOptions.chunkSize);
  }

  // order is random
  const generatedCases = [];
  while (
    generatedCases.length < selectedOptions.n
    && Object.keys(cases).length // Only relevant if ignoring duplicates
  ) {
    const letterPair = randomChoice(Object.keys(cases));
    generatedCases.push(cases[letterPair]);

    if (selectedOptions.duplicates === options.DUPLICATES_INVERSES_ALLOWED) {
      delete cases[letterPair];
    } else if (selectedOptions.duplicates === options.DUPLICATES_NO_INVERSES) {
      delete cases[letterPair];
      delete cases[flipPair(letterPair)];
    }
  }
  return toChunks(generatedCases, selectedOptions.chunkSize);
}

function getSet(allCases, selectedOptions) {
  const { set } = selectedOptions;
  if (set === options.SET_ALL) {
    return allCases;
  } else {
    return filterObject(allCases,
      (_, pair) => pair.indexOf(set) !== -1);
  }
}

function filterByDirection(cases, selectedOptions) {
  const { set, direction } = selectedOptions;
  if (set === options.SET_ALL || direction === options.DIRECTION_MIXED) {
    return cases;
  } else if (direction === options.DIRECTION_FORWARD_ONLY) {
    return filterObject(cases,
      (_, pair) => pair.charAt(0) === set);
  } else if (direction === options.DIRECTION_INVERSE_ONLY) {
    return filterObject(cases,
      (_, pair) => pair.charAt(1) === set);
  }
  throw "Unreachable case reached"
}

function parseSheet(rawSheet) {
  const sheet = Papa.parse(rawSheet, {
    delimiter: '\t',
    newline: '\n',
    skipEmptyLines: true,
    header: true,
  });

  // Headers
  const PAIR = 'Pair';
  const EXCLUDE = 'Exclude';
  const COMMUTATOR = 'Commutator';

  const result = {};
  for (let item of sheet.data) {
    if (item[PAIR] && item[COMMUTATOR] && !item[EXCLUDE]) {
      const letterPair = removeTrailingDot(item[PAIR]);
      const commutatorAlg = alg.parse(item[COMMUTATOR]);
      const flippedPair = flipPair(letterPair);

      result[letterPair] = makeCase(letterPair, commutatorAlg);
      result[flippedPair] = makeCase(flippedPair, alg.invert(commutatorAlg));
    }
  }
  return result;
}

function removeTrailingDot(rawLetterPair) {
  return rawLetterPair.slice(0, 2);
}

function flipPair(letterPair) {
  return (Array.from(letterPair)
    .reverse()
    .join(''));
}

function makeCase(letterPair, commutatorAlg) {
  return {
    pair: letterPair,
    commutatorNotation: alg.algToString(commutatorAlg),
    expandedNotation: alg.algToString(alg.expand(commutatorAlg)),
  };
}

// https://stackoverflow.com/a/5072145/1945088
function filterObject(obj, predicate) {
  let result = {}, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function toChunks(array, chunkSize) {
  const result = [];
  const copy = array.slice();
  while (copy.length) {
    result.push(copy.splice(0, chunkSize));
  }
  return result;
}

// cube-solver doesn't like some cases
function clean(alg) {
  return (alg
    .replace(/2'/g, "2")
    .replace(/l'/g, "R' x")
    .replace(/b'/g, "F' z")
    .replace(/d'/g, "U' y")
  );
}

main();
