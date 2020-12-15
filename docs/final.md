# INST377 InfoTerp Final Report

**Team Members:**
Eric Kimball, Romin Mirmotahari, Jeff Montano, Sarah Patrick, Jasmine Soni, Rhia Soni

**Link to Where our App is Running:**
https://majestic-falcons-final.herokuapp.com/index.html

## Our Information Problem
Registration for classes is always a stressful time of the semester. From deciding on which classes to take to stay on track for graduation and choosing professors who will be best for you throughout the course, there is a vast collection of options to consider. On top of those factors, the global pandemic has greatly altered our way of learning. We want a way for INST students to see what classes have been the most positively or negatively affected by the virtual transition of COVID-19 by measuring the grade distribution for classes and professors. This will hopefully help students pick out their classes wisely for the next few semesters, assuming they will likely still be online. The people who care about this problem are Information Science students.

**Our Stakeholders & Target Browsers:**

- Stakeholders: INST students

- Target browsers: Google Chrome, Safari,  Microsoft Edge

**Our Chosen Data to Work With:**

We chose to work with PlanetTerp API, which supplied course data, professor data, section information, and grade information for each section and semester. 

**Our Chosen Strategies and Solutions:**

Our application provides UMD INST undergraduate students with a way to see the GPA trends and Pass/Fail/Withdrawal counts vs. Letter Grading counts for all of their classes and sections from the past three semesters, since the COVID-19 pandemic forced students to take courses online in Fall 2020. Students can observe the shifts in the GPA and the Pass/Fail/Withdrawal counts from past semesters, back before the semesters that went online. This helps students get an idea of how the class performed after the online transition and they can better decide if taking that particular class virtually would suit them.

**Our Technical System Decisions:** 

We integrated three Javascript libraries into our website application--jQuery, AOS, and CanvasJS. We leveraged jQuery primarily for the extensive functions included within it and a simplified method of interacting with the DOM. AOS is an animation library that adds scroll animations to HTML elements. We implemented it to add another level of fluidity to our website application when going through screens and scrolling, in an effort to make our solution feel more like a native app. Finally, we used CanvasJS for data visualization on our course result page. CanvasJS powers our graphs used for displaying grade data pertaining to the selected course and section. 

**Ways our Final System Helps Address the Problem:**

Our final system leverages grade data from PlanetTerp over the past three semesters. This semester, and the prior semester, were affected by the global pandemic which greatly changed the academic landscape. Our aim was to create a platform that helps students make academic course decisions in the midst of this pandemic, which we accomplish by displaying situationally-relevant data for each class, such as the grade distribution and percentage of students that took the pass/fail grade. In addition, our application was designed to provide metrics pertaining to academics in classes for those interested in collecting data on how the pandemic affected the semester. By comparing academic data from prior semesters to the pandemic-stricken semesters, analysts, professors, and other and interested individuals can analyze how the global pandemic affected academics. 

**Our Challenges Faced and Their Impact on Our Final Design:**

- The first challenge we faced was restrictions with the data provided from the PlanetTerp API. We wanted more information that may impact the quality of a class after transitioning online, such as whether it was synchronous or asynchronous. Because this data was not available via the API and it was infeasible to find and sort this information manually, we omitted this data from our project. Even though we hope that this application can provide a recommendation for whether a student should take a particular class in the online environment, we were not able to provide a conclusion on the class due to the bias from this lack of necessary information.

- Our second and main challenge was identifying the factors needed to make a recommendation on a class for students. In our proposal, we discussed the idea of finding the average GPA from each of the past three semesters and comparing the three of them to indicate whether the average GPA for the class was on an uptrend or a downtrend. We found that getting the three average GPAs for a class was challenging, and ended up changing the scope of our project. Instead, we looked at the counts of students who opted for Pass/Fail/Withdrawal versus counts of those who chose Letter Grading for each section of each INST class in the past three semesters, as well as obtaining each section’s average GPA. Our graphs show the grade distribution for each section and semester. We also indicated the number of students the professor has taught and the percentage of students who opted for the Pass/Fail grading method for each section and semester. The new statistics we decided to provide instead still give students an idea of how classes performed the past few semesters for each professor and each of their sections.

- Our last challenge was implementing the library CanvasJS. This library was new to all of us, so there was a learning curve to understand how to deploy this library in our project. The most difficult part of this challenge was figuring out how to render the chart for every row of our result sections page, and not only the first row. We were able to utilize past assignments from the course to get a better understanding of how it works and were able to implement it properly for our grade distribution.

**Possible Future Avenues with Our Problem and Solution:**

- If we were to pursue this project further, one thing we would do is incorporate all UMD classes into the application so that it would be open to all students who want to analyze courses. It can be used as a source for students to compare the workload of classes and figure out which classes have been better or worse in an online setting.

- Another aspect that we want to work on is showing which classes are synchronous and which are asynchronous. Typically, asynchronous classes have lower GPAs, which causes a discrepancy in the grades and average GPAs. Since PlanetTerp does not provide us with these details, we would have to put it into the data manually which would take a lot of time. 
