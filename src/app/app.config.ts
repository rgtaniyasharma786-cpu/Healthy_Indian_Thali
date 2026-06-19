import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import {provideFirebaseApp,initializeApp } from '@angular/fire/app'
import { environment } from '../environments/environment.development';
import {provideFirestore, getFirestore } from '@angular/fire/firestore';
import {provideSpinnerConfig} from  'ngx-spinner';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
 
      provideFirebaseApp(()=> initializeApp(environment.firebase)),
      provideFirestore(()=> getFirestore()),
      provideAuth(()=>getAuth()),

    provideSpinnerConfig({type: 'ball-scale-multiple'}),
    {provide:FIREBASE_OPTIONS,useValue:environment.firebase}
  ]
};
