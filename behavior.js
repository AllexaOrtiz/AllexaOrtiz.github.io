// calling this behavior because JS controls the behavior of the website


//let's add cookies here COOKIES COOKIES COOKIES COOKIES


//let's add map stuff here! MAP MAP MAP MAP MAP MAP MAP


//Game behavior for recoveryVR "simulation"
//Refers to lines 39 to 51 in the recoveryVR HTML file
//Refers to lines 41 to 60 in the CSS file
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {} //keeps track of what items the character has on them

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
        text: 'You wake up after your gastric bypass surgery and you\'re on your way home. You see a drive-through Burger King on the way.',
        options: [ //different options for what we can do
            { //open up for first option
                text: 'Stop by burger king.', //criteria for first option
                setState: { gotoBK: true }, //to add the goo to your inventory
                nextText: 2 //move onto the next text node
            },
            {
                text: 'Go straight home', //we don't need to add the goo here
                setState: {athome: true},
                nextText: 7
            }
        ]
    },
    {
        id:2, //the textNode.options section pulls from here to give options
        text:'You decide to stop by Burger King and take a look at the menu.',
        options: [
            {
                text: 'Buy a burger',
                requiredState: (currentState) => currentState.gotoBK, //requires that we went to BK to get a burger
                setState: { burger: true}, //now we have a burger
                nextText: 3
            },
            {
                text: 'Buy a milkshake',
                requiredState: (currentState) => currentState.gotoBK, //requires that we went to BK to get a milkshake
                setState: {milkshake: true}, //now we have a milkshake!
                nextText: 3 
            },
            {
                text: 'Buy a burger, milkshake and fries',
                requiredState: (currentState) => currentState.gotoBK, //requires that we went to BK to get a burger, milkshake and fries
                setState: {all: true}, //now we have a burger, milkshake and fries, which = "all"
                nextText: 3 //will move us to the next option in the array
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving Burger King, you head home.',
        options: [
            {
                text: 'Drink the milkshake.',
                requiredState: (currentState) => currentState.milkshake,
                nextText: 4
            },
            {
                text: 'Eat the burger',
                requiredState: (currentState) => currentState.burger,
                nextText: 5
            },
            {
                text: 'Eat the burger, milkshake and fries.',
                requiredState: (currentState) => currentState.all,
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You get a bit gassy from the milkshake, but you feel fine after a couple of hours.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 5,
        text: 'You get an upset stomach, and the pain is so bad you have to take medication.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 6,
        text: "You overfill your stomach and get constipated due to the surgery. You're stuck on the toilet all night.",
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 7,
        text: "You decide to drive home and rest, after two months, you go to your appointment. You're recovery's going well!",
        options: [
            {
                text: 'You decide to head back home.', //want to have new options available for eating when recovered.
                setState: {healed: true, gotoBK: true},
                nextText: 8 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 8, //you're recovered and you pass by the BK again
        text: 'On your way home, you see the drive-through Burger King again. You decide to stop by now to celebrate your recovery progress.',
        options: [ //different options for what we can do
            {
                text: 'Buy a burger, fries, and milkshake.',
                requiredState: (currentState) => (currentState.gotoBK, currentState.healed),
                setState: {all: true, milkshake: false, fries: false}, //you're getting everything, but you've made recovery progress now
                nextText: 9 //move onto the next text node
            },
            {
                text: 'Get a milkshake only.', //
                requiredState: (currentState) => (currentState.gotoBK, currentState.healed),
                setState: {milkshake: true, all: false, fries: false},
                nextText: 10
            },
            {
                text: 'Get fries only.', //getting fries but healed now
                requiredState: (currentState) => (currentState.gotoBK, currentState.healed),
                setState: {fries: true},
                nextText: 11
            }
        ]
    },
    {
        id: 9,
        text: 'After leaving Burger King, you head home with your burger, milkshake and fries.',
        options: [
            {
                text: 'Drink the milkshake.',
                requiredState: (currentState) => (currentState.milkshake, currentState.healed),
                nextText: 10
            },
            {
                text: 'Eat the fries.',
                requiredState: (currentState) => (currentState.fries, currentState.healed),
                nextText: 11
            },
            {
                text: 'Eat the burger, milkshake and fries.',
                requiredState: (currentState) => (currentState.all, currentState.healed),
                nextText: 12
            }
        ]
    },
    {
        id: 10,
        text: 'You drink the milkshake and feel fine. You continue to recover just fine with daily walks and drinking enough water.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 11,
        text: 'You eat the fries and feel a little queasy, but you get over it after an hour or two. However, the next few days you feel sluggish.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 12,
        text: 'You try to eat the burger, fries and milkshake, but you get full after half the burger and some of the shake.',
        options: [
            {
                text: 'Force yourself to finish the rest.',
                requiredState: (currentState) => (currentState.all, currentState.healed),
                nextText: 13
            },
            {
                text: 'Go for a short walk.',
                requiredState: (currentState) => (currentState.all, currentState.healed),
                nextText: 14
            },
            {
                text: 'Give the rest to a friend or toss it.',
                requiredState: (currentState) => (currentState.all, currentState.healed),
                nextText: 15
            }
        ]
    },
    {
        id: 13,
        text: 'You start getting stomach pains so you take medication. You decide to go to sleep and come to terms with the fact that you cannot eat so much anymore.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 14,
        text: 'You go for a short walk and feel great! Still not hungry though, so you decide to toss the food and head to bed.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    },
    {
        id: 15,
        text: 'You and your friend watch a movie and you fall asleep on the couch. You are a little stiff in the morning, so you do some stretches to help with that.',
        options: [
            {
                text: 'Restart', //want to recall the start game function here
                nextText: -1 //signifies that we want to restart the game
            }
        ]
    }
]

startGame () //will call this as soon as the page loads

// for every option, have a gif that relates to the consequence of choices