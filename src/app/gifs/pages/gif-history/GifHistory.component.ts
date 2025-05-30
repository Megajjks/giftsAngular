import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '@/gifs/services/gifs.service';
import GiftListComponent from "../../components/gift-list/gift-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GiftListComponent],
  templateUrl: './GifHistory.component.html'
})
export default class GifHistoryComponent {

  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query']))
  )

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));

}
