import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly selectedCategorySubject = new BehaviorSubject<string>('mixed');

  //Aviso de cuando cambia
  get selectedCategory$(): Observable<string> {
    return this.selectedCategorySubject.asObservable();
  }

  //Valor que tiene
  get selectedCategory(): string {
    return this.selectedCategorySubject.value;
  }

  setCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }
}
