export type Task = {
  id: string;
  name: string;
  priority: string;
  status: string;
  difficulty: string;
  estimate: string;
  created: string;
  finished: string | null;
};

export type Body = {
  name: string;
  priority: string;
  difficulty: string;
  estimate: string;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};

export type SortOption = {
  name: string;
  order: string;
};

export type DropDownProps = {
  label: string;
  options: SortOption[];
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export type CustomRadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};
