<script lang="ts">
    import type { ICursorSurface } from '@pixel-brewery/cursor-browser';
    import type { ICursorController } from '@pixel-brewery/cursor-core';
    import {
        cursorSurface,
        cursorTarget,
        useCursorAccessorRegistry,
    } from '@pixel-brewery/cursor-svelte';
    import type { Readable } from 'svelte/store';
    import { markFixtureButtonAccessor } from './FixtureButtonAccessor.js';

    let { controller, targetId, allowSurfaceProjection }: {
        controller: Readable<ICursorController>;
        targetId: Readable<string>;
        allowSurfaceProjection: Readable<boolean>;
    } = $props();

    const registry = useCursorAccessorRegistry();
    let surface = $state.raw<ICursorSurface | null>(null);

    function onAttachment(attachment: ICursorSurface | null) {
        surface = attachment;
    }

    function verifyAccessor(element: HTMLButtonElement) {
        markFixtureButtonAccessor(registry, element);
    }
</script>

<section data-testid="surface" use:cursorSurface={{ controller: $controller, allowSurfaceProjection: $allowSurfaceProjection, onAttachment }}>
    {#key $targetId}
        <button type="button" use:cursorTarget={{ surface, targetId: $targetId }} use:verifyAccessor>Target</button>
    {/key}
</section>
