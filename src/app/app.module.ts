import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BookViewComponent } from "./book-view/book-view.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BookCreateComponent } from "./book-create/book-create.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { FormsModule} from '@angular/forms';
import { BookUpdateComponent } from "./book-update/book-update.component";
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BookViewComponent,
        BookCreateComponent,
        BookUpdateComponent,
        BrowserAnimationsModule,
        MatInputModule, 
        FormsModule,
        PanelModule,
        AccordionModule,
        TabMenuModule,
        CardModule,
        MatCardModule,
        MatIconModule
    ],
    bootstrap: [AppComponent]
})export class AppModule {}