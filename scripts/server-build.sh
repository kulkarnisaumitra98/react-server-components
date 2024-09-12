echo '{ "type": "commonjs"}' > ./server_dist/package.json; 
babel --extensions ".ts,.tsx" --watch ./src/react-server --out-dir ./server_dist --copy-files;
