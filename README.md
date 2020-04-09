
# Typescript Preact Material Kit (TPMK)

> For Lack of a Better Name

<img src="assets/img/deps.png" />

## What is it?

  TPMK is an blank app which can be used as a starter kit for building self-hosted mobile/desktop frontend. The kit includes presaved type declarations of Preact, Preact Hooks, Preact Router, TypeStyle *packed into namespaces* and their bundles. This allows you to step away from webpack-style code conversion pipeline and simple use TypeScript as JSX and ES6 transpiler

## Why do I need it?

  Not every project needs to carry a SASS compiler, PostCSS transformer. Sometimes it is necessary that the project can be guaranteed to be assembled after months, years without external corrections. It's is a killer feature for freelance developer's software. Good bye, amazon 404.

   - ### Production build is fast and small

    This kit contains Google Closure Compiler externs, so you can use it's Advanced Compilation. Closure Compiler is a most powerfull Javascript optimisation tool in a world, it is used to optimize React builds. In the process of its work, the typescript namespace closures is expanded into real small chunks of optimised code in one file.

   - ### PWA Caching ready

    If you ever tried to create a PWA caching service worker for one of the existing macro frameworks (e.g. NextJS) you should be familiar with the pain. These Frankenstein monsters from build tools give out a completely random set of files that cannot be controlled by one programmer. The output of the Closure Compiler fits into a single file, allowing you to quickly make deploy.

   - ## Cordova ready

    For those who need real cross-platform

<img src="assets/img/deadmau5.png" height="38px" width="55px" align="right" />