import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert, Platform, ScrollView, TouchableOpacity} from 'react-native';
//Components
import Input from '../../components/Input';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import * as Icon from 'phosphor-react-native';
import Button from '../../components/Button';
import InputCustom from '../../components/InputCustom';
import CurrencyInput from 'react-native-currency-input';
//Styles
import {useTheme} from 'styled-components/native';
import * as Styled from './styles';
import {styles} from './styles_select';
import {style} from './style_input';
//Services
import {ITransactionsCard} from '../../@types/TransactionsCard';
import {firebase} from '@react-native-firebase/firestore';
import {CardCategory, CategoryExpense, TipoDeGastos} from '../../services/mock';
import {API} from '../../config';

export default function ExpenseRegister() {
  const routes = useRoute<any>();
  const expenseExtract = routes?.params?.item as ITransactionsCard;

  const [loading, setDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const THEME = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const resetCategory = useRef<SelectDropdown>(null);
  const resetCard = useRef<SelectDropdown>(null);
  const resetType = useRef<SelectDropdown>(null);

  const [expense, setExpense] = useState({
    name: '' || expenseExtract?.name,
    category: '' || expenseExtract?.category,
    value: '' || expenseExtract?.value,
    date: '' || expenseExtract?.date,
    type: '' || expenseExtract?.type,
    cardId: '' || expenseExtract?.cardId,
    created_at: new Date() || expenseExtract?.created_at,
  } as ITransactionsCard);

  const clearExpense = () => {
    setExpense({
      name: '',
      category: '',
      value: 0,
      date: '',
      type: '',
      cardId: '',
    } as ITransactionsCard);
    resetCategory.current?.reset();
    resetCard.current?.reset();
    resetType.current?.reset();
  };

  const addNewExpense = async () => {
    setDelete(true);

    try {
      if (
        !expense.name ||
        !expense.category ||
        !expense.value ||
        !expense.date ||
        !expense.type ||
        !expense.cardId
      ) {
        Toast.show({
          text1: 'Preencha todos os campos',
          type: 'error',
          position: 'bottom',
        });
        return;
      }

      const newExpense = firebase.firestore().collection(`${API}`);

      await newExpense.add({
        name: expense.name,
        category: expense.category,
        value: expense.value,
        date: expense.date,
        type: expense.type,
        cardId: expense.cardId,
        created_at: new Date(
          new Date().toString().split('GMT')[0] + ' UTC',
        ).toISOString(),
      });

      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso!',
        position: 'bottom',
      });
      clearExpense();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ops! preencha todos os campos.',
        position: 'bottom',
      });
    } finally {
      setDelete(false);
    }
  };

  const updateExtract = async () => {
    setUpdate(true);

    try {
      const updateExpense = firebase
        .firestore()
        .doc(`${API}/${expenseExtract.id}`);

      await updateExpense.update({
        name: expense.name,
        category: expense.category,
        value: expense.value,
        date: expense.date,
        type: expense.type,
        cardId: expense.cardId,
      });

      clearExpense();

      Toast.show({
        type: 'success',
        text1: 'Extrato atualizado com sucesso!',
        position: 'bottom',
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ops! algo deu errado :(',
        position: 'bottom',
      });
    } finally {
      setUpdate(false);
    }
  };

  function confirmUpdate() {
    Alert.alert(
      'Atualizar gasto',
      'Tem certeza que deseja Atualizar este registro?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => updateExtract(),
        },
      ],
    );
  }

  const deleteExtract = async () => {
    setDeleted(true);

    try {
      const deletarExtrato = firebase
        .firestore()
        .doc(`${API}/${expenseExtract.id}`);
      await deletarExtrato.delete();

      clearExpense();
      navigation.replace('Dashboard');
    } catch (error) {
      Toast.show({
        text1: 'Erro ao excluir, tente novamente! :(',
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setDeleted(false);
    }
  };

  function confirmDelete() {
    Alert.alert(
      'Excluir gasto',
      'Tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await deleteExtract();
          },
        },
      ],
    );
  }

  return (
    <Styled.Container
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}>
      <ScrollView>
        <Styled.Header>
          <Styled.BoxTitle>
            <Styled.BoxIcon>
              <Icon.Wallet size={30} />
            </Styled.BoxIcon>
            <Styled.TitleHeader>
              {routes?.params ? 'Editar extrato' : 'Registrar extrato '}
            </Styled.TitleHeader>
          </Styled.BoxTitle>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon.ArrowLeft size={30} />
          </TouchableOpacity>
        </Styled.Header>

        <Styled.Form>
          <Input
            sizeInput={'100%'}
            value={expense.name}
            placeholder="Nome "
            keyboardType="default"
            onChangeText={text => {
              setExpense({
                ...expense,
                name: text,
              });
            }}
          />

          <Styled.FormGroup>
            <CurrencyInput
              style={style.input}
              value={expense.value}
              onChangeValue={(value: number) => {
                setExpense({
                  ...expense,
                  value: value,
                });
              }}
              placeholder="R$ 0,00"
              placeholderTextColor={'#2c2c2c'}
              prefix={'$ '}
              signPosition="beforePrefix"
              delimiter=","
              precision={2}
              separator="."
            />

            <InputCustom
              value={expense.date}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              mask
              placeholder="00/00/0000"
              onChangeText={(text: string) => {
                setExpense({
                  ...expense,
                  date: text,
                });
              }}
              keyboardType="numeric"
              width="47%"
            />
          </Styled.FormGroup>

          <Styled.FormGroup>
            <SelectDropdown
              defaultValue={expenseExtract?.cardId}
              ref={resetCard}
              data={CardCategory}
              onSelect={(selectedItem, index) => {
                setExpense({
                  ...expense,
                  cardId: selectedItem,
                });
              }}
              defaultButtonText={'Cartao usado'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return isOpened ? (
                  <Icon.CaretUp size={18} />
                ) : (
                  <Icon.CaretDown size={18} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

            <SelectDropdown
              defaultValue={expenseExtract?.type}
              ref={resetType}
              data={TipoDeGastos}
              onSelect={(selectedItem, index) => {
                setExpense({
                  ...expense,
                  type: selectedItem,
                });
              }}
              defaultButtonText={'Tipo'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return isOpened ? (
                  <Icon.CaretUp size={18} />
                ) : (
                  <Icon.CaretDown size={18} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </Styled.FormGroup>

          <Styled.RowSelect>
            <SelectDropdown
              defaultValue={expenseExtract?.category}
              key={expenseExtract?.category}
              ref={resetCategory}
              data={CategoryExpense}
              onSelect={(selectedItem, index) => {
                setExpense({
                  ...expense,
                  category: selectedItem,
                });
              }}
              defaultButtonText={'Categoria'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return isOpened ? (
                  <Icon.CaretUp size={18} />
                ) : (
                  <Icon.CaretDown size={18} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </Styled.RowSelect>

          <Styled.ButtonGroup>
            <Button
              onPress={() =>
                routes?.params ? confirmDelete() : clearExpense()
              }
              size="Medium"
              style={{backgroundColor: THEME.colors.red}}
              isLoading={deleted}>
              {routes?.params ? 'Excluir' : 'Limpar'}
            </Button>

            <Button
              onPress={() => {
                routes?.params ? confirmUpdate() : addNewExpense();
              }}
              size="Medium"
              style={{backgroundColor: THEME.colors.green}}
              isLoading={update || loading}>
              {routes?.params ? 'Atualizar' : 'Adicionar'}
            </Button>
          </Styled.ButtonGroup>
        </Styled.Form>
      </ScrollView>
      <Toast />
    </Styled.Container>
  );
}
