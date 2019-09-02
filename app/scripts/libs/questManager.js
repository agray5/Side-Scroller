import Phaser from 'phaser'
import QuestType from '../data/quests/QuestType';
import Resources from './Resources'

class QuestManager extends Phaser.Events.EventEmitter {

    currentQuests = {};
    template_fields = ["name", "description"]


    getName(namespace, quest) {
        return `${namespace}.${quest}`;
    }

    /** @param {Phaser.GameObjects.GameObject} context*/
    startQuest(context, namespace, quest) {
        const data = require(`../data/quests/${namespace}`).default[quest]
        this.currentQuests[this.getName(namespace, quest)] = {
            data,
            context,
            callback: QuestTypeGenerator(context, namespace, quest, data)
            //collider: context.scene.physics.add.overlap(context.scene.get("player"), context, QuestTypeGenerator.bind(context, namespace, quest, data))
        }
    
        return this.currentQuests[this.getName(namespace, quest)];
    }

    endQuest(namespace, quest) {
        const data = this.currentQuests[this.getName(namespace, quest)];
        //data.collider.destroy();
        delete this.currentQuests[this.getName(namespace, quest)];
    }

    getQuestData(namespace, quest) {
        const questData = this.currentQuests[this.getName(namespace, quest)];
        let data = {};
        Object.keys(questData.data).forEach(key => {
            if(this.template_fields.includes(key))
                data[key] = Mustache.render(questData.data[key], questData.context.config);
            else
                data[key] = questData.data[key];
        })
        
        return data;
    }
}

const questManager =  new QuestManager();

const QuestTypeGenerator = (context, namespace, quest, data) => {
    return (p, x, y, e) => {

        e.stopPropagation()
        switch(data.type) {
            case QuestType.GIVE:
                if(Resources.get(data.from) < data.amount)
                    context.emit("failQuest", quest);
                else Resources.decrement(data.from, data.amount);
                break;
        }

        questManager.endQuest(namespace, quest);
    }
}

export default questManager;