import { TOrderResponse } from "../types/types";

type TParams = {
    orders : TOrderResponse[];
    id : string;
};

type TIngredientDetailsSlice = {
    details: TOrderResponse | null,
    loading: boolean,
    error: string | null
};

export const getFeedDetails = ({orders, id} : TParams) => {
    const feed = orders.find((order : {_id : string}) => {
        return order._id === id
    });

    console.log(feed);
    
}
