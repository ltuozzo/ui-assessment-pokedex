import gql from 'graphql-tag';
import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Pokemon } from './useGetPokemons';

export const GET_POKEMON_DATA = gql`
  query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemonInfo = (pkmnId: string, pkmnName: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DATA, {
    variables: {
      id: pkmnId,
      name: pkmnName,
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || [], [data]);

  console.log(pokemon)

  return {
    pokemon,
    ...queryRes,
  };
};
