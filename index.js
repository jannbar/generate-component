#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const join = path.join

// Helper function to check if a directory already exists
function doesDirectoryExist(dir) {
  return fs.existsSync(dir)
}

// Helper function to make the first letter uppercase
function formatFilename(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Check if TypeScript is used
let isTypescript = false
if (fs.existsSync('./tsconfig.json')) {
  isTypescript = true
}

// Check if the components folder already exists
const componentsDir = join(process.cwd(), 'src/components')

if (!doesDirectoryExist(componentsDir)) {
  console.log(chalk.green('🚀 Creating the /components directory'))
  fs.mkdirSync(componentsDir)
}

// Grab the component name from the arguments
const componentName = process.argv[2]
if (!componentName) {
  console.log(chalk.red('🚨 Error: Missing component name argument'))
  process.exit(1)
}

const componentPath = join(componentsDir, componentName)
if (!doesDirectoryExist(componentPath)) {
  fs.mkdirSync(componentPath)

  const filename = formatFilename(componentName)
  let suffix = isTypescript ? '.ts' : '.js'

  const indexFile = join(componentPath, `index${suffix}`)
  const componentFile = join(componentPath, `${filename}${suffix}`)
  fs.writeFileSync(indexFile, `import ${filename} from './${filename}'\nexport default ${filename}`)
  fs.writeFileSync(componentFile, `const ${filename} = () => ()\n\nexport default ${filename}`)

  console.log(
    chalk.green(`✨ Created a new '${componentName}' component in src/components/${componentName}`)
  )
} else {
  console.log(chalk.red(`🚨 Aborting: A '${componentName}' component already exists`))
}

// Exit the script
process.exit(0)
