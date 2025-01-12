# TDD String Calculator

## Requirements for `Add(string numbers)` Method

### 1. **Accept a String of Numbers**

- Accepts a string of numbers separated by commas (`,`).
- Returns their sum.
- Example:  
  `Add("1,2,3")` → `6`.

---

### 2. **Empty String**

- If the input string is empty, return `0`.
- Example:  
  `Add("")` → `0`.

---

### 3. **Single Number**

- If the input contains a single number, return that number.
- Example:  
  `Add("4")` → `4`.

---

### 4. **Multiple Numbers**

- Handle an unknown number of numbers.
- Example:  
  `Add("1,2,3,4,5")` → `15`.

---

### 5. **New Line Support**

- Allow newline characters (`\n`) as delimiters, in addition to commas.
- Example:  
  `Add("1\n2,3")` → `6`.

---

### 6. **Custom Delimiters**

- Support custom delimiters defined in this format: `//[delimiter]\n[numbers]`.
- Example:  
  `Add("//;\n1;2")` → `3`.

---

### 7. **Negative Numbers**

- If a negative number is passed, throw an exception.
- Include the negative numbers in the exception message.
- Example:  
  `Add("-1,2,-3")` → Exception: `"Negatives not allowed: -1, -3"`.

---

### 8. **Numbers Greater than 1000**

- Ignore numbers greater than 1000.
- Example:  
  `Add("2,1001")` → `2`.

---

### 9. **Delimiters of Any Length**

- Allow delimiters of any length if surrounded by square brackets.
- Example:  
  `Add("//[***]\n1***2***3")` → `6`.

---

### 10. **Multiple Delimiters**

- Allow multiple custom delimiters surrounded by square brackets.
- Example:  
  `Add("//[*][%]\n1*2%3")` → `6`.

---

### 11. **Combination of Requirements**

- Ensure the function works with all the above rules combined.
