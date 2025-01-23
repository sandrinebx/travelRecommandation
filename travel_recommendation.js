const current = document.getElementsByClassName("show")
const home = document.getElementById("home")
const recommendationsResult = document.getElementById("recommendations")
const searchResults = document.getElementById("search-result")
const searchInput = document.getElementById("travel-search")
const searchBtn = document.getElementById("searchBtn")
const clearSearch = document.getElementById("resetBtn")
const form = document.getElementsByTagName("form")
const bookbtn = document.getElementById("booknow-btn")
let retrievedData;

function clearRecommendations(){
    const recoCards = document.getElementsByClassName("reco-card")
    Array.from(recoCards).forEach(card => card.remove()) 
    searchResults.childNodes[0].textContent = ""

}

clearSearch.addEventListener("click", clearRecommendations)

async function recommendations(){
    try {
        const response = await fetch("./travel_recommendation_api.json",{method:"GET"})
        if(response.ok){
            retrievedData = await response.json()
        }
    } catch (error) {
        if(error){
            return; 
        }
    }
}

searchBtn.addEventListener("click", async (e)=> {
    if(!retrievedData){
        await recommendations()
    }
    e.target.value = ""

})
searchInput.addEventListener("click", async (e) => {
    if(!retrievedData){
        await recommendations()
    }
    e.target.value = ""

})
searchInput.addEventListener("blur", (e) => {
    e.target.value = "Enter a keyword"
    searchResults.childNodes[0].textContent = ""
    searchResults.childNodes[0].style.padding = "0"
})


searchInput.addEventListener("input", (e) => {
    if(retrievedData){
        searchResults.childNodes[0].textContent = "Explore all"
        for(const d of Object.keys(retrievedData)){
            if (d.toLocaleLowerCase().match(e.target.value.toLowerCase())){
                searchResults.childNodes[0].style.padding = "1rem"
                searchResults.childNodes[0].textContent = d
            }
        }
            const cities = Object.values(retrievedData.countries)
            cities.forEach(city =>  {
                if(city.name.toLowerCase().match(e.target.value.toLowerCase())){
                searchResults.childNodes[0].style.padding = "1rem"
                    searchResults.childNodes[0].textContent = city.name
                }
            })  
    }
    
})

searchInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        const Evt = new MouseEvent("mousedown")
        searchResults.childNodes[0].dispatchEvent(Evt)
        const Blur = new Event("blur")
        searchInput.dispatchEvent(Blur)

    }
})

function addRecommendations(rdata){
    clearRecommendations()
    searchResults.childNodes[0].textContent = ""
    for(const data of rdata){
        const card = document.createElement("div")
        card.classList.add("reco-card")
        const image = document.createElement("div")
        image.style.backgroundImage = `url(${data.imageUrl})`
        image.classList.add("card-image")
        const title = document.createElement("h2")
        title.textContent = data.name
        const description = document.createElement("p");
        description.textContent = data.description
        const date = document.createElement("p")
        const options = { timeZone: `${data.date}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        /*const cityDate = new Date().toLocaleTimeString('en-US', options);
         date.textContent = cityDate */
        const btn = document.createElement("button")
        btn.addEventListener("click", () => {
            current[0].classList.remove("show")
            contact.classList.add("show")   
        })
        btn.textContent = "Visit"
        card.append(image, date,title, description, btn)
        recommendationsResult.appendChild(card)
    }
    return
}


searchResults.childNodes[0].addEventListener("mousedown", (e) => {
    const value = e.target.textContent
    current[0].classList.remove("show")
    home.classList.add("show")  
    if(value === "Explore all" || value === "countries" || !value){
        const newArray = []
        if(value !== "countries"){
            newArray.push(retrievedData.temples, retrievedData.beaches)
        }
        const cities = Object.values(retrievedData.countries)
        cities.forEach(city =>  {
             newArray.push(city.cities)
        })  
        return addRecommendations(newArray.flat())
    }
    if( value === "temples" || value === "beaches" ){
        addRecommendations(retrievedData[value])
    }
    else{
        const cities = Object.values(retrievedData.countries)
        cities.forEach(city =>  {
            if(city.name.match(value)){
             return addRecommendations(city.cities)
            }
        })  

    }
   return
})
