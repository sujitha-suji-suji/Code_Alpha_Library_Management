let searchInputEl = document.getElementById("searchInput");
let resultInfoEl = document.getElementById("resultInfo");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function displayResults(result) {
    let {
        imageLink,
        author
    } = result;
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("col-6", "text-center");
    searchResultsEl.appendChild(resultContainer);

    let imageEl = document.createElement("img");
    imageEl.src = imageLink;
    resultContainer.appendChild(imageEl);

    let authorName = document.createElement("p");
    authorName.textContent = author;
    authorName.classList.add("author-name");
    resultContainer.appendChild(authorName);
}

function BooksResult(searchResults) {

    spinnerEl.classList.add("d-none");

    if (searchResults.length === 0) {
        resultInfoEl.textContent = "No Results Found";
        resultInfoEl.classList.add("text-center");
    } else {
        resultInfoEl.textContent = "Popular Books";
    }
    for (let result of searchResults) {
        displayResults(result);
    }
}

function request(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInputVal = searchInputEl.value;
        let options = {
            method: "GET",
        };
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(search_results);
                BooksResult(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", request);
