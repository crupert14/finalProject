const searchbar = document.getElementById('searchbar');
const searchResults = document.getElementById('search-results');

let timeout = null;

async function loadMoviePage(title) {
    window.location.href = `/MovieInfo?title=${encodeURIComponent(title)}`;
}

function toggleMenu() {
    document.querySelector(".links").classList.toggle("active");
}

document.getElementById("hamburger").addEventListener("click", toggleMenu);

function displayResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = "<p>No results found</p>";
        searchResults.style.display = "block";
        return;
    }

    searchResults.innerHTML = results
        .map(movie => {
            const safeTitle = encodeURIComponent(movie.Title);
            return `<p onclick="selectResult(&quot;${safeTitle}&quot;)">${movie.Title.replace(/&/g, "&amp;")} (${movie.Year})</p>`;
        })
        .join("");

    searchResults.style.display = "block";
}

function selectResult(title) {
    const decodedTitle = decodeURIComponent(title);
    searchbar.value = decodedTitle;
    searchResults.style.display = "none";

    loadMoviePage(decodedTitle);
}

function adjustResultsWidth() {
    searchResults.style.width = `${searchbar.offsetWidth}px`;
}

window.addEventListener("resize", adjustResultsWidth);

searchbar.addEventListener('keyup', async () => {
    const query = searchbar.value;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        const query = searchbar.value.trim();
        if (query.trim().length < 3) {
            return;
        }

        try {
            const response = await fetch(`/Search?q=${query}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Search error:", error);
        }
    }, 500);
});

document.addEventListener("click", (event) => {
    searchResults.style.width = `${searchbar.offsetWidth}px`
    const searchContainer = document.querySelector(".search");
    if (!searchContainer.contains(event.target)) {
        document.getElementById("search-results").style.display = "none";
    }
    else {
        document.getElementById("search-results").style.display = "block";
        displayResults("");
    }
});