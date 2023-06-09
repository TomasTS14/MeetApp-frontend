import { eventFormActionTypes } from "@/consts";


export default function eventFormReducer(state, action) {
    switch (action.type) {
        case eventFormActionTypes.handleInputText:
            return {
                ...state,
                [action.field]: action.payload,
            };
        case eventFormActionTypes.handleInputDate:
            return {
                ...state,
                [action.field]: action.payload,
            };
    }
}