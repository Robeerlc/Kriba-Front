import { Component, inject, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelIAService } from '../../../service/modelIA.service';
import { CommonModule } from '@angular/common';
import {ModalData} from '../../../interfaces/modelIAData.interface'
import { FeedService } from '../../../service/feedService.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../../service/interactionService.service';
import { catchError } from 'rxjs';
import { ErrorHttpService } from '../../../service/errorHttpService.service';



@Component({
  selector: 'app-model-ia',
  imports: [CommonModule],
  templateUrl: './modelIA.html',
  styleUrl: './modelIA.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,   // ← permite que ::ng-deep llegue al mat-dialog-container
})
export class ModelIA {
  @Input() article: any;
  isLoading = false;
  summaryResult = '';
  remainingUses = 0;
  errorMessage = '';

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dialogRef = inject(MatDialogRef<ModelIA>);
  private readonly modelAIService = inject(ModelIAService);
  readonly data = inject<ModalData>(MAT_DIALOG_DATA);
  private feedService = inject(FeedService)
  private router = inject(Router)
  private interactionService = inject(InteractionService);
  private errorHttpService = inject(ErrorHttpService)


  generateSummary(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.modelAIService.getSummary(this.data.content,this.data.url,this.data.category).subscribe({
      next: (summary) => {
        this.summaryResult = summary.summary;
        this.remainingUses = summary.remainingDailyUses;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al generar el resumen';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /*sendInteracition(articleCat: string, interacition: string): void{
    this.interactionService.postInteraction(this.data.category, 'SUMMARIZE').pipe(catchError((err) => this.errorHttpService.handleError(err)))
  }*/
  onReadFull(event: Event) {
    event.preventDefault();
    this.feedService.setArticle(this.data.article);
    this.router.navigate(['/new']);
  }


  close(): void {
    this.dialogRef.close();
  }
}
