#docker build -t langchainjs-app
#to use cached: (docker build --cache-from langchainjs-app:tag -t langchainjs-app:tag .)
#docker run -p 3000:3000 langchainjs-app
#one line: docker build --cache-from langchainjs-app:tag -t langchainjs-app:tag . && docker run -d -it -p 3000:3000 langchainjs-app

# Use the official Node.js image from the Docker Hub
FROM node:20

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies. ci for clean install
RUN npm install
#RUN npm link

# Copy the rest of the application code to the working directory
COPY . .

RUN python3 -m venv venv

RUN . venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 3000
RUN chmod +x lang.sh
RUN ln -s /usr/src/app/lang.sh /usr/local/bin/lang


#RUN chmod +x cli.js
#RUN ln -s /usr/scr/app/cli.js /usr/local/bin

# Command to run the application
CMD ["sh", "-c", ". venv/bin/activate && node app.js"]