export type User = any

export interface UserState {
    init: boolean;
    user: User | null | boolean;
};

export const initialState: UserState = {
    init: false,
    user: null
}

export const noUser = {
    init: true,
    user: null
}