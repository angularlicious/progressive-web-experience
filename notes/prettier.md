```ts
npm install prettier -D
```

Should create a .prettierrc file

```json
{
  "bracketSpacing": true,
  "printWidth": 180,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

## Install Prettier Extension

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```ts
ext install esbenp.prettier-vscode
```

## Remove Formatting Rules from TSLint

The extension installation should do this for you. Best to verify.

## Pre-Commit Hook to Format

Install the pre-commit hook package.

```
npm install npm-run-all husky pretty-quick -D
```

Configure the `husky` script in the package.json file.

> Note: Set the `--pattern` to specify which files are targets for formatting. HTML files are omitted
> to accommodate _i18n_ formatting issues with Angular and xid tags.

```json
"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged  --pattern=\"**/*.*(ts|json)\" --verbose"
    }
  },
```

## Resources

[Setting Up Prettier in an Angular CLI Project/Workspace](https://medium.com/@victormejia/setting-up-prettier-in-an-angular-cli-project-2f50c3b9a537)
