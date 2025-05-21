import { Component, input } from '@angular/core';
import GiftListItemComponent from '../gift-list-item/gift-list-item.component';

@Component({
  selector: 'gift-list',
  imports: [GiftListItemComponent],
  templateUrl: './gift-list.component.html',
})
export default class GiftListComponent {
  gifs = input.required<string[]>()
 }
