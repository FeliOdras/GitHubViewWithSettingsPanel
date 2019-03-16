class ShowCurrentTime {
  constructor(domselector) {
    this.htmlContainer = document.querySelector(domselector);
    this.render();
  }

  getNowDate() {
    let currentDate = moment().format("dddd, MMMM Do YYYY");
    return currentDate;
  }

  getNowTime() {
    let currentTimeStart = moment().format("hh:mm");
    document.querySelector(".hour").innerHTML = currentTimeStart;
    setInterval(function() {
      let currentTime = moment().format("hh:mm");
      currentTime += '<span class="xsmall"> ';
      currentTime += moment().format("A");
      currentTime += "</span></div>";
      document.querySelector(".hour").innerHTML = currentTime;
    }, 10000);
  }

  render() {
    let currentDate = this.getNowDate();
    let output = ``;
    output += `<div class="date">`;
    output += `${currentDate}`;
    output += `</div>`;
    output += `<div class="hour"></div>`;
    this.htmlContainer.innerHTML = output;
    this.getNowTime();
  }
}
const showCurrentTime = new ShowCurrentTime(".currentTime");

class SelectBackground {
  constructor() {
    //this.getImageID()
    this.addEventListeners();
  }

  selectImage1() {
    document.querySelector(".wrapper").setAttribute("id", "bg-1");
  }

  selectImage2() {
    document.querySelector(".wrapper").setAttribute("id", "bg-2");
  }

  selectImage3() {
    document.querySelector(".wrapper").setAttribute("id", "bg-3");
  }

  selectImage4() {
    document.querySelector(".wrapper").setAttribute("id", "bg-4");
  }

  selectImage5() {
    document.querySelector(".wrapper").setAttribute("id", "bg-5");
  }

  selectImage6() {
    document.querySelector(".wrapper").setAttribute("id", "bg-6");
  }

  addEventListeners() {
    document
      .querySelector('input[id="bg-1"]')
      .addEventListener("click", () => this.selectImage1());
    document
      .querySelector('input[id="bg-2"]')
      .addEventListener("click", () => this.selectImage2());
    document
      .querySelector('input[id="bg-3"]')
      .addEventListener("click", () => this.selectImage3());
    document
      .querySelector('input[id="bg-4"]')
      .addEventListener("click", () => this.selectImage4());
    document
      .querySelector('input[id="bg-5"]')
      .addEventListener("click", () => this.selectImage5());
    document
      .querySelector('input[id="bg-6"]')
      .addEventListener("click", () => this.selectImage6());
  }
}
const selectBackground = new SelectBackground();

class ShowSettingsPanel {
  constructor() {
    this.addEventListeners();
  }

  showPanel() {
    document.querySelector(".settings").setAttribute("style", "margin-right:0");
    document
      .querySelector(".page")
      .setAttribute("style", "margin-left:-320px;");
    document
      .querySelector(".showSettings")
      .setAttribute("style", "display:none;");
    document
      .querySelector(".hideSettings")
      .setAttribute("style", "display:block;");
  }

  hidePanel() {
    document
      .querySelector(".settings")
      .setAttribute("style", "margin-right:-380px;");
    document.querySelector(".page").setAttribute("style", "margin-left:0px;");
    document
      .querySelector(".showSettings")
      .setAttribute("style", "display:block;");
    document
      .querySelector(".hideSettings")
      .setAttribute("style", "display:none;");
  }

  addEventListeners() {
    document
      .querySelector(".showSettings")
      .addEventListener("click", () => this.showPanel());
    document
      .querySelector(".hideSettings")
      .addEventListener("click", () => this.hidePanel());
  }
}

const showSettings = new ShowSettingsPanel();

class ShowMyRepos {
  constructor(domselector) {
    this.htmlContainer = document.querySelector(domselector);
    this.autoclosePanel = new ShowSettingsPanel();
    this.fetchData();
  }

  setLocalStorageUser() {
    let githubUser = document.querySelector("#newGithubUser").value;
    localStorage.setItem("User", githubUser);
    this.fetchData();
  }

