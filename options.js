const SET_ALL = 'all';

const DIRECTION_FORWARD_ONLY = 'forward-only';
const DIRECTION_INVERSE_ONLY = 'inverse-only';
const DIRECTION_MIXED = 'mixed';
const direction = [DIRECTION_FORWARD_ONLY, DIRECTION_INVERSE_ONLY, DIRECTION_MIXED];

const ORDER_RANDOM = 'random';
const ORDER_ALPHABETICAL = 'alphabetical';
const order = [ORDER_RANDOM, ORDER_ALPHABETICAL];

const DUPLICATES_DUPLICATES_ALLOWED = 'duplicates-allowed';
const DUPLICATES_INVERSES_ALLOWED = 'inverses-allowed';
const DUPLICATES_NO_INVERSES = 'no-inverses';
const duplicates = [DUPLICATES_DUPLICATES_ALLOWED, DUPLICATES_INVERSES_ALLOWED, DUPLICATES_NO_INVERSES];

const presets = {
  shuffleAll: {
    set: 'all',
    direction: 'mixed',
    order: 'random',
    duplicates: 'duplicates-allowed',
    n: 20,
    chunkSize: 4,
  },
};

const presetPartials = {
  oneFullSetRandomized: set => ({
    set,
    direction: 'mixed',
    order: 'random',
    duplicates: 'no-inverses',
    n: 99,
    chunkSize: 4,
  }),
  oneFullSetForward: set => ({
    set,
    direction: 'forward-only',
    order: 'alphabetical',
    n: 99,
    chunkSize: 99,
  }),
  oneFullSetForwardChunked: set => ({
    set,
    direction: 'forward-only',
    order: 'alphabetical',
    n: 99,
    chunkSize: 4,
  }),
  oneFullSetInverses: set => ({
    set,
    direction: 'inverse-only',
    order: 'alphabetical',
    n: 99,
    chunkSize: 99,
  }),
  oneFullSetInversesChunked: set => ({
    set,
    direction: 'inverse-only',
    order: 'alphabetical',
    n: 99,
    chunkSize: 4,
  }),
};

function validateOptions(options) {
  validateSet(options);
  validateDirection(options);
  validateOrder(options);
  validateDuplicates(options);
  validateN(options);
  validateChunkSize(options);
}

function validateSet(options) {
  if (options.set === SET_ALL) {
    return; // valid
  }
  if (options.set.match(/^[A-Z]$/)) {
    return; // valid
  }
  throw "Invalid set: " + options.set;
}

function validateDirection(options) {
  if (options.set === SET_ALL) {
    return options.direction == null;
  }
  if (direction.includes(options.direction)) {
    return; // valid
  }
  throw "Invalid direction: " + options.direction;
}

function validateOrder(options) {
  if (order.includes(options.order)) {
    return; // valid
  }
  throw "Invalid order: " + options.order;
}

function validateDuplicates(options) {
  if (options.order !== ORDER_RANDOM) {
    return options.duplicates == null;
  }
  if (duplicates.includes(options.duplicates)) {
    return; // valid
  }
  throw "Invalid duplicates: " + options.duplicates;
}

function validateN(options) {
  if (options.order !== ORDER_RANDOM) {
    return options.n == null;
  }
  if (Number.isInteger(options.n) && options.n > 0) {
    return; // valid
  }
  throw "Invalid n: " + options.n;
}

function validateChunkSize(options) {
  if (Number.isInteger(options.chunkSize) && options.chunkSize > 0) {
    return; // valid
  }
  throw "Invalid chunkSize: " + options.chunkSize;
}

module.exports = {
  validateOptions,
  presets,
  presetPartials,

  SET_ALL,

  DIRECTION_FORWARD_ONLY,
  DIRECTION_INVERSE_ONLY,
  DIRECTION_MIXED,

  ORDER_RANDOM,
  ORDER_ALPHABETICAL,

  DUPLICATES_DUPLICATES_ALLOWED,
  DUPLICATES_INVERSES_ALLOWED,
  DUPLICATES_NO_INVERSES,
};
