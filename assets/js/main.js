class ShowCurrentTime {
    constructor(domselector) {
        this.Date = new Date()
        this.htmlContainer = document.querySelector(domselector)
        this.currentTimeOutput();
    }

    currentTimeOutput() {
        let currHour = this.Date.getHours();
        let currMinute = this.Date.getMinutes();
        let currSecond = this.Date.getSeconds();
        let currTime = `
            ${currHour < 10 ? `0`:``}${currHour}:
            ${currMinute < 10 ? `0`:``}${currMinute}:
            ${currSecond < 10 ? `0`:``}${currSecond}
            `
        return currTime;
    }
}
const showCurrentTime = new ShowCurrentTime('.currentTime');

class ShowMyRepos {
    constructor() {

    }
}