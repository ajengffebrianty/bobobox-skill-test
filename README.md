# Cypress sauce demo

# How to Run the Test and Generate the Report
By default, Cypress generates a report for each end-to-end file (cy.js), usually each module corresponds to one file. To consolidate all modules into a single report, I generate a JSON report for each module. Then, use mochawesome-merge to combine all the JSON reports into one file to converted into an HTML report. I include a command in the package.json file to execute the test and generate the report.

1. Install cypress using npm install cypress
2. Install moment for date naming using npm install momentInstall mochawesome for report generation using npm install mochawesome
2. Install mochawesome-merge using npm install mochawesome-merge
3. Navigate to the project directory in your terminal
4. Run the command specified in the package.json file using npm run test.
5. Report will generated in folder /projectDirectory/cypress/report/date_hh:mm:ss/report.html, copy the path of html file then open in browser
6. To run module one by one with a User Interface, use npx cypress open


