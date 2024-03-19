import { displayWorks } from "./works.js";
import * as modale from "./modale.js";

async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
};

fetchWorks().then(works => {
    works;

    if (sessionStorage.getItem('token')) {
        const modaleBtn = document.createElement('a');
        const modaleBtn2 = document.createElement('a');
        const galleryTitle = document.querySelector('.portfolio-title');

        modaleBtn.classList.add('modal-link');
        modaleBtn.href = '#editionMode';
        modaleBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';

        modaleBtn2.classList.add('modal-link');
        modaleBtn2.href = '#editionMode';
        modaleBtn2.id = 'modal-link-inline';
        modaleBtn2.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';

        document.body.prepend(modaleBtn);
        galleryTitle.appendChild(modaleBtn2);
        displayWorks(works, false, 'gallery');

        [modaleBtn, modaleBtn2].forEach(displayBtn => {
            displayBtn.addEventListener('click', function(){
                modale.showModal();
                displayWorks(works, true, 'edit-gallery');
        
                const deleteBtns = document.querySelectorAll('.delete-button');
                deleteBtns.forEach(deleteBtn => {
                    deleteBtn.addEventListener('click', function(){
                        const workID = deleteBtn.id;
                        const token = sessionStorage.getItem('token');

                        modale.deleteWork(workID, token).then(response => {
                            response;
                            displayWorks(works, true, 'edit-gallery')
                        });
                    })
                });
            })
        });
    } else {
        window.onload=function() {
            displayWorks(works, false, 'gallery');
        };
    };

    // FILTERS //
    const allBtn = document.querySelector('.all-filter');
    allBtn.addEventListener('click', function() {
        displayWorks(works, false, 'gallery');
    } )

    const categoryBtn = document.querySelectorAll('.category-filter');
    for (let i = 0; i < categoryBtn.length; i++) {
        categoryBtn[i].addEventListener('click', function() {
            const worksToDisplay = works.filter(function (work) {
                return work.category.name === categoryBtn[i].innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            });

            displayWorks(worksToDisplay, false, 'gallery')
        } )
    }
} )
