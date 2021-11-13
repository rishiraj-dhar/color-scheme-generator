class colorBlocks {
    constructor() {
        this.noOfBlocks = 3; // default value
        this.max = 5; // maximum no of blocks
        this.min = 2; // minimum no of blocks
    }

    getBlocks() {
        return this.noOfBlocks;
    }

    setBlocks(noOfBlocks) {
        this.noOfBlocks = noOfBlocks;
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
    }
}

// generateColor returns a color string in the format - rgb(X, Y, Z)
const generateColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

const setBlockColor = (blockColor, blockId) => document.querySelector(blockId).style.backgroundColor = blockColor;

const setBlockColors = (blocks) => {
    let colors = [];
    let randomColor;
    // console.clear();
    for (let i = 1; i <= blocks; i++){
        while(true) {
            randomColor = generateColor();
            let clash = false;
            colors.forEach(color => {
                if (color == randomColor) { // ensures no duplicate colors
                    clash = true;
                }
            });
            if(clash) {
                continue;
            } else {
                break;
            }
        }        
        // console.log(randomColor);
        colors.push(randomColor);
        let blockId = `#block-${i}`;
        setBlockColor(randomColor, blockId);
    }
};

const addColorBlock = (blockIndex) => {
    let colors = document.getElementsByClassName('colour-scheme');
    let colorBlock = `<div class="colour-block" id="block-${blockIndex}"></div>`;
    colors[0].innerHTML += colorBlock;
};

const addColorBlocks = (blocks) => {
    document.getElementsByClassName('colour-scheme')[0].innerHTML = "";
    for (let i = 1; i <= blocks; i++) {
        addColorBlock(i);
    }
    setBlockColors(blocks);
};

const activateButton = (buttonId) => {
    let button = document.querySelector(buttonId);
    button.style.backgroundColor = "#1034a6";
    button.style.border = "2px solid #1034a6";
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#FFFFFF";
        button.style.color = "#1034a6";
    });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#1034a6";
        button.style.color = "#FFFFFF";
    });
};

const deactivateButton = (buttonId) => {
    let button = document.querySelector(buttonId);
    button.style.backgroundColor = "#5D8AA8";
    button.style.border = "2px solid #5D8AA8";
    button.style.color = "#ffffff";
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#5D8AA8";
        button.style.color = "#ffffff";
    });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#5D8AA8";
        button.style.color = "#ffffff";
    });
};

let colorSchemeBlocks = new colorBlocks();

window.onload = (loadEvent) => {
    if(localStorage.getItem("noOfBlocks") == null) {
        localStorage.setItem("noOfBlocks", colorSchemeBlocks.getBlocks());
    } else {
        colorSchemeBlocks.setBlocks(Number(localStorage.getItem("noOfBlocks")));
    }
    addColorBlocks(colorSchemeBlocks.getBlocks());
    if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMin()) {
        deactivateButton("#decrement-btn")
    } else if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMax()) {
        deactivateButton("#increment-btn")
    }
};

const generateButtonClick = () => {
    setBlockColors(colorSchemeBlocks.getBlocks());
};

const incrementBlocks = () => {
    if (colorSchemeBlocks.getBlocks() < colorSchemeBlocks.getMax()) {
        if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMin()) {
            activateButton("#decrement-btn");
        }
        colorSchemeBlocks.setBlocks(colorSchemeBlocks.getBlocks() + 1);
        addColorBlocks(colorSchemeBlocks.getBlocks());
        localStorage.setItem("noOfBlocks", colorSchemeBlocks.getBlocks());
        if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMax()) {
            deactivateButton("#increment-btn");
        }
    }
};

const decrementBlocks = () => {
    if (colorSchemeBlocks.getBlocks() > colorSchemeBlocks.getMin()) {
        if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMax()) {
            activateButton("#increment-btn");
        }
        colorSchemeBlocks.setBlocks(colorSchemeBlocks.getBlocks() - 1);
        addColorBlocks(colorSchemeBlocks.getBlocks());
        localStorage.setItem("noOfBlocks", colorSchemeBlocks.getBlocks());
        if (colorSchemeBlocks.getBlocks() == colorSchemeBlocks.getMin()) {
            deactivateButton("#decrement-btn");
        }
    }
};

window.addEventListener("keydown", (keyPressed) => {
    if (keyPressed.key == ' ') {
        setBlockColors(colorSchemeBlocks.getBlocks());
    }

    if (keyPressed.key == ']') {
        incrementBlocks();
    }

    if (keyPressed.key == '[') {
        decrementBlocks();
    }
});