import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import RadioField from "@/app/components/common/inputFields/RadioInput";
import SelectField from "@/app/components/common/inputFields/SelectField";
import TimePicker from "@/app/components/common/inputFields/TimePicker";
import {
  castOptions,
  cityOptions,
  degreeOptions,
  doshOptions,
  dropdownOptions,
  incomeRangeOptions,
  manglikOptions,
  motherTongueOptions,
  occupationOptions,
  religionOptions,
  starOptions,
  stateOptions,
} from "@/constants/dummyConstants";
import { basicPanelFormFields } from "@/constants/formConstants";
import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const tabs = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Education & Career" },
  { id: 3, label: "Lifestyle & Habits" },
  { id: 4, label: "Location & Religion" },
  { id: 5, label: "Family Details" },
];

interface SubTabProps {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  options: any;
}
interface PartnerPreferencesProps {
  values: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  options: any;
}

const PartnerPreferences: React.FC<PartnerPreferencesProps> = ({
  values,
  handleChange,
  errors,
  touched,
  activeTab,
  setActiveTab,
  options,
}) => {
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-darkBlue">Partner Preferences</h2>
      <div className="flex items-center justify-between mt-4 mb-6 w-full">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center w-full last:w-auto">
            <button
              className={`
          w-10 h-10 flex items-center justify-center rounded-full border text-sm font-semibold transition
          ${
            activeTab >= tab.id
              ? "bg-primary text-white border-primary"
              : "border-2 border-gray text-normal bg-gray50"
          }
        `}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.id}
            </button>
            {index !== tabs.length - 1 && (
              <div
                className={`h-1 flex-grow mx-2 transition-all ${
                  activeTab >= tab.id ? "bg-primary" : "bg-gray50"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 1 && (
          <BasicInfo
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            options={options}
          />
        )}
        {activeTab === 2 && (
          <ReligionInfo
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            options={options}
          />
        )}
        {activeTab === 3 && (
          <LocationInfo
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            options={options}
          />
        )}
        {activeTab === 4 && (
          <EducationInfo
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            options={options}
          />
        )}
        {activeTab === 5 && (
          <CriteriaInfo
            values={values}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            options={options}
          />
        )}
      </div>
    </div>
  );
};
export default PartnerPreferences;

function BasicInfo({
  values,
  handleChange,
  errors,
  touched,
  options,
}: SubTabProps) {
  console.log(errors);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {basicPanelFormFields.map((item, i) => {
          const fieldName =
            item.name === "age"
              ? "ageFrom"
              : item.name === "height"
              ? "heightFrom"
              : item.name;
          console.log(errors[fieldName], touched[fieldName]);

          return (
            <div
              key={i}
              className={item.isRange ? "grid grid-cols-2 gap-2 items-end" : ""}
            >
              <Field
                as={SelectField}
                label={item.label}
                name={fieldName}
                value={values[fieldName]}
                touched={touched[fieldName]}
                errors={errors[fieldName]}
                options={item.options}
                className="w-full"
              />
              {item.isRange && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`${item.name}To`}
                    className="text-sm text-darkBlue font-semibold leading-5 mt-2"
                  >
                    To
                  </label>
                  <Field
                    as={SelectField}
                    name={`${item.name}To`}
                    value={values[`${item.name}To`]}
                    touched={touched[`${item.name}To`]}
                    errors={errors[`${item.name}To`]}
                    options={item.options}
                    className={`max-w-48`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReligionInfo({
  values,
  handleChange,
  errors,
  touched,
  options,
}: SubTabProps) {
  const { setFieldValue } = useFormikContext();
  const [filteredCasteOptions, setFilteredCasteOptions] = useState([]);
  useEffect(() => {
    const selectedReligion = options?.Religion?.find(
      (r: any) => r.value === values?.horoscopeDetails?.religion
    );

    if (
      selectedReligion &&
      options?.Caste &&
      Array.isArray(options?.Caste) &&
      options?.Caste.length > 0
    ) {
      setFilteredCasteOptions(
        options?.Caste.filter(
          (item: any) => item?.parentId === selectedReligion?._id
        )
      );
    } else {
      setFilteredCasteOptions([]);
    }
  }, [values?.horoscopeDetails?.religion, options?.Caste]);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Religion Info</h3>
      <div className="grid grid-cols-2 gap-4">
        <Field
          as={SelectField}
          label={"Religion"}
          name={"horoscopeDetails.religion"}
          value={values?.horoscopeDetails.religion}
          touched={touched?.horoscopeDetails?.religion}
          errors={errors?.horoscopeDetails?.religion}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={options?.Religion}
          className="w-full"
        />
        {/* <div className="mt-4">
          <label className="mb-2 text-sm text-darkBlue font-semibold leading-5">
            Caste
          </label>
          <div className="flex flex-wrap gap-4 mt-3">
            {["Brahmin", "Kshatriya", "Vaishya", "Shudra"].map((option) => (
              <RadioField
                key={option}
                name="horoscopeDetails.caste"
                label={option}
                value={option}
                checked={values.horoscopeDetails.caste === option}
                onChange={(val) => setFieldValue("horoscopeDetails.caste", val)}
              />
            ))}
          </div>
        </div> */}
        <Field
          as={SelectField}
          label={"Caste"}
          name={"horoscopeDetails.caste"}
          value={values?.horoscopeDetails?.caste}
          touched={touched?.horoscopeDetails?.caste}
          errors={errors?.horoscopeDetails?.caste}
          options={filteredCasteOptions}
          className="w-full"
        />
        <Field
          as={SelectField}
          label={"Mother Tongue"}
          name={"horoscopeDetails.motherTongue"}
          value={values?.horoscopeDetails.motherTongue}
          touched={touched?.horoscopeDetails?.motherTongue}
          errors={errors?.horoscopeDetails?.motherTongue}
          options={motherTongueOptions}
          className="w-full"
        />
        <Field
          as={SelectField}
          label={"Manglik"}
          name={"horoscopeDetails.manglik"}
          value={values?.horoscopeDetails?.manglik}
          touched={touched?.horoscopeDetails?.manglik}
          errors={errors?.horoscopeDetails?.manglik}
          options={manglikOptions}
          className="w-full"
        />
        <Field
          as={SelectField}
          label={"Star"}
          name={"horoscopeDetails.star"}
          value={values?.horoscopeDetails.star}
          touched={touched?.horoscopeDetails?.star}
          errors={errors?.horoscopeDetails?.star}
          options={starOptions}
          className="w-full"
        />
        <Field
          as={SelectField}
          label={"Dosh"}
          name={"horoscopeDetails.dosh"}
          value={values?.horoscopeDetails?.dosh}
          touched={touched?.horoscopeDetails?.dosh}
          errors={errors?.horoscopeDetails?.dosh}
          options={doshOptions}
          className="w-full"
        />
        {/* <Field
          as={SelectField}
          label={"Birth Place"}
          name={"horoscopeDetails.birthPlace"}
          value={values?.horoscopeDetails?.birthPlace}
          touched={touched?.horoscopeDetails?.birthPlace}
          errors={errors?.horoscopeDetails?.birthPlace}
          options={cityOptions}
          className="w-full"
        /> */}
        <Field
          as={InputField}
          label={"Birth Place"}
          placeholder={"Birth Place"}
          name={"horoscopeDetails.birthPlace"}
          value={values?.horoscopeDetails?.birthPlace}
          touched={touched?.horoscopeDetails?.birthPlace}
          error={errors?.horoscopeDetails?.birthPlace}
          // options={cityOptions}
          className="w-full mt-4"
        />
        <Field
          as={TimePicker}
          label={"Birth Time"}
          name={"horoscopeDetails.birthTime"}
          value={values?.horoscopeDetails?.birthTime}
          touched={touched?.horoscopeDetails?.birthTime}
          errors={errors?.horoscopeDetails?.birthTime}
          className="w-full"
        />
      </div>
    </div>
  );
}

function LocationInfo({
  values,
  handleChange,
  errors,
  touched,
  options,
}: SubTabProps) {
  const { setFieldValue } = useFormikContext();
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Location Info</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* <Field
          as={SelectField}
          label={"Country"}
          name={"FamilyDetails.country"}
          value={values?.FamilyDetails.country}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        /> */}
        <Field
          as={SelectField}
          label={"State"}
          name={"FamilyDetails.state"}
          value={values?.FamilyDetails.state}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={stateOptions}
          className="w-full"
        />
        <Field
          as={SelectField}
          label={"City"}
          name={"FamilyDetails.city"}
          value={values?.FamilyDetails?.city}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={options?.City}
          className="w-full"
        />
        {/* <div className="mt-4">
          <label className="mb-2 text-sm text-darkBlue font-semibold leading-5">
            City
          </label>
          <div className="flex flex-wrap gap-4 mt-3">
            {["Mumbai", "Banglore", "Delhi", "Hyderabad"].map((option) => (
              <RadioField
                key={option}
                name="FamilyDetails.city"
                label={option}
                value={option}
                checked={values.horoscopeDetails.caste === option}
                onChange={(val) => setFieldValue("FamilyDetails.city", val)}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

function EducationInfo({
  values,
  handleChange,
  errors,
  touched,
  options,
}: SubTabProps) {
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Education Info</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {/* Education Radio Buttons */}
        <Field
          as={SelectField}
          label="Education"
          name="Education.education"
          value={values?.Education.education}
          options={options?.Education || []}
          className="w-full"
        />
        {/* <div className="mt-4">
          <label className="mb-2 text-sm text-darkBlue font-semibold leading-5">
            Education
          </label>
          <div className="flex flex-wrap gap-4 mt-3">
            {["M.Phil", "BSc IT", "B Tech", "BA"].map((option) => (
              <RadioField
                key={option}
                name="Education.education"
                label={option}
                value={option}
                checked={values.Education.education === option} // Ensure checked state
                onChange={(val) => setFieldValue("Education.education", val)} // Update Formik state
              />
            ))}
          </div>
        </div> */}

        {/* Occupation Dropdown */}
        <Field
          as={SelectField}
          label="Occupation"
          name="Education.occupation"
          value={values?.Education.occupation}
          options={options?.Occupation}
          className="w-full"
        />

        {/* Annual Income Dropdown */}
        <Field
          as={SelectField}
          label="Annual Income"
          name="Education.income"
          value={values?.Education.income}
          options={incomeRangeOptions}
          className="w-full"
        />
      </div>
    </div>
  );
}

function CriteriaInfo({
  values,
  handleChange,
  errors,
  touched,
  options,
}: SubTabProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Criteria Info</h3>
      <div className="w-full">
        <Field
          as={InputField}
          label={"Partner Expectation"}
          name={"partnerExpectation"}
          type="textarea"
          value={values.partnerExpectation}
          className="w-full"
          error={errors.fullName}
          touched={touched.fullName}
        />
      </div>
    </div>
  );
}
