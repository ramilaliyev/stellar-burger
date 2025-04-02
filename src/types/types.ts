export type TIngredient = {
    uniqueId?: string;
    _id: string;
    name: string;
    type: "bun" | "sauce" | "main";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
};

export type TDraggableIngredient = TIngredient & {
    ingredient: TIngredient
    index: number,
    moveCard: (from?: number, to?: number) => void;
    fromBurgerConstructor? : boolean
};

export type TOrderResponse = {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};


// API response types

export type TSuccessMessage = {
    success: true;
    message: string;
    token?: string;
};

export type TLogin = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
      email: string;
      name: string;
    };
    message?: string;
};

export type TRegister = {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
    message?: string;
};

export type TRefreshToken = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type TUserResponse = {
    success: true;
    user: {
      email: string;
      name: string;
    };
    ok?: boolean;
};

export type TUserData = {
    name: string;
    email: string;
    password: string;
}