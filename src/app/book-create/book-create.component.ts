import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../book';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatRadioModule,
    MatButtonModule, MatFormFieldModule, ReactiveFormsModule,
    MessagesModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css',
  providers: [MessageService]
})
export class BookCreateComponent {
  formatLabelControl = new FormControl('F' as FloatLabelType);
  titleLabel = new FormControl();
  authorLabel = new FormControl();
  amountLabel = new FormControl();

  options = this._formBuilder.group({
    format: this.formatLabelControl,
    title: this.titleLabel,
    author: this.authorLabel,
    amount: this.amountLabel
  });

  @Output() newBookEmitter = new EventEmitter();

  constructor(private http: HttpClient, private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar, private messageService: MessageService) { }

  onSubmit(): void {
    console.log(this.options)
    this.http.post<Book>("http://localhost:8080/book/save", this.options.value)
      .subscribe({
        next: (createdBook) => {
          this.newBookEmitter.emit(createdBook)
        },
        error: (err) => {
          this.openSnackBar(err.error, "OK");
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
