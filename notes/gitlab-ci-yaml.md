```yml
before_script:
  # - ng --version
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
    - fdescribes=""
    - fdescribes=$(grep -R --include \*.spec* --exclude-dir=node_modules -w "fdescribe('*" ./ || true)
    - if [[ $fdescribes ]]; then echo "Found fdescribes!" && echo $fdescribes && exit 1; else echo "No fdscribes found"; fi;
    - fits=""
    - fits=$(grep -R --include \*.spec* --exclude-dir=node_modules -w "fit('*" ./ || true)
    - if [[ $fits ]]; then echo "Found fits!" && echo $fits && exit 1; else echo "No fits found"; fi;
    - yarn install
  cache:
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
    - ng build lms --aot --no-progress
    - rm -rf dist
    - ng build lms --no-progress
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
    - ng build lms --aot --no-progress
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
    - ng build lms --aot --prod --no-progress
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
    - rm karma.conf.js;
    - mv karma.conf.js.build karma.conf.js;
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
    - cleanver=$(cat package.json | jq '.version' | cut -d '"' -f 2)
    - packageVer="$cleanver-$CI_COMMIT_REF_NAME-$CI_BUILD_ID"
    - cleanPackageVer=$(echo $packageVer | tr / _)
    - echo $cleanPackageVer
    - echo "PACKAGE_VERSION=$cleanPackageVer"    > env.props
    - echo "PROJECT_NAME=lms"           >> env.props
    - cat env.props
    - mv dist/apps/lms/* dist/
    - rm -rf dist/apps/
    - zip -r lms.$cleanPackageVer.zip dist/
    - ls lms.*.zip
    - mv lms.*.zip ../
  cache:
    key: packagevars
    paths:
      - workspace/env.props
  artifacts:
    expire_in: 1 day
    paths:
      - lms.*.zip
      - workspace/env.props
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
    - cleanver=$(cat package.json | jq '.version' | cut -d '"' -f 2)
    - echo $cleanver
    - echo "PACKAGE_VERSION=$cleanver"    > env.props
    - echo "PROJECT_NAME=lms"    >> env.props
    - cat env.props
    - mv dist/apps/lms/* dist/
    - rm -rf dist/apps/
    - zip -r lms.$cleanver.zip dist/
    - ls lms.*.zip
    - mv lms.*.zip ../
  cache:
    key: packagevars
    paths:
      - workspace/env.props
  artifacts:
    expire_in: 1 day
    paths:
      - lms.*.zip
      - workspace/env.props
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
    - pkg=$(ls lms.*.zip)
    - echo $pkg
    - curl -v -k --upload-file $pkg https://pacman.tcdevops.com/repository/Angular/$pkg

deploy:test:
  stage: deploy
  only:
    - /^.*\/feature\/.*$/
    - /^.*\/bugfix\/.*$/
  except:
    - master
    - /^.*\/release\/.*$/
  script:
    - appVars=$(find . -type f \( -iname "env.props" \));
    - source $appVars;
    - echo $PROJECT_NAME;
    - echo $PACKAGE_VERSION;
    - git clone http://gitlab.tcdevops.com/ansible/Deploy.AngularApp.git
    - url="https://serverinventory.tcdevops.com/ansible_inventory?Tags=$PROJECT_NAME&Tags=TestEnv&Tags=linux";
      curl -v -X GET --header "Accept:text/plain" $url      > inventory;
      echo "[target_servers:vars]"                          >> inventory;
      echo "ansible_user=ansible_rm"                        >> inventory;
      echo "ansible_connection=ssh"                         >> inventory;
      export ANSIBLE_FORCE_COLOR=true;
      ansible-playbook ./Deploy.AngularApp/deploy_angular_app_svc_registration.yml -i inventory --extra-vars "TARGET_MACHINE=target_servers ANGULAR_APP_NAME=$PROJECT_NAME ANGULAR_APP_VERSION=$PACKAGE_VERSION URL_PREFIX=testnextgen.dropcatch.com/";
  cache:
    key: packagevars
    policy: pull
    paths:
      - workspace/env.props
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
    - git clone http://gitlab.tcdevops.com/ansible/Deploy.AngularApp.git
    - url="https://serverinventory.tcdevops.com/ansible_inventory?Tags=$PROJECT_NAME&Tags=Staging&Tags=linux";
      curl -v -X GET --header "Accept:text/plain" $url      > inventory;
      echo "[target_servers:vars]"                          >> inventory;
      echo "ansible_user=ansible_rm"                        >> inventory;
      echo "ansible_connection=ssh"                         >> inventory;
      export ANSIBLE_FORCE_COLOR=true;
      ansible-playbook ./Deploy.AngularApp/deploy_angular_app_svc_registration.yml -i inventory --extra-vars "TARGET_MACHINE=target_servers ANGULAR_APP_NAME=$PROJECT_NAME ANGULAR_APP_VERSION=$PACKAGE_VERSION URL_PREFIX=stgnextgen.dropcatch.com/";
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
    - git clone http://gitlab.tcdevops.com/ansible/Deploy.AngularApp.git
    - url="https://serverinventory.tcdevops.com/ansible_inventory?Tags=$PROJECT_NAME&Tags=Production&Tags=linux";
      curl -v -X GET --header "Accept:text/plain" $url      > inventory;
      echo "[target_servers:vars]"                          >> inventory;
      echo "ansible_user=ansible_rm"                        >> inventory;
      echo "ansible_connection=ssh"                         >> inventory;
      export ANSIBLE_FORCE_COLOR=true;
      ansible-playbook ./Deploy.AngularApp/deploy_angular_app_svc_registration.yml -i inventory --extra-vars "TARGET_MACHINE=target_servers ANGULAR_APP_NAME=$PROJECT_NAME ANGULAR_APP_VERSION=$PACKAGE_VERSION URL_PREFIX=nextgen.dropcatch.com/";
  cache:
    key: packagevars
    policy: pull
    paths:
      - workspace/env.props
  when: manual
```

