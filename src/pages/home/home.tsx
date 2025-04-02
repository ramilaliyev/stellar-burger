import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../utils/appHooks";
import { useNavigate } from 'react-router-dom';

import { getIngredientDetails } from '../../services/slices/ingredientDetailSlice';

import styles from './home.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';

import OrderDetails from '../../components/order-details/order-details';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import { TIngredient } from '../../types/types';

import { baseURL } from "../../utils/baseURL";

import { getLocalStorageItem } from '../../utils/getLSItem';

const URL = `${baseURL}/ingredients`;;

export const Home = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { ingredients, loading, error } = useAppSelector((state) => state.ingredients);
    const { details: ingredientDetails, loading: detailsLoading, error: detailsError } = useAppSelector(
        (state) => state.ingredientDetails
    );


    const [isOpen, setIsOpen] = useState<boolean>(() => getLocalStorageItem('isOpen', false));
    const [isIngredientModal, setIsIngredientModal] = useState<boolean>(() => getLocalStorageItem('isIngredientModal', false));
    const [ingredient, setIngredient] = useState<TIngredient | null>(() => getLocalStorageItem('ingredient', null));
    const [isOrderModal, setIsOrderModal] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('isOpen', JSON.stringify(isOpen));
        localStorage.setItem('isIngredientModal', JSON.stringify(isIngredientModal));
        localStorage.setItem('ingredient', JSON.stringify(ingredient));
    }, [isOpen, isIngredientModal, ingredient]);

    const handleIngredientClick = (ingredient: TIngredient) => {
        dispatch(getIngredientDetails({ URL, id: ingredient._id }));
        setIsOpen(true);
        setIsIngredientModal(true);
        setIngredient(ingredient);
    };

    const closeAll = () => {
        setIsOpen(false);
        setIsOrderModal(false);
        setIsIngredientModal(false);
        setIngredient(null);
        navigate("/");
    };

    return (
        <>
            <main className={styles.main}>
                {loading && <p>Загрузка ингредиентов...</p>}
                {error && <p>Произошла ошибка при загрузке ингредиентов {error}</p>}
                {!loading && !error && ingredients.length > 0 && (
                    <>
                        <BurgerIngredients ingredientBtnFunc={handleIngredientClick} />
                        <BurgerConstructor orderBtnFunc={() => { setIsOpen(true); setIsOrderModal(true); }} />
                    </>
                )}
            </main>

            <Modal isOpen={isOpen} onClose={closeAll} onOverlayClick={closeAll} onEscPress={closeAll} heading={isIngredientModal ? 'Детали ингредиента' : ''}>
                {isOrderModal && <OrderDetails />}

                {detailsLoading && <p>Загрузка данных ингредиента...</p>}
                {detailsError && <p>Произошла ошибка при загрузке данных ингредиента</p>}

                {isIngredientModal && !detailsLoading && !detailsError && ingredient && (
                    <IngredientDetails /*ingredient={ingredient}*/ />
                )}
            </Modal>
        </>
    );
};


