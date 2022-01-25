import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../shared/announcement.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts!: any

  constructor(private adService: AnnouncementService) { }

  ngOnInit() {
    // this.adService.getAllAnnouncement().subscribe((res) => {
    //   this.posts = res;
    // })
  }

}
