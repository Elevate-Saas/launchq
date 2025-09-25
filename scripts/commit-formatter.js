#!/usr/bin/env node

const chalk = require("chalk");

function formatCommitlintOutput(results) {
  if (!results || results.length === 0) {
    return "";
  }

  let output = "\n";
  output += chalk.red.bold("❌ Commit message validation failed!\n\n");

  results.forEach((result, index) => {
    output += chalk.yellow(`📝 Commit: ${chalk.cyan(result.input)}\n`);

    if (result.errors && result.errors.length > 0) {
      output += chalk.red("🚨 Errors:\n");
      result.errors.forEach((error) => {
        output += `   ${chalk.red("•")} ${getDescriptiveMessage(error)}\n`;
      });
    }

    if (result.warnings && result.warnings.length > 0) {
      output += chalk.yellow("⚠️  Warnings:\n");
      result.warnings.forEach((warning) => {
        output += `   ${chalk.yellow("•")} ${getDescriptiveMessage(warning)}\n`;
      });
    }

    if (index < results.length - 1) {
      output += "\n";
    }
  });

  output += "\n";
  output += chalk.blue.bold("💡 Commit message format should be:\n");
  output += chalk.gray("   <type>(<scope>): <subject>\n\n");
  output += chalk.blue.bold("📋 Valid types:\n");
  output += chalk.gray("   • feat:     A new feature\n");
  output += chalk.gray("   • fix:      A bug fix\n");
  output += chalk.gray("   • docs:     Documentation changes\n");
  output += chalk.gray("   • style:    Code style changes\n");
  output += chalk.gray("   • refactor: Code refactoring\n");
  output += chalk.gray("   • perf:     Performance improvements\n");
  output += chalk.gray("   • test:     Adding or updating tests\n");
  output += chalk.gray("   • chore:    Maintenance tasks\n");
  output += chalk.gray("   • ci:       CI/CD changes\n");
  output += chalk.gray("   • build:    Build system changes\n");
  output += chalk.gray("   • revert:   Reverting previous commits\n\n");
  output += chalk.blue.bold("📖 Examples:\n");
  output += chalk.gray("   • feat: add user authentication\n");
  output += chalk.gray("   • fix: resolve login validation issue\n");
  output += chalk.gray("   • docs: update API documentation\n");
  output += chalk.gray("   • style: format code with prettier\n\n");
  output += chalk.blue("🔗 Learn more: https://www.conventionalcommits.org/\n");

  return output;
}

function getDescriptiveMessage(error) {
  const messages = {
    "type-empty":
      'Commit type is required. Add a type like "feat:", "fix:", "docs:", etc.',
    "type-case": 'Commit type must be lowercase. Use "feat" instead of "Feat".',
    "type-enum":
      "Invalid commit type. Use one of: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert.",
    "subject-empty":
      "Commit subject is required. Add a description after the colon.",
    "subject-full-stop": "Commit subject should not end with a period.",
    "header-max-length":
      "Commit message is too long. Keep it under 100 characters.",
    "scope-case": "Commit scope must be lowercase.",
    "body-leading-blank": "Commit body should start with a blank line.",
    "footer-leading-blank": "Commit footer should start with a blank line.",
  };

  return messages[error.name] || error.message || "Unknown validation error";
}

// Read from stdin
let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    input += chunk;
  }
});

process.stdin.on("end", () => {
  try {
    const results = JSON.parse(input);
    const formatted = formatCommitlintOutput(results);
    if (formatted) {
      process.stdout.write(formatted);
      process.exit(1);
    }
  } catch (error) {
    // If it's not JSON, just pass through the original output
    process.stdout.write(input);
  }
});
