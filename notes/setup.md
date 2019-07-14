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
ng add @nrwl/jest
ng add @nrwl/cypress
```

## Create LMS Application

```ts
ng generate application lms --directory --style=scss --prefix=lms --routing --dry-run
```
