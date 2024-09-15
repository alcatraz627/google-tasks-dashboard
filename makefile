run:
	make -j 2 run_server run_app

run_server:
	# cp -f .env server/.env
	cd server && npm run server

run_app:
	# cp -f .env app/.env
	npm run dev