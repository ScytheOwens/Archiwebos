export function editionMode() {
    const body = document.body;

    const modale = document.createElement('aside');
    modale.classList.add('modal-box', 'hidden');
    modale.id = 'editionMode';
    modale.ariaHidden = 'true';
    modale.role = 'dialogue'
    modale.innerHTML = '<section class="modal-box-dialog"><h2 class="modal-box-dialog-title">Galerie photo</h2><div class="gallery modal-box-dialog-content" id="edit-gallery"></div><button class="modal-box-dialog-close"><i class="fa-solid fa-xmark"></i></button><button class="btn modal-box-dialog-button">Ajouter une photo</button></section>'
    
    body.prepend(modale)
    
    const modaleBtn = document.createElement('a');

    modaleBtn.classList.add('modal-link');
    modaleBtn.href = '#editionMode';
    modaleBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';

    body.prepend(modaleBtn);

    // Display modale //
    modaleBtn.addEventListener('click', function() {
        modale.classList.remove('hidden');
        hideModal();
    });

    // Hide modale //
    async function hideModal(){
        const go = await modale.classList.contains('.hidden');

        const closeBtn = document.querySelector('.modal-box-dialog-close');
        const modaleBoxDialog = document.querySelector('.modal-box-dialog');
        body.addEventListener('click', function(event) {
            if (event.target != modaleBoxDialog || event.target == closeBtn) {
                console.log(event.target);
            }
        });
    }

    const modaleContent = 'edit-gallery';
    return modaleContent;
}