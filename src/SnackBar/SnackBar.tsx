import { useCallback, useEffect } from "react";
import styles from "./SnackBar.module.css";

export default function SnackBar(props:{setToggleSnackBar:React.Dispatch<React.SetStateAction<boolean>>, message:string, backgroundColor:string, color:string}){

    const refSnackBar = useCallback((node:HTMLDivElement) => {
        setTimeout(() => {
            if(node) node.classList.remove(styles.translateLeft);
        }, 1);

        setTimeout(() => {
            if(node) node.classList.add(styles.translateLeft);

            setTimeout(() => {
                props.setToggleSnackBar(false);
            }, 310);

        }, 4500);
    },[])

    return(
        <div ref={refSnackBar} className={styles.snackBar + " " + styles.translateLeft}>
            <div>
                <div className={styles.message} style={{backgroundColor:props.backgroundColor, color:props.color}}>
                    {props.message}
                </div>
            </div>
        </div>
    )
}