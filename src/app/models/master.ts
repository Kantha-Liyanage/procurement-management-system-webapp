export class Site{
    username : string;
    site : number;
    name : string;
}

export class Category{
    id : number = 0;
    name : string = "";
}

export class Material{
    id : number = 0;
    name : string = "";
    categoryId : number = 0;
    supplierId : number = 0;
    unitOfMeasureId : number = 0;
    priceUnit : number = 0;
    unitPrice : number = 0;
    leadTimeDays : number = 0;
    categoryName : string = "";
    supplierName : string = "";
    unitOfMeasureName : string = "";
}