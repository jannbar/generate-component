# generate-component

A simple Node.js CLI to generate new React components. It auto-detects if your project uses TypeScript and if the component already exists. The CLI is framework agnostic, so you can use it with CRA, Gatsby and Next.js. For every new component, a directory with the following structure gets created:

- src/components/my-component
  - index.js
  - MyComponent.js

This way you can easypeasy import the component like this:  
`import MyComponent from '../components/my-component'`

Note: When running the CLI, you need to pass the component name as an argument:  
`npx @wh1zk1d/generate-component mycomponent`

Happy hacking! 🐠
