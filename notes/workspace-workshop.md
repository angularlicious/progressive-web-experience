- [Angular Workspace Workshop](#angular-workspace-workshop)
  - [Overview](#overview)
  - [Pre-Reading](#pre-reading)
  - [What you need to know?](#what-you-need-to-know)
  - [Software Downloads](#software-downloads)
    - [Install Node Version Manager (LTS)](#install-node-version-manager-lts)
    - [Install Yarn](#install-yarn)
    - [Install Node (LTS)](#install-node-lts)
    - [Install Angular CLI](#install-angular-cli)
    - [Power Up a New Nrwl Nx Workspace (version 8)](#power-up-a-new-nrwl-nx-workspace-version-8)
    - [Add Nx Power-Ups](#add-nx-power-ups)
  - [Create Nrwl Nx Workspace](#create-nrwl-nx-workspace)
    - [Generate an Application](#generate-an-application)
  - [Cross-Cutting Libraries](#cross-cutting-libraries)
    - [Error Handling](#error-handling)
    - [Configuration](#configuration)

# Angular Workspace Workshop

## Overview

The Angular Workspace with library capabilities is the biggest game changer in our development workflow today. Sharing and reusing code is more important than ever for effective developers and teams - no more copy/paste coding. Multiple Angular projects in a single environment is the most efficient way to manage, build, and serve our applications. This workshop will provide the guidance you need to take advantage of the many Workspace features and capabilities.

The Angular Workspace workshop will require at least Angular version 6. However, version 8 is recommended to align with the sample application(s) and library projects.

- Angular 6 is the first version with Workspace capabilities.

The workshop will cover:

- Setting up Workspace environment
  - How to use with Angular (default) or Nrwl.io Nx for Workspace (pros/cons)
- Workspace capabilities and benefits
  - Benefits of a monorepo
  - Code organization (simplify, share, and reuse code)
- How to manage multiple application projects in a single environment.
- What are library projects?
  - How to manage multiple library projects.
  - How libraries simplify code base
  - Code sharing and reuse
  - How to provide configuration to library projects
- Different types of library projects:
  - Cross-cutting concerns (logging, error handling, configuration, notifications)
  - Feature libraries (security)
  - Utility/Frameworks (business rule engine, business actions)
  - Foundational (support Angular Services, Components, HttpClient)
- How to publish custom libraries as packages to npm.org
- How to enhance your Angular Services and Components using shared libraries
  - notifications
  - handling errors
  - logging
- Simplify your HttpClient/API calls with a single library

## Pre-Reading

If you would like to have some general concepts in mind before the workshop. Here is a list of recommended reading:

- [Angular 6 Workspace :: Test-Drive](https://medium.com/@angularlicious/angular-6-workspace-test-drive-cfe24bbceeb3)
- [MonoRepo + Angular Packaged Libs :: You Can Have Your Cake and Eat It Too!!](https://medium.com/@angularlicious/monorepo-angular-packaged-libs-you-can-have-your-cake-and-eat-it-too-8c5687c4ffe9)
- [Use RxJS to Push Configuration to Angular Libraries](https://medium.com/angularlicious/use-rxjs-to-push-configuration-to-angular-libraries-1c47830cc394)
- [Angular Workspace File Structure](https://angular.io/guide/file-structure)
- [Angular Workspace Configuration](https://angular.io/guide/workspace-config)

## What you need to know?

Since the Angular Workspace is the default environment for working with Angular applications, libraries, and schematics it is now a fundamental. This workshop will provide guideance, pro tips, and information to get started with Workspace fundamentals, but it will also provide more advanced concepts in code organization using libraries. Therefore, you should have the following understanding:

- Angular CLI (basic commands)
  - ability to run CLI commands in terminal
  - build and serve applications
  - `ng help`, `ng generate library --help`, `ng generate application --help`
- TypeScript fundamentals (classes, interfaces)

## Software Downloads

### Install Node Version Manager (LTS)

The development environment is using `nvm` (Node Version Manager) - the latest LTS version. Download and install the LTS version for your Mac/PC. Verify your installation:

```ts
nvm version
```

### Install Yarn

The package manager installed and configured is _Yarn_.

Yarn:

```ts
yarn --version
1.16.0
```

### Install Node (LTS)

With NVM, you can use commands to install and use specific versions of node.

```ts
nvm install 10.16.0
nvm use 10.16.0
```

### Install Angular CLI

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

### Power Up a New Nrwl Nx Workspace (version 8)

Install the Nrwl.io tools (optional). Nrwl Nx provides some additional enhancements to the Angular Workspace. It is not required, but there are some nice features that will be discussed in the workshop.

```ts
yarn global add @nrwl/workspace
```

Verify the installation using `yarn global list` command. You should see the `@nrwl/workspace` item listed.

```ts
yarn global list
yarn global v1.16.0
info "@angular/cli@8.0.1" has binaries:
   - ng
info "@nrwl/workspace@8.0.1" has binaries:
   - create-nx-workspace
   - nx
```

### Add Nx Power-Ups

Add the following Nx dependency packages to create Angular applications using Jest and Cypress.

```ts
ng add @nrwl/angular
```

The `@nrwl/angular` template will install the required packages - based on your selections.

```ts
ng add @nrwl/jest
ng add @nrwl/cypress
```

## Create Nrwl Nx Workspace

Use Nrwl.io Nx to create a new workspace.

Command Syntax:

```ts
npx --ignore-existing create-nx-workspace <YOUR-WORKSPACE-NAME> --npm-scope=<YOUR-SCOPE-NAME>
```

Example:

```ts
npx --ignore-existing create-nx-workspace workspace --npm-scope=angularlicious
```

The output of the command should be similar to the following.

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

### Generate an Application

```ts
ng generate application lms --directory --style=scss --prefix=lms --routing --dry-run
```

## Cross-Cutting Libraries

```ts
ng g module modules/crossCutting --project=lms --dry-run
```

### Error Handling

```ts
ng g library errorHandling --publishable
```

### Configuration

```ts
ng g library configuration --publishable
ng g service configuration --project=configuration
ng g interface iConfiguration --project=configuration
ng g class configurationContext --project=configuration
```

### Rules Engine

```ts
ng g library rulesEngine --publishable
```
