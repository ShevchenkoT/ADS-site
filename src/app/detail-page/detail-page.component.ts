import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  post!: Post;
  similarPosts: Post[] | any = [];
  currentId!: string;

  constructor(
    private route: ActivatedRoute,
    private adService: AnnouncementService,
  ) { }

  ngOnInit() {
    this.route.params.
      pipe(
        switchMap((params: Params) => {
          this.currentId = params['id'];
          return this.adService.getAnnouncementById(params['id']);
        })
      ).pipe(
        switchMap((post) => {
          this.post = post;
          return this.adService.getAllAnnouncement()
        })).subscribe((posts) => {
          this.similarPosts = this.findThreeSimilarPosts(posts);
        })
    // this.route.params.
    //   pipe(
    //     switchMap((params: Params) => {
    //       this.currentId = params['id'];
    //       return this.adService.getAnnouncementById(params['id']);
    //     })
    //   ).subscribe((post: Post) => {
    //     this.post = post;
    //   });

    // this.adService.getAllAnnouncement().subscribe((posts) => {

    //   this.similarPosts = this.findThreeSimilarPosts(posts);
    // })


  }

  findThreeSimilarPosts(posts: Post[]) {
    const mainWords = this.post.description.split(' ').filter((w) => w.length > 3);

    posts = posts.filter(({ description, id }) => {
      if (id === this.currentId) return false;
      const words = description.split(' ').filter((w) => mainWords.includes(w))
      return !!words.length
    })
    return posts.slice(0, 3);
  }

}
