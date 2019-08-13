class System{
	update(dt){}
	get(){
		if(!this.ecs) return []
		return this.ecs.find(...arguments)
	}
	added(engine){}
	removed(engine){}
}
