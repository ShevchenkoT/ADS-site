import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {
  disableSubmitBtn = false;
  form!: FormGroup;
  sub!: Subscription;

  constructor(
    private adService: AnnouncementService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    })
  }

  submit(): void {
    if (this.form.invalid) return;
    this.disableSubmitBtn = true;
    const newPost: Post = {
      ...this.form.value,
      dateAdded: new Date(),
    }
    this.sub = this.adService.addAnnouncement(newPost)
      .subscribe(null, (e) => console.log(e), () => this.disableSubmitBtn = false);

    this.form.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
