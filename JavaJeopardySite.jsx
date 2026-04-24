import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

const promptMarkdownComponents = {
  p({ children }) {
    return <p className="mb-0 leading-snug [&:not(:first-child)]:mt-3">{children}</p>;
  },
  strong({ children }) {
    return <strong className="font-semibold text-slate-100">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic text-slate-200">{children}</em>;
  },
  ul({ children }) {
    return <ul className="my-3 list-disc space-y-1.5 pl-7 text-left">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="my-3 list-decimal space-y-1.5 pl-7 text-left">{children}</ol>;
  },
  li({ children }) {
    return <li className="leading-snug">{children}</li>;
  },
  pre({ children }) {
    return (
      <pre className="my-3 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 p-3 text-left text-base font-normal leading-relaxed text-slate-200 shadow-sm">
        {children}
      </pre>
    );
  },
  code({ className, children, ...props }) {
    const text = String(children);
    const isBlock =
      (typeof className === "string" && className.includes("language-")) || text.includes("\n");
    if (isBlock) {
      return (
        <code
          className={`block w-full whitespace-pre-wrap font-mono text-sm font-normal text-slate-200 ${className || ""}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-slate-800 px-1.5 py-0.5 text-[0.92em] font-mono font-normal text-cyan-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="font-medium text-cyan-300 underline decoration-cyan-500/50 underline-offset-2"
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  },
  h2({ children }) {
    return <h2 className="mt-4 mb-2 text-2xl font-semibold text-slate-100 first:mt-0">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="mt-3 mb-1.5 text-xl font-semibold text-slate-100 first:mt-0">{children}</h3>;
  },
};

const game = {
  title: "Java Jeopardy",
  subtitle: "AP CSA Review Game - Siddharth M, Anish M, Aarav M, Rakshan S, Ashwin K",
  categories: [
    {
      key: "A",
      title: "Objects & Methods",
      clues: [
        { value: 100, code: `String s = "computer";\nSystem.out.println(s.indexOf("m"));`, question: "What is printed when this code executes?", answer: "2" },
        { value: 200, code: `String s = "java";\nSystem.out.println(s.substring(1, 3).toUpperCase());`, question: "What is printed when this code executes?", answer: "AV" },
        { value: 300, code: `String a = "hello";\nString b = "he" + "llo";\nSystem.out.println(a.equals(b));`, question: "What is printed when this code executes?", answer: "true" },
        { value: 400, code: `String s = "apple";\nSystem.out.println(s.substring(0, s.indexOf("p")));`, question: "What is printed when this code executes?", answer: "a" },
        { value: 500, code: `String s = "banana";\ns.substring(0, 3);\nSystem.out.println(s);`, question: "What is printed when this code executes?", answer: "banana" },
        { value: 600, code: `String s = "abcdef";\ns = s.substring(1, 5);\ns = s.substring(1);\nSystem.out.println(s.length());`, question: "What is printed when this code executes?", answer: "3" },
      ],
    },
    {
      key: "B",
      title: "Selection & Iteration",
      clues: [
        { value: 100, code: `int x = 7;\nif (x % 2 == 0) {\n    System.out.println("even");\n} else {\n    System.out.println("odd");\n}` , question: "What is printed when this code executes?", answer: "odd" },
        { value: 200, code: `int x = 5;\nint y = 10;\nif (x > 3 || y < 5) {\n    System.out.println("A");\n} else {\n    System.out.println("B");\n}` , question: "What is printed when this code executes?", answer: "A" },
        { value: 300, code: `int sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    if (i % 2 == 1) {\n        sum += i;\n    }\n}\nSystem.out.println(sum);`, question: "What is printed when this code executes?", answer: "4" },
        { value: 400, code: `int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + " ");\n    i += 2;\n}` , question: "What is printed when this code executes?", answer: "1 3" },
        { value: 500, code: `int count = 0;\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 2; j++) {\n        if (i == j) {\n            count++;\n        }\n    }\n}\nSystem.out.println(count);`, question: "What is printed when this code executes?", answer: "2" },
        { value: 600, code: `int x = 0;\nwhile (x < 5) {\n    if (x == 2) {\n        break;\n    }\n    System.out.print(x + " ");\n    x++;\n}` , question: "What is printed when this code executes?", answer: "0 1" },
      ],
    },
    {
      key: "C",
      title: "Classes",
      clues: [
        { value: 100, code: `public class Book {\n    private int pages;\n    public Book(int p) {\n        if (p > 0) {\n            pages = p;\n        }\n    }\n}\n\nBook b = new Book(-25);`, question: "What is the value of pages in b after execution?", answer: "0" },
        { value: 200, code: `public class Person {\n    private String name;\n    public Person(String name) {\n        name = name;\n    }\n    public String getName() {\n        return name;\n    }\n}\n\nPerson p = new Person("Alex");`, question: "What is the value returned by p.getName() after this code executes?", answer: "null" },
        { value: 300, code: `class Counter {\n    private static int count = 0;\n    public Counter() { count++; }\n    public static int getCount() { return count; }\n}\n\nnew Counter();\nnew Counter();\nnew Counter();`, question: "What does `Counter.getCount()` return?", answer: "3" },
        { value: 400, code: `public class Test {\n    public static void main(String[] args) {\n        int x = 5;\n        if (true) {\n            int y = 10;\n        }\n        System.out.println(x + y);\n    }\n}` , question: "What happens when this code is compiled?", answer: "compile time error" },
        { value: 500, code: `public class Calculator {\n    public int multiply(int a, int b) {\n        int result = a * b;\n    }\n}\n\nCalculator calc = new Calculator();\nint val = calc.multiply(3, 4);`, question: "What happens when this code is compiled?", answer: "compile time error" },
        { value: 600, code: `public class Box {\n    private int value;\n    public Box(int v) {\n        value = v;\n    }\n    public void setValue(int v) {\n        value = v;\n    }\n    public int getValue() {\n        return value;\n    }\n}\n\npublic class Test {\n    public static void update(Box b) {\n        b.setValue(10);\n        b = new Box(20);\n    }\n    public static void main(String[] args) {\n        Box x = new Box(5);\n        update(x);\n    }\n}` , question: "What is the value of x.getValue() after main executes?", answer: "10" },
      ],
    },
    {
      key: "D",
      title: "Array & Files",
      clues: [
        {
          value: 100,
          code: `int[][] mat = new int[5][2];`,
          question: "What is the value of `mat[0].length`?",
          answer: "2",
        },
        {
          value: 200,
          code: `int[] arr = {10, 20, 30, 40, 50};\nfor (int i = 0; i < arr.length - 1; i++) {\n    arr[i] = arr[i + 1];\n}`,
          question: "What is the value of `arr[3]` after the following code executes?",
          answer: "50",
        },
        {
          value: 300,
          code: `int[] nums = {1, 2, 3, 4, 5, 6};\nfor (int i = 1; i < nums.length; i += 2) {\n    // body\n}`,
          question: "How many times will the body of the following loop execute?",
          answer: "3",
        },
        {
          value: 400,
          code: `// Using Scanner to read from a File`,
          question:
            "When using a `Scanner` to read a text file, what keyword must be included in the method header (or handled via `try-catch`) to account for the possibility that the file does not exist?",
          answer: "throws",
        },
        {
          value: 500,
          code: `// findMax initializes: int max = grid[0][0];\n// Called as: findMax(new int[0][0])`,
          question:
            "What specific `Exception` is thrown if you call `findMax(new int[0][0])` on a method that attempts to initialize a tracking variable with `int max = grid[0][0];`?",
          answer: "ArrayIndexOutOfBoundsException",
        },
        {
          value: 600,
          code: `int[][] grid = new int[3][];\ngrid[0] = new int[4];\ngrid[1] = grid[0];\ngrid[2] = new int[grid[1].length + 2];\n\ngrid[1] = new int[grid[2].length - 1];`,
          question: "What is the value of `grid[0].length + grid[1].length + grid[2].length`?",
          answer: "15",
        },
      ],
    },
    {
      key: "E",
      title: "ArrayList & Wrappers",
      clues: [
        {
          value: 100,
          code: `// int primitive stored as Integer in collections`,
          question: "What is the specific name of the process where Java automatically converts an `int` primitive into an `Integer` object?",
          answer: "Autoboxing",
        },
        {
          value: 200,
          code: `ArrayList<String> list = new ArrayList<>();\nlist.add("A");\nlist.add("B");\nlist.set(1, "C");\nlist.add(0, "D");`,
          question: "What is the value of `list.size()` after the following operations?",
          answer: "3",
        },
        {
          value: 300,
          code: `ArrayList<Integer> list = new ArrayList<>();\nlist.add(5);\nlist.add(10);\nlist.remove(0);\nlist.add(0, 15);\nSystem.out.println(list);`,
          question: "What is the output of `System.out.println(list)` after the following code?",
          answer: "[15, 10]",
        },
        {
          value: 400,
          code: `ArrayList<Double> list = new ArrayList<>();\nlist.add(1.1);\nlist.add(2.2);\nlist.add(3.3);\nlist.remove(1);`,
          question: "What is the result of `list.get(1)` after this code runs?",
          answer: "3.3",
        },
        {
          value: 500,
          code: `// list initially: [2, 4, 5, 6]\nfor (int i = 0; i < list.size(); i++) {\n    if (list.get(i) % 2 == 0) {\n        list.remove(i);\n    }\n}`,
          question: "If `list` initially contains `[2, 4, 5, 6]`, what is the element at index 1 after this loop finishes?",
          answer: "5",
        },
        {
          value: 600,
          code: `ArrayList<Integer> nums = new ArrayList<>();\n\nnums.add(4);\nnums.add(1);\nnums.add(4);\nnums.add(2);\n\nfor (int i = 0; i < nums.size(); i++) {\n    if (nums.get(i) == 4) {\n        nums.remove(i);\n        nums.add(i, nums.size());\n    }\n}`,
          question: "What is the final state of `nums`?",
          answer: "[3, 1, 3, 2]",
        },
      ],
    },
    {
      key: "F",
      title: "Searching, Sorting, Recursion",
      clues: [
        {
          value: 100,
          code: `// Binary search for 7 in sorted array:\n// {1, 3, 5, 7, 9, 11, 13}`,
          question:
            "In a Binary Search for the value `7` in the sorted array `{1, 3, 5, 7, 9, 11, 13}`, what is the first value in the array that the target is compared to?",
          answer: "7",
        },
        {
          value: 200,
          code: `// Sorting: one element at a time from the "unsorted" portion`,
          question:
            'Which sorting algorithm works by taking one element at a time from the "unsorted" portion and shifting existing "sorted" elements to make room to place it in its correct relative position?',
          answer: "Insertion Sort",
        },
        {
          value: 300,
          code: `public int calc(int n) {\n    if (n == 0) return 1;\n    return n * calc(n - 1);\n}`,
          question: "What is the integer return value of the call `calc(3)`?",
          answer: "6",
        },
        {
          value: 400,
          code: `// Binary search on a sorted array`,
          question:
            "If an array has 1,000 elements, what is the *maximum* number of comparisons a Binary Search would need to perform to find a target (or determine it isn't there)?",
          answer: "10",
        },
        {
          value: 500,
          code: `public void mystery(String s) {\n    if (s.length() > 0) {\n        mystery(s.substring(1));\n        System.out.print(s.substring(0, 1));\n    }\n}`,
          question: 'What is the exact string printed by the call `mystery("code")`?',
          answer: "edoc",
        },
        {
          value: 600,
          code: `// Worst-case growth for binary search on n elements`,
          question: "In Big-O notation, what is the worst-case time complexity of binary search on a sorted array of n elements?",
          answer: "O(log n)",
        },
      ],
    },
  ],
};

