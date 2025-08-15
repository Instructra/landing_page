import { create } from 'zustand'

export enum WaitListStages {
    SELECTION = 'selection',
    EMAIL_COLLECTION = 'email collection',

}

export enum SelectedUserType {
    INSTRUCTOR = "instructor",
    LEARNER = 'learner'
}

export type WaitListDialogState = {
    isActive: boolean,
    dialogStage: WaitListStages,
    selectedUserType: SelectedUserType,
}
const DEFAULT_STATE: WaitListDialogState = {
    isActive: false,
    dialogStage: WaitListStages.SELECTION,
    selectedUserType: SelectedUserType.INSTRUCTOR,
}
export interface WaitListStore {
    state: WaitListDialogState;
    toggleDialog: () => void;
    nextStage: (selectedUserType: SelectedUserType) => void;
    reset: () => void;
}

export const useWaitListStore = create<WaitListStore>((set, get, store) => ({
    state: DEFAULT_STATE,
    toggleDialog: function () {
        return set(state => ({
            state: {
                ...state.state,
                isActive: !state.state.isActive,
            },
        }));
    },
    nextStage: (selectedUserType: SelectedUserType) => set(state => ({
        state: {
            ...state.state,
            dialogStage: state.state.dialogStage = WaitListStages.EMAIL_COLLECTION,
            selectedUserType: state.state.selectedUserType = selectedUserType,
        },
    })),
    reset: () => set(store.getInitialState()),
}));
