import { useState } from 'react'
import './App.css'
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

import ingredientsData from './utils/ingredients.json';



function App() {
  return (
    <>
      <AppHeader />
      <main className="main">
        <BurgerIngredients ingredients={ingredientsData}/>
        <BurgerConstructor ingredients={ingredientsData}/>
      </main>
    </>
  )
}

export default App
