export function displayWorks(toDisplay, editMode, gallery) {
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
            trash.id = work.id;
            trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            figureElement.appendChild(trash)
        }
    }
}