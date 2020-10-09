import { default as galleryRef } from "./gallery-items.js";
const galleryUlRef = document.querySelector(".js-gallery");
const galleryMarkup = createGalleryMarkup(galleryRef);
const lightboxContainerRef = document.querySelector(".js-lightbox");
const lightboxImg = lightboxContainerRef.querySelector(".lightbox__image");
const closeBtn = document.querySelector(".lightbox__button");
const OverlayRef = document.querySelector(".lightbox__overlay");

galleryUlRef.insertAdjacentHTML("beforeend", galleryMarkup);
galleryUlRef.addEventListener("click", onGalleryUlRefClick);
lightboxContainerRef.addEventListener("click", onLightboxCloseClick);
function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li> `;
    })
    .join("");
}
function onGalleryUlRefClick(e) {
  const galleryEl = e.target;
  e.preventDefault();
  lightboxIsOpen(galleryEl);
}
function lightboxIsOpen(el) {
  lightboxContainerRef.classList.add("is-open");
  lightboxImg.src = el.dataset.source;
  lightboxImg.alt = el.alt;
  document.addEventListener("keydown", onLightboxCloseClick);
}
function onLightboxCloseClick(e) {
  if (
    e.target.nodeName === "BUTTON" ||
    e.target === OverlayRef ||
    e.keyCode === 27
  ) {
    lightboxContainerRef.classList.remove("is-open");
    lightboxImg.removeAttribute("src");
    lightboxImg.removeAttribute("alt");
    document.removeEventListener("keydown", onLightboxCloseClick);
  }
}
