import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  posts!: Post[]

  constructor(private adService: AnnouncementService) { }

  ngOnInit() {
    this.adService.getAllAnnouncement().subscribe((posts: Post[]) => {
      this.posts = posts;
    })
  }

  removePost(removeId?: string) {
    if (!removeId) return;
    this.adService.removeAnnouncement(removeId).subscribe(() => {
      this.posts = this.posts.filter(({ id }) => id !== removeId);

    })
  }
}
