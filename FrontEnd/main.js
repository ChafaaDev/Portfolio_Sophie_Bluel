


async function getWorks(works, categories){

            window.onload = function(){
        
                setTimeout(()=>{
            
                    const loggedIn = localStorage.getItem("loggedIn")==="true"
                
                    const urlParams = new URLSearchParams(window.location.search);
                
                    const editMode = urlParams.get("editMode")==="true";
                
                    if(editMode && loggedIn){
                
                        setEditMode()
                    }
            
                }, 100)
            
            }    
    try{

        const response = await fetch(" http://localhost:5678/api/works");
        
        if(!response.ok){

            throw new Error("Echec de connexion works")
        }

            const works = await response.json();
        
            const categories = await fetch ("http://localhost:5678/api/categories");
        
        if (!categories.ok){

            throw new Error ("Echec de connexion à catégories")

        }    




        
        const worksCategory = await categories.json();

        const modalOverlay = document.createElement("div");

        modalOverlay.classList.add("modal-overlay");

        const sectionWorks = document.getElementById("portfolio");
        
        const sectionTitle = document.createElement("h2");
        
        sectionTitle.textContent = "Mes Projets";
        
        sectionWorks.appendChild(sectionTitle);

        sectionWorks.appendChild(modalOverlay)
    
        const buttonEdit = document.createElement("button");
        
        buttonEdit.innerHTML = '<i class="fa-regular fa-pen-to-square" style="margin-right:10px"></i>   modifier';

        buttonEdit.classList.add("editBtn");

        buttonEdit.style.display = "none";
        
        sectionTitle.appendChild(buttonEdit)
        
        buttonEdit.addEventListener("click", ()=>{generateModal(works)})

            
        
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
    
            // const allFigures = document.getElementsByClassName("image");

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
            
                figureElement.append(imgElement, imgCaption);
            
        
            }
        
        } 
        
            generateWorks(works)



        function generateModal(){

            const divModal = document.createElement("div");
            
            divModal.classList.add("modalAdmin");
            
            const modalTitle = document.createElement("h2");
        
            modalTitle.textContent = "Galerie photo";
            
            const galleryModal = galleryDiv.cloneNode(true)
            
            galleryModal.classList.add("miniGallery");
            
            const closeBtn = document.createElement("button");
            
            closeBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
            
            closeBtn.classList.add("closeModalBtn")
            
            closeBtn.addEventListener("click", ()=>{divModal.style.display="none"; modalOverlay.style.display = "none"})
            
            galleryModal.querySelectorAll('figcaption').forEach(caption=>{caption.classList.add('hidden-caption')})

            galleryModal.querySelectorAll("figure").forEach(figure=>{
                
                const deleteBtn = document.createElement("button");

                deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'  ;

                deleteBtn.classList.add("delete-button") ;

                figure.appendChild(deleteBtn)

            })

            
            const addPhotoBtn = document.createElement("button");

            addPhotoBtn.textContent = "Ajouter une photo";

            addPhotoBtn.setAttribute("id", "addPhoto")
            
            divModal.append(closeBtn, modalTitle, galleryModal, addPhotoBtn);
            
            document.body.appendChild(divModal);
            
            modalOverlay.style.display = "block";


            addPhotoBtn.addEventListener('click', ()=>{

                const returnButton = document.createElement("button")
                returnButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
                returnButton.setAttribute("id", "returnbtn");
                returnButton.addEventListener("click", ()=>{divModal.innerHTML="";generateModal()})
                const addPicForm = document.createElement("form");
                addPicForm.classList.add('addImageForm');
                addPicForm.style.display = "flex"
                const imageInput = document.createElement("div");
                imageInput.setAttribute("id", "image-upload-box");
                imageInput.innerHTML = '<i class="fa-regular fa-image" id="picIcon"></i>'
                const AjouterPhoto = document.createElement("button")
                AjouterPhoto.textContent = "+ Ajouter photo";
                AjouterPhoto.setAttribute("id","ajouterPetit")
                const imageUploadParagrah = document.createElement("p")
                imageUploadParagrah.textContent = "jpg, png : 4mo max";
                imageInput.append(AjouterPhoto, imageUploadParagrah);
                const labelTitle = document.createElement("label");
                labelTitle.textContent = "Titre";
                const titleInput = document.createElement("input");
                titleInput.setAttribute("type", "text");
            
                const labelCategory = document.createElement('label')
                labelCategory.textContent = "Catégorie";
                labelCategory.setAttribute("for", "category")
                const selectCategory = document.createElement('select');
                selectCategory.setAttribute("id", "category");

                    for(let i =0 ; i<worksCategory.length ; i++){
                        
                        const option = document.createElement("option");
                        
                        option.textContent = worksCategory[i].name;
                        
                        selectCategory.appendChild(option)
                    };

                const validateButton = document.createElement("input");
                validateButton.setAttribute("type", "submit");
                validateButton.setAttribute("value","Valider");
                validateButton.setAttribute("id", "validerBtn")
                addPicForm.append(imageInput, labelTitle, titleInput, labelCategory, selectCategory, validateButton);
                divModal.append(returnButton, addPicForm )
                addPicForm.style.display = "flex";
                galleryModal.style.display = "none";
                modalTitle.textContent = "Ajout photo";
                addPhotoBtn.style.display = "none"
            })

                modalOverlay.addEventListener('click', (e)=>{divModal.style.display = "none"; modalOverlay.style.display = "none"})
        
        }
    
        function setEditMode(){ 
    
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
            btnsTri.style.display = "none";
            buttonEdit.style.display = "block";
            document.getElementById("banner").style.display = "block";
        }

    } catch(error){
        
    console.log("Echec de connexion à l'API ", error )
    
    }
}


getWorks()  ;
        

