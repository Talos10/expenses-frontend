import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { EntryElement } from '../interfaces/EntryElement';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})

//A class which represents the confirmation screen for when we want to delete an entry.
export class DeleteEntryComponent implements OnInit {

  id: number;
  entry = {
    description: '',
    isExpense: false,
    value: 0
  };

  constructor(private route: ActivatedRoute,
              private service: EntryService,
              private router: Router) { }

  ngOnInit(): void {
    //This will allow us to get the id of the entry that we want to delete.
    this.id = +this.route.snapshot.paramMap.get('id');

    this.service.getEntry(this.id).subscribe((data: EntryElement) => {

      //Assigning the fields of the entry we are about to remove with the
      //the fields of the data that we just received from the Web API.
      this.entry.description = data.Description;
      this.entry.isExpense = data.IsExpense;
      this.entry.value = data.Value;
    });
  }

  //If the user clicks the cancel button, we redirect them to the /entries
  //path which is the list with all the entries.
  cancel() {
    this.router.navigate(['/entries']);
  }

  //Method which calls the deleteEntry method which sends a request to the Web API
  //to delete the entry with the specific id we gave it.
  confirm() {
    this.service.deleteEntry(this.id).subscribe(data => {//We set the id on line 28.
      
    //We can log a message here if we want.
    
    //If we are here, it means that the entry was deleted successfully so we can now
    //redirect the user back to the list of entries. Also, keep this statement here
    //or else the entry we just deleted will still be in the list (but you'll have to
    //refresh the page in order for it to disappear).
    this.router.navigate(['/entries']);    
    });    
  }
}