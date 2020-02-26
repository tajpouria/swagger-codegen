We just not yet exactly decided about contribution rules; however I think understanding following concepts and answering some common question can be helpful

#### How this repository structured?

Currently repository is made three main packages available on [packages/](https://github.com/tajpouria/swagger-codegen/tree/master/packages) folder :

1. [swagger-codegen-cli](https://github.com/tajpouria/swagger-codegen/tree/master/packages/swagger-codegen-cli) Public package contains all the logics that is related to interacting with swagger-codegen command line interface
2. [swagger-codegen-core](https://github.com/tajpouria/swagger-codegen/tree/master/packages/swagger-codegen-core) Public package contains core concepts and client utilities behinds swagger-codegen

3. [ utils ](https://github.com/tajpouria/swagger-codegen/tree/master/packages/utils) Private package; contains swagger-codegen's shared helpers and types

#### How can I make project up and running?

Well, we use yarn monorepo and managing stuff using [ lerna ](https://github.com/lerna/lerna)

- Simply clone the repo

```sh
git clone https://github.com/tajpouria/swagger-codegen/tree/master/packages/utils && cd swagger-codegen
```

- Install Repo and packages dependencies

```sh
yarn && yarn bootstrap
```

There we go!

#### How can I make a PR?

We follows known [ git-flow ](https://datasift.github.io/gitflow/IntroducingGitFlow.html) principles and project setting up to running our linter rules on `git commit` level

You can find our tags on [tags on this repository](https://github.com/tajpouria/swagger-codegen/tags) **make sure to create your pull request on you target tag version dev branch** for example if you want make some change on version `v0.0.1` you should make your pull request on `v0.0.1-dev` branch
