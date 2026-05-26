import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Article } from '../../../interfaces/article.interface';
import { FeedService } from '../../../service/feedService.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-component',
  imports: [CommonModule, DatePipe],
  templateUrl: './newComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  article: Article | null = null;
  private feedService = inject(FeedService);

  constructor() {
    this.article = this.feedService.getArticle();
  }
}
