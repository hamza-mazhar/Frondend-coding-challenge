import { useState } from "react";
import { PageOption } from "../utils/typed";
import { defaultPageOption } from "../utils/api";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePagination = (): [
  PageOption,
  React.Dispatch<React.SetStateAction<PageOption>>
] => {
  const [pageOption, setPageOption] = useState<PageOption>(defaultPageOption);

  return [pageOption, setPageOption];
};
