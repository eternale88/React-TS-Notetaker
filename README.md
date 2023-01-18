# React-TS-Notetaker
Hosted for continuous deployment on Netlify [https://63c1d53acfb30800095a18f6--typescript-note-taker.netlify.app/]


## Synopsis

A React note taking app I  built with  React v18, HTML5, Material UI v5 and TypeScript.  - It allows a user to create, read, update and delete notes. I've also adding Categories to notes, which  have CRUD functionality as well. Other highlights are markdown support, responsive design, and search filtering.  I've implemented a recent upgrade from React router 5 to version 6 for the pages, and for redirection. It uses Context Api for global state management, React Hooks for internal component state management.

## Motivation

To get better at building apps in React, maintain some knowledge of TS and Context gained in previous job,  and personal enrichment. 




## License

&copy; 2023 Ethan Robbins
# Issues encountered and their fix

#### React Router Fix

(Fix)[https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc]

#### CRA Fix

```

"build": "CI= react-scripts build",

```
