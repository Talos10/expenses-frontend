import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})

//Class which represents the form used to update an entry.
export class UpdateEntryComponent implements OnInit {

  //A new form used to get the fields with the new information
  //that we need to update the entry.
  updateForm: FormGroup;
  id: number;

  //This array contains all the possible types (expense and income) and it is
  //used in the new-entry.component.html file.
  types: Type[] = [
    {value: true, display: 'Expense'},
    {value: false, display: 'Income'},
  ]

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<UpdateEntryComponent>,
              @Inject(MAT_DIALOG_DATA){Description, IsExpense, Value, Id},
              private service: EntryService) {//Injecting the data we need.

                //We need this id for the save method.
                this.id = Id;

                //This is another way of creating a FormGroup. You either use a FormBuilder,
                //then you call the group function on it and then you give it each new control or
                //you do it like it's done in the new-entry.components.ts file.
                this.updateForm = fb.group({
                  description: [Description, Validators.required],
                  isExpense: [IsExpense, Validators.required],
                  value: [Value, [Validators.required, Validators.pattern('\\d+\\.?\\d*')]]
                });
              }

  ngOnInit(): void {
  }

  //Method called by the save button in the update-entry.component.html which will
  //send a put request to the Web API in order to update the fields of the
  //selected entry.
  save() {

    //This line is important because although the entries that we receive from the Web API have
    //the correct Id, when we give the entries to the form in order to display them, we don't store the
    //id of the entries anywhere in the form (we don't create a control for that). Therefore, when we go ahead
    //and extract the form value, the value is of type EntryElement but since we didn't save the
    //id the first time around, the id will be zero always. However, when we clicked the edit button, we managed
    //to capture the entry from the form that we wanted to edit and so we injected it's fields here. Therefore, in order to avoid issues
    //with the server, we set the id that was not registered back to the id that the entry has.
    this.updateForm.value.id = this.id;

    this.service.updateEntry(this.id, this.updateForm.value).subscribe(data => {
     //Optional log in here.
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}