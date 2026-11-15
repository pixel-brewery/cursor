<script lang="ts">
    import { provideCursor, withCursorAccessors } from '@pixel-brewery/cursor-svelte';
    import type { ComponentProps } from 'svelte';
    import { FixtureButtonAccessor } from './FixtureButtonAccessor.js';
    import SvelteFixture from './SvelteFixture.svelte';

    let props: ComponentProps<typeof SvelteFixture> = $props();
    provideCursor(withCursorAccessors(FixtureButtonAccessor));
</script>

<SvelteFixture {...props} />
