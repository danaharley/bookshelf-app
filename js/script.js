const modal = document.querySelector("#modal");
const openModal = document.querySelector("#floating");
const closeModal = document.querySelector("#close-button");

// const books = [
//   {
//     id: 1,
//     title: "Control Your Mind and Master Your Feelings",
//     author: "Eric Robertson",
//     year: 1996,
//     cover_url: "https://covers.openlibrary.org/b/id/12009823-M.jpg",
//     isCompleted: false,
//   },
//   {
//     id: 2,
//     title: "A Court of Mist and Fury",
//     author: "Sarah J. Maas",
//     year: 2003,
//     cover_url: "https://covers.openlibrary.org/b/id/14315081-M.jpg",
//     isCompleted: false,
//   },
//   {
//     id: 3,
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     year: 1990,
//     cover_url: "https://covers.openlibrary.org/b/id/10389354-M.jpg",
//     isCompleted: false,
//   },
//   {
//     id: 4,
//     title: "Shakespeare without tears",
//     author: "Margaret Webster",
//     year: 1987,
//     cover_url: "https://covers.openlibrary.org/b/id/312925-M.jpg",
//     isCompleted: false,
//   },
// ];
// const RENDER_EVENT = "render-book";
// const SAVED_EVENT = "saved-book";
// const STORAGE_KEY = "BOOKSHELF";

// const generatedBookObject = (
//   id,
//   title,
//   author,
//   year,
//   cover_url,
//   isCompleted
// ) => {
//   return {
//     id,
//     title,
//     author,
//     year,
//     cover_url,
//     isCompleted,
//   };
// };

// const isWebStorageExist = () => {
//   if (typeof Storage === undefined) {
//     return alert("The browser you are using does not support Web Storage.");
//   }

//   return true;
// };

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.setAttribute("closing", "");

  modal.addEventListener(
    "animationend",
    () => {
      modal.removeAttribute("closing");
      modal.close();
    },
    { once: true }
  );
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.style.boxShadow = `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px`;
  } else {
    header.style.boxShadow = "none";
  }
});
