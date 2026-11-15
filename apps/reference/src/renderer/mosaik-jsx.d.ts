import type { ElementEvent } from '@pixel-brewery/mosaik-elements-foundation';
import type { ClassAttributes, HTMLAttributes, TargetedEvent } from 'preact';

type MosaikProps<
    Tag extends keyof HTMLElementTagNameMap,
    Keys extends keyof HTMLElementTagNameMap[Tag] = never,
> = ClassAttributes<HTMLElementTagNameMap[Tag]> &
    HTMLAttributes<HTMLElementTagNameMap[Tag]> &
    Partial<Pick<HTMLElementTagNameMap[Tag], Keys>>;

type MosaikEvent<Tag extends keyof HTMLElementTagNameMap, Name extends string> = (
    event: TargetedEvent<HTMLElementTagNameMap[Tag], ElementEvent<HTMLElementTagNameMap[Tag], Name>>,
) => void;

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'mosaik-badge': MosaikProps<'mosaik-badge', 'appearance' | 'icon' | 'label' | 'variant'>;
            'mosaik-button': MosaikProps<'mosaik-button', 'appearance' | 'disabled' | 'icon' | 'label' | 'size' | 'variant'>;
            'mosaik-card': MosaikProps<'mosaik-card', 'appearance'>;
            'mosaik-card-actions': MosaikProps<'mosaik-card-actions'>;
            'mosaik-card-content': MosaikProps<'mosaik-card-content'>;
            'mosaik-card-footer': MosaikProps<'mosaik-card-footer'>;
            'mosaik-card-header': MosaikProps<'mosaik-card-header'>;
            'mosaik-card-sub-title': MosaikProps<'mosaik-card-sub-title', 'text'>;
            'mosaik-card-title': MosaikProps<'mosaik-card-title', 'text'>;
            'mosaik-chat': MosaikProps<'mosaik-chat', 'begin' | 'scrollToEnd'>;
            'mosaik-chat-message': MosaikProps<'mosaik-chat-message', 'appearance' | 'author' | 'reply' | 'text'>;
            'mosaik-chat-prompt-box': MosaikProps<
                'mosaik-chat-prompt-box',
                'disabled' | 'intl' | 'isBusy' | 'maxRows' | 'maxlength' | 'placeholder' | 'queueOnBusy'
            > & {
                onpromptSubmitted?: MosaikEvent<'mosaik-chat-prompt-box', 'promptSubmitted'>;
                onstopRequested?: MosaikEvent<'mosaik-chat-prompt-box', 'stopRequested'>;
            };
            'mosaik-divider': MosaikProps<'mosaik-divider'>;
            'mosaik-empty-state': MosaikProps<'mosaik-empty-state', 'content' | 'header' | 'icon' | 'iconSize'>;
            'mosaik-image': MosaikProps<'mosaik-image', 'alt' | 'fit' | 'height' | 'src' | 'width'>;
            'mosaik-message': MosaikProps<'mosaik-message', 'appearance' | 'header' | 'variant'>;
            'mosaik-passwordbox': MosaikProps<'mosaik-passwordbox', 'autocomplete' | 'disabled' | 'label' | 'required' | 'value'>;
            'mosaik-select': MosaikProps<'mosaik-select', 'disabled' | 'intl' | 'label' | 'placeholder' | 'required' | 'value'> & {
                onchanged?: MosaikEvent<'mosaik-select', 'changed'>;
            };
            'mosaik-select-item': MosaikProps<'mosaik-select-item', 'label' | 'value'>;
            'mosaik-text': MosaikProps<'mosaik-text', 'text'>;
            'mosaik-textbox': MosaikProps<'mosaik-textbox', 'autocomplete' | 'disabled' | 'label' | 'maxlength' | 'required' | 'value'>;
        }
    }
}
