import { ChangeEvent } from "react";

export const handleChange = (setter: (val: string) => void) => (e : ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
}