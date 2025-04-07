import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { httpInterceptorsProvider } from './interceptor/interceptors-provider';
import { GlobalErrorHandler } from './errorHandler/global-error-handler';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    Toast,
    ConfirmDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
          preset: Aura,
          options : {
            darkModeSelector: false || 'none',
          },
        }
    }),
    { provide : ErrorHandler, useClass : GlobalErrorHandler },
    httpInterceptorsProvider,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
