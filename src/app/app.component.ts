import { Component } from '@angular/core';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  availableItems: Item[] = [];

  addToAvailableItems(itemToAdd: Item) {
    const hasItem = this.availableItems.findIndex(asi => asi.name === itemToAdd.name);
    if (hasItem === -1) {
      this.availableItems.push(itemToAdd);
    }
  }
}
