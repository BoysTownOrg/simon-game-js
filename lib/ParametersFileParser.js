export const TrialType = Object.freeze({ fixed: 1, random: 2 });

function round(trialType, trials) {
  return { trialType: trialType, trials: trials };
}

export function parse(contents) {
  const split = contents.split("\n");
  const result = [];
  for (const line of split) {
    const subsplit = line.split(" ");
    if (subsplit.length == 2) {
      result.push(
        round(
          Number(subsplit[0]) == 0 ? TrialType.fixed : TrialType.random,
          Number(subsplit[1])
        )
      );
    }
  }
  return result;
}
