import { useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useGetPokemonInfo } from "../../hooks/useGetPokemonInfo";
import { createUseStyles } from "react-jss";
import { List, ListItem, ListItemText } from "@mui/material";

export default function Modal() {
    const classes = useStyles();
    const { name, id } = useParams();
    const { pokemon, loading } = useGetPokemonInfo(id!, name!);

    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate('/pokemon')
      };

  return (
    <Dialog onClose={handleClose} open={open}>
        {loading && <DialogTitle  className={classes.text}>Loading...</DialogTitle>}
      <DialogTitle  className={classes.text}>{pokemon.name}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>

            <img className={classes.pkmnImg} src={pokemon.image}></img>
        </ListItem>
      </List>
    </Dialog>
  );
}

const useStyles = createUseStyles(
    {
        text: {
            color: 'black',
        },
        pkmnImg: {
            padding: '10px',
            objectFit: 'cover',
            width: 'auto',
            height: '100%',
            maxHeight: '100px',
            pointerEvents:'none',
          },
    },
    { name: 'Modal' }
  );
  