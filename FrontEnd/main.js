
    const response = await fetch(" http://localhost:5678/api/works")
    const works = await response.json();

    async function generateWorks(works) {
    const sectionWorks = document.getElementById("portfolio");
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "Mes Projets";
    const galleryDiv = document.createElement("div");
    galleryDiv.classList.add("gallery");
    
    sectionWorks.appendChild(sectionTitle);
    sectionWorks.appendChild(galleryDiv);
    
    for(let i = 0 ; i < works.length ; i++){
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.src = works[i].imageUrl;
    const imgCaption = document.createElement("figcaption");
    imgCaption.textContent = works[i].title;
    
    galleryDiv.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(imgCaption);
    }






     
   
    } 
     
generateWorks(works)


