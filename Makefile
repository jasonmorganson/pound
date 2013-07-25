bin := ./node_modules/.bin

.PHONY: build install run test

build:
	@${bin}/component build --out public --name components

install:
	@npm install
	@${bin}/component install

run: build
	@node app/app

test:
	@${bin}/mocha

