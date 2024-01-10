import { Beer } from '../types';

const KEY_NAME = "favouriteItems";

export function getFavouriteBeers() {
    const favorites = window.localStorage.getItem(KEY_NAME);
    if (favorites !== null) {
        return JSON.parse(favorites);
    }
    return [];
}

// Remove all favorite bookmarked items
export function removeAllFavBeers() {
    window.localStorage.removeItem(KEY_NAME);
}

// Check if the beer selected is already favorite
export function isBeerFavourite(item: Beer) {
    const favorites = getFavouriteBeers();
    const hasItem = favorites.filter((el: Beer) => {
        return el.id === item.id
    });
    return hasItem.length ? true : false;
}

export function updateFavBeers(item: Beer) {
    let newFavBeers;
    const favorites = getFavouriteBeers();
    const beerStore = favorites.filter((el: Beer) => {
        return el.id === item.id;
    });

    // Checking if beer already exists in local storage
    // If not exists add beer items, otherwise remove beers
    if (!beerStore.length) {
        newFavBeers = [...favorites, item];
    } else {
        favorites.splice(favorites.indexOf(beerStore[0], 1));
        newFavBeers = favorites;
    }
    window.localStorage.setItem(KEY_NAME, JSON.stringify(newFavBeers));
}



