
window.onload = function(){
   
    setTimeout(()=>{

    const loggedIn = localStorage.getItem("loggedIn")==="true"
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const editMode = urlParams.get("editMode")==="true";
    
    if(editMode && loggedIn){
        // const theGallery = document.querySelector(".gallery").setAttribute("contenteditable", "true");
        // const button = document.createElement("button");
        // button.textContent = "Modifier";
        // theGallery.appendChild(button)
        // document.getElementById("logout").style.display = "block"
        // document.querySelectorAll(".EditElement").style.display = "block"
        
        setEditMode()
    }
}, 200)
} 

    
    const response = await fetch(" http://localhost:5678/api/works")
   
    const works = await response.json();
    
    const categories = await fetch ("http://localhost:5678/api/categories")
    
    const worksCategory = await categories.json();
    
    
    const sectionWorks = document.getElementById("portfolio");
    
    const sectionTitle = document.createElement("h2");
    
    sectionTitle.textContent = "Mes Projets";
     
    sectionWorks.appendChild(sectionTitle);
   
    const buttonEdit = document.createElement("button");
    
    buttonEdit.textContent = "Modifier";

    buttonEdit.classList.add("editBtn");

    buttonEdit.style.display = "none"

    sectionTitle.appendChild(buttonEdit)
    
    const btnsTri = document.createElement("div");
               
        btnsTri.classList.add("btns-tri");
    
        const tousButton = document.createElement("button");
    
        tousButton.classList.add("btnTrier");
  
        tousButton.setAttribute("data-category", "tous")

        tousButton.textContent = "Tous";
    
        btnsTri.appendChild(tousButton)

    for( let i = 0 ; i < worksCategory.length ; i++){

       const button = document.createElement("button");
        
        button.textContent = worksCategory[i].name;
        
        button.classList.add("btnTrier");
        
        button.setAttribute("data-category", works[i].categoryId);
        
        sectionWorks.appendChild(btnsTri);  
        
        btnsTri.appendChild(button);
        
    }  
    
    const galleryDiv = document.createElement("div");
    
    galleryDiv.classList.add("gallery");

    galleryDiv.setAttribute("contenteditable", "false")
    
    sectionWorks.appendChild(galleryDiv);
   
const allFigures = document.getElementsByClassName("image");

const allFilterBtns = document.getElementsByClassName("btnTrier");

const allFilterBtns2 = Array.from(allFilterBtns)

const allFigures2 = Array.from(works)

const figuresObjets = allFigures2.filter(figure=>figure.category.name === "Objets")

const figuresAppartements = allFigures2.filter(figure=>figure.category.name=== "Appartements")

const figureHotelRestaurants = allFigures2.filter(figure=>figure.category.name === "Hotels & restaurants")
    
   
allFilterBtns2.forEach(button => {

    button.addEventListener("click", ()=> {

        if(button === allFilterBtns2[0] ){
    
            galleryDiv.innerHTML = ""
    
            generateWorks(works)

        }else if(button===allFilterBtns2[1]){
    
            galleryDiv.innerHTML = "";
    
            generateWorks(figuresObjets)

        }else if (button === allFilterBtns2[2]){
    
            galleryDiv.innerHTML = "";
    
            generateWorks(figuresAppartements)

        }else{
    
            galleryDiv.innerHTML = "";
    
            generateWorks(figureHotelRestaurants)
}
})

});
          
        

async function generateWorks(works) {
        
   

    for(let i = 0 ; i < works.length ; i++){
        
    const figureElement = document.createElement("figure");
    figureElement.classList.add("image")
    const imgElement = document.createElement("img");
    
    imgElement.src = works[i].imageUrl;
    
    const imgCaption = document.createElement("figcaption");
   
    imgCaption.textContent = works[i].title;
    
    figureElement.setAttribute("data-category", works[i].categoryId)
    
    galleryDiv.appendChild(figureElement);
    
    figureElement.appendChild(imgElement);
    
    figureElement.appendChild(imgCaption);
    

    }
   
 } 
     
generateWorks(works);

 function setEditMode(){ 
   
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    btnsTri.style.display = "none";
    buttonEdit.style.display = "block"
    document.getElementById("banner").style.display = "block"
}
function hideEditElements(){
    document.querySelector(".banner").style.display = "none";
    document.getElementById("login").style.display = "block"
    document.getElementById("logout").style.display = "none";
    document.querySelector('.btns-Tri').style.display = "block"; 
}

function enableEditMode(){
const isEditmode = localStorage.setItem("isEdit", "true");
const EditElements = document.getElementsByClassName("editElement");
EditElements.contentEditable = true;
EditElements.style.display = "block";
document.getElementById("login").style.display = "none"
}

function disableEditMode(){
    const isEditmode = localStorage.setItem("isEdit", "false");
    const EditElements = document.getElementsByClassName("editElement");
    EditElements.style.display = "none"
}
