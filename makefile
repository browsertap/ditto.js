all:
	coffee -o lib -c src;

all-watch:
	coffee -o lib -cw src;


clean: 
	rm -rf lib;
