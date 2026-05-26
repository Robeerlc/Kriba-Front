import { Component } from '@angular/core';
import { NewComponent } from '../../components/shared/new/newComponent';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [NewComponent],
  templateUrl: './newPage.component.html',
})
export class NewPageComponent {}
