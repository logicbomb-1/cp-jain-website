#!/bin/bash

echo "🎉 Starting Papa's Retirement Celebration Website!"
echo "=================================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🚀 Starting with Python 3..."
    echo "📱 Website will be available at: http://localhost:8000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting with Python..."
    echo "📱 Website will be available at: http://localhost:8000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
elif command -v node &> /dev/null; then
    echo "🚀 Starting with Node.js..."
    echo "📱 Website will be available at: http://localhost:3000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    npx serve . -p 3000
else
    echo "❌ No suitable server found!"
    echo ""
    echo "💡 You can:"
    echo "   1. Install Python: https://www.python.org/downloads/"
    echo "   2. Install Node.js: https://nodejs.org/"
    echo "   3. Or simply open index.html in your browser"
    echo ""
    echo "🌐 Opening index.html directly in browser..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open index.html
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start index.html
    else
        echo "Please open index.html manually in your browser"
    fi
fi

echo ""
echo "🎊 Website started successfully!"
echo "📖 Check README.md for customization instructions"
echo "🖼️  Add your photos to make it personal!"
