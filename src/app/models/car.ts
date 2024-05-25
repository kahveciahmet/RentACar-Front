export interface Car{
    id:number;
    brandId:number;
    colorId:number;
    brandName?:string;
    colorName?:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    transmissionType:string;
    dailyKmLimit:number;
    seatingCapacity:number;
    licenseAge:number;
    renterAge:number;
}