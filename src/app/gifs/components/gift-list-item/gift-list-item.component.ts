import {  Component, input } from '@angular/core';

@Component({
  selector: 'gift-list-item',
  imports: [],
  templateUrl: './gift-list-item.component.html',
})
export default class GiftListItemComponent {
  imageUrl = input.required<string>()
}
