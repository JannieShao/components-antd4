import React, {
  useImperativeHandle, forwardRef, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import { callFun } from '../utils';
import SearchBar from '../search-bar';
import SearchRet from '../search-ret';

const defaultStore = {
  filter: {},
  page: { current: 1, pageSize: 20 },
  total: 0,
  list: [],
};
const List = forwardRef(({
  className, model, defaultFilter, columns,
  // searchBar & searchRet
  useSearchBar, searchBarProps, searchRetProps,
  // functions & flag
  onFilterChange, onSearch, autoSearch, resetAutoSearch,
}, ref) => {
  const { usePagination = true } = searchRetProps;
  const compSearchBar = useRef();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(defaultStore);

  const doSearch = (searchFilter) => {
    setLoading(true);
    callFun(
      () => onSearch(searchFilter),
      (res) => {
        setLoading(false);
        const { total = 0, list = [] } = res || {};
        setStore({
          ...store,
          filter: { ...searchFilter.filter },
          page: { ...searchFilter.page },
          total: total || list.length,
          list,
        });
      },
    );
  };

  const handleSearch = (f = {}, pageNow = 1) => {
    const searchFilter = {
      filter: { ...f },
      page: {
        current: pageNow,
        pageSize: store?.page?.pageSize || defaultStore.page.pageSize,
      },
    };
    doSearch(searchFilter);
  };

  const handlePageChange = (cp) => {
    const searchFilter = {
      filter: { ...(store.filter || {}) },
      page: {
        current: store.page?.pageSize === cp.pageSize ? cp.current : 1,
        pageSize: cp.pageSize,
      },
    };
    doSearch(searchFilter);
  };

  useImperativeHandle(ref, () => ({
    setFilter: f => compSearchBar.current && compSearchBar.current.setFieldsValue(f),
    getFilter: f => compSearchBar.current && compSearchBar.current.getFieldsValue(f),
    getStore: () => store,
    autoSearch: f => handleSearch({ ...defaultFilter, ...f }),
    handleSearch: () => compSearchBar.current && compSearchBar.current.handleSubmit(),
    reload: () => handleSearch(store?.filter, store?.page.current),
    reset: () => compSearchBar.current && compSearchBar.current.handleReset(),
    resetSubmit: () => compSearchBar.current && compSearchBar.current.handleResetSubmit(),
  }));
  return (
    <div className={className}>
      {useSearchBar && (
        <SearchBar
          {...searchBarProps}
          ref={compSearchBar}
          isLoading={searchBarProps.useLoading ? loading : false}
          model={model}
          defaultFilter={defaultFilter}
          onFilterChange={onFilterChange}
          onSearch={handleSearch}
          autoSearch={autoSearch}
          resetAutoSearch={resetAutoSearch}
        />
      )}
      <SearchRet
        {...searchRetProps}
        isLoading={searchRetProps.useLoading ? loading : false}
        dataList={store.list}
        columns={columns}
        pagination={usePagination ? {
          ...store.page,
          total: store.total,
        } : false}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

List.propTypes = {
  className: PropTypes.string,
  model: PropTypes.array,
  columns: PropTypes.array,
  store: PropTypes.object,
  defaultFilter: PropTypes.object,
  // searchBar & searchRet
  useSearchBar: PropTypes.bool,
  searchBarProps: PropTypes.object,
  searchRetProps: PropTypes.object,
  // functions & flag
  onSearch: PropTypes.func,
  autoSearch: PropTypes.bool,
  resetAutoSearch: PropTypes.bool,
};

List.defaultProps = {
  className: '',
  model: [],
  columns: [],
  store: {},
  defaultFilter: {},
  // searchBar & searchRet
  useSearchBar: true,
  searchBarProps: {},
  searchRetProps: {},
  // functions & flag
  onSearch: () => {},
  autoSearch: true,
  resetAutoSearch: false,
};

List.Result = (props = {}) => <SearchRet {...props} />;

export default List;
