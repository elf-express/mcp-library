import { useTranslation } from "react-i18next";
import type { RegisterOAuthState, RegisterServerFormState } from "@/lib/registerForm";
import { SegmentedControl } from "@/components/SegmentedControl";

export type AddServerMode = "remote" | "local" | "json";

interface AddServerModalProps {
  form: RegisterServerFormState;
  mode: AddServerMode;
  jsonText: string;
  error: string;
  busy: boolean;
  oauth: RegisterOAuthState | null;
  onModeChange: (mode: AddServerMode) => void;
  onField: <K extends keyof RegisterServerFormState>(field: K, value: RegisterServerFormState[K]) => void;
  onJsonText: (text: string) => void;
  onKeyValue: (field: "env_rows" | "header_rows", index: number, key: "key" | "value", value: string) => void;
  onAddRow: (field: "env_rows" | "header_rows") => void;
  onRemoveRow: (field: "env_rows" | "header_rows", index: number) => void;
  onClose: () => void;
  onSubmit: () => void;
  oauthHandlers: { onStart: () => void; onReset: () => void };
}

export function AddServerModal({
  form,
  mode,
  jsonText,
  error,
  busy,
  oauth,
  onModeChange,
  onField,
  onJsonText,
  onKeyValue,
  onAddRow,
  onRemoveRow,
  onClose,
  onSubmit,
  oauthHandlers,
}: AddServerModalProps) {
  const { t } = useTranslation();

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="panel-label">{t("addServer.panelLabel")}</p>
            <h2>{oauth ? t("addServer.oauthTitle") : t("addServer.modalTitle")}</h2>
          </div>
          <button className="secondary-action" onClick={onClose} type="button">
            {t("common.close")}
          </button>
        </div>

        {oauth ? (
          <div className="modal-form oauth-step">
            <p className="oauth-message">{t("addServer.oauthMessage")}</p>
            <div className="oauth-status-card">
              <div>
                <span className="oauth-status-label">{t("addServer.oauthStatusLabel")}</span>
                <strong>
                  {oauth.hasOpenedBrowser
                    ? t("addServer.oauthWaiting")
                    : t("addServer.oauthAuthRequired")}
                </strong>
              </div>
              {oauth.authorization.expires_at ? (
                <p className="oauth-status-meta">
                  {t("addServer.oauthExpires", {
                    time: new Date(oauth.authorization.expires_at).toLocaleTimeString(),
                  })}
                </p>
              ) : null}
            </div>
            {oauth.error ? <p className="form-error">{oauth.error}</p> : null}
          </div>
        ) : (
          <div className="modal-form">
            <SegmentedControl<AddServerMode>
              ariaLabel={t("addServer.modalTitle")}
              onChange={onModeChange}
              options={[
                { value: "remote", label: t("addServer.tab.remote") },
                { value: "local", label: t("addServer.tab.local") },
                { value: "json", label: t("addServer.tab.json") },
              ]}
              value={mode}
            />

            {mode === "json" ? (
              <label className="form-field">
                <span>{t("addServer.json.label")}</span>
                <textarea
                  className="table-filter form-input form-textarea"
                  onChange={(event) => onJsonText(event.target.value)}
                  placeholder={t("addServer.json.placeholder")}
                  value={jsonText}
                />
              </label>
            ) : (
              <>
                <label className="form-field">
                  <span>{t("addServer.serverName")}</span>
                  <input
                    className="table-filter form-input"
                    onChange={(event) => onField("name", event.target.value)}
                    placeholder={mode === "remote" ? "context7" : "filesystem"}
                    value={form.name}
                  />
                </label>

                <label className="form-field">
                  <span>{t("common.field.description")}</span>
                  <input
                    className="table-filter form-input"
                    onChange={(event) => onField("description", event.target.value)}
                    placeholder={mode === "remote" ? "context7 mcp server" : "Local filesystem access"}
                    value={form.description}
                  />
                </label>

                {mode === "remote" ? (
                  <>
                    <div className="form-grid">
                      <label className="form-field">
                        <span>{t("addServer.transport.label")}</span>
                        <SegmentedControl<"streamable_http" | "sse">
                          ariaLabel={t("addServer.transport.label")}
                          onChange={(value) => onField("transport", value)}
                          options={[
                            { value: "streamable_http", label: t("addServer.transport.http") },
                            { value: "sse", label: t("addServer.transport.sse") },
                          ]}
                          value={form.transport === "sse" ? "sse" : "streamable_http"}
                        />
                      </label>

                      <label className="form-field">
                        <span>{t("addServer.sessionMode")}</span>
                        <select
                          className="table-filter form-input compact-select"
                          onChange={(event) =>
                            onField("session_mode", event.target.value as RegisterServerFormState["session_mode"])
                          }
                          value={form.session_mode}
                        >
                          <option value="stateless">stateless</option>
                          <option value="stateful">stateful</option>
                        </select>
                      </label>
                    </div>

                    <label className="form-field">
                      <span>{t("addServer.targetUrl")}</span>
                      <input
                        className="table-filter form-input"
                        onChange={(event) => onField("url", event.target.value)}
                        placeholder={
                          form.transport === "streamable_http"
                            ? "https://mcp.context7.com/mcp"
                            : "http://127.0.0.1:8000/mcp"
                        }
                        value={form.url}
                      />
                    </label>

                    <label className="form-field">
                      <span>{t("addServer.bearerToken")}</span>
                      <input
                        className="table-filter form-input"
                        onChange={(event) => onField("bearer_token", event.target.value)}
                        placeholder="Optional"
                        type="password"
                        value={form.bearer_token}
                      />
                    </label>

                    {form.transport === "streamable_http" ? (
                      <div className="form-field">
                        <span>{t("addServer.headers")}</span>
                        <div className="key-value-list">
                          {form.header_rows.map((row, index) => (
                            <div className="key-value-row" key={`header-${index}`}>
                              <input
                                className="table-filter form-input"
                                onChange={(event) =>
                                  onKeyValue("header_rows", index, "key", event.target.value)
                                }
                                placeholder="Header"
                                value={row.key}
                              />
                              <input
                                className="table-filter form-input"
                                onChange={(event) =>
                                  onKeyValue("header_rows", index, "value", event.target.value)
                                }
                                placeholder="Value"
                                value={row.value}
                              />
                              <button
                                className="secondary-action"
                                onClick={() => onRemoveRow("header_rows", index)}
                                type="button"
                              >
                                {t("common.remove")}
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          className="secondary-action inline-action"
                          onClick={() => onAddRow("header_rows")}
                          type="button"
                        >
                          {t("addServer.addHeader")}
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <label className="form-field">
                      <span>{t("addServer.command")}</span>
                      <input
                        className="table-filter form-input"
                        onChange={(event) => onField("command", event.target.value)}
                        placeholder="npx"
                        value={form.command}
                      />
                    </label>

                    <label className="form-field">
                      <span>{t("addServer.arguments")}</span>
                      <textarea
                        className="table-filter form-input form-textarea"
                        onChange={(event) => onField("args_text", event.target.value)}
                        placeholder="-y&#10;@modelcontextprotocol/server-filesystem"
                        value={form.args_text}
                      />
                    </label>

                    <div className="form-field">
                      <span>{t("addServer.envVars")}</span>
                      <div className="key-value-list">
                        {form.env_rows.map((row, index) => (
                          <div className="key-value-row" key={`env-${index}`}>
                            <input
                              className="table-filter form-input"
                              onChange={(event) =>
                                onKeyValue("env_rows", index, "key", event.target.value)
                              }
                              placeholder="KEY"
                              value={row.key}
                            />
                            <input
                              className="table-filter form-input"
                              onChange={(event) =>
                                onKeyValue("env_rows", index, "value", event.target.value)
                              }
                              placeholder="value"
                              value={row.value}
                            />
                            <button
                              className="secondary-action"
                              onClick={() => onRemoveRow("env_rows", index)}
                              type="button"
                            >
                              {t("common.remove")}
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        className="secondary-action inline-action"
                        onClick={() => onAddRow("env_rows")}
                        type="button"
                      >
                        {t("addServer.addEnvVar")}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {error ? <p className="form-error">{error}</p> : null}
          </div>
        )}

        <div className="modal-footer">
          {oauth ? (
            <>
              <button className="secondary-action" onClick={oauthHandlers.onReset} type="button">
                {t("addServer.startOver")}
              </button>
              <button className="primary-action" onClick={oauthHandlers.onStart} type="button">
                {oauth.hasOpenedBrowser ? t("addServer.openOAuthAgain") : t("addServer.continueOAuth")}
              </button>
            </>
          ) : (
            <>
              <button className="secondary-action" onClick={onClose} type="button">
                {t("common.cancel")}
              </button>
              <button className="primary-action" disabled={busy} onClick={onSubmit} type="button">
                {busy ? t("addServer.registering") : `+ ${t("addServer.addButton")}`}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
