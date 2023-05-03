import {createDomElement} from "./domInteractions.js"


class EnterteimentWebApp{

constructor(){
    this.initializeApp();
}

initializeApp = () => {
    this.connectDomElements();
    this.setupListenners();
    this.renderAllBoxes();
    this.navItemsHome.classList.add("active");
}

connectDomElements = () =>{
    this.form = document.querySelector("form");
    this.input = document.getElementById("searchInput");
    this.box = document.getElementById("box");
    this.h1 = document.getElementById("h1");
    this.navItemsHome = document.getElementById("navItemsHome");
    this.navItemsMovies = document.getElementById("navItemsMovies");
    this.navItemsTVSeries = document.getElementById("navItemsTVSeries");
    this.navItemsFavorite = document.getElementById("navItemsFavorite");
    this.navelements = document.querySelectorAll("a");
}

setupListenners = () =>{

/*
    this.form.addEventListener("submit", e => {
        e.preventDefault();
        this.h1.innerText=""
        this.searchByWord(this.input.value);
        form.reset();
    })*/
   this.form.addEventListener("submit", e => {
        e.preventDefault();

    })
    this.input.addEventListener("input", e => {
       
       setTimeout(()=>{
        this.h1.innerText=""
        this.searchByWord(this.input.value);
       },1000)

    })

    this.navItemsHome.addEventListener("click", () => {
        this.h1.innerText="Recommended for you"
        this.navelements.forEach(element =>{
            element.classList.remove("active");
        })
        this.navItemsHome.classList.add("active");
        this.renderAllBoxes();
    }); 

    this.navItemsMovies.addEventListener("click", () => {
        this.h1.innerText="Movies"
        this.navelements.forEach(element =>{
            element.classList.remove("active");
        })
        this.navItemsMovies.classList.add("active");
        this.searchByCategory("Movie");
    }); 

    this.navItemsTVSeries.addEventListener("click", () => {
        this.h1.innerText="TV Series";
        this.navelements.forEach(element =>{
            element.classList.remove("active");
        })
        this.navItemsTVSeries.classList.add("active");
        this.searchByCategory("TV Series");
    }); 

    this.navItemsFavorite.addEventListener("click", () => {
        this.h1.innerText="Bookmarked Items";
        this.navelements.forEach(element =>{
            element.classList.remove("active");
        })
        this.navItemsFavorite.classList.add("active");
        this.showFav();
    }); 

}   

showFav(){
    this.box.innerHTML = "";
    let i=0;
    for(let data of this.dataSets){
        
    if(localStorage.getItem(data.title)==="true")
    {
        i++;
        this.box.appendChild(this.createBox(data));
    }

}     console.log(i)
        if(i===0){
            this.h1.innerText="You don't have any bookmarked items" 
            console.log(i)
        }
}


searchByCategory(category){
    this.box.innerHTML = "";
    for(let data of this.dataSets){
        
     
        if(data.category.includes(category))
        {
            this.box.appendChild(this.createBox(data));
        }
    }

}

searchByWord(word){
    word = word.toLowerCase();
    this.box.innerHTML = "";
    let i=0;
    for(let data of this.dataSets){
        const dataTitle = data.title.toLowerCase();
     
        if(dataTitle.includes(word))
        {
            i++;
            this.box.appendChild(this.createBox(data));
         
        }

        if(i==0){
            this.h1.innerText="No results found for '"+word+"'"
        }else if(i==1){
            this.h1.innerText="Found "+i+" result for '"+word+"'"
        }else{
            this.h1.innerText="Found "+i+" results for '"+word+"'"
        }
    }
}

renderAllBoxes = async () =>{
    this.box.innerHTML = "";

    this.dataSets = await this.getData();

    for(let data of this.dataSets){
        this.box.appendChild(this.createBox(data));
    }
}

getData = () => fetch('assets/data.json').then(response => response.json());



createBox = (data) => {

    const item = createDomElement('div',"item");
    const itemBookmark = createDomElement('div',"item-bookmark",null,null); //icona bookmark
    //let itemBookmarkIcon = createDomElement('img',"item-bookmark-icon",null,"assets/icon-bookmark-empty.svg")  ;//icona bookmark
    let itemBookmarkIcon = createDomElement('img',"item-bookmark-icon",null,null)  ;//icona bookmark
     if(localStorage.getItem(data.title)==="true"){
        itemBookmarkIcon.src = "assets/icon-bookmark-full.svg"
     }else{
        itemBookmarkIcon.src = "assets/icon-bookmark-empty.svg"
     }
    const itemImg = createDomElement("img","item-img",null,data.thumbnail.regular.small);
    const itemDesc =createDomElement("div","item-desc");
    const itemyear = createDomElement("p",null,data.year,null);
    const itemDescDot = createDomElement("div","item-desc-dot");
    const itemDescDot2 = createDomElement("div","item-desc-dot");
    const itemDescCategory =createDomElement("div","item-desc-category");
    let itemImgCategory;
    if(data.category == "Movie"){
        itemImgCategory = createDomElement("img","img-category",null,"assets/icon-category-movie.svg");
    }else{
        itemImgCategory = createDomElement("img","img-category",null,"assets/icon-category-tv.svg");
    }
    const textCategory =createDomElement("p",null,data.category,null);
    const itemDescCategoryRating = createDomElement("p",null,data.rating);
    const h2 = createDomElement("h2",null,data.title);

    itemBookmark.appendChild(itemBookmarkIcon);//div icona bookmark
    itemDescCategory.appendChild(itemImgCategory); //div z kategoria
    itemDescCategory.appendChild(textCategory); //div z kategoria

    itemDesc.appendChild(itemyear); // div z opisem
    itemDesc.appendChild(itemDescDot);// div z opisem
    itemDesc.appendChild(itemDescCategory);// div z opisem
    itemDesc.appendChild(itemDescDot2);// div z opisem
    itemDesc.appendChild(itemDescCategoryRating);// div z opisem


    item.appendChild(itemBookmark);///icona bookmark
    item.appendChild(itemImg);// image
    item.appendChild(itemDesc);//opis
    item.appendChild(h2); //tytul
    let isFavourite;

    itemBookmark.addEventListener("click", () => {
        if(localStorage.getItem(data.title)==="true"){
            isFavourite = false;
            itemBookmarkIcon.src = "assets/icon-bookmark-empty.svg"
            localStorage.setItem(data.title,isFavourite);
        }else{
            isFavourite = true;
            itemBookmarkIcon.src = "assets/icon-bookmark-full.svg"
            localStorage.setItem(data.title,isFavourite);
        } 
    })
    return item;
}
}

document.addEventListener("DOMContentLoaded", new EnterteimentWebApp());