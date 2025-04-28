import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoadingComponent } from "./shared/loading/loading.component";
import { PaisService } from './pais/services/pais.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HeaderComponent, RouterOutlet, SidebarComponent, LoadingComponent],
    standalone: true
})
export class AppComponent {
  title = 'paisesApp';
}
