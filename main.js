let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposeData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

//get repos function
function getRepos() {
    if (theInput.value == "") {
        reposeData.innerHTML = `<span>Please write github username</span>`;
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => {
            return response.json();
        }).then((repositories) => {
            reposeData.innerHTML = "";
            //loop on repos
            repositories.forEach((repo) => {
                //create main div
                let mainDiv = document.createElement("div");

                // create repo name
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);

                //create repo url anchor
                let theUrl = document.createElement("a");
                let theUrlText = document.createTextNode("Visit");
                theUrl.appendChild(theUrlText);
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                theUrl.setAttribute('target', '_blank');
                mainDiv.appendChild(theUrl);

                //create stars count span
                let starsSpan = document.createElement("span");
                let starsText = document.createTextNode(`Stars: ${repo.stargazers_count}`);
                starsSpan.appendChild(starsText);
                mainDiv.appendChild(starsSpan);

                mainDiv.className = 'repo-box';
                reposeData.appendChild(mainDiv);
            });
        })
    }
}