export class Supplier{
    code        : string = "";
    name        : string = "";
    contactNo   : string = "";
    address     : string = "";
    isBlocked   : boolean = false;
    remarks     : string = "";
    createdTime : string = "";
    createdBy   : string = ""; 
    changedTime : string = "";
    changedBy   : string = "";
}

export class Category{
    name        : string = "";
    header      : string = "Root";
    createdTime : string = "";
    createdBy   : string = ""; 
}

export class CategoryTreeItem{
    name        : string = "";
    description : string = "";
  }

export class Item{
    code            : string = "";
    name            : string = "";
    category        : string = "";
    supplier        : string = "";
    isBlocked       : boolean = false;
    sellingPrice    : number = 0;
    remarks         : string = "";
    createdTime     : string = "";
    createdBy       : string = ""; 
    changedTime     : string = "";
    changedBy       : string = "";
}

export class GoodsReceipt{
    supplier        : string = "";
    invoice         : string = "";
    date            : string = "";
    discount        : number = 0;
    remarks         : string = "";
    status          : string = "";
    createdTime     : string = "";
    createdBy       : string = ""; 
    changedTime     : string = "";
    changedBy       : string = "";
    items           : Array<GoodsReceiptItem> = new Array<GoodsReceiptItem>();

    addNewItem(){
        this.items.push(new GoodsReceiptItem());
        this.refreshNos();
    }

    deleteItem(no:number){
        this.items.splice(no-1, 1);
        this.refreshNos();
    }

    refreshNos(){
        let newNo : number = 1;
        this.items.map(
            item=>{
                item.no = newNo;
                newNo++;
            }
        );
    }
}

export class GoodsReceiptItem{
    no          : number = 0;
    item        : string = "";
    quantity    : number = 0;
    subTotal    : number = 0;
}

export class SalesInvoice{
    invoice         : string = "";
    date            : string = "";
    discount        : number = 0;
    remarks         : string = "";
    status          : string = "";
    createdTime     : string = "";
    createdBy       : string = ""; 
    changedTime     : string = "";
    changedBy       : string = "";
    items           : Array<SalesInvoiceItem> = new Array<SalesInvoiceItem>();

    addNewItem(){
        this.items.push(new SalesInvoiceItem());
        this.refreshNos();
    }

    deleteItem(no:number){
        this.items.splice(no-1, 1);
        this.refreshNos();
    }

    refreshNos(){
        let newNo : number = 1;
        this.items.map(
            item=>{
                item.no = newNo;
                newNo++;
            }
        );
    }
}

export class SalesInvoiceItem{
    no          : number = 0;
    item        : string = "";
    quantity    : number = 0;
    discount    : number = 0;
    subTotal    : number = 0;
}