import Phaser from 'phaser'
import Mustache from 'mustache'
import QuestType from '../data/quests/QuestType';
import Resources from './Resources'
import saveManager from './saveManager';

class QuestManager extends Phaser.Events.EventEmitter {

    currentQuests = {};
    template_fields = ["name", "description"]

    constructor() {
        super();

        //const loaded = saveManager.load("quests", []);
        //loaded.forEach()
    }

    load(scene) {
        const loaded = saveManager.load("quests", []);
        loaded.forEach(({namespace, quest}) => {
            this.addQuestData(scene.get(namespace), namespace, quest)
        })

        console.log("Loaded Quests", loaded)
    }

    save() {
        let data = Object.keys(this.currentQuests).map(key => {
            key = key.split(".");
            return {
                namespace: key[0],
                quest: key[1]
            }
        });

        saveManager.save("quests", data);
    }

    getName(namespace, quest) {
        return `${namespace}.${quest}`;
    }

    /** @param {Phaser.GameObjects.GameObject} context*/
    startQuest(context, namespace, quest) {
        const data = require(`../data/quests/${namespace}`).default[quest]
        this.addQuestData(context, namespace, quest);
    
        this.save();
        return this.currentQuests[this.getName(namespace, quest)];
    }

    addQuestData(context, namespace, quest) {
        const data = require(`../data/quests/${namespace}`).default[quest]
        this.currentQuests[this.getName(namespace, quest)] = {
            data,
            context,
            callback: QuestTypeGenerator(context, namespace, quest, data)
            //collider: context.scene.physics.add.overlap(context.scene.get("player"), context, QuestTypeGenerator.bind(context, namespace, quest, data))
        }
        console.log("ADD QUEST DATA", data, this.currentQuests)
    }

    endQuest(namespace, quest) {
        const data = this.currentQuests[this.getName(namespace, quest)];
        //data.collider.destroy();
        delete this.currentQuests[this.getName(namespace, quest)];
        this.save()
    }

    getQuestData(namespace, quest) {
        const questData = this.currentQuests[this.getName(namespace, quest)];
        console.log("ADD QUEST DATA", questData, namespace, quest, this.currentQuests)
        let data = {};
        Object.keys(questData.data).forEach(key => {
            if(this.template_fields.includes(key))
                data[key] = Mustache.render(questData.data[key], questData.context.config);
            else
                data[key] = questData.data[key];
        })
        
        data.callback = questData.callback;
        return data;
    }
}

const questManager =  new QuestManager();

const QuestTypeGenerator = (context, namespace, quest, data) => {
    return (p, x, y, e) => {

        e.stopPropagation()
        switch(data.type) {
            case QuestType.GIVE:
                if(!data.done){
                    if(Resources.get(data.from) < data.amount) {
                        context.emit("failQuest", quest);
                    }
                    else{
                        console.log("Quest DOne!", context)
                        data.done = true;
                        questManager.endQuest(namespace, quest)
                        Resources.decrement(data.from, data.amount);
                        context.emit("successQuest", data)
                    }
                }
                break;
        }

        questManager.endQuest(namespace, quest);
    }
}

export default questManager;