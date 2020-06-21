const textElement = document.querySelector('#text');
const optionButtonsElement = document.querySelector('#option-buttons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: `You see a door.
        It says "04-553".
        There is a key on the floor.`,
        options: [
            {
                text: 'Knock on the door.',
                nextText: 2
            },
            {
                text: 'Open the door.',
                nextText: 3
            },
            {
                text: 'Pick up the key.',
                setState: { houseKey: true },
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: `You knock on the door...
        No response.`,
        options: [
            {
                text: 'Open the door.',
                nextText: 3
            },
            {
                text: 'Pick up the key.',
                setState: { houseKey: true },
                nextText: 4
            }
        ]

    },
    {
        id: 3,
        text: `You turn the door handle.
        It is lock.`,
        options: [
            {
                text: 'Pick up the key.',
                setState: { houseKey: true },
                nextText: 4
            }
        ]

    },
    {
        id: 4,
        text: `You pick up the key and out it in your pocket.`,
        options: [
            {
                text: 'Hit the door with the key',
                nextText: 5
            },
            {
                text: 'Unlock the door with the key',
                nextText: 6
            }
        ]

    },
    {
        id: 5,
        text: `You hit the door furiously with the key.
        The key breaks.
        The door is still locked.`,
        options: [
            {
                text: 'Restart.',
                setState: { houseKey: false },
                nextText: -1
            }
        ]

    },
    {
        id: 6,
        text: `You unlock the door with the key.
        A satisfying click.`,
        options: [
            {
                text: 'Step inside the door.',
                setState: { houseKey: false },
                nextText: 7
            }
        ]

    },
    {
        id: 7,
        text: `You see a door.
        It says "04-553".
        There is a key on the floor.
        Wait, what?`,
        options: [
            {
                text: 'Rub your eyes.',
                nextText: -1
            }
        ]

    }
]

startGame();