import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntryElement } from './interfaces/EntryElement';

//This method called injectable will basically tell our Angular application that
//you can inject this service and use its methods or properties from wherever you
//want within our application.
@Injectable({
  providedIn: 'root'
})

//Services allow us to access their methods and properties across other components in the entire project. 
//This service will be used to call the HTTP end points in our Web API.
//Don't forget to configure a new service by going to the app.module.ts file
//and importing the service and then adding it to the providers section.
export class EntryService {

  //This is the API URL from which we will fetch our data. This URL was retrieved
  //from the properties section of the Web API project in Visual Code.
  //Since we are going to send all the requests to the same API URL, it is a good
  //idea to make the URL a property of our service class.
  baseUrl: string = 'http://localhost:60996/api/entries/';

  //The http variable here is seen as a property of our class even though we didn't
  //specifically declare it like the baseUrl property and even if we didn't assign
  //it in the constructor (actually, it won't allow us to right it as the
  //baseUrl as well and then assign it with this.http = http in the constructor since
  //it will say that we just declared the variable twice and now have a duplicate).
  constructor(private http: HttpClient) { }

  //This is the method that is going to be used to get all the entries from the database.
  //It will generate an observable to which we need to subscribe in order to access the data.
  getAll() {
    return this.http.get(this.baseUrl);
  }

  //This is the method that is going to be used to get a specific entry with a given id (that
  //will be matched to the primary key in the db) from the database.
  //It will generate an observable to which we need to subscribe in order to access the data.
  getEntry(id: number) {
    return this.http.get(this.baseUrl + '/' + id);//We attach the id to our baseUrl because we want to refer to a specific entry.
  }

  //Method used to create an HTTP post request containing the entry that we want to add
  //to the database and we send it to the url of our Web API (the address of where we send our post request).
  createEntry(entry: EntryElement) {
    return this.http.post(this.baseUrl, entry);
  }

  //Method used to create an HTTP put request containing the id of the entry that we want to modify
  //and the entry itself to the database and we send it to the url of our Web API 
  //(the address of where we send our put request).
  updateEntry(id: number, entry: EntryElement) {
    return this.http.put(this.baseUrl + '/' + id, entry);
  }

  //Method used to create an HTTP delete request containing the id of the entry that we want to delete
  //we send it to the url of our Web API (the address of where we send our delete request).
  deleteEntry(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}