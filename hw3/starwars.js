const films = require("./sw-films.json");
const planets = require("./sw-planets.json");
const people = require("./sw-people.json");
const starships = require("./sw-starships.json");

// count sum of all starships cost from episodes 4-6
console.log(
    "Sum of all starships cost from episodes 4 - 6 is: " + sumAllStarshipsCostFromEpisodes(4, 6),
);
function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
    let sum = 0;

    const selectedFilms = films.filter(
        (film) => film.episode_id >= startEp && film.episode_id <= endEp,
    );

    selectedFilms.forEach((film) => {
        if (film.starships && film.starships.length > 0) {
            film.starships.forEach((starshipUrl) => {
                const starshipData = starships.find((starship) => starship.url === starshipUrl);

                if (starshipData) {
                    if (
                        starshipData.cost_in_credits &&
                        starshipData.cost_in_credits !== "unknown"
                    ) {
                        sum += parseInt(starshipData.cost_in_credits);
                    }
                }
            });
        }
    });
    return sum;
}

// find the fastest starship you can afford having 8500000 credits

console.log("Fastest ship I can get for up to 8500000 is: " + getFastestShipFor(8500000).name);

function getFastestShipFor(money) {
    let ship;

    starships.forEach((starship) => {
        if (starship.cost_in_credits && starship.cost_in_credits !== "unknown") {
            if (parseInt(starship.cost_in_credits) <= money) {
                if (!ship) {
                    ship = starship;
                } else {
                    if (
                        parseFloat(starship.max_atmosphering_speed) >
                        parseFloat(ship.max_atmosphering_speed)
                    ) {
                        ship = starship;
                    }
                }
            }
        }
    });
    return ship;
}

// // find planet name with the lowest difference between the rotation period and orbital period

console.log(
    "Planet name with the lowest difference between the rotation period and orbital period is: " +
        getPlanetNameWithLowestDifference("rotation_period", "orbital_period"),
);

function getPlanetNameWithLowestDifference(key1, key2) {
    let planetName;
    let minDifference = Infinity;

    planets.forEach((planet) => {
        const rotationPeriod = parseFloat(planet[key1]);
        const orbitalPeriod = parseFloat(planet[key2]);

        if (!isNaN(rotationPeriod) && !isNaN(orbitalPeriod)) {
            const difference = rotationPeriod - orbitalPeriod;

            if (difference < minDifference) {
                minDifference = difference;
                planetName = planet.name;
            }
        }
    });

    return planetName;
}
// // map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
    "Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: " +
        getCrewShipFrom(4, new Date(2014, 11, 10), new Date(2014, 11, 12)).length,
);

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
    let ships = [];

    starships.forEach((ship) => {
        const shipCreationDate = new Date(ship.created);
        const isMaxCrew = parseInt(ship.crew) <= maxCrew;
        const isWithinDateRange = shipCreationDate >= dateStart && shipCreationDate <= dateEnd;
        if (isMaxCrew && isWithinDateRange) {
            ships.push(ship);
        }
    });

    return ships;
}

// // create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high

console.log(
    "People from ep 1 - 5 sorted by origin planet diameter low to high: " +
        getPeopleSortedByOriginPlanetDiameter(1, 5),
);

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {
    const filteredPeople = people.filter((person) => {
        const personEpisodes = person.films.map((film) => parseInt(film.slice(-2)));
        return personEpisodes.some((episode) => episode >= startEp && episode <= endEp);
    });

    filteredPeople.sort((a, b) => {
        const planetA = planets.find((planet) => planet.url === a.homeworld);
        const planetB = planets.find((planet) => planet.url === b.homeworld);

        return planetA.diameter - planetB.diameter;
    });

    return filteredPeople.map((person) => person.name);
}
