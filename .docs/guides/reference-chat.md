# Reference chat

The browser and Electron share one chat renderer. Each view keeps its conversation in memory. Electron uses the native CLI selected in the app’s connection settings. The browser uses the reference server’s configured loopback model endpoint. Both send the latest turn and up to four completed turns.

## Configure a local connection in Electron

1. Install the desired native client and start the desktop demo from this checkout with `yarn demo:electron`.
2. Open **Modellverbindung**, select **Codex**, **Claude Code** or **OpenCode**, and save the connection. Codex and Claude Code accept an optional native model identifier. OpenCode requires the exact provider, its native sign-in method label and a model identifier in `provider/model` format.
3. If the selected profile is signed out, choose an advertised sign-in method and start it in the app. Follow the native instructions in the system browser or provide a verification code when requested. **Verbindung prüfen** checks the installed CLI and the profile’s native authentication status.
4. When the connection is ready, use the chat with **Zeig mir die Einstellungen** and **Öffne die Einstellungen**.

The Electron main process uses Synapse 0.0.16 to create a Cursor-owned profile, manage native sign-in and run structured text requests with a read-only policy. The selection is stored in Electron’s application data directory. Native credentials stay in the isolated profile. The sandboxed preload exposes connection status, sign-in controls and validated chat results to the desktop renderer. Switching the selected connection starts a fresh conversation.

The CLI runs locally. The configured provider determines where inference runs and which account it uses. Codex and Claude Code subscriptions can require their provider’s service. OpenCode uses its selected native provider.

### Desktop connection contract

The preload exposes `window.cursorDesktop` in Electron. The main process accepts calls from the reference window’s top-level document. `save` accepts a CLI identifier and the provider’s documented model fields. `getState` reads the selection and readiness. `check` probes the executable and its isolated account. These parameters carry no network address or executable path.

`startLogin` accepts an advertised method. The native flow can ask for browser authorization or one-time inputs. The main process opens the authorization page through `openLogin`. `respondLogin` ties inputs to the current operation and interaction. `cancelLogin` ends the native sign-in process. The settings file stores only the CLI selection and model fields.

`chat` accepts a request ID and the same `messages` contract as the browser. Electron permits one request at a time and gives native inference up to 60 seconds. The preload returns a validated reply and suggestion. `cancelChat` aborts a matching request. Closing or reloading the reference window cancels its request.

## Start the browser model

With `llama-server` and `openssl` available, run the following from the Cursor checkout. The first run downloads approximately 1.12 GB from the [Qwen model repository](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF).

```sh
export CURSOR_CHAT_API_KEY="$(openssl rand -hex 24)"
LLAMA_API_KEY="$CURSOR_CHAT_API_KEY" llama-server \
  -hf Qwen/Qwen2.5-1.5B-Instruct-GGUF:Q4_K_M \
  --host 127.0.0.1 --port 4318 --alias cursor-model -c 4096 &
```

When the local model is ready, run `yarn demo:web` in the same shell. Open [the demo](http://127.0.0.1:4317/) in two tabs, or pair one tab with Electron. Paired views exchange pointers through the same reference relay. Each host uses its own chat connection.

1. Type **Zeig mir die Einstellungen**. The violet assistant pointer goes to **Einstellungen** while the panel stays closed.
2. Type **Öffne die Einstellungen**. The pointer goes to the control and the registered action opens the panel.

The prompt box supports Enter to send, Shift+Enter to insert a line break, and **Abbrechen** while waiting.

## Browser model environment

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

The client reports action completion from the controller result. It aborts a pending chat request or cursor presentation when the user cancels or the view disconnects. The browser endpoint allows two simultaneous generations, bounds body reads to five seconds and limits model inference to 30 seconds. Closing the client connection or stopping the reference server cancels pending browser inference. Electron uses a separate bounded native CLI request.

| Response              | Meaning                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `200`                 | Validated reply and suggestion.                                      |
| `400 invalid-request` | Wrong method, origin, host, media type or request shape.             |
| `429 busy`            | Both model request slots are in use.                                 |
| `503 unavailable`     | The model is unavailable, timed out or produced an invalid response. |

The `/cursor` WebSocket route accepts the reference origin and relays valid pointer updates for the demo view. It assigns participants to connections, stamps their identity and generation on outgoing events, and announces departure on disconnect. The chat action stays in the view that submitted the message. Participant cursors still travel through the relay. Host applications can use the [Cursor transport contract](integrate-cursor.md#connect-identity-and-transport) with their own membership and authentication.

The installed Mosaik 0.1.205 catalog supplied `template-ai-chat`, `recipe-chat-conversation` and `recipe-chat-composer`, including both recipes' options and the native component documentation and anatomy. The demo uses Soho light with Mosaik Chat, Chat Message, Chat Prompt Box, Button, Card and Message.

The desktop connection panel follows the form sections in `template-settings` and `recipe-profile-settings`, with the compact authentication prompt from `recipe-dialog-form--phone-code`. The same catalog supplied the recipe options and the native Card, Select, Select Item, Textbox, Password Box, Button and Message APIs and anatomy. The app uses those controls from Mosaik Foundation 0.1.205 and registers the matching Reicon aliases, including the dropdown, chat and password field icons.

## Verify

`yarn test:demo` runs the TypeScript Playwright browser and Electron specs. The browser uses an OpenAI-compatible HTTP fixture through the real AI SDK connection. Electron uses the real Synapse driver against an isolated CLI executable fixture. `CURSOR_LIVE_CHAT=1 yarn test:demo` uses the configured real model for browser chat turns. The [testing guide](testing.md) lists the Vitest contracts and framework checks.

A Chromium run at 448 and 1200 CSS pixels exercised the desktop connection markup with a fixture for the preload bridge. It covered saving and checking an OpenCode selection, explicitly opening the login page, displaying a device code, submitting and clearing a native response field, keyboard selection and cancellation. The same run confirmed the controls stay hidden in the browser when the preload bridge is absent.
