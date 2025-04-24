const buttons = document.getElementsByClassName('hype-favorite');
const hypeButton = buttons[0];
const favoriteButton = buttons[1];

const title = encodeURIComponent(document.querySelector('.title').innerHTML).replace(/[!'()*]/g, '%27'); ;
// console.log(title);
// console.log(decodeURIComponent(title));

const sendMovieInteraction = async (action) => {
    try {
        const response = await fetch(`/Movies/interact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                movie: title,
                action: action
            })
        });

        const data = await response.json();
        if(data.message == "Already added") {
            confirm(`You have already ${data.method}d this movie!`);
        }

        if(data.special == "Unable") {
            return "Unable";
        }

        return data.message;
    } catch (error) {
        console.error("Error:", error);
    }
};

window.onload = async function() {
    console.log("func");
    const response = await sendMovieInteraction("load");
    if(response == "favorited") {
        document.getElementById("heart").innerHTML = "<i class=\"fa-solid fa-heart\"></i>"
    }
};

hypeButton.addEventListener("click", async (event) => {
    const response = await sendMovieInteraction("hype");
});

favoriteButton.addEventListener("click", async (event) => {
    const response = await sendMovieInteraction("favorite");
    if(response == "You must be logged in to access this page") {
        confirm("Please login to favorite or hype movies!");
    }
    else {
        document.getElementById("heart").innerHTML = "<i class=\"fa-solid fa-heart\"></i>";
    }
});