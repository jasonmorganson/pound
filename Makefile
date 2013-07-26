bin := ./node_modules/.bin

STYLES = $(wildcard app/assets/stylesheets/*.styl)
CSS = $(STYLES:.styl=.css)
COMPRESSED = $(STYLES:.styl=.min.css)
CONCATINATED = public/styles.css
MINIFIED = public/styles.min.css

.SUFFIXES:
.SUFFIXES: .css .styl
.PHONY: all build install run test clean

all: run

%.css : %.styl
	@${bin}/styl < $< > $@

%.min.css : %.styl
	@${bin}/styl -c < $< > $@

$(CONCATINATED): $(CSS)
	@cat $^ > $@

$(MINIFIED): $(COMPRESSED)
	@cat $^ > $@

build: $(CONCATINATED) $(MINIFIED)
	@${bin}/component build --out public

install:
	@npm install
	@${bin}/component install

run: build
	@node app/app

test:
	@${bin}/mocha

clean:
	rm -f $(CSS)
	rm -f $(COMPRESSED)
	rm -f $(CONCATINATED)
	rm -f $(MINIFIED)
	rm -fr components
	rm -fr node_modules

