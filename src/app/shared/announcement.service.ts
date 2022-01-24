import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from './interfaces';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  addAnnouncement(newAd: Announcement): Observable<any> {
    return this.http.post(`${environment.FBUrl}/ad.json`, newAd)
  }

  updateAnnouncement(ad: Announcement) {
    return this.http.patch(`${environment.FBUrl}/ad/${ad.id}.json`, ad);
  }

  removeAnnouncement(id: string): any {
    return this.http.delete<any>(`${environment.FBUrl}/ad/${id}.json`);
  }

  getAllAnnouncement(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${environment.FBUrl}/ad.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
        }))
      }),
    );
  }

  getAnnouncementById(id: string): Observable<Announcement> {
    return this.http.get<Announcement>(`${environment.FBUrl}/ad/${id}.json`);
  }
}
