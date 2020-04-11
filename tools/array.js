// 快排
function quickSort(arr) {
  if (arr.length < 2) return arr
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
// console.log(quickSort([89, 32, 43, 65, 5, 21]))



// 把数组排成最小的数
function PrintMinNumber(numbers) {
  if (!numbers || numbers.length === 0) {
    return ''
  }
  return numbers.sort(compare).join('')
}

function compare(a, b) {
  console.log(a)
  console.log(b)
  const front = "" + a + b;
  const behind = "" + b + a;
  return front - behind;
}
// console.log(PrintMinNumber([3, 321, 32]))



// 第一个只出现一次的字符
// 时间复杂度O(n)
function FirstNotRepeatingCharOn(str) {
  if (!str.length) {
    return ''
  }
  let obj = {}
  for (let i = 0; i < str.length; i++) {
    if(obj[str[i]]) {
      obj[str[i]] += 1
    } else {
      obj[str[i]] = 1
    }
  }
  for (const key in obj) {
    if(obj[key] === 1) {
       return key
    }
  }
  return -1
}



// 时间复杂度O(n2)，因为indexOf自带O(n)
function FirstNotRepeatingChar(str) {
  if (!str.length) {
    return ''
  }
  for (let i = 0; i < str.length; i++) {
    if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i]
    }
  }
  return -1
}

// console.log(FirstNotRepeatingChar('qwekwqewqewqwqesdwefwfdsdcsl'))
// console.log(FirstNotRepeatingCharOn('qwekwqewqewqwqesdwefwfdsdcsl'))



// 调整数组顺序使奇数位于偶数前面
// 其实就是从开始找一个不是奇数的，再从末尾找一个不是偶数的，然后二个互换位置就完事
function reOrderArray(arr) {
  if (Array.isArray(arr) && Object.prototype.toString.call(arr) === '[object Array]') {
    let start = 0
    let end = arr.length - 1
    while (end > start) {
      while (arr[start] % 2 === 1) {
        start++
      }
      while (arr[end] % 2 === 0) {
        end --
      }
      if (start < end) [arr[start], arr[end]] = [arr[end], arr[start]]
    }
    return arr
  }
}

// console.log(reOrderArray([55, 6, 62, 7, 1, 2, 3, 4]))



// 构建乘积数组
function reOrderArray(arr) {
  const result = []
  if (Array.isArray(arr) && Object.prototype.toString.call(arr) === '[object Array]') {
    result[0] = 1
    for (let i = 1; i < arr.length; i++) {
      result[i] = result[i - 1] * arr[i - 1]
    }
    
    // 乘上三角
    // let temp = 1;
    // for (let i = arr.length - 2; i >= 0; i--) {
    //   temp = temp * arr[i + 1]
    //   result[i] = result[i] * temp
    // }
  }
  return result
}

console.log(reOrderArray([ 1, 2, 3, 4, 5, 6, 7, 8, 9]))