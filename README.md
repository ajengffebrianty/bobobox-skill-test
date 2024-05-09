# bobobox-skill-test
Bobobox Skill Test QA Engineer

# How to Run the Test
1. Install cypress using npm install cypress
2. Open terminal and navigate to the project directory.
3. To execute all test cases and modules at once, use npx cypress run
4. To run module one by one with a User Interface, use npx cypress open

# How to Run the Test and Generate the Report
By default, Cypress generates a report for each end-to-end file (cy.js), usually each module corresponds to one file. To consolidate all modules into a single report, I generate a JSON report for each module. Then, use mochawesome-merge to combine all the JSON reports into one file to converted into an HTML report. I include a command in the package.json file to execute the test and generate the report.
1. Install mochawesome for report generation using npm install mochawesome
2. Install mochawesome-merge using npm install mochawesome-merge
3. Navigate to the project directory in your terminal
4. Run the command specified in the package.json file using npm run test.

# Run testing using Cucumber
1. Go to config.js file
2. uncomment the specPattern, to execute the .feature file


