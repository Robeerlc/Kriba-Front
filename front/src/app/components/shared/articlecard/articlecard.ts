import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../service/feedService.service';
import { Favorite } from '../../../interfaces/favorite.interface';
import { Router } from '@angular/router';
import { InteractionService } from '../../../service/interactionService.service';
import { ModelIAService } from '../../../service/modelIA.service';
import { CancelFavoriteI } from '../../../interfaces/cancelFavorite.interface';
import { Subscribe } from '../../../interfaces/subscribe.interface';


@Component({
    selector: 'articlecard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './articleCard.html',
    styleUrls: ['./articlecard.css']
})
export class ArticleCardComponent {
    // AL SER ANY PUEDP PUEDO DECLARAR CUALQUIER PROPIEDAD
    @Input() article: any;
    @Output() aiSummary = new EventEmitter<string>();
    @Output() readFull = new EventEmitter<string>();
    private modelService = inject(ModelIAService);
    private interactionService = inject(InteractionService)
    private feedService = inject(FeedService);
    private router = inject(Router);

    onSummarize(article: any): void {
        this.modelService.openModel(article.title, article.content, article.url, article.category, article);
    }
    
    sendInteracionClick():void{
        this.interactionService.postInteraction(this.article.category, this.article.id, 'CLICK');
    }
    
    
    onReadFull(event: Event) {
        event.preventDefault();
        this.feedService.setArticle(this.article);
        this.router.navigate(['/new']);
        this.sendInteracionClick();
    }

    /***************************************************************************************************************************************************************************/

    // SI la noticia no tiene imagen
    imageError(event: Event): void {
        const element = event.target as HTMLImageElement;
        element.src = 'https://placehold.co/150x100?text=No+Image'; 
    }

    favorite(): void {
        if (this.article.isFavorite) {
            this.cancelFavoriteM();
            //console.log("ya esta guardado en favoritos");
            return; 
        }
        this.sendInteracionClick();
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

    @Output() subscriptionChanged = new EventEmitter<string>();

    subscribe(): void {
        if (this.article.isSubscribed) {
            console.log("quitar sub futuro");
            return; 
        }

        this.sendInteracionClick();
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';

        const subscribePayload: Subscribe = {
            loginRequest: { email, password },
            externalSourceId: this.article.source?.id,
            sourceName: this.article.source?.name
        };

        this.article.isSubscribed = !this.article.isSubscribed;

        this.feedService.subscribe(subscribePayload).subscribe({
            next: () => {
                console.log('Suscripción correcta');
                this.subscriptionChanged.emit(this.article.source.name);
            },
            error: (err) => {
                console.error('Error suscripción', err);
                this.article.isSubscribed = !this.article.isSubscribed;
            }
        });
    }

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
            console.log("quitar me gusta futuro");
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
            console.log('Favorito eliminado correctamente');
            this.article.isFavorite = false;
            //window.location.reload();
            this.favoriteRemoved.emit(externalId);
            },
            error: (err) => {
            console.error('Error al eliminar favorito', err);
            }
        });
    }

}
