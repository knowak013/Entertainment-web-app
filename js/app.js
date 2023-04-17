import {createDomElement} from "./domInteractions.js"


class EnterteimentWebApp{

constructor(){
    this.initializeApp();
}

initializeApp = () => {
    this.connectDomElements();
    this.setupListenners();
    this.renderBox();

   // this.getData().then((dataSet) => {console.log(dataSet[1].category)});
}

connectDomElements = () =>{
    this.form = document.querySelector("form");
    this.input = document.getElementById("searchInput");
    this.recomendedBox = document.getElementById("recomendedBox");

}

setupListenners = () =>{
   this.form.addEventListener("submit", e => {
        e.preventDefault();

        console.log(this.input.value);
    })
}



getData = () => fetch('assets/data.json').then(response => response.json());



renderBox = async () =>{
    this.recomendedBox.innerHTML = "";

    const dataSets = await this.getData();

    for(let data of dataSets){
     console.log(data);

 

        const  recomendedBoxItem = createDomElement('div',"recomended--box--item");

        const recomendedBoxItemBookmark = createDomElement('div',"recomended--box--item-bookmark",null,null); //icona bookmark
        const recomendedBoxItemBookmarkIcon = createDomElement('img',"recomended--box--item-bookmark-icon",null,"assets/icon-bookmark-empty.svg")//icona bookmark
        const recomendedBoxItemImg = createDomElement("img","recomended--box--item-img",null,data.thumbnail.regular.small)
        const recomendedBoxItemDesc =createDomElement("div","recomended--box--item-desc")
        const year = createDomElement("p",null,data.year,null)
        const recomendedBoxItemDescDot = createDomElement("div","recomended--box--item-desc-dot")
        const recomendedBoxItemDescDot2 = createDomElement("div","recomended--box--item-desc-dot")
        const recomendedBoxItemDescCategory =createDomElement("div","recomended--box--item-desc-category")
        let imgCategory;
        if(data.category == "Movie"){
            imgCategory = createDomElement("img","img-category",null,"assets/icon-category-movie.svg")
        }else{
            imgCategory = createDomElement("img","img-category",null,"assets/icon-category-tv.svg")
        }
        const textCategory =createDomElement("p",null,data.category,null)
        const recomendedBoxItemDescCategoryRating = createDomElement("p",null,data.rating)
        const h2 = createDomElement("h2",null,data.title)

       




        recomendedBoxItemBookmark.appendChild(recomendedBoxItemBookmarkIcon);//div icona bookmark
        recomendedBoxItemDescCategory.appendChild(imgCategory) //div z kategoria
        recomendedBoxItemDescCategory.appendChild(textCategory) //div z kategoria

        recomendedBoxItemDesc.appendChild(year); // div z opisem
        recomendedBoxItemDesc.appendChild(recomendedBoxItemDescDot);// div z opisem
        recomendedBoxItemDesc.appendChild(recomendedBoxItemDescCategory);// div z opisem
        recomendedBoxItemDesc.appendChild(recomendedBoxItemDescDot2);// div z opisem
        recomendedBoxItemDesc.appendChild(recomendedBoxItemDescCategoryRating);// div z opisem


        recomendedBoxItem.appendChild( recomendedBoxItemBookmark)///icona bookmark
        recomendedBoxItem.appendChild(recomendedBoxItemImg)// image
        recomendedBoxItem.appendChild(recomendedBoxItemDesc)//opis
        recomendedBoxItem.appendChild(h2) //tytul



        
       /* const h2 = createDomElement('h2',null,data.title,null)

        recomendedBoxItem.appendChild(h2);*/

        this.recomendedBox.appendChild(recomendedBoxItem);
    }
}


}



document.addEventListener("DOMContentLoaded", new EnterteimentWebApp());