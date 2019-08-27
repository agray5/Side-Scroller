export default class DialogManager {
  constructor(dialogPath, initState = "init") {
    this.state = initState;
    this.index = -1;

    console.log("Dialog", dialogPath)

    this.dialogData = require("../data/dialog/"+dialogPath).default;
  }

  getText() {
    console.log("DIALOG", this.dialogData)
    const state = this.dialogData[this.state];
    if(!state.type) state.type = "static";

    switch(state.type){
      case "static": return state.text;
      case "sequence":
        this.index++;
        return state.text[this.index];
    }
  }

  transition(action) {
    this.index = -1;
    this.state = this.dialogData[this.state].transitions[action];
  }


}