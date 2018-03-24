echo "=== starting testnet and backend"
echo "> docker-compose up --build -d"
docker-compose up --build -d
echo ""
echo "=== init contract"
echo "> node ./backend/scripts/init.js"
cd backend && node ./scripts/init.js