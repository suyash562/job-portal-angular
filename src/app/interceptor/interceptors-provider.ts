import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerInterceptor } from "./error-handler";


export const httpInterceptorsProvider = [
    {provide : HTTP_INTERCEPTORS, useClass : ErrorHandlerInterceptor , multi : true}
]