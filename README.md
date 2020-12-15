# Info Terp

**Description:** 
Our application provides UMD INST undergraduate students a way to see the GPA trends and Pass/Fail/Withdrawal vs. Letter Grading rates for all of their classes and sections from the past 3 semesters, since the COVID-19 pandemic forced students to take courses online in Fall 2020. Students can observe the shifts in the GPA and the Pass/Fail/Withdrawal rates from past semesters before the online transition to the semesters when and after the transition occurred. This helps students get an idea of how the class performed after the online transition and decide if taking a class virtually would suit them.

**Link to Heroku:** 
https://majestic-falcons-final.herokuapp.com/index.html

**Description of Target Browsers:**
Google Chrome, Safari, Microsoft Edge

**Link to User Manual:**
https://github.com/jmontano98/MajesticFalconsFinal/blob/master/public/doc.html 

**Developer Manual:**

*Application and Dependency Installation*

- Clone our Github repository
- Run npm install in terminal window
- Run npm start to start the server on the local host and test out the webpage

*How to Run Application on Web Server*

- If someone is cloning our app to run themselves, they must attach the Github Repository to a SaaS such as Heroku by running the initial set up and enabling automatic deploys

*How to Run Any Tests Written For Our Software*

- We have no written tests for our software, debugging is possible for us through console log statements and inspecting the server on localhost 3000

*Description of the API for our Server Application*
- https://api.planetterp.com/#planetterp-api
- GET - Grabs the Course List needed for the Typeahead in the Search Box
- POST - Grabs the Grades for the specific Course Number read from the POST Request body.
- PUT - Console logs the Response Code to ensure a put request works

*Known Bugs & Future Development Roadmap*
- Adding additional information that pertains to how a class’ GPA changed during the COVID-19 transition and providing a recommendation of whether or not a student should sign up for a class
- Expanding the scope of classes to include all classes, not just INST classes
- Showing which classes are synchronous and asynchronous (since this tends to affect GPA)
