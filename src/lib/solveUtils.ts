import { Problem } from "@/api/problem";
import { Judge0Submission } from "@/api/submission";

export const LANGUAGES = [
  { id: 54, name: "C++ (GCC 9.2.0)", value: "cpp" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", value: "java" },
  { id: 71, name: "Python (3.8.1)", value: "python" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)", value: "javascript" },
];

export function addMain(language: string, code: string, problem: Problem) {
  // Generate main/entry code that runs all test cases from problem.testCases
  const fn = problem.function;
  const testCases = problem.testCases || [];
  let mainCode = "";

  function serializeArg(
    val: boolean | number | string,
    type: string,
    lang: string
  ): string {
    // Handles array or primitive for each language
    if (Array.isArray(val)) {
      switch (lang) {
        case "python":
          return `[${val.join(", ")}]`;
        case "cpp":
          return `{${val.join(", ")}}`;
        case "java":
          return `new ${type.replace("[]", "")}[]{${val.join(", ")}}`;
        case "javascript":
          return `[${val.join(", ")}]`;
        default:
          return JSON.stringify(val);
      }
    }
    // Primitive
    if (type === "string") return `"${val}"`;
    if (type === "bool")
      return val === true || val === "true"
        ? lang === "python"
          ? "True"
          : "true"
        : lang === "python"
        ? "False"
        : "false";
    return String(val);
  }

  function getArgsForTestCase(
    testInput: boolean | number | string,
    paramTypes: string[],
    lang: string
  ): string[] {
    // If only one param and input is array, treat as value for that param
    if (paramTypes.length === 1) {
      return [serializeArg(testInput, paramTypes[0], lang)];
    }
    // If input is array of args
    if (Array.isArray(testInput) && testInput.length === paramTypes.length) {
      return testInput.map((v, i) => serializeArg(v, paramTypes[i], lang));
    }
    // If input is object with keys matching param names
    if (typeof testInput === "object" && !Array.isArray(testInput)) {
      return fn.parameters.map((p, i) =>
        serializeArg(testInput[p.name], paramTypes[i], lang)
      );
    }
    // Fallback: treat as single argument
    return [serializeArg(testInput, paramTypes[0], lang)];
  }

  switch (language) {
    case "python": {
      const calls = testCases
        .map((ex, idx) => {
          const args = getArgsForTestCase(
            ex.input,
            fn.parameters.map((p) => p.type),
            language
          ).join(", ");
          return `print('CASE_${idx}:', ${fn.name}(${args}))`;
        })
        .join("\n    ");
      mainCode = [
        code.trim(),
        "",
        'if __name__ == "__main__":',
        `    ${calls}`,
      ].join("\n");
      break;
    }
    case "cpp": {
      const calls = testCases
        .map((ex, idx) => {
          const args = getArgsForTestCase(
            ex.input,
            fn.parameters.map((p) => p.type),
            language
          ).join(", ");
          return `std::cout << "CASE_${idx}: " << ${fn.name}(${args}) << std::endl;`;
        })
        .join("\n    ");
      mainCode = [
        code.trim(),
        "",
        "int main() {",
        `    ${calls}`,
        "    return 0;",
        "}",
      ].join("\n");
      break;
    }
    case "java": {
      const userFn = code.trim().replace(/^/gm, "        ");
      const calls = testCases
        .map((ex, idx) => {
          const args = getArgsForTestCase(
            ex.input,
            fn.parameters.map((p) => p.type),
            language
          ).join(", ");
          return `System.out.println("CASE_${idx}: " + s.${fn.name}(${args}));`;
        })
        .join("\n        ");
      mainCode = [
        "public class Main {",
        "    public static class Solution {",
        userFn,
        "    }",
        "",
        "    public static void main(String[] args) {",
        "        Solution s = new Solution();",
        `        ${calls}`,
        "    }",
        "}",
      ].join("\n");
      break;
    }
    case "javascript": {
      const calls = testCases
        .map((ex, idx) => {
          const args = getArgsForTestCase(
            ex.input,
            fn.parameters.map((p) => p.type),
            language
          ).join(", ");
          return `console.log('CASE_${idx}:', ${fn.name}(${args}))`;
        })
        .join("\n    ");
      mainCode = [
        code.trim(),
        "",
        "(function main() {",
        `    ${calls}`,
        "})();",
      ].join("\n");
      break;
    }
    default:
      mainCode = code;
  }
  return mainCode;
}

export function getDefaultCode(language: string, problem: Problem): string {
  if (!problem?.function) {
    console.error("No function found for problem");
    return "";
  }
  const fn = problem.function;
  const params = fn.parameters.map((p) => p.name).join(", ");

  switch (language) {
    case "python":
      return [
        ...(fn.parameters.some((p) => p.type.endsWith("[]"))
          ? ["from typing import List"]
          : []),
        `def ${fn.name}(${fn.parameters
          .map((p) => `${p.name}`)
          .join(", ")}) -> ${fn.return.type}:
    # TODO: Implement
    pass`,
      ].join("\n");
    case "cpp":
      return [
        "#include <iostream>",
        ...(fn.parameters.some((p) => p.type.endsWith("[]"))
          ? ["#include <vector>"]
          : []),
        "",
        `${formatTypeForLang(fn.return.type, language)} ${
          fn.name
        }(${fn.parameters
          .map((p) =>
            p.type.endsWith("[]")
              ? `std::vector<${p.type.replace("[]", "")}> ${p.name}`
              : `${formatTypeForLang(p.type, language)} ${p.name}`
          )
          .join(", ")}) {
    // TODO: Implement
    return ${getValueFromType(fn.return.type, language)};
}`,
      ].join("\n");
    case "java":
      return [
        `public static ${formatTypeForLang(fn.return.type, language)} ${
          fn.name
        }(${fn.parameters
          .map((p) => `${formatTypeForLang(p.type, language)} ${p.name}`)
          .join(", ")}) {
    // TODO: Implement
    return ${getValueFromType(fn.return.type, language)};
}`,
      ].join("\n");
    case "javascript":
      return [
        `function ${fn.name}(${params}) {
    // TODO: Implement
    return ${getValueFromType(fn.return.type, language)};
}`,
      ].join("\n");
    default:
      return "";
  }
}

export function parseInputToArgs(
  input: string,
  paramTypes: string[],
  language: string
): string[] {
  // For now, assume CSV or whitespace split for primitives, extend as needed
  // TODO: Use JSON for structured input if needed
  if (!input) return paramTypes.map((type) => getValueFromType(type, language));
  const vals = input.includes(",") ? input.split(",") : input.split(/\s+/);
  return paramTypes.map((type, idx) =>
    formatValueForLang((vals[idx] ?? "").trim(), type, language)
  );
}

export function formatValueForLang(
  val: string,
  type: string,
  language: string
): string {
  if (type.endsWith("[]")) {
    const arr = val
      .replace(/\[|\]/g, "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    switch (language) {
      case "python":
        return `[${arr.join(", ")}]`;
      case "cpp":
        return `{${arr.join(", ")}}`;
      case "java":
        return `new ${type.replace("[]", "")}[]{${arr.join(", ")}}`;
      case "javascript":
        return `[${arr.join(", ")}]`;
      default:
        return val;
    }
  }
  switch (type) {
    case "string":
      return `"${val}"`;
    case "bool":
      return val === "true"
        ? language === "python"
          ? "True"
          : "true"
        : language === "python"
        ? "False"
        : "false";
    default:
      return val;
  }
}

function formatTypeForLang(type: string, language: string): string {
  switch (language) {
    case "python":
      return type;
    case "cpp":
      if (type === "string") return "std::string";
      return type;
    case "java":
      if (type === "bool") return "Boolean";
      if (type === "int") return "Integer";
      if (type === "float") return "Float";
      if (type === "string") return "String";
      return type;
    case "javascript":
      return type;
    default:
      return type;
  }
}

export function getValueFromType(type: string, language: string): string {
  switch (type) {
    case "int":
      return "0";
    case "float":
      return "0.0";
    case "bool":
      if (language === "python") return "False";
      return "false";
    case "string":
      return '""';
    default:
      return "";
  }
}

// Helper: Parse stdout to map test index to pass/fail
export function parseStdout(
  stdout: string,
  problem: Problem
): Record<number, boolean> {
  const lines = stdout.split("\n");
  const result: Record<number, boolean> = {};
  lines.forEach((line) => {
    const match = line.match(/CASE_(\d+): (.*)/);
    if (match) {
      const idx = parseInt(match[1], 10);
      result[idx] = match[2] === String(problem.testCases[idx].expectedOutput);
    }
  });
  return result;
}

export function passedAllTests(
  testResults: Judge0Submission,
  problem: Problem
): boolean {
  const stdoutMap = parseStdout(testResults.stdout!, problem);
  return Object.values(stdoutMap).every((v) => v);
}
