import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
