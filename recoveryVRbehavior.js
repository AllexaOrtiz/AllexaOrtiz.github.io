const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {} //keeps track of what the character has on them

function startGame() {
    state = {} //want to start off with the character having nothing
    showTextNode(1);
}

function showTextNode(textNodeIndex) { //display which option we're on
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state) // if we have the required or don't have required object, we can advance
}

function selectOption(option) { //we need to know which option we're selecting
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState) //will take our state and add everything from option.setState to it
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1, //our first text node
        text: 'You wake up in a strange place and see a jar of blue goo near you.',
        options: [ //different options for what we can do
            { //open up for first option
                text: 'Take goo', //criteria for first option
                setState: { blueGoo: true }, //to add the goo to your inventory
                nextText: 2 //move onto the next text node
            },
            {
                text: 'Leave the goo', //we don't need to add the goo here
                nextText: 2
            }
        ]
    },
    {
        id:2, //the textNode.options section pulls from here to give options
        text:'You venture forth in search of answers... you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo, //requires that we have the blue goo
                setState: { blueGoo: false, sword: true}, //takes away blue goo and gives us sword
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo, //requires that we have the blue goo to trade
                setState: { blueGoo: false, shield: true}, //takes away the blue goo and gives us shield
                nextText: 3 
            },
            {
                text: 'Ignore the merchant',
                nextText: 3 //will move us to the next option in the array
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep on',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    }
]

startGame () //will call this as soon as the page loads
