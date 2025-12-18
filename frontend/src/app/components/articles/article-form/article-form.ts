import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../services/article';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-form.html',
  styleUrls: ['./article-form.css']
})
export class ArticleFormComponent implements OnInit {
  editMode = false;
  articleId: string | null = null;
  article: any = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    image: null
  };
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.articleId = paramMap.get('id');
        this.isLoading = true;
        this.articleService.getArticle(this.articleId!).subscribe(data => {
          this.article = data;
          this.imagePreview = `http://localhost:5000/uploads/${data.image}`;
          this.isLoading = false;
        });
      }
    });
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveArticle(form: any) {
    if (form.invalid) return;

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('price', form.value.price);
    formData.append('quantity', form.value.quantity);
    formData.append('category', form.value.category);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, form.value.name);
    }

    this.isLoading = true;
    if (this.editMode) {
      this.articleService.updateArticle(this.articleId!, formData).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          console.error('Error updating article:', error);
          alert('Failed to update article');
          this.isLoading = false;
        }
      });
    } else {
      this.articleService.createArticle(formData).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          console.error('Error creating article:', error);
          alert('Failed to create article');
          this.isLoading = false;
        }
      });
    }
  }
}
