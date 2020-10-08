import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePosts(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    this.http.post<{name: string}>('https://ng-complete-quide-24d98.firebaseio.com/posts.json', 
    postData, 
    {
        headers: new HttpHeaders({'Customer-Header': 'Hello'}),
        observe: 'response',

    }
    )
    .subscribe(responseData => {

      console.log(responseData)
    }, error => {
      this.error.next(error.message)
    })
  }

  fetchPosts() {
    return this.http.get<{[key: string]:Post}>('https://ng-complete-quide-24d98.firebaseio.com/posts.json',{
      // Add your optional headers 
      headers: new HttpHeaders({'Custom-Header': 'Hello'}),
      params: new HttpParams().set('print', 'preety')
    })
    .pipe(
      map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key})
        } 
      }
      return postsArray
    }),catchError(errorRes => {
        // Send to analistyc server
        return throwError(errorRes)
    })
    )
  }

  deletePost() {
    return this.http.delete('https://ng-complete-quide-24d98.firebaseio.com/posts.json',
    {
     observe: 'events',
     responseType: 'text'
    }).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
      if (event.type === HttpEventType.Sent) {
       // ..
      }
    }))
  }
}
