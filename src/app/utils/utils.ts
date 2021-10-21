export class Utils{
    public static toAngularDate(date : string) : any{
        var temp = date.substring(0,10).split("-");
        return { year: parseInt(temp[0]), month:parseInt(temp[1]), day: parseInt(temp[2]) };
    }

    public static toDotNetDate(date : any) : string{
        return date["year"] + "-" + date["month"] + "-" + date["day"];
    }   
    
    public static toDisplayDate(date : string) : string{
        return date.substring(0,10);
    }
}