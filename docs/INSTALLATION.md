# Installation Guide

This guide will help you install and set up LMWebUI on your system.

## 📋 Prerequisites

Before installing LMWebUI, make sure you have the following installed:

### Required Software

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (comes with Node.js)
- **Git** (for cloning the repository)
- **Ollama** (for running AI models locally)

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB+ recommended for larger models)
- **Storage**: At least 2GB free space
- **Internet**: Required for initial setup and model downloads

## 🚀 Quick Installation

### 1. Install Ollama

#### Windows
```bash
# Download and install from https://ollama.ai
# Or use winget
winget install Ollama.Ollama
```

#### macOS
```bash
# Download and install from https://ollama.ai
# Or use Homebrew
brew install ollama
```

#### Linux
```bash
# Install using the official script
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Start Ollama

```bash
ollama serve
```

### 3. Install a Model

```bash
# Install a small model for testing
ollama pull llama2:7b

# Or install a larger model for better quality
ollama pull llama2:13b
```

### 4. Clone and Install LMWebUI

```bash
# Clone the repository
git clone https://github.com/ismailcankaratas/LMWebUI.git
cd LMWebUI

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:3000` in your web browser.

## 🔧 Detailed Installation

### Step 1: Install Node.js

#### Option A: Official Installer
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the instructions

#### Option B: Package Manager

**Windows (Chocolatey):**
```bash
choco install nodejs
```

**macOS (Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Linux (CentOS/RHEL):**
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### Step 2: Install Ollama

#### Windows
1. Download the installer from [ollama.ai](https://ollama.ai)
2. Run the installer
3. Add Ollama to your PATH if prompted

#### macOS
1. Download the installer from [ollama.ai](https://ollama.ai)
2. Run the installer
3. Or use Homebrew: `brew install ollama`

#### Linux
```bash
# Install using the official script
curl -fsSL https://ollama.ai/install.sh | sh

# Or install manually
# Download the binary from GitHub releases
# Extract and move to /usr/local/bin/
```

### Step 3: Verify Installation

```bash
# Check Node.js version
node --version
# Should output v18.x.x or higher

# Check npm version
npm --version
# Should output 8.x.x or higher

# Check Ollama version
ollama --version
# Should output ollama version x.x.x
```

### Step 4: Start Ollama Service

```bash
# Start Ollama in the background
ollama serve

# Or start in foreground (for debugging)
ollama serve --verbose
```

### Step 5: Install AI Models

```bash
# List available models
ollama list

# Install a model (this may take several minutes)
ollama pull llama2:7b

# Install additional models
ollama pull codellama:7b
ollama pull mistral:7b
```

### Step 6: Clone LMWebUI

```bash
# Clone the repository
git clone https://github.com/ismailcankaratas/LMWebUI.git
cd LMWebUI

# Verify you're in the right directory
ls -la
# Should show package.json, src/, public/, etc.
```

### Step 7: Install Dependencies

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install

# Or if you prefer pnpm
pnpm install
```

### Step 8: Start Development Server

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev

# Or with pnpm
pnpm dev
```

### Step 9: Open in Browser

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. You should see the LMWebUI interface

## 🐳 Docker Installation

### Using Docker Compose

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ismailcankaratas/LMWebUI.git
   cd LMWebUI
   ```

2. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     ollama:
       image: ollama/ollama:latest
       ports:
         - "11434:11434"
       volumes:
         - ollama_data:/root/.ollama
       environment:
         - OLLAMA_HOST=0.0.0.0
     
     LMWebUI:
       build: .
       ports:
         - "3000:3000"
       depends_on:
         - ollama
       environment:
         - VITE_OLLAMA_BASE_URL=http://ollama:11434
   
   volumes:
     ollama_data:
   ```

3. **Start the services:**
   ```bash
   docker-compose up -d
   ```

4. **Install a model:**
   ```bash
   docker-compose exec ollama ollama pull llama2:7b
   ```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

### Using Docker

1. **Build the image:**
   ```bash
   docker build -t LMWebUI .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 LMWebUI
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Ollama Configuration
VITE_OLLAMA_BASE_URL=http://localhost:11434
VITE_OLLAMA_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=LMWebUI
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Modern AI Chat Interface

# Development
VITE_DEV_MODE=true
VITE_DEBUG=false
```

### Ollama Configuration

Create or edit `~/.ollama/config.json`:

```json
{
  "host": "0.0.0.0",
  "port": 11434,
  "timeout": 30000,
  "models": {
    "default": "llama2:7b"
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Node.js Version Issues
```bash
# Check your Node.js version
node --version

# If version is too old, update Node.js
# Download from nodejs.org or use a version manager like nvm
```

#### 2. Ollama Connection Issues
```bash
# Check if Ollama is running
ollama list

# If not running, start Ollama
ollama serve

# Check if the port is available
netstat -an | grep 11434
```

#### 3. Model Download Issues
```bash
# Check available disk space
df -h

# Check internet connection
ping ollama.ai

# Try downloading a smaller model first
ollama pull llama2:7b
```

#### 4. Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process or use a different port
npm run dev -- --port 3001
```

#### 5. Permission Issues (Linux/macOS)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use a Node version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### Getting Help

If you're still having issues:

1. **Check the logs:**
   ```bash
   # LMWebUI logs
   npm run dev

   # Ollama logs
   ollama serve --verbose
   ```

2. **Search existing issues:**
   - [GitHub Issues](https://github.com/ismailcankaratas/LMWebUI/issues)
   - [Discord Community](https://discord.gg/LMWebUI)

3. **Create a new issue:**
   - Use the bug report template
   - Include system information
   - Include error messages and logs

## ✅ Verification

After installation, verify everything is working:

1. **LMWebUI loads** - You see the interface at `http://localhost:3000`
2. **Ollama is connected** - Status shows "Connected" in the header
3. **Models are available** - You can select a model from the dropdown
4. **Chat works** - You can send messages and receive responses
5. **Streaming works** - Messages appear in real-time

## 🎉 Next Steps

Once installation is complete:

1. **Explore the interface** - Try different features
2. **Install more models** - Try different AI models
3. **Customize settings** - Adjust preferences
4. **Join the community** - Connect with other users
5. **Contribute** - Help improve the project

## 📚 Additional Resources

- [User Guide](USER_GUIDE.md)
- [API Documentation](API.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [FAQ](FAQ.md)
- [Community Discord](https://discord.gg/LMWebUI)
