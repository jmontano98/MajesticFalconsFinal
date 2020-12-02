
function about()
{

    var aboutButton = document.getElementById("about").value;
    document.getElementById("homepage").innerHTML = aboutButton;
    document.getElementById("text").innerHTML = "About Page Info";
}

function doc() {

    var docButton = document.getElementById("doc").value;
    document.getElementById("homepage").innerHTML = docButton;
    document.getElementById("text").innerHTML = "Documentation";
}

