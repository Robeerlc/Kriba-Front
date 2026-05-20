import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'articlecard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './articleCard.html',
    styleUrls: ['./articlecard.css']
})
export class ArticleCardComponent {
     @Input() article: any;
    @Output() aiSummary = new EventEmitter<string>();
    @Output() readFull = new EventEmitter<string>();

    onAISummary() {
        this.aiSummary.emit(this.article.externalId);
    }

    onReadFull(event: Event) {
        event.preventDefault();
        this.readFull.emit(this.article.externalId);
    }
}
