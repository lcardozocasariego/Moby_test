import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { SpinerComponent } from './components/spiner/spiner.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    SpinerComponent,
    HeaderComponent,
    EditUserFormComponent,
  ],
  exports: [SpinerComponent, HeaderComponent, PrimeNGModule],
  imports: [CommonModule, RouterModule, PrimeNGModule, ReactiveFormsModule],
})
export class SharedModule {}
