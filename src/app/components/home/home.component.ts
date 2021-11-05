import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MarsRoverService } from '../../services/mars-rover.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos: any[] = []; 
  photoSelected = '';
  today = new Date();
  rovers = [{id: 'curiosity', name: 'Curiosity'}, {id: 'spirit', name: 'Spirit'}, {id: 'opportunity', name: 'Opportunity'}];
  roverSelected = ''
  cameras: any[] = [];
  cameraSelected = '';
  dateSelected = moment().subtract(1, 'days').format('YYYY-MM-DD');//new Date().getFullYear();//new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);//.toISOString().slice(0, 10);
  solSelected = 0;
  pageSelected = 1;
  messageError = 'No results';
  loading = false;

  constructor(private marsSrv: MarsRoverService) {    
  }

  ngOnInit() {
    // value default
    this.roverSelected = this.rovers[0].id;

    this.loading = true;
    this.marsSrv.getPhotosDefault().subscribe((resp: any) => {
      this.photos = resp.latest_photos;      
    });

    // cameras
    this.marsSrv.getCameras().subscribe((resp: any) => {
      this.cameras = resp;
      this.cameraSelected = this.cameras[0].id;
      this.loading = false;
    });
  }

  search() {
    this.photos = [];
    this.loading = true;

    const request = {
      rover: this.roverSelected,
      camera: this.cameraSelected,
      earth_day: new Date(this.dateSelected).toISOString().slice(0, 10),
      sol: this.solSelected,
      page: this.pageSelected
    };
    
    // validations   
    if (this.solSelected > 0) {
      this.marsSrv.getPhotosBySol(request).subscribe((resp: any) => {
        this.dateSelected = moment(undefined).format('YYYY-MM-DD');
        this.photos = resp.photos;
        this.loading = false;
      })
    } else { 
      if (this.dateSelected !== undefined && this.dateSelected !== null) {
        this.marsSrv.getPhotosByEarthDate(request).subscribe((resp: any) =>{
          this.photos = resp.photos;
          this.loading = false;
        });
      }     
    }
  }

}
