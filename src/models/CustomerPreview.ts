import {ICustomerPreview, ICustomerPreviewMerged} from "../interfaces/ICustomerPreview";

export class CustomerPreview implements ICustomerPreview {
    id: string;
    constructor(dat: ICustomerPreview) {
        this.id = dat.id;
        this.first_name = dat.first_name;
        this.sur_name = dat.sur_name;
    }

    first_name: string;
    sur_name: string;
}