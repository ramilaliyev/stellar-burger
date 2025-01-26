import { useState, useEffect } from 'react'
import './App.css';
import styles from './example.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import Modal from './components/modal/modal';

import OrderDetails from './components/order-details/order-details';
import IngredientDetails from './components/ingredient-details/ingredient-details';


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
      .then(res => res.json())
      .then(data => setState({ ...state, data: data.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    }

    getIngredients();
  }, [])

  return (
    <div className='maincontent'>
      <AppHeader />
      <main className="main">
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
        !hasError &&
        data.length &&
        <>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data} orderBtnFunc={() => {setIsOpen(true); setIsOrderModal(true)}}  
          ingredientBtnFunc={handleIngredientClick}/>
        </>}
      </main>
      <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll} heading={isIngredientModal ? 'Детали ингредиента' : '' }>
        {isOrderModal && <OrderDetails />}
        {isIngredientModal && <IngredientDetails calories={ingredientDetails.calories} proteins={ingredientDetails.proteins} 
        fat={ingredientDetails.fat} carbohydrates={ingredientDetails.carbohydrates} name={ingredientDetails.name} image={ingredientDetails.image}/>}
      </Modal>
    </div>
  );
}

export default App
