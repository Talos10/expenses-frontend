import { RouterModule, Routes } from '@angular/router';

//Components
import { EntriesComponent } from './entries/entries.component';
import { NgModule } from '@angular/core';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';



//Defining the possible routes. And so, when we add the variable "path"
//to the existing URL path (so if we add entries), then load the component
//that is specified by the component property (so load EntriesComponent).
//These routes will be used in the routerLink="" attribute for the buttons
//of the header of the website so that the user can navigate. It is good
//to define the routes starting from the most specific to the least specific
//because if there is more than one way that we can go somewhere then the
//first match will be chosen.
const routes:Routes = [
    {path: 'delete-entry/:id', component: DeleteEntryComponent},
    {path: 'entries', component: EntriesComponent},
    {path: 'new-entry', component: NewEntryComponent},
    {path: '', component: EntriesComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule{}