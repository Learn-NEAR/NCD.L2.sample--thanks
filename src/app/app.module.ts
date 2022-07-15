import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {InfoComponent} from './components/info/info.component';
import {MessageFormComponent} from './components/forms/message-form/message-form.component';
import {LearnSectionComponent} from './components/learn-section/learn-section.component';
import {MessageHistoryComponent} from './components/message-history/message-history.component';
import {menu, HeroIconModule, user, logout, annotation, lightningBolt, academicCap, desktopComputer} from 'ng-heroicon';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import { MessageComponent } from './components/message/message.component';
import { SummarizeComponent } from './components/summarize/summarize.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    InfoComponent,
    MessageFormComponent,
    LearnSectionComponent,
    MessageHistoryComponent,
    MessageComponent,
    SummarizeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HeroIconModule.forRoot({
      menu,
      user,
      logout,
      annotation,
      lightningBolt,
      academicCap,
      desktopComputer
    }, {
      defaultHostDisplay: 'inlineBlock', // default 'none'
      attachDefaultDimensionsIfNoneFound: true // default 'false'
    }),
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
// TODO: Create !! NearModule !! =>
// TODO: NearModule !! LIBRARY !!
