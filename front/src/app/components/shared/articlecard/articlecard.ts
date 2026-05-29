import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../service/feedService.service';
import { Favorite } from '../../../interfaces/favorite.interface';
import { Router } from '@angular/router';
import { InteractionService } from '../../../service/interactionService.service';
import { ErrorHttpService } from '../../../service/errorHttpService.service';
import { catchError } from 'rxjs';
import { ModelIAService } from '../../../service/modelIA.service';

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
    private modelService = inject(ModelIAService);
    private interactionService = inject(InteractionService)
    private errorHttpService = inject(ErrorHttpService)
    private feedService = inject(FeedService);
    private router = inject(Router);

    onSummarize(article: any): void {
        this.modelService.openModel(article.title, article.content, article.url, article.category, article);
    }

    sendInteracionClick():void{
        this.interactionService.postInteraction(this.article.category, 'CLICK', this.article.id).subscribe();
    }

    /*sendInteracitionSave(): void{
        this.interactionService.postInteraction(this.article.category, 'SAVE')
        .pipe(catchError((err) => this.errorHttpService.handleError(err)));
    }*/

    onReadFull(event: Event) {
        event.preventDefault();
        this.feedService.setArticle(this.article);
        this.sendInteracionClick()
        this.router.navigate(['/new']);
    }

    /***************************************************************************************************************************************************************************/

    // SI la noticia no tiene imagen
    imageError(event: Event): void {
        const element = event.target as HTMLImageElement;
        element.src = 'https://placehold.co/150x100?text=No+Image';
    }

    favorite(): void {
        if (this.article.isFavorite) {
            return;
        }
        this.sendInteracionClick()
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        this.article.isFavorite = !this.article.isFavorite;

        const favoritePayload: Favorite = {
            loginRequest: { email, password },
            savedNew: {
            externalArticleId: this.article.id,
            title: this.article.title,
            url: this.article.url,
            category: this.article.category,
            description:this.article.description,
            content:this.article.content,
            image:this.article.image
            }
        };

        console.log("JSON exacto que se envía al backend:", favoritePayload);

        this.feedService.favorite(favoritePayload).subscribe({
            next: () => {
                console.log('Favoritos funciona');
            },
            error: (err) => {
                console.error('Error Favoritos', err);
                this.article.isFavorite = !this.article.isFavorite;
            }
        });
    }

    subscribe(): void {
        if (this.article.isSubscribed) {
            return;
        }
        this.sendInteracionClick();
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        const subscribePayload = {
            loginRequest: { email, password },
             externalSourceId: this.article.source?.id,
        sourceName: this.article.source?.name
        };

        this.article.isSubscribed = !this.article.isSubscribed;

        this.feedService.subscribe(subscribePayload).subscribe({
            next: () => {
                console.log('Suscripción correcta');
            },
            error: (err) => {
                console.error('Error suscripción', err);
                this.article.isSubscribed = !this.article.isSubscribed;
            }
        });
    }



}
