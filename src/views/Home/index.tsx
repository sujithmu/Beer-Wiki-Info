import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Container, Link, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavButton from '../../components/FavButton';
import styles from './Home.module.css';
import beerGlassImg from './beer_glass2.jpg';
import { getFavouriteBeers, updateFavBeers, isBeerFavourite, removeAllFavBeers } from '../../utils/favoriteBeer';

const Home = () => {
  const navigate = useNavigate();
  const [favBeerList, setFavBeerList] = useState<Array<Beer>>([]); 

  useEffect(() => {
    setFavBeerList(getFavouriteBeers());
  }, []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <Box component = "article" sx={{ flexBox: 1}}>
      <Box component= "header" className = {styles.header}>
        <Typography variant='h1' component="h1" color="#ffffff" sx={{ maxWidth: '1200px'}}>
          Find your perfect 
          <Link href="/beer" color="#ffffff" sx={{ textDecoration: 'underline' }}>  beer</Link>
        </Typography>
        <img src={beerGlassImg} alt = "beer glass" />
      </Box>
      <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '196px'
        }}>
        <Box>
          <Box component="header" sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px',
              gap: 3
            }}>
              <Typography component="h2" variant="h2" color="#333333">
                Favorite breweries
              </Typography>
            
            {favBeerList.length > 0 && 
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  removeAllFavBeers();
                  setFavBeerList([]);
                }}
              >
                Remove all
              </Button>
            }
          </Box>
          {favBeerList.length > 0 &&
             <List>
              {favBeerList.map((beer) => (
                <ListItemButton key={beer.id} disableGutters sx={{
                  paddingTop: '24px',
                  paddingBottom: '24px',
                  gap: 3
                }}>
                  <ListItemText primary={beer.name + ' - (' + beer.brewery_type + ')'} primaryTypographyProps={{ color: '#333333', variant: 'h4'}} onClick={onBeerClick.bind(this, beer.id)} />
                  <Box sx={{ flexShrink: 0 }}>
                    <FavButton
                      onClick={() => {
                        updateFavBeers(beer);
                        setFavBeerList(getFavouriteBeers());
                      }}
                      isActive={isBeerFavourite(beer)}
                    />
                  </Box>
                </ListItemButton>
              ))}
            </List>
          }
          {favBeerList.length === 0 &&
            <Box sx={{
              padding: '48px 0 96px 0'
            }}>
            </Box>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
