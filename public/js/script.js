const endpoint = 'https://api.planetterp.com/v1/courses?department=INST';

const courses = [];



fetch("/api",
    {
      method: 'GET'
    
    })
    .then(blob => blob.json())
    .then(data => courses.push(...data));

function findMatches(wordToMatch, courses) {
    return courses.filter(obj => {
        const regex = new RegExp(wordToMatch, 'gi');
        return obj.course_number.match(regex)
    })
}

async function submitSelection(course_number){
    console.log('submitSelection', course_number);
    const request = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({course_num: course_number})
    })
    localStorage.setItem("course", course_number);
    const courseGradeInfo = await request.json();
    filterSemesters(courseGradeInfo);
}

function filterSemesters(json){
    let filteredJson = [];
    json.forEach(element => {
        if (element.semester == '202001'){
            filteredJson.push(element);
        }
        else if(element.semester == '201908'){
            filteredJson.push(element);
        }
        else if(element.semester == '201901'){
            filteredJson.push(element);
        }
    });

    console.log('filteredJson: ', filteredJson);
    localStorage.setItem("filteredJson", JSON.stringify(filteredJson));
    window.location.href = "sections.html";
}

function displayMatches(){
    
    const matchArray = findMatches(this.value, courses);
    const html = matchArray.map(obj => {
        return `
            <div class="result">
                <button onclick="submitSelection('${obj.course_number}')" id="${obj.course_number}" class="button" name="selection" type="button">${obj.department}${obj.course_number}</button><br>
            </div>
        `;
    }).join('');

    suggestions.innerHTML = html;
    if (this.value == "") {
        suggestions.innerHTML = "";
    }

}

function displayTableRows(){
    const grades = JSON.parse(localStorage.getItem("filteredJson"));

    // This is where the sorting happens
    // Group by prof -> order by Sorting 
    const html = grades.map(obj => {
        return `

        <tr>
                    <td data-column="Section">${obj.section}</td>
                    <td data-column="P/F/W vs. Letter Grading:"><div class="trend">${passFailRatio(obj)}</div></td>
                    <td data-column="Section GPA">${calculateSectionGPA(obj.professor, obj.section, obj.semester)}</td>
                    <td data-column="Instructor">${obj.professor}</td>
                    <td class="view-section" data-column="Button">
                        <button class="red-button yellow" id="view-section" onclick = "setLocal('${obj.professor}','${obj.section}','${obj.semester}');location.href = 'graph.html'">View Section</button>

                        
                    </td>
                  </tr>
        `;
    }).join('');

    tableBody.innerHTML = html;
}

function setLocal(prof, section, sem){
    localStorage.setItem("prof", prof);
    localStorage.setItem("section", section);
    localStorage.setItem("sem", sem);
}

function passFailRatio(jsonObj){

    var nonNormalGrades = 0;
    var normalGrades  = 0;

    for(var i in jsonObj){

        var key = i;
        var val = jsonObj[i];

        if( key != 'Other' && key != 'W' && key != 'course' && key != 'professor' && key != 'section' && key != 'semester'){
            normalGrades += val;
        }
    }

    nonNormalGrades = jsonObj.Other + jsonObj.W;


    return `${nonNormalGrades} vs. ${normalGrades}`;


}

function calculateGPAs() {
    // https://jsfiddle.net/xnvqLgf5/
    return 
}

function graphConfigurations(avgGpaDatapoints) {
    // set your chart configuration here!
    CanvasJS.addColorSet('customColorSet1', [
      // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
      '#3B5682',
      '#589492',
      '#6DA2B2'
    ]);
  
    return {
      animationEnabled: true,
      colorSet: 'customColorSet1',
      title: {
        text: 'Class Average GPA Over Past 3 Semesters'
      },
      axisX: {
        interval: 1,
        labelFontSize: 12
      },
      axisY2: {
        interlacedColor: 'rgba(1,77,101,.2)',
        gridColor: 'rgba(1,77,101,.1)',
        title: 'Average GPA By Semester',
        labelFontSize: 12,
        scaleBreaks: {customBreaks: [
          {
            startValue: 40,
            endValue: 50,
            color: 'black'
          },
          {
            startValue: 85,
            endValue: 100,
            color: 'black'
          },
          {
            startValue: 140,
            endValue: 175,
            color: 'black'
          }
        ]
        } // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
      },
      data: [{
        type: 'bar',
        name: 'avgGPA',
        axisYType: 'secondary',
        dataPoints: avgGpaDatapoints
      }]
    };
  }
  
