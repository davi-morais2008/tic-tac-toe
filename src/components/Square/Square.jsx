import styles from './Square.module.css'

function Square ({valor, aoClicarSquare}) {

    return(
        <button className={styles.square} onClick={aoClicarSquare}>{valor}</button>
    )
}

export default Square