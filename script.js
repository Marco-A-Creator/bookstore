
let books = [

    {
        name: "Die Geheimnisse des Ozeans",
        author: "Clara Meer",
        likes: 1250,
        liked: false,
        price: 19.99,
        publishedYear: 2018,
        genre: "Fantasy",
        image: "buch_vorlage.png",

        comments: [
            {
                name: "Leser123",
                comment: "Mega spannendes Buch!"
            }
        ]
    },

    {
        name: "Der vergessene Pfad",
        author: "Maximilian Schwarz",
        likes: 980,
        liked: false,
        price: 14.50,
        publishedYear: 2021,
        genre: "Fantasy",
        image: "buch_vorlage_2.png",

        comments: []
    },

    {
        name: "Die Farben des Himmels",
        author: "Laura Blau",
        likes: 1520,
        liked: false,
        price: 22.95,
        publishedYear: 2019,
        genre: "Romantik",
        image: "buch_vorlage_3.png",

        comments: []
    },

    {
        name: "Das Rätsel der Zeit",
        author: "Alexander Weiss",
        likes: 750,
        liked: false,
        price: 18.00,
        publishedYear: 2020,
        genre: "Science-Fiction",
        image: "buch_vorlage_4.png",

        comments: []
    },

    {
        name: "Der letzte Wächter",
        author: "Sabine Grün",
        likes: 1300,
        liked: false,
        price: 16.75,
        publishedYear: 2017,
        genre: "Fantasy",
        image: "buch_vorlage_5.png",

        comments: []
    },

    {
        name: "Im Schatten des Mondes",
        author: "Philipp Silber",
        likes: 890,
        liked: false,
        price: 12.30,
        publishedYear: 2022,
        genre: "Science-Fiction",
        image: "buch_vorlage_6.png",

        comments: []
    }

];

// LOCAL STORAGE
let savedBooks =
    JSON.parse(localStorage.getItem("books"));

if (savedBooks) {
    books = savedBooks;
}

// BÜCHER RENDERN
function renderBooks() {

    const container =
        document.getElementById("booksContainer");

    container.innerHTML = "";

    books.forEach((book, index) => {

        container.innerHTML += `

      <div class="book-card">

        <img
          class="book-image"
          src="./assets/img/${book.image}"
          alt="${book.name}"
        >

        <div class="book-content">

          <h3>${book.name}</h3>

          <p>
            ✍️ ${book.author}
          </p>

          <p>
            📚 ${book.genre}
          </p>

          <p>
            📅 ${book.publishedYear}
          </p>

          <p>
            💰 ${book.price} €
          </p>

          <button
            onclick="toggleLike(${index})"
          >
            ❤️ ${book.likes}
          </button>

          <input
            type="text"
            id="username_${index}"
            placeholder="Dein Name..."
          >

          <input
            type="text"
            id="comment_${index}"
            placeholder="Kommentar schreiben..."
          >

          <button
            onclick="addComment(${index})"
          >
            Kommentar hinzufügen
          </button>

          <div class="comments">

            ${renderComments(index)}

          </div>

        </div>

      </div>

    `;
    });
}

// COMMENTS RENDERN
function renderComments(index) {

    let html = "";

    books[index].comments.forEach((comment, commentIndex) => {

        html += `

      <div class="comment">

        <button
          onclick="
            deleteComment(
              ${index},
              ${commentIndex}
            )
          "
        >
          Löschen
        </button>

        <strong>
          👤 ${comment.name}
        </strong>

        <p>
          ${comment.comment}
        </p>

      </div>

    `;
    });

    return html;
}

// LIKE
function toggleLike(index) {

    if (books[index].liked) {

        books[index].likes--;
        books[index].liked = false;

    } else {

        books[index].likes++;
        books[index].liked = true;
    }

    saveBooks();
    renderBooks();
}

// COMMENT ADD
function addComment(index) {

    let username =
        document.getElementById(
            `username_${index}`
        ).value;

    let commentText =
        document.getElementById(
            `comment_${index}`
        ).value;

    if (username == "" || commentText == "") {

        alert(
            "Bitte Name und Kommentar eingeben!"
        );

        return;
    }

    books[index].comments.push({

        name: username,
        comment: commentText

    });

    saveBooks();
    renderBooks();
}

// DELETE COMMENT
function deleteComment(
    bookIndex,
    commentIndex
) {

    books[bookIndex].comments.splice(
        commentIndex,
        1
    );

    saveBooks();
    renderBooks();
}

// SAVE
function saveBooks() {

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

}

// START
renderBooks();