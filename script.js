"use strict"

const container=document.querySelector(".container");
const submitBtn=document.querySelector("#submit-btn");
const countryToFetch=document.querySelector("#country-to-fetch");
const errorMsg=document.getElementById("error")

submitBtn.addEventListener('click',function(e){
    errorMsg.innerHTML=''
    e.preventDefault()
    if(countryToFetch.value===""){
        displayErrorMessqge("Enter the country name!🤦‍♂️")
    }
    else{
        getJsonData(countryToFetch.value)
    }
    
    container.style.opacity=1
    countryToFetch.value=""
})
const displayErrorMessqge=function(msg){
    errorMsg.innerHTML=msg
}
const displayCountry=function(country){
    let html=`<div class="country">
                <div class="image">
                    <img src="${country.flags.png}" alt="${country}">
                </div>
                <p>${country.name}</p>
                <ul class="info">
                    <li>Capital: <span>${country.capital}</span></li>
                    <li>Language: <span>${country.languages[0].name}</span></li>
                    <li>Area: <span>${country.area} Km</span></li>
                    <li>Population: <span>${(+(country.population)/1000000).toFixed(2)}M</span></li>
                    <li>Currencie: <span>${country.currencies[0].name},${country.currencies[0].symbol}</span></li>
                </ul>
            </div>`
            container.insertAdjacentHTML("afterbegin",html)
}
const getJsonData=async function(country){
    try{
        const response=await fetch(` https://restcountries.com/v2/name/${country}`)
        if(!response.ok) throw new Error("Please enter the correct country name!😑")
        const data=await response.json()
        displayCountry(data[0])
    }
    catch(error){
        displayErrorMessqge(error)
    }
    
}


