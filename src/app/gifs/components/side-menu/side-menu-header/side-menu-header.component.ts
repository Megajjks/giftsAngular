import {  Component } from '@angular/core';
import { environment } from '@environments/environment';


@Component({
  selector: 'side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export default class SideMenuHeaderComponent {
  envs = environment
}