const SCORE_VALUES = [100, 200, 300, 400, 500, 600];
const DEFAULT_TEAMS = [
  { name: "Team 1", score: 0 },
  { name: "Team 2", score: 0 },
  { name: "Team 3", score: 0 },
];

function buildBoardKeys(categories) {
  const keys = {};
  categories.forEach((category) => {
    category.clues.forEach((clue) => {
      keys[`${category.key}${clue.value}`] = false;
    });
  });
  return keys;
}

function validateGameData(data) {
  const tests = [];

  tests.push({
    name: "has 6 categories",
    pass: data.categories.length === 6,
    details: `found ${data.categories.length}`,
  });

  const categoryKeys = data.categories.map((category) => category.key);
  tests.push({
    name: "category keys are unique",
    pass: new Set(categoryKeys).size === categoryKeys.length,
    details: categoryKeys.join(", "),
  });

  data.categories.forEach((category) => {
    tests.push({
      name: `${category.key} has 6 clues`,
      pass: category.clues.length === 6,
      details: `found ${category.clues.length}`,
    });

    tests.push({
      name: `${category.key} values are 100-600`,
      pass: JSON.stringify(category.clues.map((clue) => clue.value)) === JSON.stringify(SCORE_VALUES),
      details: category.clues.map((clue) => clue.value).join(", "),
    });
  });

  return tests;
}

