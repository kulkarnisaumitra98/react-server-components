rm -rf server_dist; 
mkdir server_dist; 
echo '{ "type": "commonjs"}' > ./server_dist/package.json; 
rm -rf ./src/react-server/dist;
tsc -p ./src/react-server/tsconfig.json; 
babel ./src/react-server/dist/ --out-dir ./server_dist --copy-files;
