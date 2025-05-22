import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { environment } from "@environments/environment";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);
  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.GIPHY_API_URL}/gifs/trending`,{
      params: {
        api_key: environment.GIPHY_API_KEY,
        limit: '20',
        offset: '0',
        ratting: 'g',
        bundle:"messaging_non_clips"
      }
    })
  }
}
