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
  similarPosts: Post[] = [];
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
          return this.adService.getAllAnnouncement();
        })).subscribe((posts) => {
          this.similarPosts = this.findThreeSimilarPosts(posts);
        })
  }

  findThreeSimilarPosts(posts: Post[]) {
    if (!posts) return [];
    const mainPostDescription = this.post.description.split(' ').filter((w) => w.length > 3).map((w) => w.toLowerCase());
    const mainPostTitle = this.post.title.split(' ').filter((w) => w.length > 3).map((w) => w.toLowerCase())

    posts = posts.filter(({ description, id, title }) => {
      if (id === this.currentId) return false;

      const titleWords = title.split(' ').filter((w) => mainPostTitle.includes(w.toLowerCase()))
      if (!titleWords.length) return false;

      const descriptionWords = description.split(' ').filter((w) => mainPostDescription.includes(w.toLowerCase()))
      return !!descriptionWords.length
    })
    return posts.slice(0, 3);
  }

}
