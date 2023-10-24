const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF";

const modal = document.querySelector("#modal");
const openModal = document.querySelector("#floating");
const closeModal = document.querySelector("#close-button");

const books = [
  {
    id: 1,
    title: "Control Your Mind and Master Your Feelings",
    author: "Eric Robertson",
    year: 1996,
    cover_url: "https://covers.openlibrary.org/b/id/12009823-M.jpg",
    isCompleted: false,
  },
  {
    id: 2,
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    year: 2003,
    cover_url: "https://covers.openlibrary.org/b/id/14315081-M.jpg",
    isCompleted: false,
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 1990,
    cover_url: "https://covers.openlibrary.org/b/id/10389354-M.jpg",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Shakespeare without tears",
    author: "Margaret Webster",
    year: 1987,
    cover_url: "https://covers.openlibrary.org/b/id/312925-M.jpg",
    isCompleted: false,
  },
];

const isWebStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("The browser you are using does not support Web Storage.");
    return false;
  }

  return true;
};

const generatedBookObject = (
  id,
  title,
  author,
  year,
  cover_url,
  isCompleted
) => {
  return {
    id,
    title,
    author,
    year,
    cover_url,
    isCompleted,
  };
};

const findBook = (bookId) => {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
};

const findBookIndex = (bookId) => {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
    console.log({ books });
  }
  return -1;
};

const saveData = () => {
  if (isWebStorageExist()) {
    const parseData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parseData);

    document.dispatchEvent(new Event(SAVED_EVENT));
  }
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};

const createBook = (bookObject) => {
  const { id, title, author, year, cover_url, isCompleted } = bookObject;

  const content = document.createElement("div");
  content.setAttribute("id", `book-${id}`);

  const div_book_item = document.createElement("div");
  div_book_item.classList.add("book__item");

  const image = document.createElement("img");
  image.setAttribute("src", cover_url);
  image.setAttribute("alt", title);
  image.setAttribute("loading", "lazy");
  image.setAttribute("sizes", "100vw");

  div_book_item.append(image);

  const div_detail_book = document.createElement("div");
  div_detail_book.classList.add("detail__book");

  const div_child_detail_book = document.createElement("div");
  const heading2 = document.createElement("h2");
  heading2.innerText = title;
  const paragraf = document.createElement("p");
  paragraf.innerHTML = `${author} (${year})`;

  div_child_detail_book.append(heading2, paragraf);

  const div_icon_container = document.createElement("div");
  div_icon_container.classList.add("icon__container", "flex-jc");

  div_detail_book.append(div_child_detail_book, div_icon_container);

  content.append(div_book_item, div_detail_book);

  if (isCompleted) {
    const icon_undo = document.createElement("i");
    icon_undo.classList.add("ri-arrow-go-back-fill", "icon");
    icon_undo.addEventListener("click", () => {
      undoBookFromCompleted(id);
    });

    const icon_trash = document.createElement("i");
    icon_trash.classList.add("ri-delete-bin-line", "icon");
    icon_trash.addEventListener("click", () => {
      removeBookFromCompleted(id);
    });

    div_icon_container.append(icon_undo, icon_trash);
  } else {
    const icon_check = document.createElement("i");
    icon_check.classList.add("ri-check-double-fill", "icon");
    icon_check.addEventListener("click", () => {
      addBookToCompleted(id);
    });

    div_icon_container.append(icon_check);
  }

  return content;
};

const addNewBook = () => {
  document.forms["bookForm"].onsubmit = (e) => {
    e.preventDefault();

    const title = document.forms["bookForm"]["title"].value;
    const author = document.forms["bookForm"]["author"].value;
    const year = document.forms["bookForm"]["year"].value;
    const cover_url = document.forms["bookForm"]["cover_url"].value;
    const isCompleted = document.forms["bookForm"]["isCompleted"].checked;

    const bookId = +new Date();

    const bookObject = generatedBookObject(
      bookId,
      title,
      author,
      year,
      cover_url,
      isCompleted
    );

    books.push(bookObject);

    document.forms["bookForm"].reset();

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  };
};

const addBookToCompleted = (bookId) => {
  const book = findBook(bookId);

  if (book == null) return;

  book.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const removeBookFromCompleted = (bookId) => {
  const book = findBookIndex(bookId);

  if (book === -1) return;

  books.splice(book, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const undoBookFromCompleted = (bookId) => {
  const book = findBook(bookId);

  if (book == null) return;

  book.isCompleted = false;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

document.addEventListener("DOMContentLoaded", () => {
  addNewBook();

  if (isWebStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log("Data saved successfully.");
});

document.addEventListener(RENDER_EVENT, () => {
  const unread = document.getElementById("unread");
  const haveBeenRead = document.getElementById("haveBeenRead");
  console.log({ haveBeenRead });

  unread.innerHTML = "";
  haveBeenRead.innerHTML = "";

  for (const book of books) {
    const bookElement = createBook(book);

    if (bookElement.isCompleted) {
      haveBeenRead.append(bookElement);
    } else {
      unread.append(bookElement);
    }
  }
});

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
