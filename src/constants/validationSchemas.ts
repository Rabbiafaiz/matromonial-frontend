import * as Yup from "yup";

export const completeProfileValidation = Yup.object({
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  occupation: Yup.string().required("Occupation is required"),
  employedIn: Yup.string().required("Employment status is required"),
  annualIncome: Yup.string().required("Annual income is required"),
  workLocation: Yup.string().required("Work location is required"),
  fullName: Yup.string().required("Full name is required"),
  age: Yup.string().required("Age is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  religion: Yup.string().required("Religion is required"),
  height: Yup.string().required("Height is required"),
  motherTongue: Yup.string().required("Mother tongue is required"),
  sect: Yup.string().required("Cast is required"),
  city: Yup.string().required("City is required"),
  highestDegree: Yup.string().required("Highest degree is required"),

  ageFrom: Yup.string().required("Age from is required"),
  ageTo: Yup.string()
    .required("Age to is required")
    .test(
      "age-range",
      "Age To must be greater than Age From",
      function (value) {
        return value > this.parent.ageFrom;
      }
    ),
  heightFrom: Yup.string().required("Height from is required"),
  heightTo: Yup.string()
    .required("Height to is required")
    .test(
      "height-range",
      "Height To must be greater than Height From",
      function (value) {
        return value > this.parent.heightFrom;
      }
    ),
  lookingFor: Yup.string().required("Looking for is required"),
  physicalStatus: Yup.string().required("Physical status is required"),
  food: Yup.string().required("Food preference is required"),
  smoking: Yup.string().required("Smoking preference is required"),
  drinking: Yup.string().required("Drinking preference is required"),
  familyType: Yup.string().required("Family type is required"),
  familyStatus: Yup.string().required("Family status is required"),
  familyValue: Yup.string().required("Family values are required"),
  fathersOccupation: Yup.string().required("Father’s occupation is required"),

  horoscopeDetails: Yup.object({
    dosh: Yup.string().required("Dosh is required"),
    star: Yup.string().required("Star is required"),
    birthTime: Yup.string().required("Birth time is required"),
    birthPlace: Yup.string().required("Birth place is required"),
    religion: Yup.string().required("Religion is required"),
    caste: Yup.string().required("Caste is required"),
    motherTongue: Yup.string().required("Mother tongue is required"),
    manglik: Yup.string().required("Manglik status is required"),
  }),

  FamilyDetails: Yup.object({
    // numOfBrothers: Yup.number().required("Number of brothers is required"),
    // numOfMarriedBrothers: Yup.number().required("Number of married brothers is required"),
    // numOfSisters: Yup.number().required("Number of sisters is required"),
    // numOfMarriedSisters: Yup.number().required("Number of married sisters is required"),
    // country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
  }),

  Education: Yup.object({
    education: Yup.string().required("Education is required"),
    occupation: Yup.string().required("Occupation is required"),
    income: Yup.string().required("Income is required"),
  }),

  partnerExpectation: Yup.string().required("Partner expectation is required"),
});
