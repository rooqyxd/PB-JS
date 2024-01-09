const balls = [1, 1, 2, 1, 1, 1, 1, 1];
const balls1 = [1, 1, 1, 1, 1, 2, 1, 1];
const balls2 = [1, 1, 1, 1, 1, 1, 1, 2];
const balls3 = [2, 1, 1, 1, 1, 1, 1, 1];

const heaviestBallFinder = (balls) => {
    // podzial na 3 grupy do pierwszego wazenia
    let firstGroup = balls.slice(0, 3); // grupa 1 z 3 kulami
    let firstGroupWeight = firstGroup.reduce((a, b) => a + b, 0); // waga 1 grupy
    let secondGroup = balls.slice(3, 6); // grupa 2 z 3 kulami
    let secondGroupWeight = secondGroup.reduce((a, b) => a + b, 0); //waga 2 grupy
    let thirdGroup = balls.slice(6); // grupa 3 z 2 kulami
    // let thirdGroupWeight = thirdGroup.reduce((a, b) => a + b, 0); // waga 3 grupy //niepotrzebne, bo jak 1 jest wieksza od 1 to pierwsza jest najwieksza, jak 2 to 2, a jesli sa rowne to sie wykluczaja i 3 jes twieksza
    let heaviestBallIndex;
    let heavierGroup = [];

    firstGroupWeight > secondGroupWeight
        ? (heavierGroup = firstGroup)
        : firstGroupWeight < secondGroupWeight
        ? (heavierGroup = secondGroup)
        : (heavierGroup = thirdGroup); // pierwsze wazenie, ktora grupa jest najciezsza
    // ify zeby odnalezc dlugosc najciezszej grupy, gdyz sa dwie grupy 3 kulkowe i jedna dwukulkowa
    if (heavierGroup.length === 3) {
        if (heavierGroup[0] === heavierGroup[1]) {
            heaviestBallIndex = balls.indexOf(heavierGroup[2]);
            console.log(heaviestBallIndex);
        } else if (heavierGroup[0] === heavierGroup[2]) {
            heaviestBallIndex = balls.indexOf(heavierGroup[1]);
        } else {
            heaviestBallIndex = balls.indexOf(heavierGroup[0]);
        }
    } else if (heavierGroup.length === 2) {
        if (heavierGroup[0] > heavierGroup[1]) {
            heaviestBallIndex = balls.indexOf(heavierGroup[0]);
        } else {
            heaviestBallIndex = balls.indexOf(heavierGroup[1]);
        }
    }

    let ending = "";
    //dodanie koncowki do cyfry
    switch (heaviestBallIndex) {
        case 0:
            ending = "st";
            break;
        case 1:
            ending = "nd";
            break;
        case 2:
            ending = "rd";
            break;
        default:
            ending = "th";
            break;
    }

    console.log(
        `Heaviest ball js's index is ${heaviestBallIndex}, so it is ${
            heaviestBallIndex + 1
        }${ending} ball`,
    );
};
heaviestBallFinder(balls3);
