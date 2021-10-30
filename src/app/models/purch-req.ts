import { Material } from "./master";

export class PurchReq{
    id : number = 0;
    siteId : number = 0;
    remarks : string = "";
    overallStatus : string = "New";
    createdBy : string = "";
    createdDate : string = "";
    totalValue : number = 0;
    approvedValue :number = 0;
    siteName : string = "";
    items : Array<PurchReqItem> = new Array<PurchReqItem>();

    addNewItem(){
        this.items.push(new PurchReqItem());
        this.refreshNos();
    }

    getItem(position:number){
        return this.items[position-1];
    }

    updateGrandTotal(){
        this.approvedValue = 0;
        this.items.forEach(item=>{
          this.approvedValue += item.unitPrice * item.approvedQuantity;
        });
    }

    deleteItem(no:number){
        this.items.splice(no-1, 1);
        this.refreshNos();
    }

    refreshNos(){
        let newNo : number = 1;
        this.items.map(
            item=>{
                item.itemId = newNo;
                newNo++;
            }
        );
    }

}

export class PurchReqItem{
    itemId : number = 0;
    materialId : number = 0;
    materialName : string = "";
    materialCategory : string = "";
    uom : string = "";
    requiredQuantity : number = 0;
    approvedQuantity : number = 0;
    requiredDate : any = "";
    priceUnit : number = 0;
    unitPrice : number = 0;
    subTotal : number = 0;
    remarks : string = "";
    status : string = "New";
    supplierName : string = "";
    leadTimeDays : number = 0;

    setItemMaterial(material:Material){
        this.materialId = material.id;
        this.materialName = material.name;
        this.materialCategory = material.categoryName;
        this.uom = material.unitOfMeasureName;
        this.priceUnit = material.priceUnit;
        this.unitPrice = material.unitPrice;
    }

    updateSubtotal(){
        this.subTotal = this.requiredQuantity * this.unitPrice;
    }
}