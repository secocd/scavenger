function randomCD() {

    const currentPage = window.location.pathname.split("/").pop();

    const possibleCDs = cds.filter(function(cd) {
        return cd.page !== currentPage;
    });

    if (possibleCDs.length === 0) {
        return;
    }

    const randomNumber =
        Math.floor(Math.random() * possibleCDs.length);

    window.location.href = possibleCDs[randomNumber].page;
}


/* COLLECTION COUNT */

const collectionCount =
    document.getElementById("collection-count");

if (collectionCount) {
    collectionCount.textContent = cds.length;
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

    const CDsWithPrices = cds.filter(function(cd) {
        return cd.price !== null;
    });


    /* TOTAL CDS */

    totalCDs.textContent = cds.length;


    /* TOTAL SPENT */

    const spent = CDsWithPrices.reduce(function(total, cd) {
        return total + cd.price;
    }, 0);

    totalSpent.textContent = "€" + spent;


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

    const artists = new Set(
        cds.map(function(cd) {
            return cd.artist;
        })
    );

    artistCount.textContent = artists.size;


    /* DIFFERENT CITIES */

    const cities = new Set(
        cds
            .filter(function(cd) {
                return cd.where !== "";
            })
            .map(function(cd) {
                return cd.where;
            })
    );

    cityCount.textContent = cities.size;
}