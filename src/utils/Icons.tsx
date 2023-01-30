import React from 'react';
import * as Icon from 'phosphor-react-native';
import {useTheme} from 'styled-components/native';

//Icons

export const iconBuy = (data: {category: string}) => {
  const THEME = useTheme();
  switch (data?.category) {
    case 'Supermercado': {
      return <Icon.ShoppingCart size={28} color={THEME.colors.gray} />;
    }

    case 'Roupas': {
      return <Icon.TShirt size={28} color={THEME.colors.gray} />;
    }

    case 'Alimentação': {
      return <Icon.ForkKnife size={28} color={THEME.colors.gray} />;
    }

    case 'Bebidas': {
      return <Icon.Wine size={28} color={THEME.colors.gray} />;
    }

    case 'Estética': {
      return <Icon.HandSoap size={28} color={THEME.colors.gray} />;
    }

    case 'Saúde': {
      return <Icon.FirstAidKit size={28} color={THEME.colors.gray} />;
    }

    case 'Viagens': {
      return <Icon.Bus size={28} color={THEME.colors.gray} />;
    }

    case 'Pix':
    case 'Salário':
    case 'Renda extra': {
      return <Icon.CurrencyDollar size={28} color={THEME.colors.gray} />;
    }

    case 'Boleto/Faturas':
    case 'Boleto/Faturas mensais': {
      return <Icon.Receipt size={28} color={THEME.colors.gray} />;
    }

    default:
      return <Icon.WarningCircle size={28} color={THEME.colors.gray} />;
  }
};

export const colorCategory = (data: {category: string}) => {
  const THEME = useTheme();

  switch (data?.category) {
    case 'Alimentação': {
      return THEME.colors.red;
    }

    case 'Bebidas': {
      return THEME.colors.yellow;
    }

    case 'Boleto/Faturas mensais': {
      return THEME.colors.blue;
    }

    case 'Estética': {
      return THEME.colors.orange;
    }

    case 'Pix': {
      return THEME.colors.cards.nubank;
    }

    case 'Renda extra': {
      return THEME.colors.purple;
    }

    case 'Roupas': {
      return THEME.colors.cards.picpay;
    }

    case 'Saúde': {
      return THEME.colors.cards.ame;
    }
    case 'Supermercado': {
      return THEME.colors.cards.next;
    }

    case 'Salário': {
      return THEME.colors.green;
    }

    case 'Viagens': {
      return THEME.colors.cards.ame;
    }

    default: {
      return THEME.colors.gray2;
    }
  }
};

export const colorCard = (data: {cardId: number}) => {
  const THEME = useTheme();
  switch (data?.cardId) {
    case 1: {
      return THEME.colors.cards.ame;
    }

    case 2: {
      return THEME.colors.cards.iti;
    }

    case 3: {
      return THEME.colors.cards.neon;
    }

    case 4: {
      return THEME.colors.cards.next;
    }

    case 5: {
      return THEME.colors.cards.nubank;
    }

    case 6: {
      return THEME.colors.cards.picpay;
    }

    default:
      return THEME.colors.gray;
  }
};

export const colorExpense = (data: {type: string}) => {
  const THEME = useTheme();
  switch (data?.type) {
    case 'Entrada': {
      return THEME.colors.green;
    }

    case 'Gastos': {
      return THEME.colors.red;
    }

    default:
      return THEME.colors.gray;
  }
};

export const nameCard = (data: {cardId: number}) => {
  switch (data?.cardId) {
    case 1: {
      return 'Ame';
    }

    case 2: {
      return 'Iti';
    }

    case 3: {
      return 'Neon';
    }

    case 4: {
      return 'Next';
    }

    case 5: {
      return 'Nubank';
    }

    case 6: {
      return 'PicPay';
    }

    default:
      'Não informado';
  }
};
