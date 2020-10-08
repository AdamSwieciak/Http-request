import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFeatching: boolean = false;
  error = null
  private errorSub: Subscription

  constructor(private http: HttpClient, private postServie: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postServie.error.subscribe(errorMesage => {
      this.error = errorMesage
    })

    this.onFetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postServie.createAndStorePosts(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.error = false
    this.isFeatching = true;
    this.postServie.fetchPosts().subscribe(posts => {
      this.isFeatching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFeatching = false;
      this.error = error.message
    })
  }

  onClearPosts() {
    // Send Http request
    this.postServie.deletePost().subscribe( () => {
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }
}
