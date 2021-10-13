export interface IAccountModel {
    key: string;
    createDate: Date;
    createBy: string;
    updateDate: Date;
    updateBy: string;
    status: number;

    accountType: any;
    lastName: string;
    firstName: string;
    email: string | null;
    gender: any;
    dateOfBirth: any;
    province: any
    photoUrl?: string | null;
}