function useGPAstoMakeGraph() {
// sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // used in lab 7 to provide unit testing support
  // Process your GPAs list
  // Make a configuration object for your chart
  // Instantiate your chart
  const options = graphConfigurations(calculateGPAs);
  const chart = new CanvasJS.Chart('graphContainer', options);
  chart.render();
}



const searchInput = document.querySelector('.textInput');
const suggestions = document.querySelector('.suggestions');

const tableBody = document.querySelector('.table-body');
const tableHeader = document.querySelector('.table-header');



if (searchInput != null) {
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
}

if(tableBody != null){
    displayTableRows();
}

if(tableHeader != null){
    tableHeader.innerHTML = `Sections for ${JSON.parse(localStorage.getItem("filteredJson"))[0].course}`
}

// Returns a double array of all courses, grouped by professor, with GPA for each section inside each object
// Output double array looks like this: ["Professors Name"][Their classes] --> "Their classes" includes the GPA, the raw grades, semester, section, etc. 
function allCourses() {
    let rawData = JSON.parse(localStorage.getItem("filteredJson")); // Raw course data
    let unfilteredProfessors = []; // Single array containing all professor names for the class
    let filteredProfessors = []; // Single array containing all the unique professor names for the class
    
    let professorClasses = []; // Double array [Professor's Name][All the sections they teach for the past semesters (as objects)]
    let sectionGPA = [];

    // Creates a list of professors 
    for (let i = 0; i < rawData.length; i++) {
        unfilteredProfessors.push(rawData[i].professor);
    }

    // Creates a new array without professor name duplicates
    filteredProfessors = [...new Set(unfilteredProfessors)];

    // Fills the professorClasses double array with professor names
    for (let l = 0; l < filteredProfessors.length; l++) {
        sectionGPA.push([filteredProfessors[l]]);
        professorClasses.push([filteredProfessors[l]]);
    }

    // Grab section data (grades) for each professor for the past semesters, inject it into professorClasses as an object (if a prof has three objects in their name, it means they taught 3 sections)
    for (let k = 0; k < professorClasses.length; k++) {
        for (let j = 0; j < rawData.length; j++) {
            
            // Find match by professor's name
            if (professorClasses[k][0] === rawData[j].professor) {
                professorClasses[k].push(rawData[j]);

            }
        }
    }

    // Add new property to each for average GPA by semester
    for (let q = 0; q < professorClasses.length; q++) {
        
        points = 0; // Grade quantity multiplied by the GPA value
        totalGrades = 0; // Number of grade objects (students)

        // This for loop goes into each section per professor
        for (let insideSection = 1; insideSection < professorClasses[q].length; insideSection++) {
            currentSection = professorClasses[q][insideSection];

            points += 
                (currentSection["A+"] * 4.0) + (currentSection["A"] * 4.0) + (currentSection["A-"] * 3.7)
                + (currentSection["B+"] * 3.3) + (currentSection["B"] * 3.0) + (currentSection["B-"] * 2.7)
                + (currentSection["C+"] * 2.3) + (currentSection["C"] * 2.0) + (currentSection["C-"] * 1.7)
                + (currentSection["D+"] * 1.3) + (currentSection["D"] * 1.0) + (currentSection["D-"] * 0.7)
                + (currentSection["F"] * 0);
            
            totalGrades += 
                (currentSection["A+"]) + (currentSection["A"]) + (currentSection["A-"]) + 
                (currentSection["B+"]) + (currentSection["B"]) + (currentSection["B-"]) +
                (currentSection["C+"]) + (currentSection["C"]) + (currentSection["C-"]) +
                (currentSection["D+"]) + (currentSection["D"]) + (currentSection["D-"]) + 
                (currentSection["F"]);

            professorClasses[q][insideSection]["GPA"] = (points/totalGrades);
        }
        
    }

    return professorClasses;
}

