import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

//Components are basically TypeScript classes that interact with the HTML files
//and it’s the HTML files that are going to be displayed to the user.
//The component.ts is the main file of a component. This component is the body of
//the SPA and will display some buttons so that the user can navigate around the SPA.
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
