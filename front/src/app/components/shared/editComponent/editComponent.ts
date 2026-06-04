import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../service/user.service';

import { FormsModule } from '@angular/forms';
import { InteractionService } from '../../../service/interactionService.service';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './editComponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './editComponent.css'
})
export class EditComponent {
  errorMsg = ''
  modifyResult = false
  newUserName = ''
  newUserEmail = ''
  newPassword= ''
  isLoading = false

  private readonly cdr = inject(ChangeDetectorRef)
  private readonly dialogRef = inject(MatDialogRef<EditComponent>)
  private readonly userService = inject(UserService)
  readonly data = inject(MAT_DIALOG_DATA)
  private interactionService = inject(InteractionService)


  modifyValues(): void{
    this.errorMsg = ''

    this.userService.modifyData(this.newUserName, this.newUserEmail, this.newPassword).subscribe({
      next: (modify)=>{
        this.isLoading=true
        const auth = JSON.parse(localStorage.getItem('auth') ?? '{}')
        auth.user.username = modify.username
        localStorage.setItem('auth', JSON.stringify(auth))
        this.newUserName = modify.username
        localStorage.setItem('email', this.newUserEmail || this.data.userEmail);
        localStorage.setItem('password', this.newPassword || (localStorage.getItem('password') ?? ''))
        this.isLoading= false;
        this.cdr.detectChanges();
        window.location.reload();
      },
      error: (error)=>{
        this.errorMsg = error.message || 'Error al modificar los campos';
        this.isLoading= false;
        this.cdr.detectChanges();
      }

    }

    )


  }
  close(): void{
    this.dialogRef.close()
  }

}
