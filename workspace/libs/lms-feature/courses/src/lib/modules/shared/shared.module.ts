import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityModule } from '@angularlicious/security';
import { MaterialDesignModule } from '@angularlicious/material-design';
import { FoundationModule } from '@angularlicious/foundation';
import { ComponentsModule } from '@angularlicious/components';

const modules = [ComponentsModule, FormsModule, FoundationModule, HttpClientModule, MaterialDesignModule, NgbModule, ReactiveFormsModule, RouterModule, SecurityModule];

@NgModule({
  declarations: [],
  exports: [...modules, ToastrModule],
  imports: [...modules, ToastrModule.forRoot()],
})
export class SharedModule {}
