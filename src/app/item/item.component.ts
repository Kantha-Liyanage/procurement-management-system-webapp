import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemSearchText : string;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  searchItem(){
    
  }

  openNewItem(){
    this.router.navigateByUrl('/new-item');
  }
}
