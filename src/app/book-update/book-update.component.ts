import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Book } from '../book';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent {

  @Output() editEvent = new EventEmitter();

  formatLabelControl = new FormControl(this.book.format as FloatLabelType);
  titleLabel = new FormControl(this.book.title);
  authorLabel = new FormControl(this.book.author);
  amountLabel = new FormControl(this.book.amount);

  updatedBook = this._formBuilder.group({
    format: this.formatLabelControl,
    title: this.titleLabel,
    id: this.book.id,
    author: this.authorLabel,
    amount: this.amountLabel
  });

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<BookUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {}

  onEdit(): void {
    this.http.put<Book>(
      "http://localhost:8080/book/"+this.book.id+"/update",
      this.updatedBook.value
    ).subscribe({
      next: result => {
      this.dialogRef.close();
      this.editEvent.emit(result);
      },
      error: (err) => {
        this.openSnackBar(err.error,"OK");
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
