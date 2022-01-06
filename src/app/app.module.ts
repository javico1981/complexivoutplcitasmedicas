import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

//Modulos compartidos
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
