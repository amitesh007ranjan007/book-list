// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}
// Show Alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //Time out after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}



//Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    // Instatiate book object
    const book = new Book(title, author, isbn);

    //Instatiate UI object
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === ''){

        //Error alert
        ui.showAlert('Please fill all details', 'error');

    }else{
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert('Book Added!!', 'success');
    }
    

e.preventDefault();
});

//Event Listener for delete

document.getElementById('book-list').addEventListener('click',
function(e){

    const ui = new UI();
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book removed', 'success');
    e.preventDefault();
});