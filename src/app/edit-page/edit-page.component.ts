import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AnnouncementService } from '../shared/announcement.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  disableSubmitBtn = false;
  form!: FormGroup;
  post!: Post;
  id!: string;

  constructor(
    private adService: AnnouncementService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.
      pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          return this.adService.getAnnouncementById(params['id']);
        })
      ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, [Validators.required, Validators.minLength(3)]),
          description: new FormControl(post.description, [Validators.required, Validators.minLength(20)]),
        });
      });
  }

  submit() {
    if (this.form.invalid) return;
    this.disableSubmitBtn = true;
    const newPost: Post = {
      ...this.form.value,
      dateAdded: new Date(),
      id: this.id,
    }
    this.adService.updateAnnouncement(newPost).subscribe((res) => {
      this.router.navigate(['/'])
    })
  }
}
