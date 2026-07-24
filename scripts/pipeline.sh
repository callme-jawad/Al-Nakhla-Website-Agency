#!/bin/bash

# Stop the script if any command fails
set -e

echo "========================================"
echo "    React + Vite CI/CD Pipeline"
echo "========================================"

#################################
# Stage 1 - Verify Environment
#################################

echo ""
echo "[Stage 1] Checking Node.js and npm..."

node -v
npm -v

echo "Environment OK."

#################################
# Stage 2 - Install Dependencies
#################################

echo ""
echo "[Stage 2] Installing Dependencies..."

npm ci

echo "Dependencies installed."

#################################
# Stage 3 - Run Code Quality Checks
#################################

echo ""
echo "[Stage 3] Running Lint..."

if npm run | grep -q "lint"; then
    npm run lint
else
    echo "No lint script found. Skipping..."
fi

#################################
# Stage 4 - Run Tests
#################################

echo ""
echo "[Stage 4] Running Tests..."

if npm run | grep -q "test"; then
    npm test
else
    echo "No test script found. Skipping..."
fi

#################################
# Stage 5 - Build Application
#################################

echo ""
echo "[Stage 5] Building Application..."

npm run build

echo "Build completed successfully."

#################################
# Stage 6 - Deploy (Optional)
#################################

echo ""
echo "[Stage 6] Deploy"

echo "Deployment step goes here."

# Example:
# scp -r dist/* user@server:/var/www/html
# rsync -av dist/ user@server:/var/www/html
# docker build -t agency-website .
# docker push yourdockerhub/agency-website

#################################
# Pipeline Finished
#################################

echo ""
echo "========================================"
echo "PIPELINE EXECUTED SUCCESSFULLY"
echo "========================================"#!/bin/bash

set -e

echo "======================================"
echo "   React CI/CD Pipeline"
echo "======================================"

echo ""
echo "[1/4] Installing dependencies..."
npm install

echo ""
echo "[2/4] Running tests..."
# Uncomment if your project has tests
# npm test
echo "No tests configured."

echo ""
echo "[3/4] Building project..."
npm run build

echo ""
echo "[4/4] Build completed successfully!"

echo "======================================"
echo "PIPELINE FINISHED"
echo "======================================"#!/bin/bash

# Stop the script if any command fails
set -e

echo "========================================"
echo "    React + Vite CI/CD Pipeline"
echo "========================================"

#################################
# Stage 1 - Verify Environment
#################################

echo ""
echo "[Stage 1] Checking Node.js and npm..."

node -v
npm -v

echo "Environment OK."

#################################
# Stage 2 - Install Dependencies
#################################

echo ""
echo "[Stage 2] Installing Dependencies..."

npm install

echo "Dependencies installed."

#################################
# Stage 3 - Run Code Quality Checks
#################################

echo ""
echo "[Stage 3] Running Lint..."

if npm run | grep -q "lint"; then
    npm run lint
else
    echo "No lint script found. Skipping..."
fi

#################################
# Stage 4 - Run Tests
#################################

echo ""
echo "[Stage 4] Running Tests..."

if npm run | grep -q "test"; then
    npm test
else
    echo "No test script found. Skipping..."
fi

#################################
# Stage 5 - Build Application
#################################

echo ""
echo "[Stage 5] Building Application..."

npm run build

echo "Build completed successfully."

#################################
# Stage 6 - Deploy (Option#############################cho ""
echo "[Stage 6] Deploy"

echo "Deployment step goes here."

# Example:
# scp -r dist/* user@server:/var/www/html
# rsync -av dist/ user@server:/var/www/html
# docker build -t agency-website .
# docker push yourdockerhub/agency-website

#################################
# Pipeline Finished
#################################

echo ""
echo "========================================"
echo "PIPELINE EXECUTED SUCCESSFULLY"
echo "========================================"
#!/bin/bash

# Exit immediately if any command fails
set -e

# Colors
GREEN="\e[32m"
RED="\e[31m"
YELLOW="\e[33m"
BLUE="\e[34m"
NC="\e[0m"

echo -e "${BLUE}"
echo "========================================"
echo "     React + Vite CI/CD Pipeline"
echo "========================================"
echo -e "${NC}"

#################################
# Stage 1 - Verify Environment
#################################

echo -e "${YELLOW}[Stage 1] Verifying Environment...${NC}"

# Check Git
if ! command -v git >/dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: Git is not installed.${NC}"
    exit 1
fi

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: Node.js is not installed.${NC}"
    exit 1
fi

# Check npm
if ! command -v npm >/dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: npm is not installed.${NC}"
    exit 1
fi

# Check package.json
if [ ! -f package.json ]; then
    echo -e "${RED}❌ ERROR: package.json not found.${NC}"
    echo "Make sure you are in the root directory of the React project."
    exit 1
fi

echo "Git Version : $(git --version)"
echo "Node Version: $(node -v)"
echo "NPM Version : $(npm -v)"

echo -e "${GREEN}✅ Environment verification passed.${NC}"

#################################
# Stage 2 - Install Dependencies
#################################

echo ""
echo -e "${YELLOW}[Stage 2] Installing Dependencies...${NC}"

npm install

echo -e "${GREEN}✅ Dependencies installed successfully.${NC}"

#################################
# Stage 3 - Run Lint
#################################

echo ""
echo -e "${YELLOW}[Stage 3] Running Lint...${NC}"

if npm run | grep -q "lint"; then
    npm run lint
    echo -e "${GREEN}✅ Lint completed successfully.${NC}"
else
    echo "⚠️ No lint script found. Skipping..."
fi

#################################
# Stage 4 - Run Tests
#################################

echo ""
echo -e "${YELLOW}[Stage 4] Running Tests...${NC}"

if npm run | grep -q "test"; then
    npm test
    echo -e "${GREEN}✅ Tests passed.${NC}"
else
    echo "⚠️ No test script found. Skipping..."
fi

#################################
# Stage 5 - Build Application
#################################

echo ""
echo -e "${YELLOW}[Stage 5] Building Application...${NC}"

npm run build

echo -e "${GREEN}✅ Build completed successfully.${NC}"

#################################
# Stage 6 - Deploy (Optional)
#################################

echo ""
echo -e "${YELLOW}[Stage 6] Deployment...${NC}"

echo "No deployment configured."

# Examples:
# scp -r dist/* user@server:/var/www/html
# rsync -av dist/ user@server:/var/www/html
# docker build -t agency-website .
# docker push yourdockerhub/agency-website
# kubectl apply -f deployment.yaml

echo -e "${GREEN}✅ Deployment stage finished.${NC}"

#################################
# Pipeline Complete
#################################

echo ""
echo -e "${GREEN}"
echo "========================================"
echo "   CI/CD PIPELINE COMPLETED SUCCESSFULLY"
echo "========================================"
echo -e "${NC}"
