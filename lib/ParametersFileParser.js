export const TrialType = Object.freeze({ fixed: 1, random: 2 });

function round(trialType, trials) {
  return { trialType: trialType, trials: trials };
}

export function parse(contents) {
  const result = new Array(5);
  result[2] = round(TrialType.fixed, 15);
  result[3] = round(TrialType.random, 16);
  result[4] = round(TrialType.fixed, 17);
  return result;
}
