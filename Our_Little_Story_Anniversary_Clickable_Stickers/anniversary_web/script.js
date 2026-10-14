const screens = [...document.querySelectorAll('.screen')];
const openEnvelope = document.getElementById('openEnvelope');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const tiles = [...document.querySelectorAll('.memory-tile')];
let currentPhoto = 0;

function showScreen(id) {
  screens.forEach(s => s.classList.add('hidden'));
  const next = document.getElementById(id);
  next.classList.remove('hidden');
  next.classList.remove('enter');
  void next.offsetWidth;
  next.classList.add('enter');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
openEnvelope.addEventListener('click', () => showScreen('letter'));
const playSong = document.getElementById('playSong');
const songPlayer = document.getElementById('songPlayer');
const songFrame = document.getElementById('songFrame');
playSong.addEventListener('click', () => {
  if (songPlayer.classList.contains('hidden')) {
    songPlayer.classList.remove('hidden');
    songFrame.src = songFrame.dataset.src;
    playSong.textContent = 'Pemutar terbuka ♫';
    playSong.setAttribute('aria-expanded', 'true');
  } else {
    songPlayer.classList.add('hidden');
    songFrame.src = 'about:blank';
    playSong.textContent = 'Putar lagu ♫';
    playSong.setAttribute('aria-expanded', 'false');
  }
});

document.getElementById('toMemories').addEventListener('click', () => showScreen('memories'));
const openGallery = document.getElementById('openGallery');
const galleryContent = document.getElementById('galleryContent');
const toFinal = document.getElementById('toFinal');
openGallery.addEventListener('click', () => {
  galleryContent.classList.remove('hidden');
  toFinal.classList.remove('hidden');
  openGallery.querySelector('.banner-click-hint').textContent = 'memories kita ♡';
  setTimeout(() => galleryContent.scrollIntoView({behavior: 'smooth', block: 'start'}), 120);
});

document.getElementById('toFinal').addEventListener('click', () => showScreen('final'));
document.getElementById('restart').addEventListener('click', () => showScreen('cover'));

const stickerImages = [...document.querySelectorAll('.sticker-row img')];
const photoItems = [
  ...tiles.map(tile => ({
    src: tile.dataset.photo,
    caption: tile.dataset.caption
  })),
  ...stickerImages.map((img, index) => ({
    src: img.getAttribute('src'),
    caption: [
      'A little something special, just for you. ♡',
      'My boy, my euphoria, my babe. 💙',
      'Love you, always and forever. ♡'
    ][index] || img.alt || 'Our little memory ♡'
  }))
];

function openPhoto(index) {
  currentPhoto = (index + photoItems.length) % photoItems.length;
  const item = photoItems[currentPhoto];
  lightboxImage.src = item.src;
  lightboxCaption.textContent = item.caption;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closePhoto() {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}
tiles.forEach((tile, index) => tile.addEventListener('click', () => openPhoto(index)));
stickerImages.forEach((img, index) => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `Buka gambar dekorasi ${index + 1}`);
  img.addEventListener('click', () => openPhoto(tiles.length + index));
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPhoto(tiles.length + index);
    }
  });
});
document.getElementById('closeLightbox').addEventListener('click', closePhoto);
document.getElementById('prevPhoto').addEventListener('click', () => openPhoto(currentPhoto - 1));
document.getElementById('nextPhoto').addEventListener('click', () => openPhoto(currentPhoto + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closePhoto(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePhoto();
  if (!lightbox.classList.contains('hidden') && e.key === 'ArrowRight') openPhoto(currentPhoto + 1);
  if (!lightbox.classList.contains('hidden') && e.key === 'ArrowLeft') openPhoto(currentPhoto - 1);
});

const hearts = document.querySelector('.floating-hearts');
function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart-particle';
  heart.textContent = Math.random() > .35 ? '♡' : '✦';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${5 + Math.random() * 4}s`;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 9500);
}
setInterval(createHeart, 950);
