import { Option } from "../../../types/ui";
import { Field } from "../field";
import style from "./style.module.css";

export interface FormSelectProps {
  options: Option[];
  registerProps: object;
  error?: string;
  id: string;
  label?: string;
}

export const FormSelect = ({
  options,
  registerProps,
  error,
  id,
  label,
}: FormSelectProps) => (
  <Field>
    {!!label && <label htmlFor={id}>{label}</label>}
    <select id={id} className={style.formSelect} {...registerProps}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <p className="form__error">{error}</p>
  </Field>
);
