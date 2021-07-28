const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

//Waits for DOM to load, then runs functions to add images/breeds to page
document.addEventListener("DOMContentLoaded", function () {
    uploadImages();
    uploadBreeds();
})

//Gets images from server, passes data to addImageToPage function
function uploadImages(){
    fetch(imgUrl)
    .then(res => res.json())
    .then(data=> {
        data.message.forEach(image => addImageToPage(image))
    });
}

//Adds images to page under container
function addImageToPage(imageSource){
    const imgContainer = document.querySelector("#dog-image-container")
    const dogImg = document.createElement("img");
    dogImg.src = imageSource;
    imgContainer.appendChild(dogImg);
}

//Gets breeds from server, passes data to createBreedList function
function uploadBreeds(){
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
        allBreeds = Object.keys(data.message);
        createBreedList(allBreeds)
        breedDropdown();
    })
}

//Adds breeds to page under list container
function createBreedList(breeds) {
    let breedList = document.querySelector("#dog-breeds")
    breeds.forEach(breed => {
        let breedItem = document.createElement("li");
        breedItem.innerText = breed;
        breedItem.addEventListener("click", changeColor)
        breedList.appendChild(breedItem);
    })
}

//Changes list item color when clicked
function changeColor(e){
    e.target.style.color = "green";
}

// Challenge 4: Dropdown menu - choose letter, clears list, re-creates list w/ breeds that start with chosen letter
function breedDropdown(){
    let breedOptions = document.querySelector("#breed-dropdown");
    breedOptions.addEventListener("change", breedChoice)
}

function breedChoice(e) {
    let letterChoice = e.target.value;
    let newList = allBreeds.filter(breed => breed.startsWith(letterChoice))
    let breedList = document.querySelector("#dog-breeds")
    clearList(breedList);
    createBreedList(newList);
}

function clearList(breeds){
    while(breeds.firstChild){
        breeds.removeChild(breeds.firstChild)
    }
}

