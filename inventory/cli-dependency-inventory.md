# Inventaire CLI — dépendances et imports (`src/`)

Généré par `node scripts/generate-cli-inventory.mjs` : **§1–4** scan des `import`/`from` sous `src/` (noms npm validés pour exclure les faux positifs dans les commentaires) ; **§5–10** sections structurées (points d’entrée, Commander, REPL, routes HTTP). **§8.1** (noms slash réels) exécute `bun` sur `src/commands.ts`. À régénérer après changement d’imports ou de commandes.

## 1. Déclarations npm (`package.json`)

### dependencies

```json
{
  "@alcalzone/ansi-tokenize": "^0.2.2",
  "@commander-js/extra-typings": "^13.1.0",
  "@modelcontextprotocol/sdk": "^1.12.1",
  "@xterm/addon-fit": "^0.10.0",
  "@xterm/addon-search": "^0.15.0",
  "@xterm/addon-unicode11": "^0.8.0",
  "@xterm/addon-web-links": "^0.11.0",
  "@xterm/addon-webgl": "^0.18.0",
  "@xterm/xterm": "^5.5.0",
  "auto-bind": "^5.0.1",
  "bidi-js": "^1.0.3",
  "axios": "^1.7.0",
  "chalk": "^5.4.0",
  "chokidar": "^4.0.0",
  "cli-boxes": "^3.0.0",
  "code-excerpt": "^4.0.0",
  "diff": "^7.0.0",
  "env-paths": "^3.0.0",
  "execa": "^9.5.0",
  "figures": "^6.1.0",
  "fuse.js": "^7.0.0",
  "highlight.js": "^11.11.0",
  "https-proxy-agent": "^7.0.6",
  "ignore": "^6.0.0",
  "indent-string": "^5.0.0",
  "jsonc-parser": "^3.3.1",
  "lodash-es": "^4.17.21",
  "lru-cache": "^11.0.2",
  "marked": "^15.0.0",
  "node-pty": "^1.1.0",
  "p-map": "^7.0.0",
  "picomatch": "^4.0.0",
  "proper-lockfile": "^4.1.2",
  "qrcode": "^1.5.0",
  "react": "^19.0.0",
  "react-reconciler": "^0.31.0",
  "semver": "^7.6.0",
  "shell-quote": "^1.8.1",
  "stack-utils": "^2.0.6",
  "strip-ansi": "^7.1.0",
  "supports-hyperlinks": "^3.1.0",
  "tree-kill": "^1.2.2",
  "type-fest": "^4.30.0",
  "undici": "^7.3.0",
  "usehooks-ts": "^3.1.0",
  "wrap-ansi": "^9.0.0",
  "ws": "^8.18.0",
  "xss": "^1.0.15",
  "yaml": "^2.6.0",
  "zod": "^3.24.0"
}
```

### devDependencies

```json
{
  "@biomejs/biome": "^1.9.0",
  "@types/diff": "^7.0.0",
  "@types/lodash-es": "^4.17.12",
  "@types/node": "^22.10.0",
  "@types/picomatch": "^3.0.0",
  "@types/proper-lockfile": "^4.1.4",
  "@types/react": "^19.0.0",
  "@types/semver": "^7.5.8",
  "@types/stack-utils": "^2.0.3",
  "@types/bun": "^1.2.0",
  "@types/ws": "^8.5.0",
  "esbuild": "^0.25.0",
  "typescript": "^5.7.0"
}
```

### Bin

- `drox` → `src/entrypoints/cli.tsx`

### main / entry CLI

- `main`: `src/entrypoints/cli.tsx`

## 2. Synthèse des imports npm (racines uniques)

| Paquet | Fichiers touchés |
|--------|------------------:|
| `react` | 622 |
| `zod` | 131 |
| `@anthropic-ai/sdk` | 113 |
| `lodash-es` | 102 |
| `figures` | 91 |
| `axios` | 52 |
| `chalk` | 47 |
| `@modelcontextprotocol/sdk` | 27 |
| `diff` | 19 |
| `execa` | 15 |
| `usehooks-ts` | 14 |
| `strip-ansi` | 12 |
| `@ant/computer-use-mcp` | 7 |
| `ws` | 6 |
| `@alcalzone/ansi-tokenize` | 5 |
| `chokidar` | 5 |
| `ignore` | 5 |
| `lru-cache` | 5 |
| `marked` | 5 |
| `qrcode` | 5 |
| `semver` | 5 |
| `@ant/claude-for-chrome-mcp` | 4 |
| `crypto` | 4 |
| `react-reconciler` | 4 |
| `type-fest` | 4 |
| `@commander-js/extra-typings` | 3 |
| `vscode-languageserver-protocol` | 3 |
| `@anthropic-ai/mcpb` | 2 |
| `@aws-sdk/client-bedrock-runtime` | 2 |
| `@smithy/node-http-handler` | 2 |
| `fflate` | 2 |
| `fuse.js` | 2 |
| `highlight.js` | 2 |
| `image-processor-napi` | 2 |
| `p-map` | 2 |
| `sharp` | 2 |
| `shell-quote` | 2 |
| `signal-exit` | 2 |
| `undici` | 2 |
| `vscode-languageserver-types` | 2 |
| `xss` | 2 |
| `@ant/computer-use-input` | 1 |
| `@ant/computer-use-swift` | 1 |
| `@anthropic-ai/bedrock-sdk` | 1 |
| `@anthropic-ai/foundry-sdk` | 1 |
| `@anthropic-ai/sandbox-runtime` | 1 |
| `@anthropic-ai/vertex-sdk` | 1 |
| `@aws-sdk/client-bedrock` | 1 |
| `@aws-sdk/client-sts` | 1 |
| `@aws-sdk/credential-provider-node` | 1 |
| `@aws-sdk/credential-providers` | 1 |
| `@azure/identity` | 1 |
| `@growthbook/growthbook` | 1 |
| `@smithy/core` | 1 |
| `ajv` | 1 |
| `asciichart` | 1 |
| `audio-capture-napi` | 1 |
| `auto-bind` | 1 |
| `bidi-js` | 1 |
| `cacache` | 1 |
| `cli-boxes` | 1 |
| `cli-highlight` | 1 |
| `code-excerpt` | 1 |
| `color-diff-napi` | 1 |
| `emoji-regex` | 1 |
| `env-paths` | 1 |
| `fs` | 1 |
| `get-east-asian-width` | 1 |
| `github.com` | 1 |
| `google-auth-library` | 1 |
| `https-proxy-agent` | 1 |
| `indent-string` | 1 |
| `ink` | 1 |
| `jsonc-parser` | 1 |
| `npm` | 1 |
| `picomatch` | 1 |
| `plist` | 1 |
| `proper-lockfile` | 1 |
| `stack-utils` | 1 |
| `supports-hyperlinks` | 1 |
| `tls` | 1 |
| `tree-kill` | 1 |
| `turndown` | 1 |
| `url-handler-napi` | 1 |
| `user` | 1 |
| `vm` | 1 |
| `vscode-jsonrpc` | 1 |
| `wrap-ansi` | 1 |
| `yaml` | 1 |

**Imports dans le code mais absents de `package.json`** (46) : `@anthropic-ai/sdk`, `@ant/computer-use-mcp`, `@ant/claude-for-chrome-mcp`, `crypto`, `vscode-languageserver-protocol`, `@anthropic-ai/mcpb`, `@aws-sdk/client-bedrock-runtime`, `@smithy/node-http-handler`, `fflate`, `image-processor-napi`, `sharp`, `signal-exit`, `vscode-languageserver-types`, `@ant/computer-use-input`, `@ant/computer-use-swift`, `@anthropic-ai/bedrock-sdk`, `@anthropic-ai/foundry-sdk`, `@anthropic-ai/sandbox-runtime`, `@anthropic-ai/vertex-sdk`, `@aws-sdk/client-bedrock`, `@aws-sdk/client-sts`, `@aws-sdk/credential-provider-node`, `@aws-sdk/credential-providers`, `@azure/identity`, `@growthbook/growthbook`, `@smithy/core`, `ajv`, `asciichart`, `audio-capture-napi`, `cacache`, `cli-highlight`, `color-diff-napi`, `emoji-regex`, `fs`, `get-east-asian-width`, `github.com`, `google-auth-library`, `ink`, `npm`, `plist`, `tls`, `turndown`, `url-handler-napi`, `user`, `vm`, `vscode-jsonrpc` (souvent résolus par le bundler / workspace / alias de build).

**Déclarés dans `package.json` mais non détectés comme import racine dans `src/`** (20) : `@xterm/addon-fit`, `@xterm/addon-search`, `@xterm/addon-unicode11`, `@xterm/addon-web-links`, `@xterm/addon-webgl`, `@xterm/xterm`, `node-pty`, `@biomejs/biome`, `@types/diff`, `@types/lodash-es`, `@types/node`, `@types/picomatch`, `@types/proper-lockfile`, `@types/react`, `@types/semver`, `@types/stack-utils`, `@types/bun`, `@types/ws`, `esbuild`, `typescript` (scripts, tests hors `src/`, ou imports dynamiques non capturés).

## 3. Liste détaillée par paquet npm

### `react` (622 fichiers)

