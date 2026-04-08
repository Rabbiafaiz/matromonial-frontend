import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { personalPanelFields } from "@/constants/formConstants";
import { Field } from "formik";

interface PersonalDetailsProps {
  values: any;
  // handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  options: any;
}

const PersonalDetailForm: React.FC<PersonalDetailsProps> = ({
  values,
  handleChange,
  errors,
  touched,
  options,
}) => {
  return (
    <>
      <h2 className="text-[24px] leading-[28.8px] w-full text-darkBlue font-semibold">
        Personal Details
      </h2>

      {personalPanelFields?.map((fieldData, index) => (
        <Field
          as={SelectField}
          key={index}
          label={fieldData.label}
          name={fieldData.name}
          value={values[fieldData.name]}
          // onChange={handleChange}
          options={
            options[fieldData.label] ||
            (fieldData.name === "workLocation" && options?.City) || (fieldData.name === "highestDegree" && options?.Education) ||
            fieldData.options
          }
          className="w-full sm:w-[47%]"
          error={errors[fieldData.name]}
          touched={touched[fieldData.name]}
        />
      ))}
    </>
  );
};

export default PersonalDetailForm;
