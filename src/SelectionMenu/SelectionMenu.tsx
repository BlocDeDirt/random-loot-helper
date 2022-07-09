import styles from "./SelectionMenu.module.css";
import { Tab } from "../EnumTab/EnumTab";

export default function SelectionMenu(props:IPropSelection){

    return(
        <nav className={styles.nav}>
            <button className={props.tabSelected === Tab.block ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.block)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/grass_block.png"} alt="minecraft grass block" />
            </button>

            <button className={props.tabSelected === Tab.item ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.item)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/pickaxe.png"} alt="minecraft pickaxe" />
            </button>

            <button className={props.tabSelected === Tab.lootChest ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.lootChest)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/chest.png"} alt="minecraft chest" />
            </button>
        </nav>
    )
}

interface IPropSelection{
    setTabSelected:React.Dispatch<React.SetStateAction<Tab>>
    tabSelected:Tab;
}