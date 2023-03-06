import React, {useState, useRef} from 'react';

import * as Icon from 'phosphor-react-native';
import {Categoria} from '../../services/mock';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {addMonths, subMonths, format, endOfMonth, startOfMonth} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {useTheme} from 'styled-components/native';
import {
  Button,
  ButtonText,
  Container,
  ContainerHeader,
  ContentItens,
  DateFilter,
  FilterIcon,
  OpenFilter,
  TitleHistoric,
} from './styles';

type Props = {
  selectedCategory: string | 'Tudo';
  setFiltro: React.Dispatch<React.SetStateAction<string | 'Tudo'>>;

};

type IOpcao = (typeof Categoria)[0];

export function Filter({selectedCategory, setFiltro}: Props) {
  const THEME = useTheme();

  function selecionarFiltro(category: IOpcao) {
    if (selectedCategory === category.name) return setFiltro('Tudo');
    return setFiltro(category.name);
  }
  return (
    <>
      <Container>
        

        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            decelerationRate="normal">
            <ContentItens>
              {Categoria.map(category => (
                <Button
                  key={category.id}
                  onPress={() => {
                    selecionarFiltro(category);
                  }}
                  style={{
                    backgroundColor:
                      selectedCategory === category.name
                        ? THEME.colors.light
                        : THEME.colors.gray600,
                  }}>
                  <ButtonText
                    style={{
                      color:
                        selectedCategory === category.name
                          ? THEME.colors.gray600
                          : THEME.colors.light,
                    }}>
                    {category.name}
                  </ButtonText>
                </Button>
              ))}
            </ContentItens>
          </ScrollView>
        </View>
      </Container>
    </>
  );
}
