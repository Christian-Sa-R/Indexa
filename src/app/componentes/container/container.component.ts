import { Component } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ɵEmptyOutletComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
