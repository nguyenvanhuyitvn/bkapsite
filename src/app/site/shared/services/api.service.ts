import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions ={
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
}
const uri ='http://product.bachkhoa-aptech.edu.vn/BkapServices/Portal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private handleError<T>(operation = 'operation', result?:T){
      return (error: any): Observable<T> =>{
        console.log(error);
        return of(result as T);
      }
    }
  constructor(private http: HttpClient) { }
      show(endpoint: any): Observable<any>{
        const url= `${uri}/${endpoint}`;
        console.log(url);
        return this.http.get<any>(url).pipe(
          tap(show=> console.log('fetched')),
          catchError(this.handleError('show',[]))
        )
      }
      search(endpoint: any, param: any): Observable<any>{
        const url= `${uri}/${endpoint}/${param}`;
        console.log(url);
        return this.http.get<any>(url).pipe(
          tap(show=> console.log(show)),
          catchError(this.handleError('show',[]))
        )
      }
      getDetail(data: any, endpoint: any, id: any): Observable<any> {
        const url= `${uri}/${endpoint}/${id}`;
        console.log(url);
        return this.http.get(url, data).pipe(
          tap(_ => console.log(`getDetails id=${id}`)),
          catchError(this.handleError<any>('getDetails'))
        )
      }
      getNewsDetail(data: any, endpoint: any): Observable<any> {
        const url= `${uri}/${endpoint}`;
        console.log(url);
        return this.http.get(url, data).pipe(
          tap(_ => console.log(`getDetails`)),
          catchError(this.handleError<any>('getDetails'))
        )
      }
      store( data: any, endpoint: any): Observable<any>{
        const url= `${uri}/${endpoint}/Add`;
        // console.log(data);
        return this.http.post(url, data, httpOptions).pipe(
          tap(( _data: any)=> console.log(_data)),
          catchError(this.handleError<any>('store'))
        )
      }
      update(data: any, endpoint: any): Observable<any>{
        const url = `${uri}/${endpoint}`;
        // console.log(data)
        return this.http.put(url, data).pipe(
          tap(_ => console.log(`updated successfull`)),
          catchError(this.handleError<any>('update'))
        );
      }
      updateFile( data: any, endpoint: any): Observable<any>{
        const url = `${uri}/${endpoint}`;
        console.log(data);
        return this.http.post(url,data).pipe(
          tap(_ => console.log(`updated successfull`)),
          catchError(this.handleError<any>('update'))
        );
      }
      destroy(id: any, endpoint: any): Observable<any>{
        const url = `${uri}/${endpoint}/${id}`;
        console.log(url);
        return this.http.delete(url, httpOptions).pipe(
          tap(_ => console.log(`delete id= ${id}`)),
          catchError(this.handleError<any>('destroy'))
        );
      }
      quickUpdate(id: any, formData: any, endpoint: any): Observable<any>{
        const url = `${uri}/${endpoint}/quickupdate/${id}`;
        return this.http.patch(url,formData).pipe(
          tap(_ => console.log(`upadated id=${id}`)),
          catchError(this.handleError<any>('upadated'))
        );
      }
      getStudentByCode(Code: string){
        const url= `${uri}/Students/GetByCode/${Code}`;
        console.log(url);
        return this.http.get<any[]>(url);
      }
      changePassword(data: any, endpoint: any): Observable<any>{
        const url = `${uri}/${endpoint}`;
        // console.log(data)
        return this.http.post(url, data).pipe(
          tap(_ => console.log(`changed password successfull`)),
          catchError(this.handleError<any>('changed'))
        );
      }
}
