let url = "travel_recommendation_api.json";
let searchbar= document.getElementById("search");
let searchbutton= document.getElementById("searchBtn");
function search(){
    if (!searchbar.value){
        clear();
        return;
    }
    let val = searchbar.value.toLowerCase();
    if (val ==='beach' || val === 'beaches') val ="beaches";
    else if (val === 'country' || val === 'countries') val ="countries";
    else if (val === 'temple' || val === 'temples') val ="temples";
    else val = ''
    if (!val){
        clear();
        return;
    }
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        let result = data[val];
        let element = document.getElementById('result');
        let inh = '';
        if (val === "countries"){
            result.forEach(item=>{
                inh+=`<br>`
                inh+=`<h1>Country:${item["name"]}<h1>`
                let cities = item["cities"]
                cities.forEach(i=>{
                    inh+=`<img src=${i["imageUrl"]} style="max-width: 400px; height:auto">`;
                    inh+=`<h3>City:${i["name"]}<h3>`;
                    inh+=`<h5>${i["description"]}</h5>`
                    inh+=`<button style="height:50px;width:150px; color: white; background-color: grey; border-radius: 5px; border: none;">VISIT</button><br><br><br><br>`

                })
                inh+=`<br>`
            })
        }
        else{
            result.forEach(i=>{
                inh+=`<br>`
                inh+=`<img src=${i["imageUrl"]} style="max-width: 400px; height:auto">`;
                inh+=`<h3>City:${i["name"]}<h3>`;
                inh+=`<h5>${i["description"]}</h5>`
                inh+=`<button style="height:50px;width:150px; color: white; background-color: cadetblue; border-radius: 5px; border: none;">VISIT</button><br><br><br><br>`

                })
        }

        element.innerHTML = inh;
        element.style.display = "block";
        element.ent.style.alignSelf = "center"

        document.getElementById("not").style.display="none";
    })
}
function clear(){
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').style.display="none";
    document.getElementById("not").style.display="block";
    searchbar.value=""
}
searchbutton.addEventListener('click', search);
document.getElementById("resetBtn").addEventListener('click', clear);