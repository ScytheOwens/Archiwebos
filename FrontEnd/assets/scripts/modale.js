const body = document.body;    

// Display modale //
export function showModal() {
    const modale = document.createElement('aside');
    modale.classList.add('modal-box');
    modale.id = 'editionMode';
    modale.ariaHidden = 'true';
    modale.role = 'dialogue'
    modale.innerHTML = '<section class="modal-box-dialog"><h2 class="modal-box-dialog-title">Galerie photo</h2><div class="gallery modal-box-dialog-content" id="edit-gallery"></div><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button><button class="btn modal-box-dialog-button">Ajouter une photo</button></section>'

    body.prepend(modale);

    const closeBtns = [modale, document.querySelector('.fa-xmark')];
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(event){
            if (event.target == closeBtn){
                hideModal(modale)
            }
        })
    });
}

// Hide modale //
function hideModal(element){
    body.removeChild(element)
}

// Suppress work //
export async function deleteWork(workId, token){
    const response = await fetch('http://localhost:5678/api/works'.concat('/', workId),{
        method: "DELETE",
        headers: {'Authorization': 'bearer'.concat(' ', token)}
    });

    console.log(response)
}