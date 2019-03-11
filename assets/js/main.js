class ShowCurrentTime {
    constructor(domselector) {
        this.Date = new Date()
        this.htmlContainer = document.querySelector(domselector)
    }
}
const showCurrentTime = new ShowCurrentTime('.currentTime');

class ShowMyRepos {
    constructor() {

    }
}