// Takes in the professors name and returns the professors average GPA across all semesters & sections for the class
// Example --> professorTotalGPA("Byeol Kim") --> returns 3.550769230769231 (unrounded) (integer)
function professorTotalGPA(professorsName) {

    let rawData = JSON.parse(localStorage.getItem("filteredJson")); // Raw course data
    let unfilteredProfessors = []; // Single array containing all professor names for the class
    let filteredProfessors = []; // Single array containing all the unique professor names for the class
    let professorClasses = []; // Double array [Professor's Name][All the sections they teach for the past semesters (as objects)]
    let professorAvgGPA = []; // Double array [Professor's Name][Their Average GPA across all sections]
    let professorSemesterGPA = []; // [Professor's Name][Semester & GPA Objects]
    
    let professorGPAPerSection = []; // Professors GPA per section
    

    // Creates a list of professors 
    for (let i = 0; i < rawData.length; i++) {
        unfilteredProfessors.push(rawData[i].professor);
    }

    // Creates a new array without professor name duplicates
    filteredProfessors = [...new Set(unfilteredProfessors)];

    // Fills the professorClasses double array with professor names
    for (let l = 0; l < filteredProfessors.length; l++) {
        professorClasses.push([filteredProfessors[l]]);
        professorAvgGPA.push([filteredProfessors[l]]);
        professorSemesterGPA.push([filteredProfessors[l]]);
        professorGPAPerSection.push([filteredProfessors[l]]);
    }

    // Grab section data (grades) for each professor for the past semesters, inject it into professorClasses as an object (if a prof has three objects in their name, it means they taught 3 sections)
    for (let k = 0; k < professorClasses.length; k++) {
        for (let j = 0; j < rawData.length; j++) {
            
            // Find match by professor's name
            if (professorClasses[k][0] === rawData[j].professor) {
                professorClasses[k].push(rawData[j]);

            }
        }
    }
    let professorSemesterAvg = [];

    for (let i = 0; i < professorClasses.length; i++) {

        // Initializes professorSemesterAvg with professor names
        professorSemesterAvg[i] = professorClasses[i][0];
        for (let k = 0; k < professorClasses[i].length; k++) {

            professorSemesterAvg[i][k]["semester"] = professorClasses[i][k]["semester"];
        }
    }
  
    let currentSection; 
    let points = 0;
    let totalGrades;

    // Calculate average GPA for each professor across all their sections
    for (let q = 0; q < professorClasses.length; q++) {
       
        points = 0; // Grade quantity multiplied by the GPA value
        totalGrades = 0; // Number of grade objects (students)

        // This for loop goes into each section per professor
        for (let insideSection = 1; insideSection < professorClasses[q].length; insideSection++) {
            currentSection = professorClasses[q][insideSection];

            points += 
                (currentSection["A+"] * 4.0) + (currentSection["A"] * 4.0) + (currentSection["A-"] * 3.7)
                + (currentSection["B+"] * 3.3) + (currentSection["B"] * 3.0) + (currentSection["B-"] * 2.7)
                + (currentSection["C+"] * 2.3) + (currentSection["C"] * 2.0) + (currentSection["C-"] * 1.7)
                + (currentSection["D+"] * 1.3) + (currentSection["D"] * 1.0) + (currentSection["D-"] * 0.7)
                + (currentSection["F"] * 0);
            
            totalGrades += 
                (currentSection["A+"]) + (currentSection["A"]) + (currentSection["A-"]) + 
                (currentSection["B+"]) + (currentSection["B"]) + (currentSection["B-"]) +
                (currentSection["C+"]) + (currentSection["C"]) + (currentSection["C-"]) +
                (currentSection["D+"]) + (currentSection["D"]) + (currentSection["D-"]) + 
                (currentSection["F"]);
        }

        // Inject GPA for the professorAvgGPA array
        for (let j = 0; j < professorAvgGPA.length; j++) {
            if (professorClasses[q][0] === professorAvgGPA[j][0]) {
                professorAvgGPA[j][1] = points/totalGrades;
            }
        }
    }

    for (let k = 0; k < professorAvgGPA.length; k++) {
        if (professorAvgGPA[k][0] === professorsName) {
            return professorAvgGPA[k][1];
        }
    }
}   

