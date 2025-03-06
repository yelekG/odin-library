const myLibrary = [];

// function Book(title, author, pages, readStatus){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.readStatus = readStatus;
// }

// Book.prototype.toggleRead = function() {
//     this.readStatus = !this.readStatus;
// }

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    toggleRead() {
        this.readStatus = !this.readStatus;
    }
}


function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    displayBooks();
}


function displayBooks() {
    const libraryContainer = document.getElementById("libraryContainer");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.setAttribute("data-index", index);

        // 📌 Okundu / Okunmadı butonu için class ve metin ayarla
        const readClass = book.readStatus ? "read" : "unread";
        const readText = book.readStatus ? "read" : "unread";

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>By:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <button class="toggleReadBtn ${readClass}" data-index="${index}">${readText}</button>
            <button class="removeBtn" data-index="${index}">Remove</button>
        `;

        libraryContainer.appendChild(bookCard);
    });

    addRemoveButtonListeners();
    addToggleReadButtonListeners();
}


function addRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll(".removeBtn");
    removeButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            const bookCard = e.target.closest(".bookCard")
            const index = bookCard.getAttribute("data-index")


            myLibrary.splice(Number(index), 1); // Kitabı diziden sil
            displayBooks();
        });
    });
};

function addToggleReadButtonListeners() {
    document.querySelectorAll(".toggleReadBtn").forEach(button => {
        button.addEventListener("click", function(e) {
            const index = e.target.getAttribute("data-index"); // Doğru index al
            myLibrary[Number(index)].toggleRead(); // Okundu durumunu değiştir

            // 📌 Butonun class'ını ve metnini güncelle
            if (myLibrary[Number(index)].readStatus) {
                e.target.classList.remove("unread");
                e.target.classList.add("read");
                e.target.textContent = "read";
            } else {
                e.target.classList.remove("read");
                e.target.classList.add("unread");
                e.target.textContent = "unread";
            }
        });
    });
}

const bookForm = document.getElementById("bookForm");
const bookFormDialog = document.getElementById("bookFormDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeBtn = document.getElementById("closeBtn")

newBookBtn.addEventListener("click", () => {
    bookFormDialog.showModal();
});

closeBtn.addEventListener("click", () => {
    bookFormDialog.close();
});

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("readStatus").checked;

    addBookToLibrary(title, author, pages, readStatus);

    bookForm.reset();
    bookFormDialog.close();
});