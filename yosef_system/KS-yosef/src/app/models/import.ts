export interface Import{
    import_date : Date;
    items : Imported_Items[];
    grandTotal : Number;
}
export interface Imported_Items{
    part_number : String;
    stamp : String;
    description : String;
    remark : String;
    imported_quantity : Number;
    foreign_unit_cost : Number;
    foreign_total : Number;
    local_cost : Number;
    local_total : Number;
    origin : String;
    factory_cost : Number;
    price : Number
}