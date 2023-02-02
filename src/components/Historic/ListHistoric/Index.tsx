import React from 'react';

import {Dimensions, FlatList, Text, View} from 'react-native';
import Historic from '..';
import {ITransactionsCard} from '../../../@types/TransactionsCard';
//Style
import * as Icon from 'phosphor-react-native';
import * as Styled from './styles';
import {useTheme} from 'styled-components/native';

type ListHitoricProps = {
  data: ITransactionsCard[] | undefined;
};

export default function ListHistoric({data}: ListHitoricProps) {
  const THEME = useTheme();

  function rederHistoric(item: ITransactionsCard) {
    return <Historic data={item} />;
  }

  return (
    <>
      <FlatList
        decelerationRate={'normal'}
        data={data}
        ItemSeparatorComponent={() => <Styled.Separator />}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        snapToAlignment={'start'}
        ListEmptyComponent={() => (
          <Styled.BoxError>
            <Icon.Receipt size={35} color={THEME.colors.gray2} />
            <Styled.ErrorData>Nenhum extrato encontrado.</Styled.ErrorData>
          </Styled.BoxError>
        )}
        renderItem={({item}) => rederHistoric(item)}
      />
    </>
  );
}
