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
        setInterval(function () {
            let currentTime = moment().format('hh:mm:ss');
            currentTime += '<span class="xsmall"> ';
            currentTime += moment().format('A');
            currentTime += '</div>'
            document.querySelector('.hour').innerHTML = currentTime;
        }), 1000
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
    constructor(domselector, githubUser) {
        this.htmlContainer = document.querySelector(domselector);
        this.githubUser = githubUser;
        this.repoApiUrl = `https://api.github.com/users/${this.githubUser}/repos?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`
        this.fetchData()
    }

    fetchData() {
        fetch(this.repoApiUrl)
            .then(response => response.json())
            .then(repoData => {
                this.repoData = repoData;
                this.render();
                this.searchRepos()
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

    searchRepos() {
        let repoList = this.repoData;
        console.log(repoList)
        let repoListFiltered = repoList.filter(repo => {
            let searchValue = document.querySelector('#repoSearch').value;
            console.log(searchValue)
            let repoName = repo.name;
            console.log(repoName)
            searchValue == repoName ? console.log(true) : console.log(false);
        });
        console.log(repoListFiltered)
    }

    render() {
        const template = this.template();
        let output = template;
        this.htmlContainer.innerHTML = output;
    }
}
const showRepos = new ShowMyRepos('.repositories', 'FeliOdras')