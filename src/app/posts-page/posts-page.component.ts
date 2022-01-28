import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  posts!: Post[];
  search: string = '';
  rSub!: Subscription;
  gSub!: Subscription;

  constructor(private adService: AnnouncementService) { }

  ngOnInit(): void {
    this.gSub = this.adService.getAllAnnouncement().subscribe((posts: Post[]) => {
      this.posts = posts;
    })
  }

  removePost(removeId?: string): void {
    if (!removeId) return;
    this.rSub = this.adService.removeAnnouncement(removeId).subscribe(() => {
      this.posts = this.posts.filter(({ id }) => id !== removeId);
    })
  }

  ngOnDestroy(): void {
    this.rSub.unsubscribe();
    this.gSub.unsubscribe();
  }
}
