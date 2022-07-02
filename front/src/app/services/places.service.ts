import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place, PlaceData } from '../models/place.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private http: HttpClient) {
  }

  fetchPlaces() {
    return this.http.get<Place[]>(environment.apiUrl + '/places');
  }

  fetchPlace(id: string) {
    return this.http.get<Place>(environment.apiUrl + '/places/' + id);
  }

  createPlace(data: PlaceData) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/places', formData);
  }

  removeImage(imageId: string) {
    return this.http.delete(environment.apiUrl + '/places/' + imageId);
  }
}
