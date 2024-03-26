import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../book';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [FormsModule, 
    MatRadioModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    CardModule,
    MatCardModule],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {

  @Input() book!: Book;
  @Output() removeBookEvent = new EventEmitter();
  @Output() updateBookEvent = new EventEmitter();

  transformFormat(format: string) : string{
    switch (format){
      case 'A':
        return 'Audiolivro';
      case 'E':
        return 'E-book';
      case 'F':
        return 'Livro físico';
      default:
        return 'N/A';
    }
  }

  removeBook(book:Book){
    this.removeBookEvent.emit(book.id);
  }

  updateBook(book:Book){
    this.updateBookEvent.emit(book);
  }
  

}
