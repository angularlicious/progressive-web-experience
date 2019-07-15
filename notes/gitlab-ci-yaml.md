# GitLab CI

GitLab is a Git source code repository as well as a _Continuous Integration_ (CI) tool. Define the configuration using YAML. Each time a branch is pushed to the repository, GitLab will run a pipeline for the specified branch.

All of the information for the pipeline is stored in a `gitlab-ci.yml` file in the root of the GitLab repository.

## Pipeline

One of the first things to do is to establish the sequence of _jobs_ in the pipeline. They are defined using the `stages` property in the configuration file.

```yml
stages:
  - restore
  - build
  - test
  - package
  - publish
  - deploy
```

## Workflow

The _before_ and _after_ scripts run before and after each of _stage_ items listed. Use these scripts in the pipeline to perform any required setup or breakdown for each of the _jobs_ in the pipeline.

- before_script
- after_script

## Stages

### restore

asdf

- stage: use to indicate the `restore` job.
- only
  - define the branches by name that are _allowed_ for this job
- script
  - install any required packages to the Angular Workspace
  - perform `yarn install` to update `node_modules`
- cache
  - create a _key_ for the node_modules cache
  - provide a path to the `node_modules` folder

```yml
restore:
  stage: restore
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn add @angular/cli@8.0.0 --save
    # - yarn add node-jq --save
    - yarn install
  cache:
    # Preparing to set/retrieve node_modules cache.
    key: nodemodules
    paths:
      - workspace/node_modules
```

## Complete YAML Configuration

```yml
image: node:10.16.0

before_script:
  # - ng version
  - yarn --version
  - date

after_script:
  - date

stages:
  - restore
  - build
  - test
  - package
  - publish
  - deploy

restore:
  stage: restore
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn add @angular/cli@8.0.0 --save
    # - yarn add node-jq --save
    - yarn install
  cache:
    # Preparing to set/retrieve node_modules cache.
    key: nodemodules
    paths:
      - workspace/node_modules

build:snapshot:
  stage: build
  # only build non prod branches
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
  except:
    - master
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn build lms --aot --no-progress
    - rm -rf dist
    - yarn build lms --no-progress
  artifacts:
    expire_in: 1 day
    paths:
      - workspace/dist
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

build:rc:
  stage: build
  # only build non prod branches
  only:
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn build lms --aot --no-progress
  artifacts:
    expire_in: 1 day
    paths:
      - workspace/dist
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

build:release:
  stage: build
  # only build master and release branches
  only:
    - master
  script:
    - cd workspace
    - yarn build lms --aot --prod --no-progress
  artifacts:
    expire_in: 1 day
    paths:
      - workspace/dist
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

test:lint:
  stage: test
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn lint
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

test:lintformatting:
  stage: test
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace
    - yarn format:check
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

test:unit:
  stage: test
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - cd workspace;
    - yarn test;
  cache:
    key: nodemodules
    policy: pull
    paths:
      - workspace/node_modules

package:snapshot:
  stage: package
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - /^.*\/release\/.*$/
    - develop
  except:
    - master
  script:
    - cd workspace
    - echo "Package here"
    - mkdir -p $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - mv dist/apps/lms/* $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID/
    - rm -rf dist/apps/
    - cd $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - echo $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - ls -l
    - date
    - date -u
    - date -R
  artifacts:
    expire_in: 1 day
    paths:
      - $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
  dependencies:
    - build:snapshot
    - build:rc

package:release:
  stage: package
  only:
    - master
  script:
    - cd workspace
    - echo "Package here"
    - mv dist/apps/lms/* dist/
    - rm -rf dist/apps/
    - mkdir -p $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - cp dist/* $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - cd $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
    - ls -l
    - date
    - date -u
    - date -R
  artifacts:
    expire_in: 1 day
    paths:
      - $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID
  dependencies:
    - build:release

publish:
  stage: publish
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
    - master
    - develop
    - /^.*\/release\/.*$/
  script:
    - pkg=$(ls $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID)
    - echo $pkg
    # - curl -v -k --upload-file $pkg https://SOMEWHERE-OUT-THERE/$pkg

deploy:test:
  stage: deploy
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
  except:
    - master
    - /^.*\/release\/.*$/
  script:
    - pkg=$(ls $CI_PROJECT_DIR/artifacts/lms-$CI_PIPELINE_ID)
    - echo $pkg
    # - git clone
    # - url="SOMEWHERE-OUT-THERE";
  when: manual

deploy:stage:
  stage: deploy
  only:
    - /^.*\/release\/.*$/
    - develop
  script:
    - appVars=$(find . -type f \( -iname "env.props" \));
    - source $appVars;
    - echo $PROJECT_NAME;
    - echo $PACKAGE_VERSION;
    # - git clone
    # - url="SOMEWHERE-OUT-THERE";
  cache:
    key: packagevars
    policy: pull
    paths:
      - workspace/env.props
  when: manual

deploy:production:
  stage: deploy
  only:
    - master
  script:
    - appVars=$(find . -type f \( -iname "env.props" \));
    - source $appVars;
    - echo $PROJECT_NAME;
    - echo $PACKAGE_VERSION;
    # - git clone
    # - url="SOMEWHERE-OUT-THERE";
  cache:
    key: packagevars
    policy: pull
    paths:
      - workspace/env.props
  when: manual
```