- `src/buddy/CompanionSprite.tsx`
- `src/buddy/useBuddyNotification.tsx`
- `src/cli/handlers/util.tsx`
- `src/commands/add-dir/add-dir.tsx`
- `src/commands/agents/agents.tsx`
- `src/commands/bridge/bridge.tsx`
- `src/commands/btw/btw.tsx`
- `src/commands/chrome/chrome.tsx`
- `src/commands/context/context.tsx`
- `src/commands/copy/copy.tsx`
- `src/commands/desktop/desktop.tsx`
- `src/commands/effort/effort.tsx`
- `src/commands/exit/exit.tsx`
- `src/commands/export/export.tsx`
- `src/commands/extra-usage/extra-usage.tsx`
- `src/commands/fast/fast.tsx`
- `src/commands/feedback/feedback.tsx`
- `src/commands/ide/ide.tsx`
- `src/commands/install-github-app/ApiKeyStep.tsx`
- `src/commands/install-github-app/CheckExistingSecretStep.tsx`
- `src/commands/install-github-app/CheckGitHubStep.tsx`
- `src/commands/install-github-app/ChooseRepoStep.tsx`
- `src/commands/install-github-app/CreatingStep.tsx`
- `src/commands/install-github-app/ErrorStep.tsx`
- `src/commands/install-github-app/ExistingWorkflowStep.tsx`
- `src/commands/install-github-app/InstallAppStep.tsx`
- `src/commands/install-github-app/OAuthFlowStep.tsx`
- `src/commands/install-github-app/SuccessStep.tsx`
- `src/commands/install-github-app/WarningsStep.tsx`
- `src/commands/install-github-app/install-github-app.tsx`
- `src/commands/install.tsx`
- `src/commands/login/login.tsx`
- `src/commands/logout/logout.tsx`
- `src/commands/mcp/mcp.tsx`
- `src/commands/memory/memory.tsx`
- `src/commands/mobile/mobile.tsx`
- `src/commands/model/model.tsx`
- `src/commands/passes/passes.tsx`
- `src/commands/plan/plan.tsx`
- `src/commands/plugin/AddMarketplace.tsx`
- `src/commands/plugin/BrowseMarketplace.tsx`
- `src/commands/plugin/DiscoverPlugins.tsx`
- `src/commands/plugin/ManageMarketplaces.tsx`
- `src/commands/plugin/ManagePlugins.tsx`
- `src/commands/plugin/PluginOptionsDialog.tsx`
- `src/commands/plugin/PluginOptionsFlow.tsx`
- `src/commands/plugin/PluginSettings.tsx`
- `src/commands/plugin/PluginTrustWarning.tsx`
- `src/commands/plugin/UnifiedInstalledCell.tsx`
- `src/commands/plugin/ValidatePlugin.tsx`
- `src/commands/plugin/plugin.tsx`
- `src/commands/plugin/pluginDetailsHelpers.tsx`
- `src/commands/plugin/usePagination.ts`
- `src/commands/privacy-settings/privacy-settings.tsx`
- `src/commands/rate-limit-options/rate-limit-options.tsx`
- `src/commands/remote-env/remote-env.tsx`
- `src/commands/remote-setup/remote-setup.tsx`
- `src/commands/resume/resume.tsx`
- `src/commands/review/UltrareviewOverageDialog.tsx`
- `src/commands/sandbox-toggle/sandbox-toggle.tsx`
- `src/commands/session/session.tsx`
- `src/commands/skills/skills.tsx`
- `src/commands/status/status.tsx`
- `src/commands/tag/tag.tsx`
- `src/commands/tasks/tasks.tsx`
- `src/commands/theme/theme.tsx`
- `src/commands/thinkback/thinkback.tsx`
- `src/commands/upgrade/upgrade.tsx`
- `src/components/AgentProgressLine.tsx`
- `src/components/App.tsx`
- `src/components/ApproveApiKey.tsx`
- `src/components/AutoModeOptInDialog.tsx`
- `src/components/AutoUpdater.tsx`
- `src/components/AutoUpdaterWrapper.tsx`
- `src/components/AwsAuthStatusBox.tsx`
- `src/components/BaseTextInput.tsx`
- `src/components/BashModeProgress.tsx`
- `src/components/BridgeDialog.tsx`
- `src/components/BypassPermissionsModeDialog.tsx`
- `src/components/ChannelDowngradeDialog.tsx`
- `src/components/ClaudeCodeHint/PluginHintMenu.tsx`
- `src/components/ClaudeInChromeOnboarding.tsx`
- `src/components/ClaudeMdExternalIncludesDialog.tsx`
- `src/components/ClickableImageRef.tsx`
- `src/components/CompactSummary.tsx`
- `src/components/ConfigurableShortcutHint.tsx`
- `src/components/ConsoleOAuthFlow.tsx`
- `src/components/ContextSuggestions.tsx`
- `src/components/ContextVisualization.tsx`
- `src/components/CoordinatorAgentStatus.tsx`
- `src/components/CostThresholdDialog.tsx`
- `src/components/CtrlOToExpand.tsx`
- `src/components/CustomSelect/SelectMulti.tsx`
- `src/components/CustomSelect/option-map.ts`
- `src/components/CustomSelect/select-input-option.tsx`
- `src/components/CustomSelect/select-option.tsx`
- `src/components/CustomSelect/select.tsx`
- `src/components/CustomSelect/use-multi-select-state.ts`
- `src/components/CustomSelect/use-select-input.ts`
- `src/components/CustomSelect/use-select-navigation.ts`
- `src/components/CustomSelect/use-select-state.ts`
- `src/components/DesktopHandoff.tsx`
- `src/components/DesktopUpsell/DesktopUpsellStartup.tsx`
- `src/components/DevBar.tsx`
- `src/components/DevChannelsDialog.tsx`
- `src/components/DiagnosticsDisplay.tsx`
- `src/components/EffortCallout.tsx`
- `src/components/ExitFlow.tsx`
- `src/components/ExportDialog.tsx`
- `src/components/FallbackToolUseErrorMessage.tsx`
- `src/components/FallbackToolUseRejectedMessage.tsx`
- `src/components/FastIcon.tsx`
- `src/components/Feedback.tsx`
- `src/components/FeedbackSurvey/FeedbackSurvey.tsx`
- `src/components/FeedbackSurvey/FeedbackSurveyView.tsx`
- `src/components/FeedbackSurvey/TranscriptSharePrompt.tsx`
- `src/components/FeedbackSurvey/useDebouncedDigitInput.ts`
- `src/components/FeedbackSurvey/useFeedbackSurvey.tsx`
- `src/components/FeedbackSurvey/useMemorySurvey.tsx`
- `src/components/FeedbackSurvey/usePostCompactSurvey.tsx`
- `src/components/FeedbackSurvey/useSurveyState.tsx`
- `src/components/FileEditToolDiff.tsx`
- `src/components/FileEditToolUpdatedMessage.tsx`
- `src/components/FileEditToolUseRejectedMessage.tsx`
- `src/components/FilePathLink.tsx`
- `src/components/FullscreenLayout.tsx`
- `src/components/GlobalSearchDialog.tsx`
- `src/components/HelpV2/Commands.tsx`
- `src/components/HelpV2/General.tsx`
- `src/components/HelpV2/HelpV2.tsx`
- `src/components/HighlightedCode.tsx`
- `src/components/HighlightedCode/Fallback.tsx`
- `src/components/HistorySearchDialog.tsx`
- `src/components/IdeAutoConnectDialog.tsx`
- `src/components/IdeOnboardingDialog.tsx`
- `src/components/IdeStatusIndicator.tsx`
- `src/components/IdleReturnDialog.tsx`
- `src/components/InterruptedByUser.tsx`
- `src/components/InvalidConfigDialog.tsx`
- `src/components/InvalidSettingsDialog.tsx`
- `src/components/KeybindingWarnings.tsx`
- `src/components/LanguagePicker.tsx`
- `src/components/LogSelector.tsx`
- `src/components/LogoV2/AnimatedAsterisk.tsx`
- `src/components/LogoV2/AnimatedClawd.tsx`
- `src/components/LogoV2/ChannelsNotice.tsx`
- `src/components/LogoV2/Clawd.tsx`
- `src/components/LogoV2/CondensedLogo.tsx`
- `src/components/LogoV2/EmergencyTip.tsx`
- `src/components/LogoV2/Feed.tsx`
- `src/components/LogoV2/FeedColumn.tsx`
- `src/components/LogoV2/GuestPassesUpsell.tsx`
- `src/components/LogoV2/LogoV2.tsx`
- `src/components/LogoV2/Opus1mMergeNotice.tsx`
- `src/components/LogoV2/OverageCreditUpsell.tsx`
- `src/components/LogoV2/VoiceModeNotice.tsx`
- `src/components/LogoV2/WelcomeV2.tsx`
- `src/components/LspRecommendation/LspRecommendationMenu.tsx`
- `src/components/MCPServerApprovalDialog.tsx`
- `src/components/MCPServerDesktopImportDialog.tsx`
- `src/components/MCPServerDialogCopy.tsx`
- `src/components/MCPServerMultiselectDialog.tsx`
- `src/components/ManagedSettingsSecurityDialog/ManagedSettingsSecurityDialog.tsx`
- `src/components/Markdown.tsx`
- `src/components/MarkdownTable.tsx`
- `src/components/MemoryUsageIndicator.tsx`
- `src/components/Message.tsx`
- `src/components/MessageModel.tsx`
- `src/components/MessageResponse.tsx`
- `src/components/MessageRow.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/MessageTimestamp.tsx`
- `src/components/Messages.tsx`
- `src/components/ModelPicker.tsx`
- `src/components/NativeAutoUpdater.tsx`
- `src/components/NotebookEditToolUseRejectedMessage.tsx`
- `src/components/OffscreenFreeze.tsx`
- `src/components/OllamaSetupFlow.tsx`
- `src/components/Onboarding.tsx`
- `src/components/OutputStylePicker.tsx`
- `src/components/PackageManagerAutoUpdater.tsx`
- `src/components/Passes/Passes.tsx`
- `src/components/PrBadge.tsx`
- `src/components/PressEnterToContinue.tsx`
- `src/components/PromptInput/HistorySearchInput.tsx`
- `src/components/PromptInput/Notifications.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/PromptInput/PromptInputFooter.tsx`
- `src/components/PromptInput/PromptInputFooterLeftSide.tsx`
- `src/components/PromptInput/PromptInputFooterSuggestions.tsx`
- `src/components/PromptInput/PromptInputHelpMenu.tsx`
- `src/components/PromptInput/PromptInputModeIndicator.tsx`
- `src/components/PromptInput/PromptInputQueuedCommands.tsx`
- `src/components/PromptInput/PromptInputStashNotice.tsx`
- `src/components/PromptInput/SandboxPromptFooterHint.tsx`
- `src/components/PromptInput/ShimmeredInput.tsx`
- `src/components/PromptInput/VoiceIndicator.tsx`
- `src/components/PromptInput/useMaybeTruncateInput.ts`
- `src/components/PromptInput/usePromptInputPlaceholder.ts`
- `src/components/PromptInput/useShowFastIconHint.ts`
- `src/components/PromptInput/useSwarmBanner.ts`
- `src/components/QuickOpenDialog.tsx`
- `src/components/RemoteCallout.tsx`
- `src/components/RemoteEnvironmentDialog.tsx`
- `src/components/ResumeTask.tsx`
- `src/components/SandboxViolationExpandedView.tsx`
- `src/components/ScrollKeybindingHandler.tsx`
- `src/components/SearchBox.tsx`
- `src/components/SentryErrorBoundary.ts`
- `src/components/SessionBackgroundHint.tsx`
- `src/components/SessionPreview.tsx`
- `src/components/Settings/Config.tsx`
- `src/components/Settings/Settings.tsx`
- `src/components/Settings/Status.tsx`
- `src/components/Settings/Usage.tsx`
- `src/components/ShowInIDEPrompt.tsx`
- `src/components/SkillImprovementSurvey.tsx`
- `src/components/Spinner.tsx`
- `src/components/Spinner/FlashingChar.tsx`
- `src/components/Spinner/GlimmerMessage.tsx`
- `src/components/Spinner/ShimmerChar.tsx`
- `src/components/Spinner/SpinnerAnimationRow.tsx`
- `src/components/Spinner/SpinnerGlyph.tsx`
- `src/components/Spinner/TeammateSpinnerLine.tsx`
- `src/components/Spinner/TeammateSpinnerTree.tsx`
- `src/components/Spinner/useShimmerAnimation.ts`
- `src/components/Spinner/useStalledAnimation.ts`
- `src/components/Stats.tsx`
- `src/components/StatusLine.tsx`
- `src/components/StatusNotices.tsx`
- `src/components/StructuredDiff.tsx`
- `src/components/StructuredDiff/Fallback.tsx`
- `src/components/StructuredDiffList.tsx`
- `src/components/TagTabs.tsx`
- `src/components/TaskListV2.tsx`
- `src/components/TeammateViewHeader.tsx`
- `src/components/TeleportError.tsx`
- `src/components/TeleportProgress.tsx`
- `src/components/TeleportRepoMismatchDialog.tsx`
- `src/components/TeleportResumeWrapper.tsx`
- `src/components/TeleportStash.tsx`
- `src/components/TextInput.tsx`
- `src/components/ThemePicker.tsx`
- `src/components/ThinkingToggle.tsx`
- `src/components/TokenWarning.tsx`
- `src/components/ToolUseLoader.tsx`
- `src/components/TrustDialog/TrustDialog.tsx`
- `src/components/ValidationErrorsList.tsx`
- `src/components/VimTextInput.tsx`
- `src/components/VirtualMessageList.tsx`
- `src/components/WorkflowMultiselectDialog.tsx`
- `src/components/WorktreeExitDialog.tsx`
- `src/components/agents/AgentDetail.tsx`
- `src/components/agents/AgentEditor.tsx`
- `src/components/agents/AgentNavigationFooter.tsx`
- `src/components/agents/AgentsList.tsx`
- `src/components/agents/AgentsMenu.tsx`
- `src/components/agents/ColorPicker.tsx`
- `src/components/agents/ModelSelector.tsx`
- `src/components/agents/ToolSelector.tsx`
- `src/components/agents/new-agent-creation/CreateAgentWizard.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ColorStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ConfirmStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ConfirmStepWrapper.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/DescriptionStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/GenerateStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/LocationStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/MemoryStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/MethodStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ModelStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/PromptStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ToolsStep.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/TypeStep.tsx`
- `src/components/design-system/Byline.tsx`
- `src/components/design-system/Dialog.tsx`
- `src/components/design-system/Divider.tsx`
- `src/components/design-system/FuzzyPicker.tsx`
- `src/components/design-system/KeyboardShortcutHint.tsx`
- `src/components/design-system/ListItem.tsx`
- `src/components/design-system/LoadingState.tsx`
- `src/components/design-system/Pane.tsx`
- `src/components/design-system/ProgressBar.tsx`
- `src/components/design-system/Ratchet.tsx`
- `src/components/design-system/StatusIcon.tsx`
- `src/components/design-system/Tabs.tsx`
- `src/components/design-system/ThemeProvider.tsx`
- `src/components/design-system/ThemedBox.tsx`
- `src/components/design-system/ThemedText.tsx`
- `src/components/diff/DiffDetailView.tsx`
- `src/components/diff/DiffDialog.tsx`
- `src/components/diff/DiffFileList.tsx`
- `src/components/grove/Grove.tsx`
- `src/components/hooks/HooksConfigMenu.tsx`
- `src/components/hooks/PromptDialog.tsx`
- `src/components/hooks/SelectEventMode.tsx`
- `src/components/hooks/SelectHookMode.tsx`
- `src/components/hooks/SelectMatcherMode.tsx`
- `src/components/hooks/ViewHookMode.tsx`
- `src/components/mcp/CapabilitiesSection.tsx`
- `src/components/mcp/ElicitationDialog.tsx`
- `src/components/mcp/MCPAgentServerMenu.tsx`
- `src/components/mcp/MCPListPanel.tsx`
- `src/components/mcp/MCPReconnect.tsx`
- `src/components/mcp/MCPRemoteServerMenu.tsx`
- `src/components/mcp/MCPSettings.tsx`
- `src/components/mcp/MCPStdioServerMenu.tsx`
- `src/components/mcp/MCPToolDetailView.tsx`
- `src/components/mcp/MCPToolListView.tsx`
- `src/components/mcp/McpParsingWarnings.tsx`
- `src/components/memory/MemoryFileSelector.tsx`
- `src/components/memory/MemoryUpdateNotification.tsx`
- `src/components/messageActions.tsx`
- `src/components/messages/AdvisorMessage.tsx`
- `src/components/messages/AssistantRedactedThinkingMessage.tsx`
- `src/components/messages/AssistantTextMessage.tsx`
- `src/components/messages/AssistantThinkingMessage.tsx`
- `src/components/messages/AssistantToolUseMessage.tsx`
- `src/components/messages/AttachmentMessage.tsx`
- `src/components/messages/CollapsedReadSearchContent.tsx`
- `src/components/messages/CompactBoundaryMessage.tsx`
- `src/components/messages/GroupedToolUseContent.tsx`
- `src/components/messages/HighlightedThinkingText.tsx`
- `src/components/messages/HookProgressMessage.tsx`
- `src/components/messages/PlanApprovalMessage.tsx`
- `src/components/messages/RateLimitMessage.tsx`
- `src/components/messages/ShutdownMessage.tsx`
- `src/components/messages/SystemAPIErrorMessage.tsx`
- `src/components/messages/SystemTextMessage.tsx`
- `src/components/messages/TaskAssignmentMessage.tsx`
- `src/components/messages/UserAgentNotificationMessage.tsx`
- `src/components/messages/UserBashInputMessage.tsx`
- `src/components/messages/UserBashOutputMessage.tsx`
- `src/components/messages/UserChannelMessage.tsx`
- `src/components/messages/UserCommandMessage.tsx`
- `src/components/messages/UserImageMessage.tsx`
- `src/components/messages/UserLocalCommandOutputMessage.tsx`
- `src/components/messages/UserMemoryInputMessage.tsx`
- `src/components/messages/UserPlanMessage.tsx`
- `src/components/messages/UserPromptMessage.tsx`
- `src/components/messages/UserResourceUpdateMessage.tsx`
- `src/components/messages/UserTeammateMessage.tsx`
- `src/components/messages/UserTextMessage.tsx`
- `src/components/messages/UserToolResultMessage/RejectedPlanMessage.tsx`
- `src/components/messages/UserToolResultMessage/RejectedToolUseMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolCanceledMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolErrorMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolRejectMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolResultMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolSuccessMessage.tsx`
- `src/components/messages/UserToolResultMessage/utils.tsx`
- `src/components/messages/teamMemCollapsed.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/AskUserQuestionPermissionRequest.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/PreviewBox.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/PreviewQuestionView.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/QuestionNavigationBar.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/QuestionView.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/SubmitQuestionsView.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/use-multiple-choice-state.ts`
- `src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx`
- `src/components/permissions/ComputerUseApproval/ComputerUseApproval.tsx`
- `src/components/permissions/EnterPlanModePermissionRequest/EnterPlanModePermissionRequest.tsx`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/permissions/FallbackPermissionRequest.tsx`
- `src/components/permissions/FileEditPermissionRequest/FileEditPermissionRequest.tsx`
- `src/components/permissions/FilePermissionDialog/FilePermissionDialog.tsx`
- `src/components/permissions/FilePermissionDialog/permissionOptions.tsx`
- `src/components/permissions/FilePermissionDialog/useFilePermissionDialog.ts`
- `src/components/permissions/FileWritePermissionRequest/FileWritePermissionRequest.tsx`
- `src/components/permissions/FileWritePermissionRequest/FileWriteToolDiff.tsx`
- `src/components/permissions/FilesystemPermissionRequest/FilesystemPermissionRequest.tsx`
- `src/components/permissions/NotebookEditPermissionRequest/NotebookEditPermissionRequest.tsx`
- `src/components/permissions/NotebookEditPermissionRequest/NotebookEditToolDiff.tsx`
- `src/components/permissions/PermissionDecisionDebugInfo.tsx`
- `src/components/permissions/PermissionDialog.tsx`
- `src/components/permissions/PermissionExplanation.tsx`
- `src/components/permissions/PermissionPrompt.tsx`
- `src/components/permissions/PermissionRequest.tsx`
- `src/components/permissions/PermissionRequestTitle.tsx`
- `src/components/permissions/PermissionRuleExplanation.tsx`
- `src/components/permissions/PowerShellPermissionRequest/PowerShellPermissionRequest.tsx`
- `src/components/permissions/SandboxPermissionRequest.tsx`
- `src/components/permissions/SedEditPermissionRequest/SedEditPermissionRequest.tsx`
- `src/components/permissions/SkillPermissionRequest/SkillPermissionRequest.tsx`
- `src/components/permissions/WebFetchPermissionRequest/WebFetchPermissionRequest.tsx`
- `src/components/permissions/WorkerBadge.tsx`
- `src/components/permissions/WorkerPendingPermission.tsx`
- `src/components/permissions/hooks.ts`
- `src/components/permissions/rules/AddPermissionRules.tsx`
- `src/components/permissions/rules/AddWorkspaceDirectory.tsx`
- `src/components/permissions/rules/PermissionRuleDescription.tsx`
- `src/components/permissions/rules/PermissionRuleInput.tsx`
- `src/components/permissions/rules/PermissionRuleList.tsx`
- `src/components/permissions/rules/RecentDenialsTab.tsx`
- `src/components/permissions/rules/RemoveWorkspaceDirectory.tsx`
- `src/components/permissions/rules/WorkspaceTab.tsx`
- `src/components/permissions/shellPermissionHelpers.tsx`
- `src/components/permissions/useShellPermissionFeedback.ts`
- `src/components/sandbox/SandboxConfigTab.tsx`
- `src/components/sandbox/SandboxDependenciesTab.tsx`
- `src/components/sandbox/SandboxDoctorSection.tsx`
- `src/components/sandbox/SandboxOverridesTab.tsx`
- `src/components/sandbox/SandboxSettings.tsx`
- `src/components/shell/ExpandShellOutputContext.tsx`
- `src/components/shell/OutputLine.tsx`
- `src/components/shell/ShellProgressMessage.tsx`
- `src/components/shell/ShellTimeDisplay.tsx`
- `src/components/skills/SkillsMenu.tsx`
- `src/components/tasks/AsyncAgentDetailDialog.tsx`
- `src/components/tasks/BackgroundTask.tsx`
- `src/components/tasks/BackgroundTaskStatus.tsx`
- `src/components/tasks/BackgroundTasksDialog.tsx`
- `src/components/tasks/DreamDetailDialog.tsx`
- `src/components/tasks/InProcessTeammateDetailDialog.tsx`
- `src/components/tasks/RemoteSessionDetailDialog.tsx`
- `src/components/tasks/RemoteSessionProgress.tsx`
- `src/components/tasks/ShellDetailDialog.tsx`
- `src/components/tasks/ShellProgress.tsx`
- `src/components/tasks/renderToolActivity.tsx`
- `src/components/teams/TeamStatus.tsx`
- `src/components/teams/TeamsDialog.tsx`
- `src/components/ui/OrderedList.tsx`
- `src/components/ui/OrderedListItem.tsx`
- `src/components/ui/TreeSelect.tsx`
- `src/components/wizard/WizardDialogLayout.tsx`
- `src/components/wizard/WizardNavigationFooter.tsx`
- `src/components/wizard/WizardProvider.tsx`
- `src/components/wizard/useWizard.ts`
- `src/context/QueuedMessageContext.tsx`
- `src/context/fpsMetrics.tsx`
- `src/context/mailbox.tsx`
- `src/context/modalContext.tsx`
- `src/context/notifications.tsx`
- `src/context/overlayContext.tsx`
- `src/context/promptOverlayContext.tsx`
- `src/context/stats.tsx`
- `src/context/voice.tsx`
- `src/costHook.ts`
- `src/dialogLaunchers.tsx`
- `src/hooks/notifs/useAutoModeUnavailableNotification.ts`
- `src/hooks/notifs/useDeprecationWarningNotification.tsx`
- `src/hooks/notifs/useFastModeNotification.tsx`
- `src/hooks/notifs/useIDEStatusIndicator.tsx`
- `src/hooks/notifs/useLspInitializationNotification.tsx`
- `src/hooks/notifs/useMcpConnectivityStatus.tsx`
- `src/hooks/notifs/usePluginAutoupdateNotification.tsx`
- `src/hooks/notifs/usePluginInstallationStatus.tsx`
- `src/hooks/notifs/useRateLimitWarningNotification.tsx`
- `src/hooks/notifs/useSettingsErrors.tsx`
- `src/hooks/notifs/useStartupNotification.ts`
- `src/hooks/notifs/useTeammateShutdownNotification.ts`
- `src/hooks/useAfterFirstRender.ts`
- `src/hooks/useApiKeyVerification.ts`
- `src/hooks/useArrowKeyHistory.tsx`
- `src/hooks/useAssistantHistory.ts`
- `src/hooks/useAwaySummary.ts`
- `src/hooks/useBackgroundTaskNavigation.ts`
- `src/hooks/useCanUseTool.tsx`
- `src/hooks/useCancelRequest.ts`
- `src/hooks/useClaudeCodeHintRecommendation.tsx`
- `src/hooks/useClipboardImageHint.ts`
- `src/hooks/useCommandKeybindings.tsx`
- `src/hooks/useCommandQueue.ts`
- `src/hooks/useCopyOnSelect.ts`
- `src/hooks/useDeferredHookMessages.ts`
- `src/hooks/useDiffData.ts`
- `src/hooks/useDiffInIDE.ts`
- `src/hooks/useDirectConnect.ts`
- `src/hooks/useDoublePress.ts`
- `src/hooks/useDynamicConfig.ts`
- `src/hooks/useElapsedTime.ts`
- `src/hooks/useExitOnCtrlCD.ts`
- `src/hooks/useFileHistorySnapshotInit.ts`
- `src/hooks/useGlobalKeybindings.tsx`
- `src/hooks/useHistorySearch.ts`
- `src/hooks/useIDEIntegration.tsx`
- `src/hooks/useIdeAtMentioned.ts`
- `src/hooks/useIdeConnectionStatus.ts`
- `src/hooks/useIdeLogging.ts`
- `src/hooks/useIdeSelection.ts`
- `src/hooks/useInboxPoller.ts`
- `src/hooks/useInputBuffer.ts`
- `src/hooks/useIssueFlagBanner.ts`
- `src/hooks/useLogMessages.ts`
- `src/hooks/useLspPluginRecommendation.tsx`
- `src/hooks/useMailboxBridge.ts`
- `src/hooks/useMainLoopModel.ts`
- `src/hooks/useManagePlugins.ts`
- `src/hooks/useMemoryUsage.ts`
- `src/hooks/useMergedClients.ts`
- `src/hooks/useMergedCommands.ts`
- `src/hooks/useMergedTools.ts`
- `src/hooks/useMinDisplayTime.ts`
- `src/hooks/useNotifyAfterTimeout.ts`
- `src/hooks/usePasteHandler.ts`
- `src/hooks/usePluginRecommendationBase.tsx`
- `src/hooks/usePrStatus.ts`
- `src/hooks/usePromptSuggestion.ts`
- `src/hooks/usePromptsFromClaudeInChrome.tsx`
- `src/hooks/useQueueProcessor.ts`
- `src/hooks/useRemoteSession.ts`
- `src/hooks/useReplBridge.tsx`
- `src/hooks/useSSHSession.ts`
- `src/hooks/useScheduledTasks.ts`
- `src/hooks/useSearchInput.ts`
- `src/hooks/useSessionBackgrounding.ts`
- `src/hooks/useSettingsChange.ts`
- `src/hooks/useSkillImprovementSurvey.ts`
- `src/hooks/useSkillsChange.ts`
- `src/hooks/useSwarmInitialization.ts`
- `src/hooks/useSwarmPermissionPoller.ts`
- `src/hooks/useTaskListWatcher.ts`
- `src/hooks/useTasksV2.ts`
- `src/hooks/useTeammateViewAutoExit.ts`
- `src/hooks/useTeleportResume.tsx`
- `src/hooks/useTerminalSize.ts`
- `src/hooks/useTimeout.ts`
- `src/hooks/useTurnDiffs.ts`
- `src/hooks/useTypeahead.tsx`
- `src/hooks/useUpdateNotification.ts`
- `src/hooks/useVimInput.ts`
- `src/hooks/useVirtualScroll.ts`
- `src/hooks/useVoice.ts`
- `src/hooks/useVoiceEnabled.ts`
- `src/hooks/useVoiceIntegration.tsx`
- `src/ink.ts`
- `src/ink/Ansi.tsx`
- `src/ink/components/AlternateScreen.tsx`
- `src/ink/components/App.tsx`
- `src/ink/components/AppContext.ts`
- `src/ink/components/Box.tsx`
- `src/ink/components/Button.tsx`
- `src/ink/components/ClockContext.tsx`
- `src/ink/components/CursorDeclarationContext.ts`
- `src/ink/components/Link.tsx`
- `src/ink/components/Newline.tsx`
- `src/ink/components/NoSelect.tsx`
- `src/ink/components/RawAnsi.tsx`
- `src/ink/components/ScrollBox.tsx`
- `src/ink/components/Spacer.tsx`
- `src/ink/components/StdinContext.ts`
- `src/ink/components/TerminalFocusContext.tsx`
- `src/ink/components/TerminalSizeContext.tsx`
- `src/ink/components/Text.tsx`
- `src/ink/createRootThemed.ts`
- `src/ink/hooks/use-animation-frame.ts`
- `src/ink/hooks/use-app.ts`
- `src/ink/hooks/use-declared-cursor.ts`
- `src/ink/hooks/use-input.ts`
- `src/ink/hooks/use-interval.ts`
- `src/ink/hooks/use-search-highlight.ts`
- `src/ink/hooks/use-selection.ts`
- `src/ink/hooks/use-stdin.ts`
- `src/ink/hooks/use-tab-status.ts`
- `src/ink/hooks/use-terminal-focus.ts`
- `src/ink/hooks/use-terminal-title.ts`
- `src/ink/hooks/use-terminal-viewport.ts`
- `src/ink/ink.tsx`
- `src/ink/render-to-screen.ts`
- `src/ink/root.ts`
- `src/ink/useTerminalNotification.ts`
- `src/interactiveHelpers.tsx`
- `src/keybindings/KeybindingContext.tsx`
- `src/keybindings/KeybindingProviderSetup.tsx`
- `src/keybindings/useKeybinding.ts`
- `src/keybindings/useShortcutDisplay.ts`
- `src/replLauncher.tsx`
- `src/screens/Doctor.tsx`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/screens/ResumeConversation.tsx`
- `src/services/claudeAiLimitsHook.ts`
- `src/services/compact/compactWarningHook.ts`
- `src/services/mcp/MCPConnectionManager.tsx`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/state/AppState.tsx`
- `src/tools/AgentTool/UI.tsx`
- `src/tools/AskUserQuestionTool/AskUserQuestionTool.tsx`
- `src/tools/BashTool/BashToolResultMessage.tsx`
- `src/tools/BashTool/UI.tsx`
- `src/tools/BriefTool/UI.tsx`
- `src/tools/ConfigTool/UI.tsx`
- `src/tools/EnterPlanModeTool/UI.tsx`
- `src/tools/EnterWorktreeTool/UI.tsx`
- `src/tools/ExitPlanModeTool/UI.tsx`
- `src/tools/ExitWorktreeTool/UI.tsx`
- `src/tools/FileEditTool/UI.tsx`
- `src/tools/FileReadTool/UI.tsx`
- `src/tools/FileWriteTool/UI.tsx`
- `src/tools/GlobTool/UI.tsx`
- `src/tools/GrepTool/UI.tsx`
- `src/tools/LSPTool/UI.tsx`
- `src/tools/ListMcpResourcesTool/UI.tsx`
- `src/tools/MCPTool/UI.tsx`
- `src/tools/NotebookEditTool/UI.tsx`
- `src/tools/PowerShellTool/UI.tsx`
- `src/tools/ReadMcpResourceTool/UI.tsx`
- `src/tools/RemoteTriggerTool/UI.tsx`
- `src/tools/ScheduleCronTool/UI.tsx`
- `src/tools/SendMessageTool/UI.tsx`
- `src/tools/SkillTool/UI.tsx`
- `src/tools/TaskOutputTool/TaskOutputTool.tsx`
- `src/tools/TaskStopTool/UI.tsx`
- `src/tools/TeamCreateTool/UI.tsx`
- `src/tools/TeamDeleteTool/UI.tsx`
- `src/tools/WebFetchTool/UI.tsx`
- `src/tools/WebSearchTool/UI.tsx`
- `src/tools/shared/spawnMultiAgent.ts`
- `src/types/textInputTypes.ts`
- `src/utils/autoRunIssue.tsx`
- `src/utils/classifierApprovalsHook.ts`
- `src/utils/claudeInChrome/toolRendering.tsx`
- `src/utils/computerUse/toolRendering.tsx`
- `src/utils/computerUse/wrapper.tsx`
- `src/utils/exportRenderer.tsx`
- `src/utils/highlightMatch.tsx`
- `src/utils/permissions/bypassPermissionsKillswitch.ts`
- `src/utils/preflightChecks.tsx`
- `src/utils/processUserInput/processBashCommand.tsx`
- `src/utils/staticRender.tsx`
- `src/utils/status.tsx`
- `src/utils/statusNoticeDefinitions.tsx`
- `src/utils/swarm/It2SetupPrompt.tsx`

### `zod` (131 fichiers)

- `src/Tool.ts`
- `src/bridge/bridgePointer.ts`
- `src/bridge/envLessBridgeConfig.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/pollConfig.ts`
- `src/cli/structuredIO.ts`
- `src/commands/brief.ts`
- `src/components/permissions/FileEditPermissionRequest/FileEditPermissionRequest.tsx`
- `src/components/permissions/FileWritePermissionRequest/FileWritePermissionRequest.tsx`
- `src/components/permissions/NotebookEditPermissionRequest/NotebookEditPermissionRequest.tsx`
- `src/components/permissions/PermissionRequest.tsx`
- `src/entrypoints/sandboxTypes.ts`
- `src/entrypoints/sdk/controlSchemas.ts`
- `src/entrypoints/sdk/controlTypes.ts`
- `src/entrypoints/sdk/coreSchemas.ts`
- `src/entrypoints/sdk/coreTypes.generated.ts`
- `src/entrypoints/sdk/runtimeTypes.ts`
- `src/hooks/useIdeAtMentioned.ts`
- `src/hooks/useIdeLogging.ts`
- `src/hooks/useIdeSelection.ts`
- `src/hooks/usePromptsFromClaudeInChrome.tsx`
- `src/keybindings/schema.ts`
- `src/schemas/hooks.ts`
- `src/server/types.ts`
- `src/services/mcp/channelAllowlist.ts`
- `src/services/mcp/channelNotification.ts`
- `src/services/mcp/types.ts`
- `src/services/mcp/vscodeSdkMcp.ts`
- `src/services/mcp/xaa.ts`
- `src/services/remoteManagedSettings/types.ts`
- `src/services/settingsSync/types.ts`
- `src/services/teamMemorySync/types.ts`
- `src/services/tools/toolHooks.ts`
- `src/shims/anthropic-mcpb.ts`
- `src/shims/anthropic-sandbox-runtime.ts`
- `src/skills/bundled/updateConfig.ts`
- `src/tools/AgentTool/AgentTool.tsx`
- `src/tools/AgentTool/UI.tsx`
- `src/tools/AgentTool/agentMemorySnapshot.ts`
- `src/tools/AgentTool/agentToolUtils.ts`
- `src/tools/AgentTool/loadAgentsDir.ts`
- `src/tools/AskUserQuestionTool/AskUserQuestionTool.tsx`
- `src/tools/BashTool/BashTool.tsx`
- `src/tools/BashTool/bashCommandHelpers.ts`
- `src/tools/BashTool/bashPermissions.ts`
- `src/tools/BashTool/modeValidation.ts`
- `src/tools/BashTool/pathValidation.ts`
- `src/tools/BashTool/readOnlyValidation.ts`
- `src/tools/BriefTool/BriefTool.ts`
- `src/tools/BriefTool/upload.ts`
- `src/tools/ConfigTool/ConfigTool.ts`
- `src/tools/EnterPlanModeTool/EnterPlanModeTool.ts`
- `src/tools/EnterWorktreeTool/EnterWorktreeTool.ts`
- `src/tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts`
- `src/tools/ExitWorktreeTool/ExitWorktreeTool.ts`
- `src/tools/FileEditTool/types.ts`
- `src/tools/FileReadTool/FileReadTool.ts`
- `src/tools/FileWriteTool/FileWriteTool.ts`
- `src/tools/GlobTool/GlobTool.ts`
- `src/tools/GrepTool/GrepTool.ts`
- `src/tools/LSPTool/LSPTool.ts`
- `src/tools/LSPTool/schemas.ts`
- `src/tools/ListMcpResourcesTool/ListMcpResourcesTool.ts`
- `src/tools/MCPTool/MCPTool.ts`
- `src/tools/MCPTool/UI.tsx`
- `src/tools/McpAuthTool/McpAuthTool.ts`
- `src/tools/NotebookEditTool/NotebookEditTool.ts`
- `src/tools/NotebookEditTool/UI.tsx`
- `src/tools/PowerShellTool/PowerShellTool.tsx`
- `src/tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`
- `src/tools/ReadMcpResourceTool/UI.tsx`
- `src/tools/RemoteTriggerTool/RemoteTriggerTool.ts`
- `src/tools/ScheduleCronTool/CronCreateTool.ts`
- `src/tools/ScheduleCronTool/CronDeleteTool.ts`
- `src/tools/ScheduleCronTool/CronListTool.ts`
- `src/tools/SendMessageTool/SendMessageTool.ts`
- `src/tools/SkillTool/SkillTool.ts`
- `src/tools/SkillTool/UI.tsx`
- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`
- `src/tools/TaskCreateTool/TaskCreateTool.ts`
- `src/tools/TaskGetTool/TaskGetTool.ts`
- `src/tools/TaskListTool/TaskListTool.ts`
- `src/tools/TaskOutputTool/TaskOutputTool.tsx`
- `src/tools/TaskStopTool/TaskStopTool.ts`
- `src/tools/TaskUpdateTool/TaskUpdateTool.ts`
- `src/tools/TeamCreateTool/TeamCreateTool.ts`
- `src/tools/TeamDeleteTool/TeamDeleteTool.ts`
- `src/tools/TodoWriteTool/TodoWriteTool.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/tools/WebFetchTool/WebFetchTool.ts`
- `src/tools/WebSearchTool/WebSearchTool.ts`
- `src/tools/testing/TestingPermissionTool.tsx`
- `src/types/hooks.ts`
- `src/utils/api.ts`
- `src/utils/claudeInChrome/chromeNativeHost.ts`
- `src/utils/cronJitterConfig.ts`
- `src/utils/cronTasksLock.ts`
- `src/utils/hooks/hookHelpers.ts`
- `src/utils/mcp/elicitationValidation.ts`
- `src/utils/model/modelCapabilities.ts`
- `src/utils/permissions/PermissionMode.ts`
- `src/utils/permissions/PermissionPromptToolResultSchema.ts`
- `src/utils/permissions/PermissionRule.ts`
- `src/utils/permissions/PermissionUpdateSchema.ts`
- `src/utils/permissions/classifierShared.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/permissionExplainer.ts`
- `src/utils/permissions/yoloClassifier.ts`
- `src/utils/plugins/addDirPluginSettings.ts`
- `src/utils/plugins/lspPluginIntegration.ts`
- `src/utils/plugins/schemas.ts`
- `src/utils/plugins/validatePlugin.ts`
- `src/utils/semanticBoolean.ts`
- `src/utils/semanticNumber.ts`
- `src/utils/sessionTitle.ts`
- `src/utils/settings/permissionValidation.ts`
- `src/utils/settings/schemaOutput.ts`
- `src/utils/settings/settings.ts`
- `src/utils/settings/types.ts`
- `src/utils/settings/validation.ts`
- `src/utils/settings/validationTips.ts`
- `src/utils/suggestions/slackChannelSuggestions.ts`
- `src/utils/swarm/permissionSync.ts`
- `src/utils/swarm/teamHelpers.ts`
- `src/utils/tasks.ts`
- `src/utils/teammateMailbox.ts`
- `src/utils/teleport.tsx`
- `src/utils/teleport/api.ts`
- `src/utils/todo/types.ts`
- `src/utils/toolErrors.ts`
- `src/utils/zodToJsonSchema.ts`

