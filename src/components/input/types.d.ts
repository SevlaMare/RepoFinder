export interface InputProps {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  id?: string;
  type?: string;
  name?: string;
  'aria-label'?: string;
  variant?: Variant;
  min?: string;
  max?: string;
}
