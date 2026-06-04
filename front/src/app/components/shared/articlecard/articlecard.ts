import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../service/feedService.service';
import { Favorite } from '../../../interfaces/favorite.interface';
import { Router } from '@angular/router';
import { InteractionService } from '../../../service/interactionService.service';
<<<<<<< Updated upstream
import { ErrorHttpService } from '../../../service/errorHttpService.service';
import { catchError } from 'rxjs';
import { ModelIAService } from '../../../service/modelIA.service';
=======
import { ModelIAService } from '../../../service/modelIA.service';
import { CancelFavoriteI } from '../../../interfaces/cancelFavorite.interface';
import { Subscribe } from '../../../interfaces/subscribe.interface';
import { catchError } from 'rxjs';
import { ErrorHttpService } from '../../../service/errorHttpService.service';

>>>>>>> Stashed changes

@Component({
    selector: 'articlecard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './articleCard.html',
    styleUrls: ['./articlecard.css']
})
export class ArticleCardComponent {
<<<<<<< Updated upstream
=======
    // AL SER ANY PUEDP PUEDO DECLARAR CUALQUIER PROPIEDAD
>>>>>>> Stashed changes
    @Input() article: any;
    @Output() aiSummary = new EventEmitter<string>();
    @Output() readFull = new EventEmitter<string>();
    private modelService = inject(ModelIAService);
    private interactionService = inject(InteractionService)
<<<<<<< Updated upstream
    private errorHttpService = inject(ErrorHttpService)
    private feedService = inject(FeedService);
    private router = inject(Router);
=======
    private feedService = inject(FeedService);
    private router = inject(Router);
    private errorHttpService = inject(ErrorHttpService)
>>>>>>> Stashed changes

    onSummarize(article: any): void {
        this.modelService.openModel(article.title, article.content, article.url, article.category, article);
    }
<<<<<<< Updated upstream
    
    sendInteracionClick():void{
        this.interactionService.postInteraction(this.article.category, 'CLICK');
    }
    
    sendInteracitionSave(): void{
        this.interactionService.postInteraction(this.article.category, 'SAVE')    
        .pipe(catchError((err) => this.errorHttpService.handleError(err)));
    }
    
=======

    sendInteracionClick():void{
        this.interactionService.postInteraction(this.article.category, 'CLICK', this.article.id).pipe(catchError((err) => this.errorHttpService.handleError(err))).subscribe();
    }


>>>>>>> Stashed changes
    onReadFull(event: Event) {
        event.preventDefault();
        this.feedService.setArticle(this.article);
        this.router.navigate(['/new']);
<<<<<<< Updated upstream
=======
        this.sendInteracionClick();
>>>>>>> Stashed changes
    }

    /***************************************************************************************************************************************************************************/

    // SI la noticia no tiene imagen
    imageError(event: Event): void {
        const element = event.target as HTMLImageElement;
<<<<<<< Updated upstream
        element.src = 'https://placehold.co/150x100?text=No+Image'; 
=======
        element.src = 'https://placehold.co/150x100?text=No+Image';
>>>>>>> Stashed changes
    }

    favorite(): void {
        if (this.article.isFavorite) {
<<<<<<< Updated upstream
            return; 
        }

=======
            this.cancelFavoriteM();
            return;
        }
        this.sendInteracionClick();
>>>>>>> Stashed changes
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        this.article.isFavorite = !this.article.isFavorite;
<<<<<<< Updated upstream
        
        const favoritePayload: Favorite = {
            loginRequest: { email, password },
            savedNew: {
            externalArticleId: this.article.externalId ?? '',
=======

        const favoritePayload: Favorite = {
            loginRequest: { email, password },
            savedNew: {
            externalArticleId: this.article.id,
>>>>>>> Stashed changes
            title: this.article.title,
            url: this.article.url,
            category: this.article.category,
            description:this.article.description,
            content:this.article.content,
            image:this.article.image
            }
        };

<<<<<<< Updated upstream
        console.log("JSON exacto que se envía al backend:", favoritePayload);
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    subscribe(): void {
        if (this.article.isSubscribed) {
            return; 
        }

        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        const subscribePayload = {
            loginRequest: { email, password },
             externalSourceId: this.article.source?.id,
        sourceName: this.article.source?.name
=======
    @Output() subscriptionChanged = new EventEmitter<string>();

    subscribe(): void {
        if (this.article.isSubscribed) {
            return;
        }

        this.sendInteracionClick();
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        const subscribePayload: Subscribe = {
            loginRequest: { email, password },
            externalSourceId: this.article.source?.id,
            sourceName: this.article.source?.name
>>>>>>> Stashed changes
        };

        this.article.isSubscribed = !this.article.isSubscribed;

        this.feedService.subscribe(subscribePayload).subscribe({
            next: () => {
<<<<<<< Updated upstream
                console.log('Suscripción correcta');
            },
            error: (err) => {
                console.error('Error suscripción', err);
=======
                this.subscriptionChanged.emit(this.article.source.name);
            },
            error: (err) => {
>>>>>>> Stashed changes
                this.article.isSubscribed = !this.article.isSubscribed;
            }
        });
    }

<<<<<<< Updated upstream

=======
    like(): void{
        this.favorite();
        //this.sendInteracitionSave()
    }

    get isSaved() {
        return this.router.url === '/saved';
    }

    @Output() favoriteRemoved = new EventEmitter<string>();
    cancelFavoriteM(): void {
        if (this.router.url !== '/saved') {
            return;
        }
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        const externalId = this.article.externalArticleId;

        const cancelPayload: CancelFavoriteI = {
            loginRequest: { email, password },
            externalArticleId: externalId
        };

        this.feedService.cancelFavorite(cancelPayload).subscribe({
            next: () => {
            this.article.isFavorite = false;
            this.favoriteRemoved.emit(externalId);
            },
            error: (err) => {
            console.error('Error al eliminar favorito', err);
            }
        });
    }
>>>>>>> Stashed changes

}
