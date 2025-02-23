import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getIngredients } from '../../services/slices/ingredientSlice';
import { getIngredientDetails } from '../../services/slices/ingredientDetailSlice';

import styles from './home.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';

import OrderDetails from '../../components/order-details/order-details';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const Home = () => {
    const dispatch = useDispatch();
  
    const { ingredients: ingredients, loading, error } = useSelector((state) => state.ingredients);
    
    const { details: ingredientDetails, loading: detailsLoading } = useSelector(state => state.ingredientDetails)
  
    useEffect(() => {
      dispatch(getIngredients(URL));
    }, [dispatch]);
  
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
        <>
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
        </>
    )
    
}