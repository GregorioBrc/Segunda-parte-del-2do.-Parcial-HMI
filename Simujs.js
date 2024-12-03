document.getElementById('startButton').addEventListener('click', startProcess);

let substanceATimer, substanceBTimer, temperatureTimer, leftTankTimer, rightTankTimer;
let substanceA = 0, substanceB = 0, temperature = 0, substanceD = 0, substanceC = 0, leftLevel = 0, rightLevel = 0;

function startProcess() {
    document.getElementById('startButton').disabled = true;
    substanceA = 0;
    substanceB = 0;
    temperature = 0;
    substanceD = 0;
    substanceC = 0;
    leftLevel = 0;
    rightLevel = 0;

    updateDisplay();

    // Vertido de sustancias A y B
    substanceATimer = setInterval(() => {
        substanceA++;
        if (substanceA >= 10) {
            clearInterval(substanceATimer);
        }
        updateDisplay();
    }, 1000);

    substanceBTimer = setInterval(() => {
        substanceB++;
        if (substanceB >= 15) {
            clearInterval(substanceBTimer);
        }
        updateDisplay();
    }, 1000);

    // Calentamiento
    temperatureTimer = setInterval(() => {
        temperature += 5;
        if (temperature >= 175) {
            clearInterval(temperatureTimer);
            startPumps();
        }
        updateDisplay();
    }, 1000);
}

function startPumps() {
    // Llenado del tanque izquierdo
    leftTankTimer = setInterval(() => {
        leftLevel++;
        if (leftLevel >= 5) {
            clearInterval(leftTankTimer);
            startLeftTankProcess();
        }
        updateDisplay();
    }, 1000);

    // Llenado del tanque derecho
    rightTankTimer = setInterval(() => {
        rightLevel++;
        if (rightLevel >= 5) {
            clearInterval(rightTankTimer);
            startRightTankProcess();
        }
        updateDisplay();
    }, 1000);
}

function startLeftTankProcess() {
    substanceD = 0;
    let substanceDTimer = setInterval(() => {
        substanceD++;
        if (substanceD >= 5) {
            clearInterval(substanceDTimer);
            setTimeout(() => {
                leftLevel = 0;
                updateDisplay();
                document.getElementById('startButton').disabled = false;
            }, 20000);
        }
        updateDisplay();
    }, 1000);
}

function startRightTankProcess() {
    substanceC = 0;
    let substanceCTimer = setInterval(() => {
        substanceC++;
        if (substanceC >= 5) {
            clearInterval(substanceCTimer);
            setTimeout(() => {
                rightLevel = 0;
                updateDisplay();
                document.getElementById('startButton').disabled = false;
            }, 10000);
        }
        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    document.getElementById('substanceA').innerText = substanceA;
    document.getElementById('substanceB').innerText = substanceB;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('substanceD').innerText = substanceD;
    document.getElementById('leftLevel').innerText = leftLevel;
    document.getElementById('substanceC').innerText = substanceC;
    document.getElementById('rightLevel').innerText = rightLevel;
}