// Takes in the professors name, section, and semester, and returns the average GPA for that section in that semester (integer, unrounded)
// Example --> calculateSectionGPA("Byeol Kim","0301","202001") --> returns GPA integer
function calculateSectionGPA(professorsName, section, semester) {

    let rawData = JSON.parse(localStorage.getItem("filteredJson")); // Raw course data
    let unfilteredProfessors = []; // Single array containing all professor names for the class
    let filteredProfessors = []; // Single array containing all the unique professor names for the class
    
    let professorClasses = []; // Double array [Professor's Name][All the sections they teach for the past semesters (as objects)]
    let sectionGPA = [];

    // Creates a list of professors 
    for (let i = 0; i < rawData.length; i++) {
        unfilteredProfessors.push(rawData[i].professor);
    }

    // Creates a new array without professor name duplicates
    filteredProfessors = [...new Set(unfilteredProfessors)];

    // Fills the professorClasses double array with professor names
    for (let l = 0; l < filteredProfessors.length; l++) {
        sectionGPA.push([filteredProfessors[l]]);
        professorClasses.push([filteredProfessors[l]]);
    }

    // Grab section data (grades) for each professor for the past semesters, inject it into professorClasses as an object (if a prof has three objects in their name, it means they taught 3 sections)
    for (let k = 0; k < professorClasses.length; k++) {
        for (let j = 0; j < rawData.length; j++) {
            
            // Find match by professor's name
            if (professorClasses[k][0] === rawData[j].professor) {
                professorClasses[k].push(rawData[j]);

            }
        }
    }

    // Add new property to each for average GPA by semester
    for (let q = 0; q < professorClasses.length; q++) {
        
        points = 0; // Grade quantity multiplied by the GPA value
        totalGrades = 0; // Number of grade objects (students)

        // This for loop goes into each section per professor
        for (let insideSection = 1; insideSection < professorClasses[q].length; insideSection++) {
            currentSection = professorClasses[q][insideSection];

            points += 
                (currentSection["A+"] * 4.0) + (currentSection["A"] * 4.0) + (currentSection["A-"] * 3.7)
                + (currentSection["B+"] * 3.3) + (currentSection["B"] * 3.0) + (currentSection["B-"] * 2.7)
                + (currentSection["C+"] * 2.3) + (currentSection["C"] * 2.0) + (currentSection["C-"] * 1.7)
                + (currentSection["D+"] * 1.3) + (currentSection["D"] * 1.0) + (currentSection["D-"] * 0.7)
                + (currentSection["F"] * 0);
            
            totalGrades += 
                (currentSection["A+"]) + (currentSection["A"]) + (currentSection["A-"]) + 
                (currentSection["B+"]) + (currentSection["B"]) + (currentSection["B-"]) +
                (currentSection["C+"]) + (currentSection["C"]) + (currentSection["C-"]) +
                (currentSection["D+"]) + (currentSection["D"]) + (currentSection["D-"]) + 
                (currentSection["F"]);

            professorClasses[q][insideSection]["GPA"] = (Number((points/totalGrades).toFixed(2)));
        }
        
    }

    // Fetches average section GPA, returns it as an integer
    for (let i = 0; i < professorClasses.length; i++) {
        for (let j = 0; j < professorClasses[i].length; j++) {
            if (professorClasses[i][0] === professorsName) {
                if (professorClasses[i][j]["section"] === section) {
                    if (professorClasses[i][j]["semester"] === semester) {
                        return professorClasses[i][j]["GPA"];
                    }
                }
            }
        }
    }
}

// Takes in professors name, outputs array of all sections that professor taught across all semesters, in array format
function professorSections(professorName) {
    let rawData = JSON.parse(localStorage.getItem("filteredJson")); // Raw course data
    let unfilteredProfessors = []; // Single array containing all professor names for the class
    let filteredProfessors = []; // Single array containing all the unique professor names for the class
    let professorClasses = []; // Double array [Professor's Name][All the sections they teach for the past semesters (as objects)]
    
    

    // Creates a list of professors 
    for (let i = 0; i < rawData.length; i++) {
        unfilteredProfessors.push(rawData[i].professor);
    }

    // Creates a new array without professor name duplicates
    filteredProfessors = [...new Set(unfilteredProfessors)];

    // Fills the professorClasses double array with professor names
    for (let l = 0; l < filteredProfessors.length; l++) {
        professorClasses.push([filteredProfessors[l]]);
    }

    // Grab section data (grades) for each professor for the past semesters, inject it into professorClasses as an object (if a prof has three objects in their name, it means they taught 3 sections)
    for (let k = 0; k < professorClasses.length; k++) {
        for (let j = 0; j < rawData.length; j++) {
            
            // Find match by professor's name
            if (professorClasses[k][0] === rawData[j].professor) {
                professorClasses[k].push(rawData[j]);

            }
        }
    }

    let professorSpecific = [];
    for (let i = 0; i < professorClasses.length; i++) {
        if (professorClasses[i][0] === professorName) {
            professorSpecific.push(professorClasses[i]);        
         }
    }

    console.log(professorSpecific);
}





