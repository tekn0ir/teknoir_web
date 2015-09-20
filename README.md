To deploy on Heroku:

Just push changes to https://github.com/tekn0ir/teknoir_web.git master.

Deploy the page on amazon:

docker build -t teknoir/web .

docker-compose up

docker run -d \
    -e ROOT_URL=http://yourapp.com \
    -e MONGO_URL=mongodb://url \
    -e MONGO_OPLOG_URL=mongodb://oplog_url \
    -p 8080:80 \
    teknoir/web
    
Run locally:
 
meteor build --architecture=os.linux.x86_64 ./
mkdir bundle
cp teknoir_web.tar.gz ./bundle

docker run -d \
    -e ROOT_URL=http://yourapp.com \
    -e MONGO_URL=mongodb://url \
    -e MONGO_OPLOG_URL=mongodb://oplog_url \
    -v /mybundle_dir:/bundle \
    -p 8080:80 \
    meteorhacks/meteord:base
    
    