import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "../interfaces/api-response.interface";
import { map, Observable } from "rxjs";

export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((data) => (
                {
                    statusCode:context.switchToHttp().getResponse().statusCode,
                    message:"SUCCESS",
                    data
                }
            ))
        )
    }

}