import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  @Input() issearchMode: boolean = false;
  goBack() {
    this.router.navigateByUrl('/');
  }
}
