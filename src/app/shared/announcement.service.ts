import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Post } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  addAnnouncement(newAd: Post): Observable<any> {
    return this.http.post(`${environment.FBUrl}/Post.json`, newAd)
  }

  updateAnnouncement(ad: Post) {
    return this.http.patch(`${environment.FBUrl}/Post/${ad.id}.json`, ad);
  }

  removeAnnouncement(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.FBUrl}/Post/${id}.json`);
  }

  getAllAnnouncement(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.FBUrl}/Post.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
        }))
      }),
    );
  }

  getAnnouncementById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FBUrl}/Post/${id}.json`);
  }
}