## restore

```ts
Running with gitlab-runner 12.1.0-rc1 (6da35412)
  on docker-auto-scale 72989761
Using Docker executor with image node:10.16.0 ...
Pulling docker image node:10.16.0 ...
Using docker image sha256:4ae749096a479ec364232587395b5ef29bbc0c4f026d6875d9672e0c680f44c6 for node:10.16.0 ...
Running on runner-72989761-project-13311542-concurrent-0 via runner-72989761-srm-1563149552-65e97ea9...
Fetching changes with git depth set to 50...
Initialized empty Git repository in /builds/angularlicious/lms/.git/
Created fresh repository.
From https://gitlab.com/angularlicious/lms
 * [new branch]      20170714a/feature/ci-setup-and-configuration -> origin/20170714a/feature/ci-setup-and-configuration
Checking out c91ac06b as 20170714a/feature/ci-setup-and-configuration...

Skipping Git submodules setup
Checking cache for nodemodules...
Downloading cache.zip from https://storage.googleapis.com/gitlab-com-runners-cache/project/13311542/nodemodules
Successfully extracted cache
$ yarn --version
1.16.0
$ date
Mon Jul 15 00:14:22 UTC 2019
$ cd workspace
$ yarn add @angular/cli@8.0.0 --save
yarn add v1.16.0
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "linux" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor@4.1.0" has unmet peer dependency "webpack@^4.18.1".
warning "@nrwl/angular > @nrwl/cypress > @cypress/webpack-preprocessor > babel-loader@8.0.6" has unmet peer dependency "webpack@>=2".
[4/4] Building fresh packages...
warning "@angular/cli" is already in "devDependencies". Please remove existing entry first before adding it to "dependencies".
success Saved 0 new dependencies.
Done in 106.69s.
$ yarn install
yarn install v1.16.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 1.04s.
Running after script...
$ date
Mon Jul 15 00:16:13 UTC 2019
Creating cache nodemodules...
workspace/node_modules: found 57979 matching files
Uploading cache.zip to https://storage.googleapis.com/gitlab-com-runners-cache/project/13311542/nodemodules
Created cache
Job succeeded
```

## build:snapshot

```ts
Running with gitlab-runner 12.1.0-rc1 (6da35412)
  on docker-auto-scale ed2dce3a
Using Docker executor with image node:10.16.0 ...
Pulling docker image node:10.16.0 ...
Using docker image sha256:4ae749096a479ec364232587395b5ef29bbc0c4f026d6875d9672e0c680f44c6 for node:10.16.0 ...
Running on runner-ed2dce3a-project-13311542-concurrent-0 via runner-ed2dce3a-srm-1563149749-9f9310ff...
Fetching changes with git depth set to 50...
Initialized empty Git repository in /builds/angularlicious/lms/.git/
Created fresh repository.
From https://gitlab.com/angularlicious/lms
 * [new branch]      20170714a/feature/ci-setup-and-configuration -> origin/20170714a/feature/ci-setup-and-configuration
Checking out c91ac06b as 20170714a/feature/ci-setup-and-configuration...

Skipping Git submodules setup
Checking cache for nodemodules...
Downloading cache.zip from https://storage.googleapis.com/gitlab-com-runners-cache/project/13311542/nodemodules
Successfully extracted cache
$ yarn --version
1.16.0
$ date
Mon Jul 15 00:18:01 UTC 2019
$ cd workspace
$ ng build lms --aot --no-progress
/bin/bash: line 88: ng: command not found
Running after script...
$ date
Mon Jul 15 00:18:02 UTC 2019
ERROR: Job failed: exit code 1
```
