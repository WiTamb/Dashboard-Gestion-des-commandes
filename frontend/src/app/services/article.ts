import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getArticle(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createArticle(articleData: FormData) {
    return this.http.post(this.apiUrl, articleData);
  }

  updateArticle(id: string, articleData: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, articleData);
  }

  deleteArticle(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
