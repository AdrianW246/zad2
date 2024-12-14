#Lżejszy Node.js
FROM node:18-slim AS builder
#folder roboczy
WORKDIR /app
#aplikacja serwerowa
COPY server.js .


# wyszukanie i dodanie dependencies dla node.js
RUN mkdir -p /app/libs | ldd /usr/local/bin/node | tr -s '[:blank:]' '\n' | grep '^/' | xargs -I '{}' cp --parents '{}' /app/libs/
#pusta warstwa scratch
FROM scratch
#Dane o autorze
LABEL org.opencontainers.image.authors="Adrian Wachowski"
# przekazanie do warstwy scratch aplikacji oraz interpretera javaScript
COPY --from=builder /usr/local/bin/node /usr/local/bin/node
COPY --from=builder /app/libs/ /
COPY --from=builder /app/server.js /
# wystawienie kontenera na port 8080
EXPOSE 8080
# Uruchomienie aplikacji serwerowej
ENTRYPOINT ["/usr/local/bin/node", "/server.js"]
