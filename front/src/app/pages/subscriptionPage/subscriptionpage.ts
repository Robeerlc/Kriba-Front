import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedService } from '../../service/feedService.service';
import { LoginInterface } from '../../interfaces/loginInterface';
import { SubscriptionItem } from '../../interfaces/subscriptionList.interface';
import { LateralBarComponent } from "../../components/shared/lateralBar/lateralBarComponent";
<<<<<<< Updated upstream
=======
import { Subscribe } from '../../interfaces/subscribe.interface';
>>>>>>> Stashed changes

@Component({
  selector: 'app-subscriptionpage',
  standalone: true,
  imports: [CommonModule, LateralBarComponent],
  templateUrl: './subscriptionpage.html',
  styleUrls: ['./subscriptionpage.css'],
})
export class Subscriptionpage implements OnInit {
<<<<<<< Updated upstream

  subscriptions = signal<SubscriptionItem[]>([]);

=======
  subscriptions = signal<SubscriptionItem[]>([]);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        console.log(data);
=======
>>>>>>> Stashed changes
        this.subscriptions.set(data.subscriptions);
      },
      error: (err) => {
        console.error('Error cargando subscripciones', err);
      }
    });
<<<<<<< Updated upstream

  }
}
=======
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
>>>>>>> Stashed changes
