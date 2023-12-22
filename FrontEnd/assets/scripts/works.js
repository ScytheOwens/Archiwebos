async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
};

fetchWorks().then(works => {
    works;

    window.onload=function() {
        const galleryElement = document.querySelector('.gallery');
        galleryElement.innerHTML = '';
    
        for (let i = 0; i < works.length; i++) {
            const work = works[i];
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
} )
