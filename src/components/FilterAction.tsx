import { Button, Select } from "antd";
import { usePagination } from "../hooks";
import { memo, useCallback, useState } from "react";
import { FetchWithNextPageFlag, PageOption } from "../utils/typed";
const { Option } = Select;

type FilterActionsProps = {
  onChangeFilter: (pageOption: PageOption) => FetchWithNextPageFlag;
};
function FilterActionsComponent({ onChangeFilter }: FilterActionsProps) {
  const [pageOption, setPageOption] = usePagination();
  const [hasNextPage, setHasNextPage] = useState(true);

  const onChangePageSize = async (value: number) => {
    let tempPageOption = {
      page: 0,
      size: value,
    };
    const hasNextPage = await onChangeFilter(tempPageOption);
    if (hasNextPage) setHasNextPage(true);
    setPageOption(tempPageOption);
  };

  const onChangePage = useCallback(
    async (action: string) => {
      let tempPageOption = {
        ...pageOption,
      };

      switch (action) {
        case "next":
          tempPageOption.page += 1;
          break;
        case "prev":
          tempPageOption.page -= 1;
          setHasNextPage(true);
          break;
        default:
          break;
      }

      if ((await onChangeFilter(tempPageOption)).hasNextPage)
        setPageOption(tempPageOption);
      else setHasNextPage(false);
    },
    [setPageOption, onChangeFilter, pageOption]
  );

  return (
    <div className="filter-action">
      <label>Page Size: </label>
      <Select defaultValue={pageOption.size} onChange={onChangePageSize}>
        <Option value={20}>20</Option>
        <Option value={30}>30</Option>
        <Option value={50}>50</Option>
      </Select>
      <Button
        disabled={pageOption.page <= 0}
        onClick={() => onChangePage("prev")}
      >
        Prev
      </Button>
      <span>Page: {pageOption.page + 1}</span>
      <Button disabled={!hasNextPage} onClick={() => onChangePage("next")}>
        Next
      </Button>
    </div>
  );
}

const FilterActions = memo(FilterActionsComponent);

export { FilterActions };
