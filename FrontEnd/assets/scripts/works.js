async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
};

fetchWorks().then(works => {
    works;

    function displayWorks(toDisplay) {
        const galleryElement = document.querySelector('.gallery');
        galleryElement.innerHTML = "";
        
        for (let i = 0; i < toDisplay.length; i++) {
            const work = toDisplay[i];
            const figureElement = document.createElement('figure');
            const imageElement = document.createElement('img');
            const captionElement = document.createElement('figcaption');
            
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;
            captionElement.innerText = work.title;
            
            galleryElement.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(captionElement)
        }
    }
    
    window.onload=function() {
        displayWorks(works);
    };
    
    const allBtn = document.querySelector('.all-filter');
    allBtn.addEventListener('click', function() {
        displayWorks(works);
    } )

    const categoryBtn = document.querySelectorAll('.category-filter');
    
    for (let i = 0; i < categoryBtn.length; i++) {
        categoryBtn[i].addEventListener('click', function() {
            const worksToDisplay = works.filter(function (work) {
                return work.category.name === categoryBtn[i].innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            });

            displayWorks(worksToDisplay)
        } )
    }
} )