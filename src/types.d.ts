interface IMandatoryContributions {
  philHealth: number;
  pagibig: number;
  sss: number;
  sssMpf: number;
  gsis: number;
  philHealthYear: number;
}

type IEmployerType = "govt" | "pvt";

interface ITaxable {
  gross: number;
  taxable: number;
  nonTaxable: number;
  totalContribution: number;
  deminimis: number;
}

interface IBracket {
  condition: (taxableIncome: number) => bool;
  calculate: (taxableIncome: number) => number;
}

interface IBracketInfo {
  condition: (taxableIncome: number) => bool;
  display: string;
}

interface ITaxSummary extends ITaxable {
  taxDue: number;
  takeHome: number;
  taxComputation: string;
  period: ISummaryPeriod;
}

interface IIncomeForm {
  monthly: string;
  deminimis: string;
  employerType: IEmployerType;
}

type ISummaryPeriod = "Annual" | "Monthly" | "Biweekly";
