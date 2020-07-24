import { parse, TrialType } from "../lib/ParametersFileParser.js";

function at(result, index) {
  return result[index];
}

function expectEqual(a, b) {
  expect(a).toEqual(b);
}

function expectTrialTypeAtIndexEquals(result, index, type) {
  expectEqual(type, at(result, index).trialType);
}

function expectFixed(result, index) {
  expectTrialTypeAtIndexEquals(result, index, TrialType.fixed);
}

function expectRandom(result, index) {
  expectTrialTypeAtIndexEquals(result, index, TrialType.random);
}

function expectTrials(result, index, n) {
  expectEqual(n, at(result, index).trials);
}

describe("ParametersFileParser", function () {
  it("tbd", function () {
    const result = parse("0 1\n0 1\n0 15\n1 16\n0 17\n");
    expectFixed(result, 2);
    expectTrials(result, 2, 15);
    expectRandom(result, 3);
    expectTrials(result, 3, 16);
    expectFixed(result, 4);
    expectTrials(result, 4, 17);
    expectEqual(5, result.length);
  });

  it("trailing new line ignored", function () {
    const result = parse("0 1\n0 1\n0 15\n1 16\n0 17");
    expectFixed(result, 2);
    expectTrials(result, 2, 15);
    expectRandom(result, 3);
    expectTrials(result, 3, 16);
    expectFixed(result, 4);
    expectTrials(result, 4, 17);
    expectEqual(5, result.length);
  });
});
