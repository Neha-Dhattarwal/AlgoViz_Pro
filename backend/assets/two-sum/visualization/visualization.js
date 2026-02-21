
export function visualize(input, target) {
  let steps = [];
  let map = {};

  steps.push({
    type: "highlight",
    explanation: "Initialize an empty hash map to store visited numbers and their indices.",
    variables: { target, map: "{}" },
    line_number: 1
  });

  for (let i = 0; i < input.length; i++) {
    const complement = target - input[i];
    
    steps.push({
      type: "pointer_move",
      index: i,
      explanation: `Current value: ${input[i]}. We need complement: ${complement}`,
      variables: { i, val: input[i], complement },
      line_number: 3
    });

    steps.push({
      type: "compare",
      index: i,
      explanation: `Checking if ${complement} is in our hash map...`,
      line_number: 4
    });

    if (complement in map) {
      steps.push({
        type: "match",
        indices: [map[complement], i],
        explanation: `Success! ${complement} found at index ${map[complement]}.`,
        line_number: 5
      });
      return steps;
    }

    map[input[i]] = i;
    steps.push({
      type: "assignment",
      index: i,
      explanation: `Storing ${input[i]} in map at index ${i}.`,
      variables: { map: JSON.stringify(map) },
      line_number: 7
    });
  }
  return steps;
}
