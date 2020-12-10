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
                    <td data-column="Instructor">${obj.professor}</td>
                    <td class="view-section" data-column="Button">
                        <button class="red-button yellow" id="view-section" onclick = "location.href = 'graph.html'">View Section</button>

                        
                    </td>
                  </tr>
        `;
    }).join('');

    tableBody.innerHTML = html;
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


