import React, {useState} from 'react';

import {Dimensions, FlatList, Text, View} from 'react-native';
import Historic from '..';

import {ITransactionsCard} from '../../../@types/TransactionsCard';
import PopUp from '../../PopUp/index';
//Icon

import * as Icon from 'phosphor-react-native';
//Style
import * as Styled from './styles';

type ListHitoricProps = {
  data: ITransactionsCard[] | undefined;
  atualizar?: boolean;
  onAtualizar?: () => void;
};

export default function ListHistoric({
  data,
  atualizar,
  onAtualizar,
}: ListHitoricProps) {
  function rederHistoric(item: ITransactionsCard) {
    return <Historic data={item} />;
  }

  return (
    <>
      <FlatList
        decelerationRate={'normal'}
        data={data}
        ItemSeparatorComponent={<Styled.Separator />}
        keyExtractor={(item: ITransactionsCard) => String(item?.id)}
        refreshing={atualizar}
        onRefresh={onAtualizar}
        initialNumToRender={5}
        progressViewOffset={12}
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
