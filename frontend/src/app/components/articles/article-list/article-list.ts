import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/article';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-list.html',
  styleUrls: ['./article-list.css']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  isLoading = true;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      this.isLoading = false;
    });
  }

  getImageUrl(image: string): string {
    return `${environment.imageUrl}/${image}`;
  }

  onDelete(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }
}
