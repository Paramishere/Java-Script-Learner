const CURRICULUM = [
  {
    id: "module-1",
    title: "1. Foundations of JavaScript",
    icon: "fa-solid fa-cube",
    description: "Master variables, data types, operators, conditionals, and loops.",
    lessons: [
      {
        id: "m1-l1",
        title: "Variables: let, const & var",
        summary: "Understand how to store and manage data in JavaScript using modern declarations.",
        content: `
### What is a Variable?
A variable is a container for storing data values. In modern JavaScript, we declare variables using **\`let\`** and **\`const\`** (and historically **\`var\`**).

#### Declaration Types:
1. **\`const\`** (Constant): Value **cannot** be reassigned after creation. Always use by default unless you know the value will change!
2. **\`let\`**: Value **can** be reassigned later. Use for counters, loop variables, or changing state.
3. **\`var\`**: Legacy declaration. Has function-scope (not block-scope) and gets hoisted. *Avoid using var in modern JS.*

\`\`\`javascript
const pi = 3.14159;
let score = 0;
score = score + 10; // score is now 10

console.log("Pi:", pi);
console.log("Score:", score);
\`\`\`
`,
        starterCode: `// Declare a const named 'courseName' set to "JavaScript Fundamentals"
// Declare a let named 'studentScore' set to 85

const courseName = "JavaScript Fundamentals";
let studentScore = 85;

// Reassign studentScore to 95
studentScore = 95;

console.log("Course:", courseName);
console.log("Score:", studentScore);
`,
        challenge: {
          instructions: "Create a `const` variable `userName` with value `'Alex'` and a `let` variable `userLevel` with initial value `1`. Then increase `userLevel` by `1` and log both.",
          solution: `const userName = 'Alex';\nlet userLevel = 1;\nuserLevel += 1;\nconsole.log(userName, userLevel);`,
          test: (logs, output, scope) => {
            return logs.some(l => l.includes('Alex')) && (logs.some(l => l.includes('2')) || scope.userLevel === 2);
          }
        },
        quiz: [
          {
            question: "Which keyword should you use for a variable whose value will never change?",
            options: ["let", "var", "const", "def"],
            answer: 2,
            explanation: "`const` declares a read-only reference to a value. It prevents reassignment."
          },
          {
            question: "What happens if you try to reassign a `const` variable?",
            options: ["It reassigns silently", "It throws a TypeError", "It converts to `let`", "It returns undefined"],
            answer: 1,
            explanation: "Attempting to reassign a variable declared with `const` throws a TypeError: Assignment to constant variable."
          }
        ]
      },
      {
        id: "m1-l2",
        title: "Data Types & Type Conversion",
        summary: "Explore Primitive types (String, Number, Boolean, null, undefined, Symbol, BigInt) and Objects.",
        content: `
### JavaScript Data Types
JavaScript is dynamic and weakly typed. Data types are split into **Primitives** (stored directly) and **Reference types** (Objects, Arrays).

#### Primitives:
- **String**: Text wrapped in quotes \`"hello"\` or template literals \\\`hello \\\${name}\\\`
- **Number**: Integers and floats e.g. \`42\`, \`3.14\`
- **Boolean**: \`true\` or \`false\`
- **Undefined**: Variable declared but not assigned a value yet
- **Null**: Intentional absence of any object value
- **BigInt**: For arbitrarily large integers (\`9007199254740991n\`)
- **Symbol**: Unique primitive identifier

\`\`\`javascript
let name = "Sarah";           // String
let count = 42;               // Number
let isActive = true;          // Boolean
let data = null;              // Null
let status;                   // Undefined

console.log(typeof name);     // "string"
console.log(typeof count);    // "number"
console.log(typeof isActive); // "boolean"
\`\`\`
`,
        starterCode: `const age = "25"; // Currently a String!
console.log("Original type:", typeof age);

// Convert age to a Number using Number()
const ageAsNumber = Number(age);

console.log("Converted type:", typeof ageAsNumber);
console.log("Age in 5 years:", ageAsNumber + 5);
`,
        challenge: {
          instructions: "Convert the string `'100'` into a Number using `Number()`, multiply it by `2`, and log the result.",
          solution: `const str = '100';\nconst num = Number(str) * 2;\nconsole.log(num);`,
          test: (logs) => logs.some(l => l.includes('200'))
        },
        quiz: [
          {
            question: "What does `typeof null` return in JavaScript?",
            options: ["null", "undefined", "object", "string"],
            answer: 2,
            explanation: "`typeof null` returns `'object'`. This is a famous historical bug in JavaScript that was retained for backward compatibility."
          }
        ]
      },
      {
        id: "m1-l3",
        title: "Operators & Expressions",
        summary: "Learn arithmetic, assignment, comparison, logical, and ternary operators.",
        content: `
### Operators in JavaScript
Operators allow you to perform calculations, compare values, and execute logical operations.

#### Essential Operators:
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo / remainder), \`**\` (exponentiation)
- **Comparison**:
  - Strict Equal \`===\`: Compares value AND type (always use this!)
  - Loose Equal \`==\`: Performs type coercion (avoid!)
  - Strict Not Equal \`!==\`
- **Logical**: \`&&\` (AND), \`||\` (OR), \`!\` (NOT)
- **Ternary Operator**: \`condition ? valueIfTrue : valueIfFalse\`

\`\`\`javascript
let price = 50;
let discount = 10;
let finalPrice = price - discount;

let isLoggedIn = true;
let hasPermission = false;
let canAccess = isLoggedIn && hasPermission; // false

// Ternary example
let statusMessage = finalPrice < 100 ? "Bargain!" : "Expensive!";
console.log(statusMessage);
\`\`\`
`,
        starterCode: `const points = 75;
const passingScore = 70;

// Use strict equality === to check if points equal 100
const isPerfect = points === 100;

// Use ternary operator to assign "Passed" or "Failed" to result
const result = points >= passingScore ? "Passed" : "Failed";

console.log("Is Perfect:", isPerfect);
console.log("Result:", result);
`,
        challenge: {
          instructions: "Write a ternary expression that checks if a variable `temperature = 30` is greater than `25`. If so, log `'Hot'`, otherwise log `'Cool'`.",
          solution: `const temperature = 30;\nconst weather = temperature > 25 ? 'Hot' : 'Cool';\nconsole.log(weather);`,
          test: (logs) => logs.some(l => l.includes('Hot'))
        },
        quiz: [
          {
            question: "What is the difference between `==` and `===`?",
            options: [
              "`==` checks type and value, `===` only value",
              "`===` checks both type and value, `==` performs type coercion",
              "There is no difference",
              "`===` is only for strings"
            ],
            answer: 1,
            explanation: "Strict equality `===` verifies that both operands are of the same type and have equal values."
          }
        ]
      },
      {
        id: "m1-l4",
        title: "Control Flow: If / Else & Switch",
        summary: "Direct program execution using conditional logic structures.",
        content: `
### Making Decisions with Conditionals
Conditionals execute different blocks of code based on truthy or falsy expressions.

#### Truthy vs Falsy:
Falsy values in JS: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`.
Everything else is **truthy**!

\`\`\`javascript
let hour = 14;

if (hour < 12) {
  console.log("Good morning!");
} else if (hour < 18) {
  console.log("Good afternoon!");
} else {
  console.log("Good evening!");
}

// Switch statement for exact matches
let role = "admin";
switch (role) {
  case "admin":
    console.log("Full Access");
    break;
  case "editor":
    console.log("Edit Access");
    break;
  default:
    console.log("Read Only");
}
\`\`\`
`,
        starterCode: `const userAge = 19;

if (userAge >= 21) {
  console.log("Full VIP Access");
} else if (userAge >= 18) {
  console.log("Standard Access");
} else {
  console.log("Access Denied");
}
`,
        challenge: {
          instructions: "Write an `if/else` statement for `score = 88`. If score >= 90 log `'A'`, else if score >= 80 log `'B'`, else log `'C'`.",
          solution: `const score = 88;\nif (score >= 90) {\n  console.log('A');\n} else if (score >= 80) {\n  console.log('B');\n} else {\n  console.log('C');\n}`,
          test: (logs) => logs.some(l => l.includes('B'))
        },
        quiz: [
          {
            question: "Which of the following is NOT a falsy value in JavaScript?",
            options: ["0", "''", "[] (empty array)", "null"],
            answer: 2,
            explanation: "In JavaScript, empty arrays `[]` and empty objects `{}` are objects, which are TRUTHY!"
          }
        ]
      },
      {
        id: "m1-l5",
        title: "Loops: for, while & do...while",
        summary: "Automate repetitive tasks and iterate over data using loops.",
        content: `
### Iteration with Loops
Loops execute a code block repeatedly while a specified condition evaluates to \`true\`.

#### Types of Loops:
1. **\`for\` loop**: Ideal when you know how many times to repeat.
2. **\`while\` loop**: Repeats as long as the condition is true.
3. **\`do...while\` loop**: Always runs **at least once** before testing the condition.

\`\`\`javascript
// Standard for loop
for (let i = 1; i <= 5; i++) {
  console.log("Iteration:", i);
}

// While loop
let count = 3;
while (count > 0) {
  console.log("Countdown:", count);
  count--;
}
\`\`\`
`,
        starterCode: `// Print numbers from 1 to 5 using a for loop
for (let i = 1; i <= 5; i++) {
  console.log("Number:", i);
}

// Calculate sum of numbers 1 through 10
let total = 0;
for (let i = 1; i <= 10; i++) {
  total += i;
}
console.log("Total sum:", total);
`,
        challenge: {
          instructions: "Use a loop to calculate the sum of numbers from 1 to 5 (1 + 2 + 3 + 4 + 5 = 15) and log `Total: 15`.",
          solution: `let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total += i;\n}\nconsole.log('Total:', total);`,
          test: (logs) => logs.some(l => l.includes('15'))
        },
        quiz: [
          {
            question: "What statement is used to exit a loop prematurely?",
            options: ["stop", "exit", "break", "return"],
            answer: 2,
            explanation: "The `break` keyword terminates the loop immediately and jumps to code following the loop."
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "2. Functions & Data Structures",
    icon: "fa-solid fa-code",
    description: "Learn modular reusable code with functions, arrays, objects, and modern ES6 methods.",
    lessons: [
      {
        id: "m2-l1",
        title: "Functions & Arrow Syntax",
        summary: "Build reusable blocks of code using Function Declarations, Expressions, and Arrow Functions.",
        content: `
### Reusable Logic with Functions
Functions are first-class citizens in JavaScript. You can store them in variables, pass them as arguments, and return them from other functions!

#### Syntax Varieties:
1. **Function Declaration** (Hoisted):
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

2. **Function Expression**:
\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name;
};
\`\`\`

3. **Arrow Function** (ES6 concise syntax):
\`\`\`javascript
const greet = (name) => \`Hello, \${name}\`;
const square = x => x * x; // Implicit return when single expression
\`\`\`
`,
        starterCode: `// Convert this function declaration into an Arrow Function:
function addNumbers(a, b) {
  return a + b;
}

const addNumbersArrow = (a, b) => a + b;

console.log("Add:", addNumbersArrow(10, 25));
`,
        challenge: {
          instructions: "Create an arrow function `double` that takes a number `n` and returns `n * 2`. Call `double(7)` and log the result.",
          solution: `const double = n => n * 2;\nconsole.log(double(7));`,
          test: (logs) => logs.some(l => l.includes('14'))
        },
        quiz: [
          {
            question: "What is an implicit return in Arrow Functions?",
            options: [
              "Returning undefined by default",
              "Omitting curly braces `{}` and `return` keyword for single-line expressions",
              "Returning `this` automatically",
              "Functions that cannot return values"
            ],
            answer: 1,
            explanation: "Arrow functions with a single expression automatically return that expression without explicit `{ return ... }`."
          }
        ]
      },
      {
        id: "m2-l2",
        title: "Arrays & Iteration (map, filter, reduce)",
        summary: "Master array operations and functional transformation methods.",
        content: `
### Modern Array Transformation Methods
Instead of using manual \`for\` loops, modern JS relies heavily on functional array methods:

- **\`map(fn)\`**: Transforms every element into a new array.
- **\`filter(fn)\`**: Creates a new array with elements that pass a boolean condition.
- **\`reduce(fn, initial)\`**: Reducers aggregate an array down to a single value (sum, object, count).
- **\`forEach(fn)\`**: Executes a function for each element (returns undefined).

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Map: double all numbers -> [2, 4, 6, 8, 10]
const doubled = numbers.map(num => num * 2);

// Filter: keep even numbers -> [2, 4]
const evens = numbers.filter(num => num % 2 === 0);

// Reduce: sum all numbers -> 15
const sum = numbers.reduce((acc, current) => acc + current, 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);
\`\`\`
`,
        starterCode: `const scores = [45, 82, 90, 60, 95, 30];

// Use .filter to get scores >= 70
const passingScores = scores.filter(score => score >= 70);

// Use .map to add 5 bonus points to all scores
const boostedScores = scores.map(score => score + 5);

console.log("Passing:", passingScores);
console.log("Boosted:", boostedScores);
`,
        challenge: {
          instructions: "Given `const nums = [10, 20, 30]`, use `.map()` to create a new array with each number multiplied by 3, and log the array.",
          solution: `const nums = [10, 20, 30];\nconst tripled = nums.map(n => n * 3);\nconsole.log(tripled);`,
          test: (logs) => logs.some(l => l.includes('30') && l.includes('60') && l.includes('90'))
        },
        quiz: [
          {
            question: "Does `.map()` mutate (modify) the original array?",
            options: [
              "Yes, it modifies the original array in place",
              "No, it returns a new array leaving the original array intact",
              "Only if configured with a flag",
              "It deletes the original array"
            ],
            answer: 1,
            explanation: "`.map()` is immutable. It creates and returns a brand new array, preserving the original array."
          }
        ]
      },
      {
        id: "m2-l3",
        title: "Objects & Key-Value Pairs",
        summary: "Store structured data using JavaScript objects, methods, and accessors.",
        content: `
### JavaScript Objects
Objects store key-value collections. Keys (properties) are strings/symbols, and values can be any data type — including functions (known as **methods**).

\`\`\`javascript
const developer = {
  name: "Alex",
  title: "Frontend Engineer",
  skills: ["JS", "CSS", "HTML"],
  isEmployed: true,
  code: function() {
    return \`\${this.name} is writing code...\`;
  }
};

// Accessing properties: Dot notation vs Bracket notation
console.log(developer.name);         // Dot notation
console.log(developer["skills"]);    // Bracket notation

// Adding/updating properties
developer.experienceYears = 3;
console.log(developer.code());
\`\`\`
`,
        starterCode: `const laptop = {
  brand: "Apple",
  model: "MacBook Pro",
  ramGB: 16,
  getSpec: function() {
    return \`\${this.brand} \${this.model} with \${this.ramGB}GB RAM\`;
  }
};

console.log("Laptop Specs:", laptop.getSpec());
`,
        challenge: {
          instructions: "Create an object `book` with `title: 'Clean Code'` and `author: 'Robert Martin'`. Log `book.title`.",
          solution: `const book = { title: 'Clean Code', author: 'Robert Martin' };\nconsole.log(book.title);`,
          test: (logs) => logs.some(l => l.includes('Clean Code'))
        },
        quiz: [
          {
            question: "When MUST you use bracket notation `obj[key]` instead of dot notation `obj.key`?",
            options: [
              "When accessing number values",
              "When the property key contains spaces, special characters, or is stored in a dynamic variable",
              "Bracket notation is obsolete",
              "When the object is constant"
            ],
            answer: 1,
            explanation: "Bracket notation allows evaluation of dynamic variables `obj[variableKey]` and keys containing invalid identifier characters like spaces."
          }
        ]
      },
      {
        id: "m2-l4",
        title: "Destructuring, Rest & Spread",
        summary: "Unpack values from arrays/objects and combine data effortlessly.",
        content: `
### ES6 Modern Syntax Innovations
- **Object Destructuring**: Extract properties into distinct variables.
- **Array Destructuring**: Unpack items based on position.
- **Spread Operator (\`...\`)**: Expands an array or object into elements/properties.
- **Rest Parameter (\`...\`)**: Collects remaining arguments into an array.

\`\`\`javascript
// Object Destructuring
const user = { username: "coder123", email: "coder@dev.io", age: 24 };
const { username, email } = user;

// Array Destructuring
const colors = ["Red", "Green", "Blue"];
const [primary, secondary] = colors;

// Spread Operator (Merging/Copying)
const originalArr = [1, 2, 3];
const copiedArr = [...originalArr, 4, 5]; // [1, 2, 3, 4, 5]

const extendedUser = { ...user, theme: "dark" };
console.log(extendedUser);
\`\`\`
`,
        starterCode: `const item = { name: "Wireless Headphones", price: 199, stock: 45 };

// Destructure name and price from item
const { name, price } = item;

console.log(\`Item: \${name}, Price: $\${price}\`);

// Combine two arrays using spread operator
const fruits = ["Apple", "Banana"];
const veggies = ["Carrot", "Spinach"];
const groceries = [...fruits, ...veggies];

console.log("Groceries:", groceries);
`,
        challenge: {
          instructions: "Given `const arr1 = [1, 2]` and `const arr2 = [3, 4]`, merge them into `const combined` using spread operator `...` and log `combined`.",
          solution: `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combined = [...arr1, ...arr2];\nconsole.log(combined);`,
          test: (logs) => logs.some(l => l.includes('1') && l.includes('4'))
        },
        quiz: [
          {
            question: "What is the difference between Spread and Rest operators in JS?",
            options: [
              "Spread unpacks iterables/objects; Rest gathers multiple elements into an array",
              "They use different syntax",
              "Rest is for strings, Spread is for numbers",
              "There is no difference"
            ],
            answer: 0,
            explanation: "Both use `...` syntax: Spread expands collections into individual items, whereas Rest collects multiple items into a single array parameter."
          }
        ]
      }
    ]
  },
  {
    id: "module-3",
    title: "3. DOM Manipulation & Web APIs",
    icon: "fa-solid fa-laptop-code",
    description: "Interact with HTML documents, handle user events, and persist data with Web Storage.",
    lessons: [
      {
        id: "m3-l1",
        title: "Selecting & Modifying DOM Elements",
        summary: "Understand the Document Object Model (DOM) and manipulate DOM elements.",
        content: `
### What is the DOM?
The **DOM** (Document Object Model) is a tree-like representation of the HTML document. JavaScript interacts with HTML through DOM APIs.

#### Selecting Elements:
- \`document.querySelector("#id / .class / tag")\`: Returns first matching element.
- \`document.querySelectorAll(".class")\`: Returns a NodeList of all matching elements.
- \`document.getElementById("id")\`: Fast element selection by ID.

#### Manipulating Content & Attributes:
- \`element.textContent = "New text"\`
- \`element.innerHTML = "<span>HTML content</span>"\`
- \`element.classList.add("active")\` / \`remove("active")\` / \`toggle("active")\`
- \`element.style.color = "blue"\`

\`\`\`javascript
// Example (conceptual DOM interaction)
const title = document.querySelector("#main-title");
if (title) {
  title.textContent = "Welcome to JS Mastery!";
  title.classList.add("highlight");
}
\`\`\`
`,
        starterCode: `// Modern DOM simulation in JS environment
const mockDOM = {
  heading: { textContent: "Hello World", className: "title" }
};

// Update text content
mockDOM.heading.textContent = "JavaScript DOM Control!";
mockDOM.heading.className += " active";

console.log("Mock DOM Title:", mockDOM.heading.textContent);
console.log("Mock DOM Class:", mockDOM.heading.className);
`,
        challenge: {
          instructions: "Create a mock element object `button = { textContent: 'Click Me', disabled: false }`. Change `textContent` to `'Submitted'` and set `disabled` to `true`. Log `button`.",
          solution: `const button = { textContent: 'Click Me', disabled: false };\nbutton.textContent = 'Submitted';\nbutton.disabled = true;\nconsole.log(button);`,
          test: (logs) => logs.some(l => l.includes('Submitted') && l.includes('true'))
        },
        quiz: [
          {
            question: "Which property is safest to use when updating text content without parsing HTML?",
            options: ["innerHTML", "outerHTML", "textContent", "document.write"],
            answer: 2,
            explanation: "`textContent` is safer than `innerHTML` because it escapes HTML tags, preventing Cross-Site Scripting (XSS) vulnerabilities."
          }
        ]
      },
      {
        id: "m3-l2",
        title: "Handling Events & Event Bubbling",
        summary: "Listen to user input, mouse clicks, keyboard strokes, and handle event propagation.",
        content: `
### Event-Driven JavaScript
Web applications respond to user actions via **Event Listeners**.

\`\`\`javascript
const btn = document.querySelector("#submit-btn");

btn.addEventListener("click", (event) => {
  console.log("Button clicked!", event.target);
});
\`\`\`

#### Event Propagation:
1. **Capturing Phase**: Event trickles down from \`window\` to target element.
2. **Target Phase**: Event triggers on the target element.
3. **Bubbling Phase**: Event bubbles up from target back to root element.

Use **\`event.stopPropagation()\`** to prevent bubbling, and **\`event.preventDefault()\`** to stop default browser behaviors (like form page reloads).
`,
        starterCode: `// Event Handler Simulation
function handleButtonClick(event) {
  console.log("Event Type:", event.type);
  console.log("Target Element:", event.targetName);
}

const mockEvent = { type: "click", targetName: "SaveButton" };
handleButtonClick(mockEvent);
`,
        challenge: {
          instructions: "Define a function `onFormSubmit(e)` that calls `e.preventDefault()` on a mock event object `{ preventDefault: () => console.log('Prevented!') }`.",
          solution: `function onFormSubmit(e) {\n  e.preventDefault();\n}\nonFormSubmit({ preventDefault: () => console.log('Prevented!') });`,
          test: (logs) => logs.some(l => l.includes('Prevented!'))
        },
        quiz: [
          {
            question: "What does `event.preventDefault()` do?",
            options: [
              "Stops the event from bubbling up the DOM",
              "Prevents the default browser action (e.g., form submission reload or link navigation)",
              "Destroys the DOM element",
              "Cancels all JavaScript timers"
            ],
            answer: 1,
            explanation: "`event.preventDefault()` stops the default browser action associated with the event without stopping event propagation."
          }
        ]
      },
      {
        id: "m3-l3",
        title: "Web Storage: localStorage & sessionStorage",
        summary: "Persist user settings and application state across browser sessions.",
        content: `
### Client-Side Persistence
Web Storage APIs allow storing key-value pairs in the browser as **Strings**.

- **\`localStorage\`**: Persists data permanently until explicitly cleared.
- **\`sessionStorage\`**: Data persists only while tab is open.

#### Key Methods:
- \`localStorage.setItem("key", "value")\`
- \`localStorage.getItem("key")\`
- \`localStorage.removeItem("key")\`

*Note: Since localStorage only stores strings, use \`JSON.stringify()\` and \`JSON.parse()\` for objects/arrays!*

\`\`\`javascript
const userTheme = { dark: true, fontSize: 16 };

// Save Object
localStorage.setItem("settings", JSON.stringify(userTheme));

// Read & Parse Object
const savedSettings = JSON.parse(localStorage.getItem("settings"));
console.log(savedSettings.dark); // true
\`\`\`
`,
        starterCode: `const userPreferences = { theme: "dark", language: "en" };

// Serialize object to JSON string
const jsonString = JSON.stringify(userPreferences);
console.log("Serialized JSON:", jsonString);

// Deserialize JSON string back to JavaScript object
const restoredObj = JSON.parse(jsonString);
console.log("Restored Theme:", restoredObj.theme);
`,
        challenge: {
          instructions: "Given `const data = { score: 100 }`, serialize it using `JSON.stringify()`, then parse it back with `JSON.parse()`. Log the parsed object's `score`.",
          solution: `const data = { score: 100 };\nconst str = JSON.stringify(data);\nconst obj = JSON.parse(str);\nconsole.log(obj.score);`,
          test: (logs) => logs.some(l => l.includes('100'))
        },
        quiz: [
          {
            question: "Why must you use `JSON.stringify()` when saving objects into `localStorage`?",
            options: [
              "`localStorage` can only store primitive string data",
              "It makes data execute faster",
              "To encrypt sensitive user data",
              "Objects are not supported in JS"
            ],
            answer: 0,
            explanation: "`localStorage` converts non-string values into `\"[object Object]\"` if not stringified first."
          }
        ]
      }
    ]
  },
  {
    id: "module-4",
    title: "4. Deep JavaScript & OOP",
    icon: "fa-solid fa-gears",
    description: "Master lexical scope, closures, 'this' context, prototypal inheritance, and ES6 classes.",
    lessons: [
      {
        id: "m4-l1",
        title: "Execution Context & Scope Chain",
        summary: "Understand Global Scope, Function Scope, Block Scope, and Hoisting.",
        content: `
### How JavaScript Executes Code
When JS executes, it creates **Execution Contexts**:
1. **Global Execution Context** (created by default)
2. **Function Execution Context** (created when invoking functions)

#### Variable Scope:
- **Global Scope**: Accessible everywhere.
- **Function Scope**: Variables defined inside a function with \`var\`/\`let\`/\`const\`.
- **Block Scope**: Variables declared with \`let\` & \`const\` inside \`{ ... }\` blocks (if statements, loops).

#### Hoisting:
Function declarations and \`var\` declarations are moved to the top of their scope during creation phase. However, \`let\` and \`const\` enter the **Temporal Dead Zone (TDZ)** until their initialization line is reached!
`,
        starterCode: `function outer() {
  const outerVar = "I am outside!";
  
  function inner() {
    const innerVar = "I am inside!";
    console.log(outerVar); // Scope Chain allows inner to access outer!
    console.log(innerVar);
  }
  
  inner();
}

outer();
`,
        challenge: {
          instructions: "Demonstrate scope chain access: Write `function container()` with variable `secret = 'JS-42'`. Inside `container`, define and invoke `reveal()` which logs `secret`.",
          solution: `function container() {\n  const secret = 'JS-42';\n  function reveal() {\n    console.log(secret);\n  }\n  reveal();\n}\ncontainer();`,
          test: (logs) => logs.some(l => l.includes('JS-42'))
        },
        quiz: [
          {
            question: "What is the Temporal Dead Zone (TDZ)?",
            options: [
              "The region of code where a `let` or `const` variable exists but cannot be accessed prior to declaration",
              "A state where functions stop running",
              "The time before garbage collection runs",
              "An unused web API"
            ],
            answer: 0,
            explanation: "TDZ is the period between entering block scope and when `let`/`const` variables are declared/initialized."
          }
        ]
      },
      {
        id: "m4-l2",
        title: "Closures & Encapsulation",
        summary: "Unlock the power of closures to create private variables and data encapsulation.",
        content: `
### What is a Closure?
A **closure** is the combination of a function bundled together with references to its surrounding state (**lexical environment**). 

In JavaScript, closures give inner functions access to an outer function's scope even **after** the outer function has finished executing!

\`\`\`javascript
function createCounter() {
  let count = 0; // Private variable encapsulated by closure!
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());   // 2
// count variable cannot be accessed directly from outside!
\`\`\`
`,
        starterCode: `function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log("Double 5:", double(5)); // 10
console.log("Triple 5:", triple(5)); // 15
`,
        challenge: {
          instructions: "Create a closure function `createScoreKeeper()` that maintains a private variable `score = 0` and returns a function that adds `pts` to `score` and returns the new total.",
          solution: `function createScoreKeeper() {\n  let score = 0;\n  return function(pts) {\n    score += pts;\n    return score;\n  };\n}\nconst addPts = createScoreKeeper();\nconsole.log(addPts(10));\nconsole.log(addPts(5));`,
          test: (logs, output, scope) => logs.some(l => l.includes('15') || l.includes('10'))
        },
        quiz: [
          {
            question: "Why are closures useful in JavaScript architecture?",
            options: [
              "They enable data privacy/encapsulation and state retention",
              "They speed up code execution by 50%",
              "They remove the need for functions",
              "They convert code to WebAssembly"
            ],
            answer: 0,
            explanation: "Closures hide state from global access while granting controlled interaction via returned methods."
          }
        ]
      },
      {
        id: "m4-l3",
        title: "The 'this' Keyword & Explicit Binding",
        summary: "Understand how 'this' is bound dynamically and master call(), apply(), and bind().",
        content: `
### Understanding 'this'
The value of **\`this\`** depends entirely on **how** a function is invoked:

1. **Implicit Binding**: Object calling the method (\`obj.method()\` -> \`this\` is \`obj\`).
2. **Explicit Binding**:
   - **\`func.call(thisArg, arg1, arg2)\`**: Invokes function immediately with given \`this\`.
   - **\`func.apply(thisArg, [args])\`**: Invokes function immediately passing arguments as array.
   - **\`func.bind(thisArg)\`**: Returns a new function permanently bound to \`thisArg\`.
3. **Arrow Functions**: Do **NOT** have their own \`this\`! They inherit \`this\` lexically from enclosing parent scope.

\`\`\`javascript
const user1 = { name: "Elena" };
const user2 = { name: "Marcus" };

function sayHello(greeting) {
  return \`\${greeting}, \${this.name}!\`;
}

console.log(sayHello.call(user1, "Welcome")); // "Welcome, Elena!"
console.log(sayHello.call(user2, "Greetings")); // "Greetings, Marcus!"
\`\`\`
`,
        starterCode: `const person = {
  name: "Sophia",
  greet: function() {
    return "Hi, I am " + this.name;
  }
};

const standaloneGreet = person.greet;
console.log("Unbound call:", standaloneGreet()); // undefined or error!

// Fix binding using .bind()
const boundGreet = person.greet.bind(person);
console.log("Bound call:", boundGreet());
`,
        challenge: {
          instructions: "Given `const car = { brand: 'Tesla' }` and `function getBrand() { return this.brand; }`, use `.call(car)` to execute `getBrand` and log the result.",
          solution: `const car = { brand: 'Tesla' };\nfunction getBrand() { return this.brand; }\nconsole.log(getBrand.call(car));`,
          test: (logs) => logs.some(l => l.includes('Tesla'))
        },
        quiz: [
          {
            question: "How do Arrow Functions handle the `this` keyword?",
            options: [
              "They create a dynamic `this` based on runtime caller",
              "They inherit `this` lexically from their enclosing scope",
              "`this` always equals `window`",
              "Arrow functions throw an error if `this` is used"
            ],
            answer: 1,
            explanation: "Arrow functions do not bind their own `this`. They capture the `this` value of the surrounding context at definition time."
          }
        ]
      },
      {
        id: "m4-l4",
        title: "Prototypes & ES6 Classes",
        summary: "Learn object-oriented programming in JS using Prototypal Inheritance and modern class syntax.",
        content: `
### Object-Oriented JavaScript
JavaScript uses **Prototypal Inheritance**. Every object has an internal link to another object called its **prototype**.

#### ES6 Class Syntax (Syntactic Sugar over Prototypes):
\`\`\`javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
  
  takeDamage(amount) {
    this.health -= amount;
    return \`\${this.name} health: \${this.health}\`;
  }
}

// Inheritance with 'extends' and 'super'
class Hero extends Character {
  constructor(name, health, weapon) {
    super(name, health); // Call parent constructor
    this.weapon = weapon;
  }
  
  attack() {
    return \`\${this.name} attacks with \${this.weapon}!\`;
  }
}

const warrior = new Hero("Thor", 100, "Mjolnir");
console.log(warrior.attack());
console.log(warrior.takeDamage(20));
\`\`\`
`,
        starterCode: `class Vehicle {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  
  accelerate(amount) {
    this.speed += amount;
    return \`Speed: \${this.speed} km/h\`;
  }
}

const myCar = new Vehicle("Toyota", 60);
console.log(myCar.accelerate(30));
`,
        challenge: {
          instructions: "Create a class `BankAccount` with `balance` initialized in constructor. Add a method `deposit(amount)` that increases `balance` and returns it. Instantiate with balance 50, deposit 25, and log result.",
          solution: `class BankAccount {\n  constructor(balance) {\n    this.balance = balance;\n  }\n  deposit(amount) {\n    this.balance += amount;\n    return this.balance;\n  }\n}\nconst acc = new BankAccount(50);\nconsole.log(acc.deposit(25));`,
          test: (logs) => logs.some(l => l.includes('75'))
        },
        quiz: [
          {
            question: "What does the `super()` call do inside a subclass constructor?",
            options: [
              "Calls the constructor of the parent class",
              "Creates a super object",
              "Overrides parent methods",
              "Prevents inheritance"
            ],
            answer: 0,
            explanation: "`super()` invokes the constructor of the parent class, setting up parent instance properties."
          }
        ]
      }
    ]
  },
  {
    id: "module-5",
    title: "5. Asynchronous JavaScript & APIs",
    icon: "fa-solid fa-bolt",
    description: "Master Promises, async/await, Fetch API, and the JavaScript Event Loop.",
    lessons: [
      {
        id: "m5-l1",
        title: "Promises: Pending, Fulfilled & Rejected",
        summary: "Handle asynchronous operations gracefully using Promise objects.",
        content: `
### What is a Promise?
A **Promise** represents a value that may not be available right now, but will resolve in the future (or fail with an error).

#### Promise States:
1. **Pending**: Initial state, operation incomplete.
2. **Fulfilled**: Operation completed successfully (\`resolve(data)\`).
3. **Rejected**: Operation failed with error (\`reject(error)\`).

\`\`\`javascript
const fetchData = new Promise((resolve, reject) => {
  let success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Data fetched successfully!");
    } else {
      reject("Network error!");
    }
  }, 1000);
});

// Consuming Promises with .then() and .catch()
fetchData
  .then(data => console.log("Result:", data))
  .catch(err => console.error("Error:", err));
\`\`\`
`,
        starterCode: `const mockAsyncJob = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Task Completed!");
  }, 500);
});

mockAsyncJob.then((message) => {
  console.log("Async Output:", message);
});
`,
        challenge: {
          instructions: "Create a Promise `myPromise` that immediately calls `resolve('Ready!')`. Consume it with `.then()` and log the resolved message.",
          solution: `const myPromise = new Promise(resolve => resolve('Ready!'));\nmyPromise.then(msg => console.log(msg));`,
          test: (logs) => logs.some(l => l.includes('Ready!'))
        },
        quiz: [
          {
            question: "What method handles rejected Promises in `.then()` chains?",
            options: [".then()", ".catch()", ".finally()", ".reject()"],
            answer: 1,
            explanation: "`.catch(err => ...)` catches any errors thrown or rejections produced along the promise chain."
          }
        ]
      },
      {
        id: "m5-l2",
        title: "Async / Await & Try...Catch",
        summary: "Write asynchronous code that looks and behaves like synchronous code.",
        content: `
### Modern Async Control with Async/Await
Introduced in ES2017, **\`async/await\`** is syntactic sugar on top of Promises.

- **\`async\`**: Declares that a function returns a Promise.
- **\`await\`**: Pauses function execution until the Promise settles.
- **\`try...catch\`**: Provides clean error handling for async operations.

\`\`\`javascript
async function loadUserData(userId) {
  try {
    console.log("Fetching user...");
    // Simulate network delay
    const response = await mockFetchUser(userId);
    console.log("User Data:", response.name);
  } catch (error) {
    console.error("Failed to load user:", error);
  }
}
\`\`\`
`,
        starterCode: `function fakeApiCall() {
  return Promise.resolve({ id: 101, username: "dev_pro" });
}

async function getUser() {
  try {
    const user = await fakeApiCall();
    console.log("Fetched User:", user.username);
  } catch (err) {
    console.log("Error:", err);
  }
}

getUser();
`,
        challenge: {
          instructions: "Write an `async` function `process()` that awaits `Promise.resolve('Done')` and logs the result.",
          solution: `async function process() {\n  const res = await Promise.resolve('Done');\n  console.log(res);\n}\nprocess();`,
          test: (logs) => logs.some(l => l.includes('Done'))
        },
        quiz: [
          {
            question: "Where can the `await` keyword be used?",
            options: [
              "Inside any function",
              "Only inside functions marked with `async` (or top-level modules)",
              "Inside for loops only",
              "Anywhere in JS files"
            ],
            answer: 1,
            explanation: "`await` can only be placed inside `async` functions or top-level ES modules."
          }
        ]
      },
      {
        id: "m5-l3",
        title: "The JavaScript Event Loop",
        summary: "Understand single-threaded execution, Call Stack, Task Queue, and Microtask Queue.",
        content: `
### How JS Handles Concurrency
JavaScript is **single-threaded** — it has one Call Stack and executes one piece of code at a time.

#### How Asynchronous Code Works:
1. **Call Stack**: Executes synchronous code line by line.
2. **Web APIs / Node APIs**: Offloads asynchronous jobs (timers, fetch requests, DOM events).
3. **Microtask Queue**: High priority queue (Promises, \`queueMicrotask\`, \`MutationObserver\`).
4. **Task Queue (Macrotask Queue)**: Regular priority queue (\`setTimeout\`, \`setInterval\`, \`I/O\`).
5. **Event Loop**: Continuously checks if Call Stack is empty. When empty, it empties **Microtask Queue FIRST**, then handles **Task Queue**!

\`\`\`javascript
console.log("1. Start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("2. End");

// Output Order:
// 1. Start
// 2. End
// 3. Microtask (Promise)
// 4. Macrotask (setTimeout)
\`\`\`
`,
        starterCode: `console.log("Sync 1");

setTimeout(() => {
  console.log("Timeout Task");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Microtask");
});

console.log("Sync 2");
`,
        challenge: {
          instructions: "Predict and test execution order! Log `'A'`, then schedule a `Promise.resolve().then(() => console.log('B'))`, then log `'C'`. Observe log order: A, C, B.",
          solution: `console.log('A');\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');`,
          test: (logs) => logs.includes('A') && logs.includes('C') && logs.includes('B')
        },
        quiz: [
          {
            question: "Which queue has HIGHER priority when the Call Stack becomes empty?",
            options: [
              "Task Queue (Macrotask Queue)",
              "Microtask Queue (Promises)",
              "Render Queue",
              "Animation Queue"
            ],
            answer: 1,
            explanation: "The Event Loop executes ALL pending microtasks in the Microtask Queue before picking the next task from the Macrotask queue."
          }
        ]
      }
    ]
  },
  {
    id: "module-6",
    title: "6. Advanced JS & Performance",
    icon: "fa-solid fa-rocket",
    description: "Master Modules, Debounce/Throttle, Memory Management, and Design Patterns.",
    lessons: [
      {
        id: "m6-l1",
        title: "ES Modules (import / export)",
        summary: "Organize large codebases with modular architecture using default and named exports.",
        content: `
### Modular JavaScript
ES Modules allow breaking code down into separate reusable files.

#### Named Exports:
\`\`\`javascript
// mathUtils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// main.js
import { add, multiply } from './mathUtils.js';
\`\`\`

#### Default Exports:
\`\`\`javascript
// User.js
export default class User {
  constructor(name) { this.name = name; }
}

// main.js
import User from './User.js';
\`\`\`
`,
        starterCode: `// Simulation of ES Module system
const MathModule = {
  add: (a, b) => a + b,
  square: (x) => x * x
};

const { add, square } = MathModule;
console.log("Square of 4:", square(4));
console.log("Add 3 + 5:", add(3, 5));
`,
        challenge: {
          instructions: "Create a module object `StringUtils` with method `capitalize(str)` that returns `str.toUpperCase()`. Call `StringUtils.capitalize('javascript')` and log result.",
          solution: `const StringUtils = {\n  capitalize: str => str.toUpperCase()\n};\nconsole.log(StringUtils.capitalize('javascript'));`,
          test: (logs) => logs.some(l => l.includes('JAVASCRIPT'))
        },
        quiz: [
          {
            question: "How many `default` exports can a single JavaScript file have?",
            options: ["Zero or One", "Unlimited", "Up to 5", "Exactly two"],
            answer: 0,
            explanation: "A module can have at most ONE default export, but can have multiple named exports."
          }
        ]
      },
      {
        id: "m6-l2",
        title: "Performance: Debouncing & Throttling",
        summary: "Optimize high-frequency events like window scrolling, resizing, and search input typing.",
        content: `
### Event Rate Limiting Techniques

#### 1. Debounce:
Delays executing a function until a specified time interval has elapsed since the **last time** it was invoked. (Great for search autocomplete fields!).

#### 2. Throttle:
Ensures a function is executed **at most once** per specified time window. (Great for scroll events, window resizing, button mash protection!).

\`\`\`javascript
// Custom Debounce Function
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
\`\`\`
`,
        starterCode: `function logSearch(query) {
  console.log("API Call for query:", query);
}

// Simplified debounce simulation
let timerId = null;
function simulatedDebounce(query) {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    logSearch(query);
  }, 300);
}

simulatedDebounce("j");
simulatedDebounce("java");
simulatedDebounce("javascript"); // Only this final call fires!
`,
        challenge: {
          instructions: "Write a simple `debounce` factory function that returns a wrapped function which clears an internal `timer` and sets a `setTimeout` of 100ms.",
          solution: `function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst log = debounce(() => console.log('Debounced!'), 100);\nlog();`,
          test: (logs, output, scope) => true
        },
        quiz: [
          {
            question: "When should you prefer Debouncing over Throttling?",
            options: [
              "When you want to wait until the user stops typing/acting before triggering an action (e.g., search autocomplete)",
              "When tracking continuous scroll positions",
              "For game loop updates",
              "Debounce is never preferred"
            ],
            answer: 0,
            explanation: "Debouncing waits for user activity to pause before triggering, perfect for search inputs to prevent spamming backend APIs."
          }
        ]
      },
      {
        id: "m6-l3",
        title: "JS Design Patterns: Module, Observer & Singleton",
        summary: "Implement production-grade architectural patterns in modern JavaScript.",
        content: `
### Software Design Patterns in JS
Design patterns provide standard reusable solutions to common software design problems.

#### 1. Observer Pattern (Pub/Sub):
Allows objects (subscribers) to listen for updates from a central subject (publisher).

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("userLogin", user => console.log("User logged in:", user.name));
emitter.emit("userLogin", { name: "Alice" });
\`\`\`
`,
        starterCode: `class EventEmitter {
  constructor() { this.events = {}; }
  on(event, callback) {
    (this.events[event] = this.events[event] || []).push(callback);
  }
  emit(event, data) {
    (this.events[event] || []).forEach(cb => cb(data));
  }
}

const bus = new EventEmitter();
bus.on("scoreUpdate", (score) => console.log("New Score:", score));
bus.emit("scoreUpdate", 250);
`,
        challenge: {
          instructions: "Instantiate the `EventEmitter`, subscribe to `'notify'` logging `'Alert!'`, then emit `'notify'`. Observe log output.",
          solution: `class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, cb) { (this.events[event] = this.events[event] || []).push(cb); }\n  emit(event, data) { (this.events[event] || []).forEach(cb => cb(data)); }\n}\nconst bus = new EventEmitter();\nbus.on('notify', () => console.log('Alert!'));\nbus.emit('notify');`,
          test: (logs) => logs.some(l => l.includes('Alert!'))
        },
        quiz: [
          {
            question: "What primary problem does the Observer Pattern solve?",
            options: [
              "Establishes a one-to-many dependency relationship so subscribers react automatically to changes",
              "Restricts object instantiation to a single global instance",
              "Converts sync code to async code",
              "Increases memory usage"
            ],
            answer: 0,
            explanation: "The Observer pattern enables decoupled publish-subscribe communication between state providers and subscribers."
          }
        ]
      }
    ]
  }
];
