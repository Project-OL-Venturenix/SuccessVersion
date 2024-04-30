FROM arm64v8/openjdk:17
LABEL maintainer="lokongkitoscar@gmail.com"
ADD target/ServerBackend-0.0.4-SNAPSHOT.jar ServerBackend-0.0.4-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","ServerBackend-0.0.4-SNAPSHOT.jar"]
EXPOSE 8082