class EntityManager {

  systems = [];

  update(){
		this.systems.forEach(s=> s.update(...arguments))
  }
  
  addSystem(system){
		if(system.ecs) system.ecs.removeSystem(system)
		system.ecs = this
		this.systems.push(system)
		system.added(this)
  }
  
  removeSystem(system){
		system.removed(this)
		delete system.ecs
		this.systems.splice(this.systems.indexOf(system), 1)
  }
  
  addEntity(entity){
		if(entity.ecs) entity.ecs.removeEntity(entity)
		entity.ecs = this
		for(let c in entity.components) this._addComponent(c, entity)
		entity._notify('add')
  }
  
  removeEntity(entity){
		entity._notify('remove')
		delete entity.ecs
		for(let c in entity.components) this._removeComponent(c, entity)
  }
  
  on(event, cb, ...components){
		this.events[event].push({components, cb})
	}
	off(event, cb){
		let index = this.events[event].findIndex(e=> e.cb === cb)
		return this.events[event].splice(index, 1)[0]
	}

	_addComponent(name, entity){
		if(!this.components[name]) this.components[name] = []
		this.components[name].push(entity)
  }
  
	_removeComponent(name, entity){
		let registered = this.components[name]
		registered.splice(registered.indexOf(entity), 1)
	}
	
	_emit(type, components, entity){
		this.events[type].filter(e=>{
			for(let name of e.components){
				if(!components.includes(name)) return false
			}
			return true
		}).forEach(e=> e.cb(entity))
  }
  
  find(...components){
		let missing = false
		let eligible = components.map(c=> this.components[c] || (missing=true))
		if(!eligible.length || missing) return []
		let found
		let included = i=> found.includes(i)
		do{
			found = eligible.shift()
			found = found.filter(included)
		}while(eligible.length)
		return found
	}

}

export default new EntityManager();