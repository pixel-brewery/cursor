<script lang="ts">
    import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
    import type { ICursorController } from '@pixel-brewery/cursor-core';
    import { cursorSurface, cursorTarget } from '@pixel-brewery/cursor-svelte';
    import type { Readable } from 'svelte/store';

    let { controller, targetId }: {
        controller: Readable<ICursorController>;
        targetId: Readable<string>;
    } = $props();

    let surface = $state.raw<ICursorSurface | null>(null);

    function onAttachment(attachment: ICursorSurface | null) {
        surface = attachment;
    }
</script>

<section data-testid="surface" use:cursorSurface={{ controller: $controller, onAttachment }}>
    {#key $targetId}
        <button type="button" use:cursorTarget={{ surface, targetId: $targetId }}>Target</button>
    {/key}
</section>
