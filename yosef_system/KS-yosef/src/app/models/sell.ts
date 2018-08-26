import { Parts } from "./parts"
export class Sell{
    sellId ? : Number
    buyerName ? : String
    buyerPhoneNumber ? : String
    buyerTinNumber ? : String
    personInCharge ? : String
    parts ? : Parts[]
    quantity ? : Number
    subTotal ? : Number
    grandTotal ? : Number
    date ? : Date
}