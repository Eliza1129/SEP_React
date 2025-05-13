/*
1. Write a JavaScript function that reverse a number.
Example x = 32243;
Expected Output : 34223
*/

function ReverseNumber(num){
    return parseInt(num.toString().split('').reverse().join(''));
}

let num = 32243;
console.log(ReverseNumber(num));

/*
2. Write a JavaScript function that checks whether a passed string is palindrome or not?
A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.
*/
function passedIsPalindrome(str){
    return str == str.split("").reverse().join("");
}
console.log(passedIsPalindrome("madam")); //true
console.log(passedIsPalindrome("nurses")); //false

/*
4. Write a JavaScript function that returns a passed string with letters in alphabetical order .
Example string : 'webmaster'
Expected Output : 'abeemrstw'
Assume punctuation and numbers symbols are not included in the passed string.
*/

function passedInAlphabetical(str){
    return str.split('').sort().join('');
}

console.log(passedInAlphabetical('webmaster'));

/*
5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string
in upper case.
Example string : 'the quick brown fox'
Expected Output : 'The Quick Brown Fox '
*/

function coverToUpper(str){
    return str.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(coverToUpper('the quick brown fox'))

/*
7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.
Note : As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here.
Example string : 'The quick brown fox'
Expected Output : 5
*/
function countVowel(str){
    let count = 0;
    let vowelvs = "aeiou";
    for (let i =0; i<str.length;i++){
        if (vowelvs.includes(str[i].toLowerCase())){
        count ++
    }
    }
    return count;   
}

console.log(countVowel('The quick brown fox'));
/*
8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.
Note : A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and
itself.
*/
function isPrime(num){
    if (typeof num !== 'number' || !Number.isInteger(num) || num < 2) {
        return false;
      }
    
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          return false; 
        }
      }
      return true; 
}

console.log(isPrime(24)); //false

/* 
9. Write a JavaScript function which accepts an argument and returns the type.
Note : There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.
*/


/*
14. Write a JavaScript function to convert an amount to coins.
Sample function : amountTocoins(46, [25, 10, 5, 2, 1])
Here 46 is the amount. and 25, 10, 5, 2, 1 are coins.
Output : 25, 10, 10, 1
*/
function detectType(value){
    return typeof value;
}

console.log(detectType("hello"));
console.log(detectType(123));

/*
12. Write a JavaScript function which says whether a number is perfect.
*/
function isPerfectNumber(num) {
    if (typeof num !== 'number' || num <= 1 || !Number.isInteger(num)) {
      return false;
    }
  
    let sum = 0;

    for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
        sum += i;
      }
    }
  
    return sum === num;
}

console.log(isPerfectNumber(25));
  
/*
22. Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number
of occurrences of the specified letter within the string.
Sample arguments : 'microsoft.com','o'
Expected output : 3
*/

function countLetterOccurrences(str, letter) {
    let count = 0;
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] === letter) {
        count++;
      }
    }
  
    return count;
}

console.log(countLetterOccurrences('microsoft.com','o'));
/*
23. Write a JavaScript function to find the first not repeated character .
Sample arguments : 'abacddbec'
Expected output : 'e'
*/
function FirstNoRepeated(string){
    let mymap = new Map();

    for (let i = 0; i < string.length; i++){
        let char = string[i];
        let count = mymap.get(char) || 0;
        mymap.set(char, count + 1);
    }

    for (let i = 0; i < string.length; i++){
        if(mymap.get(string[i]) === 1){
            return string[i]
        }
    }
}

let string = 'abacddbec';
console.log(FirstNoRepeated(string));

/*
24. Write a JavaScript function to apply Bubble Sort algorithm.
Note : According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that
works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if
they are in the wrong order".
Sample array : [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
Expected output : [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
*/

function BubbleSort(arr){
    let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}
let arr1 = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
console.log(BubbleSort(arr1));

/*
25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as
output.
Sample function : Longest_Country_Name(["Australia","Germany","United States of America"])
Expected output : "United States of America"
*/

function Longest_Country_Name(countryList){
    let longest = "";

    for (let country of countryList){
        if (country.length > longest.length){
            longest = country;
        }
    }
    return longest;
}

console.log(Longest_Country_Name(["Australia", "Germany", "United States of America"]));

/*
26. Write a JavaScript function to find longest substring in a given a string without repeating characters.
*/
function LongestSubstring(str){
    let start = 0;
    let maxLen = 0;
    let maxStart = 0;
    const charMap = new Map();

    for(let end = 0; end < str.length; end++){
        const char = str[end];
        if(charMap.has(char) && charMap.get(char) >= start){
            start = charMap.get(char) + 1;
        }
    
        charMap.set(char, end);
    
        if(end - start + 1 > maxLen){
            maxLen = end - start + 1;
            maxStart = start;
        }
    }
    return str.substring(maxStart, maxStart + maxLen);
}

console.log(LongestSubstring("abcabcbb"));

/*
27.Write a JavaScript function that returns the longest palindrome in a given string.
*/

function longestPalindrome(str){
    if (str.length < 2) return str;

    let maxLen = 0;
    let longest = "";

    function isPalindrome(str){
        return str == str.split("").reverse().join("");
    }

    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
          let substr = str.slice(i, j);
          if (isPalindrome(substr) && substr.length > maxLen) {
            maxLen = substr.length;
            longest = substr;
          }
        }
      }
    
      return longest;
}

console.log(longestPalindrome("bananas")); 

/*
28.Write a JavaScript program to pass a 'JavaScript function' as parameter .
*/
function greetLater(callback){
    console.log("Waiting 3 seconds...");
    setTimeout(() => {
        callback();
    }, 2000);
}

function sayHello(){
    console.log("Hello after 3 seconds")
}

greetLater(sayHello);

/*
29.Write a JavaScript function to get the function name.
*/
function getFunctionName(func){
    return func.name;
}

console.log(getFunctionName(sayHello));