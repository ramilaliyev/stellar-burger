import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { getIngredientDetails } from '../../services/slices/ingredientDetailSlice';

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
  const dispatch = useDispatch();

  const { ingredients: ingredients, loading, error } = useSelector((state) => state.ingredients);
  
  const { details: ingredientDetails, loading: detailsLoading } = useSelector(state => state.ingredientDetails)

  useEffect(() => {
    dispatch(getIngredients(URL));
  }, [dispatch]);

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [isIngredientModal, setIsIngredientModal] = useState(false);

  const handleIngredientClick = (ingredient) => {
    dispatch(getIngredientDetails({ URL, id: ingredient._id }))
    setIsOpen(true);
    setIsIngredientModal(true);
  };

  const closeAll = () => {setIsOpen(false); setIsOrderModal(false); setIsIngredientModal(false)};
 
  
  return (
    <div className='maincontent'>
      <AppHeader />
      <main className={styles.main}>
        {loading && 'Загрузка...'}
        {error && 'Произошла ошибка'}
        {!loading &&
        !error &&
        ingredients.length &&
        <>
          <BurgerIngredients ingredientBtnFunc={handleIngredientClick}/>
          <BurgerConstructor orderBtnFunc={() => {setIsOpen(true); setIsOrderModal(true)}}  />
        </>}
      </main>
      <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll} heading={isIngredientModal ? 'Детали ингредиента' : '' }>
        {isOrderModal && <OrderDetails />}
        {detailsLoading && "Загрузка"}
        {isIngredientModal && !detailsLoading && <IngredientDetails ingredient={ingredientDetails}/>}
      </Modal>
    </div>
  );
}

export default App
