type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed'
  | 'all types';

type SORT = 'name:asc' | 'name:desc';

export type { TYPE, SORT };
