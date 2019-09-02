class SaveManger {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  load(key, default_) {
    localStorage.clear()
    let loaded = JSON.parse(localStorage.getItem(key));

    //if(loaded) loaded = JSON.parse(loaded);
    if(!loaded) loaded = default_;
    
    if(process.env.NODE_ENV === "development" && DEFAULTS[key])
      loaded = DEFAULTS[key];
    
    return loaded;
  }
}

const DEFAULTS = {
  "player_rubies": 10,
  "potion_reds": 10,
  "dialog_npc1": {state: "potionQuest", index: 5}
}

export default new SaveManger();