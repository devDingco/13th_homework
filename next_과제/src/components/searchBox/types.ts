export interface IsearchBoxProps {
  handleSearch: ({
    startDate,
    endDate,
    search,
  }: {
    startDate: string;
    endDate: string;
    search: string;
  }) => void;
}