### `@anthropic-ai/sdk` (113 fichiers)

- `src/QueryEngine.ts`
- `src/Tool.ts`
- `src/bootstrap/state.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/inboundMessages.ts`
- `src/cli/print.ts`
- `src/commands/createMovedToPluginCommand.ts`
- `src/commands/review.ts`
- `src/commands/review/reviewRemote.ts`
- `src/commands/review/ultrareviewCommand.tsx`
- `src/commands/statusline.tsx`
- `src/components/FallbackToolUseErrorMessage.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/agents/generateAgent.ts`
- `src/components/agents/new-agent-creation/wizard-steps/GenerateStep.tsx`
- `src/components/messages/AssistantTextMessage.tsx`
- `src/components/messages/AssistantThinkingMessage.tsx`
- `src/components/messages/AssistantToolUseMessage.tsx`
- `src/components/messages/GroupedToolUseContent.tsx`
- `src/components/messages/UserAgentNotificationMessage.tsx`
- `src/components/messages/UserBashInputMessage.tsx`
- `src/components/messages/UserChannelMessage.tsx`
- `src/components/messages/UserCommandMessage.tsx`
- `src/components/messages/UserPromptMessage.tsx`
- `src/components/messages/UserResourceUpdateMessage.tsx`
- `src/components/messages/UserTeammateMessage.tsx`
- `src/components/messages/UserTextMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolErrorMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolResultMessage.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/AskUserQuestionPermissionRequest.tsx`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/permissions/PermissionRequest.tsx`
- `src/cost-tracker.ts`
- `src/hooks/toolPermission/PermissionContext.ts`
- `src/hooks/toolPermission/handlers/interactiveHandler.ts`
- `src/hooks/toolPermission/handlers/swarmWorkerHandler.ts`
- `src/hooks/useCanUseTool.tsx`
- `src/query.ts`
- `src/screens/REPL.tsx`
- `src/services/api/claude.ts`
- `src/services/api/client.ts`
- `src/services/api/dumpPrompts.ts`
- `src/services/api/errorUtils.ts`
- `src/services/api/errors.ts`
- `src/services/api/logging.ts`
- `src/services/api/promptCacheBreakDetection.ts`
- `src/services/api/withRetry.ts`
- `src/services/awaySummary.ts`
- `src/services/compact/compact.ts`
- `src/services/compact/microCompact.ts`
- `src/services/mcp/client.ts`
- `src/services/rateLimitMocking.ts`
- `src/services/tokenEstimation.ts`
- `src/services/tools/StreamingToolExecutor.ts`
- `src/services/tools/toolExecution.ts`
- `src/services/tools/toolOrchestration.ts`
- `src/services/vcr.ts`
- `src/skills/bundledSkills.ts`
- `src/tasks/RemoteAgentTask/RemoteAgentTask.tsx`
- `src/tools/AgentTool/UI.tsx`
- `src/tools/AgentTool/forkSubagent.ts`
- `src/tools/BashTool/BashTool.tsx`
- `src/tools/BashTool/UI.tsx`
- `src/tools/BashTool/bashPermissions.ts`
- `src/tools/BashTool/utils.ts`
- `src/tools/FileEditTool/UI.tsx`
- `src/tools/FileReadTool/FileReadTool.ts`
- `src/tools/FileReadTool/UI.tsx`
- `src/tools/FileWriteTool/UI.tsx`
- `src/tools/GlobTool/UI.tsx`
- `src/tools/GrepTool/UI.tsx`
- `src/tools/LSPTool/UI.tsx`
- `src/tools/NotebookEditTool/UI.tsx`
- `src/tools/PowerShellTool/PowerShellTool.tsx`
- `src/tools/PowerShellTool/UI.tsx`
- `src/tools/SkillTool/SkillTool.ts`
- `src/tools/SkillTool/UI.tsx`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/tools/WebSearchTool/WebSearchTool.ts`
- `src/types/command.ts`
- `src/types/message.ts`
- `src/types/permissions.ts`
- `src/types/textInputTypes.ts`
- `src/utils/advisor.ts`
- `src/utils/analyzeContext.ts`
- `src/utils/api.ts`
- `src/utils/attachments.ts`
- `src/utils/contextAnalysis.ts`
- `src/utils/errors.ts`
- `src/utils/groupToolUses.ts`
- `src/utils/imageResizer.ts`
- `src/utils/log.ts`
- `src/utils/mcpValidation.ts`
- `src/utils/messageQueueManager.ts`
- `src/utils/messages.ts`
- `src/utils/messages/mappers.ts`
- `src/utils/model/validateModel.ts`
- `src/utils/modelCost.ts`
- `src/utils/notebook.ts`
- `src/utils/permissions/classifierShared.ts`
- `src/utils/permissions/permissions.ts`
- `src/utils/permissions/yoloClassifier.ts`
- `src/utils/processUserInput/processBashCommand.tsx`
- `src/utils/processUserInput/processSlashCommand.tsx`
- `src/utils/processUserInput/processTextPrompt.ts`
- `src/utils/processUserInput/processUserInput.ts`
- `src/utils/queryHelpers.ts`
- `src/utils/sideQuery.ts`
- `src/utils/swarm/inProcessRunner.ts`
- `src/utils/tokens.ts`
- `src/utils/toolResultStorage.ts`
- `src/utils/toolSchemaCache.ts`
- `src/utils/ultraplan/ccrSession.ts`

