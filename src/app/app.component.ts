import { Component } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BookUpdateComponent } from './book-update/book-update.component';

@Component({
    selector: 'app-root',
    // standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    // imports: [RouterOutlet, BookViewComponent]
})
export class AppComponent {
  
  books: Book[] = [];
  booksLoaded!: Promise<boolean>;


  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<Book[]>(
      "http://localhost:8080/books"
    ).subscribe(data => this.books = data);
  }

  getAllBooks() {
    this.http.get<Book[]>(
      "http://localhost:8080/books"
    ).subscribe(data => {
      this.books = data;
      this.booksLoaded = Promise.resolve(true);
    });
  }

  updateBookList(newBook:any): void{
    this.getAllBooks();
  }

  removeBook(bookId : number){
    this.http.delete("http://localhost:8080/book/"+bookId)
    .subscribe(()=>this.getAllBooks())
  }

  updateBook(book:Book){
    this.openDialog(book);
  }

  openDialog(book:Book): void {
    const dialogRef = this.dialog.open(BookUpdateComponent, {
      data: {title: book.title, format: book.format, id: book.id, author: book.author, amount: book.amount},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBooks();
    });
  }

}
