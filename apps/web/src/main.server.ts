import { BootstrapContext, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { config } from "./app/app.config.server";

// Angular v21: bootstrapApplication requires a third `context` arg containing
// `{ platformRef }`. The Angular SSR infrastructure passes it when calling this function.
const bootstrap = (context?: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
