import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})

//Components are basically TypeScript classes that interact with the HTML files
//and it’s the HTML files that are going to be displayed to the user.
//The component.ts is the main file of a component. This component is the body of
//the SPA and will display all the entries in the database to the user.
export class EntriesComponent implements OnInit {

  //The names of our columns which will be displayed in the entries.component.html.
  //The variable displayedColumns is used there.
  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions'];

  //This property will contain all the entries from our database in the form
  //of EntryElement (an interface we defined). This variable is used in the
  //entries.component.html in the table tag. We don't always need to define
  //the type and initialize it, but if we wanted to, we would write
  //dataSource: MatTableDataSource<EntryElement> = null;
  dataSource;

  constructor(private service: EntryService,
              private dialog: MatDialog) { }

  //This method is called when the component is loaded and basically calls the method
  //getAll from the entry.service.ts which will send a request to the Web API in order
  //to get all the requests from the database. Then, we do subscribe on the observable
  //that we get in return from the response of the Web API and it's from that observable
  //that we can extract our data (the entries of the database) and that we can log them
  //and store them as an array of EntryElement in the dataSource property variable
  //(of type MatTableDataSource) so that our table in entries.component.html can access
  //this dataSource and display our entries correctly.
  ngOnInit() {
    this.service.getAll().subscribe( (data) => {
      
      //Assigning all the entries we just received (received an array of them) to
      //the dataSource so that the list has now access to them.
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
    });
  }

  //Method called in the entries.components.html file by the onclick attribute
  //of the edit button. The method receives the EntryElement that needs to be updated.
  updateEntry(entry:EntryElement) {
    
    //Assigning the fields of the entry that will be displayed on the edit screen
    //with the fields of the entry that was selected to be updated.
    this.dialog.open(UpdateEntryComponent, {
      data: {
        Id: entry.Id,
        Description: entry.Description,
        IsExpense: entry.IsExpense,
        Value: entry.Value
      }
    });
  }
}