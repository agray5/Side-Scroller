class Resources extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    this.obj = {
      player_rubies: 0,
      cauldron_rubies: 0,
      potion_reds: 0
    }
  }

  get(key){
    return this.obj[key];
  }

  set(key, data) {
    this.obj[key] = data;
    this.emit("set", key);
    return data;
  }

  increment(key, amt = 1) {
    let data = this.obj[key];

    if(data && Number.isNaN(data)) throw new Error("Cannot add " + amt +" to data with key:" + key + ", " + data + " is not a number.")

    if(!data) data = 0;

    return this.set(key, data+amt);    
  }

  decrement(key, amt = 1) {
    return this.increment(key, amt*-1);
  }

  transferAmt(from_, to, amt) {
    //Available amount 
    const take = this.get(from_);
    //If nothing is available set to 0, if amount is not specified take all
    const setFrom = take?(amt?take-amt:0):0;
    this.set(from_, Math.max(setFrom, 0));

    //Current amount
    const has = this.get(to);
    //Take all if amount is not specified
    if(!amt) amt = take;
    //Do not take more than is available
    const canGet = (take < amt)?take:amt;
    //Add gains
    const give = (has?has:0) + (take?canGet:0);
    this.set(to, give);

    //Amount transferred
    return canGet;
  }
}

export default new Resources();