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

            <button className={props.tabSelected === Tab.flowerPot ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.flowerPot)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/flowerPot.png"} alt="minecraft flower pot" />
            </button>

            <button className={props.tabSelected === Tab.mob ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.mob)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/creeperHead.png"} alt="minecraft creeper head" />
            </button>

            <button className={props.tabSelected === Tab.bookAndQuill ? styles.activeButton : styles.nonActiveButton}
            onClick={((e) => {props.setTabSelected(Tab.bookAndQuill)})}
            >
                <img src={process.env.PUBLIC_URL+"assets/images/bookAndQuill.png"} alt="minecraft book and quill" />
            </button>
        </nav>
    )
}

interface IPropSelection{
    setTabSelected:React.Dispatch<React.SetStateAction<Tab>>
    tabSelected:Tab;
}