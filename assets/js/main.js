class ShowCurrentTime {
    constructor(domselector) {
        this.Date = new Date()
        this.htmlContainer = document.querySelector(domselector);
        this.render();
    }

    template() {
        let currMonth = this.Date.getMonth();
        currMonth == 0 ? currMonth = 'January' :
            currMonth == 1 ? currMonth = 'February' :
            currMonth == 2 ? currMonth = 'March' :
            currMonth == 3 ? currMonth = 'April' :
            currMonth == 4 ? currMonth = 'May' :
            currMonth == 5 ? currMonth = 'June' :
            currMonth == 6 ? currMonth = 'July' :
            currMonth == 7 ? currMonth = 'August' :
            currMonth == 8 ? currMonth = 'September' :
            currMonth == 9 ? currMonth = 'October' :
            currMonth == 10 ? currMonth = 'November' :
            currMonth == 11 ? currMonth = 'December' :
            ''
        let currDay = this.Date.getDate();
        let currWeekday = this.Date.getDay();
        currWeekday == 0 ? currWeekday = 'Sunday' :
            currWeekday == 1 ? currWeekday = 'Monday' :
            currWeekday == 2 ? currWeekday = 'Tuesday' :
            currWeekday == 3 ? currWeekday = 'Wednesday' :
            currWeekday == 4 ? currWeekday = 'Thursday' :
            currWeekday == 5 ? currWeekday = 'Friday' :
            currWeekday == 6 ? currWeekday = 'Saturday' :
            ''
        let currYear = this.Date.getFullYear();
        let currHour = this.Date.getHours();
        let currMinute = this.Date.getMinutes();
        let currTime = `
            <div class="date">
            ${currWeekday}, ${currMonth}
            ${currDay}${currDay == 1 || currDay == 21 || currDay == 31 ? 'st' 
            : currDay == 2 || currDay == 22 ? 'nd' 
            : currDay == 3 || currDay == 23 ? 'rd' 
            : 'th'}
            ${currYear}
            </div>
            <div class="hour">
            ${currHour < 10 ? `0`:``}${currHour}:
            ${currMinute < 10 ? `0`:``}${currMinute}
            
            `;
        return currTime;
    }

    render() {
        const template = this.template();
        let output = template;
        this.htmlContainer.innerHTML = output;
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
            })
    }

    render() {
        const template = this.template();
        let output = template;
        this.htmlContainer.innerHTML = output;
    }
}
const showRepos = new ShowMyRepos('.repositories', 'FeliOdras')