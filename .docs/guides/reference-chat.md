# Reference chat

The browser and Electron share one chat renderer. Each view keeps its conversation in memory. The reference server sends the latest turn and up to four completed turns to a local language model. No account is required for the llama.cpp setup below.

## Start the model

With `llama-server` and `openssl` available, run the following from the Cursor checkout. The first run downloads approximately 1.12 GB from the [Qwen model repository](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF).

```sh
export CURSOR_CHAT_API_KEY="$(openssl rand -hex 24)"
LLAMA_API_KEY="$CURSOR_CHAT_API_KEY" llama-server \
  -hf Qwen/Qwen2.5-1.5B-Instruct-GGUF:Q4_K_M \
  --host 127.0.0.1 --port 4318 --alias cursor-model -c 4096 &
```

When the local model is ready, run `yarn demo:web` in the same shell. Open [the demo](http://127.0.0.1:4317/) in two tabs or run `yarn demo:electron` to join the browser from Electron. You can also start Electron on its own from the shell that has the model settings.

1. Type **Zeig mir die Einstellungen**. The violet assistant pointer goes to **Einstellungen** while the panel stays closed.
2. Type **Öffne die Einstellungen**. The pointer goes to the control and the registered action opens the panel.

The prompt box supports Enter to send, Shift+Enter to insert a line break, and **Abbrechen** while waiting.

## Model settings

| Environment variable   | Default                    | Purpose                                                                        |
| ---------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| `CURSOR_CHAT_BASE_URL` | `http://127.0.0.1:4318/v1` | OpenAI-compatible HTTP server on IPv4 loopback with structured output support. |
| `CURSOR_CHAT_MODEL`    | `cursor-model`             | Model identifier reported by the local server.                                 |
| `CURSOR_CHAT_API_KEY`  | Unset                      | Server-side bearer credential if the model server requires one.                |

The same-origin `POST /api/chat` accepts a bounded text conversation. The AI SDK validates the reply as text and one of `show-settings`, `open-settings` or `none`. The renderer maps the two action suggestions to the existing Cursor registrations. It reports completed actions from the controller's result. The Cursor SDK receives a structured command and the host's authorization decision.

The installed Mosaik 0.1.205 catalog supplied `template-ai-chat`, `recipe-chat-conversation` and `recipe-chat-composer`, including both recipes' options and the native component documentation and anatomy. The demo uses Soho light with Mosaik Chat, Chat Message, Chat Prompt Box, Button, Card and Message.

## Verify

`yarn test:demo` runs the browser and Electron interaction against an OpenAI-compatible HTTP fixture through the real AI SDK connection. With a running model and its environment set, `CURSOR_LIVE_CHAT=1 yarn test:demo` exercises the same two prompts with model-generated replies.
