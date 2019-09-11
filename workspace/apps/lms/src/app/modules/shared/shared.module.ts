import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/**
 * Use the [SharedModule] to manage Angular and other 3rd-party modules/libraries/packages
 * used by the application. For example:
 *
 * Material Design
 * RouterModule
 * ReactiveFormsModule
 *
 * Note: DO NOT include any items related to the application features or domain.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialDesignModule, RouterModule],
  exports: [MaterialDesignModule, RouterModule],
  bootstrap: [],
})
export class SharedModule {}
