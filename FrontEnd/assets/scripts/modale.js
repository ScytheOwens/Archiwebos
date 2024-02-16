const body = document.body;
export const modale = document.createElement('aside');
modale.classList.add('modal-box');
modale.id = 'editionMode';
modale.ariaHidden = 'true';
modale.role = 'dialogue'
modale.innerHTML = '<section class="modal-box-dialog"><h2 class="modal-box-dialog-title">Galerie photo</h2><div class="gallery modal-box-dialog-content" id="edit-gallery"></div><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button><button id="add-work-button" class="btn modal-box-dialog-button active">Ajouter une photo</button></section>'

// Display modale //
export function showModal() {
    body.prepend(modale);

    const closeBtns = [modale, document.querySelector('.fa-xmark')];
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(event){
            if (event.target == closeBtn){
                hideModal(modale)
            }
        })
    });

    const modaleBtn = document.getElementById('add-work-button');
    const boxDialog = document.querySelector('.modal-box-dialog');
    modaleBtn.addEventListener('click', function(){
        boxDialog.innerHTML = '';
        boxDialog.innerHTML = '<h2 class="modal-box-dialog-title">Galerie photo</h2><form method="post" class="form add-work-form"><div class="modal-box-dialog-content modal-box-dialog-form"><input type="file" id="work-image" name="work-image" accept="image/png, image/jpeg, image/jpg"/><label for="work-title" class="form-label">Titre</label><input type="text" id="work-title" name="title" class="form-input"/><label for="work-category" class="form-label">Catégorie</label><select name="work-category" id="work-category" class="form-input"></select></div><input type="submit" name="submit" value="Valider" id="work-submit" class="btn modal-box-dialog-button active"/></form><button class="modal-box-dialog-previous"><i class="fa-solid fa-arrow-left"></i></button><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button>'

        const workCategory = document.getElementById('work-category');

        fetchCategories().then(categories => {
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

        const form = document.querySelector('.add-work-form');
        form.addEventListener('submit', function(event){
            event.preventDefault();

            const image = document.getElementById('work-image').value;
            const title = document.getElementById('work-title').value;
            const category = document.getElementById('work-category').value;

            addWork(image, title, category);
        })
    });
}

async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    return categories;
}

// Hide modale //
export function hideModal(element){
    body.removeChild(element)
}

// Suppress work //
export async function deleteWork(workId, token){
    const response = await fetch('http://localhost:5678/api/works'.concat('/', workId),{
        method: "DELETE",
        headers: {'Authorization': 'bearer'.concat(' ', token)}
    });

    if (response['status'] == 204) {
        return response
    };
}

// Add work //
async function addWork(image, title, category){
    const work = JSON.stringify({
        "image": image,
        "title": title,
        "category": category
    });

    const response = await fetch('http://localhost:5678/api/works',{
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer'.concat(' ', sessionStorage.getItem('token')) },
        body: work
    });
}