### `lodash-es` (102 fichiers)

- `src/QueryEngine.ts`
- `src/bootstrap/state.ts`
- `src/bridge/trustedDevice.ts`
- `src/cli/print.ts`
- `src/commands.ts`
- `src/commands/exit/exit.tsx`
- `src/components/ExitFlow.tsx`
- `src/components/MCPServerMultiselectDialog.tsx`
- `src/components/ModelPicker.tsx`
- `src/components/Spinner.tsx`
- `src/components/Spinner/TeammateSpinnerLine.tsx`
- `src/components/ValidationErrorsList.tsx`
- `src/components/agents/utils.ts`
- `src/components/messages/SystemTextMessage.tsx`
- `src/components/messages/UserMemoryInputMessage.tsx`
- `src/components/skills/SkillsMenu.tsx`
- `src/constants/common.ts`
- `src/constants/outputStyles.ts`
- `src/context.ts`
- `src/entrypoints/init.ts`
- `src/hooks/useMergedClients.ts`
- `src/hooks/useMergedCommands.ts`
- `src/ink/ink.tsx`
- `src/ink/render-to-screen.ts`
- `src/main.tsx`
- `src/memdir/paths.ts`
- `src/outputStyles/loadOutputStylesDir.ts`
- `src/projectOnboardingState.ts`
- `src/services/SessionMemory/sessionMemory.ts`
- `src/services/analytics/growthbook.ts`
- `src/services/api/grove.ts`
- `src/services/compact/compact.ts`
- `src/services/internalLogging.ts`
- `src/services/mcp/claudeai.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/config.ts`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/services/settingsSync/index.ts`
- `src/services/vcr.ts`
- `src/skills/loadSkillsDir.ts`
- `src/tools.ts`
- `src/tools/AgentTool/loadAgentsDir.ts`
- `src/tools/AgentTool/runAgent.ts`
- `src/tools/FileReadTool/limits.ts`
- `src/tools/McpAuthTool/McpAuthTool.ts`
- `src/tools/SkillTool/SkillTool.ts`
- `src/tools/SkillTool/prompt.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/utils/Shell.ts`
- `src/utils/attachments.ts`
- `src/utils/auth.ts`
- `src/utils/bash/ParsedCommand.ts`
- `src/utils/betas.ts`
- `src/utils/caCerts.ts`
- `src/utils/claudemd.ts`
- `src/utils/config.ts`
- `src/utils/debug.ts`
- `src/utils/debugFilter.ts`
- `src/utils/editor.ts`
- `src/utils/env.ts`
- `src/utils/envDynamic.ts`
- `src/utils/envUtils.ts`
- `src/utils/exampleCommands.ts`
- `src/utils/git.ts`
- `src/utils/gracefulShutdown.ts`
- `src/utils/hooks/hooksConfigManager.ts`
- `src/utils/ide.ts`
- `src/utils/log.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/messages.ts`
- `src/utils/model/bedrock.ts`
- `src/utils/model/modelCapabilities.ts`
- `src/utils/model/modelSupportOverrides.ts`
- `src/utils/mtls.ts`
- `src/utils/nativeInstaller/packageManagers.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/pathValidation.ts`
- `src/utils/plans.ts`
- `src/utils/platform.ts`
- `src/utils/plugins/gitAvailability.ts`
- `src/utils/plugins/loadPluginAgents.ts`
- `src/utils/plugins/loadPluginCommands.ts`
- `src/utils/plugins/loadPluginHooks.ts`
- `src/utils/plugins/loadPluginOutputStyles.ts`
- `src/utils/plugins/marketplaceHelpers.ts`
- `src/utils/plugins/marketplaceManager.ts`
- `src/utils/plugins/pluginLoader.ts`
- `src/utils/plugins/pluginOptionsStorage.ts`
- `src/utils/plugins/reconciler.ts`
- `src/utils/proxy.ts`
- `src/utils/queryHelpers.ts`
- `src/utils/ripgrep.ts`
- `src/utils/sandbox/sandbox-adapter.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/settings/managedPath.ts`
- `src/utils/settings/settings.ts`
- `src/utils/slowOperations.ts`
- `src/utils/swarm/spawnInProcess.ts`
- `src/utils/toolPool.ts`
- `src/utils/toolSearch.ts`
- `src/utils/user.ts`
- `src/utils/windowsPaths.ts`

### `figures` (91 fichiers)

- `src/buddy/CompanionSprite.tsx`
- `src/cli/handlers/plugins.ts`
- `src/commands/add-dir/add-dir.tsx`
- `src/commands/install-github-app/InstallAppStep.tsx`
- `src/commands/install-github-app/WarningsStep.tsx`
- `src/commands/plugin/BrowseMarketplace.tsx`
- `src/commands/plugin/DiscoverPlugins.tsx`
- `src/commands/plugin/ManageMarketplaces.tsx`
- `src/commands/plugin/ManagePlugins.tsx`
- `src/commands/plugin/PluginOptionsDialog.tsx`
- `src/commands/plugin/PluginSettings.tsx`
- `src/commands/plugin/PluginTrustWarning.tsx`
- `src/commands/plugin/UnifiedInstalledCell.tsx`
- `src/commands/plugin/ValidatePlugin.tsx`
- `src/commands/resume/resume.tsx`
- `src/commands/sandbox-toggle/index.ts`
- `src/components/ContextSuggestions.tsx`
- `src/components/CoordinatorAgentStatus.tsx`
- `src/components/CustomSelect/SelectMulti.tsx`
- `src/components/CustomSelect/select.tsx`
- `src/components/FullscreenLayout.tsx`
- `src/components/LanguagePicker.tsx`
- `src/components/LogSelector.tsx`
- `src/components/LogoV2/feedConfigs.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/OllamaSetupFlow.tsx`
- `src/components/PromptInput/PromptInputFooterLeftSide.tsx`
- `src/components/PromptInput/PromptInputModeIndicator.tsx`
- `src/components/PromptInput/PromptInputStashNotice.tsx`
- `src/components/RemoteEnvironmentDialog.tsx`
- `src/components/Settings/Config.tsx`
- `src/components/Settings/Status.tsx`
- `src/components/Spinner.tsx`
- `src/components/Spinner/SpinnerAnimationRow.tsx`
- `src/components/Spinner/TeammateSpinnerLine.tsx`
- `src/components/Spinner/TeammateSpinnerTree.tsx`
- `src/components/Stats.tsx`
- `src/components/TaskListV2.tsx`
- `src/components/TeleportProgress.tsx`
- `src/components/TeleportStash.tsx`
- `src/components/agents/AgentDetail.tsx`
- `src/components/agents/AgentEditor.tsx`
- `src/components/agents/AgentsList.tsx`
- `src/components/agents/ColorPicker.tsx`
- `src/components/agents/ToolSelector.tsx`
- `src/components/design-system/ListItem.tsx`
- `src/components/design-system/StatusIcon.tsx`
- `src/components/diff/DiffFileList.tsx`
- `src/components/hooks/SelectEventMode.tsx`
- `src/components/mcp/ElicitationDialog.tsx`
- `src/components/mcp/MCPAgentServerMenu.tsx`
- `src/components/mcp/MCPListPanel.tsx`
- `src/components/mcp/MCPReconnect.tsx`
- `src/components/mcp/MCPRemoteServerMenu.tsx`
- `src/components/mcp/MCPStdioServerMenu.tsx`
- `src/components/messageActions.tsx`
- `src/components/messages/AdvisorMessage.tsx`
- `src/components/messages/HighlightedThinkingText.tsx`
- `src/components/messages/SystemTextMessage.tsx`
- `src/components/messages/UserCommandMessage.tsx`
- `src/components/messages/UserTeammateMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolSuccessMessage.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/PreviewQuestionView.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/QuestionNavigationBar.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/QuestionView.tsx`
- `src/components/permissions/AskUserQuestionPermissionRequest/SubmitQuestionsView.tsx`
- `src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx`
- `src/components/permissions/ComputerUseApproval/ComputerUseApproval.tsx`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/permissions/PermissionDecisionDebugInfo.tsx`
- `src/components/permissions/rules/AddWorkspaceDirectory.tsx`
- `src/components/permissions/rules/PermissionRuleInput.tsx`
- `src/components/permissions/rules/PermissionRuleList.tsx`
- `src/components/permissions/rules/WorkspaceTab.tsx`
- `src/components/tasks/BackgroundTaskStatus.tsx`
- `src/components/tasks/BackgroundTasksDialog.tsx`
- `src/components/tasks/RemoteSessionDetailDialog.tsx`
- `src/components/tasks/taskStatusUtils.tsx`
- `src/components/teams/TeamsDialog.tsx`
- `src/constants/outputStyles.ts`
- `src/hooks/usePluginRecommendationBase.tsx`
- `src/screens/Doctor.tsx`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/services/diagnosticTracking.ts`
- `src/services/plugins/pluginCliCommands.ts`
- `src/tools/BriefTool/UI.tsx`
- `src/tools/MCPTool/UI.tsx`
- `src/utils/status.tsx`
- `src/utils/statusNoticeDefinitions.tsx`
- `src/utils/treeify.ts`

### `axios` (52 fichiers)

- `src/assistant/sessionHistory.ts`
- `src/bridge/bridgeApi.ts`
- `src/bridge/codeSessionApi.ts`
- `src/bridge/createSession.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/remoteBridgeCore.ts`
- `src/bridge/trustedDevice.ts`
- `src/bridge/workSecret.ts`
- `src/cli/transports/HybridTransport.ts`
- `src/cli/transports/SSETransport.ts`
- `src/commands/remote-setup/api.ts`
- `src/components/Feedback.tsx`
- `src/components/FeedbackSurvey/submitTranscriptShare.ts`
- `src/services/api/adminRequests.ts`
- `src/services/api/filesApi.ts`
- `src/services/api/firstTokenDate.ts`
- `src/services/api/grove.ts`
- `src/services/api/overageCreditGrant.ts`
- `src/services/api/referral.ts`
- `src/services/api/sessionIngress.ts`
- `src/services/api/ultrareviewQuota.ts`
- `src/services/api/usage.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/claudeai.ts`
- `src/services/oauth/client.ts`
- `src/services/oauth/getOauthProfile.ts`
- `src/services/remoteManagedSettings/index.ts`
- `src/services/settingsSync/index.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/x402/paymentFetch.ts`
- `src/tools/BriefTool/upload.ts`
- `src/tools/RemoteTriggerTool/RemoteTriggerTool.ts`
- `src/tools/WebFetchTool/utils.ts`
- `src/utils/autoUpdater.ts`
- `src/utils/background/remote/preconditions.ts`
- `src/utils/env.ts`
- `src/utils/errorLogSink.ts`
- `src/utils/hooks/execHttpHook.ts`
- `src/utils/hooks/ssrfGuard.ts`
- `src/utils/http.ts`
- `src/utils/ide.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/plugins/installCounts.ts`
- `src/utils/plugins/marketplaceManager.ts`
- `src/utils/plugins/mcpbHandler.ts`
- `src/utils/plugins/officialMarketplaceGcs.ts`
- `src/utils/preflightChecks.tsx`
- `src/utils/proxy.ts`
- `src/utils/releaseNotes.ts`
- `src/utils/teleport.tsx`
- `src/utils/teleport/api.ts`
- `src/utils/teleport/environments.ts`

### `chalk` (47 fichiers)

- `src/bridge/bridgeUI.ts`
- `src/cli/update.ts`
- `src/commands/add-dir/add-dir.tsx`
- `src/commands/add-dir/validation.ts`
- `src/commands/compact/compact.ts`
- `src/commands/ide/ide.tsx`
- `src/commands/model/model.tsx`
- `src/commands/resume/resume.tsx`
- `src/commands/tag/tag.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/components/CtrlOToExpand.tsx`
- `src/components/FastIcon.tsx`
- `src/components/LogSelector.tsx`
- `src/components/Messages.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/RemoteEnvironmentDialog.tsx`
- `src/components/Settings/Config.tsx`
- `src/components/Stats.tsx`
- `src/components/TextInput.tsx`
- `src/components/VimTextInput.tsx`
- `src/components/agents/AgentEditor.tsx`
- `src/components/agents/AgentsMenu.tsx`
- `src/components/agents/new-agent-creation/wizard-steps/ConfirmStepWrapper.tsx`
- `src/components/memory/MemoryFileSelector.tsx`
- `src/components/permissions/PermissionDecisionDebugInfo.tsx`
- `src/components/permissions/PermissionRuleExplanation.tsx`
- `src/components/permissions/rules/PermissionRuleList.tsx`
- `src/cost-tracker.ts`
- `src/hooks/renderPlaceholder.ts`
- `src/ink/colorize.ts`
- `src/ink/render-border.ts`
- `src/main.tsx`
- `src/services/tips/tipRegistry.ts`
- `src/services/x402/tracker.ts`
- `src/setup.ts`
- `src/utils/completionCache.ts`
- `src/utils/gracefulShutdown.ts`
- `src/utils/heatmap.ts`
- `src/utils/hooks.ts`
- `src/utils/hyperlink.ts`
- `src/utils/markdown.ts`
- `src/utils/shell/prefix.ts`
- `src/utils/status.tsx`
- `src/utils/teleport.tsx`
- `src/utils/terminal.ts`
- `src/utils/theme.ts`
- `src/utils/worktree.ts`

### `@modelcontextprotocol/sdk` (27 fichiers)

- `src/Tool.ts`
- `src/cli/print.ts`
- `src/cli/structuredIO.ts`
- `src/components/mcp/ElicitationDialog.tsx`
- `src/entrypoints/agentSdkTypes.ts`
- `src/entrypoints/mcp.ts`
- `src/entrypoints/sdk/runtimeTypes.ts`
- `src/services/mcp/InProcessTransport.ts`
- `src/services/mcp/SdkControlTransport.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/channelNotification.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/elicitationHandler.ts`
- `src/services/mcp/types.ts`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/services/mcp/xaa.ts`
- `src/services/mcp/xaaIdpLogin.ts`
- `src/shims/ant-claude-for-chrome-mcp.ts`
- `src/tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`
- `src/utils/attachments.ts`
- `src/utils/claudeInChrome/mcpServer.ts`
- `src/utils/claudeInChrome/toolRendering.tsx`
- `src/utils/computerUse/mcpServer.ts`
- `src/utils/hooks.ts`
- `src/utils/ide.ts`
- `src/utils/mcp/elicitationValidation.ts`
- `src/utils/mcpWebSocketTransport.ts`

### `diff` (19 fichiers)

- `src/commands/insights.ts`
- `src/components/FileEditToolDiff.tsx`
- `src/components/FileEditToolUpdatedMessage.tsx`
- `src/components/FileEditToolUseRejectedMessage.tsx`
- `src/components/StructuredDiff.tsx`
- `src/components/StructuredDiff/Fallback.tsx`
- `src/components/StructuredDiffList.tsx`
- `src/components/diff/DiffDetailView.tsx`
- `src/components/diff/DiffDialog.tsx`
- `src/hooks/useDiffData.ts`
- `src/hooks/useTurnDiffs.ts`
- `src/native-ts/color-diff/index.ts`
- `src/services/api/promptCacheBreakDetection.ts`
- `src/tools/FileEditTool/UI.tsx`
- `src/tools/FileEditTool/utils.ts`
- `src/tools/FileWriteTool/UI.tsx`
- `src/utils/diff.ts`
- `src/utils/fileHistory.ts`
- `src/utils/gitDiff.ts`

### `execa` (15 fichiers)

- `src/commands/install-github-app/install-github-app.tsx`
- `src/commands/remote-setup/remote-setup.tsx`
- `src/commands/thinkback/thinkback.tsx`
- `src/utils/authPortable.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/doctorDiagnostic.ts`
- `src/utils/execFileNoThrow.ts`
- `src/utils/execFileNoThrowPortable.ts`
- `src/utils/github/ghAuthStatus.ts`
- `src/utils/ide.ts`
- `src/utils/imagePaste.ts`
- `src/utils/powershell/parser.ts`
- `src/utils/secureStorage/macOsKeychainStorage.ts`
- `src/utils/user.ts`
- `src/utils/which.ts`

### `usehooks-ts` (14 fichiers)

- `src/commands/btw/btw.tsx`
- `src/components/AutoUpdater.tsx`
- `src/components/NativeAutoUpdater.tsx`
- `src/components/PackageManagerAutoUpdater.tsx`
- `src/components/messages/SystemAPIErrorMessage.tsx`
- `src/components/permissions/rules/AddWorkspaceDirectory.tsx`
- `src/components/teams/TeamsDialog.tsx`
- `src/hooks/notifs/useLspInitializationNotification.tsx`
- `src/hooks/useInboxPoller.ts`
- `src/hooks/useMemoryUsage.ts`
- `src/hooks/usePasteHandler.ts`
- `src/hooks/useSwarmPermissionPoller.ts`
- `src/hooks/useTypeahead.tsx`
- `src/ink/hooks/use-input.ts`

### `strip-ansi` (12 fichiers)

- `src/QueryEngine.ts`
- `src/components/MarkdownTable.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/Stats.tsx`
- `src/components/shell/ShellProgressMessage.tsx`
- `src/hooks/useTextInput.ts`
- `src/ink/hooks/use-terminal-title.ts`
- `src/ink/stringWidth.ts`
- `src/utils/exportRenderer.tsx`
- `src/utils/markdown.ts`
- `src/utils/messages/mappers.ts`
- `src/utils/staticRender.tsx`

### `@ant/computer-use-mcp` (7 fichiers)

- `src/components/permissions/ComputerUseApproval/ComputerUseApproval.tsx`
- `src/utils/computerUse/executor.ts`
- `src/utils/computerUse/gates.ts`
- `src/utils/computerUse/hostAdapter.ts`
- `src/utils/computerUse/mcpServer.ts`
- `src/utils/computerUse/setup.ts`
- `src/utils/computerUse/wrapper.tsx`

### `ws` (6 fichiers)

