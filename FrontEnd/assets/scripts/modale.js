import * as worksFunction from "./works.js";

export function deleteModal() {
    const modale = document.createElement('aside');
    modale.classList.add('modal-box');
    modale.id = 'editionMode';
    modale.ariaHidden = 'true';
    modale.role = 'dialogue'
    modale.innerHTML = '<section class="modal-box-dialog"><h2 class="modal-box-dialog-title">Galerie photo</h2><div class="gallery modal-box-dialog-content" id="edit-gallery"></div><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button><button id="add-work-button" class="btn modal-box-dialog-button active">Ajouter une photo</button></section>'
    
    document.body.prepend(modale);
    worksFunction.fetchWorks().then(works => {
        worksFunction.displayWorks(works, true, 'edit-gallery');

        const deleteBtns = document.querySelectorAll('.delete-button');
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function(){
                const workID = deleteBtn.id;
                const token = sessionStorage.getItem('token');
    
                deleteWork(workID, token);
    
                worksFunction.fetchWorks().then(works => {
                    works;
        
                    worksFunction.displayWorks(works, true, 'edit-gallery');
                    worksFunction.displayWorks(works, false, 'gallery')
                })
            })
        });
    });

    const closeBtns = [modale, document.querySelector('.fa-xmark')];
    hideModal(closeBtns);

    const modaleBtn = document.getElementById('add-work-button');
        modaleBtn.addEventListener('click', function(){
        addModal();
    })
}

export function addModal() {
    const boxDialog = document.querySelector('.modal-box-dialog');
    boxDialog.innerHTML = '';
    boxDialog.innerHTML = '<h2 class="modal-box-dialog-title">Ajout photo</h2><form enctype="multipart/form-data" method="post" class="form add-work-form"><div class="modal-box-dialog-content modal-box-dialog-form"><div class="modal-box-dialog-form-image"><img class="preview"><i class="fa-regular fa-image"></i><label for="work-image" class="form-label-button">+ Ajouter photo</label><input type="file" id="work-image" name="image" accept="image/png, image/jpeg, image/jpg"/><p>jpg, png : 4Mo max</p></div><label for="work-title" class="form-label">Titre</label><input type="text" id="work-title" name="title" class="form-input"/><label for="work-category" class="form-label">Catégorie</label><select name="category" id="work-category" class="form-input"></select></div><input type="submit" name="submit" value="Valider" id="work-submit" class="btn modal-box-dialog-button active" disabled/></form><button class="modal-box-dialog-previous"><i class="fa-solid fa-arrow-left"></i></button><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button>'

    const previous = document.querySelector('.fa-arrow-left');
    const closeBtns = [document.querySelector('.modal-box'), document.querySelector('.fa-xmark'), previous];
    hideModal(closeBtns);

    previous.addEventListener('click', function(){
        deleteModal()
    });

    const workCategory = document.getElementById('work-category');
    worksFunction.fetchCategories().then(categories => {
        categories;
    
        const option = document.createElement('option');
        option.value = '';
        option.innerText = '';
    
        workCategory.appendChild(option);
    
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category['id'];
            option.innerText = category['name'];
    
            workCategory.appendChild(option)
        })
    });
    
    const inputImage = document.getElementById('work-image');
    inputImage.addEventListener('change', function(event){
        const file = event.target.files[0];
        const preview = document.querySelector('.preview');
        preview.file = file;
        const reader = new FileReader();
    
        reader.onload = ( function(imgElement) {
            return function(event) {
                imgElement.src = event.target.result;
            };
        })(preview);
    
        reader.readAsDataURL(file);
    });

    const imageInput = document.getElementById('work-image');
    const titleInput = document.getElementById('work-title');
    const categoryInput = document.getElementById('work-category');

    [imageInput, titleInput, categoryInput].forEach(input => {
        input.addEventListener('change', function(){
            if (imageInput.files.length == 1 && titleInput.value != '' && categoryInput.value != ''){
                document.getElementById('work-submit').disabled = false
            } else {
                document.getElementById('work-submit').disabled = true
            }
        })
    })
    
    const addWorkForm = document.querySelector('.add-work-form');
    addWorkForm.addEventListener('submit', function(event){
        event.preventDefault();
    
        addWork(addWorkForm);
    });
}

// Hide modale //
function hideModal(closeBtns){
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(event){
            if (event.target == closeBtn){
                document.body.removeChild(document.getElementById('editionMode'));
            }
        })
    });
}

// Suppress work //
async function deleteWork(workId, token){
    const response = await fetch('http://localhost:5678/api/works'.concat('/', workId),{
        method: "DELETE",
        headers: {'Authorization': 'bearer'.concat(' ', token)}
    });
}

// Add work //
async function addWork(form){
    try {
        const response = await fetch('http://localhost:5678/api/works',{
            method: "POST",
            headers: {'Authorization': 'bearer'.concat(' ', sessionStorage.getItem('token'))},
            body: new FormData(form)
        });
    } catch(error) {
        console.error('erreur : ', error);
    };

    document.body.removeChild(document.querySelector('aside'));
    worksFunction.fetchWorks().then(works => {
        works;

        worksFunction.displayWorks(works, false, 'gallery')
    })
}
