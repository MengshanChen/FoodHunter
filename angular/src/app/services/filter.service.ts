import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private tagUrl = '/tag';

  constructor(private http: HttpClient) { }

  getTags() {
    return this.http.get(this.tagUrl);
  }
}