- `src/cli/transports/WebSocketTransport.ts`
- `src/remote/SessionsWebSocket.ts`
- `src/services/mcp/client.ts`
- `src/services/voiceStreamSTT.ts`
- `src/upstreamproxy/relay.ts`
- `src/utils/mcpWebSocketTransport.ts`

### `@alcalzone/ansi-tokenize` (5 fichiers)

- `src/ink/log-update.ts`
- `src/ink/output.ts`
- `src/ink/screen.ts`
- `src/utils/sliceAnsi.ts`
- `src/utils/textHighlighting.ts`

### `chokidar` (5 fichiers)

- `src/keybindings/loadUserBindings.ts`
- `src/utils/cronScheduler.ts`
- `src/utils/hooks/fileChangedWatcher.ts`
- `src/utils/settings/changeDetector.ts`
- `src/utils/skills/skillChangeDetector.ts`

### `ignore` (5 fichiers)

- `src/hooks/fileSuggestions.ts`
- `src/skills/loadSkillsDir.ts`
- `src/utils/claudemd.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/worktree.ts`

### `lru-cache` (5 fichiers)

- `src/services/lsp/LSPDiagnosticRegistry.ts`
- `src/tools/WebFetchTool/utils.ts`
- `src/utils/fileStateCache.ts`
- `src/utils/memoize.ts`
- `src/utils/suggestions/directoryCompletion.ts`

### `marked` (5 fichiers)

- `src/commands/copy/copy.tsx`
- `src/components/Markdown.tsx`
- `src/components/MarkdownTable.tsx`
- `src/utils/claudemd.ts`
- `src/utils/markdown.ts`

### `qrcode` (5 fichiers)

- `src/bridge/bridgeUI.ts`
- `src/commands/bridge/bridge.tsx`
- `src/commands/mobile/mobile.tsx`
- `src/commands/session/session.tsx`
- `src/components/BridgeDialog.tsx`

### `semver` (5 fichiers)

- `src/hooks/useUpdateNotification.ts`
- `src/ink/terminal.ts`
- `src/utils/desktopDeepLink.ts`
- `src/utils/releaseNotes.ts`
- `src/utils/semver.ts`

### `@ant/claude-for-chrome-mcp` (4 fichiers)

- `src/services/mcp/client.ts`
- `src/skills/bundled/claudeInChrome.ts`
- `src/utils/claudeInChrome/mcpServer.ts`
- `src/utils/claudeInChrome/setup.ts`

### `crypto` (4 fichiers)

- `src/services/x402/client.ts`
- `src/services/x402/config.ts`
- `src/utils/crypto.ts`
- `src/utils/hash.ts`

### `react-reconciler` (4 fichiers)

- `src/ink/events/dispatcher.ts`
- `src/ink/ink.tsx`
- `src/ink/reconciler.ts`
- `src/ink/render-to-screen.ts`

### `type-fest` (4 fichiers)

- `src/ink/components/Box.tsx`
- `src/ink/components/Button.tsx`
- `src/ink/components/ScrollBox.tsx`
- `src/types/hooks.ts`

### `@commander-js/extra-typings` (3 fichiers)

- `src/commands/mcp/addCommand.ts`
- `src/commands/mcp/xaaIdpCommand.ts`
- `src/main.tsx`

### `vscode-languageserver-protocol` (3 fichiers)

- `src/services/lsp/LSPClient.ts`
- `src/services/lsp/LSPServerInstance.ts`
- `src/services/lsp/passiveFeedback.ts`

### `@anthropic-ai/mcpb` (2 fichiers)

- `src/utils/dxt/helpers.ts`
- `src/utils/plugins/mcpbHandler.ts`

### `@aws-sdk/client-bedrock-runtime` (2 fichiers)

- `src/services/tokenEstimation.ts`
- `src/utils/model/bedrock.ts`

### `@smithy/node-http-handler` (2 fichiers)

- `src/utils/model/bedrock.ts`
- `src/utils/proxy.ts`

### `fflate` (2 fichiers)

- `src/utils/dxt/zip.ts`
- `src/utils/plugins/zipCache.ts`

### `fuse.js` (2 fichiers)

- `src/hooks/unifiedSuggestions.ts`
- `src/utils/suggestions/commandSuggestions.ts`

### `highlight.js` (2 fichiers)

- `src/native-ts/color-diff/index.ts`
- `src/utils/cliHighlight.ts`

### `image-processor-napi` (2 fichiers)

- `src/tools/FileReadTool/imageProcessor.ts`
- `src/utils/imagePaste.ts`

### `p-map` (2 fichiers)

- `src/cli/handlers/mcp.tsx`
- `src/services/mcp/client.ts`

### `sharp` (2 fichiers)

- `src/tools/FileReadTool/FileReadTool.ts`
- `src/tools/FileReadTool/imageProcessor.ts`

### `shell-quote` (2 fichiers)

- `src/utils/bash/commands.ts`
- `src/utils/bash/shellQuote.ts`

### `signal-exit` (2 fichiers)

- `src/ink/ink.tsx`
- `src/utils/gracefulShutdown.ts`

### `undici` (2 fichiers)

- `src/utils/mtls.ts`
- `src/utils/proxy.ts`

### `vscode-languageserver-types` (2 fichiers)

- `src/tools/LSPTool/LSPTool.ts`
- `src/tools/LSPTool/formatters.ts`

### `xss` (2 fichiers)

- `src/services/mcp/auth.ts`
- `src/services/mcp/xaaIdpLogin.ts`

### `@ant/computer-use-input` (1 fichiers)

- `src/utils/computerUse/inputLoader.ts`

### `@ant/computer-use-swift` (1 fichiers)

- `src/utils/computerUse/swiftLoader.ts`

### `@anthropic-ai/bedrock-sdk` (1 fichiers)

- `src/services/api/client.ts`

### `@anthropic-ai/foundry-sdk` (1 fichiers)

- `src/services/api/client.ts`

### `@anthropic-ai/sandbox-runtime` (1 fichiers)

- `src/utils/sandbox/sandbox-adapter.ts`

### `@anthropic-ai/vertex-sdk` (1 fichiers)

- `src/services/api/client.ts`

### `@aws-sdk/client-bedrock` (1 fichiers)

- `src/utils/model/bedrock.ts`

### `@aws-sdk/client-sts` (1 fichiers)

- `src/utils/aws.ts`

### `@aws-sdk/credential-provider-node` (1 fichiers)

- `src/utils/proxy.ts`

### `@aws-sdk/credential-providers` (1 fichiers)

- `src/utils/aws.ts`

### `@azure/identity` (1 fichiers)

- `src/services/api/client.ts`

### `@growthbook/growthbook` (1 fichiers)

- `src/services/analytics/growthbook.ts`

### `@smithy/core` (1 fichiers)

- `src/utils/model/bedrock.ts`

### `ajv` (1 fichiers)

- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`

### `asciichart` (1 fichiers)

- `src/components/Stats.tsx`

### `audio-capture-napi` (1 fichiers)

- `src/services/voice.ts`

### `auto-bind` (1 fichiers)

- `src/ink/ink.tsx`

### `bidi-js` (1 fichiers)

- `src/ink/bidi.ts`

### `cacache` (1 fichiers)

- `src/utils/cleanup.ts`

### `cli-boxes` (1 fichiers)

- `src/ink/render-border.ts`

### `cli-highlight` (1 fichiers)

- `src/utils/cliHighlight.ts`

### `code-excerpt` (1 fichiers)

- `src/ink/components/ErrorOverview.tsx`

### `color-diff-napi` (1 fichiers)

- `src/components/StructuredDiff/colorDiff.ts`

### `emoji-regex` (1 fichiers)

- `src/ink/stringWidth.ts`

### `env-paths` (1 fichiers)

- `src/utils/cachePaths.ts`

### `fs` (1 fichiers)

- `src/utils/claudemd.ts`

### `get-east-asian-width` (1 fichiers)

- `src/ink/stringWidth.ts`

### `github.com` (1 fichiers)

- `src/utils/plugins/schemas.ts`

### `google-auth-library` (1 fichiers)

- `src/services/api/client.ts`

### `https-proxy-agent` (1 fichiers)

- `src/utils/proxy.ts`

### `indent-string` (1 fichiers)

- `src/ink/render-node-to-output.ts`

### `ink` (1 fichiers)

- `src/ink/hooks/use-input.ts`

### `jsonc-parser` (1 fichiers)

- `src/utils/json.ts`

### `npm` (1 fichiers)

- `src/utils/permissions/dangerousPatterns.ts`

### `picomatch` (1 fichiers)

- `src/utils/claudemd.ts`

### `plist` (1 fichiers)

- `src/services/notifier.ts`

### `proper-lockfile` (1 fichiers)

- `src/utils/lockfile.ts`

### `stack-utils` (1 fichiers)

- `src/ink/components/ErrorOverview.tsx`

### `supports-hyperlinks` (1 fichiers)

- `src/ink/supports-hyperlinks.ts`

### `tls` (1 fichiers)

- `src/utils/caCerts.ts`

### `tree-kill` (1 fichiers)

- `src/utils/ShellCommand.ts`

### `turndown` (1 fichiers)

- `src/tools/WebFetchTool/utils.ts`

### `url-handler-napi` (1 fichiers)

- `src/utils/deepLink/protocolHandler.ts`

### `user` (1 fichiers)

- `src/utils/swarm/inProcessRunner.ts`

### `vm` (1 fichiers)

- `src/state/AppStateStore.ts`

### `vscode-jsonrpc` (1 fichiers)

- `src/services/lsp/LSPClient.ts`

### `wrap-ansi` (1 fichiers)

- `src/ink/wrapAnsi.ts`

### `yaml` (1 fichiers)

- `src/utils/yaml.ts`

## 4. Runtimes et alias de chemins

### `node:` (modules intégrés Node)

#### `node:async_hooks` (5)

- `src/utils/agentContext.ts`
- `src/utils/cwd.ts`
- `src/utils/teammateContext.ts`
- `src/utils/telemetry/sessionTracing.ts`
- `src/utils/workloadContext.ts`

#### `node:buffer` (3)

- `src/ink/parse-keypress.ts`
- `src/ink/termio/osc.ts`
- `src/tools/FileReadTool/imageProcessor.ts`

#### `node:child_process` (24)

- `src/bridge/sessionRunner.ts`
- `src/commands/exit/exit.tsx`
- `src/commands/insights.ts`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/server/types.ts`
- `src/services/lsp/LSPClient.ts`
- `src/services/preventSleep.ts`
- `src/services/voice.ts`
- `src/utils/Shell.ts`
- `src/utils/ShellCommand.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/deepLink/terminalLauncher.ts`
- `src/utils/editor.ts`
- `src/utils/execSyncWrapper.ts`
- `src/utils/fullscreen.ts`
- `src/utils/getWorktreePathsPortable.ts`
- `src/utils/hooks.ts`
- `src/utils/idePathConversion.ts`
- `src/utils/ripgrep.ts`
- `src/utils/secureStorage/keychainPrefetch.ts`
- `src/utils/settings/mdm/rawRead.ts`
- `src/utils/terminalPanel.ts`
- `src/utils/worktree.ts`

#### `node:crypto` (118)

- `src/QueryEngine.ts`
- `src/Task.ts`
- `src/Tool.ts`
- `src/bridge/bridgeMain.ts`
- `src/bridge/bridgeMessaging.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/inboundMessages.ts`
- `src/bridge/replBridge.ts`
- `src/cli/print.ts`
- `src/cli/structuredIO.ts`
- `src/cli/transports/ccrClient.ts`
- `src/commands/branch/branch.ts`
- `src/commands/clear/conversation.ts`
- `src/commands/color/color.ts`
- `src/commands/rename/rename.ts`
- `src/commands/resume/resume.tsx`
- `src/commands/tag/tag.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/components/FeedbackSurvey/useSurveyState.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/Messages.tsx`
- `src/components/SessionPreview.tsx`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/teams/TeamsDialog.tsx`
- `src/hooks/toolPermission/handlers/interactiveHandler.ts`
- `src/hooks/useAssistantHistory.ts`
- `src/hooks/useDiffInIDE.ts`
- `src/hooks/useInboxPoller.ts`
- `src/hooks/useLogMessages.ts`
- `src/hooks/useSSHSession.ts`
- `src/main.tsx`
- `src/query/deps.ts`
- `src/remote/SessionsWebSocket.ts`
- `src/remote/remotePermissionBridge.ts`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/services/PromptSuggestion/speculation.ts`
- `src/services/api/claude.ts`
- `src/services/api/client.ts`
- `src/services/api/dumpPrompts.ts`
- `src/services/api/filesApi.ts`
- `src/services/api/ollamaAnthropicShim.ts`
- `src/services/api/sessionIngress.ts`
- `src/services/compact/compact.ts`
- `src/services/lsp/LSPDiagnosticRegistry.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/utils.ts`
- `src/services/mcp/xaaIdpLogin.ts`
- `src/services/oauth/crypto.ts`
- `src/services/remoteManagedSettings/index.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/vcr.ts`
- `src/services/x402/client.ts`
- `src/services/x402/config.ts`
- `src/tasks/LocalMainSessionTask.ts`
- `src/tools/AgentTool/forkSubagent.ts`
- `src/tools/AgentTool/runAgent.ts`
- `src/tools/BashTool/sedEditParser.ts`
- `src/tools/BriefTool/upload.ts`
- `src/types/command.ts`
- `src/types/logs.ts`
- `src/types/message.ts`
- `src/types/textInputTypes.ts`
- `src/utils/api.ts`
- `src/utils/attachments.ts`
- `src/utils/bash/commands.ts`
- `src/utils/bash/heredoc.ts`
- `src/utils/collapseReadSearch.ts`
- `src/utils/commitAttribution.ts`
- `src/utils/config.ts`
- `src/utils/conversationRecovery.ts`
- `src/utils/cronTasks.ts`
- `src/utils/crypto.ts`
- `src/utils/fileHistory.ts`
- `src/utils/fileOperationAnalytics.ts`
- `src/utils/fingerprint.ts`
- `src/utils/forkedAgent.ts`
- `src/utils/git.ts`
- `src/utils/handlePromptSubmit.ts`
- `src/utils/hooks.ts`
- `src/utils/hooks/apiQueryHookHelper.ts`
- `src/utils/hooks/execAgentHook.ts`
- `src/utils/hooks/execPromptHook.ts`
- `src/utils/imagePaste.ts`
- `src/utils/messages.ts`
- `src/utils/messages/mappers.ts`
- `src/utils/messages/systemInit.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/pasteStore.ts`
- `src/utils/pdf.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/plans.ts`
- `src/utils/plugins/installCounts.ts`
- `src/utils/plugins/mcpbHandler.ts`
- `src/utils/plugins/pluginFlagging.ts`
- `src/utils/plugins/pluginInstallationHelpers.ts`
- `src/utils/plugins/pluginVersioning.ts`
- `src/utils/plugins/zipCache.ts`
- `src/utils/processUserInput/processBashCommand.tsx`
- `src/utils/processUserInput/processSlashCommand.tsx`
- `src/utils/processUserInput/processTextPrompt.ts`
- `src/utils/processUserInput/processUserInput.ts`
- `src/utils/promptShellExecution.ts`
- `src/utils/sdkEventQueue.ts`
- `src/utils/secureStorage/macOsKeychainHelpers.ts`
- `src/utils/sessionRestore.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/sessionStoragePortable.ts`
- `src/utils/sessionUrl.ts`
- `src/utils/statsCache.ts`
- `src/utils/telemetry/betaSessionTracing.ts`
- `src/utils/telemetry/localTrace.ts`
- `src/utils/telemetry/pluginTelemetry.ts`
- `src/utils/teleport.tsx`
- `src/utils/teleport/api.ts`
- `src/utils/tempfile.ts`
- `src/utils/uuid.ts`
- `src/utils/words.ts`

#### `node:dns` (2)

- `src/utils/hooks/ssrfGuard.ts`
- `src/utils/proxy.ts`

#### `node:events` (2)

- `src/ink/events/emitter.ts`
- `src/utils/abortController.ts`

#### `node:fs` (167)

