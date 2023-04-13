module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "extension": [
    ".ts",
    ".tsx"
  ],
  "exclude": [
    "**/*.d.ts"
  ],
  "include": [
    "src/services",
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov",
  ],
  "all": true,
}