export default ({
  init: {
    type: "sequence",
    text: [
      "Who the fudge are you??",
      "And how did you get here?",
      "...",
      "What you fell from the sky?",
      "Am I really supposed to believe that?"
    ],
    transitions: {
      next: "potionQuest"
    }
  },
  potionQuest: {
    type: "sequence",
    text: [
      "Anyways, that doesn't really matter.",
      "Do you see all the rubies scattered around?",
      "If you put them in that cauldron it will make potions.",
      `I need about 5 of them`,
      "I would do it myself but my license is suspended.",
      "...",
      "What, you don't have a license either?",
      "Look, I am willing to pay, so you will do it right?"
    ],
    startQuest: "potionQuest1"
  },
  potionQuest1: {
    type: "questPrompt",
    quest: "potionQuest1",
    text: "I'm waiting... ",
    fail: "That's not enough potions"
  }
})