  fetchData() {
  // debugger
    let githubUser = localStorage.getItem("User");
    githubUser == `` || githubUser == null ? (githubUser = "FeliOdras") : (githubUser = githubUser);
    localStorage.setItem("User", githubUser);
    let repoApiUrl = `https://api.github.com/users/${githubUser}/repos?sort=created&client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
    fetch(repoApiUrl)
      .then(
        response => response.json())
      .then(     
        repoData => {
        this.repoData = repoData;
        this.render();   
      })
      .catch(
        error => {
          document.querySelector('.reposHeadline').innerHTML = '<h3>404</h3>'
          this.htmlContainer.innerHTML = `
          <div class="error">The user <strong>${githubUser}</strong> does not seem to exist</div> 
          `;
          localStorage.clear();
        }

      );
  }

  template() {
    let repoList = this.repoData;
    if (repoList.length > 0) {
    return repoList
      .map(repo => {
        return `
            <div class="repoName flexbox-item">
                <h3> 
                    ${repo.name}
                    <div class="lang">Primary used technology: ${
                      repo.language
                    }</div>
                </h3>
                
                ${
                  repo.description != null
                    ? `<div class"repo-description">${repo.description}</div>`
                    : `<div class="repoDescription noDescription">No description available</div>`
                }  
                <button class="view-repo"><a href="${
                  repo.html_url
                }" target="_blank">Open repository on github</a></button>         
                <div class="stars"><i class="fas fa-star"></i> ${
                  repo.stargazers_count
                } <i class="fas fa-code-branch"></i> ${
          repo.forks
        } <i class="fas fa-eye"></i> ${repo.watchers_count}</div> 
                </div>     
                `;
      })
      .join("");
    }else{
      let owner = localStorage.getItem('User');      
      return `<div class="error"><strong>${owner}</strong> does not seem to have any public repositories.</div> `
    }
  }

  isSearchMatch() {
    let repoListExt = this.repoData;
    repoListExt.forEach(repo => {
      let searchValue = document
        .querySelector("#repoSearch")
        .value.toLowerCase();
      let repoName = repo.name.toLowerCase();
      let repoMatch = repoName.match(searchValue);
      let searchMatch = ``;
      repoMatch != null ? (searchMatch = true) : (searchMatch = false);
      repo.searchMatch = searchMatch;
    });
    return repoListExt;
  }

  searchRepos() {
    let repoList = this.isSearchMatch();
    let repoListSearch = repoList.filter(repo => repo.searchMatch == true);
    if (repoListSearch.length > 0) {
      return repoListSearch
        .map(repo => {
          return `
            <div class="repoName flexbox-item">
                <h3> 
                    ${repo.name}
                    <div class="lang">Primary used technology: ${
                      repo.language
                    }</div>
                </h3>
                
                ${
                  repo.description != null
                    ? `<div class"repo-description">${repo.description}</div>`
                    : `<div class="repoDescription noDescription">No description available</div>`
                }  
                <button class="view-repo"><a href="${
                  repo.html_url
                }" target="_blank">Open repository on github</a></button>         
                <div class="stars"><i class="fas fa-star"></i> ${
                  repo.stargazers_count
                } <i class="fas fa-code-branch"></i> ${
            repo.forks
          } <i class="fas fa-eye"></i> ${repo.watchers_count}</div> 
                </div>     
                `;
        })
        .join("");
    } else {
      return `<div class="error">There is no repository matching your search.</div>`;
    }
  }

  displaySearchResults() {
    let searchOutput = this.searchRepos();
    this.htmlContainer.innerHTML = searchOutput;
  }

  addEventListeners() {
    document
      .querySelector("#repoSearch")
      .addEventListener("keyup", () => this.displaySearchResults());
    document
      .querySelector("#newGithubUserBttn")
      .addEventListener("click", () => {
        this.setLocalStorageUser();
        this.autoclosePanel.hidePanel();
      });
  }

  render() {
    const template = this.template();
    let repoList = this.isSearchMatch();
    let owner = localStorage.getItem('User');
    let headline = `<h3>${owner}</h3>`;
    document.querySelector('.reposHeadline').innerHTML = headline;
    this.htmlContainer.innerHTML = template;
    this.addEventListeners();
  }
}
const showRepos = new ShowMyRepos(".repositories");
