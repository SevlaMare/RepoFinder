# Search GitHub Repositories App

> Search GitHub Repositories with custom filters, see repository details in a dashboard.

## Requirements

[Node 22.x](https://nodejs.org/en/download)
[Yarn 2.x](https://classic.yarnpkg.com/lang/en/docs/install)

## Github API relevant docs
https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories

https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax

https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories


## Stack
- React: Facilitate componentization and render control.
- React Router: Navigation.
- TypeScript: Better developer experience.
- Tailwind: Standart classes names for plain CSS usage.
- Vite: Assets pipeline.
- Playwright: For end to end testing.
- Eslint + Prettier + Stylelint: To make the code base more standart.
- D3: library with many functions that that help draw SVG on browser.

## To go into production
- Add observability tools
- Centralize state with Redux
- Manage API data using RTK (retry, debounce, cache, etc.)
- Full test coverage
- Rise error handling coverage

## Features Suggestions
- Allow token to be passed as configuration (for a higher api calls limit)
- Allow to select and compare repositories statistics

## Run the project locally
From a shell in the project folder:

Install dependencies
```
yarn
```

run the project
```
yarn dev
```

## Access
```
localhost:3000
```
