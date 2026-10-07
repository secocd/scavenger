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

    const randomAlbum = possibleCDs[randomNumber];

    window.location.href =
        "album.html?id=" + randomAlbum.id;
}


/* COLLECTION COUNT */

const collectionCount =
    document.getElementById("collection-count");

if (collectionCount) {

    collectionCount.textContent = cds.length;

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