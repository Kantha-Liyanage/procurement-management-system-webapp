import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, Material } from 'src/app/models/master';
import { MasterDataService } from 'src/app/services/master.data.service';

@Component({
  selector: 'app-material-picker',
  templateUrl: './material-picker.component.html',
  styleUrls: ['./material-picker.component.css']
})
export class MaterialPickerComponent implements OnInit {

  name : string = "";
  category : number = 0;
  categories : Array<Category> = new Array<Category>();
  materials : Array<Material> = new Array<Material>();

  constructor(private activeModal: NgbActiveModal,
              private masterDataService : MasterDataService) { }

  ngOnInit() {
    //Get list items
    this.getCategories();
  }

  getCategories(){
    this.masterDataService.getCategories().subscribe(
      (res)=>{
        let objArray = <Array<any>>res;
        objArray.forEach((val, index, array)=>{
          let cat = new Category();
          cat.id = val.id;
          cat.name = val.name;
          this.categories.push(cat);
        });
      },
      (err)=>{
        debugger;
      }
    );
  }

  selectMaterial(material : Material){
    this.activeModal.close(material);
  }

  search(){
    this.materials = new Array<Material>();
    if(this.category > 0){
      this.masterDataService.searchMaterialsByCategoryAndName(this.category, this.name).subscribe(
        (res)=>{
          let objArray = <Array<any>>res;
          objArray.forEach((val, index, array)=>{
            let cat = <Material>val;
            this.materials.push(cat);
          });
        },
        (err)=>{
          debugger;
        }
      );
    }
    else{
      this.masterDataService.searchMaterialsByName(this.name).subscribe(
        (res)=>{
          debugger;
          let objArray = <Array<any>>res;
          objArray.forEach((val, index, array)=>{
            let cat = <Material>val;
            this.materials.push(cat);
          });
        },
        (err)=>{
          debugger;
        }
      );
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
