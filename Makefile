.PHONY: help build up down logs restart clean dev docker-build docker-up docker-down

help:
	@echo "Comandos disponíveis:"
	@echo "  make dev          - Instala dependências e roda o projeto localmente"
	@echo "  make build        - Constrói a imagem Docker"
	@echo "  make up           - Inicia os containers com docker-compose"
	@echo "  make down         - Para e remove os containers"
	@echo "  make logs         - Mostra os logs do container"
	@echo "  make restart      - Reinicia os containers"
	@echo "  make clean        - Remove containers e imagens Docker"
	@echo "  make docker-build - Alias para build"
	@echo "  make docker-up    - Alias para up"
	@echo "  make docker-down  - Alias para down"

dev:
	npm install
	npm run dev

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v
	docker rmi baas-baas 2>/dev/null || true

docker-build: build

docker-up: up

docker-down: down

