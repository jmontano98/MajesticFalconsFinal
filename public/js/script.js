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
    localStorage.setItem("filteredJson", filteredJson);
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

const searchInput = document.querySelector('.textInput');
const suggestions = document.querySelector('.suggestions');


if (searchInput != null) {
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
}


