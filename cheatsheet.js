const CHEATSHEET_DATA = [
  {
    category: "Variables & Scope",
    items: [
      {
        title: "Variable Declarations",
        code: `const PI = 3.14159;  // Cannot be reassigned (Block scoped)\nlet count = 0;       // Reassignable (Block scoped)\nvar legacy = true;   // Avoid (Function scoped)`
      },
      {
        title: "Template Literals",
        code: `const name = "Alice";\nconst message = \`Hello \${name}, 2 + 2 = \${2 + 2}\`;`
      },
      {
        title: "Ternary Operator",
        code: `const status = age >= 18 ? "Adult" : "Minor";`
      }
    ]
  },
  {
    category: "Array Methods",
    items: [
      {
        title: "Transform with map()",
        code: `const doubled = [1, 2, 3].map(x => x * 2); // [2, 4, 6]`
      },
      {
        title: "Filter with filter()",
        code: `const evens = [1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]`
      },
      {
        title: "Accumulate with reduce()",
        code: `const sum = [10, 20, 30].reduce((acc, curr) => acc + curr, 0); // 60`
      },
      {
        title: "Find Element with find()",
        code: `const user = users.find(u => u.id === 42);`
      }
    ]
  },
  {
    category: "Objects & ES6 Features",
    items: [
      {
        title: "Object & Array Destructuring",
        code: `const { name, role } = user;\nconst [first, second] = items;`
      },
      {
        title: "Spread Operator (...) ",
        code: `const newArr = [...oldArr, 4, 5];\nconst newObj = { ...oldObj, active: true };`
      },
      {
        title: "Optional Chaining (?.)",
        code: `const city = user?.address?.city; // undefined if address is missing`
      },
      {
        title: "Nullish Coalescing (??)",
        code: `const timeout = userSetting ?? 3000; // Only falls back on null or undefined`
      }
    ]
  },
  {
    category: "DOM & Event Handling",
    items: [
      {
        title: "Select Element",
        code: `const btn = document.querySelector("#submit-btn");\nconst cards = document.querySelectorAll(".card");`
      },
      {
        title: "Event Listener",
        code: `btn.addEventListener("click", (e) => {\n  e.preventDefault();\n  console.log("Clicked!", e.target);\n});`
      },
      {
        title: "Class List Toggle",
        code: `element.classList.add("active");\nelement.classList.remove("hidden");\nelement.classList.toggle("dark-mode");`
      }
    ]
  },
  {
    category: "Asynchronous JS",
    items: [
      {
        title: "Promise Creation",
        code: `const myPromise = new Promise((resolve, reject) => {\n  if (success) resolve("OK");\n  else reject(new Error("Failed"));\n});`
      },
      {
        title: "Async / Await with Try-Catch",
        code: `async function fetchData(url) {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}`
      }
    ]
  }
];
