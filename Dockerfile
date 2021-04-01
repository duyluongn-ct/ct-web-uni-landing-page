FROM node:12.6.0-alpine
ARG BUILD_ID
ENV BUILD_ID=$BUILD_ID
WORKDIR /landing-page
COPY . ./
RUN yarn install

EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD [ "run", "start" ]
