type planItem = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featureClr: string;
  buttonLabel: string;
  bgColor: string;
  textColor: string;
  priceColor: string;
  buttonBgColor: string;
  borderColor: string;
  buttonTextColor: string;
  variant: "primary" | "secondary" | "transparent";
};

export type PlanItems = planItem[];