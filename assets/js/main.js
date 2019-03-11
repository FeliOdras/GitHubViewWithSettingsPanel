class ShowCurrentTime {
    constructor(domselsctor) {
        debugger
        this.Date = new Date()
        this.htmlContainer = document.querySelector(domselector)
        this.test()
    }

    test() {
        console.log(this.Date);
        console.log(this.htmlContainer);
    }
}
const showCurrentTime = new ShowCurrentTime('.currentTime');

class ShowMyRepos {
    constructor() {

    }
}