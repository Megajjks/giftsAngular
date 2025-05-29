import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './GifHistory.component.html'
})
export default class GifHistoryComponent {

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query']))
  )

}
