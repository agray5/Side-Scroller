import questManager from "./questManager";

export default class DialogManager extends Phaser.Events.EventEmitter{
  constructor(dialogPath, initState = "init") {
    super();

    this.state = initState;
    this.index = -1;

    this.dialogData = require("../data/dialog/"+dialogPath).default;
    
    this.on("fail", function() {
      this.alternateText = this.dialogData[this.state].fail;

      setTimeout(() => {
        delete this.alternateText;
      }, 1500)
    })
    
  }

  handleAutoTransfer(context) {
    const state = this.dialogData[this.state];
    if((state.transitions && state.transitions.next) || state.startQuest) 
      this.transition(context, "next");
  }

  getStaticText() {
    if(this.alternateText) return this.alternateText;

    const state = this.dialogData[this.state];
    if(!state.type) state.type = "static";

    switch(state.type){
      case "sequence":
        return state.text[this.index];
      default:
        return state.text
    }
  }

  getText(person, playText = true) {
    if(!playText) return null;

    this.done = false;

    const state = this.dialogData[this.state];
    if(!state.type) state.type = "static";

    let text;


    switch(state.type){
      case "static": 
        this.handleAutoTransfer(person);
        return this.getStaticText();
      case "sequence":
        this.index++;
        text = this.getStaticText();
        if(this.index === state.text.length-1) this.handleAutoTransfer(person);
        return text;
      case "questPrompt":
        return {
          text: this.getStaticText(),
          prompt: this.startedQuest.data.type,
          config:{ callback: this.startedQuest.callback}
        }; 
    }
  }

  transition(context, action) {
    const data = this.dialogData[this.state];
    this.done = true;
    this.index = -1;

    if(data.startQuest){
      this.startedQuest = questManager.startQuest(context, context.config.namespace, data.startQuest);
      this.state = data.startQuest;
    }
    else 
      this.state = data.transitions[action];
  }


}