- `src/bootstrap/state.ts`
- `src/bridge/bridgePointer.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/sessionRunner.ts`
- `src/cli/handlers/mcp.tsx`
- `src/cli/print.ts`
- `src/commands/add-dir/validation.ts`
- `src/commands/branch/branch.ts`
- `src/commands/copy/copy.tsx`
- `src/commands/insights.ts`
- `src/commands/keybindings/keybindings.ts`
- `src/commands/memory/memory.tsx`
- `src/commands/plugin/ManagePlugins.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/commands/thinkback/thinkback.tsx`
- `src/commands/ultraplan.tsx`
- `src/components/Feedback.tsx`
- `src/components/FeedbackSurvey/submitTranscriptShare.ts`
- `src/components/agents/agentFileUtils.ts`
- `src/components/memory/MemoryFileSelector.tsx`
- `src/history.ts`
- `src/hooks/fileSuggestions.ts`
- `src/hooks/useTaskListWatcher.ts`
- `src/hooks/useTasksV2.ts`
- `src/ink/components/ErrorOverview.tsx`
- `src/ink/ink.tsx`
- `src/ink/reconciler.ts`
- `src/interactiveHelpers.tsx`
- `src/keybindings/loadUserBindings.ts`
- `src/main.tsx`
- `src/memdir/memoryScan.ts`
- `src/memdir/teamMemPaths.ts`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/services/PromptSuggestion/speculation.ts`
- `src/services/SessionMemory/prompts.ts`
- `src/services/SessionMemory/sessionMemory.ts`
- `src/services/api/dumpPrompts.ts`
- `src/services/api/filesApi.ts`
- `src/services/api/promptCacheBreakDetection.ts`
- `src/services/autoDream/consolidationLock.ts`
- `src/services/internalLogging.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/config.ts`
- `src/services/remoteManagedSettings/index.ts`
- `src/services/settingsSync/index.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/teamMemorySync/watcher.ts`
- `src/services/vcr.ts`
- `src/services/voice.ts`
- `src/shims/macro.ts`
- `src/skills/bundled/claudeApi.ts`
- `src/skills/bundled/debug.ts`
- `src/skills/bundledSkills.ts`
- `src/skills/loadSkillsDir.ts`
- `src/tasks/LocalShellTask/LocalShellTask.tsx`
- `src/tools/AgentTool/agentMemorySnapshot.ts`
- `src/tools/AgentTool/resumeAgent.ts`
- `src/tools/BashTool/BashTool.tsx`
- `src/tools/BashTool/utils.ts`
- `src/tools/BriefTool/attachments.ts`
- `src/tools/BriefTool/upload.ts`
- `src/tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts`
- `src/tools/FileReadTool/FileReadTool.ts`
- `src/tools/LSPTool/LSPTool.ts`
- `src/tools/PowerShellTool/PowerShellTool.tsx`
- `src/upstreamproxy/upstreamproxy.ts`
- `src/utils/Shell.ts`
- `src/utils/ShellCommand.ts`
- `src/utils/appleTerminalBackup.ts`
- `src/utils/asciicast.ts`
- `src/utils/attachments.ts`
- `src/utils/attribution.ts`
- `src/utils/authFileDescriptor.ts`
- `src/utils/autoUpdater.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/claudeDesktop.ts`
- `src/utils/claudeInChrome/chromeNativeHost.ts`
- `src/utils/claudeInChrome/common.ts`
- `src/utils/claudeInChrome/setup.ts`
- `src/utils/claudeInChrome/setupPortable.ts`
- `src/utils/cleanup.ts`
- `src/utils/commitAttribution.ts`
- `src/utils/completionCache.ts`
- `src/utils/computerUse/computerUseLock.ts`
- `src/utils/concurrentSessions.ts`
- `src/utils/config.ts`
- `src/utils/cronTasks.ts`
- `src/utils/cronTasksLock.ts`
- `src/utils/debug.ts`
- `src/utils/deepLink/banner.ts`
- `src/utils/deepLink/registerProtocol.ts`
- `src/utils/desktopDeepLink.ts`
- `src/utils/doctorDiagnostic.ts`
- `src/utils/envDynamic.ts`
- `src/utils/file.ts`
- `src/utils/fileHistory.ts`
- `src/utils/filePersistence/outputsScanner.ts`
- `src/utils/fsOperations.ts`
- `src/utils/git.ts`
- `src/utils/git/gitConfigParser.ts`
- `src/utils/git/gitFilesystem.ts`
- `src/utils/git/gitignore.ts`
- `src/utils/gitDiff.ts`
- `src/utils/githubRepoPathMapping.ts`
- `src/utils/gracefulShutdown.ts`
- `src/utils/heapDumpService.ts`
- `src/utils/hooks/skillImprovement.ts`
- `src/utils/iTermBackup.ts`
- `src/utils/imageStore.ts`
- `src/utils/json.ts`
- `src/utils/listSessionsImpl.ts`
- `src/utils/localInstaller.ts`
- `src/utils/log.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/mcpOutputStorage.ts`
- `src/utils/model/modelCapabilities.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/nativeInstaller/installer.ts`
- `src/utils/nativeInstaller/packageManagers.ts`
- `src/utils/pasteStore.ts`
- `src/utils/pdf.ts`
- `src/utils/permissions/yoloClassifier.ts`
- `src/utils/plans.ts`
- `src/utils/platform.ts`
- `src/utils/plugins/cacheUtils.ts`
- `src/utils/plugins/installCounts.ts`
- `src/utils/plugins/lspPluginIntegration.ts`
- `src/utils/plugins/marketplaceManager.ts`
- `src/utils/plugins/mcpbHandler.ts`
- `src/utils/plugins/officialMarketplaceGcs.ts`
- `src/utils/plugins/pluginDirectories.ts`
- `src/utils/plugins/pluginFlagging.ts`
- `src/utils/plugins/pluginInstallationHelpers.ts`
- `src/utils/plugins/pluginLoader.ts`
- `src/utils/plugins/validatePlugin.ts`
- `src/utils/plugins/zipCache.ts`
- `src/utils/plugins/zipCacheAdapters.ts`
- `src/utils/readEditContext.ts`
- `src/utils/readFileInRange.ts`
- `src/utils/releaseNotes.ts`
- `src/utils/renderOptions.ts`
- `src/utils/sandbox/sandbox-adapter.ts`
- `src/utils/screenshotClipboard.ts`
- `src/utils/secureStorage/plainTextStorage.ts`
- `src/utils/sessionEnvironment.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/sessionStoragePortable.ts`
- `src/utils/settings/changeDetector.ts`
- `src/utils/settings/mdm/rawRead.ts`
- `src/utils/shell/bashProvider.ts`
- `src/utils/shell/powershellDetection.ts`
- `src/utils/shellConfig.ts`
- `src/utils/slowOperations.ts`
- `src/utils/stats.ts`
- `src/utils/statsCache.ts`
- `src/utils/swarm/permissionSync.ts`
- `src/utils/swarm/teamHelpers.ts`
- `src/utils/task/TaskOutput.ts`
- `src/utils/task/diskOutput.ts`
- `src/utils/tasks.ts`
- `src/utils/teammateMailbox.ts`
- `src/utils/telemetry/perfettoTracing.ts`
- `src/utils/teleport/gitBundle.ts`
- `src/utils/toolResultStorage.ts`
- `src/utils/worktree.ts`

#### `node:http` (6)

- `src/services/mcp/auth.ts`
- `src/services/mcp/oauthPort.ts`
- `src/services/mcp/xaaIdpLogin.ts`
- `src/services/oauth/auth-code-listener.ts`
- `src/services/voiceStreamSTT.ts`
- `src/utils/proxy.ts`

#### `node:https` (1)

- `src/utils/mtls.ts`

#### `node:net` (5)

- `src/services/oauth/auth-code-listener.ts`
- `src/upstreamproxy/relay.ts`
- `src/utils/claudeInChrome/chromeNativeHost.ts`
- `src/utils/hooks/ssrfGuard.ts`
- `src/utils/ide.ts`

#### `node:os` (61)

- `src/bridge/bridgeMain.ts`
- `src/bridge/initReplBridge.ts`
- `src/bridge/sessionRunner.ts`
- `src/bridge/trustedDevice.ts`
- `src/commands/copy/copy.tsx`
- `src/commands/insights.ts`
- `src/commands/install.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/components/LogoV2/feedConfigs.tsx`
- `src/components/TrustDialog/TrustDialog.tsx`
- `src/components/memory/MemoryUpdateNotification.tsx`
- `src/components/permissions/FilePermissionDialog/permissionOptions.tsx`
- `src/constants/prompts.ts`
- `src/memdir/paths.ts`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/tools/BashTool/pathValidation.ts`
- `src/tools/PowerShellTool/pathValidation.ts`
- `src/upstreamproxy/upstreamproxy.ts`
- `src/utils/appleTerminalBackup.ts`
- `src/utils/autoUpdater.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/claudeDesktop.ts`
- `src/utils/claudeInChrome/chromeNativeHost.ts`
- `src/utils/claudeInChrome/common.ts`
- `src/utils/claudeInChrome/setup.ts`
- `src/utils/claudeInChrome/setupPortable.ts`
- `src/utils/cleanup.ts`
- `src/utils/completionCache.ts`
- `src/utils/computerUse/mcpServer.ts`
- `src/utils/deepLink/banner.ts`
- `src/utils/deepLink/protocolHandler.ts`
- `src/utils/deepLink/registerProtocol.ts`
- `src/utils/doctorDiagnostic.ts`
- `src/utils/env.ts`
- `src/utils/envUtils.ts`
- `src/utils/file.ts`
- `src/utils/fsOperations.ts`
- `src/utils/git/gitignore.ts`
- `src/utils/iTermBackup.ts`
- `src/utils/ide.ts`
- `src/utils/jetbrains.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/nativeInstaller/installer.ts`
- `src/utils/path.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/pathValidation.ts`
- `src/utils/platform.ts`
- `src/utils/plugins/parseMarketplaceInput.ts`
- `src/utils/plugins/zipCache.ts`
- `src/utils/ripgrep.ts`
- `src/utils/screenshotClipboard.ts`
- `src/utils/secureStorage/macOsKeychainHelpers.ts`
- `src/utils/settings/mdm/constants.ts`
- `src/utils/shell/bashProvider.ts`
- `src/utils/shell/powershellProvider.ts`
- `src/utils/shellConfig.ts`
- `src/utils/swarm/backends/it2Setup.ts`
- `src/utils/systemDirectories.ts`
- `src/utils/tempfile.ts`
- `src/utils/xdg.ts`

#### `node:path` (252)

- `src/bridge/bridgeMain.ts`
- `src/bridge/bridgePointer.ts`
- `src/bridge/inboundAttachments.ts`
- `src/bridge/sessionRunner.ts`
- `src/cli/handlers/plugins.ts`
- `src/cli/print.ts`
- `src/commands/add-dir/validation.ts`
- `src/commands/copy/copy.tsx`
- `src/commands/export/export.tsx`
- `src/commands/files/files.ts`
- `src/commands/ide/ide.tsx`
- `src/commands/insights.ts`
- `src/commands/install.tsx`
- `src/commands/keybindings/keybindings.ts`
- `src/commands/plugin/ManagePlugins.tsx`
- `src/commands/sandbox-toggle/sandbox-toggle.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/commands/thinkback-play/thinkback-play.ts`
- `src/commands/thinkback/thinkback.tsx`
- `src/components/BridgeDialog.tsx`
- `src/components/DiagnosticsDisplay.tsx`
- `src/components/ExportDialog.tsx`
- `src/components/FileEditToolUseRejectedMessage.tsx`
- `src/components/GlobalSearchDialog.tsx`
- `src/components/HighlightedCode/Fallback.tsx`
- `src/components/IdeStatusIndicator.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/NotebookEditToolUseRejectedMessage.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/QuickOpenDialog.tsx`
- `src/components/ShowInIDEPrompt.tsx`
- `src/components/agents/agentFileUtils.ts`
- `src/components/diff/DiffDetailView.tsx`
- `src/components/memory/MemoryFileSelector.tsx`
- `src/components/memory/MemoryUpdateNotification.tsx`
- `src/components/messages/AttachmentMessage.tsx`
- `src/components/messages/CollapsedReadSearchContent.tsx`
- `src/components/messages/SystemTextMessage.tsx`
- `src/components/permissions/FileEditPermissionRequest/FileEditPermissionRequest.tsx`
- `src/components/permissions/FilePermissionDialog/FilePermissionDialog.tsx`
- `src/components/permissions/FilePermissionDialog/permissionOptions.tsx`
- `src/components/permissions/FileWritePermissionRequest/FileWritePermissionRequest.tsx`
- `src/components/permissions/NotebookEditPermissionRequest/NotebookEditPermissionRequest.tsx`
- `src/components/permissions/NotebookEditPermissionRequest/NotebookEditToolDiff.tsx`
- `src/components/permissions/SedEditPermissionRequest/SedEditPermissionRequest.tsx`
- `src/components/permissions/shellPermissionHelpers.tsx`
- `src/history.ts`
- `src/hooks/fileSuggestions.ts`
- `src/hooks/unifiedSuggestions.ts`
- `src/hooks/useDiffInIDE.ts`
- `src/hooks/useLspPluginRecommendation.tsx`
- `src/hooks/usePasteHandler.ts`
- `src/keybindings/loadUserBindings.ts`
- `src/main.tsx`
- `src/memdir/memdir.ts`
- `src/memdir/memoryScan.ts`
- `src/memdir/paths.ts`
- `src/memdir/teamMemPaths.ts`
- `src/native-ts/color-diff/index.ts`
- `src/outputStyles/loadOutputStylesDir.ts`
- `src/projectOnboardingState.ts`
- `src/screens/Doctor.tsx`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/screens/ResumeConversation.tsx`
- `src/services/MagicDocs/prompts.ts`
- `src/services/PromptSuggestion/speculation.ts`
- `src/services/SessionMemory/prompts.ts`
- `src/services/analytics/metadata.ts`
- `src/services/api/dumpPrompts.ts`
- `src/services/api/filesApi.ts`
- `src/services/api/promptCacheBreakDetection.ts`
- `src/services/autoDream/consolidationLock.ts`
- `src/services/extractMemories/extractMemories.ts`
- `src/services/lsp/LSPServerInstance.ts`
- `src/services/lsp/LSPServerManager.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/config.ts`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/services/mcp/utils.ts`
- `src/services/plugins/pluginOperations.ts`
- `src/services/remoteManagedSettings/syncCacheState.ts`
- `src/services/settingsSync/index.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/teamMemorySync/watcher.ts`
- `src/services/vcr.ts`
- `src/services/voiceKeyterms.ts`
- `src/shims/macro.ts`
- `src/skills/bundledSkills.ts`
- `src/skills/loadSkillsDir.ts`
- `src/tools/AgentTool/agentMemory.ts`
- `src/tools/AgentTool/agentMemorySnapshot.ts`
- `src/tools/AgentTool/loadAgentsDir.ts`
- `src/tools/BashTool/pathValidation.ts`
- `src/tools/BriefTool/upload.ts`
- `src/tools/FileEditTool/FileEditTool.ts`
- `src/tools/FileReadTool/FileReadTool.ts`
- `src/tools/FileWriteTool/FileWriteTool.ts`
- `src/tools/FileWriteTool/UI.tsx`
- `src/tools/LSPTool/LSPTool.ts`
- `src/tools/LSPTool/formatters.ts`
- `src/tools/NotebookEditTool/NotebookEditTool.ts`
- `src/tools/PowerShellTool/gitSafety.ts`
- `src/tools/PowerShellTool/pathValidation.ts`
- `src/tools/PowerShellTool/powershellPermissions.ts`
- `src/tools/SkillTool/SkillTool.ts`
- `src/upstreamproxy/upstreamproxy.ts`
- `src/utils/Shell.ts`
- `src/utils/appleTerminalBackup.ts`
- `src/utils/asciicast.ts`
- `src/utils/attachments.ts`
- `src/utils/autoUpdater.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/cachePaths.ts`
- `src/utils/claudeDesktop.ts`
- `src/utils/claudeInChrome/chromeNativeHost.ts`
- `src/utils/claudeInChrome/common.ts`
- `src/utils/claudeInChrome/setup.ts`
- `src/utils/claudeInChrome/setupPortable.ts`
- `src/utils/claudemd.ts`
- `src/utils/cleanup.ts`
- `src/utils/cliHighlight.ts`
- `src/utils/commitAttribution.ts`
- `src/utils/completionCache.ts`
- `src/utils/computerUse/computerUseLock.ts`
- `src/utils/computerUse/setup.ts`
- `src/utils/concurrentSessions.ts`
- `src/utils/config.ts`
- `src/utils/conversationRecovery.ts`
- `src/utils/cronTasks.ts`
- `src/utils/cronTasksLock.ts`
- `src/utils/crossProjectResume.ts`
- `src/utils/debug.ts`
- `src/utils/deepLink/banner.ts`
- `src/utils/deepLink/registerProtocol.ts`
- `src/utils/deepLink/terminalLauncher.ts`
- `src/utils/desktopDeepLink.ts`
- `src/utils/diagLogs.ts`
- `src/utils/doctorDiagnostic.ts`
- `src/utils/dxt/zip.ts`
- `src/utils/editor.ts`
- `src/utils/env.ts`
- `src/utils/envUtils.ts`
- `src/utils/errorLogSink.ts`
- `src/utils/file.ts`
- `src/utils/fileHistory.ts`
- `src/utils/filePersistence/filePersistence.ts`
- `src/utils/filePersistence/outputsScanner.ts`
- `src/utils/fileStateCache.ts`
- `src/utils/fsOperations.ts`
- `src/utils/generatedFiles.ts`
- `src/utils/getWorktreePaths.ts`
- `src/utils/git.ts`
- `src/utils/git/gitConfigParser.ts`
- `src/utils/git/gitFilesystem.ts`
- `src/utils/git/gitignore.ts`
- `src/utils/gitDiff.ts`
- `src/utils/glob.ts`
- `src/utils/heapDumpService.ts`
- `src/utils/hooks.ts`
- `src/utils/hooks/fileChangedWatcher.ts`
- `src/utils/hooks/hooksSettings.ts`
- `src/utils/hooks/skillImprovement.ts`
- `src/utils/iTermBackup.ts`
- `src/utils/ide.ts`
- `src/utils/imagePaste.ts`
- `src/utils/imageStore.ts`
- `src/utils/jetbrains.ts`
- `src/utils/listSessionsImpl.ts`
- `src/utils/localInstaller.ts`
- `src/utils/log.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/mcpOutputStorage.ts`
- `src/utils/memoryFileDetection.ts`
- `src/utils/model/modelCapabilities.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/nativeInstaller/installer.ts`
- `src/utils/nativeInstaller/pidLock.ts`
- `src/utils/pasteStore.ts`
- `src/utils/path.ts`
- `src/utils/pdf.ts`
- `src/utils/permissions/PermissionUpdate.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/pathValidation.ts`
- `src/utils/permissions/permissionSetup.ts`
- `src/utils/permissions/yoloClassifier.ts`
- `src/utils/plans.ts`
- `src/utils/plugins/addDirPluginSettings.ts`
- `src/utils/plugins/cacheUtils.ts`
- `src/utils/plugins/installCounts.ts`
- `src/utils/plugins/installedPluginsManager.ts`
- `src/utils/plugins/loadPluginAgents.ts`
- `src/utils/plugins/loadPluginCommands.ts`
- `src/utils/plugins/loadPluginOutputStyles.ts`
- `src/utils/plugins/lspPluginIntegration.ts`
- `src/utils/plugins/lspRecommendation.ts`
- `src/utils/plugins/marketplaceManager.ts`
- `src/utils/plugins/mcpPluginIntegration.ts`
- `src/utils/plugins/mcpbHandler.ts`
- `src/utils/plugins/officialMarketplaceGcs.ts`
- `src/utils/plugins/officialMarketplaceStartupCheck.ts`
- `src/utils/plugins/orphanedPluginFilter.ts`
- `src/utils/plugins/parseMarketplaceInput.ts`
- `src/utils/plugins/pluginDirectories.ts`
- `src/utils/plugins/pluginFlagging.ts`
- `src/utils/plugins/pluginInstallationHelpers.ts`
- `src/utils/plugins/pluginLoader.ts`
- `src/utils/plugins/pluginStartupCheck.ts`
- `src/utils/plugins/reconciler.ts`
- `src/utils/plugins/validatePlugin.ts`
- `src/utils/plugins/walkPluginMarkdown.ts`
- `src/utils/plugins/zipCache.ts`
- `src/utils/plugins/zipCacheAdapters.ts`
- `src/utils/releaseNotes.ts`
- `src/utils/ripgrep.ts`
- `src/utils/sandbox/sandbox-adapter.ts`
- `src/utils/screenshotClipboard.ts`
- `src/utils/secureStorage/plainTextStorage.ts`
- `src/utils/sessionEnvironment.ts`
- `src/utils/sessionRestore.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/sessionStoragePortable.ts`
- `src/utils/settings/changeDetector.ts`
- `src/utils/settings/managedPath.ts`
- `src/utils/settings/mdm/constants.ts`
- `src/utils/settings/mdm/settings.ts`
- `src/utils/settings/settings.ts`
- `src/utils/shell/bashProvider.ts`
- `src/utils/shell/powershellProvider.ts`
- `src/utils/shellConfig.ts`
- `src/utils/skills/skillChangeDetector.ts`
- `src/utils/startupProfiler.ts`
- `src/utils/stats.ts`
- `src/utils/statsCache.ts`
- `src/utils/statusNoticeDefinitions.tsx`
- `src/utils/suggestions/directoryCompletion.ts`
- `src/utils/swarm/permissionSync.ts`
- `src/utils/swarm/teamHelpers.ts`
- `src/utils/systemDirectories.ts`
- `src/utils/task/diskOutput.ts`
- `src/utils/tasks.ts`
- `src/utils/teammateMailbox.ts`
- `src/utils/telemetry/perfettoTracing.ts`
- `src/utils/telemetry/pluginTelemetry.ts`
- `src/utils/tempfile.ts`
- `src/utils/tmuxSocket.ts`
- `src/utils/toolResultStorage.ts`
- `src/utils/warningHandler.ts`
- `src/utils/windowsPaths.ts`
- `src/utils/worktree.ts`
- `src/utils/xdg.ts`

