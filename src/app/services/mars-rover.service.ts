import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MarsRoverService {
  apiKey = 'CI59At9twjc4WL56GGtKVdiPzDvwzRjupPm7A1Lv';

  constructor(private http: HttpClient) {
    this.getPhotosDefault();
  }

  getPhotosDefault() {    
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${this.apiKey}&page=1`);      
  }

  getPhotosByRover(rover: string) {
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${this.apiKey}`);
  }

  getPhotosByCamera(camera: string) {
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${this.apiKey}&sol=1000&camera=${camera}`);
  }

  getCameras() {
    return this.http.get('/assets/data/cameras.json');
  }

  getPhotosByEarthDate(request: any) {
    if (request.camera === '') {
      return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_day}&page=${request.page}&api_key=${this.apiKey}`);
    } else {
      return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_day}&page=${request.page}&camera=${request.camera}&api_key=${this.apiKey}`);
    }    
  }

  getPhotosBySol(request: any) {
    if (request.camera === '') {
      return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?sol=${request.sol}&page=${request.page}&api_key=${this.apiKey}`);
    } else {
      return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?sol=${request.sol}&page=${request.page}&camera=${request.camera}&api_key=${this.apiKey}`);
    }
  }
}
