import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class AuthInterceptor implements NestInterceptor{
    intercept(
        context: ExecutionContext, 
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(({password, ...user}) => {
                return user;
            })
        );
    }
    
}