import React from 'react';
import Select from 'react-select';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export type Props = {
  domain: string;
  target: string;
  value?: string;
  position?: number;
};

const options = [
  'Number',
  'Name',
  'Type_1',
  'Type_2',
  'Total',
  'HP',
  'Attack',
  'Defense',
  'Sp_Atk',
  'Sp_Def',
  'Speed',
  'Generation',
  'isLegendary',
  'Color',
  'hasGender',
  'Pr_Male',
  'Egg_Group_1',
  'Egg_Group_2',
  'hasMegaEvolution',
  'Height_m',
  'Weight_kg',
  'Catch_Rate',
  'Body_Style'
].map(item => ({ value: item, label: item }));

const UPDATE_PARALLEL = gql`
  mutation UpdateParallel($target: String!, $position: Integer) {
    updateParallel(target: $target, position: $position) @client
  }
`;

const Selector: React.FC<Props> = (props: Props) => {
  const client = useApolloClient();
  const [updateParallel] = useMutation(UPDATE_PARALLEL);

  const update = (option: any) => {
    switch (props.domain) {
      case 'scatter':
        client.writeData({
          data: {
            [props.domain]: {
              [props.target]: option.value,
              __typename: props.domain
            }
          }
        });
        break;
      case 'parallel':
        updateParallel({
          variables: { target: option.value, position: props.position }
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Select options={options} onChange={update} placeholder={props.value} />
    </>
  );
};

export default Selector;
