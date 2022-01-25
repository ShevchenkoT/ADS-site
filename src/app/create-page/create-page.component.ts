import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  disableSubmitBtn = false;
  form!: FormGroup

  constructor(private adService: AnnouncementService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  submit() {

    this.disableSubmitBtn = true;
    const newPost: Post = {
      ...this.form.value,
      dateAdded: new Date(),
    }
    this.adService.addAnnouncement(newPost)
      .subscribe(null, (e) => console.log(e), () => this.disableSubmitBtn = false)


    this.form.reset()
  }

}
