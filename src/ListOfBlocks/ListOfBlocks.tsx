import { useEffect, useState } from "react";
import { LocalDataService } from "../Services/FetchLocalData.service";
import { IBlock } from "../Interface/IBlocks";
import styles from "./ListOfBlocks.module.css";

export default function ListOfBlocks(props:{className:string, setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>}){
    const [listOfBlocks, setListOfBlocks] = useState<IBlock>();
    const [search, setSearch] = useState("");

    useEffect(() => {
        LocalDataService.GetData<IBlock>("blocks.json")
        .then((list) => {
            setListOfBlocks(list);
        });
    },[]);

    return(
        <div className={props.className}>
            <input className={styles.input} type="text" placeholder="Type your search here"
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            />
            {listOfBlocks
                ? <ListFiltered 
                    searchedValue={search.toUpperCase()} 
                    listValues={listOfBlocks?.blocks} 
                    setLinkedRandomDrop={props.setLinkedRandomDrop}></ListFiltered>
                : "loading"
            }

        </div>
    )
}

function ListFiltered(props:{searchedValue:string, listValues:string[] | undefined, setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>}){
    let listValues:string[] = [];
    if(props.listValues){
        props.listValues.forEach(value => {
            if(value.indexOf(props.searchedValue) > -1){
                listValues.push(value);
            }
        });
    }
    return(
        <>
            {listValues.map((value, index) => {
                return(
                    <div className={styles.block} key={index}
                    onClick={() => {props.setLinkedRandomDrop((oldValues) => [...oldValues, value])}}>
                        {value}
                    </div>
                )
            })}
        </>
    )
}