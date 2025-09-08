type Pizza = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: string;
};

const menu: Pizza[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister: number = 100;
let orderQueue: Order[] = [];
let nextOrderId: number = 1;

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
  const selectedPizza: Pizza | undefined = menu.find(
    (pizza) => pizza.name === pizzaName
  );
  if (!selectedPizza) {
    console.error("Pizza not found");
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  const order: Order | undefined = orderQueue.find(
    (order) => order.id === orderId
  );
  if (!order) {
    console.error("Order not found");
    return;
  }
  order.status = "completed";
  orderQueue = [...orderQueue, order];
  return order;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

// given a string, return a compressed string with number of each letter in the string
function compressing(s: string) {
  let compressedString = "";
  let count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      count++;
    } else {
      compressedString += s[i] + (count > 1 ? count : "");
      count = 1;
    }
  }
  return compressedString;
}
console.log(compressing("aabcccccaaa"))

// find longest common substring of two strings
function longestCommonSubstring(s1: string, s2: string) {
  let longest = "";
  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      let k = 0;
      while (
        k + i < s1.length &&
        k + j < s2.length &&
        s1.charAt(k + i) === s2.charAt(k + j)
      ) {
        k++;
      }
      if (k > longest.length) {
        longest = s1.substring(i, i + k);
      }
    }
  }
  return longest;
}

// Given a string s, return the longest palindromic substring in s.
function check(s: string, i:number, j:number):boolean {
  let left = i
  let right = j-1
  while (left < right) {
      if (s[left] != s[right]) {
          return false
      }
      left++
      right--
  }
  return true
}
function longestPalindrome(s: string): string {
  for (let i=s.length; i>0; i--) {
      for (let j=0; j<s.length - i + 1; j++) {
          if (check(s, j, j+i)) {
              return s.substring(j, j+i)
          }
      }
  }
  return ""
}

// Given a string s, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s: string): number {
  let longest = 0
  let start = 0
  let end = 0
  let map = new Map()
  while (end < s.length) {
      if (map.has(s[end])) {
          start = Math.max(start, map.get(s[end]) + 1)
      }
      map.set(s[end], end)
      longest = Math.max(longest, end - start + 1)
      end++
  }
  return longest
}

// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
function searchRange(nums: number[], target: number): number[] {
  let start = 0
  let end = nums.length - 1
  let mid = Math.floor((start + end) / 2)
  while (start <= end) {
      if (nums[mid] === target) {
          let left = mid
          let right = mid
          while (left > 0 && nums[left - 1] === target) {
              left--
          }
          while (right < nums.length - 1 && nums[right + 1] === target) {
              right++
          }
          return [left, right]
      } else if (nums[mid] < target) {
          start = mid + 1
      } else {
          end = mid - 1
      }
      mid = Math.floor((start + end) / 2)
  }
  return [-1, -1]
}

// Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between 
// any two elements of this subarray is less than or equal to limit.
function longestSubarray(nums: number[], limit: number): number {
  let start = 0
  let end = 0
  let max = 0
  let min = 0
  let map = new Map()
  while (end < nums.length) {
      map.set(nums[end], map.get(nums[end]) + 1 || 1)
      while (Math.abs(nums[end] - nums[start]) > limit) {
          map.set(nums[start], map.get(nums[start]) - 1)
          if (map.get(nums[start]) === 0) {
              map.delete(nums[start])
          }
          start++
      }
      max = Math.max(max, end - start + 1)
      end++
  }
  return max
}

//Given an integer array nums and two integers minK and maxK.
//Return the number of fixed-bound subarrays.
function countSubarrays(nums: number[], minK: number, maxK: number): number {
  let start = 0
  let end = 0
  let count = 0
  let min = 0
  let max = 0
  while (end < nums.length) {
      if (nums[end] < minK || nums[end] > maxK) {
          start = end + 1
          min = start
          max = start
      } else {
          if (nums[end] === minK) {
              min = end
          }
          if (nums[end] === maxK) {
              max = end
          }
          if (min < max) {
              count += max - min + 1
          }
      }
      end++
  }
  return count
}