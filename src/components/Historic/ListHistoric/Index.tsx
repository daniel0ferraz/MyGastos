import React, {useCallback} from 'react';

import {Dimensions, FlatList, Text, View} from 'react-native';
import Historic from '..';
import {ITransactionsCard} from '../../../@types/TransactionsCard';
//Style
import * as Styled from './styles';

type ListHitoricProps = {
  data: ITransactionsCard[] | undefined;
};

export default function ListHistoric({data}: ListHitoricProps) {
  function rederHistoric(item: ITransactionsCard) {
    return <Historic data={item} />;
  }

  return (
    <>
      <FlatList
        decelerationRate={'normal'}
        data={data}
        ItemSeparatorComponent={() => <Styled.Separator />}
        keyExtractor={(item: ITransactionsCard) => String(item?.id)}
        removeClippedSubviews={true}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Styled.ErrorData>Nenhum extrato encontrado.</Styled.ErrorData>
          </View>
        )}
        renderItem={({item}) => rederHistoric(item)}
      />
    </>
  );
}
