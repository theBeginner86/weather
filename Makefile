ui-setup:
	cd ui; npm i; cd ..

ui-build:
	cd ui; npm run build && npm run export; cd ..

ui-dev:
	cd ui; npm run dev; cd ..

ui-lint:
	cd ui; npm run lint; cd ..