#### `node:perf_hooks` (1)

- `src/utils/profilerBase.ts`

#### `node:process` (4)

- `src/bootstrap/state.ts`
- `src/cli/handlers/mcp.tsx`
- `src/cli/handlers/util.tsx`
- `src/cli/print.ts`

#### `node:readline` (2)

- `src/bridge/bridgeMain.ts`
- `src/bridge/sessionRunner.ts`

#### `node:stream` (6)

- `src/cli/remoteIO.ts`
- `src/ink/root.ts`
- `src/ink/terminal.ts`
- `src/utils/ShellCommand.ts`
- `src/utils/heapDumpService.ts`
- `src/utils/staticRender.tsx`

#### `node:tls` (1)

- `src/utils/mtls.ts`

#### `node:tty` (1)

- `src/utils/renderOptions.ts`

#### `node:url` (18)

- `src/cli/remoteIO.ts`
- `src/cli/transports/transportUtils.ts`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/components/ClickableImageRef.tsx`
- `src/components/FilePathLink.tsx`
- `src/components/FullscreenLayout.tsx`
- `src/components/messages/UserImageMessage.tsx`
- `src/services/lsp/LSPServerInstance.ts`
- `src/services/lsp/LSPServerManager.ts`
- `src/services/lsp/passiveFeedback.ts`
- `src/services/mcp/auth.ts`
- `src/services/mcp/xaaIdpLogin.ts`
- `src/shims/macro.ts`
- `src/tools/LSPTool/LSPTool.ts`
- `src/utils/claudeInChrome/setup.ts`
- `src/utils/completionCache.ts`
- `src/utils/computerUse/setup.ts`
- `src/utils/ripgrep.ts`

#### `node:util` (7)

- `src/components/CustomSelect/use-multi-select-state.ts`
- `src/components/CustomSelect/use-select-navigation.ts`
- `src/ink/ink.tsx`
- `src/utils/claudeInChrome/mcpServer.ts`
- `src/utils/computerUse/hostAdapter.ts`
- `src/utils/fileHistory.ts`
- `src/utils/getWorktreePathsPortable.ts`

#### `node:v8` (1)

- `src/utils/heapDumpService.ts`

#### `node:zlib` (1)

- `src/utils/ansiToPng.ts`

### `bun:` (runtime Bun)

#### `bun:bundle` (196)

- `src/QueryEngine.ts`
- `src/bridge/bridgeEnabled.ts`
- `src/bridge/bridgeMain.ts`
- `src/bridge/initReplBridge.ts`
- `src/bridge/remoteBridgeCore.ts`
- `src/buddy/CompanionSprite.tsx`
- `src/buddy/prompt.ts`
- `src/buddy/useBuddyNotification.tsx`
- `src/cli/print.ts`
- `src/cli/structuredIO.ts`
- `src/commands.ts`
- `src/commands/branch/index.ts`
- `src/commands/bridge/bridge.tsx`
- `src/commands/bridge/index.ts`
- `src/commands/brief.ts`
- `src/commands/clear/caches.ts`
- `src/commands/clear/conversation.ts`
- `src/commands/compact/compact.ts`
- `src/commands/context/context-noninteractive.ts`
- `src/commands/context/context.tsx`
- `src/commands/exit/exit.tsx`
- `src/commands/init.ts`
- `src/commands/login/login.tsx`
- `src/commands/reload-plugins/reload-plugins.ts`
- `src/components/ContextVisualization.tsx`
- `src/components/LogoV2/LogoV2.tsx`
- `src/components/LogoV2/VoiceModeNotice.tsx`
- `src/components/Message.tsx`
- `src/components/Messages.tsx`
- `src/components/PromptInput/Notifications.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/PromptInput/PromptInputFooter.tsx`
- `src/components/PromptInput/PromptInputFooterLeftSide.tsx`
- `src/components/PromptInput/PromptInputHelpMenu.tsx`
- `src/components/PromptInput/PromptInputQueuedCommands.tsx`
- `src/components/PromptInput/VoiceIndicator.tsx`
- `src/components/PromptInput/usePromptInputPlaceholder.ts`
- `src/components/Settings/Config.tsx`
- `src/components/Spinner.tsx`
- `src/components/Stats.tsx`
- `src/components/StatusLine.tsx`
- `src/components/TextInput.tsx`
- `src/components/ThemePicker.tsx`
- `src/components/TokenWarning.tsx`
- `src/components/design-system/ThemeProvider.tsx`
- `src/components/memory/MemoryFileSelector.tsx`
- `src/components/messages/AttachmentMessage.tsx`
- `src/components/messages/CollapsedReadSearchContent.tsx`
- `src/components/messages/SystemTextMessage.tsx`
- `src/components/messages/UserPromptMessage.tsx`
- `src/components/messages/UserTextMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolErrorMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolSuccessMessage.tsx`
- `src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/permissions/PermissionDecisionDebugInfo.tsx`
- `src/components/permissions/PermissionRequest.tsx`
- `src/components/permissions/PermissionRuleExplanation.tsx`
- `src/components/permissions/hooks.ts`
- `src/components/tasks/BackgroundTasksDialog.tsx`
- `src/constants/betas.ts`
- `src/constants/prompts.ts`
- `src/constants/system.ts`
- `src/constants/tools.ts`
- `src/context.ts`
- `src/coordinator/coordinatorMode.ts`
- `src/entrypoints/cli.tsx`
- `src/hooks/notifs/useAutoModeUnavailableNotification.ts`
- `src/hooks/toolPermission/PermissionContext.ts`
- `src/hooks/toolPermission/handlers/coordinatorHandler.ts`
- `src/hooks/toolPermission/handlers/interactiveHandler.ts`
- `src/hooks/toolPermission/handlers/swarmWorkerHandler.ts`
- `src/hooks/toolPermission/permissionLogging.ts`
- `src/hooks/useAwaySummary.ts`
- `src/hooks/useCanUseTool.tsx`
- `src/hooks/useGlobalKeybindings.tsx`
- `src/hooks/useHistorySearch.ts`
- `src/hooks/useReplBridge.tsx`
- `src/hooks/useVoiceIntegration.tsx`
- `src/interactiveHelpers.tsx`
- `src/keybindings/defaultBindings.ts`
- `src/main.tsx`
- `src/memdir/findRelevantMemories.ts`
- `src/memdir/memdir.ts`
- `src/migrations/resetAutoModeOptInForDefaultOffer.ts`
- `src/query.ts`
- `src/query/stopHooks.ts`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/screens/ResumeConversation.tsx`
- `src/services/analytics/metadata.ts`
- `src/services/api/claude.ts`
- `src/services/api/logging.ts`
- `src/services/api/withRetry.ts`
- `src/services/compact/autoCompact.ts`
- `src/services/compact/compact.ts`
- `src/services/compact/microCompact.ts`
- `src/services/compact/postCompactCleanup.ts`
- `src/services/compact/prompt.ts`
- `src/services/extractMemories/extractMemories.ts`
- `src/services/extractMemories/prompts.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/config.ts`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/services/settingsSync/index.ts`
- `src/services/teamMemorySync/teamMemSecretGuard.ts`
- `src/services/teamMemorySync/watcher.ts`
- `src/services/tools/toolExecution.ts`
- `src/setup.ts`
- `src/skills/bundled/index.ts`
- `src/state/AppState.tsx`
- `src/tasks.ts`
- `src/tasks/LocalShellTask/LocalShellTask.tsx`
- `src/tools.ts`
- `src/tools/AgentTool/AgentTool.tsx`
- `src/tools/AgentTool/agentToolUtils.ts`
- `src/tools/AgentTool/builtInAgents.ts`
- `src/tools/AgentTool/forkSubagent.ts`
- `src/tools/AgentTool/loadAgentsDir.ts`
- `src/tools/AgentTool/runAgent.ts`
- `src/tools/AskUserQuestionTool/AskUserQuestionTool.tsx`
- `src/tools/BashTool/BashTool.tsx`
- `src/tools/BashTool/bashPermissions.ts`
- `src/tools/BashTool/prompt.ts`
- `src/tools/BriefTool/BriefTool.ts`
- `src/tools/BriefTool/attachments.ts`
- `src/tools/BriefTool/upload.ts`
- `src/tools/ConfigTool/ConfigTool.ts`
- `src/tools/ConfigTool/prompt.ts`
- `src/tools/ConfigTool/supportedSettings.ts`
- `src/tools/EnterPlanModeTool/EnterPlanModeTool.ts`
- `src/tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts`
- `src/tools/MCPTool/UI.tsx`
- `src/tools/NotebookEditTool/NotebookEditTool.ts`
- `src/tools/PowerShellTool/PowerShellTool.tsx`
- `src/tools/ScheduleCronTool/prompt.ts`
- `src/tools/SendMessageTool/SendMessageTool.ts`
- `src/tools/SendMessageTool/prompt.ts`
- `src/tools/SkillTool/SkillTool.ts`
- `src/tools/TaskUpdateTool/TaskUpdateTool.ts`
- `src/tools/TodoWriteTool/TodoWriteTool.ts`
- `src/tools/ToolSearchTool/prompt.ts`
- `src/types/permissions.ts`
- `src/utils/analyzeContext.ts`
- `src/utils/attachments.ts`
- `src/utils/attribution.ts`
- `src/utils/autoModeDenials.ts`
- `src/utils/backgroundHousekeeping.ts`
- `src/utils/bash/parser.ts`
- `src/utils/betas.ts`
- `src/utils/classifierApprovals.ts`
- `src/utils/claudemd.ts`
- `src/utils/collapseReadSearch.ts`
- `src/utils/concurrentSessions.ts`
- `src/utils/config.ts`
- `src/utils/conversationRecovery.ts`
- `src/utils/envDynamic.ts`
- `src/utils/filePersistence/filePersistence.ts`
- `src/utils/hooks/skillImprovement.ts`
- `src/utils/imagePaste.ts`
- `src/utils/log.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/memory/types.ts`
- `src/utils/memoryFileDetection.ts`
- `src/utils/messageQueueManager.ts`
- `src/utils/messages.ts`
- `src/utils/messages/systemInit.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/permissions/PermissionMode.ts`
- `src/utils/permissions/bypassPermissionsKillswitch.ts`
- `src/utils/permissions/classifierDecision.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/getNextPermissionMode.ts`
- `src/utils/permissions/permissionRuleParser.ts`
- `src/utils/permissions/permissionSetup.ts`
- `src/utils/permissions/permissions.ts`
- `src/utils/permissions/yoloClassifier.ts`
- `src/utils/processUserInput/processSlashCommand.tsx`
- `src/utils/processUserInput/processUserInput.ts`
- `src/utils/sessionFileAccessHooks.ts`
- `src/utils/sessionRestore.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/settings/settings.ts`
- `src/utils/settings/types.ts`
- `src/utils/shell/bashProvider.ts`
- `src/utils/slowOperations.ts`
- `src/utils/stats.ts`
- `src/utils/statsCache.ts`
- `src/utils/swarm/inProcessRunner.ts`
- `src/utils/systemPrompt.ts`
- `src/utils/telemetry/perfettoTracing.ts`
- `src/utils/telemetry/sessionTracing.ts`
- `src/utils/thinking.ts`
- `src/utils/toolPool.ts`
- `src/utils/worktree.ts`
- `src/voice/voiceModeEnabled.ts`

#### `bun:ffi` (1)

- `src/upstreamproxy/upstreamproxy.ts`

### Alias `src/...` (chemins TypeScript / résolution projet)

Fichiers contenant au moins un `from 'src/...'` ou `import('src/...')` :

- `src/QueryEngine.ts`
- `src/bootstrap/state.ts`
- `src/bridge/replBridgeTransport.ts`
- `src/cli/print.ts`
- `src/cli/remoteIO.ts`
- `src/cli/structuredIO.ts`
- `src/cli/transports/HybridTransport.ts`
- `src/cli/transports/SSETransport.ts`
- `src/cli/transports/Transport.ts`
- `src/cli/transports/WebSocketTransport.ts`
- `src/cli/transports/ccrClient.ts`
- `src/cli/update.ts`
- `src/commands/compact/compact.ts`
- `src/commands/ide/ide.tsx`
- `src/commands/install-github-app/ExistingWorkflowStep.tsx`
- `src/commands/install-github-app/OAuthFlowStep.tsx`
- `src/commands/install-github-app/install-github-app.tsx`
- `src/commands/install-github-app/setupGitHubActions.ts`
- `src/commands/install.tsx`
- `src/commands/plugin/AddMarketplace.tsx`
- `src/commands/plugin/ManageMarketplaces.tsx`
- `src/commands/terminalSetup/terminalSetup.tsx`
- `src/components/AutoModeOptInDialog.tsx`
- `src/components/AutoUpdater.tsx`
- `src/components/BypassPermissionsModeDialog.tsx`
- `src/components/ClaudeInChromeOnboarding.tsx`
- `src/components/ClaudeMdExternalIncludesDialog.tsx`
- `src/components/ConsoleOAuthFlow.tsx`
- `src/components/FallbackToolUseErrorMessage.tsx`
- `src/components/Feedback.tsx`
- `src/components/FeedbackSurvey/FeedbackSurvey.tsx`
- `src/components/FeedbackSurvey/useFeedbackSurvey.tsx`
- `src/components/FeedbackSurvey/useMemorySurvey.tsx`
- `src/components/FeedbackSurvey/usePostCompactSurvey.tsx`
- `src/components/FileEditToolUseRejectedMessage.tsx`
- `src/components/HelpV2/HelpV2.tsx`
- `src/components/IdeOnboardingDialog.tsx`
- `src/components/LogoV2/EmergencyTip.tsx`
- `src/components/LogoV2/LogoV2.tsx`
- `src/components/LogoV2/WelcomeV2.tsx`
- `src/components/MCPServerApprovalDialog.tsx`
- `src/components/MCPServerDesktopImportDialog.tsx`
- `src/components/MCPServerMultiselectDialog.tsx`
- `src/components/MessageSelector.tsx`
- `src/components/Messages.tsx`
- `src/components/ModelPicker.tsx`
- `src/components/NativeAutoUpdater.tsx`
- `src/components/NotebookEditToolUseRejectedMessage.tsx`
- `src/components/Onboarding.tsx`
- `src/components/PromptInput/Notifications.tsx`
- `src/components/PromptInput/PromptInput.tsx`
- `src/components/PromptInput/PromptInputFooterLeftSide.tsx`
- `src/components/PromptInput/PromptInputHelpMenu.tsx`
- `src/components/PromptInput/PromptInputModeIndicator.tsx`
- `src/components/PromptInput/PromptInputQueuedCommands.tsx`
- `src/components/PromptInput/PromptInputStashNotice.tsx`
- `src/components/PromptInput/inputModes.ts`
- `src/components/PromptInput/inputPaste.ts`
- `src/components/PromptInput/useMaybeTruncateInput.ts`
- `src/components/PromptInput/usePromptInputPlaceholder.ts`
- `src/components/ResumeTask.tsx`
- `src/components/SandboxViolationExpandedView.tsx`
- `src/components/Settings/Config.tsx`
- `src/components/Settings/Usage.tsx`
- `src/components/Spinner.tsx`
- `src/components/StatusLine.tsx`
- `src/components/StructuredDiff/Fallback.tsx`
- `src/components/TeleportError.tsx`
- `src/components/TeleportResumeWrapper.tsx`
- `src/components/ThinkingToggle.tsx`
- `src/components/TrustDialog/TrustDialog.tsx`
- `src/components/TrustDialog/utils.ts`
- `src/components/WorktreeExitDialog.tsx`
- `src/components/agents/AgentEditor.tsx`
- `src/components/agents/AgentsList.tsx`
- `src/components/agents/ToolSelector.tsx`
- `src/components/agents/agentFileUtils.ts`
- `src/components/agents/generateAgent.ts`
- `src/components/agents/new-agent-creation/wizard-steps/ConfirmStepWrapper.tsx`
- `src/components/agents/types.ts`
- `src/components/agents/utils.ts`
- `src/components/grove/Grove.tsx`
- `src/components/hooks/HooksConfigMenu.tsx`
- `src/components/hooks/SelectEventMode.tsx`
- `src/components/hooks/SelectHookMode.tsx`
- `src/components/hooks/SelectMatcherMode.tsx`
- `src/components/mcp/MCPRemoteServerMenu.tsx`
- `src/components/mcp/McpParsingWarnings.tsx`
- `src/components/messages/AssistantTextMessage.tsx`
- `src/components/messages/AssistantToolUseMessage.tsx`
- `src/components/messages/AttachmentMessage.tsx`
- `src/components/messages/HookProgressMessage.tsx`
- `src/components/messages/RateLimitMessage.tsx`
- `src/components/messages/SystemAPIErrorMessage.tsx`
- `src/components/messages/UserToolResultMessage/RejectedPlanMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolCanceledMessage.tsx`
- `src/components/messages/UserToolResultMessage/UserToolSuccessMessage.tsx`
- `src/components/messages/nullRenderingAttachments.ts`
- `src/components/permissions/ExitPlanModePermissionRequest/ExitPlanModePermissionRequest.tsx`
- `src/components/permissions/FileEditPermissionRequest/FileEditPermissionRequest.tsx`
- `src/components/permissions/FilePermissionDialog/useFilePermissionDialog.ts`
- `src/components/permissions/PermissionRequest.tsx`
- `src/components/permissions/SandboxPermissionRequest.tsx`
- `src/components/permissions/SedEditPermissionRequest/SedEditPermissionRequest.tsx`
- `src/components/permissions/SkillPermissionRequest/SkillPermissionRequest.tsx`
- `src/components/permissions/hooks.ts`
- `src/components/permissions/rules/PermissionRuleList.tsx`
- `src/components/tasks/AsyncAgentDetailDialog.tsx`
- `src/components/tasks/BackgroundTask.tsx`
- `src/components/tasks/BackgroundTaskStatus.tsx`
- `src/components/tasks/BackgroundTasksDialog.tsx`
- `src/components/tasks/DreamDetailDialog.tsx`
- `src/components/tasks/InProcessTeammateDetailDialog.tsx`
- `src/components/tasks/RemoteSessionDetailDialog.tsx`
- `src/components/tasks/RemoteSessionProgress.tsx`
- `src/components/tasks/ShellDetailDialog.tsx`
- `src/components/tasks/ShellProgress.tsx`
- `src/components/tasks/taskStatusUtils.tsx`
- `src/constants/oauth.ts`
- `src/constants/prompts.ts`
- `src/context/notifications.tsx`
- `src/entrypoints/init.ts`
- `src/entrypoints/mcp.ts`
- `src/hooks/fileSuggestions.ts`
- `src/hooks/notifs/useAutoModeUnavailableNotification.ts`
- `src/hooks/notifs/useCanSwitchToExistingSubscription.tsx`
- `src/hooks/notifs/useDeprecationWarningNotification.tsx`
- `src/hooks/notifs/useFastModeNotification.tsx`
- `src/hooks/notifs/useIDEStatusIndicator.tsx`
- `src/hooks/notifs/useInstallMessages.tsx`
- `src/hooks/notifs/useMcpConnectivityStatus.tsx`
- `src/hooks/notifs/useModelMigrationNotifications.tsx`
- `src/hooks/notifs/useNpmDeprecationNotification.tsx`
- `src/hooks/notifs/useRateLimitWarningNotification.tsx`
- `src/hooks/notifs/useSettingsErrors.tsx`
- `src/hooks/toolPermission/PermissionContext.ts`
- `src/hooks/toolPermission/handlers/interactiveHandler.ts`
- `src/hooks/toolPermission/permissionLogging.ts`
- `src/hooks/unifiedSuggestions.ts`
- `src/hooks/useArrowKeyHistory.tsx`
- `src/hooks/useCancelRequest.ts`
- `src/hooks/useDiffInIDE.ts`
- `src/hooks/useIdeAtMentioned.ts`
- `src/hooks/useIdeLogging.ts`
- `src/hooks/useIdeSelection.ts`
- `src/hooks/usePasteHandler.ts`
- `src/hooks/useTeleportResume.tsx`
- `src/hooks/useTerminalSize.ts`
- `src/hooks/useTextInput.ts`
- `src/hooks/useTypeahead.tsx`
- `src/ink/ink.tsx`
- `src/ink/layout/yoga.ts`
- `src/ink/reconciler.ts`
- `src/ink/renderer.ts`
- `src/ink/root.ts`
- `src/interactiveHelpers.tsx`
- `src/keybindings/defaultBindings.ts`
- `src/main.tsx`
- `src/migrations/migrateAutoUpdatesToSettings.ts`
- `src/migrations/migrateBypassPermissionsAcceptedToSettings.ts`
- `src/migrations/migrateEnableAllProjectMcpServersToSettings.ts`
- `src/migrations/resetAutoModeOptInForDefaultOffer.ts`
- `src/migrations/resetProToOpusDefault.ts`
- `src/query.ts`
- `src/schemas/hooks.ts`
- `src/screens/Doctor.tsx`
- `src/screens/REPL.tsx`
- `src/screens/REPLBody.tsx`
- `src/screens/ResumeConversation.tsx`
- `src/services/api/claude.ts`
- `src/services/api/client.ts`
- `src/services/api/dumpPrompts.ts`
- `src/services/api/errors.ts`
- `src/services/api/grove.ts`
- `src/services/api/llmClient.ts`
- `src/services/api/logging.ts`
- `src/services/api/promptCacheBreakDetection.ts`
- `src/services/api/withRetry.ts`
- `src/services/compact/apiMicrocompact.ts`
- `src/services/compact/autoCompact.ts`
- `src/services/compact/compact.ts`
- `src/services/diagnosticTracking.ts`
- `src/services/mcp/claudeai.ts`
- `src/services/mcp/client.ts`
- `src/services/mcp/config.ts`
- `src/services/mcp/useManageMCPConnections.ts`
- `src/services/mcp/vscodeSdkMcp.ts`
- `src/services/oauth/auth-code-listener.ts`
- `src/services/oauth/client.ts`
- `src/services/oauth/getOauthProfile.ts`
- `src/services/oauth/index.ts`
- `src/services/tips/tipRegistry.ts`
- `src/services/tokenEstimation.ts`
- `src/services/tools/StreamingToolExecutor.ts`
- `src/services/tools/toolExecution.ts`
- `src/services/tools/toolHooks.ts`
- `src/services/vcr.ts`
- `src/setup.ts`
- `src/skills/bundled/debug.ts`
- `src/skills/bundled/index.ts`
- `src/state/AppStateStore.ts`
- `src/tools/AgentTool/AgentTool.tsx`
- `src/tools/AgentTool/UI.tsx`
- `src/tools/AgentTool/built-in/claudeCodeGuideAgent.ts`
- `src/tools/AgentTool/built-in/exploreAgent.ts`
- `src/tools/AgentTool/built-in/planAgent.ts`
- `src/tools/AgentTool/built-in/verificationAgent.ts`
- `src/tools/AgentTool/loadAgentsDir.ts`
- `src/tools/AgentTool/runAgent.ts`
- `src/tools/AskUserQuestionTool/AskUserQuestionTool.tsx`
- `src/tools/BashTool/BashTool.tsx`
- `src/tools/BashTool/BashToolResultMessage.tsx`
- `src/tools/BashTool/bashSecurity.ts`
- `src/tools/BashTool/shouldUseSandbox.ts`
- `src/tools/BashTool/utils.ts`
- `src/tools/EnterPlanModeTool/UI.tsx`
- `src/tools/ExitPlanModeTool/UI.tsx`
- `src/tools/FileEditTool/FileEditTool.ts`
- `src/tools/FileEditTool/UI.tsx`
- `src/tools/FileEditTool/utils.ts`
- `src/tools/FileReadTool/UI.tsx`
- `src/tools/FileReadTool/limits.ts`
- `src/tools/FileWriteTool/FileWriteTool.ts`
- `src/tools/FileWriteTool/UI.tsx`
- `src/tools/GlobTool/UI.tsx`
- `src/tools/NotebookEditTool/NotebookEditTool.ts`
- `src/tools/NotebookEditTool/UI.tsx`
- `src/tools/PowerShellTool/PowerShellTool.tsx`
- `src/tools/SkillTool/SkillTool.ts`
- `src/tools/SkillTool/UI.tsx`
- `src/tools/SkillTool/prompt.ts`
- `src/tools/WebSearchTool/WebSearchTool.ts`
- `src/tools/WebSearchTool/prompt.ts`
- `src/tools/utils.ts`
- `src/types/hooks.ts`
- `src/types/logs.ts`
- `src/utils/Shell.ts`
- `src/utils/analyzeContext.ts`
- `src/utils/api.ts`
- `src/utils/attachments.ts`
- `src/utils/authPortable.ts`
- `src/utils/autoUpdater.ts`
- `src/utils/background/remote/preconditions.ts`
- `src/utils/background/remote/remoteSession.ts`
- `src/utils/bash/ShellSnapshot.ts`
- `src/utils/bash/shellCompletion.ts`
- `src/utils/betas.ts`
- `src/utils/claudemd.ts`
- `src/utils/conversationRecovery.ts`
- `src/utils/debug.ts`
- `src/utils/deepLink/registerProtocol.ts`
- `src/utils/diff.ts`
- `src/utils/effort.ts`
- `src/utils/fastMode.ts`
- `src/utils/file.ts`
- `src/utils/fileHistory.ts`
- `src/utils/fileOperationAnalytics.ts`
- `src/utils/gracefulShutdown.ts`
- `src/utils/handlePromptSubmit.ts`
- `src/utils/hooks.ts`
- `src/utils/hooks/AsyncHookRegistry.ts`
- `src/utils/hooks/execAgentHook.ts`
- `src/utils/hooks/execHttpHook.ts`
- `src/utils/hooks/execPromptHook.ts`
- `src/utils/hooks/hookEvents.ts`
- `src/utils/hooks/hooksConfigManager.ts`
- `src/utils/hooks/hooksSettings.ts`
- `src/utils/hooks/registerFrontmatterHooks.ts`
- `src/utils/hooks/registerSkillHooks.ts`
- `src/utils/hooks/sessionHooks.ts`
- `src/utils/ide.ts`
- `src/utils/log.ts`
- `src/utils/markdownConfigLoader.ts`
- `src/utils/messageQueueManager.ts`
- `src/utils/messages.ts`
- `src/utils/messages/mappers.ts`
- `src/utils/messages/systemInit.ts`
- `src/utils/model/antModels.ts`
- `src/utils/model/check1mAccess.ts`
- `src/utils/model/modelStrings.ts`
- `src/utils/modelCost.ts`
- `src/utils/nativeInstaller/download.ts`
- `src/utils/nativeInstaller/installer.ts`
- `src/utils/permissions/PermissionPromptToolResultSchema.ts`
- `src/utils/permissions/bypassPermissionsKillswitch.ts`
- `src/utils/permissions/filesystem.ts`
- `src/utils/permissions/permissionSetup.ts`
- `src/utils/plans.ts`
- `src/utils/plugins/loadPluginHooks.ts`
- `src/utils/preflightChecks.tsx`
- `src/utils/processUserInput/processBashCommand.tsx`
- `src/utils/processUserInput/processSlashCommand.tsx`
- `src/utils/processUserInput/processTextPrompt.ts`
- `src/utils/processUserInput/processUserInput.ts`
- `src/utils/promptCategory.ts`
- `src/utils/queryHelpers.ts`
- `src/utils/ripgrep.ts`
- `src/utils/sandbox/sandbox-adapter.ts`
- `src/utils/secureStorage/macOsKeychainHelpers.ts`
- `src/utils/sessionStorage.ts`
- `src/utils/settings/validateEditTool.ts`
- `src/utils/settings/validation.ts`
- `src/utils/startupProfiler.ts`
- `src/utils/stats.ts`
- `src/utils/streamlinedTransform.ts`
- `src/utils/suggestions/directoryCompletion.ts`
- `src/utils/telemetry/events.ts`
- `src/utils/telemetryAttributes.ts`
- `src/utils/teleport.tsx`
- `src/utils/teleport/api.ts`
- `src/utils/teleport/environments.ts`
- `src/utils/teleport/gitBundle.ts`
- `src/utils/unaryLogging.ts`
- `src/utils/uuid.ts`
- `src/utils/warningHandler.ts`


## 5. Points d'entrée et orchestration

| Fichier | Rôle |
|---------|------|
| `package.json` → `bin.drox` | Exécutable `drox` |
| `src/entrypoints/cli.tsx` | Bootstrap : chemins rapides (`--version`, flags spéciaux), puis import dynamique de `main.tsx` |
| `src/main.tsx` | Définition Commander (`program`), options globales, sous-commandes, action par défaut (session interactive / print) |
| `src/commands.ts` | Registre des **commandes slash** REPL (`/` dans le TUI) via `getCommands()` / `COMMANDS` |

## 6. Chemins rapides (`cli.tsx`, avant `main.tsx`)

Ces branches évitent de charger tout le graphe de modules ; elles dépendent des feature flags `bun:bundle`.

| Condition (résumé) | Comportement |
|---------------------|--------------|
| `--version` / `-v` / `-V` | Affiche la version (aucun autre import) |
| `--dump-system-prompt` (flag build) | Prompt système puis sortie |
| `argv[2] === '--claude-in-chrome-mcp'` | Serveur MCP Chrome |
| `argv[2] === '--chrome-native-host'` | Hôte natif Chrome |
| `--computer-use-mcp` (flag) | Serveur MCP computer-use |
| `--daemon-worker <kind>` | Worker daemon |
| `remote-control` / `rc` / `remote` / `sync` / `bridge` (flag) | `bridgeMain` |
| `daemon` (flag) | `daemonMain` |
| `ps` / `logs` / `attach` / `kill` / `--bg` (flag) | Sessions arrière-plan (`cli/bg.js`) |
| `new` / `list` / `reply` (flag templates) | Jobs modèles |
| `environment-runner` (flag) | BYOC runner |
| `self-hosted-runner` (flag) | Runner self-hosted |
| `--tmux` + `--worktree` | Exécution tmux worktree |

## 7. Sous-commandes Commander (`main.tsx` → `program`)

Commande racine : `program.name(CLI_PROGRAM_NAME)` — session interactive par défaut ; argument optionnel `[prompt]`.

### Arborescence (sous-commandes déclarées)

- **(défaut)** — action principale : REPL / `--print` selon options.
- `mcp` → `serve`, `remove <name>`, `list`, `get <name>`, `add-json <name> <json>`, `add-from-claude-desktop`, `reset-project-choices`
- `server` (feature `DIRECT_CONNECT`) — serveur de sessions HTTP/socket.
- `ssh <host> [dir]` — SSH distant.
- `open <cc-url>` — client cc:// (interne).
- `auth` → `login`, `status`, `logout`
- `plugin` (alias `plugins`) → `validate`, `list`, `marketplace` (`add`, `list`, `remove`, `update`), `install`, `uninstall`, `enable`, `disable`, `update`
- `setup-token`
- `agents`
- `auto-mode` (flag) → `defaults`, `config`, `critique`
- `remote-control` (alias `rc`, feature, souvent masqué) — enregistré pour l’aide ; exécution réelle via `cli.tsx`.
- `assistant [sessionId]` (feature `KAIROS`)
- `doctor`
- `update` (alias `upgrade`)
- `up`, `rollback`, `log`, `error`, `export`, `task`… — blocs `[ANT-ONLY]` / `"external" === 'ant'` (souvent absents des builds externes).
- `install [target]` — installation binaire native.
- `completion <shell>` (masqué, ant-only selon bloc).

## 8. Commandes slash REPL (`/` dans le TUI)

### 8.1 Noms et alias utilisables (runtime — `builtInCommandNames()`)

Ensemble **trié** des chaînes reconnues comme commande slash : `command.name` et chaque entrée de `command.aliases` (`src/commands.ts`, même logique que l’autocomplétion). Généré en exécutant `bun -e "import { builtInCommandNames } from './src/commands.ts'…"` avec `NODE_ENV=test` et `ANTHROPIC_API_KEY` factice (requis car `login()` est évalué à l’construction du tableau).

**Note :** les commandes derrière `feature('…')` absentes du bundle actuel (`bun:bundle`) ne figurent pas. Les skills répertoires / plugins / MCP ajoutent d’autres `/` à l’exécution.

> **Échec** de l’extraction via Bun — installer Bun ou lancer depuis la racine du dépôt. Détail :
>
> ```text
> error: Cannot find module '../global.d.ts' from 'C:\Users\coren\Desktop\GitHub\claude-code-leak-packaged\src\ink\components\Box.tsx'
> 
> Bun v1.3.11 (Windows x64)
> ```

### 8.2 Identifiants du tableau `COMMANDS` (analyse statique de `commands.ts`)

Symboles listés dans `const COMMANDS = memoize((): Command[] => [` … `])` (noms de variables TypeScript, pas forcément égaux au `name:` du `Command`). Les entrées conditionnelles (`…(webCmd ? [webCmd] : [])`, etc.) n’apparaissent que si la ligne est un identifiant simple.

- `addDir`
- `advisor`
- `agents`
- `branch`
- `btw`
- `chrome`
- `clear`
- `color`
- `compact`
- `config`
- `copy`
- `desktop`
- `context`
- `contextNonInteractive`
- `cost`
- `diff`
- `doctor`
- `effort`
- `exit`
- `fast`
- `files`
- `heapDump`
- `help`
- `ide`
- `init`
- `keybindings`
- `installGitHubApp`
- `installSlackApp`
- `mcp`
- `memory`
- `mobile`
- `model`
- `outputStyle`
- `remoteEnv`
- `plugin`
- `pr_comments`
- `releaseNotes`
- `reloadPlugins`
- `rename`
- `resume`
- `session`
- `skills`
- `stats`
- `status`
- `statusline`
- `stickers`
- `tag`
- `theme`
- `feedback`
- `review`
- `ultrareview`
- `rewind`
- `securityReview`
- `terminalSetup`
- `upgrade`
- `extraUsage`
- `extraUsageNonInteractive`
- `rateLimitOptions`
- `usage`
- `usageReport`
- `vim`
- `x402`
- `thinkback`
- `thinkbackPlay`
- `permissions`
- `plan`
- `privacySettings`
- `hooks`
- `exportCommand`
- `sandboxToggle`
- `passes`
- `tasks`

## 9. Routes HTTP web

Le front web / serveur PTY web est retiré du périmètre du fork terminal-only.

## 10. Fonctions d’entrée notables (références)

| Symbole | Fichier |
|---------|---------|
| `main()` (async, charge `main.tsx`) | `src/entrypoints/cli.tsx` |
| `run()` (parse Commander) | `src/main.tsx` |
| `getCommands()` | `src/commands.ts` |
| `bridgeMain` | `src/bridge/bridgeMain.ts` (via dynamic import) |
| `startServer` / session HTTP | `src/server/server.ts` (via `mcp serve` / `server`) |

