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

function displayMatches(){
    
    const matchArray = findMatches(this.value, courses);
    const html = matchArray.map(obj => {
        return `
            <div class="result">
                <span class="dept-num">${obj.department}${obj.course_number}</span><br>
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

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);