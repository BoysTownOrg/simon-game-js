export const TrialType = Object.freeze({ fixed: 1, random: 2 });

function round(trialType, trials) {
  return { trialType: trialType, trials: trials };
}

export function parse(contents) {
  const split = contents.split("\n");
  const result = new Array(split.length - 1);
  for (let i = 2; i < split.length - 1; ++i) {
    const subsplit = split[i].split(" ");
    result[i] = round(
      Number(subsplit[0]) == 0 ? TrialType.fixed : TrialType.random,
      Number(subsplit[1])
    );
  }
  return result;
}
