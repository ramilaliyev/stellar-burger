import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
  
    const { ingredients, loading, error } = useSelector((state) => state.ingredients);
    const { details: ingredientDetails, loading: detailsLoading, error: detailsError } = useSelector(state => state.ingredientDetails);

    useEffect(() => {
      dispatch(getIngredients(URL));
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(() => JSON.parse(localStorage.getItem('isOpen')) || false);
    const [isIngredientModal, setIsIngredientModal] = useState(() => JSON.parse(localStorage.getItem('isIngredientModal')) || false);
    const [ingredient, setIngredient] = useState(() => JSON.parse(localStorage.getItem('ingredient')) || {});
    
    
    const [isOrderModal, setIsOrderModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
        localStorage.setItem('isIngredientModal', JSON.stringify(isIngredientModal));
        localStorage.setItem('ingredient', JSON.stringify(ingredient));
    }, [isOpen, isIngredientModal, ingredient]);

    const handleIngredientClick = (ingredient) => {
      dispatch(getIngredientDetails({ URL, id: ingredient._id }));
      setIsOpen(true);
      setIsIngredientModal(true);
      setIngredient(ingredient);
    };

    const closeAll = () => {
      setIsOpen(false);
      setIsOrderModal(false);  
      setIsIngredientModal(false);
      setIngredient({});
      navigate('/');
    };
    
    return (
        <>
            <main className={styles.main}>
                {loading && 'Загрузка ингредиентов...'}
                {error && 'Произошла ошибка при загрузке ингредиентов'}
                {!loading &&
                !error &&
                ingredients.length &&
                <>
                <BurgerIngredients ingredientBtnFunc={handleIngredientClick}/>
                <BurgerConstructor orderBtnFunc={() => {setIsOpen(true); setIsOrderModal(true)}} />
                </>}
            </main>
            <Modal 
                isOpen={isOpen} 
                onClose={closeAll} 
                onOverlayClick={closeAll} 
                onEscPress={closeAll} 
                heading={isIngredientModal ? 'Детали ингредиента' : ''}
            >
                {isOrderModal && <OrderDetails />}
                
                {detailsLoading && <p>Загрузка данных ингредиента...</p>}
                {detailsError && <p>Произошла ошибка при загрузке данных ингредиента</p>}
                
                {isIngredientModal && !detailsLoading && !detailsError && ingredient && (
                    <IngredientDetails ingredient={ingredient}/>
                )}
            </Modal>
        </>
    );
};

