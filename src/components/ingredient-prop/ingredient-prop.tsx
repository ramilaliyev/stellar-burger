import styles from './ingredient-prop.module.css';

type TIngredientPropProps = {
    name: string;
    value: number
}

const IngredientProp = (props : TIngredientPropProps ) : React.JSX.Element => {
    return(
        <li className={`text text_type_main-default text_color_inactive mr-5 ${styles.prop}`}>
            <span className={styles.name}>{props.name}</span>
            <span className={`text text_type_digits-medium ${styles.value}`}>{props.value}</span>
        </li>
    )
}

export default IngredientProp;