# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release
- ChatGPT-like interface
- Dark theme support
- Multi-language support (5 languages)
- Real-time message streaming
- Markdown rendering with syntax highlighting
- Model management
- Conversation history
- Responsive design
- Accessibility features
- Copy code functionality
- Suggested prompts
- Privacy-focused design

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [1.0.0] - 2025-01-XX

### Added
- 🎨 **Modern UI/UX**
  - ChatGPT-like design with dark theme
  - Responsive layout for desktop and mobile
  - Smooth animations and transitions
  - High contrast color scheme
  - Accessibility compliance (WCAG 2.1 AA)

- 📘 **LMWebUI Branding**
  - **LM**: Language Model
  - **Web UI**: Web-based User Interface
  - Clear project identity and purpose
  - Professional branding and documentation

- 🌍 **Internationalization**
  - 5 language support (EN, TR, ES, FR, DE)
  - JSON-based translation system
  - Language persistence
  - RTL support ready

- 🔒 **Privacy & Security**
  - 100% local operation
  - No telemetry or tracking
  - Direct Ollama connection
  - Local storage only

- ⚡ **Advanced Features**
  - Real-time message streaming
  - Markdown support with code highlighting
  - Model management and switching
  - Conversation history
  - Copy code functionality
  - Suggested prompts
  - Typing indicators

- 🛠️ **Technical Stack**
  - React 18 + TypeScript
  - Tailwind CSS for styling
  - Zustand for state management
  - Vite for building
  - Ollama API integration
  - react-i18next for translations

### Technical Details
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **AI Integration**: Ollama API
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Markdown**: react-markdown + rehype-highlight
- **i18n**: react-i18next

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### System Requirements
- Node.js 18+
- Ollama installed and running
- Modern web browser

---

## Release Notes

### Version 1.0.0
This is the initial release of LMWebUI, providing a modern, privacy-focused interface for local Ollama models.

**Key Features:**
- Modern ChatGPT-like interface
- Complete privacy (no data leaves your device)
- Multi-language support
- Real-time streaming
- Mobile responsive
- Accessibility compliant

**Getting Started:**
1. Install Ollama and pull a model
2. Clone this repository
3. Run `npm install && npm run dev`
4. Open http://localhost:3000

**Contributing:**
We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

## How to Read This Changelog

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

## Links

- [Unreleased]: https://github.com/ismailcankaratas/LMWebUI/compare/v1.0.0...HEAD
- [1.0.0]: https://github.com/ismailcankaratas/LMWebUI/releases/tag/v1.0.0
