import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  post!: Post

  constructor(
    private route: ActivatedRoute,
    private adService: AnnouncementService,
  ) { }

  ngOnInit() {
    this.route.params.
      pipe(
        switchMap((params: Params) => {
          return this.adService.getAnnouncementById(params['id']);
        })
      ).subscribe((post: Post) => {
        this.post = post;
      });
  }
}
