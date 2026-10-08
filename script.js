/* RANDOM CD */

function randomCD() {

    const currentID =
        new URLSearchParams(window.location.search).get("id");


    const possibleCDs =
        cds.filter(function(cd) {

            return cd.id !== currentID;

        });


    if (possibleCDs.length === 0) {
        return;
    }


    const randomNumber =
        Math.floor(
            Math.random() * possibleCDs.length
        );


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


/* ARCHIVE ELEMENTS */

const collection =
    document.getElementById("collection");

const searchInput =
    document.getElementById("search");

const sortSelect =
    document.getElementById("sort");


/* BUILD ARCHIVE */

function displayCollection() {

    if (!collection) {
        return;
    }


    /* SEARCH */

    const searchTerm =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    let filteredCDs =
        cds.filter(function(cd) {

            const artist =
                cd.artist
                    ? cd.artist.toLowerCase()
                    : "";

            const album =
                cd.album
                    ? cd.album.toLowerCase()
                    : "";


            return (
                artist.includes(searchTerm) ||
                album.includes(searchTerm)
            );

        });


    /* SORT */

    if (sortSelect) {

        const sortType =
            sortSelect.value;


        /* ARTIST A-Z */

        if (sortType === "artist") {

            filteredCDs.sort(function(a, b) {

                return a.artist.localeCompare(b.artist);

            });

        }


        /* ARTIST Z-A */

        if (sortType === "artist-reverse") {

            filteredCDs.sort(function(a, b) {

                return b.artist.localeCompare(a.artist);

            });

        }


        /* OLDEST ALBUM */

        if (sortType === "year-old") {

            filteredCDs.sort(function(a, b) {

                if (a.year === null) {
                    return 1;
                }

                if (b.year === null) {
                    return -1;
                }

                return a.year - b.year;

            });

        }


        /* NEWEST ALBUM */

        if (sortType === "year-new") {

            filteredCDs.sort(function(a, b) {

                if (a.year === null) {
                    return 1;
                }

                if (b.year === null) {
                    return -1;
                }

                return b.year - a.year;

            });

        }


        /* LOWEST PRICE */

        if (sortType === "price-low") {

            filteredCDs.sort(function(a, b) {

                if (a.price === null) {
                    return 1;
                }

                if (b.price === null) {
                    return -1;
                }

                return a.price - b.price;

            });

        }


        /* HIGHEST PRICE */

        if (sortType === "price-high") {

            filteredCDs.sort(function(a, b) {

                if (a.price === null) {
                    return 1;
                }

                if (b.price === null) {
                    return -1;
                }

                return b.price - a.price;

            });

        }


        /* HIGHEST RATING */

        if (sortType === "rating-high") {

            filteredCDs.sort(function(a, b) {

                if (a.rating === null) {
                    return 1;
                }

                if (b.rating === null) {
                    return -1;
                }

                return b.rating - a.rating;

            });

        }

    }


    /* CLEAR CURRENT ARCHIVE */

    collection.innerHTML = "";


    /* DISPLAY RESULTS */

    filteredCDs.forEach(function(cd) {

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


/* INITIAL ARCHIVE */

displayCollection();


/* LIVE SEARCH */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayCollection
    );

}


/* LIVE SORT */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        displayCollection
    );

}


/* BASIC STATS */

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


/* CALCULATE STATS */

const CDsWithPrices =
    cds.filter(function(cd) {

        return cd.price !== null &&
               typeof cd.price === "number";

    });


/* TOTAL CDS */

if (totalCDs) {

    totalCDs.textContent =
        cds.length;

}


/* TOTAL SPENT */

const spent =
    CDsWithPrices.reduce(
        function(total, cd) {
            return total + cd.price;
        },
        0
    );


if (totalSpent) {

    totalSpent.textContent =
        "€" + spent;

}


/* AVERAGE PRICE */

if (
    averagePrice &&
    CDsWithPrices.length > 0
) {

    const average =
        spent / CDsWithPrices.length;


    averagePrice.textContent =
        "€" + average.toFixed(2);

}


/* CHEAPEST FIND */

if (
    cheapestPrice &&
    CDsWithPrices.length > 0
) {

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

if (
    mostExpensivePrice &&
    CDsWithPrices.length > 0
) {

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

if (artistCount) {

    const artists =
        new Set(
            cds.map(function(cd) {
                return cd.artist;
            })
        );


    artistCount.textContent =
        artists.size;

}


/* DIFFERENT CITIES */

if (cityCount) {

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


/* €3 RULE */

if (underThreeCount) {

    const underThree =
        CDsWithPrices.filter(function(cd) {

            return cd.price <= 3;

        });


    underThreeCount.textContent =
        underThree.length;


    if (pricedCDs) {

        pricedCDs.textContent =
            CDsWithPrices.length;

    }


    /* SUCCESS RATE */

    if (threeEuroSuccess) {

        if (CDsWithPrices.length > 0) {

            const successRate =
                (
                    underThree.length /
                    CDsWithPrices.length
                ) * 100;


            threeEuroSuccess.textContent =
                successRate.toFixed(0) + "%";

        }

    }


    /* €1 FINDS */

    if (oneEuroFinds) {

        oneEuroFinds.textContent =
            CDsWithPrices.filter(function(cd) {

                return cd.price === 1;

            }).length;

    }


    /* €2 FINDS */

    if (twoEuroFinds) {

        twoEuroFinds.textContent =
            CDsWithPrices.filter(function(cd) {

                return cd.price === 2;

            }).length;

    }


    /* €3 FINDS */

    if (threeEuroFinds) {

        threeEuroFinds.textContent =
            CDsWithPrices.filter(function(cd) {

                return cd.price === 3;

            }).length;

    }


    /* OVER €3 FINDS */

    if (overThreeFinds) {

        overThreeFinds.textContent =
            CDsWithPrices.filter(function(cd) {

                return cd.price > 3;

            }).length;

    }


    /* MOST FOUND CITY */

    const cityTotals = {};


    cds.forEach(function(cd) {

        if (
            cd.where &&
            cd.where !== ""
        ) {

            if (!cityTotals[cd.where]) {

                cityTotals[cd.where] =
                    0;

            }


            cityTotals[cd.where]++;

        }

    });


    let mostFoundCity =
        "";

    let mostFoundCityCount =
        0;


    for (const city in cityTotals) {

        if (
            cityTotals[city] >
            mostFoundCityCount
        ) {

            mostFoundCity =
                city;

            mostFoundCityCount =
                cityTotals[city];

        }

    }


    if (
        topCity &&
        mostFoundCity !== ""
    ) {

        topCity.textContent =
            mostFoundCity;

    }


    if (
        topCityCount &&
        mostFoundCity !== ""
    ) {

        topCityCount.textContent =
            mostFoundCityCount;

    }

    /* ESTIMATED MARKET VALUE */

const marketValueElement =
    document.getElementById("market-value");

if (marketValueElement) {

    const totalMarketValue = cds.reduce(function(total, cd) {

        if (typeof cd.marketValue === "number") {
            return total + cd.marketValue;
        }

        return total;

    }, 0);

    marketValueElement.textContent =
        "€" + totalMarketValue.toFixed(0);

}

}