import { Component } from '@angular/core';
import { AnnouncementService } from './shared/announcement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  test: any = {
    title: 'some Tittle',
    description: 'the very big text about announcement',
    dateAdded: new Date(),
  }

  constructor(private adService: AnnouncementService) { }


  // add() {
  //   this.adService.addAnnouncement(this.test).subscribe((res) => {
  //     console.log('test is done', res);

  //   })
  // }
  // getAll() {
  //   this.adService.getAllAnnouncement().subscribe((res) => {
  //     console.log('get', res);

  //   })
  // }
  // remove() {
  //   this.adService.removeAnnouncement('-MuCaLZMqh3tyt_xrmNv').subscribe(() => {
  //     console.log('id done');

  //   }, (e: any) => {
  //     console.log('this e', e);

  //   })
  // }

  // getOne() {
  //   this.adService.getAnnouncementById('-MuCaEv7CYppZrdaZ_Dg').subscribe((res) => {
  //     console.log("get One", res);

  //   })
  // }
}

