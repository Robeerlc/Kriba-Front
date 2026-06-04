import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedService } from '../../service/feedService.service';
import { LoginInterface } from '../../interfaces/loginInterface';
import { SubscriptionItem } from '../../interfaces/subscriptionList.interface';
import { LateralBarComponent } from "../../components/shared/lateralBar/lateralBarComponent";
import { Subscribe } from '../../interfaces/subscribe.interface';

@Component({
  selector: 'app-subscriptionpage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent],
  templateUrl: './subscriptionpage.html',
  styleUrls: ['./subscriptionpage.css'],
})
export class Subscriptionpage implements OnInit {
  subscriptions = signal<SubscriptionItem[]>([]);
  private feedService = inject(FeedService);

  ngOnInit(): void {

    const email = localStorage.getItem('email') || '';
    const password = localStorage.getItem('password') || '';

    const userPayload: LoginInterface = {
      email,
      password
    };

    this.feedService.subscriptionList(userPayload).subscribe({
      next: (data) => {
        this.subscriptions.set(data.subscriptions);
      },
      error: (err) => {
        console.error('Error cargando subscripciones', err);
      }
    });
  }

    cancelSubscribe(sub: SubscriptionItem): void {
      const email = localStorage.getItem('email') || '';
      const password = localStorage.getItem('password') || '';

      const subscribePayload: Subscribe = {
        loginRequest: { email, password },
        externalSourceId: sub.externalSourceId,
        sourceName: sub.sourceName
      };

      this.feedService.cancelSubscribe(subscribePayload).subscribe({
        next: () => {

          //Crea un nuevo array sin el eliminado
          //Update pq se reutilizan los datos ya creados
          this.subscriptions.update(x =>
            x.filter(item => item.externalSourceId !== sub.externalSourceId)
          );

        },
        error: (err) => {
          console.error('Error al cancelar la suscripción', err);
        }
      });
    }
}
