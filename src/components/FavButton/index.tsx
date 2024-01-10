import { SxProps } from "@mui/material/styles";
import { useState } from "react";
import { Button } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavButtonProps {
    isActive ?: boolean;
    onClick: Function;
    sx ?: SxProps;
}

export default function FavButton({
    isActive = false, // by default false
    onClick,
    sx,
}: FavButtonProps) {
    const [isBeerFavourite, setIsBeerFavourite] = useState<boolean>(isActive);

    const handleClick = () => {
        setIsBeerFavourite(!isBeerFavourite);
        onClick();
    };

    return (
        <Button variant="contained" color="secondary" endIcon={isBeerFavourite ? <Favorite /> : <FavoriteBorderIcon />} sx = {sx} onClick = {handleClick}>
            { isBeerFavourite ? 'Remove' : 'Add' }
        </Button>
    );
}