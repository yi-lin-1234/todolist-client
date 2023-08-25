export type UnfinishedTask = {
  id: string;
  name: string;
  priority: string;
  status: string;
  difficulty: string;
  estimate: string;
  createdAt: string;
  finishedAt: null;
};

export type FinishedTask = {
  id: string;
  name: string;
  priority: string;
  status: string;
  difficulty: string;
  estimate: string;
  createdAt: string;
  finishedAt: string;
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

export type GroupedAttribute = {
  [key: string]: number;
};
