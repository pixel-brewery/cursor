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

## HTTP and WebSocket contracts

`POST /api/chat` accepts `application/json` from the exact reference origin and host. The body is limited to 32 KiB. Send an object with `messages`, an array of one to nine entries with `role` and `content`. Roles alternate from `user` to `assistant` and the final message is from the user. Trimmed content must contain 1 to 700 characters.

```json
{ "messages": [{ "role": "user", "content": "Öffne die Einstellungen" }] }
```

A successful response contains a reply of 1 to 450 characters and a suggestion. These are the supported suggestions.

| Suggestion      | How the reference view handles it                                           |
| --------------- | --------------------------------------------------------------------------- |
| `show-settings` | Runs a show command for the registered Settings target.                     |
| `open-settings` | Presents the same target and invokes its authorized `open-settings` action. |
| `none`          | Appends the conversational reply.                                           |

The client reports action completion from the controller result. It aborts a pending chat request or cursor presentation when the user cancels or the view disconnects. The server allows two simultaneous generations, bounds body reads to five seconds and limits model inference to 30 seconds. Closing the client connection or stopping the reference server cancels pending inference.

| Response              | Meaning                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `200`                 | Validated reply and suggestion.                                      |
| `400 invalid-request` | Wrong method, origin, host, media type or request shape.             |
| `429 busy`            | Both model request slots are in use.                                 |
| `503 unavailable`     | The model is unavailable, timed out or produced an invalid response. |

The `/cursor` WebSocket route accepts the reference origin and relays valid pointer updates for the demo view. It assigns participants to connections, stamps their identity and generation on outgoing events, and announces departure on disconnect. The chat action stays in the view that submitted the message. Participant cursors still travel through the relay. Host applications can use the [Cursor transport contract](integrate-cursor.md#connect-identity-and-transport) with their own membership and authentication.

The installed Mosaik 0.1.205 catalog supplied `template-ai-chat`, `recipe-chat-conversation` and `recipe-chat-composer`, including both recipes' options and the native component documentation and anatomy. The demo uses Soho light with Mosaik Chat, Chat Message, Chat Prompt Box, Button, Card and Message.

## Verify

`yarn test:demo` runs the TypeScript Playwright browser and Electron specs against an OpenAI-compatible HTTP fixture through the real AI SDK connection. With a running model and its environment set, `CURSOR_LIVE_CHAT=1 yarn test:demo` exercises the chat with model-generated replies. The [testing guide](testing.md) lists the Vitest transport checks and framework projects.
