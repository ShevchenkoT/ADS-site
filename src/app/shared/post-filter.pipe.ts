import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './interfaces';

@Pipe({
  name: 'postFilter',
  pure: false,
})
export class PostFilterPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    return posts.filter(({ title }) => (title.toLowerCase()).includes(search.toLowerCase()));
  }
}
