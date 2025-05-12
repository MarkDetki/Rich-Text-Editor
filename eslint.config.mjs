import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import html from "@html-eslint/eslint-plugin";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    pluginJs.configs.recommended,
    {
        files: ["**/*.js"],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": [
                "error",
                {
                    singleQuote: true,
                    trailingComma: "all",
                    bracketSpacing: false,
                    tabWidth: 4,
                    endOfLine: "auto",
                    printWidth: 110,
                },
            ],
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "no-unused-vars": "error",
            "no-var": "error",
        },
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        ...html.configs["flat/recommended"],
        files: ["**/*.html"],
        rules: {
            ...html.configs["flat/recommended"].rules,
            "@html-eslint/indent": "error",
        },
    },
];
