export const FETCH_STATUSES = {
    OK: 'ok',
    ERROR: 'error',
    LOADING: 'loading'
  };
  
  export type FetchStatus =
    | typeof FETCH_STATUSES.OK
    | typeof FETCH_STATUSES.ERROR
    | typeof FETCH_STATUSES.LOADING;