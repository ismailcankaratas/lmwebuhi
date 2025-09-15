# Contributing to LMWebUI

Thank you for your interest in contributing to LMWebUI! 🎉

This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**
- **Ollama** (for testing)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
git clone https://github.com/YOUR_USERNAME/LMWebUI.git
cd LMWebUI
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/LMWebUI.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

5. **Start Ollama**
   ```bash
   ollama serve
   ```

6. **Install a test model**
   ```bash
   ollama pull llama2
   ```

7. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📝 Contributing Guidelines

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🌍 **Translations**
- ⚡ **Performance optimizations**
- 🧪 **Tests**

### Before You Start

1. **Check existing issues** - Look for similar issues or PRs
2. **Discuss major changes** - Open an issue for discussion
3. **Follow the roadmap** - Check our planned features

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests if applicable
- Update documentation

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Build the project
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
```

**Commit Message Format:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template and include:

- **Description** - Clear description of the bug
- **Steps to Reproduce** - Detailed steps
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Screenshots** - If applicable
- **Environment** - OS, browser, Node.js version
- **Additional Context** - Any other relevant information

### Feature Requests

Use the feature request template and include:

- **Problem Description** - What problem does this solve?
- **Proposed Solution** - How should it work?
- **Alternatives** - Other solutions considered
- **Additional Context** - Screenshots, mockups, etc.

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type
- Use strict mode

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries

### Styling

- Use Tailwind CSS classes
- Follow the design system
- Ensure responsive design
- Maintain accessibility standards

### Code Style

```typescript
// ✅ Good
const handleClick = (event: React.MouseEvent) => {
  // Handle click
}

// ❌ Bad
const handleClick = (e) => {
  // Handle click
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

## 🧪 Testing

### Writing Tests

- Write unit tests for utilities
- Write integration tests for components
- Test user interactions
- Test error scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex logic
- Keep README updated
- Update API documentation

### Translation Guidelines

1. **Add new language files** in `src/i18n/locales/`
2. **Follow existing structure**
3. **Test all UI elements**
4. **Check for missing translations**

## 🎨 Design Guidelines

### UI Components

- Follow the design system
- Use consistent spacing
- Maintain color contrast
- Ensure mobile responsiveness

### Accessibility

- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## 🚀 Release Process

### Version Numbers

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared

## 💬 Getting Help

- 💬 **Discord**: [Join our community](https://discord.gg/LMWebUI)
- 📧 **Email**: contributors@LMWebUI.dev
- 🐛 **Issues**: [GitHub Issues](https://github.com/ismailcankaratas/LMWebUI/issues)
- 📖 **Docs**: [Documentation](https://docs.LMWebUI.dev)

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation
- Community highlights

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to LMWebUI! 🙏

Your contributions help make this project better for everyone.
