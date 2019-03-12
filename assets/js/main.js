class ShowCurrentTime {
    constructor(domselector) {
        this.Date = new Date()
        this.htmlContainer = document.querySelector(domselector);
        this.render();
    }

    getNowDate() {
        let currentDate = moment().format('dddd, MMMM Do YYYY');
        return currentDate;
    }

    getNowTime() {
        let currentTimeStart = moment().format('hh:mm');
        document.querySelector('.hour').innerHTML = currentTimeStart;
        setInterval(function () {
            let currentTime = moment().format('hh:mm');
            currentTime += '<span class="xsmall"> ';
            currentTime += moment().format('A');
            currentTime += '</div>'
            document.querySelector('.hour').innerHTML = currentTime;
        }, 30000)
    }

    render() {
        let currentDate = this.getNowDate();
        let output = ``;
        output += `<div class="date">`;
        output += `${currentDate}`;
        output += `</div>`
        output += `<div class="hour"></div>`
        this.htmlContainer.innerHTML = output;
        this.getNowTime()
    }

}
const showCurrentTime = new ShowCurrentTime('.currentTime');

class ShowMyRepos {
    constructor(domselector) {
        this.htmlContainer = document.querySelector(domselector);
        this.fetchData()
    }

    setGithubUser() {
        let githubUser = document.querySelector('#newGithubUser').value;
        return githubUser;
    }

    fetchData() {
        let githubUser = this.setGithubUser();
        let repoApiUrl = `https://api.github.com/users/${githubUser}/repos?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`
        console.log()
        fetch(repoApiUrl)
            .then(response => response.json())
            .then(repoData => {
                this.repoData = repoData;
                this.render();
                this.displaySearchResults();
            })
    }

    template() {
        let repoList = this.repoData;
        return repoList.map(repo => {
            return `
            <div class="repoName flexbox-item">
                <h3> 
                    ${repo.name}
                    <div class="lang">Primary used technology: ${repo.language}</div>
                </h3>
                
                ${repo.description != null ? `<div class"repo-description">${repo.description}</div>` 
                : `<div class="repoDescription noDescription">No description available</div>`}  
                <button class="view-repo"><a href="${repo.html_url}" target="_blank">Open repository on github</a></button>         
                <div class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count} <i class="fas fa-code-branch"></i> ${repo.forks} <i class="fas fa-eye"></i> ${repo.watchers_count}</div> 
                </div>     
                `
        }).join('')
    }

    isSearchMatch() {
        let repoListExt = this.repoData;
        repoListExt.forEach(repo => {
            let searchValue = document.querySelector('#repoSearch').value.toLowerCase();
            let repoName = repo.name.toLowerCase();
            let repoMatch = repoName.match(searchValue);
            let searchMatch = ``;
            repoMatch != null ? searchMatch = true : searchMatch = false;
            repo.searchMatch = searchMatch;
        })
        return repoListExt;
    }

    searchRepos() {
        let repoList = this.isSearchMatch();
        let repoListSearch = repoList.filter(repo => repo.searchMatch == true);

        return repoListSearch.map(repo => {
            return `
            <div class="repoName flexbox-item">
                <h3> 
                    ${repo.name}
                    <div class="lang">Primary used technology: ${repo.language}</div>
                </h3>
                
                ${repo.description != null ? `<div class"repo-description">${repo.description}</div>` 
                : `<div class="repoDescription noDescription">No description available</div>`}  
                <button class="view-repo"><a href="${repo.html_url}" target="_blank">Open repository on github</a></button>         
                <div class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count} <i class="fas fa-code-branch"></i> ${repo.forks} <i class="fas fa-eye"></i> ${repo.watchers_count}</div> 
                </div>     
                `
        }).join('');
    }

    displaySearchResults() {
        let searchOutput = this.searchRepos();
        this.htmlContainer.innerHTML = searchOutput;
    }

    addEventListeners() {
        document.querySelector('#repoSearch').addEventListener('keyup', () => this.displaySearchResults());
        document.querySelector('#newGithubUserBttn').addEventListener('click', () => this.fetchData())
    }

    render() {
        const template = this.template();
        let output = template;
        this.htmlContainer.innerHTML = output;
        this.addEventListeners();
    }
}
const showRepos = new ShowMyRepos('.repositories')

class SelectBackground {
    constructor() {
        this.selectBGImage()
        this.addEventListeners()
    }

    selectBGImage() {
        let bgIDValue = document.querySelector('input[name="bgimage"]:checked').value;
        console.log(bgIDValue)
    }

    addEventListeners() {
        document.querySelector('.bgimage').addEventListener('click', () => this.selectBGImage())
    }
}
const selectBackground = new SelectBackground()