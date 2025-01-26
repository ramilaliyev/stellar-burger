import { useState, useEffect } from 'react'
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';

import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


// import ingredientsData from './utils/ingredients.json';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState({
    image: '',
    name: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
  });

  const handleIngredientClick = (ingredient) => {
    setIngredientDetails({
      image: ingredient.image,
      name: ingredient.name,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      calories: ingredient.calories,
    });
    setIsOpen(true);
    setIsIngredientModal(true);
  };

  const closeAll = () => {setIsOpen(false); setIsOrderModal(false); setIsIngredientModal(false)};

  const { isLoading, hasError, data } = state;

  useEffect(() => {
    const getIngredients = async () => {
    setState({ ...state, isLoading: true });
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json()
      })
      .then(data => setState({ ...state, data: data.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    }

    getIngredients();
  }, [])

  const constructorData = {
    bun: null, // здесь будет хранится только ингредиент выбранной булки
    ingredients: data // здесь массив ингредиентов в составе бургера, соусы и начинки
  }
  
  
  return (
    <div className='maincontent'>
      <AppHeader />
      <main className={styles.main}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
        !hasError &&
        data.length &&
        <>
          <BurgerIngredients ingredients={constructorData.ingredients} ingredientBtnFunc={handleIngredientClick}/>
          <BurgerConstructor ingredients={constructorData.ingredients} orderBtnFunc={() => {setIsOpen(true); setIsOrderModal(true)}}  />
        </>}
      </main>
      <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll} heading={isIngredientModal ? 'Детали ингредиента' : '' }>
        {isOrderModal && <OrderDetails />}
        {isIngredientModal && <IngredientDetails ingredients={ingredientDetails}/>}
      </Modal>
    </div>
  );
}

export default App
