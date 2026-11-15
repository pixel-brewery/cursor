// #region Imports

import type { ICursorFeature } from '@pixel-brewery/cursor-browser';
import { defineComponent, type DefineSetupFnComponent, type PropType } from 'vue';
import type { ICursorProviderProps } from './ICursorProviderProps.js';
import { provideCursor } from './provideCursor.js';

// #endregion

/**
 * Provides an accessor registry to the default slot without adding a DOM wrapper.
 * Supply the features when the component is mounted.
 *
 * @public
 */
export const CursorProvider: DefineSetupFnComponent<ICursorProviderProps> = defineComponent(
    (props: ICursorProviderProps, { slots }) => {
        provideCursor(...(props.features ?? []));
        return () => slots.default?.();
    },
    {
        name: 'CursorProvider',
        props: { features: Array as PropType<readonly ICursorFeature[]> },
    },
);
