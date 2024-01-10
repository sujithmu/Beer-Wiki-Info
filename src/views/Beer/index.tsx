import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Button, Box, Typography, Container, Link } from '@mui/material';
import beerImg from './beer_bubbles.jpg';
import noMapImg from './no-map-image.jpg';
import styles from './Beer.module.css';
import { updateFavBeers, isBeerFavourite } from "../../utils/favoriteBeer";
import FavButton from '../../components/FavButton';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const description = (
    <>
      {beer?.name} is a {beer?.brewery_type} brewing company located at {beer?.city}, {beer?.state} in {beer?.country}.
    </>
  );

  return (
    <Box component="article" className={styles.article}>
      <Box component="header" className={styles.header}>
        <Typography variant="h1" component="h1" color="#ffffff" sx={{ maxWidth: '1000px'}}>
          {beer?.name}
        </Typography>
        {beer && 
          <Box sx={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 2}}>
            <FavButton
              onClick={() =>
                updateFavBeers(beer)
              }
              isActive={isBeerFavourite(beer)}
            />
          </Box>
        }
        <img src={beerImg} alt="Beer Image" />
      </Box>
      {beer &&
        <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '96px'
        }}>
          <Typography variant="h2" component="p" color="#333333">
              {description}
          </Typography>
        </Container>
      }
      {beer &&
        <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '96px'
        }}>
          <Box className={styles.map}>
            <Box className={styles.mapText}>
              <Typography variant="body1" component="p">
                <b>Address:</b>
                <br />
                {beer?.street} {beer?.city}
                <br />
                {beer?.state} {beer?.postal_code}
                <br />
                {beer?.country}
              </Typography>
              {beer?.phone && 
                <Box>
                  <br />
                  <Typography variant="body1" component="p">
                    <b>Phone:</b>
                    <br />
                    {beer?.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  </Typography>
                </Box>
              }
              {beer?.website_url && 
                <Box>
                  <br />
                  <Typography variant="body1" component="p">
                    <b>Website:</b>
                    <br />
                    <Link href={beer?.website_url} target="_blank">{beer?.website_url}</Link>
                  </Typography>
                  <Box className={styles.mapCta}>
                    <Button variant="outlined">Visit website</Button>
                  </Box>
                </Box>
              }
            </Box>
            {beer?.latitude && beer?.longitude && 
              <MapContainer className={styles.mapView}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[parseFloat(beer?.latitude), parseFloat(beer?.longitude)]}>
                </Marker>
              </MapContainer>
            }
            {!beer?.latitude && !beer?.longitude && 
              <Box className={styles.mapImage}>
                <img src={noMapImg} alt="Beer Image" />
              </Box>
            }
          </Box>
        </Container>
      }
      {beer &&
        <Box sx={{
          textAlign: 'center',
          marginTop: '96px',
          marginBottom: '96px'
          }}>
          <Typography variant="h2" component="div" color="#333333">
            <Link
              href='/beer'
              color="#333333"
              underline="hover" sx={{ textDecoration: 'underline' }}
            >
              Back to breweries
            </Link>
          </Typography>
        </Box>
      }
    </Box>
  );
};

export default Beer;
