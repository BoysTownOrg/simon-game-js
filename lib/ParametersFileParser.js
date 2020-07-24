export const TrialType = Object.freeze({ fixed: 1, random: 2 });

function roundOfTrials(trialType, trials) {
  return { trialType: trialType, trials: trials };
}

export function parse(contents) {
  const result = [];
  for (const line of contents.split("\n")) {
    const items = line.split(" ");
    if (items.length == 2) {
      result.push(
        roundOfTrials(
          Number(items[0]) == 0 ? TrialType.fixed : TrialType.random,
          Number(items[1])
        )
      );
    }
  }
  return result;
}
