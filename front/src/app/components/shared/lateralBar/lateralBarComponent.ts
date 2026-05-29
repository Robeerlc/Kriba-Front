import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'lateralBar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './lateralBarComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './lateralBarComponent.css'
})
export class LateralBarComponent {

}
