import React from 'react';
import {formatToBRL} from 'brazilian-values';
import {ITransactionsCard} from '../../@types/TransactionsCard';
//Navigation
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Styles
import * as Styled from './styles';
import * as Icon from 'phosphor-react-native';
import {iconBuy, colorExpense} from '../../utils/Icons';
import {toNumber} from '../../utils/mask';

type Props = {
  data: ITransactionsCard;
};

export default function ListHistoric({data}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Styled.ContentItens
      onPress={() => navigation.navigate('ViewExtract', {data})}>
      <Styled.BoxInfo>
        <Styled.BoxIcon>{iconBuy({category: data?.category})}</Styled.BoxIcon>

        <Styled.BoxText>
          <Styled.Title>{data?.name || 'Não encontrado'}</Styled.Title>
          <Styled.Price>{formatToBRL(data?.value || 0)}</Styled.Price>
        </Styled.BoxText>
      </Styled.BoxInfo>

      <Styled.BoxCardAndDate>
        <Icon.CurrencyCircleDollar
          size={32}
          color={colorExpense({type: data?.type})}
        />
        <Styled.Date>{data?.date || '00/00/0000'}</Styled.Date>
      </Styled.BoxCardAndDate>
    </Styled.ContentItens>
  );
}
