const searchbar = document.getElementById('searchbar');
const searchResults = document.getElementById('search-results');

let timeout = null;

function displayResults(results) {
    console.log("Results: " + results);
    if (results.length === 0) {
        searchResults.innerHTML = "<p>No results found</p>";
        searchResults.style.display = "block";
        return;
    }

    searchResults.innerHTML = results
        .map(movie => `<p onclick="selectResult('${movie.Title}')">${movie.Title} (${movie.Year})</p>`)
        .join("");

    searchResults.style.display = "block";
}

function selectResult(title) {
    searchbar.value = title;
    searchResults.style.display = "none";
}

function adjustResultsWidth() {
    // ✅ Ensure the results match the search bar width
    searchResults.style.width = `${searchbar.offsetWidth}px`;
}

// ✅ Resize results dynamically if window resizes
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
            console.log("Search error:", error);
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
    }
});