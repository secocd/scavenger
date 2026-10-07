/* RANDOM CD */

function randomCD() {

    const currentID =
        new URLSearchParams(window.location.search).get("id");

    const possibleCDs = cds.filter(function(cd) {
        return cd.id !== currentID;
    });

    if (possibleCDs.length === 0) {
        return;
    }

    const randomNumber =
        Math.floor(Math.random() * possibleCDs.length);

    const randomAlbum =
        possibleCDs[randomNumber];

    window.location.href =
        "album.html?id=" + randomAlbum.id;
}


/* COLLECTION COUNT */

const collectionCount =
    document.getElementById("collection-count");

if (collectionCount) {

    collectionCount.textContent =
        cds.length;

}


/* BUILD ARCHIVE */

const collection =
    document.getElementById("collection");

if (collection) {

    cds.forEach(function(cd) {

        const card =
            document.createElement("div");

        card.className = "cd";

        card.innerHTML = `
            <a href="album.html?id=${cd.id}">
                <img
                    src="${cd.image}"
                    alt="${cd.artist} - ${cd.album}"
                >
            </a>

            <h3>${cd.artist}</h3>

            <p>${cd.album}</p>
        `;

        collection.appendChild(card);

    });

}


/* STATS */

const totalCDs =
    document.getElementById("total-cds");

const totalSpent =
    document.getElementById("total-spent");

const averagePrice =
    document.getElementById("average-price");

const cheapestPrice =
    document.getElementById("cheapest-price");

const mostExpensivePrice =
    document.getElementById("most-expensive-price");

const artistCount =
    document.getElementById("artist-count");

const cityCount =
    document.getElementById("city-count");


if (totalCDs) {

    const CDsWithPrices =
        cds.filter(function(cd) {
            return cd.price !== null;
        });


    /* TOTAL CDS */

    totalCDs.textContent =
        cds.length;


    /* TOTAL SPENT */

    const spent =
        CDsWithPrices.reduce(function(total, cd) {
            return total + cd.price;
        }, 0);

    totalSpent.textContent =
        "€" + spent;


    /* AVERAGE PRICE */

    if (CDsWithPrices.length > 0) {

        const average =
            spent / CDsWithPrices.length;

        averagePrice.textContent =
            "€" + average.toFixed(2);

    }


    /* CHEAPEST FIND */

    if (CDsWithPrices.length > 0) {

        const cheapest =
            Math.min(
                ...CDsWithPrices.map(function(cd) {
                    return cd.price;
                })
            );

        cheapestPrice.textContent =
            "€" + cheapest;

    }


    /* MOST EXPENSIVE FIND */

    if (CDsWithPrices.length > 0) {

        const mostExpensive =
            Math.max(
                ...CDsWithPrices.map(function(cd) {
                    return cd.price;
                })
            );

        mostExpensivePrice.textContent =
            "€" + mostExpensive;

    }


    /* DIFFERENT ARTISTS */

    const artists =
        new Set(
            cds.map(function(cd) {
                return cd.artist;
            })
        );

    artistCount.textContent =
        artists.size;


    /* DIFFERENT CITIES */

    const cities =
        new Set(
            cds
                .filter(function(cd) {
                    return cd.where !== "";
                })
                .map(function(cd) {
                    return cd.where;
                })
        );

    cityCount.textContent =
        cities.size;

}


/* SCAVENGER STATS */

const underThreeCount =
    document.getElementById("under-three-count");

const pricedCDs =
    document.getElementById("priced-cds");

const threeEuroSuccess =
    document.getElementById("three-euro-success");

const oneEuroFinds =
    document.getElementById("one-euro-finds");

const twoEuroFinds =
    document.getElementById("two-euro-finds");

const threeEuroFinds =
    document.getElementById("three-euro-finds");

const overThreeFinds =
    document.getElementById("over-three-finds");

const topCity =
    document.getElementById("top-city");

const topCityCount =
    document.getElementById("top-city-count");


if (underThreeCount) {

    const CDsWithPrices =
        cds.filter(function(cd) {
            return cd.price !== null;
        });


    /* NUMBER OF PRICED CDS */

    pricedCDs.textContent =
        CDsWithPrices.length;


    /* €3 RULE */

    const underThree =
        CDsWithPrices.filter(function(cd) {
            return cd.price <= 3;
        });

    underThreeCount.textContent =
        underThree.length;


    /* €3 RULE SUCCESS RATE */

    if (CDsWithPrices.length > 0) {

        const successRate =
            (underThree.length / CDsWithPrices.length) * 100;

        threeEuroSuccess.textContent =
            successRate.toFixed(0) + "%";

    }


    /* €1 FINDS */

    oneEuroFinds.textContent =
        CDsWithPrices.filter(function(cd) {
            return cd.price === 1;
        }).length;


    /* €2 FINDS */

    twoEuroFinds.textContent =
        CDsWithPrices.filter(function(cd) {
            return cd.price === 2;
        }).length;


    /* €3 FINDS */

    threeEuroFinds.textContent =
        CDsWithPrices.filter(function(cd) {
            return cd.price === 3;
        }).length;


    /* OVER €3 FINDS */

    if (overThreeFinds) {

        overThreeFinds.textContent =
            CDsWithPrices.filter(function(cd) {
                return cd.price > 3;
            }).length;

    }


    /* MOST FOUND CITY */

    const cityTotals = {};


    CDsWithPrices.forEach(function(cd) {

        if (cd.where !== "") {

            if (!cityTotals[cd.where]) {
                cityTotals[cd.where] = 0;
            }

            cityTotals[cd.where]++;

        }

    });


    let mostFoundCity = "";
    let mostFoundCityCount = 0;


    for (const city in cityTotals) {

        if (cityTotals[city] > mostFoundCityCount) {

            mostFoundCity =
                city;

            mostFoundCityCount =
                cityTotals[city];

        }

    }


    if (mostFoundCity !== "") {

        topCity.textContent =
            mostFoundCity;

        topCityCount.textContent =
            mostFoundCityCount;

    }

}