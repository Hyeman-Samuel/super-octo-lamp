
export class PaginatedList<T>{
    private itemsPerPage:number;
    public page:number = 1;
    public itemsCount:number;
    public items:T[];


    constructor(itemsPerPage:number=10) {
        this.itemsPerPage = itemsPerPage;
        this.items=[]
        this.itemsCount = 0;
    }

    public setItems(items:T[]){
        this.items = items;
        this.itemsCount = items.length
    }

    public setPage(page:number){
        this.page = (page<1)?1:page;
    }

    public take():number{
        return this.itemsPerPage;
    }
    public skip():number{
        let pageIndex = this.page-1;
        let skip = this.itemsPerPage*pageIndex;
        return skip;
    }



}