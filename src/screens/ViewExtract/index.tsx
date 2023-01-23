import React from 'react';

import {View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {ITransactionsCard} from '../../@types/TransactionsCard';

import {useTheme} from 'styled-components';
import * as Icon from 'phosphor-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatToBRL} from 'brazilian-values';

import {iconBuy, colorCard, nameCard} from '../../utils/Icons';
import * as Styled from './styles';

import moment from 'moment';
import 'moment/locale/pt-br';

export default function ViewExtract() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const THEME = useTheme();
  const routes = useRoute<any>();
  const item = routes.params.data as ITransactionsCard;

  return (
    <Styled.Container>
      <Styled.BtnGoBack onPress={() => navigation.goBack()}>
        <Icon.ArrowLeft size={35} />
      </Styled.BtnGoBack>

      <Styled.Header>
        <Styled.BoxIcon>{iconBuy({category: item.category})}</Styled.BoxIcon>

        <Styled.BoxTitle>
          <Styled.TitleHeader typeExpense={item.type}>
            {item.type}
          </Styled.TitleHeader>
          <Styled.ValueExpenser>{formatToBRL(item.value)}</Styled.ValueExpenser>
        </Styled.BoxTitle>
      </Styled.Header>

      <Styled.Form>
        <Styled.BoxLine>
          <Styled.LegendExtract>Data do registro</Styled.LegendExtract>
          <Styled.Line />
        </Styled.BoxLine>

        <Styled.Extract>
          <Styled.BoxDate>
            <Styled.DateExtract>
              {moment(item.created_at).format('ll')}
            </Styled.DateExtract>
          </Styled.BoxDate>

          <Styled.BoxRow>
            <View>
              <Styled.NameExtract>Nome</Styled.NameExtract>
              <Styled.NameExtract>Data</Styled.NameExtract>
              <Styled.NameExtract>Categoria</Styled.NameExtract>
            </View>

            <Styled.BoxValue>
              <Styled.ValueExtract ellipsizeMode="tail">
                {item.name}
              </Styled.ValueExtract>
              <Styled.ValueExtract>{item.date}</Styled.ValueExtract>
              <Styled.ValueExtract>{item.category}</Styled.ValueExtract>
            </Styled.BoxValue>
          </Styled.BoxRow>

          <Styled.BoxRowCard>
            <Styled.NameExtract>Cartão usado</Styled.NameExtract>
            <Styled.BoxInfoCard>
              <Icon.CreditCard
                size={65}
                color={colorCard({cardId: item.cardId})}
              />
              <Styled.NameCard>
                {nameCard({cardId: item.cardId})}
              </Styled.NameCard>
            </Styled.BoxInfoCard>
          </Styled.BoxRowCard>

          <Styled.SpaceLine>
            <Styled.Line />
          </Styled.SpaceLine>
        </Styled.Extract>

        <Styled.ButtonGroup>
          <Styled.Button
            onPress={() => navigation.replace('RegisterNewExpense', {item})}>
            <Icon.Pencil size={30} color={THEME.colors.orange} />
            <Styled.ButtonText>Editar</Styled.ButtonText>
          </Styled.Button>
        </Styled.ButtonGroup>
      </Styled.Form>
    </Styled.Container>
  );
}
