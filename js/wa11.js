const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['https://preview.redd.it/wallpapers-selection-640x480-enjoy-v0-98klkb0rob9a1.png?width=640&crop=smart&auto=webp&s=77d9eb11e8a7a5f798fd9e053f49990835b1181f', 'https://img.carswp.com/vaz/mixed/vaz_mixed__images_1_640x480.jpg', 'https://i.redd.it/wallpapers-selection-640x480-enjoy-v0-gr7o5jzqob9a1.png?width=640&format=png&auto=webp&s=091805d7fb33b08c01904963269c8a12f23d0641', 'https://i.redd.it/wallpapers-selection-640x480-enjoy-v0-ndhca71rob9a1.png?width=640&format=png&auto=webp&s=652bd5245765a3f6e6e3c523be4868d627bb4a9e', 'https://preview.redd.it/wallpapers-selection-640x480-enjoy-v0-wvm1hizqob9a1.png?width=640&crop=smart&auto=webp&s=d17cfcd31d515ae7d07c70b051d5dd6654836fa8'];
const alts = ['mario', 'cars', 'games', 'cartoon', 'light'];


/* Looping through images */

for (let i = 0; i < 5; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', images[i]);
  newImage.setAttribute('alt', alts[i]);
  thumbBar.appendChild(newImage);
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
