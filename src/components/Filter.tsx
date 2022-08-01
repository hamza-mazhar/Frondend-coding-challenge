import { FilterActions } from "./FilterAction";
import { FetchWithNextPageFlag, PageOption } from "../utils/typed";

type FilterSectionProps = {
  changeFilter: (pageOption: PageOption) => FetchWithNextPageFlag;
  title: string;
  subText?: string;
};

export const FilterSection = ({
  title,
  subText,
  changeFilter,
}: FilterSectionProps) => {
  return (
    <section className="album-header-filter">
      <div className="album-heading-section">
        <h2>{title}</h2>
        <span className="album-sub-heading">{subText}</span>
      </div>
      <FilterActions onChangeFilter={changeFilter} />
    </section>
  );
};
