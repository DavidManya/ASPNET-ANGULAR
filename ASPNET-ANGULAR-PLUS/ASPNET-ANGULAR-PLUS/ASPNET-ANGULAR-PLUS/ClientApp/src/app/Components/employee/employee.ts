import { IAddress } from "../employee/address/address";

export interface IEmployee
{
  employeeId: number;
  dni: string;
  name: string;
  surnames: string;
  job: string;
  email: string;
  salary: number;
  addresses: IAddress[];
}
