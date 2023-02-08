const btn = document.querySelector("#mybtn");
const form = document.querySelector("#addbook");
const closeBtn = document.querySelector(".endButton");

btn.addEventListener("click", function () {
  form.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  form.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === form) {
    form.style.display = "none";
  }
});

let myLibrary = [];
function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Books.prototype.delete = function(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === book.title && myLibrary[i].author === book.author) {
          myLibrary.splice(i, 1);
          break;
        }
    }
};
Books.prototype.edit = function(book) {
    if (book.read === "Read"){
        book.read = "Not Read";
    } else {
        book.read = "Read";   
    }
}
function addBookToLibrary(){
    const book = document.querySelector('#form');
    book.addEventListener("submit", function(event){
        event.preventDefault();

        let bookTitle = document.querySelector('#bookTitle').value;
        let bookAuthor = document.querySelector('#bookAuthor').value;
        let bookPages = document.querySelector('#bookPage').value;
        let bookRead = document.querySelector('#bookRead').checked;
        
        if (bookRead){
            bookRead = "Read";
        } else {
            bookRead = "Not Read"
        }
        let newBook = new Books(bookTitle, bookAuthor, bookPages, bookRead);
        myLibrary.push(newBook);
        displayBooks();
        book.reset();
    });
}
let index = 0;
function displayBooks() {
    let table = document.querySelector("#library");
    let headers = `
    <h2 class = "bookheader">Book List</h2>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    `;
    table.innerHTML = headers;
    myLibrary.forEach(function(book) {
        let row = document.createElement("tr");
        let title = document.createElement("td");
        title.textContent = book.title;
        let author = document.createElement("td");
        author.textContent = book.author;
        let pages = document.createElement("td");
        pages.textContent = book.pages;
        let read = document.createElement("td");
        let readLink = document.createElement("button");
        readLink.classList.add("edits");
        readLink.textContent = book.read;
        let deletes = document.createElement("td");
        let deletesLink = document.createElement("button");
        deletesLink.classList.add("edits");
        deletesLink.textContent = "Delete";
        deletesLink.addEventListener("click", function(){
            Books.prototype.delete(book);
            displayBooks();
        });
        readLink.addEventListener("click", function(){
            Books.prototype.edit(book);
            displayBooks();
        })
        deletes.appendChild(deletesLink);
        read.appendChild(readLink);
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(deletes);
        table.appendChild(row);
    });
}
addBookToLibrary();