include .env
export $(shell sed 's/=.*//' .env)

nginxContainerName = frontend-nginx

dev-server:
	yarn webpack-dev-server --mode development --open --hot --host 0.0.0.0
dev:
	yarn webpack --mode development
prod:
	yarn webpack --mode production
server:
	docker-compose up -d ${nginxContainerName}
