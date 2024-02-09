import { editionMode } from "./modale.js";

async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
};

fetchWorks().then(works => {
    works;

    function displayWorks(toDisplay, editMode, gallery) {
        const galleryElement = document.getElementById(gallery);
        galleryElement.innerHTML = "";

        for (let i = 0; i < toDisplay.length; i++) {
            const work = toDisplay[i];
            const figureElement = document.createElement('figure');
            const imageElement = document.createElement('img');

            imageElement.src = work.imageUrl;

            galleryElement.appendChild(figureElement);
            figureElement.appendChild(imageElement);

            if (editMode == false) {
                const captionElement = document.createElement('figcaption');
                imageElement.alt = work.title;
                captionElement.innerText = work.title;
                figureElement.appendChild(captionElement)
            }

            if (editMode == true) {
                const trash = document.createElement('button');

                trash.classList.add('delete-button');
                trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

                figureElement.appendChild(trash)
            }
        }
    }

    window.onload=function() {
        displayWorks(works, false, 'gallery');
        
        if (sessionStorage.getItem('token')) {
            displayWorks(works, true, editionMode())
        }
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