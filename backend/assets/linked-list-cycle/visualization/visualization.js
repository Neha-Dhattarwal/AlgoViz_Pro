
export function visualize(nodes) {
  let steps = [];
  let slow = 0;
  let fast = 0;

  steps.push({
    type: "highlight",
    explanation: "Initialize Slow and Fast pointers at the Head node.",
    pointers: { slow: 0, fast: 0 }
  });

  while (fast < nodes.length) {
    slow++;
    fast += 2;

    steps.push({
      type: "pointer_move",
      explanation: "Slow moves 1 step, Fast moves 2 steps.",
      pointers: { slow, fast }
    });

    if (slow === fast) {
      steps.push({
        type: "match",
        explanation: "Pointers met! Cycle detected using Floyd's algorithm.",
        pointers: { slow, fast }
      });
      return steps;
    }
  }

  steps.push({
    type: "not_found",
    explanation: "Fast pointer reached NULL. No cycle exists."
  });
  return steps;
}
