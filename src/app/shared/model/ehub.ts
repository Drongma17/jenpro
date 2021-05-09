export interface Ehub {
    id: number;
    title: string;
    ehubName:string;
    email:string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    batch: string;
    allocatedAmount: number;
    allocateDate: string;
    totalDisbursed: number;
    businessName:string;
    address: string;
    briefIntroduction: string;
    about:string;
    ehubCategoryName:string;
    fileName:string;
 }
 
 export interface Ehubfinance{
    id: number;
    purpose: number;
    allocatedAmount: number;
    allocatedDate: string;
    disburseDate: string;
    disburseAmount: number;
    grandTotal: number;
 }