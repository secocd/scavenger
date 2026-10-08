
/* =========================================
   RANDOM CD
========================================= */

function randomCD() {

    if (typeof cds === "undefined" || cds.length === 0) {
        return;
    }

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
        "album.html?id=" + encodeURIComponent(randomAlbum.id);

}


/* =========================================
   COLLECTION COUNT
========================================= */

const collectionCount =
    document.getElementById("collection-count");

if (collectionCount) {
    collectionCount.textContent = cds.length;
}


/* =========================================
   ARCHIVE ELEMENTS
========================================= */

const collection =
    document.getElementById("collection");

const searchInput =
    document.getElementById("archive-search");

const sortSelect =
    document.getElementById("archive-sort");

const genreSelect =
    document.getElementById("archive-genre");

const styleSelect =
    document.getElementById("archive-style");


/* =========================================
   SPLIT GENRES AND STYLES
========================================= */

function splitCategories(value) {

    if (typeof value !== "string") {
        return [];
    }

    return value
        .split(",")
        .map(function(item) {
            return item.trim();
        })
        .filter(function(item) {
            return item !== "";
        });

}


/* =========================================
   POPULATE GENRE FILTER
========================================= */

function populateFilters() {

    const genres = new Set();

    cds.forEach(function(cd) {

        splitCategories(cd.genre).forEach(function(genre) {
            genres.add(genre);
        });

    });


    /* ADD GENRE OPTIONS */

    if (genreSelect) {

        genreSelect.innerHTML =
            '<option value="all">all genres</option>';

        Array.from(genres)
            .sort(function(a, b) {
                return a.localeCompare(b);
            })
            .forEach(function(genre) {

                const option =
                    document.createElement("option");

                option.value = genre;
                option.textContent = genre;

                genreSelect.appendChild(option);

            });

    }


    /* POPULATE STYLES */

    updateStyleFilter();

}


/* =========================================
   UPDATE STYLE FILTER BASED ON GENRE
========================================= */

function updateStyleFilter() {

    if (!styleSelect) {
        return;
    }

    const selectedGenre = genreSelect
        ? genreSelect.value
        : "all";

    const previousStyle = styleSelect.value;

    const availableStyles = new Set();


    /* FIND STYLES FOR MATCHING GENRE */

    cds.forEach(function(cd) {

        const genres = splitCategories(cd.genre);

        if (
            selectedGenre === "all" ||
            genres.includes(selectedGenre)
        ) {

            splitCategories(cd.style).forEach(function(style) {
                availableStyles.add(style);
            });

        }

    });


    /* RESET STYLE OPTIONS */

    styleSelect.innerHTML =
        '<option value="all">all styles</option>';


    /* ADD AVAILABLE STYLES */

    Array.from(availableStyles)
        .sort(function(a, b) {
            return a.localeCompare(b);
        })
        .forEach(function(style) {

            const option =
                document.createElement("option");

            option.value = style;
            option.textContent = style;

            styleSelect.appendChild(option);

        });


    /* KEEP PREVIOUS STYLE IF AVAILABLE */

    if (availableStyles.has(previousStyle)) {

        styleSelect.value = previousStyle;

    } else {

        styleSelect.value = "all";

    }

}


/* =========================================
   BUILD ARCHIVE
========================================= */

function displayCollection() {

    if (!collection) {
        return;
    }


    /* SEARCH */

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    /* GENRE */

    const selectedGenre = genreSelect
        ? genreSelect.value
        : "all";


    /* STYLE */

    const selectedStyle = styleSelect
        ? styleSelect.value
        : "all";


    /* FILTER CDS */

    let filteredCDs = cds.filter(function(cd) {

        const artist =
            (cd.artist || "").toLowerCase();

        const album =
            (cd.album || "").toLowerCase();

        const matchesSearch =
            artist.includes(searchTerm) ||
            album.includes(searchTerm);

        const matchesGenre =
            selectedGenre === "all" ||
            splitCategories(cd.genre).includes(selectedGenre);

        const matchesStyle =
            selectedStyle === "all" ||
            splitCategories(cd.style).includes(selectedStyle);

        return (
            matchesSearch &&
            matchesGenre &&
            matchesStyle
        );

    });


    /* =====================================
       SORT CDS
    ===================================== */

    if (sortSelect) {

        const sortType = sortSelect.value;


        /* ORIGINAL ORDER */

        if (sortType === "original") {

            // Keep original cds.js order.

        }


        /* ARTIST A-Z */

        if (
            sortType === "artist-az" ||
            sortType === "artist"
        ) {

            filteredCDs.sort(function(a, b) {
                return a.artist.localeCompare(b.artist);
            });

        }


        /* ARTIST Z-A */

        if (
            sortType === "artist-za" ||
            sortType === "artist-reverse"
        ) {

            filteredCDs.sort(function(a, b) {
                return b.artist.localeCompare(a.artist);
            });

        }


        /* OLDEST ALBUM */

        if (sortType === "year-old") {

            filteredCDs.sort(function(a, b) {

                if (typeof a.year !== "number") return 1;
                if (typeof b.year !== "number") return -1;

                return a.year - b.year;

            });

        }


        /* NEWEST ALBUM */

        if (sortType === "year-new") {

            filteredCDs.sort(function(a, b) {

                if (typeof a.year !== "number") return 1;
                if (typeof b.year !== "number") return -1;

                return b.year - a.year;

            });

        }


        /* LOWEST PRICE */

        if (sortType === "price-low") {

            filteredCDs.sort(function(a, b) {

                if (typeof a.price !== "number") return 1;
                if (typeof b.price !== "number") return -1;

                return a.price - b.price;

            });

        }


        /* HIGHEST PRICE */

        if (sortType === "price-high") {

            filteredCDs.sort(function(a, b) {

                if (typeof a.price !== "number") return 1;
                if (typeof b.price !== "number") return -1;

                return b.price - a.price;

            });

        }


        /* HIGHEST RATING */

        if (sortType === "rating-high") {

            filteredCDs.sort(function(a, b) {

                if (typeof a.rating !== "number") return 1;
                if (typeof b.rating !== "number") return -1;

                return b.rating - a.rating;

            });

        }

    }


    /* =====================================
       CLEAR ARCHIVE
    ===================================== */

    collection.innerHTML = "";


    /* NO RESULTS */

    if (filteredCDs.length === 0) {

        const message =
            document.createElement("p");

        message.textContent = "no CDs found";

        message.style.gridColumn = "1 / -1";
        message.style.textAlign = "center";

        collection.appendChild(message);

        return;

    }


    /* =====================================
       DISPLAY CDS
    ===================================== */

    filteredCDs.forEach(function(cd) {

        const card =
            document.createElement("div");

        card.className = "cd";


        /* ALBUM LINK */

        const link =
            document.createElement("a");

        link.href =
            "album.html?id=" + encodeURIComponent(cd.id);


        /* ALBUM IMAGE */

        const image =
            document.createElement("img");

        image.src = cd.image;

        image.alt =
            cd.artist + " - " + cd.album;

        link.appendChild(image);


        /* ARTIST */

        const artist =
            document.createElement("h3");

        artist.textContent = cd.artist;


        /* ALBUM */

        const album =
            document.createElement("p");

        album.textContent = cd.album;


        /* ADD TO CARD */

        card.appendChild(link);
        card.appendChild(artist);
        card.appendChild(album);


        /* ADD TO ARCHIVE */

        collection.appendChild(card);

    });

}


