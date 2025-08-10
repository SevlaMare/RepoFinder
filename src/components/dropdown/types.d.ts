export interface SelectProps<T extends string> {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
  variant?: string;
}
