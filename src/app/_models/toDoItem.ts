import { SelectListItem } from './selectListItem';

export class TODOItem{
    temptId:number;
    toDOText:string;
    mintime:string;
    hourTime:string;
    // statusId:number;
    statusName:SelectListItem;
    // priorityId:number;
    priorityName:SelectListItem;
}