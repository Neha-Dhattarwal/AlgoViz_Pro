
/**
 * VISUALIZATION LOGIC
 * Controls step-by-step UI events.
 */
function generateVisualization(nums, target) {
    const steps = [];
    const map = {};

    steps.push({
        type: "highlight",
        explanation: "Initialize Hash Map for O(1) lookups.",
        variables: { target, map: "{}" }
    });

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        
        steps.push({
            type: "pointer_move",
            index: i,
            explanation: `Checking index ${i}. Complement needed: ${target} - ${nums[i]} = ${diff}`
        });

        steps.push({
            type: "compare",
            indices: [i],
            explanation: `Does ${diff} exist in map?`
        });

        if (diff in map) {
            steps.push({
                type: "match",
                indices: [map[diff], i],
                explanation: "Found match!"
            });
            break;
        }
        map[nums[i]] = i;
    }
    return steps;
}
