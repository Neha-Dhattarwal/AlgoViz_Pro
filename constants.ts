
import { Problem, Difficulty } from './types';

const BLIND_75_RAW = [
  // --- ARRAYS ---
  { title: "Two Sum", cat: "Array", diff: "Easy", type: "ARRAY", desc: "Find indices of two numbers that add up to target.\nExample: nums = [2, 7, 11, 15], target = 9 -> Output: [0, 1]", input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", data: [2, 7, 11, 15] },
  { title: "Best Time to Buy and Sell Stock", cat: "Array", diff: "Easy", type: "ARRAY", desc: "Find max profit from a single buy/sell.\nExample: prices = [7, 1, 5, 3, 6, 4] -> Output: 5", input: "prices = [7, 1, 5, 3, 6, 4]", output: "5", data: [7, 1, 5, 3, 6, 4] },
  { title: "Contains Duplicate", cat: "Array", diff: "Easy", type: "ARRAY", desc: "Return true if any value appears twice.\nExample: nums = [1, 2, 3, 1] -> Output: true", input: "nums = [1, 2, 3, 1]", output: "true", data: [1, 2, 3, 1] },
  { title: "Product of Array Except Self", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Product of all elements except nums[i].\nExample: nums = [1, 2, 3, 4] -> Output: [24, 12, 8, 6]", input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]", data: [1, 2, 3, 4] },
  { title: "Maximum Subarray", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Find contiguous subarray with largest sum.\nExample: nums = [-2, 1, -3, 4, -1, 2, 1] -> Output: 6", input: "nums = [-2, 1, -3, 4, -1, 2, 1]", output: "6", data: [-2, 1, -3, 4, -1, 2, 1] },
  { title: "Maximum Product Subarray", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Find contiguous subarray with max product.\nExample: nums = [2, 3, -2, 4] -> Output: 6", input: "nums = [2, 3, -2, 4]", output: "6", data: [2, 3, -2, 4] },
  { title: "Find Minimum in Rotated Sorted Array", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Find min element in O(log n).\nExample: nums = [3, 4, 5, 1, 2] -> Output: 1", input: "nums = [3, 4, 5, 1, 2]", output: "1", data: [3, 4, 5, 1, 2] },
  { title: "Search in Rotated Sorted Array", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Search target in rotated array.\nExample: nums = [4, 5, 6, 7, 0, 1, 2], target = 0 -> Output: 4", input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", output: "4", data: [4, 5, 6, 7, 0, 1, 2] },
  { title: "3Sum", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Find all unique triplets summing to zero.\nExample: nums = [-1, 0, 1, 2, -1, -4] -> Output: [[-1,-1,2], [-1,0,1]]", input: "nums = [-1, 0, 1, 2, -1, -4]", output: "[[-1,-1,2], [-1,0,1]]", data: [-1, 0, 1, 2, -1, -4] },
  { title: "Container With Most Water", cat: "Array", diff: "Medium", type: "ARRAY", desc: "Max area between two vertical lines.\nExample: height = [1, 8, 6, 2, 5, 4, 8, 3, 7] -> Output: 49", input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", output: "49", data: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
  
  // --- STRINGS ---
  { title: "Longest Substring Without Repeating Characters", cat: "String", diff: "Medium", type: "ARRAY", desc: "Length of longest unique substring.\nExample: s = \"abcabcbb\" -> Output: 3", input: "s = \"abcabcbb\"", output: "3", data: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'] },
  { title: "Valid Anagram", cat: "String", diff: "Easy", type: "ARRAY", desc: "Check if t is rearrangement of s.\nExample: s = \"anagram\", t = \"nagaram\" -> Output: true", input: "s = \"anagram\", t = \"nagaram\"", output: "true", data: ['a', 'n', 'a', 'g', 'r', 'a', 'm'] },
  { title: "Valid Parentheses", cat: "String", diff: "Easy", type: "STACK", desc: "Check if brackets are closed correctly.\nExample: s = \"()[]{}\" -> Output: true", input: "s = \"()[]{}\"", output: "true", data: ['(', ')', '[', ']', '{', '}'] },

  // --- LINKED LIST ---
  { title: "Reverse Linked List", cat: "Linked List", diff: "Easy", type: "LINKED_LIST", desc: "Reverse singly linked list in-place.\nExample: head = [1, 2, 3, 4, 5] -> Output: [5, 4, 3, 2, 1]", input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", data: [1, 2, 3, 4, 5] },
  { title: "Linked List Cycle", cat: "Linked List", diff: "Easy", type: "LINKED_LIST", desc: "Detect cycle using Floyd's algorithm.\nExample: head = [3, 2, 0, -4] -> Output: true", input: "head = [3, 2, 0, -4], pos = 1", output: "true", data: [3, 2, 0, -4] },

  // --- MATRIX ---
  { title: "Spiral Matrix", cat: "Matrix", diff: "Medium", type: "MATRIX", desc: "Return all elements in spiral order.\nExample: matrix = [[1,2,3],[4,5,6],[7,8,9]] -> Output: [1,2,3,6,9,8,7,4,5]", input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },

  // --- TREES ---
  { title: "Maximum Depth of Binary Tree", cat: "Binary Tree", diff: "Easy", type: "TREE", desc: "Find deepest node level.\nExample: root = [3, 9, 20, null, null, 15, 7] -> Output: 3", input: "root = [3, 9, 20, null, null, 15, 7]", output: "3", data: [3, 9, 20, null, null, 15, 7] },
  { title: "Invert Binary Tree", cat: "Binary Tree", diff: "Easy", type: "TREE", desc: "Flip left and right children.\nExample: root = [4, 2, 7, 1, 3, 6, 9] -> Output: [4, 7, 2, 9, 6, 3, 1]", input: "root = [4, 2, 7, 1, 3, 6, 9]", output: "[4, 7, 2, 9, 6, 3, 1]", data: [4, 2, 7, 1, 3, 6, 9] },
];

const getSnippet = (title: string) => {
  switch (title) {
    case 'Two Sum':
      return `function solve(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}`;
    case 'Best Time to Buy and Sell Stock':
      return `function solve(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) minPrice = prices[i];
    const profit = prices[i] - minPrice;
    if (profit > maxProfit) maxProfit = profit;
  }
  return maxProfit;
}`;
    case 'Contains Duplicate':
      return `function solve(nums) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
  }
  return false;
}`;
    case 'Product of Array Except Self':
      return `function solve(nums) {
  const res = new Array(nums.length).fill(1);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`;
    case 'Maximum Subarray':
      return `function solve(nums) {
  let maxSum = nums[0];
  let curSum = 0;
  for (let n of nums) {
    if (curSum < 0) curSum = 0;
    curSum += n;
    maxSum = Math.max(maxSum, curSum);
  }
  return maxSum;
}`;
    case 'Maximum Product Subarray':
      return `function solve(nums) {
  let res = Math.max(...nums);
  let curMax = 1, curMin = 1;
  for (let n of nums) {
    let tmp = curMax * n;
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(tmp, n * curMin, n);
    res = Math.max(res, curMax);
  }
  return res;
}`;
    case 'Find Minimum in Rotated Sorted Array':
      return `function solve(nums) {
  let L = 0, R = nums.length - 1;
  while (L < R) {
    let M = Math.floor((L + R) / 2);
    if (nums[M] > nums[R]) L = M + 1;
    else R = M;
  }
  return nums[L];
}`;
    case 'Search in Rotated Sorted Array':
      return `function solve(nums, target) {
  let L = 0, R = nums.length - 1;
  while (L <= R) {
    let M = Math.floor((L + R) / 2);
    if (nums[M] === target) return M;
    if (nums[L] <= nums[M]) {
      if (target > nums[M] || target < nums[L]) L = M + 1;
      else R = M - 1;
    } else {
      if (target < nums[M] || target > nums[R]) R = M - 1;
      else L = M + 1;
    }
  }
  return -1;
}`;
    case '3Sum':
      return `function solve(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let L = i + 1, R = nums.length - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum > 0) R--;
      else if (sum < 0) L++;
      else {
        res.push([nums[i], nums[L], nums[R]]);
        L++;
        while (nums[L] === nums[L - 1] && L < R) L++;
      }
    }
  }
  return res;
}`;
    case 'Container With Most Water':
      return `function solve(height) {
  let L = 0, R = height.length - 1, res = 0;
  while (L < R) {
    let area = (R - L) * Math.min(height[L], height[R]);
    res = Math.max(res, area);
    if (height[L] < height[R]) L++;
    else R--;
  }
  return res;
}`;
    case 'Longest Substring Without Repeating Characters':
      return `function solve(s) {
  let L = 0, res = 0;
  const set = new Set();
  for (let R = 0; R < s.length; R++) {
    while (set.has(s[R])) {
      set.delete(s[L]);
      L++;
    }
    set.add(s[R]);
    res = Math.max(res, R - L + 1);
  }
  return res;
}`;
    case 'Valid Anagram':
      return `function solve(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let c of s) count[c] = (count[c] || 0) + 1;
  for (let c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`;
    case 'Valid Parentheses':
      return `function solve(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (let c of s) {
    if (map[c]) {
      if (stack.pop() !== map[c]) return false;
    } else stack.push(c);
  }
  return stack.length === 0;
}`;
    case 'Reverse Linked List':
      return `function solve(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`;
    case 'Linked List Cycle':
      return `function solve(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`;
    case 'Spiral Matrix':
      return `function solve(matrix) {
  const res = [];
  let L = 0, R = matrix[0].length - 1;
  let T = 0, B = matrix.length - 1;
  while (L <= R && T <= B) {
    for (let i = L; i <= R; i++) res.push(matrix[T][i]);
    T++;
    for (let i = T; i <= B; i++) res.push(matrix[i][R]);
    R--;
    if (!(L <= R && T <= B)) break;
    for (let i = R; i >= L; i--) res.push(matrix[B][i]);
    B--;
    for (let i = B; i >= T; i--) res.push(matrix[i][L]);
    L++;
  }
  return res;
}`;
    case 'Maximum Depth of Binary Tree':
      return `function solve(root) {
  if (!root) return 0;
  return 1 + Math.max(solve(root.left), solve(root.right));
}`;
    case 'Invert Binary Tree':
      return `function solve(root) {
  if (!root) return null;
  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;
  solve(root.left);
  solve(root.right);
  return root;
}`;
    default:
      return `function solve(input) {\n  console.log(input);\n}`;
  }
};

export const INITIAL_PROBLEMS: Problem[] = BLIND_75_RAW.map((p) => ({
  id: p.title.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '').replace(/'/g, '').replace(/,/g, ''),
  title: p.title,
  difficulty: p.diff as Difficulty,
  category: p.cat as any,
  visualType: p.type as any,
  description: p.desc,
  complexity: { 
    time: p.cat === 'Array' ? 'O(N)' : p.cat === 'Matrix' ? 'O(M*N)' : 'O(N log N)', 
    space: p.cat === 'Array' ? 'O(1)' : 'O(N)' 
  },
  example: { input: p.input, output: p.output },
  initialData: p.data,
  code: {
    javascript: getSnippet(p.title),
    python: `def solve(nums):\n    pass`,
    java: `class Solution {\n    public void solve(int[] nums) {}\n}`
  }
}));
