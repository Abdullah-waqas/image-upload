import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  changeImage(data){
    console.log(data)
  }
  resetImage(){
    console.log("reset Image Called")
  }
}
