const KEY_LINKED_LIST = "linkedList";

class LocalStorage_Service{
    dataLocalStorage:string[][] = [];
    positionOfEdit = -1; //-1 Not in EDIT MODE ELSE it's the position of the EDIT in the array
    constructor(){
        this.GetLocalStorage();
    }

    private GetLocalStorage(){
        let JSONString = localStorage.getItem(KEY_LINKED_LIST);
        if(JSONString){
            this.dataLocalStorage = JSON.parse(JSONString);
        }
    }

    public AddNewDataToLocalStorage(newData:string[]){
        this.dataLocalStorage.push(newData);
        localStorage.setItem(KEY_LINKED_LIST, JSON.stringify(this.dataLocalStorage));
    }

    public EditDataToLocalStorage(newData:string[]){
        this.dataLocalStorage[this.positionOfEdit] = newData;
        this.positionOfEdit = -1;
        localStorage.setItem(KEY_LINKED_LIST, JSON.stringify(this.dataLocalStorage));
    }

    public GetPositionOfWantedRow(wantedRow:string[]){
        let i = 0;
        while(this.CheckIfSame(this.dataLocalStorage[i], wantedRow) === false){
            i++;
        }
        return i;
    }
    
    public DeleteDataFromLocalStorage(dataToDelete:string[]){
        this.dataLocalStorage.splice(this.GetPositionOfWantedRow(dataToDelete), 1);
        localStorage.setItem(KEY_LINKED_LIST, JSON.stringify(this.dataLocalStorage));
    }

    public IsLinkedListAlreadyInStorage(data:string[]){
        for(let i = 0; i < this.dataLocalStorage.length; i++){
            if(this.CheckIfSame(this.dataLocalStorage[i], data)){
                return true;
            }
        }
        return false;
    }

    private CheckIfSame(rowToCheck:string[], data:string[]){
        if(rowToCheck.length !== data.length){
            return false
        }

        for(let i = 0; i < rowToCheck.length; i++){
            if(rowToCheck[i] !== data[i]){
                return false
            }
        }
        return true;
    }

}

export const LocalStorageService = new LocalStorage_Service();