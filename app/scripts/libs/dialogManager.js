
export default class DialogManager {
  constructor(dialogPath, speechBubble, initState = "init") {
    this.speechBubble = speechBubble;
    this.state = initState;
    this.index = -1;

    this.dialogData = require("../data/dialog/"+dialogPath);
  }

  getText() {
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