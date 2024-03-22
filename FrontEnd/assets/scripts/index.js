import * as worksFunction from "./works.js";
import * as modale from "./modale.js";

worksFunction.fetchWorks().then(works => {
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

        document.querySelector('.filters-section').classList.add('hidden');
        worksFunction.displayWorks(works, false, 'gallery');

        [modaleBtn, modaleBtn2].forEach(displayBtn => {
            displayBtn.addEventListener('click', function(){
                modale.deleteModal()
            })
        });
    } else {
        window.onload=function() {
            worksFunction.displayWorks(works, false, 'gallery');
        };
    };

    // FILTERS //
    const allBtn = document.querySelector('.all-filter');
    allBtn.addEventListener('click', function() {
        worksFunction.displayWorks(works, false, 'gallery');
    } )

    const categoryBtn = document.querySelectorAll('.category-filter');
    for (let i = 0; i < categoryBtn.length; i++) {
        categoryBtn[i].addEventListener('click', function() {
            const worksToDisplay = works.filter(function (work) {
                return work.category.name === categoryBtn[i].innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            });

            worksFunction.displayWorks(worksToDisplay, false, 'gallery')
        } )
    }
} )
