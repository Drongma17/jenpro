export interface Entrepreneurs {
    id: number;
    title: string;
    entrepreneurName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    businessName: string;
    totalDisbursed: number;
    address: string;
    about: string;
    fileName: string;
    dateOfBirth: any;
    allocateDate: any;
    briefIntroduction: string;
    allocatedAmount: number;
    categoryName:string;
    finances: (Finance) [];
}

export interface Finance{
    id: number;
    purpose: number;
    allocatedAmount: number;
    allocatedDate: string;
    disburseDate: string;
    disburseAmount: number;
    grandTotal: number;
}