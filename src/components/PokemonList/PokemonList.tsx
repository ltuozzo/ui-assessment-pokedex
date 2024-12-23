import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import TextField from '@mui/material/TextField';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [ displayPkmn, setDisplayPkmn ] = useState<Pokemon[]>([]);
  const [ search, setSearch ] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!loading && displayPkmn.length === 0){
    setDisplayPkmn(pokemons);
  }

  const filterData = (nameFilter: string) => {
    setSearch(nameFilter);
  }

  useEffect(() => { 
    const newData = pokemons.filter( pkmn => pkmn.name.includes(search));
    setDisplayPkmn(newData);
  }, [search]);

  const handleClick = (name: string, id: string) => {
    navigate(`/info/${name}/${id}`,{state:{previousLocation: location}});
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <TextField id="outlined-basic" label="Search" 
        variant="outlined" value={search} 
        onChange={({ target: { value } }) => filterData(value)} 
        className={classes.input}
        />
      </div>
      <div className={classes.root}>
        
        {loading && <div>Loading...</div>}
        {displayPkmn.map((pkmn) => (
          <div key={pkmn.id} className={classes.pkmnCard} onClick={() => handleClick(pkmn.name, pkmn.id)}>
            <div className={classes.pkmnDesc}>
              <div className={classes.pkmnText}>
                #{pkmn.number}
              </div>
              <h3 className={classes.pkmnText}>
                {pkmn.name}
              </h3>
              <div className={classes.pkmnText}>
              {pkmn.types.map((type) => (
                <div key={type} className={classes.pkmnType + " " + type}>
                  <div className={type}></div>
                  {type}
                </div>
              ))}
              </div>
            </div>
          
            <img className={classes.pkmnImg} src={pkmn.image}></img>
          </div>
        ))}
      </div>
    </>
  );
};

const useStyles = createUseStyles(
  {
    searchContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginLeft: '20px',
    },
    input: {
      marginLeft: '20px',
      marginRight: 'auto',
      width: '300px',

      '& fieldset': {
        borderColor: 'white',
      },

      '& label': {
        color: 'white',
      },
    },
    root: {
      width: '100%',
      maxWidth: '1140px',
      margin: 'auto',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',

      '@media (max-width: 720px)': {
        flexDirection: 'column',
      },

      '& :hover': {
        width: '35%',
      },
    },
    pkmnCard: {
      width: '30%',
      minWidth: '100px',
      display: 'flex',
      flexDirection: 'row',
      margin: '5px',
      backgroundColor: 'white',
      borderRadius: '5px',
      transition: 'width 1s',
      justifyContent: 'center',

      '@media (max-width: 720px)': {
        width: '100%',
      },

    },
    pkmnDesc: {
      width: '50%',
      minWidth: '50px',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'left',
      pointerEvents:'none',
    },
    pkmnText: {
      color:'black',
      margin: '0',
      display: 'flex',
      flexDirection: 'row',
    },
    pkmnType: {
      fontSize: '12px',
      padding: '2px',
      width: '50px',
      textAlign: 'center',
      margin: '2px',
      borderRadius: '5px',

      '&.Bug': {
        backgroundColor: '#8cb230',
      },

      '&.Dark': {
        backgroundColor: '#58575f',
      },

      '&.Dragon': {
        backgroundColor: '#0f6ac0',
      },

      '&.Electric': {
        backgroundColor: '#eed535',
      },
      
      '&.Fairy': {
        backgroundColor: '#ed6ec7',
      },

      '&.Fighting': {
        backgroundColor: '#d04164',
      },

      '&.Fire': {
        backgroundColor: '#fd7d24',
      },

      '&.Flying': {
        backgroundColor: '#748fc9',
      },
      
      '&.Ghost': {
        backgroundColor: '#556aae',
      },
      
      '&.Grass': {
        backgroundColor: '#62b957',
      },
      
      '&.Ground': {
        backgroundColor: '#dd7748',
      },
      
      '&.Ice': {
        backgroundColor: '#61cec0',
      },
      
      '&.Normal': {
        backgroundColor: '#9da0aa',
      },
      
      '&.Poison': {
        backgroundColor: '#a552cc',
      },
      
      '&.Psychic': {
        backgroundColor: '#ea5d60',
      },
      
      '&.Rock': {
        backgroundColor: '#baab82',
      },
      
      '&.Steel': {
        backgroundColor: '#417d9a',
      },
      
      '&.Water': {
        backgroundColor: '#4a90da',
      },
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
  { name: 'PokemonList' }
);
