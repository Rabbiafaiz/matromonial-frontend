import {
  ageOptions,
  castOptions,
  cityOptions,
  degreeOptions,
  doshOptions,
  employmentOptions,
  familyStatusOptions,
  familyTypeOptions,
  familyValueOptions,
  foodPreferencesOptions,
  genderOptions,
  heightOptions,
  incomeRangeOptions,
  lookingForOptions,
  manglikOptions,
  maritalStatus,
  motherTongueOptions,
  occupationOptions,
  physicalStatusOptions,
  religionOptions,
  starOptions,
  stateOptions,
  yesNoOptions,
} from "./dummyConstants";

export const mainTabs: string[] = ["My Account", "Basic Info", "Preferences"];
export const subTabs: string[] = [
  "Basic",
  "Religion",
  "Location",
  "Education",
  "Criteria",
];
export const basicInfoTabs: string[] = ["Basic", "Personal"];
export const religionFormFields = [
  { label: "Religion", name: "religion", options: religionOptions },
  { label: "Caste", name: "caste", options: castOptions },
  {
    label: "Mother Tongue",
    name: "motherTongue",
    options: motherTongueOptions,
  },
  { label: "Manglik", name: "manglik", options: manglikOptions },
  { label: "Star", name: "star", options: starOptions },
  { label: "Dosh", name: "dosh", options: doshOptions },
  { label: "Birth Place", name: "birthPlace", options: cityOptions },
];
export const basicPanelFormFields = [
  { label: "Age", name: "age", isRange: true, options: ageOptions },
  { label: "Height", name: "height", isRange: true, options: heightOptions },
  { label: "Looking For", name: "lookingFor", options: lookingForOptions },
  {
    label: "Physical Status",
    name: "physicalStatus",
    options: physicalStatusOptions,
  },
  { label: "Food", name: "food", options: foodPreferencesOptions },
  { label: "Smoking", name: "smoking", options: yesNoOptions },
  { label: "Drinking", name: "drinking", options: yesNoOptions },
  { label: "Family Type", name: "familyType", options: familyTypeOptions },
  {
    label: "Family Status",
    name: "familyStatus",
    options: familyStatusOptions,
  },
  { label: "Family Value", name: "familyValue", options: familyValueOptions },
  {
    label: "Father’s Occupation",
    name: "fathersOccupation",
    options: occupationOptions,
  },
  // { label: "Weight", name: "weight" },
  // { label: "Body Type", name: "bodyType" },
  // { label: "Complexion", name: "complexion" },
];
export const basicInfoFormFields = [
  { label: "Date Of Birth", name: "dateOfBirth" },
  { label: "Age", name: "age", options: ageOptions },
  { label: "Gender", name: "gender", options: genderOptions },
  { label: "Height", name: "height", options: heightOptions },
  { label: "Religion", name: "religion", options: religionOptions },
  { label: "Caste", name: "sect", options: castOptions },
  { label: "Martial Status", name: "maritalStatus", options: maritalStatus },
  {
    label: "Mother Tongue",
    name: "motherTongue",
    options: motherTongueOptions,
  },
  { label: "City", name: "city", options: cityOptions },
];
export const personalPanelFields = [
  { label: "Highest Degree", name: "highestDegree", options: degreeOptions },
  { label: "Occupation", name: "occupation", options: occupationOptions },
  { label: "Employment", name: "employedIn", options: employmentOptions },
  { label: "Annual Income", name: "annualIncome", options: incomeRangeOptions },
  { label: "Work Location", name: "workLocation", options: cityOptions },
];
export const locaitonFields = [
  {
    label: "Country",
    name: "country",
    options: [{ value: "India", label: "India" }],
  },
  { label: "State", name: "state", options: stateOptions },
  { label: "City", name: "city", options: cityOptions },
];
export const educationFields = [
  { label: "Education", name: "education", options: degreeOptions },
  { label: "Occupation", name: "occupation", options: occupationOptions },
  { label: "Annual Income", name: "annualIncome", options: incomeRangeOptions },
];
