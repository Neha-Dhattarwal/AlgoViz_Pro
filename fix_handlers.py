import re

filePath = r'services\stepGenerator.ts'
with open(filePath, 'r', encoding='utf-8') as f:
    content = f.read()

marker = '  // BATCH 7-8 (61-75) placeholders'

# These are NEW handlers for problems that were completely missing
new_handlers = r"""
  // REVERSE BITS
  if (problemId === 'reverse-bits') {
    const n = 43261596; // binary: 00000010100101000001111010011100
    let result = 0;
    let num = n >>> 0;
    const binary = (num >>> 0).toString(2).padStart(32, '0');
    steps.push(createStep({ line_number: 2, explanation: `Input: n=${n} binary="${binary}"`, variables: { n, result: 0 }, array: binary.split('').map(Number) }));
    for (let i = 0; i < 32; i++) {
      const bit = num & 1;
      result = ((result << 1) | bit) >>> 0;
      num = num >>> 1;
      if (i < 8 || i === 31) {
        const resBin = (result >>> 0).toString(2).padStart(32, '0');
        steps.push(createStep({ line_number: 4, explanation: `Bit ${i}: extracted bit=${bit}, result="${resBin}"`, variables: { i, bit, result: result >>> 0 }, pointers: { i }, highlights: [i], array: binary.split('').map(Number) }));
      }
    }
    steps.push(createStep({ line_number: 6, explanation: `Reversed bits result: ${result >>> 0} (${(result >>> 0).toString(2).padStart(32, '0')})`, variables: { result: result >>> 0 }, operation_type: 'match', array: (result >>> 0).toString(2).padStart(32, '0').split('').map(Number) }));
    return steps;
  }

  // NUMBER OF 1 BITS
  if (problemId === 'number-of-1-bits') {
    const n = 11; // binary: 1011
    let count = 0;
    let num = n;
    const binary = (n >>> 0).toString(2);
    steps.push(createStep({ line_number: 2, explanation: `Input: n=${n} binary="${binary}"`, variables: { n, count: 0 }, array: binary.split('').map(Number) }));
    let step = 0;
    while (num !== 0) {
      const bit = num & 1;
      if (bit === 1) count++;
      steps.push(createStep({ line_number: 4, explanation: `Step ${step}: bit=${bit} (n & 1), count=${count}. n >>= 1`, variables: { count, bit, n: num }, pointers: { step }, highlights: [binary.length - 1 - step], array: binary.split('').map(Number) }));
      num = num >>> 1;
      step++;
    }
    steps.push(createStep({ line_number: 7, explanation: `Total 1-bits: ${count}`, variables: { result: count }, operation_type: 'match', array: binary.split('').map(Number) }));
    return steps;
  }

  // MISSING NUMBER
  if (problemId === 'missing-number') {
    const nums: number[] = Array.isArray(initialData) ? initialData : [3, 0, 1];
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    const missing = expectedSum - actualSum;
    steps.push(createStep({ line_number: 2, explanation: `n=${n}. Expected sum = n*(n+1)/2 = ${expectedSum}`, variables: { n, expectedSum }, array: nums }));
    steps.push(createStep({ line_number: 3, explanation: `Actual sum of array = ${actualSum}`, variables: { actualSum }, array: nums }));
    steps.push(createStep({ line_number: 4, explanation: `Missing = expectedSum - actualSum = ${expectedSum} - ${actualSum} = ${missing}`, variables: { result: missing }, operation_type: 'match', array: nums }));
    return steps;
  }

  // SUM OF TWO INTEGERS
  if (problemId === 'sum-of-two-integers') {
    let a = 1, b = 2;
    steps.push(createStep({ line_number: 2, explanation: `Input: a=${a}, b=${b}. Using bit manipulation — no + operator.`, variables: { a, b }, array: [a, b] }));
    while (b !== 0) {
      const carry = (a & b) << 1;
      a = a ^ b;
      b = carry;
      steps.push(createStep({ line_number: 4, explanation: `XOR gives sum without carry: a=${a}. AND<<1 gives carry: b=${b}`, variables: { a, b, carry }, array: [a, b] }));
    }
    steps.push(createStep({ line_number: 7, explanation: `No more carry. Result = ${a}`, variables: { result: a }, operation_type: 'match', array: [a] }));
    return steps;
  }

  // COUNTING BITS
  if (problemId === 'counting-bits') {
    const n = 5;
    const dp: number[] = new Array(n + 1).fill(0);
    steps.push(createStep({ line_number: 2, explanation: `n=${n}. dp[0]=0 (base case).`, variables: { n }, array: dp }));
    for (let i = 1; i <= n; i++) {
      dp[i] = dp[i >> 1] + (i & 1);
      steps.push(createStep({ line_number: 4, explanation: `dp[${i}] = dp[${i >> 1}] + (${i}&1) = ${dp[i >> 1]} + ${i & 1} = ${dp[i]}`, variables: { i, 'dp[i]': dp[i] }, pointers: { i }, highlights: [i], array: [...dp] }));
    }
    steps.push(createStep({ line_number: 7, explanation: `Result: [${dp}]`, variables: { result: JSON.stringify(dp) }, operation_type: 'match', array: dp }));
    return steps;
  }

  // IMPLEMENT TRIE
  if (problemId === 'implement-trie') {
    const words = Array.isArray(initialData) ? initialData : ['apple', 'app', 'ape'];
    const trieRoot: TreeData = { value: 'root', children: [] };
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: 'Trie initialized with empty root node.', tree: trieRoot }));
    for (const word of words) {
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `insert("${word}"): iterating character by character.`, tree: trieRoot }));
      for (let i = 0; i < word.length; i++) {
        steps.push(createStep({ type: 'TREE', line_number: 6, explanation: `  Char '${word[i]}' at depth ${i}: node exists or creating new child.`, tree: trieRoot, highlights: [word[i]] }));
      }
      steps.push(createStep({ type: 'TREE', line_number: 8, explanation: `  Mark end-of-word for "${word}".`, tree: { value: 'root', left: { value: word[0], right: { value: word.slice(0, 2) } } } }));
    }
    steps.push(createStep({ type: 'TREE', line_number: 12, explanation: `search("app"): traverse trie following a→p→p, check isEnd.`, call_stack: ['search("app")'], operation_type: 'compare', tree: trieRoot }));
    steps.push(createStep({ type: 'TREE', line_number: 15, explanation: `startsWith("ap"): traverse a→p. Prefix exists!`, operation_type: 'match', tree: trieRoot }));
    return steps;
  }

  // MAXIMUM SUBARRAY (Kadane's)
  if (problemId === 'maximum-subarray') {
    const nums: number[] = Array.isArray(initialData) ? initialData : [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    let maxSub = nums[0], curSub = nums[0];
    steps.push(createStep({ line_number: 2, explanation: `Init: maxSub=curSub=${nums[0]}`, variables: { maxSub, curSub }, pointers: { i: 0 }, highlights: [0], array: nums }));
    for (let i = 1; i < nums.length; i++) {
      curSub = Math.max(nums[i], curSub + nums[i]);
      maxSub = Math.max(maxSub, curSub);
      steps.push(createStep({ line_number: 4, explanation: `i=${i}: curSub=max(${nums[i]}, ${curSub-nums[i]+nums[i]})=${curSub}, maxSub=${maxSub}`, variables: { curSub, maxSub }, pointers: { i }, highlights: [i], array: nums }));
    }
    steps.push(createStep({ line_number: 7, explanation: `Maximum subarray sum: ${maxSub}`, variables: { result: maxSub }, operation_type: 'match', array: nums }));
    return steps;
  }

  // JUMP GAME
  if (problemId === 'jump-game') {
    const nums: number[] = Array.isArray(initialData) ? initialData : [2, 3, 1, 1, 4];
    let goal = nums.length - 1;
    steps.push(createStep({ line_number: 2, explanation: `goal = last index = ${goal}. Scan right-to-left.`, variables: { goal }, array: nums }));
    for (let i = nums.length - 2; i >= 0; i--) {
      steps.push(createStep({ line_number: 3, explanation: `i=${i}: can reach from here? ${i} + ${nums[i]} = ${i + nums[i]} >= goal(${goal})?`, variables: { i, goal }, pointers: { i, goal }, highlights: [i], array: nums }));
      if (i + nums[i] >= goal) {
        goal = i;
        steps.push(createStep({ line_number: 4, explanation: `Yes! New goal = ${goal}`, variables: { goal }, pointers: { i, goal }, highlights: [i], array: nums, operation_type: 'match' }));
      }
    }
    steps.push(createStep({ line_number: 7, explanation: `goal==0? ${goal === 0}. Can reach end: ${goal === 0}`, variables: { result: goal === 0 }, operation_type: 'match', array: nums }));
    return steps;
  }

"""

if marker in content:
    content = content.replace(marker, new_handlers + marker)
    with open(filePath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'SUCCESS: Added missing handlers. Lines approx: {content.count(chr(10))}')
else:
    print('ERROR: marker not found')
