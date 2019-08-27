export default class DialogManager {
  constructor(dialogPath, initState = "init") {
    this.state = initState;
    this.index = -1;

    console.log("Dialog", dialogPath)

    this.dialogData = require("../data/dialog/"+dialogPath).default;
  }

  handleAutoTransfer() {
    const state = this.dialogData[this.state];
    if(state.transitions && state.transitions.next) 
      this.transition("next");
  }

  getText(playText = true) {
    if(!playText) return null;

    this.done = false;

    const state = this.dialogData[this.state];
    if(!state.type) state.type = "static";

    let text;

    switch(state.type){
      case "static": 
        text = state.text;
        this.handleAutoTransfer();
        return text;
      case "sequence":
        this.index++;
        text = state.text[this.index];
        if(this.index === state.text.length-1) this.handleAutoTransfer();
        return text;
    }
  }

  transition(action) {
    console.log("Set DONE at Text", this.dialogData[this.state].text[this.index])
    this.done = true;
    this.index = -1;
    this.state = this.dialogData[this.state].transitions[action];
  }


}