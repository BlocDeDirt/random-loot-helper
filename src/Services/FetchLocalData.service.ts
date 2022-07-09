class FetchLocalDataService{
    async GetData<T>(dataName:string){
        let response = await fetch(process.env.PUBLIC_URL + "assets/data/" + dataName);
        let json:T = await response.json();
        return json;
    }
}

export const LocalDataService = new FetchLocalDataService();