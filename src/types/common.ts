export type Transaction = {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  description: string;
  type: "Import" | "Export";
  amount: number;
  customer: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Settings = {
  theme: "sap_horizon" | "sap_horizon_dark";
  language: "en" | "vi";
};