export default function JavaJeopardySite() {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [used, setUsed] = useState({});
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [dailyDouble, setDailyDouble] = useState({});
  const [showChecks, setShowChecks] = useState(false);

  const boardKeys = useMemo(() => buildBoardKeys(game.categories), []);
  const dataChecks = useMemo(() => validateGameData(game), []);
  const passedChecks = dataChecks.filter((check) => check.pass).length;

  useEffect(() => {
    setUsed({ ...boardKeys });
  }, [boardKeys]);

  const clueId = (catKey, value) => `${catKey}${value}`;

  const boardRows = useMemo(
    () =>
      SCORE_VALUES.map((amount) => ({
        amount,
        clues: game.categories.map((category) => ({
          category,
          clue: category.clues.find((item) => item.value === amount),
        })),
      })),
    []
  );

  const openClue = (category, clue) => {
    setSelected({
      ...clue,
      catKey: category.key,
      catTitle: category.title,
      id: clueId(category.key, clue.value),
    });
    setShowAnswer(false);
  };

  const closeClue = () => {
    setSelected(null);
    setShowAnswer(false);
  };

  const markCellResult = (outcome) => {
    if (!selected) return;
    setUsed((prev) => ({ ...prev, [selected.id]: outcome }));
    closeClue();
  };

  const resetBoard = () => {
    setUsed({ ...boardKeys });
    setDailyDouble({});
    setSelected(null);
    setShowAnswer(false);
  };

  const resetScores = () => {
    setTeams((prev) => prev.map((team) => ({ ...team, score: 0 })));
  };

  const updateTeamName = (index, name) => {
    setTeams((prev) => prev.map((team, teamIndex) => (teamIndex === index ? { ...team, name } : team)));
  };

  const updateScore = (index, value) => {
    const parsed = value === "" ? "" : Number(value);
    setTeams((prev) =>
      prev.map((team, teamIndex) =>
        teamIndex === index
          ? {
              ...team,
              score: value === "" ? "" : Number.isNaN(parsed) ? team.score : parsed,
            }
          : team
      )
    );
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeClue();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const toggleDailyDouble = (id) => {
    setDailyDouble((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allDone =
    Object.keys(boardKeys).length > 0 && Object.keys(boardKeys).every((key) => used[key] !== false);

  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-45";

  const scoreInputClass =
    "w-full min-w-[3.25rem] rounded-md border border-cyan-500/40 bg-slate-800/95 px-2 py-1 text-sm font-semibold tabular-nums text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 jeopardy-score [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  const teamNameInputClass =
    "team-name-inline w-full min-w-0 cursor-text bg-transparent border-0 p-0 m-0 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-300 placeholder:text-slate-500 focus:ring-0 focus:outline-none selection:bg-cyan-500/30";

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_100%_55%_at_50%_-8%,rgba(14,116,144,0.42),transparent_58%)] text-slate-100 pb-24 font-sans">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 mb-1">{game.subtitle}</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">{game.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={resetBoard}
              className={`${btnBase} bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 shadow-sm`}
            >
              Reset board
            </button>
            <button
              type="button"
              onClick={resetScores}
              className={`${btnBase} bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 shadow-sm`}
            >
              Reset scores
            </button>
            <button
              type="button"
              onClick={() => setShowChecks((prev) => !prev)}
              className={`${btnBase} bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 shadow-sm`}
            >
              {showChecks ? "Hide checks" : "Show checks"}
            </button>
          </div>
        </div>

        {showChecks ? (
          <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900/85 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-base font-semibold text-slate-100">Data checks</h2>
              <div className="text-xs tabular-nums text-slate-400">
                {passedChecks} / {dataChecks.length} passing
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {dataChecks.map((check) => (
                <div
                  key={check.name}
                  className={`rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 border-l-2 ${
                    check.pass ? "border-l-emerald-500/70" : "border-l-rose-500/70"
                  }`}
                >
                  <div className="font-medium text-slate-200 flex items-center gap-2">
                    <span className="text-slate-400">{check.pass ? "OK" : "—"}</span>
                    <span>{check.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{check.details}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-600/70 bg-slate-900/90 ring-1 ring-slate-500/45 p-2 md:p-2.5 space-y-2 md:space-y-2.5 shadow-xl shadow-slate-950/45">
          <div className="grid grid-cols-6 gap-2 md:gap-2.5">
            {game.categories.map((category) => (
              <div
                key={category.key}
                className="bg-blue-800 min-h-[80px] md:min-h-[92px] px-2 md:px-2.5 py-2.5 flex items-center justify-center text-center rounded-xl border border-cyan-400/35 shadow-md shadow-cyan-900/40"
              >
                <div>
                  <div className="text-xs text-blue-200/90 mb-0.5">{category.key}</div>
                  <div className="font-medium leading-snug text-xs md:text-sm text-white">{category.title}</div>
                </div>
              </div>
            ))}
          </div>

          {boardRows.map((row) => (
            <div key={row.amount} className="grid grid-cols-6 gap-2 md:gap-2.5">
              {row.clues.map(({ category, clue }) => {
                const id = clueId(category.key, clue.value);
                const outcome = used[id];
                const isUsed = outcome !== false;
                const isDailyDouble = Boolean(dailyDouble[id]);

                const usedTone =
                  outcome === "correct"
                    ? "bg-emerald-900/30 ring-1 ring-emerald-400/28 shadow-inner border-emerald-400/35 cursor-not-allowed"
                    : outcome === "wrong"
                      ? "bg-rose-900/30 ring-1 ring-rose-400/28 shadow-inner border-rose-400/35 cursor-not-allowed"
                      : "";

                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => openClue(category, clue)}
                    disabled={isUsed}
                    className={`min-h-[68px] md:min-h-[80px] rounded-xl border flex flex-col items-center justify-center text-center px-1.5 transition-all duration-150 ${
                      isUsed
                        ? usedTone
                        : "bg-blue-700 text-white border-cyan-300/45 shadow-md shadow-cyan-950/40 hover:bg-blue-600 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:-translate-y-0.5"
                    }`}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      toggleDailyDouble(id);
                    }}
                    title="Right-click: toggle Daily Double"
                  >
                    <span
                      className={`font-semibold text-base md:text-xl tabular-nums ${
                        isUsed
                          ? outcome === "correct"
                            ? "text-emerald-300/35 blur-[2.5px]"
                            : "text-rose-300/35 blur-[2.5px]"
                          : "text-white"
                      }`}
                    >
                      ${clue.value}
                    </span>
                    {isDailyDouble && !isUsed ? (
                      <span className="mt-1 text-[9px] md:text-[10px] text-blue-100/95 tracking-wide">Daily Double</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {allDone ? (
          <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 text-center shadow-sm">
            <div className="text-lg font-semibold text-slate-100">Board complete</div>
            <div className="text-slate-400 mt-1 text-sm">All clues have been played.</div>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 px-2 pb-2 pt-1 md:px-4 md:pb-3 pointer-events-none">
        <div className="mx-auto max-w-7xl flex flex-nowrap items-stretch justify-center gap-2.5 md:gap-3 pointer-events-auto overflow-x-auto overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {teams.map((team, index) => (
            <div
              key={`team-bar-${index}`}
              className="flex min-h-[3.25rem] w-[6.75rem] shrink-0 sm:w-[7.25rem] flex-col items-stretch justify-center gap-1 rounded-2xl border border-cyan-500/45 bg-slate-900/95 px-2 py-2 shadow-lg shadow-cyan-950/35"
            >
              <input
                type="text"
                value={team.name}
                onChange={(event) => updateTeamName(index, event.target.value)}
                placeholder={`Team ${index + 1}`}
                className={teamNameInputClass}
                spellCheck={false}
                aria-label={`Team ${index + 1} name`}
              />
              <input
                type="number"
                inputMode="numeric"
                value={team.score}
                onChange={(event) => updateScore(index, event.target.value)}
                className={`${scoreInputClass} text-center`}
                aria-label={`${team.name || `Team ${index + 1}`} score`}
              />
            </div>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[3px] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clue-modal-title"
        >
          <div className="jeopardy-modal-panel w-full max-w-5xl max-h-[90vh] rounded-xl border border-slate-700 bg-slate-900 overflow-hidden flex flex-col shadow-xl shadow-black/30">
            <div className="px-4 md:px-5 py-3 bg-blue-900 flex-shrink-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-cyan-500/35">
              <div className="min-w-0">
                <div className="text-xs text-blue-100/90">
                  {selected.catKey} · ${selected.value}
                </div>
                <div id="clue-modal-title" className="text-xl md:text-3xl font-semibold text-white mt-0.5">
                  {selected.catTitle}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAnswer((prev) => !prev)}
                  className={`${btnBase} bg-slate-100 text-blue-900 hover:bg-white border border-slate-100`}
                >
                  {showAnswer ? "Hide answer" : "Show answer"}
                </button>
                <button
                  type="button"
                  onClick={() => markCellResult("correct")}
                  className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-500/50`}
                >
                  Mark correct
                </button>
                <button
                  type="button"
                  onClick={() => markCellResult("wrong")}
                  className={`${btnBase} bg-rose-600 text-white hover:bg-rose-500 border border-rose-500/50`}
                >
                  Mark wrong
                </button>
                <button
                  type="button"
                  onClick={closeClue}
                  className={`${btnBase} bg-slate-700 text-slate-100 hover:bg-slate-600 border border-slate-600`}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-950/80">
              <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 shadow-sm">
                <div className="text-xs text-cyan-300/80 mb-2">Code</div>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300 font-mono overflow-x-auto">
                  {selected.code}
                </pre>
              </div>

              <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 md:p-5 shadow-sm">
                <div className="text-xs text-cyan-300/80 mb-2">Prompt</div>
                <div className="prompt-markdown max-w-none text-lg md:text-2xl font-medium leading-snug text-slate-100">
                  <ReactMarkdown components={promptMarkdownComponents}>{selected.question}</ReactMarkdown>
                </div>
              </div>

              {showAnswer ? (
                <div className="rounded-lg bg-blue-950/40 border border-cyan-500/35 p-4 md:p-5 shadow-sm">
                  <div className="text-xs text-cyan-300/90 mb-1.5">Answer</div>
                  <div className="text-xl md:text-3xl font-medium text-slate-50 leading-snug">{selected.answer}</div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-5 text-slate-500 text-center text-sm">
                  Answer hidden
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}