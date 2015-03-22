FROM ubuntu:14.04
MAINTAINER Ride Share Market "systemsadmin@ridesharemarket.com"

# APT cache
ENV APT_REFRESHED_AT 2015-03-19.1
RUN apt-get -yqq update

# Install io.js, gpg keys listed at https://github.com/iojs/io.js
ENV IOJS_VERSION 1.5.1
RUN \
    apt-get -y install curl && \
    gpg --keyserver pool.sks-keyservers.net --recv-keys 9554F04D7259F04124DE6B476D5A82AC7E37093B DD8F2338BAE7501E3DD5AC78C273792F7D83545D && \
    curl -SLO "https://iojs.org/dist/v${IOJS_VERSION}/iojs-v${IOJS_VERSION}-linux-x64.tar.gz" && \
    curl -SLO "https://iojs.org/dist/v${IOJS_VERSION}/SHASUMS256.txt.asc" && \
    gpg --verify SHASUMS256.txt.asc && \
    grep " iojs-v${IOJS_VERSION}-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - && \
    tar -xzf "iojs-v${IOJS_VERSION}-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "iojs-v${IOJS_VERSION}-linux-x64.tar.gz" SHASUMS256.txt.asc

# NPM package cache
ENV NPM_REFRESHED_AT 2015-03-19.1
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --production && \
    npm install -g pm2

# Application
ENV APP_REFRESHED_AT 2015-03-20.1
ENV APP_DIR /srv/ride-share-market-app
RUN \
    mkdir ${APP_DIR} && \
    cp -a /tmp/node_modules/ ${APP_DIR} && \
    mkdir ${APP_DIR}/log && \
    mkdir ${APP_DIR}/pids
COPY config/ ${APP_DIR}/config
COPY dist/ ${APP_DIR}/dist
COPY httpd/ ${APP_DIR}/httpd
COPY server.js ${APP_DIR}/server.js
COPY package.json ${APP_DIR}/package.json
COPY pm2-production.json ${APP_DIR}/pm2-production.json
COPY docker-start.sh ${APP_DIR}/docker-start.sh


# Application User and Permissions
RUN \
    useradd -c 'RSM Data' -u 2000 -m -d /home/rsm-data -s /bin/bash rsm-data && \
    chown -R rsm-data.rsm-data ${APP_DIR}

#tmp
#RUN echo 'rsm-data ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/rsm-data

COPY config/logrotate.conf /etc/logrotate.d/rsm-app
RUN chmod 644 /etc/logrotate.d/rsm-app

#tmp
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly/logrotate

USER rsm-data

# Export the APP_DIR as a data volume under the app user account.
# Other containers use this volume's data (nginx, logstash).
VOLUME ${APP_DIR}

USER root

# Application Start
WORKDIR ${APP_DIR}

CMD ["./docker-start.sh"]
