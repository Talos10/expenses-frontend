import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

//Components are basically TypeScript classes that interact with the HTML files
//and it’s the HTML files that are going to be displayed to the user.
//The component.ts is the main file of a component. This component is the footer of
//the SPA and will display some information to the user (maybe some text).
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
