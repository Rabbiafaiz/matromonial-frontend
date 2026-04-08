export type InitialValuesProps = {
  gender: string;
  dateOfBirth: string;
  occupation: string;
  employedIn: string;
  annualIncome: string;
  workLocation: string;
  age: string;
  fullName: string;
  maritalStatus: string;
  religion: string;
  height: string;
  motherTongue: string;
  sect: string;
  city: string;
  highestDegree: string;
  ageFrom: string;
  ageTo: string;
  heightFrom: string;
  heightTo: string;
  lookingFor: string;
  physicalStatus: string;
  food: string;
  smoking: string;
  drinking: string;
  familyType: string;
  familyStatus: string;
  familyValue: string;
  fathersOccupation: string;
  horoscopeDetails: {
    dosh: string;
    star: string;
    birthTime: string;
    birthPlace: string;
    religion: string;
    caste: string;
    motherTongue: string;
    manglik: string;
  };
  FamilyDetails: {
    // numOfBrothers: string;
    // numOfMarriedBrothers: string;
    // numOfSisters: string;
    // numOfMarriedSisters: string;
    // country: string;
    state: string;
    city: string;
  };
  Education: {
    education: string;
    occupation: string;
    income: string;
  };
  partnerExpectation: string;
};



export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldConstantsProps = {
  label: string;
  name: string;
  options: SelectOption[];
}[];

export type SelectFieldProps = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  error?: string;
  touched?: boolean;
};

export type InputFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
};

export type initialValuesPersonalProps = {
  hd: string;
  occupation: string;
  employment: string;
  ai: string;
  wl: string;
};


export interface FormData {
  [key: string]: string | string[];
}