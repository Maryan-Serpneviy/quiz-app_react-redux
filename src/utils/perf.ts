/* eslint-disable no-console */
const funcStyle = `
   color: green;
   font-weight: bold;
   font-size: 17px;
`
const performanceNowTitle = `
   color: blue;
   font-weight: bold;
   font-size: 16px;
`
const consoleTimeTitle = `
   color: red;
   font-weight: bold;
   font-size: 16px;
`
const performanceNowValue = `
   color: rgb(47, 233, 118);
   font-weight: bold;
   font-size: 20px;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   background: #474747;
   padding: 5px 50px;
   letter-spacing: 2px
`

export default function performance(func, ...args) {
   const start = window.performance.now()
   func(args)
   const end = window.performance.now()

   console.log(`name: %c${func.name}()`, funcStyle)
   console.log('method: %cperformance.now()', performanceNowTitle)
   console.log(`%c${(end - start).toFixed(3)}`, performanceNowValue)
   
   console.log('method: %cconsole.time()', consoleTimeTitle)
   console.time(func(args))
   func(args)
   console.timeEnd(func(args))
}
