import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";


bootstrapApplication(AppComponent, appConfig).catch((error) => console.log(error));





// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
