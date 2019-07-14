- [Setup](#Setup)
  - [Install Node Version Manager (LTS)](#Install-Node-Version-Manager-LTS)
  - [Install Node (LTS)](#Install-Node-LTS)
  - [Install Angular CLI](#Install-Angular-CLI)
  - [Power Up a New Nrwl Nx Workspace (version 8)](#Power-Up-a-New-Nrwl-Nx-Workspace-version-8)
  - [Create Nrwl Nx Workspace](#Create-Nrwl-Nx-Workspace)
  - [Add Power-Up](#Add-Power-Up)
  - [Create LMS Application](#Create-LMS-Application)

# Setup

## Install Node Version Manager (LTS)

The development environment is using `nvm` (Node Version Manager) - the latest LTS version. The package manager installed and configured is _Yarn_.

Yarn:

```ts
yarn --version
1.16.0
```

## Install Node (LTS)

Node information.

```ts
nvm install 10.16.0
nvm use 10.16.0
```

## Install Angular CLI

Install the latest version of the Angular CLI.

```ts
yarn global add @angular/cli
```

Verify CLI version.

```ts
ng version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 8.0.1
Node: 10.16.0
OS: win32 x64
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.800.1
@angular-devkit/core         8.0.1
@angular-devkit/schematics   8.0.1
@schematics/angular          8.0.1
@schematics/update           0.800.1
rxjs                         6.4.0
```

## Power Up a New Nrwl Nx Workspace (version 8)

Install the Nrwl tools.

```ts
yarn global add @nrwl/workspace
```

Verify the installation using `yarn global list` command.

```ts
yarn global list
yarn global v1.16.0
info "@angular/cli@8.0.1" has binaries:
   - ng
info "@nrwl/workspace@8.0.1" has binaries:
   - create-nx-workspace
   - nx
```

## Create Nrwl Nx Workspace

Create a new workspace.

```ts
npx --ignore-existing create-nx-workspace workspace --npm-scope=angularlicious
npx: installed 53 in 13.818s
Creating a sandbox with Nx...
ng new "workspace" "--npm-scope=angularlicious" --collection=@nrwl/workspace
? Which stylesheet format would you like to use? SASS(.scss)  [ http://sass-lang.com   ]
? What to create in the new workspace (You can create other applications and libraries at any point using 'ng g') empty            [an empty workspace]
CREATE workspace/angular.json (298 bytes)
CREATE workspace/nx.json (205 bytes)
CREATE workspace/README.md (2688 bytes)
CREATE workspace/tsconfig.json (509 bytes)
CREATE workspace/tslint.json (1574 bytes)
CREATE workspace/package.json (1140 bytes)
CREATE workspace/.editorconfig (245 bytes)
CREATE workspace/.gitignore (503 bytes)
CREATE workspace/.prettierignore (57 bytes)
CREATE workspace/.prettierrc (26 bytes)
CREATE workspace/.vscode/extensions.json (164 bytes)
CREATE workspace/apps/.gitkeep (1 bytes)
CREATE workspace/libs/.gitkeep (0 bytes)
CREATE workspace/tools/tsconfig.tools.json (218 bytes)
CREATE workspace/tools/schematics/.gitkeep (0 bytes)
```

## Add Power-Up

Add the following Nx dependency packages to create Angular applications using Jest and Cypress.

```ts
ng add @nrwl/angular
```

The `@nrwl/angular` template will install the required packages - based on your selections.

```ts
ng add @nrwl/jest
ng add @nrwl/cypress
```

The output of the command:

```ts
ng add @nrwl/angular
Installing packages for tooling via yarn.
yarn add v1.16.0
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning "@nrwl/angular > jasmine-marbles@0.5.0" has unmet peer dependency "rxjs@^6.4.0".
warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor@4.1.0" has unmet peer dependency "webpack@^4.18.1".warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor > babel-loader@8.0.6" has unmet peer dependency "webpack@>=2".
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 145 new dependencies.
info Direct dependencies
└─ @nrwl/angular@8.2.0
info All dependencies
├─ @babel/core@7.5.4
├─ @babel/helper-builder-binary-assignment-operator-visitor@7.1.0
├─ @babel/helper-call-delegate@7.4.4
├─ @babel/helper-define-map@7.4.4
├─ @babel/helper-explode-assignable-expression@7.1.0
├─ @babel/helper-member-expression-to-functions@7.0.0
├─ @babel/helper-replace-supers@7.4.4
├─ @babel/helper-wrap-function@7.2.0
├─ @babel/helpers@7.5.4
├─ @babel/highlight@7.5.0
├─ @babel/parser@7.5.0
├─ @babel/plugin-proposal-async-generator-functions@7.2.0
├─ @babel/plugin-proposal-dynamic-import@7.5.0
├─ @babel/plugin-proposal-json-strings@7.2.0
├─ @babel/plugin-proposal-object-rest-spread@7.5.4
├─ @babel/plugin-proposal-optional-catch-binding@7.2.0
├─ @babel/plugin-proposal-unicode-property-regex@7.4.4
├─ @babel/plugin-transform-arrow-functions@7.2.0
├─ @babel/plugin-transform-async-to-generator@7.5.0
├─ @babel/plugin-transform-block-scoped-functions@7.2.0
├─ @babel/plugin-transform-block-scoping@7.4.4
├─ @babel/plugin-transform-classes@7.4.4
├─ @babel/plugin-transform-computed-properties@7.2.0
├─ @babel/plugin-transform-destructuring@7.5.0
├─ @babel/plugin-transform-dotall-regex@7.4.4
├─ @babel/plugin-transform-duplicate-keys@7.5.0
├─ @babel/plugin-transform-exponentiation-operator@7.2.0
├─ @babel/plugin-transform-for-of@7.4.4
├─ @babel/plugin-transform-function-name@7.4.4
├─ @babel/plugin-transform-literals@7.2.0
├─ @babel/plugin-transform-member-expression-literals@7.2.0
├─ @babel/plugin-transform-modules-amd@7.5.0
├─ @babel/plugin-transform-modules-commonjs@7.5.0
├─ @babel/plugin-transform-modules-systemjs@7.5.0
├─ @babel/plugin-transform-modules-umd@7.2.0
├─ @babel/plugin-transform-named-capturing-groups-regex@7.4.5
├─ @babel/plugin-transform-new-target@7.4.4
├─ @babel/plugin-transform-object-super@7.2.0
├─ @babel/plugin-transform-parameters@7.4.4
├─ @babel/plugin-transform-property-literals@7.2.0
├─ @babel/plugin-transform-regenerator@7.4.5
├─ @babel/plugin-transform-reserved-words@7.2.0
├─ @babel/plugin-transform-shorthand-properties@7.2.0
├─ @babel/plugin-transform-spread@7.2.2
├─ @babel/plugin-transform-sticky-regex@7.2.0
├─ @babel/plugin-transform-template-literals@7.4.4
├─ @babel/plugin-transform-typeof-symbol@7.2.0
├─ @babel/plugin-transform-unicode-regex@7.4.4
├─ @babel/preset-env@7.5.4
├─ @cypress/webpack-preprocessor@4.1.0
├─ @nrwl/angular@8.2.0
├─ @nrwl/cypress@8.2.0
├─ @nrwl/jest@8.2.0
├─ @types/json5@0.0.29
├─ arr-flatten@1.1.0
├─ assign-symbols@1.0.0
├─ atob@2.1.2
├─ babel-loader@8.0.6
├─ base@0.11.2
├─ big.js@5.2.2
├─ braces@2.3.2
├─ browserslist@4.6.6
├─ cache-base@1.0.1
├─ caniuse-lite@1.0.30000984
├─ class-utils@0.3.6
├─ collection-visit@1.0.0
├─ commondir@1.0.1
├─ convert-source-map@1.6.0
├─ copy-descriptor@0.1.1
├─ core-js-compat@3.1.4
├─ core-js-pure@3.1.4
├─ decode-uri-component@0.2.0
├─ deepmerge@2.2.1
├─ electron-to-chromium@1.3.191
├─ emojis-list@2.1.0
├─ errno@0.1.7
├─ expand-brackets@2.1.4
├─ extglob@2.0.4
├─ fill-range@4.0.0
├─ find-cache-dir@2.1.0
├─ for-in@1.0.2
├─ get-value@2.0.6
├─ has-value@1.0.0
├─ has-values@1.0.0
├─ invariant@2.2.4
├─ is-accessor-descriptor@1.0.0
├─ is-data-descriptor@1.0.0
├─ is-descriptor@1.0.2
├─ is-plain-object@2.0.4
├─ is-windows@1.0.2
├─ jasmine-marbles@0.5.0
├─ js-levenshtein@1.1.6
├─ js-tokens@4.0.0
├─ jsesc@2.5.2
├─ kind-of@3.2.2
├─ loader-utils@1.2.3
├─ loose-envify@1.4.0
├─ make-dir@2.1.0
├─ map-visit@1.0.0
├─ memory-fs@0.4.1
├─ micromatch@3.1.10
├─ mixin-deep@1.3.2
├─ nanomatch@1.2.13
├─ node-releases@1.1.25
├─ object-copy@0.1.0
├─ object.assign@4.1.0
├─ pascalcase@0.1.1
├─ pkg-dir@3.0.0
├─ posix-character-classes@0.1.1
├─ private@0.1.8
├─ prr@1.0.1
├─ regenerate-unicode-properties@8.1.0
├─ regenerator-transform@0.14.0
├─ regexp-tree@0.1.11
├─ regjsgen@0.5.0
├─ regjsparser@0.6.0
├─ repeat-element@1.1.3
├─ resolve-url@0.2.1
├─ ret@0.1.15
├─ set-value@2.0.1
├─ snapdragon-node@2.1.1
├─ snapdragon-util@3.0.1
├─ source-map-resolve@0.5.2
├─ source-map-url@0.4.0
├─ source-map@0.5.7
├─ split-string@3.1.0
├─ static-extend@0.1.2
├─ tapable@1.1.3
├─ to-fast-properties@2.0.0
├─ to-object-path@0.3.0
├─ to-regex-range@2.1.1
├─ tree-kill@1.2.1
├─ trim-right@1.0.1
├─ ts-loader@5.3.1
├─ tsconfig-paths-webpack-plugin@3.2.0
├─ tsconfig-paths@3.8.0
├─ unicode-canonical-property-names-ecmascript@1.0.4
├─ unicode-match-property-ecmascript@1.0.4
├─ unicode-match-property-value-ecmascript@1.1.0
├─ unicode-property-aliases-ecmascript@1.0.5
├─ union-value@1.0.1
├─ unset-value@1.0.0
├─ urix@0.1.0
├─ use@3.1.1
└─ webpack-node-externals@1.7.2
Done in 28.32s.
Installed packages for tooling via yarn.
? Which Unit Test Runner would you like to use for the application? Jest  [ https://jestjs.io ]
? Which E2E Test Runner would you like to use? Cypress    [ https://www.cypress.io ]
CREATE jest.config.js (275 bytes)
UPDATE angular.json (464 bytes)
UPDATE package.json (1892 bytes)
warning jest > jest-cli > jest-config > jest-environment-jsdom > jsdom > left-pad@1.3.0: use String.prototype.padStart()
warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor@4.1.0" has unmet peer dependency "webpack@^4.18.1".warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor > babel-loader@8.0.6" has unmet peer dependency "wePS D:\development\gitlab\lms\workspace>
```

## Create LMS Application

```ts
ng generate application lms --directory --style=scss --prefix=lms --routing --dry-run
```

## CI Setup

Follow the instructions in:

- yaml.md
- prettier.md
