export default class DataManager {
  /** @param {Phaser.GameObjects.GameObject} obj */
  constructor(obj){
    this.obj = obj;

    this.obj.setDataEnabled();
  }

  get(key){
    return this.obj.getData(key);
  }

  set(key, data) {
    const set = this.obj.setData(key, data)
    this.emit("set", key);
    return set;
  }

  emit(...args) {
    this.obj.emit(...args)  
  }

  increment(key, amt = 1) {
    let data = this.obj.getData(key);

    if(data && Number.isNaN(data)) throw new Error("Cannot add " + amt +" to data with key:" + key + ", " + data + " is not a number.")

    if(!data) data = 0;

    return this.set(key, data+amt);    
  }

  decrement(key, amt = 1) {
    return this.increment(key, amt*-1);
  }

  transferAmt(from_, to, key, amt) {
    //Available amount 
    const take = from_.getData(key);
    //If nothing is available set to 0, if amount is not specified take all
    const setFrom = take?(amt?take-amt:0):0;
    from_.setData(key, Math.max(setFrom, 0));

    //Current amount
    const has = to.getData(key);
    //Take all if amount is not specified
    if(!amt) amt = take;
    //Do not take more than is available
    const canGet = (take < amt)?take:amt;
    //Add gains
    const give = (has?has:0) + (take?canGet:0);
    to.setData(key, give);

    from_.emit("set", key);
    to.emit("set", key);
  }


}