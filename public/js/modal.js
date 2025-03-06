// Bio modal
const showBioModal = document.getElementById("editBio");
const bioModal = document.getElementById("bioDialog");
const bioCancelBtn = document.getElementById("cancel");

showBioModal.addEventListener("click", () => {
    bioModal.showModal();
});

bioCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    bioModal.close();
})

// Photo modal
const showPhotoModal = document.getElementById("editPhoto");
const photoModal = document.getElementById("photoDialog");
const photoCancelBtn = document.getElementById("cancelPhoto");

showPhotoModal.addEventListener("click", () => {
    photoModal.showModal();
});

photoCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    photoModal.close();
})