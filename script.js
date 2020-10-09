const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'agnLlW9WJRJ20b58u_FpX8UrEn_ZV8QXWyeIz2bfzzA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function createElement(element, attributes) {
    const el = document.createElement(element);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {

        const item = createElement('a', {
            href: photo.links.html,
            target: '_blank'
        });

        const img = createElement('img', {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from UnSplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (err) {
        throw Error(err)
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
        && ready
        ) {
        ready = false;
        getPhotos()
    }
})

// on load
getPhotos()