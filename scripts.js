/*set*/
const gitProfileName = 'kieis';
const linkedinProfileName = 'dirlan-ferreira'
const technologys = ["Javascript", "NodeJS", "ReactJS", "C++", "HTML5", "CSS3", "MySQL"];

const gitRequest = new Request('https://api.github.com/users/' + gitProfileName);

fetch(gitRequest).then((promise) => {
    let request = promise.json();
    request.then((body) =>{
        /*profile field*/
        document.querySelector('#profileImg').src =  body['avatar_url'];
        document.querySelector('#profileName').textContent = body['name'];
        document.querySelector('#profileStack').textContent = body['bio'];

        /*profile info*/
        document.querySelector('#profile-i-location').innerHTML = `<img src="./assets/map-pin.svg">${body['location']}`;
        document.querySelector('#profile-i-company').innerHTML = `<img src="./assets/briefcase.svg">${body['company']}`;
        document.querySelector('#profile-i-git').innerHTML = `<img src="./assets/github.svg">${body['login']}`;
        document.querySelector('#profile-i-linkedin').innerHTML = `<img src="./assets/linkedin.svg">${linkedinProfileName}`;
        document.querySelector('#profile-i-twitter').innerHTML = `<img src="./assets/twitter.svg">${body['twitter_username']}`;
        document.querySelector('#profile-i-website').innerHTML = `<img src="./assets/globe.svg">${body['blog']}`;
        document.querySelector('#profile-i-email').innerHTML = `<img src="./assets/mail.svg">${body['email']}`;

        /*profile techs*/
        const profileTech = document.querySelector('.profile-tech');
        const divTech = profileTech.querySelector('div');
        for(let tech of technologys){
            let element = document.createElement('span');
            element.innerHTML = `<strong>${tech}</strong>`;
            divTech.append(element);
        }

        /*myProjects*/
        document.querySelector('#myProjects').querySelector('a').href =  `https://github.com/${gitProfileName}?tab=repositories`;

        /*from github*/
        const projectDiv = document.querySelector('.projects');
        const gitRepos = body['repos_url'];

        fetch(gitRepos).then((promise) => {
            request = promise.json();
            request.then((body) => {
                const bodyArray = body;
                for(let obj of bodyArray){
                    let projectElement = document.createElement('a');
                    let projectInnerDiv = document.createElement('div');
                    projectInnerDiv.innerHTML = `
                    <p><img src="./assets/folder.svg">${obj['name']}</p>
                    <p>${obj['description']}</p>
                    <p><img src="./assets/star.svg">${obj['stargazers_count']}<img src="./assets/git-branch.svg">${obj['forks_count']}</p>`;

                    let projectInnerSpan = document.createElement('span');
                    projectInnerSpan.textContent = obj['language'];

                    projectElement.setAttribute('class', 'card project');
                    projectElement.setAttribute('href', obj['html_url']);
                    projectElement.append(projectInnerDiv);
                    projectElement.append(projectInnerSpan);

                    projectDiv.append(projectElement);
                }
            });
        });
    });
});

