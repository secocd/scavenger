const cds = [
    "john cale-ultraviolence.html",
    "julee cruise-the voice of love.html",
    "swans-the burning world.html",
    "low-i could live in hope.html",
    "locust-morning light.html"  
];


function randomCD() {

    const currentPage = window.location.pathname.split("/").pop();

    let possibleCDs = cds.filter(function(cd) {
        return cd !== currentPage;
    });

    const randomNumber =
        Math.floor(Math.random() * possibleCDs.length);

    window.location.href = possibleCDs[randomNumber];
}