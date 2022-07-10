import { useEffect, useState } from "react";
import { LocalDataService } from "../Services/FetchLocalData.service";
import { IList } from "../Interface/Ilist";
import styles from "./ListOfBlocks.module.css";

export default function ListOfBlocks(props:{className:string, setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>, nameJSON:string}){
    const [listOfBlocks, setListOfBlocks] = useState<IList>();
    const [search, setSearch] = useState("");

    useEffect(() => {
        LocalDataService.GetData<IList>(props.nameJSON)
        .then((list) => {
            setListOfBlocks(list);
            setSearch("");
        });
    },[props.nameJSON]);

    return(
        <div className={props.className}>
            <input className={styles.input} type="text" placeholder="Type your search here"
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            />
            {listOfBlocks
                ? <ListFiltered 
                    searchedValue={search.toUpperCase()} 
                    listValues={listOfBlocks?.values} 
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