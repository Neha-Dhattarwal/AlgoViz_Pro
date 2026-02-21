
import { AlgorithmStep, TreeData, HeapObject } from '../types';

export const generateSteps = (problemId: string, category: string, initialData: any): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];

  const createStep = (base: Partial<AlgorithmStep>): AlgorithmStep => {
    return {
      step_number: steps.length,
      line_number: base.line_number || 0,
      explanation: base.explanation || "",
      variables: base.variables || {},
      pointers: base.pointers || {},
      call_stack: base.call_stack || ['solve()'],
      complexity_score: steps.length,
      highlights: base.highlights || [],
      operation_type: base.operation_type || 'initialize',
      type: base.type || 'ARRAY',
      ...base
    } as AlgorithmStep;
  };

  // 1. TWO SUM
  if (problemId === 'two-sum') {
    let nums = [2, 7, 11, 15];
    let target = 9;

    if (Array.isArray(initialData)) {
      nums = initialData;
    } else if (initialData && typeof initialData === 'object') {
      nums = initialData.nums || nums;
      target = initialData.target !== undefined ? initialData.target : target;
    }

    const map = new Map();
    steps.push(createStep({ line_number: 2, explanation: `Initializing Map for lookups. Target = ${target}`, variables: { target, map: "{}" }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      steps.push(createStep({ line_number: 3, explanation: `Loop iteration i=${i}, value=${nums[i]}`, variables: { i, target }, pointers: { i }, array: nums, highlights: [i] }));
      const complement = target - nums[i];
      steps.push(createStep({ line_number: 4, explanation: `Complement = ${target} - ${nums[i]} = ${complement}`, variables: { i, complement }, pointers: { i }, array: nums, highlights: [i] }));
      if (map.has(complement)) {
        steps.push(createStep({ line_number: 5, explanation: `Match found! ${complement} is in map at index ${map.get(complement)}.`, variables: { result: [map.get(complement), i] }, pointers: { i, match: map.get(complement) }, array: nums, operation_type: 'match', highlights: [i, map.get(complement)] }));
        return steps;
      }
      map.set(nums[i], i);
      steps.push(createStep({ line_number: 6, explanation: `Storing ${nums[i]} (index ${i}) in map.`, variables: { map: JSON.stringify(Object.fromEntries(map)) }, pointers: { i }, array: nums }));
    }
  }

  // 2. BEST TIME TO BUY AND SELL STOCK
  if (problemId === 'best-time-to-buy-and-sell-stock') {
    const prices = initialData || [7, 1, 5, 3, 6, 4];
    let minPrice = Infinity;
    let maxProfit = 0;
    steps.push(createStep({ line_number: 2, explanation: "Starting with minPrice = Infinity", variables: { minPrice }, array: prices }));
    steps.push(createStep({ line_number: 3, explanation: "Starting with maxProfit = 0", variables: { minPrice, maxProfit }, array: prices }));
    for (let i = 0; i < prices.length; i++) {
      const price = prices[i];
      steps.push(createStep({ line_number: 4, explanation: `Checking price: ${price}`, pointers: { i }, array: prices, highlights: [i] }));
      if (price < minPrice) {
        minPrice = price;
        steps.push(createStep({ line_number: 5, explanation: `New minPrice found: ${minPrice}`, variables: { minPrice, maxProfit }, pointers: { i }, array: prices, highlights: [i] }));
      }
      const profit = price - minPrice;
      steps.push(createStep({ line_number: 6, explanation: `Current profit: ${price} - ${minPrice} = ${profit}`, variables: { minPrice, maxProfit, profit }, pointers: { i }, array: prices, highlights: [i] }));
      if (profit > maxProfit) {
        maxProfit = profit;
        steps.push(createStep({ line_number: 7, explanation: `New maxProfit: ${maxProfit}`, variables: { minPrice, maxProfit }, pointers: { i }, array: prices, highlights: [i] }));
      }
    }
    steps.push(createStep({ line_number: 9, explanation: `Final result: ${maxProfit}`, variables: { maxProfit }, array: prices }));
    return steps;
  }

  // 10. CONTAINS DUPLICATE
  if (problemId === 'contains-duplicate') {
    const nums = initialData || [1, 2, 3, 1];
    const set = new Set();
    steps.push(createStep({ line_number: 2, explanation: "Initializing empty Set to track occurrences.", variables: { set: "{}" }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      const n = nums[i];
      steps.push(createStep({ line_number: 3, explanation: `Loop iteration i=${i}, value=${n}`, pointers: { i }, array: nums, highlights: [i] }));
      if (set.has(n)) {
        steps.push(createStep({ line_number: 4, explanation: `Duplicate found! ${n} is already in the set.`, pointers: { i }, array: nums, highlights: [i], operation_type: 'match' }));
        return steps;
      }
      set.add(n);
      steps.push(createStep({ line_number: 5, explanation: `Added ${n} to set.`, variables: { set: `{${Array.from(set).join(', ')}}` }, pointers: { i }, array: nums }));
    }
    steps.push(createStep({ line_number: 7, explanation: "Finished loop. No duplicates found.", operation_type: 'match' }));
    return steps;
  }

  // 11. PRODUCT OF ARRAY EXCEPT SELF
  if (problemId === 'product-of-array-except-self') {
    const nums = initialData || [1, 2, 3, 4];
    const res = new Array(nums.length).fill(1);
    steps.push(createStep({ line_number: 2, explanation: "Initializing result array with 1s.", variables: { res: JSON.stringify(res) }, array: nums }));
    let prefix = 1;
    steps.push(createStep({ line_number: 3, explanation: "Initializing prefix = 1", variables: { prefix }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      steps.push(createStep({ line_number: 4, explanation: `Forward Pass: i=${i}`, pointers: { i }, array: nums, highlights: [i] }));
      res[i] = prefix;
      steps.push(createStep({ line_number: 5, explanation: `res[${i}] = prefix = ${prefix}`, variables: { res: JSON.stringify(res), prefix }, pointers: { i }, array: nums }));
      prefix *= nums[i];
      steps.push(createStep({ line_number: 6, explanation: `prefix = prefix * nums[${i}] = ${prefix}`, variables: { prefix }, pointers: { i }, array: nums }));
    }
    let suffix = 1;
    steps.push(createStep({ line_number: 8, explanation: "Initializing suffix = 1", variables: { suffix }, array: nums }));
    for (let i = nums.length - 1; i >= 0; i--) {
      steps.push(createStep({ line_number: 9, explanation: `Backward Pass: i=${i}`, pointers: { i }, array: nums, highlights: [i] }));
      res[i] *= suffix;
      steps.push(createStep({ line_number: 10, explanation: `res[${i}] = res[${i}] * suffix = ${res[i]}`, variables: { res: JSON.stringify(res), suffix }, pointers: { i }, array: nums }));
      suffix *= nums[i];
      steps.push(createStep({ line_number: 11, explanation: `suffix = suffix * nums[${i}] = ${suffix}`, variables: { suffix }, pointers: { i }, array: nums }));
    }
    steps.push(createStep({ line_number: 13, explanation: "Returning final product array.", variables: { res: JSON.stringify(res) }, array: nums, operation_type: 'match' }));
    return steps;
  }

  // 12. MAXIMUM SUBARRAY
  if (problemId === 'maximum-subarray') {
    const nums = initialData || [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    let maxSum = nums[0], curSum = 0;
    steps.push(createStep({ line_number: 2, explanation: `Initializing maxSum=${maxSum}, curSum=${curSum}`, variables: { maxSum, curSum }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      const n = nums[i];
      steps.push(createStep({ line_number: 3, explanation: `Processing ${n}`, pointers: { i }, array: nums, highlights: [i] }));
      if (curSum < 0) {
        curSum = 0;
        steps.push(createStep({ line_number: 4, explanation: "curSum < 0, resetting to 0", variables: { curSum, maxSum }, pointers: { i }, array: nums }));
      }
      curSum += n;
      steps.push(createStep({ line_number: 5, explanation: `curSum += ${n} -> ${curSum}`, variables: { curSum, maxSum }, pointers: { i }, array: nums }));
      maxSum = Math.max(maxSum, curSum);
      steps.push(createStep({ line_number: 6, explanation: `maxSum = max(${maxSum}, ${curSum}) -> ${maxSum}`, variables: { curSum, maxSum }, pointers: { i }, array: nums }));
    }
    steps.push(createStep({ line_number: 8, explanation: `Result: ${maxSum}`, variables: { maxSum }, array: nums, operation_type: 'match' }));
    return steps;
  }

  // 13. MAXIMUM PRODUCT SUBARRAY
  if (problemId === 'maximum-product-subarray') {
    const nums = initialData || [2, 3, -2, 4];
    let curMax = 1, curMin = 1, res = Math.max(...nums);
    steps.push(createStep({ line_number: 2, explanation: `Initializing curMax=1, curMin=1, res=${res}`, variables: { curMax, curMin, res }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      const n = nums[i];
      steps.push(createStep({ line_number: 3, explanation: `Loop for n=${n}`, pointers: { i }, array: nums, highlights: [i] }));
      let tmp = curMax * n;
      steps.push(createStep({ line_number: 4, explanation: `tmp = curMax * n = ${tmp}`, variables: { tmp }, pointers: { i }, array: nums }));
      curMax = Math.max(n * curMax, n * curMin, n);
      steps.push(createStep({ line_number: 5, explanation: `curMax = max(${n * curMax}, ${n * curMin}, ${n}) = ${curMax}`, variables: { curMax }, pointers: { i }, array: nums }));
      curMin = Math.min(tmp, n * curMin, n);
      steps.push(createStep({ line_number: 6, explanation: `curMin = min(${tmp}, ${n * curMin}, ${n}) = ${curMin}`, variables: { curMin }, pointers: { i }, array: nums }));
      res = Math.max(res, curMax);
      steps.push(createStep({ line_number: 7, explanation: `res = max(${res}, ${curMax}) = ${res}`, variables: { res }, pointers: { i }, array: nums }));
    }
    steps.push(createStep({ line_number: 9, explanation: `Final Max Product: ${res}`, variables: { res }, array: nums, operation_type: 'match' }));
    return steps;
  }

  // 14. FIND MINIMUM IN ROTATED SORTED ARRAY
  if (problemId === 'find-minimum-in-rotated-sorted-array') {
    const nums = initialData || [3, 4, 5, 1, 2];
    let L = 0, R = nums.length - 1;
    steps.push(createStep({ line_number: 2, explanation: `Initial pointers: L=${L}, R=${R}`, variables: { L, R }, pointers: { L, R }, array: nums }));
    while (L < R) {
      steps.push(createStep({ line_number: 3, explanation: `While L(${L}) < R(${R})`, pointers: { L, R }, array: nums }));
      let M = Math.floor((L + R) / 2);
      steps.push(createStep({ line_number: 4, explanation: `Mid M=${M}, value=${nums[M]}`, variables: { L, R, M }, pointers: { L, R, M }, array: nums, highlights: [M] }));
      if (nums[M] > nums[R]) {
        steps.push(createStep({ line_number: 5, explanation: `nums[M](${nums[M]}) > nums[R](${nums[R]}). Min is in right half.`, pointers: { L, R, M }, array: nums }));
        L = M + 1;
        steps.push(createStep({ line_number: 5, explanation: `L = M + 1 = ${L}`, variables: { L, R }, pointers: { L, R }, array: nums }));
      } else {
        steps.push(createStep({ line_number: 6, explanation: `nums[M](${nums[M]}) <= nums[R](${nums[R]}). Min is in left half.`, pointers: { L, R, M }, array: nums }));
        R = M;
        steps.push(createStep({ line_number: 6, explanation: `R = M = ${R}`, variables: { L, R }, pointers: { L, R }, array: nums }));
      }
    }
    steps.push(createStep({ line_number: 8, explanation: `Min found: ${nums[L]}`, variables: { result: nums[L] }, pointers: { L }, array: nums, operation_type: 'match' }));
    return steps;
  }

  // 15. SEARCH IN ROTATED SORTED ARRAY
  if (problemId === 'search-in-rotated-sorted-array') {
    const nums = initialData || [4, 5, 6, 7, 0, 1, 2];
    const target = 0;
    let L = 0, R = nums.length - 1;
    steps.push(createStep({ line_number: 2, explanation: `Initial pointers: L=${L}, R=${R}, target=${target}`, variables: { L, R, target }, pointers: { L, R }, array: nums }));
    while (L <= R) {
      steps.push(createStep({ line_number: 3, explanation: `While L(${L}) <= R(${R})`, pointers: { L, R }, array: nums }));
      let M = Math.floor((L + R) / 2);
      steps.push(createStep({ line_number: 4, explanation: `Mid M=${M}, value=${nums[M]}`, variables: { L, R, M }, pointers: { L, R, M }, array: nums, highlights: [M] }));
      if (nums[M] === target) {
        steps.push(createStep({ line_number: 5, explanation: `Match found at index ${M}!`, pointers: { M }, array: nums, operation_type: 'match', highlights: [M] }));
        return steps;
      }
      if (nums[L] <= nums[M]) {
        steps.push(createStep({ line_number: 6, explanation: "Left half is sorted.", pointers: { L, M }, array: nums }));
        if (target > nums[M] || target < nums[L]) {
          L = M + 1;
          steps.push(createStep({ line_number: 7, explanation: "Target not in left half, moving L to M+1", variables: { L }, pointers: { L, R }, array: nums }));
        } else {
          R = M - 1;
          steps.push(createStep({ line_number: 8, explanation: "Target in left half, moving R to M-1", variables: { R }, pointers: { L, R }, array: nums }));
        }
      } else {
        steps.push(createStep({ line_number: 9, explanation: "Right half is sorted.", pointers: { M, R }, array: nums }));
        if (target < nums[M] || target > nums[R]) {
          R = M - 1;
          steps.push(createStep({ line_number: 10, explanation: "Target not in right half, moving R to M-1", variables: { R }, pointers: { L, R }, array: nums }));
        } else {
          L = M + 1;
          steps.push(createStep({ line_number: 11, explanation: "Target in right half, moving L to M+1", variables: { L }, pointers: { L, R }, array: nums }));
        }
      }
    }
    return steps;
  }

  // 16. 3SUM
  if (problemId === '3sum') {
    const nums = initialData || [-1, 0, 1, 2, -1, -4];
    const original = [...nums];
    nums.sort((a, b) => a - b);
    steps.push(createStep({ line_number: 2, explanation: "Sorting input array for two-pointer approach.", variables: { original: JSON.stringify(original), sorted: JSON.stringify(nums) }, array: nums }));
    const res: number[][] = [];
    steps.push(createStep({ line_number: 3, explanation: "Initializing result list.", variables: { res: "[]" }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      steps.push(createStep({ line_number: 4, explanation: `Outer loop: i=${i}, value=${nums[i]}`, pointers: { i }, array: nums, highlights: [i] }));
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push(createStep({ line_number: 5, explanation: `Duplicate value ${nums[i]} at index ${i}, skipping...`, pointers: { i }, array: nums, highlights: [i] }));
        continue;
      }
      let L = i + 1, R = nums.length - 1;
      steps.push(createStep({ line_number: 6, explanation: `Initializing two pointers: L=${L}, R=${R}`, variables: { L, R }, pointers: { i, L, R }, array: nums, highlights: [i, L, R] }));
      while (L < R) {
        steps.push(createStep({ line_number: 7, explanation: `While L(${L}) < R(${R})`, pointers: { i, L, R }, array: nums }));
        const sum = nums[i] + nums[L] + nums[R];
        steps.push(createStep({ line_number: 8, explanation: `Sum = ${nums[i]} + ${nums[L]} + ${nums[R]} = ${sum}`, variables: { sum }, pointers: { i, L, R }, array: nums, highlights: [i, L, R] }));
        if (sum > 0) {
          R--;
          steps.push(createStep({ line_number: 9, explanation: "Sum > 0, moving R pointer left.", variables: { R }, pointers: { i, L, R }, array: nums }));
        } else if (sum < 0) {
          L++;
          steps.push(createStep({ line_number: 10, explanation: "Sum < 0, moving L pointer right.", variables: { L }, pointers: { i, L, R }, array: nums }));
        } else {
          res.push([nums[i], nums[L], nums[R]]);
          steps.push(createStep({ line_number: 12, explanation: `Match! Triplet [${nums[i]}, ${nums[L]}, ${nums[R]}] added to results.`, variables: { res: JSON.stringify(res) }, pointers: { i, L, R }, array: nums, operation_type: 'match', highlights: [i, L, R] }));
          L++;
          steps.push(createStep({ line_number: 13, explanation: "Moving L pointer right.", variables: { L }, pointers: { i, L, R }, array: nums }));
          while (nums[L] === nums[L - 1] && L < R) {
            steps.push(createStep({ line_number: 14, explanation: `Skipping duplicate value ${nums[L]} for L pointer.`, pointers: { L }, array: nums }));
            L++;
          }
        }
      }
    }
    steps.push(createStep({ line_number: 18, explanation: "Returning unique triplets.", variables: { result: JSON.stringify(res) }, operation_type: 'match' }));
    return steps;
  }

  // 17. CONTAINER WITH MOST WATER
  if (problemId === 'container-with-most-water') {
    const h = initialData || [1, 8, 6, 2, 5, 4, 8, 3, 7];
    let L = 0, R = h.length - 1, maxA = 0;
    steps.push(createStep({ line_number: 2, explanation: `Initial pointers: L=${L}, R=${R}, maxArea=${maxA}`, variables: { L, R, maxA }, pointers: { L, R }, array: h, highlights: [L, R] }));
    while (L < R) {
      steps.push(createStep({ line_number: 3, explanation: `While L(${L}) < R(${R})`, pointers: { L, R }, array: h }));
      const currentArea = (R - L) * Math.min(h[L], h[R]);
      maxA = Math.max(maxA, currentArea);
      steps.push(createStep({ line_number: 4, explanation: `Area = width(${R - L}) * minHeight(${Math.min(h[L], h[R])}) = ${currentArea}. maxArea=${maxA}`, variables: { L, R, area: currentArea, maxA }, pointers: { L, R }, array: h, highlights: [L, R] }));
      if (h[L] < h[R]) {
        L++;
        steps.push(createStep({ line_number: 5, explanation: `h[L](${h[L - 1]}) < h[R](${h[R]}). Incremented L to ${L}`, variables: { L }, pointers: { L, R }, array: h }));
      } else {
        R--;
        steps.push(createStep({ line_number: 5, explanation: `h[L](${h[L]}) >= h[R](${h[R + 1]}). Decremented R to ${R}`, variables: { R }, pointers: { L, R }, array: h }));
      }
    }
    steps.push(createStep({ line_number: 7, explanation: `Final Max Area: ${maxA}`, variables: { maxA }, operation_type: 'match' }));
    return steps;
  }

  // 18. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
  if (problemId === 'longest-substring-without-repeating-characters') {
    const s = initialData || "abcabcbb";
    const chars = s.split('');
    let L = 0, maxL = 0, set = new Set();
    steps.push(createStep({ line_number: 2, explanation: `Initial: L=${L}, maxL=${maxL}, set=empty`, variables: { L, maxL, set: "{}" }, array: chars }));
    for (let R = 0; R < s.length; R++) {
      steps.push(createStep({ line_number: 3, explanation: `Outer loop R=${R}, char='${s[R]}'`, pointers: { L, R }, array: chars, highlights: [R] }));
      while (set.has(s[R])) {
        steps.push(createStep({ line_number: 4, explanation: `Duplicate '${s[R]}' in set! Removing s[L]='${s[L]}'`, pointers: { L, R }, array: chars, highlights: [L, R] }));
        set.delete(s[L]);
        L++;
        steps.push(createStep({ line_number: 4, explanation: `L incremented to ${L}`, variables: { L, set: JSON.stringify(Array.from(set)) }, pointers: { L, R }, array: chars }));
      }
      set.add(s[R]);
      steps.push(createStep({ line_number: 5, explanation: `Added '${s[R]}' to set. Window size = ${R - L + 1}`, variables: { set: JSON.stringify(Array.from(set)) }, pointers: { L, R }, array: chars, highlights: Array.from({ length: R - L + 1 }, (_, k) => L + k) }));
      maxL = Math.max(maxL, R - L + 1);
      steps.push(createStep({ line_number: 6, explanation: `Updated maxL = ${maxL}`, variables: { maxL }, pointers: { L, R }, array: chars }));
    }
    steps.push(createStep({ line_number: 8, explanation: "Returning max substring length.", variables: { maxL }, operation_type: 'match' }));
    return steps;
  }
  // 21. VALID PALINDROME
  if (problemId === 'valid-palindrome') {
    const s = initialData || "A man, a plan, a canal: Panama";
    const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    steps.push(createStep({ line_number: 2, explanation: `Cleaning string: "${s}" -> "${cleaned}"`, variables: { s, cleaned }, array: s.split('') }));
    let L = 0, R = cleaned.length - 1;
    steps.push(createStep({ line_number: 3, explanation: `Initial pointers: L=${L}, R=${R}`, variables: { L, R }, pointers: { L, R }, array: cleaned.split('') }));
    while (L < R) {
      steps.push(createStep({ line_number: 4, explanation: `While L(${L}) < R(${R})`, pointers: { L, R }, array: cleaned.split('') }));
      if (cleaned[L] !== cleaned[R]) {
        steps.push(createStep({ line_number: 5, explanation: `Mismatch: cleaned[L]('${cleaned[L]}') !== cleaned[R]('${cleaned[R]}')`, pointers: { L, R }, array: cleaned.split(''), highlights: [L, R], operation_type: 'error_warning' }));
        return steps;
      }
      L++; R--;
      steps.push(createStep({ line_number: 6, explanation: `Matched '${cleaned[L - 1]}'. Moving pointers to L=${L}, R=${R}`, variables: { L, R }, pointers: { L, R }, array: cleaned.split(''), highlights: [L - 1, R + 1] }));
    }
    steps.push(createStep({ line_number: 8, explanation: "Valid Palindrome confirmed.", operation_type: 'match' }));
    return steps;
  }

  // 19/22/23. LONGEST PALINDROMIC SUBSTRING & PALINDROMIC SUBSTRINGS
  if (problemId === 'longest-palindromic-substring' || problemId === 'palindromic-substrings') {
    const s = initialData || "babad";
    let res = '', resLen = 0;
    steps.push(createStep({ line_number: 2, explanation: "Initializing result tracked variables.", variables: { res: "''", resLen: 0 }, array: s.split('') }));
    for (let i = 0; i < s.length; i++) {
      steps.push(createStep({ line_number: 3, explanation: `Expanding from center i=${i} ('${s[i]}')`, pointers: { i }, array: s.split(''), highlights: [i] }));

      // Odd expansion
      let L1 = i, R1 = i;
      steps.push(createStep({ line_number: 5, explanation: `Checking odd palindrome center at ${i}`, pointers: { i, L: L1, R: R1 }, array: s.split(''), highlights: [L1, R1] }));
      while (L1 >= 0 && R1 < s.length && s[L1] === s[R1]) {
        if ((R1 - L1 + 1) > resLen) {
          res = s.slice(L1, R1 + 1);
          resLen = R1 - L1 + 1;
          steps.push(createStep({ line_number: 7, explanation: `New longest palindrome: "${res}"`, variables: { res, resLen }, pointers: { i, L: L1, R: R1 }, array: s.split(''), highlights: Array.from({ length: resLen }, (_, k) => L1 + k) }));
        }
        L1--; R1++;
      }

      // Even expansion
      let L2 = i, R2 = i + 1;
      steps.push(createStep({ line_number: 11, explanation: `Checking even palindrome center between ${i} and ${i + 1}`, pointers: { i, L: L2, R: R2 }, array: s.split(''), highlights: [L2, R2] }));
      while (L2 >= 0 && R2 < s.length && s[L2] === s[R2]) {
        if ((R2 - L2 + 1) > resLen) {
          res = s.slice(L2, R2 + 1);
          resLen = R2 - L2 + 1;
          steps.push(createStep({ line_number: 13, explanation: `New longest palindrome: "${res}"`, variables: { res, resLen }, pointers: { i, L: L2, R: R2 }, array: s.split(''), highlights: Array.from({ length: resLen }, (_, k) => L2 + k) }));
        }
        L2--; R2++;
      }
    }
    steps.push(createStep({ line_number: 16, explanation: `Longest Palindrome Result: "${res}"`, variables: { result: res }, operation_type: 'match' }));
    return steps;
  }

  // 20. VALID PARENTHESES
  if (problemId === 'valid-parentheses') {
    const s = initialData || "()[]{}";
    const stack: string[] = [];
    const map: any = { ')': '(', ']': '[', '}': '{' };
    steps.push(createStep({ type: 'STACK', line_number: 2, explanation: "Initializing stack and bracket map.", variables: { stack: "[]", map: JSON.stringify(map) }, array: s.split('') }));
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      steps.push(createStep({ type: 'STACK', line_number: 3, explanation: `Processing character '${char}'`, pointers: { i }, array: s.split(''), highlights: [i] }));
      if (map[char]) {
        const top = stack.pop();
        steps.push(createStep({ type: 'STACK', line_number: 5, explanation: `Closing bracket '${char}'. Popped '${top}' from stack.`, variables: { stack: JSON.stringify(stack), popped: top, expected: map[char] }, operation_type: 'pop', array: s.split(''), highlights: [i] }));
        if (top !== map[char]) {
          steps.push(createStep({ type: 'STACK', line_number: 5, explanation: `Mismatch! Popped '${top}' does not match expected '${map[char]}'`, operation_type: 'error_warning' }));
          return steps;
        }
      } else {
        stack.push(char);
        steps.push(createStep({ type: 'STACK', line_number: 6, explanation: `Opening bracket '${char}'. Pushing to stack.`, variables: { stack: JSON.stringify(stack) }, operation_type: 'push', array: s.split(''), highlights: [i] }));
      }
    }
    const isValidRes = stack.length === 0;
    steps.push(createStep({ type: 'STACK', line_number: 8, explanation: `Scan complete. Stack length is ${stack.length}. Valid = ${isValidRes}`, variables: { isValid: isValidRes }, operation_type: 'match' }));
    return steps;
  }

  // 4. REVERSE LINKED LIST
  if (problemId === 'reverse-linked-list') {
    const data = initialData || [1, 2, 3, 4, 5];
    const nodes = data.map((v: any, i: number) => ({ value: v, next: i + 1 < data.length ? i + 1 : null }));
    let prev = null, curr: number | null = 0;
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: "Initializing pointers: prev=null, curr=head", variables: { prev: 'null', curr: nodes[0].value }, pointers: { curr: 0, prev: null }, linkedList: nodes }));
    while (curr !== null) {
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 3, explanation: "While curr is not null", pointers: { curr, prev }, linkedList: JSON.parse(JSON.stringify(nodes)) }));
      const next = nodes[curr].next;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: `Stashing next node: ${next !== null ? nodes[next].value : 'null'}`, variables: { next: next !== null ? nodes[next].value : 'null' }, pointers: { curr, prev, next }, linkedList: JSON.parse(JSON.stringify(nodes)) }));
      nodes[curr].next = prev;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 5, explanation: `Reversing link: curr.next points to ${prev !== null ? nodes[prev].value : 'null'}`, pointers: { curr, prev }, linkedList: JSON.parse(JSON.stringify(nodes)) }));
      prev = curr;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 6, explanation: `Moving prev forward to curr: ${nodes[prev].value}`, pointers: { prev, curr }, linkedList: JSON.parse(JSON.stringify(nodes)) }));
      curr = next;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 7, explanation: `Moving curr forward to next: ${curr !== null ? nodes[curr].value : 'null'}`, pointers: { prev, curr }, linkedList: JSON.parse(JSON.stringify(nodes)) }));
    }
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 9, explanation: "Reverse complete. Returning prev.", pointers: { prev }, linkedList: JSON.parse(JSON.stringify(nodes)), operation_type: 'match' }));
    return steps;
  }

  // 5. LINKED LIST CYCLE
  if (problemId === 'linked-list-cycle') {
    const data = initialData || [3, 2, 0, -4];
    const nodes = data.map((v: any, i: number) => ({ value: v, next: i + 1 < data.length ? i + 1 : (i === 3 ? 1 : null) }));
    let slow: number | null = 0, fast: number | null = 0;
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: "Initializing slow and fast pointers at head.", variables: { slow: nodes[0].value, fast: nodes[0].value }, pointers: { slow: 0, fast: 0 }, linkedList: nodes }));
    while (fast !== null && nodes[fast].next !== null) {
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 3, explanation: "While fast and fast.next are both not null", pointers: { slow, fast }, linkedList: nodes }));
      slow = nodes[slow!].next;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: `Move slow by one step to ${nodes[slow!].value}`, variables: { slow: nodes[slow!].value }, pointers: { slow, fast }, linkedList: nodes }));
      fast = nodes[nodes[fast!].next!].next;
      steps.push(createStep({ type: 'LINKED_LIST', line_number: 5, explanation: `Move fast by two steps to ${fast !== null ? nodes[fast].value : 'null'}`, variables: { fast: fast !== null ? nodes[fast].value : 'null' }, pointers: { slow, fast }, linkedList: nodes, highlights: [fast!] }));
      if (slow === fast) {
        steps.push(createStep({ type: 'LINKED_LIST', line_number: 6, explanation: "Cycle detected! slow and fast pointers match.", pointers: { slow, fast }, linkedList: nodes, operation_type: 'match', highlights: [slow!] }));
        return steps;
      }
    }
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 8, explanation: "Fast reached end. No cycle detected.", operation_type: 'match' }));
    return steps;
  }

  // 6. SPIRAL MATRIX
  if (problemId === 'spiral-matrix') {
    const matrix = initialData || [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const res: number[] = [];
    let left = 0, right = matrix[0].length - 1;
    let top = 0, bottom = matrix.length - 1;
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: "Initializing results array.", variables: { res: "[]" }, grid: matrix }));
    steps.push(createStep({ type: 'MATRIX', line_number: 3, explanation: `left=${left}, right=${right}`, variables: { left, right }, grid: matrix }));
    steps.push(createStep({ type: 'MATRIX', line_number: 4, explanation: `top=${top}, bottom=${bottom}`, variables: { top, bottom }, grid: matrix }));

    while (left <= right && top <= bottom) {
      steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: "Checking loop condition: left <= right && top <= bottom", variables: { left, right, top, bottom }, grid: matrix }));

      // Top row
      for (let i = left; i <= right; i++) {
        res.push(matrix[top][i]);
        steps.push(createStep({ type: 'MATRIX', line_number: 6, explanation: `Pushing ${matrix[top][i]} from top row`, variables: { res: JSON.stringify(res) }, highlights: [top * matrix[0].length + i], grid: matrix }));
      }
      top++;
      steps.push(createStep({ type: 'MATRIX', line_number: 7, explanation: `Moving top boundary down to ${top}`, variables: { top }, grid: matrix }));

      // Right column
      for (let i = top; i <= bottom; i++) {
        res.push(matrix[i][right]);
        steps.push(createStep({ type: 'MATRIX', line_number: 8, explanation: `Pushing ${matrix[i][right]} from right column`, variables: { res: JSON.stringify(res) }, highlights: [i * matrix[0].length + right], grid: matrix }));
      }
      right--;
      steps.push(createStep({ type: 'MATRIX', line_number: 9, explanation: `Moving right boundary left to ${right}`, variables: { right }, grid: matrix }));

      if (!(left <= right && top <= bottom)) break;

      // Bottom row
      for (let i = right; i >= left; i--) {
        res.push(matrix[bottom][i]);
        steps.push(createStep({ type: 'MATRIX', line_number: 10, explanation: `Pushing ${matrix[bottom][i]} from bottom row`, variables: { res: JSON.stringify(res) }, highlights: [bottom * matrix[0].length + i], grid: matrix }));
      }
      bottom--;
      steps.push(createStep({ type: 'MATRIX', line_number: 11, explanation: `Moving bottom boundary up to ${bottom}`, variables: { bottom }, grid: matrix }));

      // Left column
      for (let i = bottom; i >= top; i--) {
        res.push(matrix[i][left]);
        steps.push(createStep({ type: 'MATRIX', line_number: 12, explanation: `Pushing ${matrix[i][left]} from left column`, variables: { res: JSON.stringify(res) }, highlights: [i * matrix[0].length + left], grid: matrix }));
      }
      left++;
      steps.push(createStep({ type: 'MATRIX', line_number: 13, explanation: `Moving left boundary right to ${left}`, variables: { left }, grid: matrix }));
    }
    steps.push(createStep({ type: 'MATRIX', line_number: 13, explanation: "Returning spiral order.", variables: { res: JSON.stringify(res) }, grid: matrix, operation_type: 'match' }));
    return steps;
  }

  // 7. MAXIMUM DEPTH OF BINARY TREE
  if (problemId === 'maximum-depth-of-binary-tree') {
    const tree: TreeData = { value: 3, left: { value: 9 }, right: { value: 20, left: { value: 15 }, right: { value: 7 } } };
    const traverse = (node: any, depth: number, stack: string[]) => {
      const curStack = [...stack, `maxDepth(${node ? node.value : 'null'})`];
      if (!node) {
        steps.push(createStep({ type: 'TREE', line_number: 2, explanation: "Node is null. Base case: return 0.", tree, call_stack: curStack, variables: { depth: 0 } }));
        return 0;
      }
      steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Exploring node ${node.value}. Not null.`, tree, highlights: [node.value], call_stack: curStack }));
      const l = traverse(node.left, depth + 1, curStack);
      const r = traverse(node.right, depth + 1, curStack);
      const result = 1 + Math.max(l, r);
      steps.push(createStep({ type: 'TREE', line_number: 3, explanation: `Returning 1 + max(${l}, ${r}) = ${result} for node ${node.value}`, tree, highlights: [node.value], call_stack: curStack, variables: { result } }));
      return result;
    };
    traverse(tree, 1, []);
    return steps;
  }

  // 18. INVERT BINARY TREE
  if (problemId === 'invert-binary-tree') {
    const tree: TreeData = { value: 4, left: { value: 2, left: { value: 1 }, right: { value: 3 } }, right: { value: 7, left: { value: 6 }, right: { value: 9 } } };
    const invert = (node: any, stack: string[]) => {
      if (!node) return;
      const curStack = [...stack, `solve(${node.value})`];
      steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Swapping children of ${node.value}`, tree: JSON.parse(JSON.stringify(tree)), highlights: [node.value], call_stack: curStack, operation_type: 'swap' }));
      const tmp = node.left;
      node.left = node.right;
      node.right = tmp;
      invert(node.left, curStack);
      invert(node.right, curStack);
    };
    invert(tree, []);
    return steps;
  }

  // 24. MERGE INTERVALS
  if (problemId === 'merge-intervals') {
    const intervals = initialData || [[1, 3], [2, 6], [8, 10], [15, 18]];
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    steps.push(createStep({ line_number: 2, explanation: "Sorting intervals by start time.", variables: { original: JSON.stringify(intervals), sorted: JSON.stringify(sorted) }, array: sorted.map(i => `[${i}]`) }));
    const res = [sorted[0]];
    steps.push(createStep({ line_number: 3, explanation: `Initializing res with first interval: [${sorted[0]}]`, variables: { res: JSON.stringify(res) }, array: sorted.map(i => `[${i}]`), highlights: [0] }));
    for (let i = 1; i < sorted.length; i++) {
      steps.push(createStep({ line_number: 4, explanation: `Loop iteration i=${i}, interval=[${sorted[i]}]`, pointers: { i }, array: sorted.map(i => `[${i}]`), highlights: [i] }));
      let last = res[res.length - 1];
      steps.push(createStep({ line_number: 5, explanation: `Current last merged interval: [${last}]`, variables: { last: `[${last}]` }, array: sorted.map(i => `[${i}]`) }));
      if (sorted[i][0] <= last[1]) {
        const oldLastVal = [...last];
        last[1] = Math.max(last[1], sorted[i][1]);
        steps.push(createStep({ line_number: 6, explanation: `Overlap found! Overlapping ${JSON.stringify(oldLastVal)} and ${JSON.stringify(sorted[i])}. New last: [${last}]`, variables: { res: JSON.stringify(res) }, highlights: [i], operation_type: 'match' }));
      } else {
        res.push(sorted[i]);
        steps.push(createStep({ line_number: 7, explanation: `No overlap. Pushing [${sorted[i]}] to result.`, variables: { res: JSON.stringify(res) }, highlights: [i] }));
      }
    }
    steps.push(createStep({ line_number: 9, explanation: "Returning merged intervals.", variables: { result: JSON.stringify(res) }, operation_type: 'match' }));
    return steps;
  }

  // 25. INSERT INTERVAL
  if (problemId === 'insert-interval') {
    const intervals = [[1, 3], [6, 9]];
    const newInterval = [2, 5];
    let res: any[] = [], i = 0;
    steps.push(createStep({ line_number: 2, explanation: `Initializing res=[], i=0. NewInterval = [${newInterval}]`, variables: { res: "[]", i: 0, newInterval: `[${newInterval}]` }, array: intervals.map(int => `[${int}]`) }));

    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
      res.push(intervals[i]);
      steps.push(createStep({ line_number: 3, explanation: `Interval [${intervals[i]}] is before newInterval. Pushing to res.`, variables: { res: JSON.stringify(res), i: i + 1 }, pointers: { i }, array: intervals.map(int => `[${int}]`), highlights: [i] }));
      i++;
    }

    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
      steps.push(createStep({ line_number: 4, explanation: `Interval [${intervals[i]}] overlaps with newInterval [${newInterval}]. Merging...`, pointers: { i }, array: intervals.map(int => `[${int}]`), highlights: [i] }));
      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
      steps.push(createStep({ line_number: 5, explanation: `newInterval.start = min(${newInterval[0]}, ${intervals[i][0]}) -> ${newInterval[0]}`, variables: { newInterval: `[${newInterval}]` }, pointers: { i }, array: intervals.map(int => `[${int}]`) }));
      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
      steps.push(createStep({ line_number: 6, explanation: `newInterval.end = max(${newInterval[1]}, ${intervals[i][1]}) -> ${newInterval[1]}`, variables: { newInterval: `[${newInterval}]` }, pointers: { i }, array: intervals.map(int => `[${int}]`) }));
      i++;
      steps.push(createStep({ line_number: 7, explanation: "Moving to next interval.", variables: { i }, array: intervals.map(int => `[${int}]`) }));
    }

    res.push(newInterval);
    steps.push(createStep({ line_number: 9, explanation: `Pushing merged newInterval [${newInterval}] to res.`, variables: { res: JSON.stringify(res) }, array: intervals.map(int => `[${int}]`) }));

    while (i < intervals.length) {
      res.push(intervals[i]);
      steps.push(createStep({ line_number: 10, explanation: `Pushing remaining interval [${intervals[i]}] to res.`, variables: { res: JSON.stringify(res), i: i + 1 }, pointers: { i }, array: intervals.map(int => `[${int}]`), highlights: [i] }));
      i++;
    }
    steps.push(createStep({ line_number: 11, explanation: "Returning final intervals list.", variables: { result: JSON.stringify(res) }, operation_type: 'match' }));
    return steps;
  }

  // 26. NUMBER OF ISLANDS
  if (problemId === 'number-of-islands') {
    const grid = initialData || [["1", "1", "0"], ["1", "1", "0"], ["0", "0", "1"]];
    let count = 0;
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: "Initializing island count to 0.", variables: { count: 0 }, grid }));

    function dfs(r: number, c: number, callStack: string[]) {
      if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') {
        steps.push(createStep({ type: 'MATRIX', line_number: 4, explanation: `DFS(${r},${c}): Out of bounds or water.`, call_stack: [...callStack, `dfs(${r},${c})`], grid: JSON.parse(JSON.stringify(grid)) }));
        return;
      }
      steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `DFS(${r},${c}): Marking land as visited ('0').`, call_stack: [...callStack, `dfs(${r},${c})`], highlights: [r * grid[0].length + c], grid: JSON.parse(JSON.stringify(grid)) }));
      grid[r][c] = '0';
      dfs(r + 1, c, [...callStack, `dfs(${r},${c})`]);
      dfs(r - 1, c, [...callStack, `dfs(${r},${c})`]);
      dfs(r, c + 1, [...callStack, `dfs(${r},${c})`]);
      dfs(r, c - 1, [...callStack, `dfs(${r},${c})`]);
    }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        steps.push(createStep({ type: 'MATRIX', line_number: 9, explanation: `Checking cell (${r},${c})`, pointers: { r, c }, grid: JSON.parse(JSON.stringify(grid)) }));
        if (grid[r][c] === '1') {
          count++;
          steps.push(createStep({ type: 'MATRIX', line_number: 10, explanation: `Found land! count=${count}. Starting DFS.`, variables: { count }, pointers: { r, c }, highlights: [r * grid[0].length + c], grid: JSON.parse(JSON.stringify(grid)) }));
          dfs(r, c, ["numIslands()"]);
        }
      }
    }
    steps.push(createStep({ type: 'MATRIX', line_number: 13, explanation: `Total islands found: ${count}`, variables: { result: count }, grid, operation_type: 'match' }));
    return steps;
  }

  // 27. CLONE GRAPH
  if (problemId === 'clone-graph') {
    // Using a simplified representation for visualization
    const adj = initialData || [[2, 4], [1, 3], [2, 4], [1, 3]];
    steps.push(createStep({ type: 'GRAPH', line_number: 2, explanation: "Checking if node exists.", variables: { node: "Node(1)" } }));
    steps.push(createStep({ type: 'GRAPH', line_number: 3, explanation: "Initializing oldToNew Map.", variables: { oldToNew: "{}" } }));
    steps.push(createStep({ type: 'GRAPH', line_number: 5, explanation: "Starting DFS traversal to clone nodes.", call_stack: ["dfs(node1)"] }));
    steps.push(createStep({ type: 'GRAPH', line_number: 7, explanation: "Creating copy of node 1.", variables: { oldToNew: "{1: Copy1}" }, operation_type: 'push' }));
    steps.push(createStep({ type: 'GRAPH', line_number: 9, explanation: "Cloning neighbors and returning copy.", operation_type: 'match' }));
    return steps;
  }

  // 28. TOP K FREQUENT ELEMENTS
  if (problemId === 'top-k-frequent-elements') {
    const nums = [1, 1, 1, 2, 2, 3], k = 2;
    const count: any = {};
    steps.push(createStep({ line_number: 2, explanation: "Initializing frequency counter.", variables: { count: "{}" }, array: nums }));
    for (let n of nums) {
      count[n] = (count[n] || 0) + 1;
      steps.push(createStep({ line_number: 3, explanation: `Counting ${n}: freq=${count[n]}`, variables: { count: JSON.stringify(count) }, array: nums }));
    }
    const bucket = Array.from({ length: nums.length + 1 }, () => []);
    steps.push(createStep({ line_number: 4, explanation: "Creating buckets for frequencies.", variables: { bucket: "Array(7)" }, array: nums }));
    for (let [n, f] of Object.entries(count)) {
      bucket[f as any].push(parseInt(n));
      steps.push(createStep({ line_number: 5, explanation: `Adding ${n} to bucket ${f}`, variables: { bucket: JSON.stringify(bucket) } }));
    }
    const res: number[] = [];
    for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
      if (bucket[i].length) {
        res.push(...bucket[i]);
        steps.push(createStep({ line_number: 8, explanation: `Pushing elements from bucket ${i} to result.`, variables: { res: JSON.stringify(res) }, array: nums }));
      }
    }
    steps.push(createStep({ line_number: 9, explanation: `Returning top ${k} elements.`, variables: { result: JSON.stringify(res.slice(0, k)) }, operation_type: 'match' }));
    return steps;
  }

  // 29. NON-OVERLAPPING INTERVALS
  if (problemId === 'non-overlapping-intervals') {
    const intervals = initialData || [[1, 2], [2, 3], [3, 4], [1, 3]];
    intervals.sort((a, b) => a[1] - b[1]);
    steps.push(createStep({ line_number: 2, explanation: "Sorting intervals by end time (Greedy).", variables: { sorted: JSON.stringify(intervals) }, array: intervals.map(i => `[${i}]`) }));
    let prevEnd = intervals[0][1], res = 0;
    steps.push(createStep({ line_number: 3, explanation: `Initial prevEnd=${prevEnd}, removals=${res}`, variables: { prevEnd, res }, array: intervals.map(i => `[${i}]`), highlights: [0] }));
    for (let i = 1; i < intervals.length; i++) {
      steps.push(createStep({ line_number: 4, explanation: `Checking interval [${intervals[i]}] against prevEnd ${prevEnd}`, pointers: { i }, array: intervals.map(i => `[${i}]`), highlights: [i] }));
      if (intervals[i][0] < prevEnd) {
        res++;
        steps.push(createStep({ line_number: 5, explanation: `Overlap found! Incrementing removals to ${res}`, variables: { res }, pointers: { i }, array: intervals.map(i => `[${i}]`), highlights: [i], operation_type: 'error_warning' }));
      } else {
        prevEnd = intervals[i][1];
        steps.push(createStep({ line_number: 6, explanation: `No overlap. Updating prevEnd to ${prevEnd}`, variables: { prevEnd }, pointers: { i }, array: intervals.map(i => `[${i}]`), highlights: [i] }));
      }
    }
    steps.push(createStep({ line_number: 8, explanation: `Minimum intervals to remove: ${res}`, variables: { result: res }, operation_type: 'match' }));
    return steps;
  }

  // 30. SUBTREE OF ANOTHER TREE
  if (problemId === 'subtree-of-another-tree') {
    const tree = { value: 3, left: { value: 4, left: { value: 1 }, right: { value: 2 } }, right: { value: 5 } };
    const subRoot = { value: 4, left: { value: 1 }, right: { value: 2 } };
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: "Checking if subRoot is null.", tree, operation_type: 'initialize' }));
    steps.push(createStep({ type: 'TREE', line_number: 3, explanation: "Checking if root is null.", tree }));
    steps.push(createStep({ type: 'TREE', line_number: 4, explanation: "Checking if trees match starting from root.", tree, operation_type: 'compare' }));
    steps.push(createStep({ type: 'TREE', line_number: 5, explanation: "Recursing on left and right children.", tree }));
    steps.push(createStep({ type: 'TREE', line_number: 8, explanation: "Returning true if match found in any node.", operation_type: 'match' }));
    return steps;
  }
  // 31. VALIDATE BINARY SEARCH TREE
  if (problemId === 'validate-binary-search-tree') {
    const tree = { value: 2, left: { value: 1 }, right: { value: 3 } };
    const validate = (node: any, min: number, max: number, callStack: string[]): boolean => {
      const curStack = [...callStack, `validate(${node ? node.value : 'null'}, ${min}, ${max})`];
      if (!node) {
        steps.push(createStep({ type: 'TREE', line_number: 3, explanation: "Node is null. Base case: return true.", tree, call_stack: curStack }));
        return true;
      }
      steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Checking if ${min} < ${node.value} < ${max}`, tree, highlights: [node.value], call_stack: curStack }));
      if (node.value <= min || node.value >= max) {
        steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Invalid BST! ${node.value} is not within (${min}, ${max})`, tree, highlights: [node.value], call_stack: curStack, operation_type: 'error_warning' }));
        return false;
      }
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Recursing on left and right children of ${node.value}`, tree, highlights: [node.value], call_stack: curStack }));
      return validate(node.left, min, node.value, curStack) && validate(node.right, node.value, max, curStack);
    };
    validate(tree, -Infinity, Infinity, ["isValidBST()"]);
    return steps;
  }

  // 32. KTH SMALLEST ELEMENT IN A BST
  if (problemId === 'kth-smallest-element-in-a-bst') {
    const tree = { value: 3, left: { value: 1, right: { value: 2 } }, right: { value: 4 } };
    const k = 1;
    let n = 0, stack: any[] = [], cur: any = tree;
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Initializing: n=0, stack=[], cur=root(${tree.value})`, variables: { n, k, stack: "[]", cur: tree.value }, tree }));
    while (cur || stack.length) {
      steps.push(createStep({ type: 'TREE', line_number: 3, explanation: "While cur is not null or stack is not empty", variables: { n, stack: JSON.stringify(stack.map(s => s.value)), cur: cur ? cur.value : 'null' }, tree }));
      while (cur) {
        steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Traversing left: pushing ${cur.value} to stack`, tree, highlights: [cur.value] }));
        stack.push(cur);
        steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Stack: [${stack.map(s => s.value)}]`, variables: { stack: JSON.stringify(stack.map(s => s.value)) }, tree }));
        cur = cur.left;
        steps.push(createStep({ type: 'TREE', line_number: 6, explanation: `Moving cur to cur.left: ${cur ? cur.value : 'null'}`, variables: { cur: cur ? cur.value : 'null' }, tree }));
      }
      cur = stack.pop();
      steps.push(createStep({ type: 'TREE', line_number: 8, explanation: `Popped ${cur.value} from stack.`, variables: { cur: cur.value, stack: JSON.stringify(stack.map(s => s.value)) }, tree, highlights: [cur.value] }));
      n++;
      steps.push(createStep({ type: 'TREE', line_number: 9, explanation: `In-order visit #${n}: ${cur.value}`, variables: { n }, tree, highlights: [cur.value] }));
      if (n === k) {
        steps.push(createStep({ type: 'TREE', line_number: 10, explanation: `Found kth smallest (${k}): ${cur.value}`, variables: { result: cur.value }, tree, highlights: [cur.value], operation_type: 'match' }));
        return steps;
      }
      cur = cur.right;
      steps.push(createStep({ type: 'TREE', line_number: 11, explanation: `Moving cur to cur.right: ${cur ? cur.value : 'null'}`, variables: { cur: cur ? cur.value : 'null' }, tree }));
    }
    return steps;
  }

  // 33. LOWEST COMMON ANCESTOR OF A BST
  if (problemId === 'lowest-common-ancestor-of-a-binary-search-tree') {
    const tree = { value: 6, left: { value: 2 }, right: { value: 8 } };
    const p = 2, q = 8;
    let cur: any = tree;
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Starting at root (${cur.value}). Looking for LCA of ${p} and ${q}`, variables: { cur: cur.value, p, q }, tree }));
    while (cur) {
      steps.push(createStep({ type: 'TREE', line_number: 3, explanation: `Checking node ${cur.value}`, tree, highlights: [cur.value] }));
      if (p > cur.value && q > cur.value) {
        steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Both ${p} and ${q} are greater than ${cur.value}. Moving right.`, tree, highlights: [cur.value] }));
        cur = cur.right;
      } else if (p < cur.value && q < cur.value) {
        steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Both ${p} and ${q} are less than ${cur.value}. Moving left.`, tree, highlights: [cur.value] }));
        cur = cur.left;
      } else {
        steps.push(createStep({ type: 'TREE', line_number: 6, explanation: `LCA found at node ${cur.value}!`, variables: { result: cur.value }, tree, highlights: [cur.value], operation_type: 'match' }));
        return steps;
      }
    }
    return steps;
  }

  // 34. SET MATRIX ZEROES
  if (problemId === 'set-matrix-zeroes') {
    const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
    const R = matrix.length, C = matrix[0].length;
    let row0 = false;
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: `Initializing: R=${R}, C=${C}, row0=false`, variables: { R, C, row0 }, grid: JSON.parse(JSON.stringify(matrix)) }));
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        steps.push(createStep({ type: 'MATRIX', line_number: 4, explanation: `Checking cell (${r},${c}): ${matrix[r][c]}`, pointers: { r, c }, grid: JSON.parse(JSON.stringify(matrix)) }));
        if (matrix[r][c] === 0) {
          steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `Found 0 at (${r},${c}). Marking boundaries.`, highlights: [r * C + c], grid: JSON.parse(JSON.stringify(matrix)) }));
          matrix[0][c] = 0;
          steps.push(createStep({ type: 'MATRIX', line_number: 6, explanation: `Marking column ${c} header as 0.`, grid: JSON.parse(JSON.stringify(matrix)), highlights: [c] }));
          if (r > 0) {
            matrix[r][0] = 0;
            steps.push(createStep({ type: 'MATRIX', line_number: 7, explanation: `Marking row ${r} header as 0.`, grid: JSON.parse(JSON.stringify(matrix)), highlights: [r * C] }));
          } else {
            row0 = true;
            steps.push(createStep({ type: 'MATRIX', line_number: 7, explanation: "Marking first row to be zeroed later (row0=true).", variables: { row0 }, grid: JSON.parse(JSON.stringify(matrix)) }));
          }
        }
      }
    }
    for (let r = 1; r < R; r++) {
      for (let c = 1; c < C; c++) {
        if (matrix[0][c] === 0 || matrix[r][0] === 0) {
          matrix[r][c] = 0;
          steps.push(createStep({ type: 'MATRIX', line_number: 13, explanation: `Zeroing cell (${r},${c}) due to row/col mark.`, highlights: [r * C + c], grid: JSON.parse(JSON.stringify(matrix)) }));
        }
      }
    }
    if (matrix[0][0] === 0) {
      for (let r = 0; r < R; r++) matrix[r][0] = 0;
      steps.push(createStep({ type: 'MATRIX', line_number: 16, explanation: "Zeroing first column.", grid: JSON.parse(JSON.stringify(matrix)) }));
    }
    if (row0) {
      for (let c = 0; c < C; c++) matrix[0][c] = 0;
      steps.push(createStep({ type: 'MATRIX', line_number: 17, explanation: "Zeroing first row.", grid: JSON.parse(JSON.stringify(matrix)) }));
    }
    return steps;
  }

  // 35. ROTATE IMAGE
  if (problemId === 'rotate-image') {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let L = 0, R = matrix.length - 1;
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: `Initial boundaries: L=${L}, R=${R}`, variables: { L, R }, grid: JSON.parse(JSON.stringify(matrix)) }));
    while (L < R) {
      steps.push(createStep({ type: 'MATRIX', line_number: 3, explanation: `Processing layer with L=${L}, R=${R}`, variables: { L, R }, grid: JSON.parse(JSON.stringify(matrix)) }));
      for (let i = 0; i < R - L; i++) {
        let T = L, B = R;
        steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `Rotating element at offset ${i}`, pointers: { i }, highlights: [T * matrix.length + (L + i), (B - i) * matrix.length + L, B * matrix.length + (R - i), (T + i) * matrix.length + R], grid: JSON.parse(JSON.stringify(matrix)) }));
        let tmp = matrix[T][L + i];
        matrix[T][L + i] = matrix[B - i][L];
        matrix[B - i][L] = matrix[B][R - i];
        matrix[B][R - i] = matrix[T + i][R];
        matrix[T + i][R] = tmp;
        steps.push(createStep({ type: 'MATRIX', line_number: 9, explanation: "Four-way swap complete for this offset.", grid: JSON.parse(JSON.stringify(matrix)), operation_type: 'swap' }));
      }
      L++; R--;
      steps.push(createStep({ type: 'MATRIX', line_number: 11, explanation: `Layer complete. Moving inwards: L=${L}, R=${R}`, variables: { L, R }, grid: JSON.parse(JSON.stringify(matrix)) }));
    }
    steps.push(createStep({ type: 'MATRIX', line_number: 11, explanation: "Rotation complete.", grid: matrix, operation_type: 'match' }));
    return steps;
  }

  // 36. WORD SEARCH
  if (problemId === 'word-search') {
    const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
    const word = "ABCCED";
    const ROWS = board.length, COLS = board[0].length;
    let path = new Set<string>();
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: `Initializing: ROWS=${ROWS}, COLS=${COLS}, word="${word}"`, variables: { ROWS, COLS, word }, grid: board }));

    function dfs(r: number, c: number, i: number, callStack: string[]): boolean {
      const curStack = [...callStack, `dfs(${r}, ${c}, ${i})`];
      if (i === word.length) {
        steps.push(createStep({ type: 'MATRIX', line_number: 4, explanation: `Found full word "${word}"!`, call_stack: curStack, grid: board, operation_type: 'match' }));
        return true;
      }
      if (r < 0 || c < 0 || r >= ROWS || c >= COLS || board[r][c] !== word[i] || path.has(`${r},${c}`)) {
        steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `DFS(${r},${c},${i}): Invalid step (wrong char or visited or out of bounds).`, call_stack: curStack, grid: board }));
        return false;
      }

      steps.push(createStep({ type: 'MATRIX', line_number: 6, explanation: `Found '${word[i]}' at (${r},${c}). Adding to path.`, highlights: [r * COLS + c], call_stack: curStack, grid: board }));
      path.add(`${r},${c}`);

      const res = dfs(r + 1, c, i + 1, curStack) || dfs(r - 1, c, i + 1, curStack) || dfs(r, c + 1, i + 1, curStack) || dfs(r, c - 1, i + 1, curStack);

      if (!res) {
        path.delete(`${r},${c}`);
        steps.push(createStep({ type: 'MATRIX', line_number: 8, explanation: `Backtracking from (${r},${c}). Removing from path.`, call_stack: curStack, grid: board }));
      }
      return res;
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        steps.push(createStep({ type: 'MATRIX', line_number: 12, explanation: `Starting search from (${r},${c})`, pointers: { r, c }, grid: board }));
        if (dfs(r, c, 0, ["exist()"])) return steps;
      }
    }
    return steps;
  }

  // 37. COURSE SCHEDULE
  if (problemId === 'course-schedule') {
    const numCourses = 2, prerequisites = [[1, 0]];
    const adj = Array.from({ length: numCourses }, () => [] as number[]);
    steps.push(createStep({ type: 'GRAPH', line_number: 2, explanation: "Initializing adjacency list.", variables: { adj: JSON.stringify(adj) } }));
    for (let [c, p] of prerequisites) {
      adj[p].push(c);
      steps.push(createStep({ type: 'GRAPH', line_number: 3, explanation: `Adding edge: ${p} -> ${c}`, variables: { adj: JSON.stringify(adj) }, highlights: [p, c] }));
    }
    const visit = new Set<number>();
    steps.push(createStep({ type: 'GRAPH', line_number: 4, explanation: "Initializing visit set for cycle detection.", variables: { visit: "{}" } }));

    function dfs(c: number, callStack: string[]): boolean {
      const curStack = [...callStack, `dfs(${c})`];
      if (visit.has(c)) {
        steps.push(createStep({ type: 'GRAPH', line_number: 6, explanation: `Cycle detected at course ${c}!`, call_stack: curStack, operation_type: 'error_warning' }));
        return false;
      }
      if (adj[c].length === 0) {
        steps.push(createStep({ type: 'GRAPH', line_number: 7, explanation: `Course ${c} has no prerequisites.`, call_stack: curStack }));
        return true;
      }
      steps.push(createStep({ type: 'GRAPH', line_number: 8, explanation: `Visiting course ${c}. Adding to visit set.`, variables: { visit: Array.from(visit).join(',') }, call_stack: curStack, highlights: [c] }));
      visit.add(c);
      for (let nei of adj[c]) {
        if (!dfs(nei, curStack)) return false;
      }
      visit.delete(c);
      adj[c] = [];
      steps.push(createStep({ type: 'GRAPH', line_number: 10, explanation: `Course ${c} and its dependencies are safe. Clearing adj cache.`, call_stack: curStack, highlights: [c] }));
      return true;
    }
    for (let i = 0; i < numCourses; i++) {
      if (!dfs(i, ["canFinish()"])) {
        steps.push(createStep({ type: 'GRAPH', line_number: 12, explanation: "Cannot finish all courses.", operation_type: 'match' }));
        return steps;
      }
    }
    steps.push(createStep({ type: 'GRAPH', line_number: 13, explanation: "All courses can be finished.", operation_type: 'match' }));
    return steps;
  }

  // 38. PACIFIC ATLANTIC WATER FLOW
  if (problemId === 'pacific-atlantic-water-flow') {
    const heights = [[1, 2], [2, 1]];
    const R = heights.length, C = heights[0].length;
    const pac = new Set<string>(), atl = new Set<string>();
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: "Initializing Pacific and Atlantic reachability sets.", variables: { R, C }, grid: heights }));

    function dfs(r: number, c: number, visit: Set<string>, prevH: number, callStack: string[]) {
      const curStack = [...callStack, `dfs(${r},${c})`];
      if (r < 0 || c < 0 || r >= R || c >= C || visit.has(`${r},${c}`) || heights[r][c] < prevH) return;
      steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `Water flows to (${r},${c}) with height ${heights[r][c]}`, highlights: [r * C + c], call_stack: curStack, grid: heights }));
      visit.add(`${r},${c}`);
      dfs(r + 1, c, visit, heights[r][c], curStack);
      dfs(r - 1, c, visit, heights[r][c], curStack);
      dfs(r, c + 1, visit, heights[r][c], curStack);
      dfs(r, c - 1, visit, heights[r][c], curStack);
    }

    for (let c = 0; c < C; c++) {
      dfs(0, c, pac, heights[0][c], ["pac_dfs"]);
      dfs(R - 1, c, atl, heights[R - 1][c], ["atl_dfs"]);
    }
    for (let r = 0; r < R; r++) {
      dfs(r, 0, pac, heights[r][0], ["pac_dfs"]);
      dfs(r, C - 1, atl, heights[r][C - 1], ["atl_dfs"]);
    }

    let res: number[][] = [];
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (pac.has(`${r},${c}`) && atl.has(`${r},${c}`)) {
          res.push([r, c]);
          steps.push(createStep({ type: 'MATRIX', line_number: 11, explanation: `Cell (${r},${c}) flows to BOTH oceans!`, highlights: [r * C + c], grid: heights, operation_type: 'match' }));
        }
      }
    }
    return steps;
  }

  // 39. WORD BREAK
  if (problemId === 'word-break') {
    const s = "leetcode", wordDict = ["leet", "code"];
    const dp = new Array(s.length + 1).fill(false);
    dp[s.length] = true;
    steps.push(createStep({ line_number: 3, explanation: "DP[n] = true (base case: empty string matches)", variables: { dp: JSON.stringify(dp) }, array: s.split('') }));
    for (let i = s.length - 1; i >= 0; i--) {
      steps.push(createStep({ line_number: 4, explanation: `Checking substring starting at index ${i}`, pointers: { i }, array: s.split(''), variables: { dp: JSON.stringify(dp) } }));
      for (let w of wordDict) {
        steps.push(createStep({ line_number: 6, explanation: `Trying word: "${w}"`, pointers: { i }, array: s.split(''), highlights: Array.from({ length: w.length }, (_, k) => i + k) }));
        if (i + w.length <= s.length && s.slice(i, i + w.length) === w) {
          dp[i] = dp[i + w.length];
          steps.push(createStep({ line_number: 6, explanation: `Matched "${w}"! dp[${i}] = dp[${i + w.length}] = ${dp[i]}`, pointers: { i }, array: s.split(''), variables: { dp: JSON.stringify(dp) } }));
        }
        if (dp[i]) break;
      }
    }
    steps.push(createStep({ line_number: 10, explanation: `Can we break "${s}"? ${dp[0]}`, variables: { result: dp[0] }, operation_type: 'match' }));
    return steps;
  }

  // 40. IMPLEMENT TRIE
  // 40. IMPLEMENT TRIE
  if (problemId === 'implement-trie' || problemId === 'trie-prefix-tree') {
    const word = "apple";
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Initializing Trie. Inserting "${word}"`, tree: { value: "root" } }));
    let currentPrefix = "";
    for (let c of word) {
      currentPrefix += c;
      steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Finding/Creating node for '${c}'`, variables: { char: c, currentPrefix }, tree: { value: "root", left: { value: c } } }));
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Moving to node '${c}'`, tree: { value: c } }));
    }
    steps.push(createStep({ type: 'TREE', line_number: 7, explanation: `Marking node '${word[word.length - 1]}' as end of word.`, tree: { value: word[word.length - 1] }, operation_type: 'match' }));
    return steps;
  }

  // 41. GRAPH VALID TREE
  if (problemId === 'graph-valid-tree') {
    const n = 5, edges = [[0, 1], [0, 2], [0, 3], [1, 4]];
    const adj = Array.from({ length: n }, () => [] as number[]);
    for (let [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
    const visit = new Set<number>();
    function dfs(i: number, prev: number, callStack: string[]): boolean {
      const curStack = [...callStack, `dfs(${i}, ${prev})`];
      if (visit.has(i)) return false;
      visit.add(i);
      steps.push(createStep({ type: 'GRAPH', line_number: 8, explanation: `Visiting node ${i}.`, variables: { visit: Array.from(visit).join(',') }, call_stack: curStack, highlights: [i] }));
      for (let nei of adj[i]) {
        if (nei === prev) continue;
        if (!dfs(nei, i, curStack)) return false;
      }
      return true;
    }
    const res = dfs(0, -1, ["validTree()"]);
    steps.push(createStep({ type: 'GRAPH', line_number: 15, explanation: `Result: ${res && visit.size === n}`, operation_type: 'match' }));
    return steps;
  }

  // 42. CONNECTED COMPONENTS
  if (problemId === 'number-of-connected-components') {
    const n = 5, edges = [[0, 1], [1, 2], [3, 4]];
    const adj = Array.from({ length: n }, () => [] as number[]);
    for (let [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
    const visit = new Set<number>();
    let componentCount = 0;
    for (let i = 0; i < n; i++) {
      if (!visit.has(i)) {
        componentCount++;
        steps.push(createStep({ type: 'GRAPH', line_number: 11, explanation: `Found new component #${componentCount}.`, variables: { componentCount }, highlights: [i] }));
        const stack = [i];
        while (stack.length) {
          const node = stack.pop()!;
          if (!visit.has(node)) {
            visit.add(node);
            for (let nei of adj[node]) if (!visit.has(nei)) stack.push(nei);
          }
        }
      }
    }
    return steps;
  }

  // 43. SUM OF TWO INTEGERS
  if (problemId === 'sum-of-two-integers') {
    let a = 1, b = 2;
    if (Array.isArray(initialData) && initialData.length === 2) {
      a = initialData[0]; b = initialData[1];
    } else if (initialData && typeof initialData === 'object') {
      a = initialData.a !== undefined ? initialData.a : a;
      b = initialData.b !== undefined ? initialData.b : b;
    }

    steps.push(createStep({ line_number: 2, explanation: `Calculating sum of ${a} and ${b} without +`, variables: { a, b, a_bin: a.toString(2), b_bin: b.toString(2) } }));
    while (b !== 0) {
      const carry = (a & b) << 1;
      const xor = a ^ b;
      steps.push(createStep({ line_number: 4, explanation: `Carry = (a & b) << 1 = ${(a & b).toString(2)} << 1 = ${carry.toString(2)} (${carry})`, variables: { a, b, carry, carry_bin: carry.toString(2) } }));
      steps.push(createStep({ line_number: 5, explanation: `XOR = a ^ b = ${a.toString(2)} ^ ${b.toString(2)} = ${xor.toString(2)} (${xor})`, variables: { a, b, xor, xor_bin: xor.toString(2) } }));
      a = xor;
      b = carry;
      steps.push(createStep({ line_number: 6, explanation: `Updated: a = XOR = ${a}, b = Carry = ${b}`, variables: { a, b } }));
    }
    steps.push(createStep({ line_number: 9, explanation: `Sum complete: ${a}`, variables: { result: a }, operation_type: 'match' }));
    return steps;
  }

  // 44. NUMBER OF 1 BITS
  if (problemId === 'number-of-1-bits') {
    let n = 11, res = 0;
    while (n !== 0) {
      n &= (n - 1);
      res++;
      steps.push(createStep({ line_number: 3, explanation: `Matched bit. Count=${res}`, variables: { n: n.toString(2), res } }));
    }
    return steps;
  }

  // 45. COUNTING BITS
  if (problemId === 'counting-bits') {
    const n = 5, res = new Array(n + 1).fill(0);
    let offset = 1;
    for (let i = 1; i <= n; i++) {
      if (offset * 2 === i) offset = i;
      res[i] = 1 + res[i - offset];
      steps.push(createStep({ line_number: 6, explanation: `res[${i}] = ${res[i]}`, variables: { res: JSON.stringify(res) }, array: res }));
    }
    return steps;
  }

  // 46. REVERSE BITS
  if (problemId === 'reverse-bits') {
    let n = initialData || 43261596;
    if (typeof initialData === 'object' && initialData.n !== undefined) n = initialData.n;

    let res = 0;
    steps.push(createStep({ line_number: 2, explanation: `Reversing bits for ${n}\nBinary: ${n.toString(2).padStart(32, '0')}`, variables: { res: 0, n_bin: n.toString(2).padStart(32, '0') } }));

    for (let i = 0; i < 32; i++) {
      let bit = (n >> i) & 1;
      res = (res | (bit << (31 - i))) >>> 0;
      if (bit === 1 || i % 8 === 0) { // Batch steps to avoid explosion
        steps.push(createStep({ line_number: 4, explanation: `Bit ${i} is ${bit}. Placing at position ${31 - i}.`, variables: { i, bit, res_bin: res.toString(2).padStart(32, '0') }, pointers: { i } }));
      }
    }
    steps.push(createStep({ line_number: 6, explanation: `Final reversed result: ${res}\nBinary: ${res.toString(2).padStart(32, '0')}`, variables: { result: res }, operation_type: 'match' }));
    return steps;
  }

  // 47. MISSING NUMBER
  if (problemId === 'missing-number') {
    const nums = initialData || [3, 0, 1];
    let res = nums.length;
    steps.push(createStep({ line_number: 2, explanation: `Initializing res = nums.length = ${res}`, variables: { res }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      res += i - nums[i];
      steps.push(createStep({ line_number: 3, explanation: `res += ${i} - ${nums[i]} -> ${res}`, variables: { res }, pointers: { i }, array: nums, highlights: [i] }));
    }
    steps.push(createStep({ line_number: 4, explanation: `Missing number: ${res}`, operation_type: 'match' }));
    return steps;
  }

  // 48. COIN CHANGE
  if (problemId === 'coin-change') {
    const coins = [1, 2, 5], amount = 11;
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    steps.push(createStep({ line_number: 3, explanation: "DP array initialized with ∞. DP[0]=0.", variables: { dp: JSON.stringify(dp) }, array: dp }));
    for (let a = 1; a <= amount; a++) {
      for (let c of coins) {
        if (a - c >= 0) {
          const oldVal = dp[a];
          dp[a] = Math.min(dp[a], 1 + dp[a - c]);
          if (dp[a] !== oldVal) {
            steps.push(createStep({ line_number: 6, explanation: `Updating dp[${a}] using coin ${c}: min(${oldVal}, 1 + dp[${a - c}]) = ${dp[a]}`, pointers: { a }, variables: { dp: JSON.stringify(dp) }, array: dp, highlights: [a, a - c] }));
          }
        }
      }
    }
    steps.push(createStep({ line_number: 10, explanation: `Minimum coins: ${dp[amount]}`, operation_type: 'match' }));
    return steps;
  }

  // 49. LONGEST INCREASING SUBSEQUENCE
  if (problemId === 'longest-increasing-subsequence') {
    const nums = initialData || [10, 9, 2, 5, 3];
    const dp = new Array(nums.length).fill(1);
    steps.push(createStep({ line_number: 2, explanation: "Initializing DP array with 1.", variables: { dp: JSON.stringify(dp) }, array: nums }));
    for (let i = nums.length - 1; i >= 0; i--) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] < nums[j]) {
          dp[i] = Math.max(dp[i], 1 + dp[j]);
          steps.push(createStep({ line_number: 6, explanation: `nums[${i}] < nums[${j}]. dp[${i}] = max(${dp[i]}, 1 + dp[${j}])`, pointers: { i, j }, variables: { dp: JSON.stringify(dp) }, array: nums, highlights: [i, j] }));
        }
      }
    }
    steps.push(createStep({ line_number: 9, explanation: `LIS length: ${Math.max(...dp)}`, operation_type: 'match' }));
    return steps;
  }

  // 50. LONGEST COMMON SUBSEQUENCE
  if (problemId === 'longest-common-subsequence') {
    const text1 = "abc", text2 = "ace";
    const dp = Array.from({ length: text1.length + 1 }, () => new Array(text2.length + 1).fill(0));
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: "Initializing DP table.", grid: dp }));
    for (let i = text1.length - 1; i >= 0; i--) {
      for (let j = text2.length - 1; j >= 0; j--) {
        if (text1[i] === text2[j]) {
          dp[i][j] = 1 + dp[i + 1][j + 1];
          steps.push(createStep({ type: 'MATRIX', line_number: 6, explanation: `Match! text1[${i}] === text2[${j}] ('${text1[i]}'). dp[${i}][${j}] = 1 + dp[${i + 1}][${j + 1}] = ${dp[i][j]}`, highlights: [i * (text2.length + 1) + j, (i + 1) * (text2.length + 1) + (j + 1)], grid: dp }));
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
          steps.push(createStep({ type: 'MATRIX', line_number: 7, explanation: `Mismatch. dp[${i}][${j}] = max(dp[${i + 1}][${j}], dp[${i}][${j + 1}]) = ${dp[i][j]}`, highlights: [(i + 1) * (text2.length + 1) + j, i * (text2.length + 1) + (j + 1)], grid: dp }));
        }
      }
    }
    return steps;
  }

  // 51. COMBINATION SUM
  if (problemId === 'combination-sum') {
    const candidates = [2, 3, 6, 7], target = 7;
    const res: number[][] = [];
    steps.push(createStep({ line_number: 2, explanation: `Target: ${target}, Candidates: [${candidates}]`, variables: { target, candidates: JSON.stringify(candidates), res: "[]" }, array: candidates }));
    function dfs(i: number, cur: number[], total: number, callStack: string[]) {
      const curStack = [...callStack, `dfs(i=${i}, cur=[${cur}], total=${total})`];
      if (total === target) {
        res.push([...cur]);
        steps.push(createStep({ line_number: 4, explanation: `Target reached! Adding [${cur}] to result.`, variables: { res: JSON.stringify(res) }, call_stack: curStack, array: candidates, operation_type: 'match' }));
        return;
      }
      if (i >= candidates.length || total > target) {
        steps.push(createStep({ line_number: 5, explanation: total > target ? "Total exceeded target." : "Index out of bounds.", call_stack: curStack, array: candidates }));
        return;
      }
      steps.push(createStep({ line_number: 6, explanation: `Adding ${candidates[i]} to current path.`, call_stack: curStack, highlights: [i], array: candidates }));
      cur.push(candidates[i]);
      dfs(i, cur, total + candidates[i], curStack);
      cur.pop();
      steps.push(createStep({ line_number: 8, explanation: `Backtracking: removing ${candidates[i]} from current path.`, call_stack: curStack, highlights: [i], array: candidates }));
      dfs(i + 1, cur, total, curStack);
    }
    dfs(0, [], 0, ["combinationSum()"]);
    return steps;
  }

  // 52. HOUSE ROBBER
  if (problemId === 'house-robber') {
    const nums = initialData || [1, 2, 3, 1];
    let r1 = 0, r2 = 0;
    steps.push(createStep({ line_number: 2, explanation: "Initializing r1=0, r2=0", variables: { r1, r2 }, array: nums }));
    for (let i = 0; i < nums.length; i++) {
      let n = nums[i];
      let tmp = Math.max(n + r1, r2);
      steps.push(createStep({ line_number: 4, explanation: `House ${i} ($${n}): tmp = max(${n} + ${r1}, ${r2}) = ${tmp}`, variables: { r1, r2, tmp }, pointers: { i }, highlights: [i], array: nums }));
      r1 = r2; r2 = tmp;
      steps.push(createStep({ line_number: 5, explanation: `Updated r1=${r1}, r2=${r2}`, variables: { r1, r2 }, array: nums }));
    }
    steps.push(createStep({ line_number: 7, explanation: `Max amount: ${r2}`, operation_type: 'match' }));
    return steps;
  }

  // 53. HOUSE ROBBER II
  if (problemId === 'house-robber-ii') {
    const nums = initialData || [2, 3, 2];
    steps.push(createStep({ line_number: 2, explanation: "Robbing houses in a circle. Max of (nums[0], helper(nums[1:]), helper(nums[:-1]))", array: nums }));
    const helper = (nArr: number[]) => {
      let r1 = 0, r2 = 0;
      for (let n of nArr) {
        let tmp = Math.max(n + r1, r2);
        r1 = r2; r2 = tmp;
      }
      return r2;
    };
    const res = Math.max(nums[0], helper(nums.slice(1)), helper(nums.slice(0, -1)));
    steps.push(createStep({ line_number: 2, explanation: `Result for circular robbery: ${res}`, variables: { result: res }, operation_type: 'match' }));
    return steps;
  }

  // 54. DECODE WAYS
  if (problemId === 'decode-ways') {
    const s = initialData || "226";
    const dp: any = { [s.length]: 1 };
    steps.push(createStep({ line_number: 2, explanation: `Base case: dp[${s.length}] = 1`, variables: { dp: JSON.stringify(dp) }, array: s.split('') }));
    for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] === '0') {
        dp[i] = 0;
        steps.push(createStep({ line_number: 4, explanation: `'0' at index ${i} has no decodings.`, pointers: { i }, variables: { dp: JSON.stringify(dp) }, array: s.split('') }));
      } else {
        dp[i] = dp[i + 1];
        steps.push(createStep({ line_number: 5, explanation: `Single digit at index ${i}: dp[${i}] = dp[${i + 1}] = ${dp[i]}`, pointers: { i }, variables: { dp: JSON.stringify(dp) }, array: s.split('') }));
        if (i + 1 < s.length && (s[i] === '1' || (s[i] === '2' && '0123456'.includes(s[i + 1])))) {
          dp[i] += dp[i + 2];
          steps.push(createStep({ line_number: 6, explanation: `Two digits at index ${i}: dp[${i}] += dp[${i + 2}] = ${dp[i]}`, pointers: { i }, variables: { dp: JSON.stringify(dp) }, array: s.split(''), highlights: [i, i + 1] }));
        }
      }
    }
    steps.push(createStep({ line_number: 8, explanation: `Total ways: ${dp[0]}`, operation_type: 'match' }));
    return steps;
  }

  // 55. UNIQUE PATHS
  if (problemId === 'unique-paths') {
    const m = 3, n = 7;
    let row = new Array(n).fill(1);
    steps.push(createStep({ type: 'MATRIX', line_number: 2, explanation: "Initializing last row with 1s.", variables: { row: JSON.stringify(row) }, grid: [row] }));
    for (let i = 0; i < m - 1; i++) {
      let nextRow = new Array(n).fill(1);
      for (let j = n - 2; j >= 0; j--) {
        nextRow[j] = nextRow[j + 1] + row[j];
        steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `Cell [${i},${j}]: paths from right (${nextRow[j + 1]}) + paths from below (${row[j]}) = ${nextRow[j]}`, variables: { row: JSON.stringify(row), nextRow: JSON.stringify(nextRow) }, grid: [nextRow, row] }));
      }
      row = nextRow;
    }
    steps.push(createStep({ line_number: 8, explanation: `Total unique paths: ${row[0]}`, operation_type: 'match' }));
    return steps;
  }

  // 56. JUMP GAME
  if (problemId === 'jump-game') {
    const nums = initialData || [2, 3, 1, 1, 4];
    let goal = nums.length - 1;
    steps.push(createStep({ line_number: 2, explanation: `Starting Greedy approach. Initial goal: index ${goal}`, variables: { goal }, array: nums, highlights: [goal] }));
    for (let i = nums.length - 1; i >= 0; i--) {
      steps.push(createStep({ line_number: 3, explanation: `Checking index ${i}: can we reach current goal ${goal}?`, pointers: { i }, highlights: [i, goal], array: nums }));
      if (i + nums[i] >= goal) {
        goal = i;
        steps.push(createStep({ line_number: 3, explanation: `Matched! New goal: index ${goal}`, variables: { goal }, pointers: { i }, array: nums, highlights: [goal] }));
      }
    }
    steps.push(createStep({ line_number: 4, explanation: `Goal reached index 0? ${goal === 0}`, variables: { result: goal === 0 }, operation_type: 'match' }));
    return steps;
  }

  // 57. MEETING ROOMS
  if (problemId === 'meeting-rooms') {
    const intervals = [[0, 30], [5, 10], [15, 20]];
    intervals.sort((a, b) => a[0] - b[0]);
    steps.push(createStep({ line_number: 2, explanation: "Sorted intervals by start time.", array: intervals.map(i => `[${i}]`) }));
    for (let i = 0; i < intervals.length - 1; i++) {
      steps.push(createStep({ line_number: 3, explanation: `Comparing interval ${i} with ${i + 1}`, pointers: { i }, highlights: [i, i + 1], array: intervals.map(i => `[${i}]`) }));
      if (intervals[i][1] > intervals[i + 1][0]) {
        steps.push(createStep({ line_number: 4, explanation: `Conflict found! ${intervals[i][1]} > ${intervals[i + 1][0]}`, operation_type: 'error_warning', array: intervals.map(i => `[${i}]`) }));
        return steps;
      }
    }
    steps.push(createStep({ line_number: 6, explanation: "No conflicts. All meetings can be attended.", operation_type: 'match' }));
    return steps;
  }

  // 58. MEETING ROOMS II
  if (problemId === 'meeting-rooms-ii') {
    const intervals = [[0, 30], [5, 10], [15, 20]];
    const start = intervals.map(i => i[0]).sort((a, b) => a - b);
    const end = intervals.map(i => i[1]).sort((a, b) => a - b);
    let res = 0, count = 0, s = 0, eNum = 0;
    steps.push(createStep({ line_number: 4, explanation: "Initializing pointers and counts.", variables: { s, eNum, count, res }, array: start }));
    while (s < intervals.length) {
      if (start[s] < end[eNum]) {
        s++; count++;
        steps.push(createStep({ line_number: 6, explanation: `New meeting start at ${start[s - 1]}. Room needed. Count: ${count}`, variables: { s, count }, array: start, highlights: [s - 1] }));
      } else {
        eNum++; count--;
        steps.push(createStep({ line_number: 7, explanation: `Meeting end at ${end[eNum - 1]}. Room freed. Count: ${count}`, variables: { eNum, count }, array: end, highlights: [eNum - 1] }));
      }
      res = Math.max(res, count);
      steps.push(createStep({ line_number: 8, explanation: `Max rooms needed so far: ${res}`, variables: { res } }));
    }
    return steps;
  }

  // 59. MERGE TWO SORTED LISTS
  if (problemId === 'merge-two-sorted-lists') {
    const l1 = { value: 1, next: { value: 2, next: { value: 4 } } };
    const l2 = { value: 1, next: { value: 3, next: { value: 4 } } };
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: "Created dummy node.", variables: { head: "dummy" } }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: "Merging while both lists have nodes.", variables: { l1: 1, l2: 1 } }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 5, explanation: "Comparing values and appending smaller node.", operation_type: 'compare' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 9, explanation: "Appending remaining nodes if any.", operation_type: 'match' }));
    return steps;
  }

  // 60. MERGE K SORTED LISTS
  if (problemId === 'merge-k-sorted-lists' || problemId === 'merge-k-sorted-lists-heap') {
    const rawLists = initialData || [[1, 4, 5], [1, 3, 4], [2, 6]];
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: `Merging ${rawLists.length} sorted lists.`, variables: { k: rawLists.length, lists: JSON.stringify(rawLists) } }));

    // Simulate heap-based merge
    let heap = rawLists.map((list: any) => ({ val: list[0], listIdx: 0, data: list }));
    let res: number[] = [];

    steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: "Initializing min-heap with heads of all lists.", variables: { heap: JSON.stringify(heap) } }));

    while (heap.length > 0) {
      heap.sort((a: any, b: any) => a.val - b.val);
      const minNode = heap.shift()!;
      res.push(minNode.val);

      steps.push(createStep({ type: 'LINKED_LIST', line_number: 6, explanation: `Extracted ${minNode.val} from min-heap. Appending to result.`, variables: { res: JSON.stringify(res), heap: JSON.stringify(heap) }, operation_type: 'pop' }));

      if (minNode.listIdx + 1 < minNode.data.length) {
        const nextVal = minNode.data[minNode.listIdx + 1];
        heap.push({ val: nextVal, listIdx: minNode.listIdx + 1, data: minNode.data });
        steps.push(createStep({ type: 'LINKED_LIST', line_number: 8, explanation: `Pushing next value ${nextVal} from same list to heap.`, variables: { heap: JSON.stringify(heap) }, operation_type: 'push' }));
      }
    }

    steps.push(createStep({ type: 'LINKED_LIST', line_number: 12, explanation: "Merge complete.", variables: { result: JSON.stringify(res) }, operation_type: 'match' }));
    return steps;
  }


  // 61. LONGEST CONSECUTIVE SEQUENCE
  if (problemId === 'longest-consecutive-sequence') {
    const lcsNums: number[] = Array.isArray(initialData) ? initialData : [100, 4, 200, 1, 3, 2];
    const lcsSet = new Set(lcsNums);
    let lcsLongest = 0;
    steps.push(createStep({ line_number: 2, explanation: 'Built a Set of all numbers.', array: lcsNums }));
    for (const n of lcsNums) {
      if (!lcsSet.has((n as number) - 1)) {
        let lcsLen = 0, lcsCur = n as number;
        while (lcsSet.has(lcsCur)) { lcsLen++; lcsCur++; }
        lcsLongest = Math.max(lcsLongest, lcsLen);
        steps.push(createStep({ line_number: 8, explanation: `Sequence from ${n} length ${lcsLen}. Longest=${lcsLongest}`, variables: { lcsLongest }, array: lcsNums, operation_type: 'match' }));
      }
    }
    return steps;
  }

  // 62. ALIEN DICTIONARY
  if (problemId === 'alien-dictionary') {
    steps.push(createStep({ type: 'GRAPH', line_number: 2, explanation: 'Building adjacency list from adjacent word pairs.' }));
    steps.push(createStep({ type: 'GRAPH', line_number: 4, explanation: 'Comparing adjacent words to derive character ordering.', operation_type: 'compare' }));
    steps.push(createStep({ type: 'GRAPH', line_number: 10, explanation: 'DFS topological sort on character graph.', call_stack: ['dfs(c)'] }));
    steps.push(createStep({ type: 'GRAPH', line_number: 17, explanation: 'Reversed DFS post-order = alien alphabet.', operation_type: 'match' }));
    return steps;
  }

  // 63. REMOVE NTH NODE FROM END
  if (problemId === 'remove-nth-node-from-end') {
    const rnnN = 2;
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: `Dummy node created. n=${rnnN}.` }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 3, explanation: `Moving right pointer ${rnnN} steps ahead.` }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 5, explanation: 'Both pointers advance until right reaches end.' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 7, explanation: 'Removing target node by relinking.', operation_type: 'match' }));
    return steps;
  }

  // 64. REORDER LIST
  if (problemId === 'reorder-list') {
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: 'Finding middle using slow/fast pointers.' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: 'Reversing the second half of the list.', operation_type: 'swap' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 6, explanation: 'Merging first and reversed second half.', operation_type: 'match' }));
    return steps;
  }

  // 65. SAME TREE
  if (problemId === 'same-tree') {
    const stTree: TreeData = { value: 1, left: { value: 2 }, right: { value: 3 } };
    const stDfs = (p: any, q: any, cs: string[]): boolean => {
      const cS = [...cs, `stDfs(${p?.value ?? 'null'}, ${q?.value ?? 'null'})`];
      if (!p && !q) { steps.push(createStep({ type: 'TREE', line_number: 2, explanation: 'Both null — match.', tree: stTree, call_stack: cS, operation_type: 'match' })); return true; }
      if (p && q && p.value === q.value) { steps.push(createStep({ type: 'TREE', line_number: 3, explanation: `Both ${p.value}. Recursing.`, tree: stTree, highlights: [p.value], call_stack: cS })); return stDfs(p.left, q.left, cS) && stDfs(p.right, q.right, cS); }
      steps.push(createStep({ type: 'TREE', line_number: 4, explanation: 'Mismatch.', tree: stTree, operation_type: 'error_warning', call_stack: cS })); return false;
    };
    stDfs(stTree, stTree, ['isSameTree()']); return steps;
  }

  // 66. BINARY TREE LEVEL ORDER TRAVERSAL
  if (problemId === 'binary-tree-level-order-traversal') {
    const bfsT: TreeData = { value: 3, left: { value: 9 }, right: { value: 20, left: { value: 15 }, right: { value: 7 } } };
    const bfsQ: any[] = [bfsT]; let bfsLvl = 0;
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: 'Init queue with root.', tree: bfsT }));
    while (bfsQ.length) {
      const sz = bfsQ.length; const lv: number[] = [];
      for (let i = 0; i < sz; i++) { const nd = bfsQ.shift(); lv.push(nd.value); if (nd.left) bfsQ.push(nd.left); if (nd.right) bfsQ.push(nd.right); }
      bfsLvl++;
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Level ${bfsLvl}: [${lv}]`, variables: { level: bfsLvl, values: JSON.stringify(lv) }, tree: bfsT, highlights: lv }));
    }
    steps.push(createStep({ type: 'TREE', line_number: 9, explanation: 'Level order traversal complete.', operation_type: 'match' }));
    return steps;
  }

  // 67. BINARY TREE MAXIMUM PATH SUM
  if (problemId === 'binary-tree-maximum-path-sum') {
    const mpsT: TreeData = { value: -10, left: { value: 9 }, right: { value: 20, left: { value: 15 }, right: { value: 7 } } };
    let mpsMax = -Infinity;
    const mpsF = (node: any, cs: string[]): number => {
      if (!node) return 0;
      const cS = [...cs, `mpsF(${node.value})`];
      const lm = Math.max(0, mpsF(node.left, cS)); const rm = Math.max(0, mpsF(node.right, cS));
      const ps = node.value + lm + rm; mpsMax = Math.max(mpsMax, ps);
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Node ${node.value}: L=${lm} R=${rm} path=${ps} max=${mpsMax}`, tree: mpsT, highlights: [node.value], call_stack: cS, variables: { mpsMax } }));
      return node.value + Math.max(lm, rm);
    };
    mpsF(mpsT, ['maxPathSum()']); return steps;
  }

  // 68. SERIALIZE AND DESERIALIZE BINARY TREE
  if (problemId === 'serialize-and-deserialize-binary-tree') {
    const sdT: TreeData = { value: 1, left: { value: 2 }, right: { value: 3, left: { value: 4 }, right: { value: 5 } } };
    const sdArr: string[] = [];
    const sdF = (node: any, cs: string[]) => {
      if (!node) { sdArr.push('N'); steps.push(createStep({ type: 'TREE', line_number: 4, explanation: "Null -> 'N'", tree: sdT, call_stack: cs })); return; }
      sdArr.push(String(node.value));
      steps.push(createStep({ type: 'TREE', line_number: 5, explanation: `Serialize ${node.value}: [${sdArr}]`, tree: sdT, highlights: [node.value], call_stack: cs }));
      sdF(node.left, [...cs, `sd(${node.value})`]); sdF(node.right, [...cs, `sd(${node.value})`]);
    };
    sdF(sdT, ['serialize()']);
    steps.push(createStep({ type: 'TREE', line_number: 8, explanation: `Serialized: "${sdArr.join(',')}"`, variables: { serialized: sdArr.join(',') }, tree: sdT, operation_type: 'match' }));
    return steps;
  }

  // 69. CONSTRUCT BINARY TREE FROM PREORDER AND INORDER
  if (problemId === 'construct-binary-tree-from-preorder-and-inorder-traversal') {
    const cbPre = [3, 9, 20, 15, 7], cbIn = [9, 3, 15, 20, 7];
    const cbRoot = cbPre[0], cbMid = cbIn.indexOf(cbRoot);
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: `Root=preorder[0]=${cbRoot}`, tree: { value: cbRoot } }));
    steps.push(createStep({ type: 'TREE', line_number: 3, explanation: `${cbRoot} at inorder[${cbMid}]; ${cbMid} left, ${cbIn.length - cbMid - 1} right nodes.`, tree: { value: cbRoot } }));
    steps.push(createStep({ type: 'TREE', line_number: 4, explanation: 'Recursing left subtree.', tree: { value: cbRoot, left: { value: cbPre[1] } } }));
    steps.push(createStep({ type: 'TREE', line_number: 5, explanation: 'Recursing right subtree.', operation_type: 'match', tree: { value: cbRoot, left: { value: cbPre[1] }, right: { value: cbPre[cbMid + 1] } } }));
    return steps;
  }

  // 70. ADD AND SEARCH WORD
  if (problemId === 'add-and-search-word') {
    const aswWords: string[] = Array.isArray(initialData) ? initialData : ['bad', 'dad', 'mad'];
    let trie: any = { value: 'root', children: {} };

    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: "Initializing WordDictionary (Trie).", tree: trie }));

    for (const w of aswWords) {
      let cur = trie;
      for (const char of w) {
        if (!cur.children[char]) cur.children[char] = { value: char, children: {} };
        cur = cur.children[char];
        steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Adding '${char}' to Trie path for "${w}"`, variables: { word: w, char }, tree: JSON.parse(JSON.stringify(trie)) }));
      }
      cur.isEnd = true;
    }

    const searchWord = "b.d";
    steps.push(createStep({ type: 'TREE', line_number: 10, explanation: `Searching for pattern "${searchWord}" using DFS.`, variables: { searchWord }, tree: JSON.parse(JSON.stringify(trie)) }));

    // Simple search visualization
    steps.push(createStep({ type: 'TREE', line_number: 12, explanation: `Step 1: Found 'b' at root.`, highlights: ['b'], tree: JSON.parse(JSON.stringify(trie)) }));
    steps.push(createStep({ type: 'TREE', line_number: 12, explanation: `Step 2: '.' matches any child. Checking 'a'...`, highlights: ['a'], tree: JSON.parse(JSON.stringify(trie)) }));
    steps.push(createStep({ type: 'TREE', line_number: 12, explanation: `Step 3: Found 'd' as child of 'a'. Match complete!`, highlights: ['d'], tree: JSON.parse(JSON.stringify(trie)), operation_type: 'match' }));

    return steps;
  }

  // 71. MERGE K SORTED LISTS (HEAP)
  if (problemId === 'merge-k-sorted-lists-heap') {
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 2, explanation: 'Pushing all list heads into min-heap.' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 4, explanation: 'Extract min from heap and append to result.', operation_type: 'pop' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 5, explanation: 'Push next node from same list into heap.', operation_type: 'push' }));
    steps.push(createStep({ type: 'LINKED_LIST', line_number: 7, explanation: 'Heap empty — merge complete!', operation_type: 'match' }));
    return steps;
  }

  // 72. TRAPPING RAIN WATER
  if (problemId === 'trapping-rain-water') {
    const trHt: number[] = Array.isArray(initialData) ? initialData : [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    let trL = 0, trR = trHt.length - 1, trLM = 0, trRM = 0, trRes = 0;
    steps.push(createStep({ line_number: 2, explanation: `Two-pointer approach. L=${trL}, R=${trR}`, variables: { trL, trR, trLM, trRM, trRes }, array: trHt, pointers: { trL, trR } }));
    while (trL < trR) {
      steps.push(createStep({ line_number: 3, explanation: `h[L=${trL}]=${trHt[trL]}, h[R=${trR}]=${trHt[trR]}`, pointers: { trL, trR }, highlights: [trL, trR], array: trHt }));
      if (trHt[trL] < trHt[trR]) {
        if (trHt[trL] >= trLM) { trLM = trHt[trL]; steps.push(createStep({ line_number: 5, explanation: `New leftMax=${trLM}`, variables: { trLM }, pointers: { trL, trR }, array: trHt, highlights: [trL] })); }
        else { trRes += trLM - trHt[trL]; steps.push(createStep({ line_number: 6, explanation: `Trapped at L=${trL}: ${trLM - trHt[trL]}. Total=${trRes}`, variables: { trRes }, pointers: { trL, trR }, highlights: [trL], array: trHt })); }
        trL++;
      } else {
        if (trHt[trR] >= trRM) { trRM = trHt[trR]; steps.push(createStep({ line_number: 8, explanation: `New rightMax=${trRM}`, variables: { trRM }, pointers: { trL, trR }, array: trHt, highlights: [trR] })); }
        else { trRes += trRM - trHt[trR]; steps.push(createStep({ line_number: 9, explanation: `Trapped at R=${trR}: ${trRM - trHt[trR]}. Total=${trRes}`, variables: { trRes }, pointers: { trL, trR }, highlights: [trR], array: trHt })); }
        trR--;
      }
    }
    steps.push(createStep({ line_number: 12, explanation: `Total water: ${trRes}`, variables: { result: trRes }, operation_type: 'match' }));
    return steps;
  }

  // VALID ANAGRAM
  if (problemId === 'valid-anagram') {
    let s = "anagram", t = "nagaram";
    if (Array.isArray(initialData)) {
      if (initialData.length === 2 && typeof initialData[0] === 'string') {
        s = initialData[0]; t = initialData[1];
      } else if (typeof initialData[0] === 'string') {
        s = initialData.join('');
      }
    } else if (initialData && typeof initialData === 'object') {
      s = initialData.s || s;
      t = initialData.t || t;
    }

    if (s.length !== t.length) {
      steps.push(createStep({ line_number: 2, explanation: `Length mismatch: "${s}" (${s.length}) vs "${t}" (${t.length}). Not an anagram.`, operation_type: 'error_warning' }));
      return steps;
    }

    const vaMap: any = {};
    steps.push(createStep({ line_number: 4, explanation: `Building frequency map for "${s}"`, variables: { vaMap: "{}" }, array: s.split('') }));
    for (const char of s) {
      vaMap[char] = (vaMap[char] || 0) + 1;
      steps.push(createStep({ line_number: 4, explanation: `Increment count for '${char}': ${vaMap[char]}`, variables: { vaMap: JSON.stringify(vaMap) }, highlights: [s.indexOf(char)], array: s.split('') }));
    }

    steps.push(createStep({ line_number: 6, explanation: `Checking against "${t}"`, variables: { vaMap: JSON.stringify(vaMap) }, array: t.split('') }));
    for (let i = 0; i < t.length; i++) {
      const char = t[i];
      steps.push(createStep({ line_number: 6, explanation: `Processing '${char}' at index ${i}`, pointers: { i }, array: t.split(''), highlights: [i] }));
      if (!vaMap[char]) {
        steps.push(createStep({ line_number: 7, explanation: `Character '${char}' not found or zero count. Not an anagram!`, operation_type: 'error_warning', highlights: [i] }));
        return steps;
      }
      vaMap[char]--;
      steps.push(createStep({ line_number: 7, explanation: `Decrement count for '${char}': ${vaMap[char]}`, variables: { vaMap: JSON.stringify(vaMap) }, pointers: { i }, array: t.split(''), highlights: [i] }));
    }
    steps.push(createStep({ line_number: 9, explanation: 'All counts zero — valid anagram!', operation_type: 'match' }));
    return steps;
  }

  // CLIMBING STAIRS
  if (problemId === 'climbing-stairs') {
    const csN = 5; let csOne = 1, csTwo = 1;
    steps.push(createStep({ line_number: 2, explanation: `n=${csN}. Init one=1, two=1.`, variables: { one: csOne, two: csTwo, n: csN }, array: [csOne, csTwo] }));
    for (let i = 0; i < csN - 1; i++) {
      const tmp = csOne; csOne = csOne + csTwo; csTwo = tmp;
      steps.push(createStep({ line_number: 4, explanation: `Step ${i + 2}: one=${csOne}, two=${csTwo}`, variables: { one: csOne, two: csTwo }, pointers: { i }, array: [csOne, csTwo] }));
    }
    steps.push(createStep({ line_number: 8, explanation: `Ways to climb ${csN} stairs: ${csOne}`, variables: { result: csOne }, operation_type: 'match' }));
    return steps;
  }

  // BINARY SEARCH
  if (problemId === 'binary-search') {
    const bsNums: number[] = Array.isArray(initialData) ? initialData : [-1, 0, 3, 5, 9, 12];
    const bsTarget = 9; let bsLeft = 0, bsRight = bsNums.length - 1;
    steps.push(createStep({ line_number: 2, explanation: `target=${bsTarget}. L=${bsLeft}, R=${bsRight}`, variables: { left: bsLeft, right: bsRight, target: bsTarget }, pointers: { bsLeft, bsRight }, array: bsNums }));
    while (bsLeft <= bsRight) {
      const mid = Math.floor((bsLeft + bsRight) / 2);
      steps.push(createStep({ line_number: 3, explanation: `mid=${mid}, nums[mid]=${bsNums[mid]}`, variables: { left: bsLeft, right: bsRight, mid }, pointers: { bsLeft, bsRight, mid }, highlights: [mid], array: bsNums }));
      if (bsNums[mid] === bsTarget) { steps.push(createStep({ line_number: 4, explanation: `Found ${bsTarget} at index ${mid}!`, highlights: [mid], array: bsNums, operation_type: 'match' })); return steps; }
      else if (bsNums[mid] < bsTarget) { bsLeft = mid + 1; steps.push(createStep({ line_number: 5, explanation: `Too small. left=${bsLeft}`, variables: { left: bsLeft }, pointers: { bsLeft, bsRight }, array: bsNums })); }
      else { bsRight = mid - 1; steps.push(createStep({ line_number: 6, explanation: `Too large. right=${bsRight}`, variables: { right: bsRight }, pointers: { bsLeft, bsRight }, array: bsNums })); }
    }
    steps.push(createStep({ line_number: 9, explanation: 'Target not found. Return -1.', operation_type: 'match' }));
    return steps;
  }

  // LONGEST REPEATING CHARACTER REPLACEMENT
  if (problemId === 'longest-repeating-character-replacement') {
    const lrS: string = typeof initialData === 'string' ? initialData : 'AABABBA';
    const lrK = 1; const lrCnt: any = {}; let lrMaxF = 0, lrL = 0, lrRes = 0;
    steps.push(createStep({ line_number: 2, explanation: `s="${lrS}", k=${lrK}. Sliding window.`, variables: { k: lrK }, array: lrS.split('') }));
    for (let R = 0; R < lrS.length; R++) {
      lrCnt[lrS[R]] = (lrCnt[lrS[R]] || 0) + 1; lrMaxF = Math.max(lrMaxF, lrCnt[lrS[R]]);
      steps.push(createStep({ line_number: 4, explanation: `R=${R}('${lrS[R]}'): maxF=${lrMaxF} win=[${lrL}..${R}]`, variables: { R, lrL, lrMaxF }, pointers: { lrL, R }, array: lrS.split('') }));
      while ((R - lrL + 1) - lrMaxF > lrK) { lrCnt[lrS[lrL]]--; lrL++; steps.push(createStep({ line_number: 6, explanation: `Shrink: L=${lrL}`, variables: { lrL }, array: lrS.split('') })); }
      lrRes = Math.max(lrRes, R - lrL + 1);
      steps.push(createStep({ line_number: 8, explanation: `Valid win [${lrL}..${R}] len=${R - lrL + 1}. Best=${lrRes}`, variables: { lrRes }, array: lrS.split('') }));
    }
    steps.push(createStep({ line_number: 10, explanation: `Result: ${lrRes}`, operation_type: 'match' })); return steps;
  }

  // MINIMUM WINDOW SUBSTRING
  if (problemId === 'minimum-window-substring') {
    const mwS: string = typeof initialData === 'string' ? initialData : 'ADOBECODEBANC'; const mwT = 'ABC';
    const mwCT: any = {}; for (const c of mwT) mwCT[c] = (mwCT[c] || 0) + 1;
    const mwWin: any = {}; let mwHave = 0; const mwNeed = Object.keys(mwCT).length;
    let mwRes = [-1, -1]; let mwLen = Infinity; let mwL = 0;
    steps.push(createStep({ line_number: 4, explanation: `s="${mwS}", t="${mwT}". need=${mwNeed}.`, variables: { t: mwT, need: mwNeed, cT: JSON.stringify(mwCT) }, array: mwS.split('') }));
    for (let R = 0; R < mwS.length; R++) {
      const c = mwS[R]; mwWin[c] = (mwWin[c] || 0) + 1;
      if (mwCT[c] && mwWin[c] === mwCT[c]) { mwHave++; steps.push(createStep({ line_number: 8, explanation: `Satisfied '${c}': have=${mwHave}/${mwNeed}`, variables: { mwHave, mwNeed }, pointers: { mwL, R }, array: mwS.split('') })); }
      while (mwHave === mwNeed) {
        if ((R - mwL + 1) < mwLen) { mwRes = [mwL, R]; mwLen = R - mwL + 1; steps.push(createStep({ line_number: 11, explanation: `Min window: "${mwS.slice(mwL, R + 1)}" len=${mwLen}`, array: mwS.split('') })); }
        mwWin[mwS[mwL]]--; if (mwCT[mwS[mwL]] && mwWin[mwS[mwL]] < mwCT[mwS[mwL]]) mwHave--; mwL++;
      }
    }
    steps.push(createStep({ line_number: 16, explanation: `Min window: "${mwLen < Infinity ? mwS.slice(mwRes[0], mwRes[1] + 1) : 'none'}"`, operation_type: 'match' }));
    return steps;
  }

  // GROUP ANAGRAMS
  if (problemId === 'group-anagrams') {
    const gaStrs: string[] = Array.isArray(initialData) ? initialData : ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const gaRes: any = {};
    steps.push(createStep({ line_number: 2, explanation: 'Grouping anagrams by frequency key.', array: gaStrs }));
    for (const s of gaStrs) {
      const cnt = new Array(26).fill(0); for (const c of s) cnt[c.charCodeAt(0) - 97]++;
      const key = cnt.join(','); if (!gaRes[key]) gaRes[key] = []; gaRes[key].push(s);
      steps.push(createStep({ line_number: 6, explanation: `"${s}" -> group [${gaRes[key]}]`, variables: { groups: Object.values(gaRes).length }, array: gaStrs }));
    }
    steps.push(createStep({ line_number: 9, explanation: `${Object.values(gaRes).length} anagram groups.`, variables: { result: JSON.stringify(Object.values(gaRes)) }, operation_type: 'match' }));
    return steps;
  }

  // FIND MEDIAN FROM DATA STREAM
  if (problemId === 'find-median-from-data-stream') {
    const mfNums: number[] = Array.isArray(initialData) ? initialData : [1, 2, 3];
    const mfSm: number[] = [], mfLg: number[] = [];
    steps.push(createStep({ line_number: 2, explanation: 'Init small (maxHeap) and large (minHeap).' }));
    for (const n of mfNums) {
      mfSm.push(n); mfSm.sort((a, b) => b - a);
      if (mfSm.length && mfLg.length && mfSm[0] > mfLg[0]) { mfLg.push(mfSm.shift()!); mfLg.sort((a, b) => a - b); }
      if (mfSm.length > mfLg.length + 1) { mfLg.push(mfSm.shift()!); mfLg.sort((a, b) => a - b); }
      else if (mfLg.length > mfSm.length + 1) { mfSm.push(mfLg.shift()!); mfSm.sort((a, b) => b - a); }
      const med = mfSm.length === mfLg.length ? (mfSm[0] + mfLg[0]) / 2 : mfSm.length > mfLg.length ? mfSm[0] : mfLg[0];
      steps.push(createStep({ line_number: 9, explanation: `Added ${n}. small=[${mfSm}] large=[${mfLg}] Median=${med}`, variables: { median: med, small: JSON.stringify(mfSm), large: JSON.stringify(mfLg) }, operation_type: 'match' }));
    }
    return steps;
  }

  // 36. SAME TREE
  if (problemId === 'same-tree') {
    const p = { value: 1, left: { value: 2 }, right: { value: 3 } };
    const q = { value: 1, left: { value: 2 }, right: { value: 3 } };
    const isSame = (n1: any, n2: any, stack: string[]): boolean => {
      const curStack = [...stack, `isSameTree(${n1 ? n1.value : 'null'}, ${n2 ? n2.value : 'null'})`];
      if (!n1 && !n2) {
        steps.push(createStep({ type: 'TREE', line_number: 2, explanation: "Both nodes are null. Match!", call_stack: curStack }));
        return true;
      }
      if (!n1 || !n2 || n1.value !== n2.value) {
        steps.push(createStep({ type: 'TREE', line_number: 3, explanation: `Mismatch: n1=${n1 ? n1.value : 'null'}, n2=${n2 ? n2.value : 'null'}`, call_stack: curStack, operation_type: 'error_warning' }));
        return false;
      }
      steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Values match (${n1.value}). Checking children.`, highlights: [n1.value], call_stack: curStack }));
      return isSame(n1.left, n2.left, curStack) && isSame(n1.right, n2.right, curStack);
    };
    isSame(p, q, ["solve()"]);
    return steps;
  }

  // 37. BINARY TREE LEVEL ORDER TRAVERSAL
  if (problemId === 'binary-tree-level-order-traversal') {
    const tree = { value: 3, left: { value: 9 }, right: { value: 20, left: { value: 15 }, right: { value: 7 } } };
    const queue: any[] = [tree];
    const res: number[][] = [];
    steps.push(createStep({ type: 'TREE', line_number: 2, explanation: "Initializing BFS queue with root node.", variables: { queue: "[3]", res: "[]" }, tree }));
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: number[] = [];
      steps.push(createStep({ type: 'TREE', line_number: 4, explanation: `Processing level with ${levelSize} nodes.`, variables: { levelSize }, tree }));
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        currentLevel.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        steps.push(createStep({ type: 'TREE', line_number: 6, explanation: `Visited ${node.value}. Children added to queue.`, highlights: [node.value], variables: { currentLevel: JSON.stringify(currentLevel), queue: JSON.stringify(queue.map(n => n.value)) }, tree }));
      }
      res.push(currentLevel);
      steps.push(createStep({ type: 'TREE', line_number: 10, explanation: `Level complete: [${currentLevel}]`, variables: { res: JSON.stringify(res) }, tree }));
    }
    return steps;
  }

  // 38. WORD SEARCH
  if (problemId === 'word-search') {
    const grid = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
    const word = "ABCCED";
    function dfs(r: number, c: number, i: number, stack: string[]): boolean {
      const curStack = [...stack, `dfs(${r},${c},index=${i})`];
      if (i === word.length) return true;
      if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== word[i]) {
        return false;
      }
      const char = grid[r][c];
      grid[r][c] = "#"; // visit
      steps.push(createStep({ type: 'MATRIX', line_number: 5, explanation: `Matched '${char}' at (${r},${c}). Recursing...`, highlights: [r * grid[0].length + c], call_stack: curStack, grid: JSON.parse(JSON.stringify(grid)) }));
      const found = dfs(r + 1, c, i + 1, curStack) || dfs(r - 1, c, i + 1, curStack) || dfs(r, c + 1, i + 1, curStack) || dfs(r, c - 1, i + 1, curStack);
      grid[r][c] = char; // backtrack
      if (found) return true;
      steps.push(createStep({ type: 'MATRIX', line_number: 8, explanation: `Backtracking from (${r},${c})`, highlights: [r * grid[0].length + c], call_stack: curStack, grid: JSON.parse(JSON.stringify(grid)) }));
      return false;
    }
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (dfs(r, c, 0, ["exist()"])) {
          steps.push(createStep({ type: 'MATRIX', line_number: 12, explanation: `Found word "${word}"!`, operation_type: 'match', grid: JSON.parse(JSON.stringify(grid)) }));
          return steps;
        }
      }
    }
    return steps;
  }

  // BATCH 7-8 (61-75) placeholders

  if (steps.length === 0) {
    const arr = Array.isArray(initialData) ? initialData : typeof initialData === 'string' ? initialData.split('') : [1, 2, 3];
    steps.push(createStep({
      line_number: 1,
      explanation: `Starting visualization for ${problemId.replace(/-/g, ' ')}.`,
      array: arr,
      variables: { status: 'initializing' }
    }));
    steps.push(createStep({
      line_number: 2,
      explanation: "Executing logic...",
      array: arr,
      variables: { status: 'running' }
    }));
    steps.push(createStep({
      line_number: 3,
      explanation: "Completed successfully.",
      array: arr,
      variables: { status: 'done' },
      operation_type: 'match'
    }));
  }

  return steps;
};
