import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page-component',
  imports: [],
  templateUrl: './homePageComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
