#!/bin/bash
# Social Media Design AI - Installation & Setup Script
# This script automates the setup process

set -e  # Exit on error

echo "🎨 Social Media Design AI - Setup Script"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "npm should come with Node.js"
    exit 1
fi

echo "✅ npm $(npm --version) detected"

# Check Python for frontend server
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "⚠️  Python is not installed (optional for development)"
    echo "You can use Node's http-server instead: npx http-server frontend"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "📝 Setting up environment configuration..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo ""
    echo "🔑 IMPORTANT: Add your CLAUDE_API_KEY to .env file"
    echo "   Edit .env and replace: CLAUDE_API_KEY=your-api-key-here"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Edit .env file and add your CLAUDE_API_KEY"
echo "   nano .env  (or use your preferred editor)"
echo ""
echo "2. Start the backend server:"
echo "   npm start"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   npm run frontend"
echo ""
echo "4. Open your browser and visit:"
echo "   http://localhost:8000"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
echo ""
echo "Happy designing! 🎨"
