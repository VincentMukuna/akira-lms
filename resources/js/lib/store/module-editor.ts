import { BaseModule } from '@/types/course';
import { atom } from 'jotai';

interface ModuleEditorState {
    isDirty: boolean;
    originalModule: BaseModule | null;
    currentModule: BaseModule | null;
}

const initialState: ModuleEditorState = {
    isDirty: false,
    originalModule: null,
    currentModule: null,
};

const moduleEditorStore = atom<ModuleEditorState>(initialState);

export const getModuleEditorState = atom((get) => get(moduleEditorStore));

export const setModuleEditorState = atom(
    null,
    (get, set, module: BaseModule | null) => {
        set(moduleEditorStore, {
            isDirty: false,
            originalModule: module,
            currentModule: module ? { ...module } : null,
        });
    },
);

export const updateCurrentModule = atom(
    null,
    (get, set, updates: Partial<BaseModule>) => {
        const state = get(moduleEditorStore);
        if (!state.currentModule) return;

        set(moduleEditorStore, {
            ...state,
            isDirty: true,
            currentModule: {
                ...state.currentModule,
                ...updates,
            },
        });
    },
);

export const resetModuleEditor = atom(
    null,
    (get, set) => {
        const state = get(moduleEditorStore);
        set(moduleEditorStore, {
            ...state,
            isDirty: false,
            currentModule: state.originalModule ? { ...state.originalModule } : null,
        });
    },
); 