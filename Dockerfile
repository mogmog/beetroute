# Use an official Python runtime as a parent image
FROM python:3

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
#RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8888

# Install Node.js 7.x repository
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

RUN apt-get install -y tmux
# Run app.py when the container launches
#CMD ["python", "app.py"]


RUN npm install

WORKDIR api

RUN pip install -r requirements.txt

WORKDIR /app
#RUN pip install -r requirements.txt


# Run app.py when the container launches
CMD ["./start.sh"]

#WORKDIR /app

#RUN python3 -m http.server

#try using port 3000 via below line as proxy can communicate on the servercontainer
#EXPOSE 3000




