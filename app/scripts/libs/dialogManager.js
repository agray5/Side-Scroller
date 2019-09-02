import questManager from "./questManager";
import { func } from "prop-types";
import saveManager from "./saveManager";

export default class DialogManager extends Phaser.Events.EventEmitter{
  constructor(context, dialogPath, initState = "init") {
    super();

    this.load(context, initState);

    this.dialogData = require("../data/dialog/"+dialogPath).default;
    
    this.on("fail", function() {
      this.alternateText = this.dialogData[this.state].fail;

      setTimeout(() => {
        delete this.alternateText;
      }, 1500)
    })

    this.on("success", function(context) {
      this.handleAutoTransfer(context);
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
        text = this.getStaticText();
        break;
      case "sequence":
        this.index++;
        this.save(person);

        text = this.getStaticText();
        if(this.index === state.text.length-1) this.handleAutoTransfer(person);
        break;
      case "questPrompt":
        const quest = questManager.getQuestData(person.config.namespace, state.quest);
        console.log("QUEEST", quest)
        text = {
          text: this.getStaticText(),
          prompt: quest.type,
          config:{ callback: quest.callback}
        }; 
        break;
    }
    return text;
  }

  save(person) {
    console.log("Save Dialog", person)
    saveManager.save('dialog_'+person.config.namespace, {
      index: this.index,
      state: this.state,
    })
  }

  load(person, initState) {
    const loaded = saveManager.load('dialog_'+person.config.namespace, {
      index: -1,
      state: initState
    })
    console.log("LOADED Dialog", loaded)
    this.index = loaded.index || -1;
    this.state = loaded.state;
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

    //Auto Save
    this.save(context);
  }


}