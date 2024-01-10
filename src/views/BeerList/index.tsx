import { useEffect, useState } from 'react';
import { Beer, ApiParams, MetaData, SORT, TYPE } from '../../types';
import { fetchData, fetchMetaData } from './utils';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  TextField,
  Typography
} from '@mui/material';
import FavButton from '../../components/FavButton';
import { updateFavBeers, isBeerFavourite } from '../../utils/favoriteBeer';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<MetaData>();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<SORT>("name:asc");
  const [type, setType] = useState<TYPE>('all types');
  const [name, setName] = useState<string>('');
  
  // eslint-disable-next-line
  useEffect(() => {
    const params = {
      sort: sort,
      page: page,
      per_page: rowsPerPage
    } as ApiParams;

    if (type && type !== 'all types') {
      params.by_type = type;
    }

    if (name) {
      params.by_name = name;
    }

    fetchData(setBeerList, params, () => setLoading(false));
    fetchMetaData(setMetaData, params);
  }, [page, rowsPerPage, sort, type, name]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLoading(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setLoading(true);
    setSort(event.target.value as SORT);
    setPage(0);
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setLoading(true);
    setName(event.target.value);
    setPage(0);
  };

  return (
    <Box component="article" sx={{
      marginBottom: '96px',
      flexGrow: 1
    }}>
    <Container disableGutters>
      {metaData &&
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, borderBottom: '1px solid #333333', padding: '24px 0' }}>
          <FormControl>
            <TextField
              label="Name"
              aria-label="Name"
              variant="outlined"
              placeholder="Search by name"
              value={name}
              onChange={handleNameChange}
              data-testid="nameId"
              InputLabelProps={{
                color: 'secondary',
                shrink: true,
                sx: {
                  color: '#333333'
                }
              }}
              inputProps={{
                sx: {
                  color: '#333333'
                }
              }}
              sx={{
                color: '#333333',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                }
              }}
            >
            </TextField>
          </FormControl>
          <FormControl sx={{ marginLeft: 'auto', width: {
            xs: '100%',
            sm: 'auto'
          }}}>
            <InputLabel id="sort-select-label" color="secondary" shrink={true} sx={{color: '#333333'}}>Sort by</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sort}
              label="Sort by"
              onChange={handleSortChange}
              autoWidth
              sx={{
                color: '#333333',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '.MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
              >
              <MenuItem value="name:asc">Name - Ascending</MenuItem>
              <MenuItem value="name:desc">Name - Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      }
      <List sx={{
        opacity: loading ? 0.3 : 1,
        pointerEvents: loading ? 'none': 'auto'
      }}>
        {beerList.map((beer) => (
          <ListItemButton key={beer.id} disableGutters sx={{
            paddingTop: '5px',
            paddingBottom: '40px',
            gap: 3
          }}>
            <ListItemText primary={beer.name + ' - (' + beer.brewery_type + ')'} primaryTypographyProps={{ color: '#333333', variant: 'h6'}} onClick={onBeerClick.bind(this, beer.id)} />
            <Box sx={{ flexShrink: 0 }}>
              <FavButton
                onClick={() => {
                  updateFavBeers(beer);
                }}
                isActive={isBeerFavourite(beer)}
              />
            </Box>
          </ListItemButton>
        ))}
      </List>
      {metaData && metaData?.total === 0 && 
        <Box sx={{
          padding: '96px 0'
        }}>
          <Typography component="h2" variant="h2" color="#333333">No breweries found.</Typography>
          <Typography component="p" variant="h4" color="#333333">Please try to modify your filters.</Typography>
        </Box>
      }
      {metaData && 
        <TablePagination
          component="div"
          count={Number(metaData?.total)}
          page={Number(metaData?.page)}
          onPageChange={handleChangePage}
          rowsPerPage={Number(metaData.per_page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#333333',
            marginBottom: '48px',
            borderTop: '1px solid #333333',
            '.MuiTablePagination-spacer': {
              display: 'none'
            },
            '.MuiTablePagination-toolbar': {
              paddingLeft: 0,
              overflow: 'hidden'
            },
            '.MuiTablePagination-displayedRows': {
              marginLeft: 'auto'
            },
            '.MuiTablePagination-actions': {
              marginRight: '-15px',
              marginLeft: '0 !important'
            }
          }}
        />
      }
    </Container>
  </Box>
  );
};

export default BeerList;