/* =========================================
   INITIALIZE ARCHIVE
========================================= */

if (collection) {

    populateFilters();

    displayCollection();

}


/* =========================================
   LIVE SEARCH
========================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayCollection
    );

}


/* =========================================
   LIVE SORT
========================================= */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        displayCollection
    );

}


/* =========================================
   LIVE GENRE FILTER
========================================= */

if (genreSelect) {

    genreSelect.addEventListener("change", function() {

        updateStyleFilter();

        displayCollection();

    });

}


/* =========================================
   LIVE STYLE FILTER
========================================= */

if (styleSelect) {

    styleSelect.addEventListener(
        "change",
        displayCollection
    );

}


/* =========================================
   BASIC STATS
========================================= */

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


/* =========================================
   SCAVENGER STATS
========================================= */

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


/* =========================================
   CALCULATE STATS
========================================= */

const CDsWithPrices = cds.filter(function(cd) {
    return typeof cd.price === "number";
});


/* TOTAL CDS */

if (totalCDs) {

    totalCDs.textContent = cds.length;

}


/* TOTAL SPENT */

const spent = CDsWithPrices.reduce(function(total, cd) {
    return total + cd.price;
}, 0);

if (totalSpent) {

    totalSpent.textContent = "€" + spent;

}


/* AVERAGE PRICE */

if (averagePrice && CDsWithPrices.length > 0) {

    const average = spent / CDsWithPrices.length;

    averagePrice.textContent =
        "€" + average.toFixed(2);

}


/* CHEAPEST FIND */

if (cheapestPrice && CDsWithPrices.length > 0) {

    const cheapest = Math.min(
        ...CDsWithPrices.map(function(cd) {
            return cd.price;
        })
    );

    cheapestPrice.textContent =
        "€" + cheapest;

}


/* MOST EXPENSIVE FIND */

if (mostExpensivePrice && CDsWithPrices.length > 0) {

    const mostExpensive = Math.max(
        ...CDsWithPrices.map(function(cd) {
            return cd.price;
        })
    );

    mostExpensivePrice.textContent =
        "€" + mostExpensive;

}


/* DIFFERENT ARTISTS */

if (artistCount) {

    const artists = new Set(
        cds.map(function(cd) {
            return cd.artist;
        })
    );

    artistCount.textContent = artists.size;

}


/* DIFFERENT CITIES */

if (cityCount) {

    const cities = new Set(
        cds
            .filter(function(cd) {
                return cd.where && cd.where.trim() !== "";
            })
            .map(function(cd) {
                return cd.where;
            })
    );

    cityCount.textContent = cities.size;

}


/* =========================================
   €3 RULE
========================================= */

const underThree = CDsWithPrices.filter(function(cd) {
    return cd.price <= 3;
});

if (underThreeCount) {

    underThreeCount.textContent =
        underThree.length;

}

if (pricedCDs) {

    pricedCDs.textContent =
        CDsWithPrices.length;

}

if (threeEuroSuccess) {

    if (CDsWithPrices.length > 0) {

        const successRate =
            (underThree.length / CDsWithPrices.length) * 100;

        threeEuroSuccess.textContent =
            successRate.toFixed(0) + "%";

    } else {

        threeEuroSuccess.textContent = "0%";

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


/* =========================================
   MOST FOUND CITY
========================================= */

const cityTotals = {};

cds.forEach(function(cd) {

    if (
        typeof cd.where === "string" &&
        cd.where.trim() !== ""
    ) {

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

        mostFoundCity = city;
        mostFoundCityCount = cityTotals[city];

    }

}

if (topCity) {

    topCity.textContent = mostFoundCity || "—";

}

if (topCityCount) {

    topCityCount.textContent = mostFoundCityCount;

}


/* =========================================
   ESTIMATED MARKET VALUE
========================================= */

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
