import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})

//Component which will allow the user to add a new entry into the database.
export class NewEntryComponent {

  //FormGroup is basically a collection of form controls where a single form
  //control belongs to a single field in our form in the html file. The validators
  //make sure that the data the is given for those controls (the control can be found
  //in the html file and when you see formControlName="NAME OF THE CONTROL like isExpense")
  //is valid.
  entryForm = new FormGroup({
    description: new FormControl('', Validators.required),//Required validator means the field is required and if it's not present, then the field turns red.
    isExpense: new FormControl('', Validators.required),
    value: new FormControl('', [Validators.required, Validators.pattern('\\d+\\.?\\d*')])//Can either be a natural number or a decimal number.
  });

  //This array contains all the possible types (expense and income) and it is
  //used in the new-entry.component.html file.
  types: Type[] = [
    {value: true, display: 'Expense'},
    {value: false, display: 'Income'},
  ]

  constructor(private service:EntryService,
              private router: Router) { }

  //Function which is used in the new-entry.component.html file. It is this function
  //that is called when the create new entry button is clicked.
  onSubmit() {

    //We now have the entry that the user wants to submit by doing this.entryForm.value and now we
    //can use the createEntry method of the service to send the request to the Web API to create
    //a new entry in the database with this.entryForm.value as an entry and we will get a
    //reponse back in return. Therefore, we will subscribe to this reponse so that we can
    //extract the data in the reponse and then log it if we want.
    this.service.createEntry(this.entryForm.value).subscribe(data => {
      
      //Optional log in here.

      //The new entry was created so redirect the user back to the list with entries.
      this.router.navigate(['/entries']);
    });    
  }
}