import styles from "./HangmanTextField.module.css"

interface TextFieldProps {
  value: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const HangmanTextField = ({ value, onChange, onFocus, onBlur }: TextFieldProps) => {
  return (
    <input className = {`${styles.input}`}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onFocus = {onFocus}
      onBlur = {onBlur}
    />
  );
};

export default HangmanTextField;