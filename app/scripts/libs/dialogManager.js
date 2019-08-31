import questManager from "./questManager";

export default class DialogManager {
  constructor(dialogPath, initState = "init") {
    this.state = initState;
    this.index = -1;

    this.dialogData = require("../data/dialog/"+dialogPath).default;
  }

  handleAutoTransfer(context) {
    const state = this.dialogData[this.state];
    if((state.transitions && state.transitions.next) || state.startQuest) 
      this.transition(context, "next");
  }

  getText(person, playText = true) {
    if(!playText) return null;

    this.done = false;

    const state = this.dialogData[this.state];
    if(!state.type) state.type = "static";

    let text;


    switch(state.type){
      case "static": 
        text = state.text;
        this.handleAutoTransfer(person);
        return text;
      case "sequence":
        this.index++;

        text = state.text[this.index];
        if(this.index === state.text.length-1) this.handleAutoTransfer(person);
        return text;
      case "questPrompt":
        return {
          text: state.text,
          prompt: "give" 
        }; 
    }
  }

  transition(context, action) {
    const data = this.dialogData[this.state];
    this.done = true;
    this.index = -1;

    if(data.startQuest){
      questManager.startQuest(context, context.config.namespace, data.startQuest);
      this.state = data.startQuest;
    }
    else 
      this.state = data.transitions[action];
  }


}